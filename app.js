// when dealing with socket.io we must always deal with two files at the same time
// The server file( app.js): It's this one that centralizes and manages the connections
// of the different clients who are connected to the website

// The client file( index.html): Its this one that connects to the server and displays
// results to the browsers


// The Server (app.js)

//The code is separated into 2 parts.
// 1st: We load the server, retrieve and return the content of the index.html page
// 2nd: We load socket.io and manage socket.io's events



// 1st ------ load the server, retrieve the index.html file and return
//            the content of the index.html page

var http = require("http");
var fs = require("fs");

//Loading the index.html file, and then display it to the client
var server = http.createServer(function(req,res){
    fs.readFile('./index.html','utf-8',function(error,content){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(content);
    });
});

// 2nd ----- Load socket.io and manage socket.io's events

// Load socket.io and listen for requests via socket.io 
// A RealTime connection, when you connect it opens a tunnel via the
// WebSockets thanks to socket.io
var io = require("socket.io").listen(server);

// WSocketIO
/// When a client connects, we note it in the console
//io.sockets.on('connection', function(socket){

//    console.log('A client is connected!');
//});

// Sending and receiving messages
// Once the client is connected to the server we can exchange messages between
// the client and the server
// 2 Possible Scenarios:
//   -The server wants to send a message to the client
//   -The client wants to send a message to the server

//  Server wants to send a message to the Client
// When we detect a connection, we send a message to the client with socket.emit()
// The function takes two settings
//      - The type of message, here we are sending a "message" type message
//      - The content of the message, here ware sending a string("You are connected")
// The io.sockets.on() will listen for connections from all the sockets, thats why we
// use io.sockets.on(). Then we send the socket that was connected to the function
// call back. The 'socket' variable holds the socket that has connected to our server
io.sockets.on("connection", function(socket){
    console.log('A client is connected!');
    socket.emit('message', 'You are connected');
    
    socket.on("message", function(message){
        console.log("A client is speaking to me! They're saying: "+ message);
    });
});





// Listen for http requests on the server
// A classic connection to the HTTP server, when you connect the server
// will load the index.html page
server.listen(8080, function(){
    console.log("Listening on port 8080 for an Http connection");
});


