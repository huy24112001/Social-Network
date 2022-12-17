const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config()

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const commentRoute = require("./routes/comments")
const cookies = require("cookie-parser");
const bodyParser = require("body-parser") 

const PORT = process.env.PORT || 5000 

// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use(cookies())
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/comments", commentRoute)
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.send("Welcome to server")
})


mongoose.set('strictQuery', true).connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

