const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const chatGetting = require("./mvvm/chat_url");
const dbConfig = require("./dbConfig");
const io = new Server(server);
require("dotenv").config();
app.use(express.json());

PORT = process.env.port || 4000;

const API_VERSION = "/api/v1/";

const userDbName = "chat_history";

app.use(`${API_VERSION}`, chatGetting);

io.on("connection", async (socket) => {
  console.log("user connected");

  try {
    const showPer = `SELECT * FROM ${userDbName}`;
    const [rows] = await dbConfig.promise().execute(showPer);
    socket.emit("dynasty_chat", {
      message: rows,
    });
  } catch (error) {
    console.error("Error fetching and emitting chat messages:", error);
    socket.emit("dynasty_chat", {
      error: "Failed to fetch chat messages",
    });
  }

  socket.on("dynasty_chat", (data) => {
    const insertPermission = `INSERT INTO ${userDbName} 
      (sender, user, message, sender_id, groupId) 
        VALUES (?, ?,?,?,?)`;

    // Use default values where applicable
    const dataToInsert = [
      data["sender"],
      data["user"],
      data["message"],
      data["sender_id"],
      data["groupId"],
    ];

    console.log(dataToInsert);
    dbConfig.query(insertPermission, dataToInsert, function (error, result) {
      if (error) {
        console.error("Error inserting message into the database:", error);
      } else {
        console.log("Message inserted into the database" + result);
      }
    });

    socket.emit("dynasty_chat", {
      message: data,
    });
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// // Fetch messages from the database

// const messages = [];
// let chatH = [];
// chatH.push(showPer);

// const showPer = `SELECT * FROM ${userDbName}`;
// dbConfig.query(showPer, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (result.length === 0) {
//       return res.json({ "properties": "no properties" });
//     }
//     socket.emit("dynasty_chat",{
//         message:data
//     })
//   });

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
