const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Register
router.post("/register", async(req, res) => {
    const {username, email, password} = req.body


    try {

        // const salt = await bcrypt.genSalt(process.env.SALT_TOKEN)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        console.log(user)
        // const token = jwt.sign({ email: user.email, id: user._id }, 'test')
        res.status(200).json({ result: user })
    } catch (error) {
        console.log(error)
    }

})

// Login
router.post("/login", async(req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        console.log(existingUser)
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        console.log(isPasswordCorrect)
        // const isPasswordCorrect = true
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test')
        console.log(req.headers.authorization)

        res.status(200).json({ result: existingUser })
        // res.status(200).json(existingUser)


    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
})

module.exports = router
