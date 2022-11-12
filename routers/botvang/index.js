const router = require('express').Router()
const MbotVang = require('../../models/BotGold')
//bot vang
router.get('/thembot', (req, res) => {
    res.render('index', { page: "pages/botvang" })
})
router.post('/thembot', async (req, res) => {
    try {
        const { Username, Password, TypeBot, Server, Zone, ToaDoX, ToaDoY } = req.body
        const findbot = await MbotVang.findOne({ Username: Username })
        if (findbot != null) {
            return res.send({ error: false, message: "Thất bại: acc này đã tồn tại trong hệ thống" })
        }
        await new MbotVang({ TypeBot: TypeBot, Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone }).save()
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
})
router.get('/bots', async (req, res) => {
    var bots = await MbotVang.find({})
    res.render('index', { page: "pages/bots", bots: bots })
})
router.get('/botstoday', async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var bots = await MbotVang.find({ TimeLastOnline: { $gte: startOfToday } })
    res.render('index', { page: "pages/botstoday", bots: bots })
})
router.get('/bots2222', async (req, res) => {
    if (req.query.z = "matkhau") {
        var bots = await MbotVang.find({})
        res.render('index', { page: "pages/bots2", bots: bots })
    }
})

router.post('/remove', async (req, res) => {
    try {
        const _id = req.body._id
        await MbotVang.findByIdAndRemove(_id)
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
})
router.post('/change', async (req, res) => {
    try {
        const { _id, Username, Password, Server, Zone, ToaDoX, ToaDoY, Type } = req.body
        const zzz = await MbotVang.findById(_id)

        if (zzz.Status == 2) {
            await MbotVang.findByIdAndUpdate(_id, { Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone, TypeBot: Type, Status: 1 })
        }
        else {
            await MbotVang.findByIdAndUpdate(_id, { Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone, TypeBot: Type })

        }
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
})
module.exports = router