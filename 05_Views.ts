import * as hapi from "hapi";
import * as min from "minimist";
import * as handlebars from "handlebars";
const path = require("path");
const vision = require("vision");

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

server.register(vision, function (err) {
    if (err) throw err;
});

// Configures views
server.views({
    engines: {
        html: handlebars
    },
    path: path.join(__dirname, 'templates') // Path of template views.
});

// Sets a route that returns a template view.
// The view is customized based on request query parameters (check "05_index.html").
server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: '05_index.html'
    }
});

server.start((err) => {
    console.log("Server started!");
});