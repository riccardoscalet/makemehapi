import * as hapi from "hapi";
import * as min from "minimist";

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
    reply("Hello " + request.params.name);
}