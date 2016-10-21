import * as hapi from "hapi";
import * as min from "minimist";
const path = require("path");
const h2o2 = require("h2o2");

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.register(h2o2, function (err) {
    if (err) throw err;
});

// Sets a proxy route that redirects the REST call.
server.route({
    method: 'GET',
    path: '/proxy',
    handler: {
        proxy: {
            host: 'localhost',
            port: 65535
        }
    }
});

server.start((err) => {
    console.log("Server started!");
});