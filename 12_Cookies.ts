import * as hapi from "hapi";
import * as min from "minimist";
import * as boom from "boom";

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.route({
    method: 'GET',
    path: '/set-cookie',
    handler: setCookie,
    config: {
        state: { // Configures how this route manages state. 
            parse: true,
            failAction: "log"
        }
    }
});

server.route({
    method: 'GET',
    path: '/check-cookie',
    handler: checkCookie,
    config: {
        state: { // Configures how this route manages state. 
            parse: true,
            failAction: "error" // This will cause server to return error immediately. The test causes this on purpose.
        }
    }
});

// Configures a server state (how cookies are managed).
server.state("session", {
    path: "/",
    domain: "localhost",
    encoding: "base64json",
    ttl: 10, // Time-to-live of cookie
    isSecure: false,
    isHttpOnly: false,
    isSameSite: false, // This is correct and works. Typings file for hapi is incomplete.
});

server.start((err) => {
    console.log("Server started!");
});


function setCookie(request, reply) {
    let session = request.state.session;
    if (!session) session = {
        key: "makemehapi"
    };

    // Sends a cookie back to the client, with "session" state configuration.
    reply("success").state("session", session);
}

function checkCookie(request, reply) {
    // Gets cookie from client request, if it exists.
    let session = request.state.session;

    if (session) reply({user: "hapi"});
    else reply(boom.unauthorized("You fucked up. Expired cookie."));
}