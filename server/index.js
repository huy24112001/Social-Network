
// Libraries
/************************************************************/
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*",
    },
});
const cors = require('cors');

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config()

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const commentRoute = require("./routes/comments")
const friendRoute = require("./routes/friend")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")
const cookies = require("cookie-parser");
const bodyParser = require("body-parser")
const NotificationRoute = require("./routes/notification")

const PORT = process.env.PORT || 5000
/************************************************************/


// Middleware
/************************************************************/
// app.use(express.json()).use(express.urlencoded({extended: true})).use(cors());
app.use(helmet())
app.use(morgan("common"))
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '500mb' }));


app.use(cors({origin: '*'}));

app.use(cookies())
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/comments", commentRoute)
app.use("/api/friends", friendRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/notification", NotificationRoute)
app.use("/api/messages", messageRoute)
/************************************************************/




// Socket
/************************************************************/

let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('joinRoom', id => {
        console.log(`join ${id}`)
        socket.join(id)
    })

    socket.on('comment', (data) => {
        data.createdAt = Date()
        // console.log(data)
        io.emit('replyComment', data)
    })

    socket.on('sendLike', (data) => {
        socket.broadcast.emit('like', data)

    })
    socket.on('notification',(data)=>{
        console.log(`rep${data.id}`)
        io.emit(`rep${data.id}`,{
            notification : true
        })
    })

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        // console.log(users)
        io.emit("getUsers", users);
      });
    
    socket.on('sendMessageToServer', (message) => {
        // socket.broadcast.emit('like', data)
        // console.log(message)
        const {senderId, receiverId, data} = message
        const sender = getUser(senderId);
        // console.log(sender)
        const receiver = getUser(receiverId);
        if (receiver){
            io.to(receiver.socketId).to(sender.socketId).emit("getMessageFromServer", {
                senderId,
                data,
            });
        }
        else {
            io.to(sender.socketId).emit("getMessageFromServer", {
                senderId,
                data,
            });
        }

    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
        removeUser(socket.id);

    });
})
/************************************************************/



// Start Server
/************************************************************/
app.get("/", (req, res) => {
    
    res.send("Welcome to server")
})
mongoose.set('strictQuery', true).connect(process.env.MONGO_URI, {})
.then(() => server.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message))
/************************************************************/

