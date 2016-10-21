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
    method: 'POST',
    path: '/login',
    handler: loginHandler,
    config: {
        validate: {

            // Validates payload of the POST call using joi. 
            payload: joi.object({
                    isGuest: joi.bool().required(),
                    username: joi.string().when('isGuest', {
                        is: false,
                        then: joi.string().required()
                    }),
                    accessToken: joi.string().alphanum(),
                    password: joi.string().alphanum()
                })
                .nand('password', 'accessToken')
                .options({
                    allowUnknown: true
                })
        }
    }
})

server.start((err) => {
    console.log("Server started!");
});


function loginHandler(request, reply) {
    reply("login successful");
}