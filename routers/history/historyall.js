const router = require('express').Router()
const Hisnapvang = require("../../models/Napvang")
const Hisrutvang = require("../../models/Rutvang")
const Hisvangnhap = require("../../models/Hisnapvang")

router.get("/", async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    var history = await Hisnapvang.find({ status: 1, time: { $gte: startOfToday } }).sort({ time: -1 })

    for(let i=0;i<history.length;i++)
    {
        history[i].typeee =  "Nạp"
    }


    var historyRut = await Hisrutvang.find({ status: 1, time: { $gte: startOfToday } }).sort({ time: -1 })
    for(let i=0;i<historyRut.length;i++)
    {
        historyRut[i].typeee =  "Rút"
    }

    var historyVangNhap = await Hisvangnhap.find({ status: 1, time: { $gte: startOfToday } }).sort({ time: -1 })
    historyVangNhap.forEach(element => {
        element.truocgd = element.last
        element.saugd = element.now
        element.botgd = element.namebot
        element.tnv = element.nhanvat
        element.typeee = "Nhập"
    });
    console.log(history)
    const aray = [...history, ...historyRut, ...historyVangNhap]
    res.render("index", { page: "pages/historyall", history: aray })
})

module.exports = router
