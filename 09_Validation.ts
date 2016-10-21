import * as hapi from "hapi";
import * as min from "minimist";
import * as joi from "joi";

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.route({
    method: 'GET',
    path: '/chickens/{breed}',
    handler: getHandler,
    config: {
        validate: {
            params: {
                breed: joi.any().required() // Validates parameters with joi.
            }        
        }
    }
})

server.start((err) => {
    console.log("Server started!");
});


function getHandler(request, reply) {

}