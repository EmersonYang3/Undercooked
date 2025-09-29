src/modules/\*
Represents the different modules that handle specific events or functionalities related to a socket connection, disconnection and everything else in between. For exmaple, src/modules/host/connect.ts handles the connection event for a host socket.

src/services/*
Represents services that provide specific functionalities or manage certain aspects of the application, such as managing lobbies or socket registries. Does not *really\* represent a database, but more of an in-memory global store for the application. Since this is a small-scale at home run game server, this is fine. This is not meant to be a production level codebase.

src/sockets/\*
Represents the main entry point for handling socket connections. Each file in this directory corresponds to a specific type of socket (e.g., host, player) and initializes the appropriate modules for that socket type.

src/utils/types.ts
Contains TypeScript type definitions that are used throughout the codebase to ensure type safety and consistency.

src/index.ts
The main entry point of the application that sets up the server and socket.io instance, and handles incoming socket connections by delegating them to the appropriate socket handlers.
