const router = require('express').Router()
const Hisrutvang = require("../../models/Rutvang")

router.get("/",async(req,res)=>{
    const history = await Hisrutvang.find({status:1}).sort({time:-1}).limit(500)
    res.render("index",{page:"pages/hisrutvang9s",history:history})
})

module.exports = router
