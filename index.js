const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('dotenv').config();

PORT = process.env.port;

const messages = [];

io.on('connection', (socket) => {
    const username = socket.handshake.query.username
    socket.on("message", (data) => {
        console.log(data);
        const message = {
            message: data.message,
            sender: username,
            sendAt: Date.now()
        }
        messages.push(message)
    })
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});































// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// const dbConfig = require("./dbConfig");
// app.use(cors()); // to use the cors middleware;
// const server = http.createServer(app);



// const io = new Server(server, {
//     cors: {
//         origin:" http://localhost:5173",
//         methods : ["GET", "POST"]
// },
// });

// // Fetch messages from the database

// const fetchMessages = (callback) => {
//     const selectMessages = "SELECT * FROM messages";


//     dbConfig.query(selectMessages, function (error, result) {
//         if (error) {
//             console.error("Error fetching messages from the database:", error);
//             callback([]);
//         } else {
//             callback(result);
//         }
//     });
// }

// io.on("connection", (socket) => {
//     console.log(` User Connected : ${socket.id}`);

//     // Fetch messages when a user connects
//     fetchMessages((messages) => {
//         socket.emit("chat-history", messages);
//     });

//     socket.on("dynasty", (message) => {
//         console.log(message);

//         console.log(message["message"]);
//         const insertSomething = "INSERT INTO messages (message, user, time, dynasty_id, sender_id) VALUES (?,?,?,?,?)"
//         const input = [message["message"], message["user"], message["time"], message["dynasty_id"], message["sender_id"]];
    
//         dbConfig.query(insertSomething, input,   function (error, result) {
//             if (error) {
//               console.error("Error inserting message into the database:", error);
//             } else {
//               console.log("Message inserted into the database");
//             }
//           })

//         io.emit("received-dynasty", message);
//     });

//     socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id)
//     });
// });


// server.listen(5000, () => {
//     console.log("SEVER RUNNING");
// });










