import * as hapi from "hapi";
import * as joi from "joi";
import * as min from "minimist";

let argv = min(process.argv);

// let argsSchema = joi.number().required().positive();
// joi.validate(argv.p, argsSchema, function(err, value) {
//     console.log(err + " " + value);
// });

// Initializes server
let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

// Sets a route
server.route({
    method: 'GET',
    path: '/',
    handler: getHandler
})

// Starts server
server.start((err) => {
    console.log("Server started!");
});


function getHandler(request, reply) {
    reply("Hello hapi");
}