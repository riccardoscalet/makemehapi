import * as hapi from "hapi";
import * as joi from "joi";

let argsSchema = joi.number().positive();

joi.validate(process.argv, argsSchema, function(err, value) {
    
});

let server = new hapi.Server();
server.connection({
    port: 8080
});

