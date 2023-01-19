const router = require("express").Router();
const Notification = require("../models/Notification");
const { route } = require("./posts");

router.post("/",async(req,res)=>{
    const newNotifi =  new Notification(req.body)
    try{
        const savedMessage = await newNotifi.save();
        res.status(200).json(savedMessage);
    }
    catch(error){
        res.status(500).json(error)
    }

})

router.get("/:id",async(req,res)=>{
    const id_user = req.params.id

    const notifications = await Notification.find({userId : id_user})
    // console.log(notifications)
    res.status(200).json(notifications)
})
// Hàm này dùng để update status của notification khi người dùng bấm vào notification
router.put("/update/:id",async (req,res)=>{
    const id_user = req.params.id
    const notification = await Notification.find({userId : id_user})
    // console.log(notification)
        // Chuyển trạng thái thành true hết
    for(let i=0;i<notification.length; i++){
        if(notification[i].status === false){
            notification[i].status = true
            notification[i].save()
        }
    }
    res.status(200).json("ok")
})
module.exports = router;
