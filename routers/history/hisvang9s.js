const router = require('express').Router()
const Hisnapvang = require("../../models/Napvang")

router.get("/",async(req,res)=>{
    const history = await Hisnapvang.find({status:1}).sort({time:-1}).limit(500)
    res.render("index",{page:"pages/hisvang9s",history:history})
})

module.exports = router