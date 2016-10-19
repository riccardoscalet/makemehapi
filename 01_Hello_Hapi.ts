import * as hapi from "hapi";

let server = new hapi.Server();
server.connection({
    port: 8080
});

