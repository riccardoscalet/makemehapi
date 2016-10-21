import * as hapi from "hapi";
import * as min from "minimist";
const inert = require("inert");
const path = require("path");

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.register(inert, function (err) {
    if (err) throw err;
});

// Sets a route that returns a view named "file"
server.route({
    method: 'GET',
    path: '/foo/bar/baz/{file}',
    handler: {
        directory: {
            path: path.join(__dirname, 'public')
        }
    }
});

server.start((err) => {
    console.log("Server started!");
});