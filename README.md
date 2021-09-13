# Simulation Event Viewer

Web based visualization tool for particle physics simulations stored inside ROOT file (with compatible format).

## How it works

The code is divided between `server` and `client` (front end).

The client code should be build into `client/build` via `npm run build` (inside the client directory).

The (express) server code will serve files inside `client/build`.

For the time being, to start the server you would run:

```
node server/server.js test/example-simulation.root
```
