# REFACTOR: LAN hosting & frontend configuration for Undercooked

This file documents a simple, no-signup workflow to run one host machine as the backend + frontend server and have many LAN clients connect to it (sockets) for play/testing. It also includes quick commands to test and clean up.

If you want to avoid signing up for any tunneling services or deploying the backend to the public internet, this method is the easiest: build the frontend once on the host, serve `dist` over plain HTTP on the host, and have clients browse to the host URL. Socket.IO clients will then connect directly to the backend on the host LAN IP.

Summary of the changes or actions you will perform (no codebase clone needed on each client):
- Build frontend once on the host.
- Make frontend Socket.IO URL point at the host LAN IP (one small source change or a post-build replace).
- Serve the `dist` folder from the host over HTTP.
- Run the backend on the same host and ensure it listens on the LAN (0.0.0.0) and open firewall ports.

Why this works
- Browsers block mixed-content: an HTTPS page (e.g. Netlify) cannot connect to a non-TLS (ws://) backend. Serving the frontend over plain HTTP from the same host avoids TLS/WSS requirements. Each client simply visits `http://<HOST_IP>:<FRONTEND_PORT>` and the frontend connects to `http://<HOST_IP>:3000`.

Quick checklist (high level)
1. Build frontend on host.
2. Make socket URL configurable (VITE env) or post-build replace `http://localhost:3000` with `http://<HOST_IP>:3000`.
3. Serve `dist` from host over HTTP.
4. Start backend on host and ensure it listens on 0.0.0.0.
5. Open firewall ports.
6. Clients open `http://<HOST_IP>:<FRONTEND_PORT>`.

Exact steps (Windows / PowerShell examples)

1) Find your host LAN IP (on the host):

```powershell
ipconfig
# note the IPv4 address for your active adapter (e.g. 192.168.1.10)
```

2) Recommended: make the frontend Socket.IO URL configurable (one small source change)

Edit `app/src/stores/rewrite/sockets.ts`:

```ts
// replace the hardcoded URL argument:
// from: io("http://localhost:3000", { ... })
// to something like:
const backendUrl = import.meta.env.VITE_BACKEND_URL ?? `http://${window.location.hostname}:3000`;
const socketAttempt = io(backendUrl, { autoConnect: false, auth: handshake }) as Socket;
```

Then rebuild (step 3).

3) Alternative if you don't want to edit source: do a post-build replace in `dist` with PowerShell (run from `app` folder; set $HOST to your host IP):

```powershell
$HOST = "192.168.1.10"
Get-ChildItem -Path .\dist -Recurse -Include *.js | ForEach-Object {
  (Get-Content $_.FullName -Raw) -replace 'http://localhost:3000', "http://$HOST:3000" | Set-Content $_.FullName
}
```

4) Build the frontend on the host (one-time):

```powershell
cd C:\Users\ey320\OneDrive\Documents\GitHub\Undercooked\app
npm install
npm run build
```

5) Serve the built frontend from the host (choose one):

- Quick Python server (zero-install if Python present):

```powershell
cd C:\Users\ey320\OneDrive\Documents\GitHub\Undercooked\app\dist
python -m http.server 5173
```

- Or use `serve` via npx:

```powershell
cd C:\Users\ey320\OneDrive\Documents\GitHub\Undercooked\app
npx serve -s dist -l 5173
```

6) Start the backend on the host:

```powershell
cd C:\Users\ey320\OneDrive\Documents\GitHub\Undercooked\backend
npm install
npm run dev
```

7) Ensure backend is listening on all interfaces. Check with:

```powershell
netstat -ano | findstr :3000
# good: 0.0.0.0:3000 or [::]:3000
# bad: 127.0.0.1:3000 (bound to localhost only)
```

If the backend is bound to `127.0.0.1`, change `backend/src/index.ts` listen call to explicitly bind 0.0.0.0:

```ts
httpServer.listen(sharedEnums.portServer.port, "0.0.0.0", () => {
  console.log(`Backend server running on http://0.0.0.0:${sharedEnums.portServer.port}`)
})
```

Restart the backend after the change.

8) Open Windows firewall ports on the host (admin PowerShell):

```powershell
New-NetFirewallRule -DisplayName "Undercooked Backend" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3000
New-NetFirewallRule -DisplayName "Undercooked Frontend" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5173
```

9) Connect clients

On each client machine, open a browser to:

```
http://<HOST_LAN_IP>:5173
```

The frontend will compute the backend URL as `http://<HOST_LAN_IP>:3000` (or use the `VITE_BACKEND_URL` you provided) and Socket.IO will connect over the LAN.

10) Test connectivity from a client (PowerShell):

```powershell
Test-NetConnection -ComputerName <HOST_LAN_IP> -Port 3000
# expect TcpTestSucceeded : True
```

11) Quick cleanup

- Stop the backend / frontend servers with Ctrl+C on the host.
- Remove served `dist` if you want to revert:

```powershell
cd C:\Users\ey320\OneDrive\Documents\GitHub\Undercooked\app
Remove-Item -Recurse -Force .\dist
```

- Remove firewall rules (if you added them) when done:

```powershell
Remove-NetFirewallRule -DisplayName "Undercooked Backend"
Remove-NetFirewallRule -DisplayName "Undercooked Frontend"
```

Notes, alternatives, and scale
- This approach avoids any external signups or tunnels and will work for ~30 LAN clients with a reasonably modern host.
- If you later want to keep the frontend on Netlify (HTTPS), the backend must be reachable via HTTPS/WSS (deploy backend publicly or use a tunnel with TLS) — those options require either hosting or a tunneling service.
- For heavy scale or production use, consider a small cloud host or a reverse proxy and a process manager (pm2) for stability.

BY DOING THIS IT WILL ALLOW YOU TO: run one machine as the backend and frontend server, let ~30 LAN client browsers load the frontend without cloning the repo locally, and have all clients open WebSocket (Socket.IO) connections to the single backend — requiring no external signups or tunnels.

If you want, I can:
- produce a one-line PowerShell to replace `http://localhost:3000` in the built `dist` (no source edits), or
- create the small source patch to `app/src/stores/rewrite/sockets.ts` and then you can rebuild.

---
Created as part of the local LAN-hosting refactor notes.
