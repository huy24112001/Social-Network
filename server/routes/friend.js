const router = require("express").Router();
const User = require("../models/User")
const auth = require('../middleware/auth.js')
const Friend = require('../models/Friend')
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/search', async (req, res) => {
    // console.log(req.query.username)
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


router.post('/send-request',  async (req, res) => {
    // console.log(req.body)
    var match= {
        receiver: req.body.user_query_id
    }
    try{
        // await req.user.populate({
        //     path: 'friends',
        //     match: match
        //
        // }).execPopulate();
        // // console.log(req.user.friends)


        let actionA = await Friend.create({
            requester: req.body.user_id,
            receiver: req.body.user_query_id,
            status: 1,
            friends: false
        });

        let actionB = await Friend.create({
            requester: req.body.user_query_id,
            receiver: req.body.user_id,
            status: 2,
            friends: false
        });
        const A =  await  actionA.save();
        const B =  await actionB.save()
        // let userA = await User.findByIdAndUpdate(req.user._id, {
        //     $push: {friends: actionA._id}
        // });
        //
        // let userB = await User.findByIdAndUpdate(req.query.id, {
        //     $push: {friends: actionB._id}
        // });
        res.status(200).json({result : 1})
    }catch(err)
    {
        console.log(err);
        res.status(200).json({result : err})
    }
})


//{{url}}/accept-friend?id=....&status=2

router.put('/accept', async (req, res) => {
    // console.log(req.body.params)
    const id = req.body.params
    Friend.updateOne({ requester : id.userID_req,receiver : id.userID_rec} ,{status :3,friends : true},function (err,docs) {
        if (err)
            console.log(err);
        else
            console.log(docs)
    })
    Friend.updateOne({requester : id.userID_rec , receiver : id.userID_req},{status :3,friends : true},function (err,docs) {
        if (err)
            console.log(err);
        else
            console.log('docs')
    })
    await User.findOneAndUpdate({_id: id.userID_req}, {
        $push: {friends: id.userID_rec}
    });

    await User.findOneAndUpdate({_id: id.userID_rec}, {
        $push: {friends: id.userID_req}
    });
})


router.get('/list-friends', async (req, res) => {
    // console.log(req.query.user_info);
     const arr = req.query.user_info.friends;

    try {
        let result = []
        // console.log('huy hia huoc')
        for(let i=0;i< arr.length;i++){
          const user = await User.findById(arr[i])
            // result = result.concat([user]);
            result =  result.concat([{username : user.username , profilePicture : user.profilePicture }])
        }
        // console.log(result)

        // var friendArr = await Promise.all(req.user.friends.map(friend => User.findById(friend.receiver)))
        res.status(200).send({result: result})


    } catch (e) {
        res.status(500).send({result : "LOI"})
    }
})

router.get('/status', async (req, res) => {
    // console.log(req.query)
    try {

        const status = await Friend.findOne({
            requester: req.query.user_id,
            receiver: req.query.user_query_id
        });
        // console.log(status);
        if(status)
            res.send({result: status.status})
        else
            res.send({result: 0})


    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/remove', async (req, res) => {
    // console.log(req.query)
    try {

        const rs1 = await Friend.findOneAndDelete({
            requester: req.query.user_id,
            receiver: req.query.user_query_id
        });
        const rs2 = await Friend.findOneAndDelete(  {
            requester: req.query.user_query_id,
            receiver:   req.query.user_id
        });
    if(req.query.status === '3'){

        await User.findOneAndUpdate({_id: req.query.user_id}, {
            $pull: {friends: req.query.user_query_id}
        });

        await User.findOneAndUpdate({_id: req.query.user_query_id}, {
            $pull: {friends: req.query.user_id}
        });
    }
        console.log(rs1 + ' ' + rs2);

        res.send({result : 0})

    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/friend-request', auth, async (req, res) => {
    const match= {status: 2}
    try {
        await req.user.populate({
            path:'friends',
            match
        }).execPopulate()
        for(var i = 0; i < req.user.friends.length; i++){
            await req.user.friends[i].populate({
                path:'receiver'
            }).execPopulate()
            // console.log(req.user.friends[i])
        }
        // res.send(req.user.friends)
        res.render('friendRequest', {userArr: req.user.friends, user: req.user})

    } catch (e) {
        res.status(500).send()
        console.log(e)
    }


})


router.get('/check-invite', async (req, res) => {
     console.log(req.query.userID)
    try {
        Friend.find({requester : req.query.userID, status : 2}, async function (err, docs) {
            if (err)
                console.log(err);
            else {
                console.log(docs.length)
                let data = [];
                if (docs.length !== 0) {
                    for (let i = 0; i < docs.length; i++) {
                        const rs = await User.findById(docs[i].receiver.valueOf())
                        data = data.concat([rs]);
                    }
                    //  console.log(data)
                    res.status(200).send({result: data})
                } else
                    res.status(200).send({result: []})
            }
        })



    } catch (e) {
        res.status(500).send(e)
    }
}, (err) => {
    console.log(err);
})


module.exports = router
