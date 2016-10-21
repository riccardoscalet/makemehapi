import * as hapi from "hapi";
import * as min from "minimist";
import * as boom from "boom";
const auth = require("hapi-auth-basic");

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.register(auth, function (err) {
    if (err) throw err;
});

// Configures an authentication policy.
server.auth.strategy("simpleAuthenticationBanana", "basic", {
    validateFunc: authenticate
});

// Sets a route that processes authentication and then, if succeded, executes the handler.
server.route({
    method: "GET",
    path: "/",
    config: {
        auth: "simpleAuthenticationBanana",
        handler: function (request, reply) {
            console.log("User " + request.auth.credentials.name + " logged in.");
            reply("Hello " + request.auth.credentials.name);
        },
    }
});

server.start((err) => {
    console.log("Server started!");
});


// Function that checks authentication credentials.
function authenticate(request, username, password, callback) {
    if (username == "hapi" && password == "auth") return callback(null, true, {
        name: username
    });
    else return callback(null, false);
}