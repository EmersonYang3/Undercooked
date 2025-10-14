# Socket Architecture Documentation

## Overview
The eternity server implements a clean, modular architecture for handling WebSocket connections with different roles (host, client, station).

## Structure

### Routes (`eternity/src/sockets/`)
Socket handler files that define the initialization and event handling for each role:
- `host.ts` - Handles host connections
- `client.ts` - Handles client/player connections  
- `station.ts` - Handles terminal/station connections

Each route:
1. Imports the appropriate initializer modules (connect/disconnect)
2. Uses events from `shared/enums` (no hardcoded strings)
3. Implements an `init()` function that sets up socket event handlers

### Initializers (`eternity/src/modules/`)
Business logic modules that handle connection/disconnection for each role:

#### Host Modules
- `modules/host/connect.ts` - Creates lobby, generates identifier
- `modules/host/disconnect.ts` - Cleans up host disconnection

#### Client Modules
- `modules/client/connect.ts` - Joins lobby, generates identifier and special key
- `modules/client/disconnect.ts` - Cleans up client disconnection

#### Station Modules
- `modules/station/connect.ts` - Registers station, generates identifier
- `modules/station/disconnect.ts` - Cleans up station disconnection

### Connection Routing (`eternity/src/services/connRouter.ts`)
Routes incoming connections to the appropriate socket handler based on the `intendedRole` from the handshake data. Uses `gameRoles` enum from shared/enums to map roles to handlers.

### Shared Enums (`shared/src/enums.ts`)
Centralized definitions for:
- `socketEvents` - All socket event names (disconnect, hostConnected, playerConnected, terminalConnected)
- `gameRoles` - Valid role types (host, client, station)
- `connValidatorErrors` - Connection validation error messages
- `portServer` - Server port configuration

## Event Flow

1. Client connects with handshake data (intendedRole, lobbyCode)
2. `connValidator` validates the connection
3. `connRouter` routes to appropriate socket handler
4. Socket handler calls initializer's connect function
5. Socket handler sets up disconnect listener
6. Socket handler emits connection success event to client
7. On disconnect, disconnect handler is called for cleanup

## Key Principles

- **No Magic Strings**: All event names and roles use shared enums
- **Separation of Concerns**: Routes handle events, initializers handle business logic
- **Modularity**: Each role has its own files, easy to extend
- **Type Safety**: TypeScript types from shared/types ensure consistency

## Future Enhancements

The initializer modules have TODO comments indicating areas for future development:
- Complete lobby management (creating, joining, storing lobby data)
- Resource cleanup (free unqi identifiers, release special keys)
- More complex game state management
