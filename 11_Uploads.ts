import * as hapi from "hapi";
import * as min from "minimist";

let argv = min(process.argv);

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: process.argv[2] || 8080
});

// Sets a route that accepts a stream request from the client. 
server.route({
    method: 'POST',
    path: '/upload',
    handler: uploadHandler,
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
})

server.start((err) => {
    console.log("Server started!");
});


// This handler reads the stream received by the client (inside the request).
function uploadHandler(request, reply) {
    var file = request.payload.file;

    let body = "";
    file.on('data', function (data) {
        body += data
    });

    file.on('end', function () {
        let response = {
            description: request.payload.description,
            file: {
                data: body,
                filename: file.hapi.filename,
                headers: file.hapi.headers,
            }
        }

        reply(response);
    });
}