const router = require("express").Router();
const User = require("../models/User")


router.get('/search', async (req, res) => {
    console.log(req.query.username)
    if (req.query.username) {
        var username = req.query.username
        // console.log(username)
        try {
            var userArr = await User.find({username: { '$regex' : username, '$options' : 'i' }})
            // res.send(userList)
           res.status(200).json({result : userArr})


        } catch (e) {
            res.status(500).json(e);
            console.log(e)
        }
    }

})
module.exports = router
