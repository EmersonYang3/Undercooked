# app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Important folders

| Path                   | Purpose                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| `app/src/main.ts`      | Bootstraps Vue, registers router/store, and mounts the root component.       |
| `app/src/App.vue`      | The top-level layout component rendered by Vite.                             |
| `app/src/components/`  | Reusable UI building blocks like terminals, timers, and selectors.           |
| `app/src/views/`       | Route-level screens (client, host, splash, terminal) consumed by the router. |
| `app/src/router/`      | Vue Router setup plus the route table for all major views.                   |
| `app/src/stores/`      | Pinia stores such as `counter` and `sockets` that manage shared state.       |
| `app/src/utils/`       | Utility helpers (`lut.ts`, general helpers) used across components.          |
| `app/src/connections/` | Connection/client-handshake logic for host and player networking.            |
| `app/src/services/`    | Service layer placeholder for API/SDK abstractions.                          |
| `app/public/`          | Static assets served as-is (base styles, images, HTML shell).                |
| `app/src/assets/`      | Bundled assets (e.g., `main.css`) imported into Vue components.              |
| `shared/*`             | Alias to `../shared/src/*` for shared enums/types imported on the frontend.  |

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
