const ThongKe = require("../controllers/thongke")
const router = require('express').Router()
const Admin = require("../models/Admin")
const bcrypt = require('bcryptjs')

const BotThoiRouter = require("./botthoi")

router.get('/add', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash("@", salt)
    await new Admin({ username: "thaipro2k2", password: hashPassword }).save()
    const saltz = await bcrypt.genSalt(10)
    const hashPasswordz = await bcrypt.hash("@", saltz)
    await new Admin({ username: "lam", password: hashPasswordz }).save()
    res.send("cccc")
})
router.use("/api", require('./api'))
router.use("/api/botthoi", require('./api/botthoi'))


router.use("/auth", require('./auth'))

router.use(function (req, res, next) {
    if (req.session.userId == null) {
        return res.redirect("/auth")
    }
    next()
})

router.use("/botthoi",BotThoiRouter)

router.use("/botvang", require('./botvang'))
router.use("/hisnap9s", require('./history/hisvang9s'))
router.use("/hisvangnhap", require('./history/hisvangnhap'))
router.use("/hisrutvang9s", require('./history/hisrutvang9s'))
router.use("/historyall", require('./history/historyall'))
router.get("/", async (req, res) => {
    var total = await ThongKe.thongKeVangBot()
    var html = "";
    var totalGold = 0;
    var totalAcc = 0;
    total.forEach(svvv => {
        html += '<div><span class="label label-info">Server ' + svvv.Server + '</span> Số acc:' + svvv.Count + " Tổng vàng: " + numberWithCommas(svvv.Gold) + "</div>"
        totalAcc+=svvv.Count
        totalGold+=svvv.Gold
    });

    html+=`<br>Tổng ${totalAcc} acc - ${numberWithCommas(totalGold)} VÀNG`


    var totalThoi = await ThongKe.thongKeThoiBot()
    var htmlThoi = "";
    var totalGoldThoi = 0;
    var totalAccThoi = 0;
    totalThoi.forEach(svvv => {
        htmlThoi += '<div><span class="label label-info">Server ' + svvv.Server + '</span> Số acc:' + svvv.Count + " Tổng thỏi: " + numberWithCommas(svvv.Gold) + "</div>"
        totalAccThoi+=svvv.Count
        totalGoldThoi+=svvv.Gold
    });

    htmlThoi+=`<br>Tổng ${totalAccThoi} acc - ${numberWithCommas(totalGoldThoi)} THỎI`


    res.render("index", { page: "pages/home", total: html, totalThoi: htmlThoi  })
})
function numberWithCommas(x) {
    if (x == undefined) {
        return -1;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
module.exports = router