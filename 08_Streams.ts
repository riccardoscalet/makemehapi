import * as hapi from "hapi";
import * as min from "minimist";
import * as fs from "fs";
const pump = require("pump");
const rot13 = require("rot13-transform");

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.route({
    method: 'GET',
    path: '/',
    handler: getHandler
})

server.start((err) => {
    console.log("Server started!");
});


function getHandler(request, reply) {
    let fileStream = fs.createReadStream("./files/08_Streams.txt");
    let rot13Stream = rot13();
    pump(fileStream, rot13Stream);
    reply(rot13Stream);
}