const express = require("express");
const app = express();
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
const cookies = require("cookie-parser");
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 5000

// Middleware
// app.use(express.json()).use(express.urlencoded({extended: true})).use(cors());
app.use(helmet())
app.use(morgan("common"))
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '500mb' }));


// // Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(cors({origin: 'http://localhost:3000'}));

app.use(cookies())
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/comments", commentRoute)
app.use("/api/friends", friendRoute)


app.get("/", (req, res) => {

    res.send("Welcome to server")
})


mongoose.set('strictQuery', true).connect(process.env.MONGO_URI, {})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

