import * as hapi from "hapi";
import * as min from "minimist";
const inert = require("inert");

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});


server.register(inert, function (err) {
    if (err) throw err;
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: '03_index.html'
    }
})

server.start((err) => {
    console.log("Server started!");
});