const router = require('express').Router()
const Hisvangnhap = require("../../models/Hisnapvang")
router.get("/",async(req,res)=>{
    const history = await Hisvangnhap.find({status:1}).sort({time:-1}).limit(5000)
    res.render("index",{page:"pages/hisvangnhap",history:history})
})

module.exports = router
