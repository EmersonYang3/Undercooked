Project Details:

Project Name: Undercooked

Running the Project:
To run the project serve the frontend via the machine you'll run the backend on:
Here are the steps to do so 
Build the frontend

`cd app`
`npm run build`

Serve the frontend from the backend 

```shell
npx serve -s dist -l port_number.
```

*port number can be any port number. 

It should return a simple box giving you two links, local and network
On the host machine(where you're hosting the backend), open local
On other machines (eg, players, stations) type in the network link

Possible issues 
Firewall issues with school devices
If you wanna circumvent those run the backend on a laptop perferrably with Wifi instead of Ethernet 
We don't currently have a fix for this on Windows 

Run the backend 

`cd backend`
`npm run dev`

Project Description (simplified): A website rendition of the popular game "Overcooked" but in real life.

Project Description (detailed): Undercooked is a multiplayer real-life adaptation of the game Overcooked, where players physically move between computers acting as kitchen stations to prepare food orders collaboratively. A host creates a game lobby with a unique code. Players (clients) and computer stations join the lobby and await host approval. Once accepted, players receive unique special keys for identification. Stations are assigned types like dispensers or cooking appliances. When the host starts the game, players run between stations in real life, using their special keys to interact with computers and perform cooking actions such as dispensing ingredients, boiling, frying, or submitting completed dishes. Stations receive the list of all active special keys to validate interactions. The game involves managing orders, recipes, and time pressure, with incomplete recipes leading to penalties. Currently, the core multiplayer infrastructure is implemented, including lobby management, connection handling, and game initialization with key distribution. However, full gameplay mechanics like recipe processing, station interactions, scoring, and real-time synchronization are not yet complete. The repository provides a foundation for building out these features.
