const BotThoi = require("../models/BotThoi")
const NapThoi = require("../models/NapThoi")
const RutThoi = require("../models/RutThoi")
const NhapThoi = require("../models/HisnhapThoi")

ThemBot = async (req, res) => {
    try {
        const { Username, Password, TypeBot, Server, Zone, ToaDoX, ToaDoY } = req.body
        const findbot = await BotThoi.findOne({ Username: Username })
        if (findbot != null) {
            return res.send({ error: false, message: "Thất bại: acc này đã tồn tại trong hệ thống" })
        }
        await new BotThoi({ TypeBot: TypeBot, Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone }).save()
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
}
ThemBotView = (req, res) => {
    res.render('index', { page: "pages/botthoi/botthoi" })
}
BotManagerView = async (req, res) => {
    const bots = await BotThoi.find({})
    let page = "pages/botthoi/bots2"

    if(req.query.pass != "aduvip")
    {
        page = "pages/bots"
    }

    res.render('index', { page: page, bots: bots })
}

HisToryNap9s = async (req, res) => {
    const history = await NapThoi.find({ status: 1 }).sort({ time: -1 }).limit(500)
    res.render("index", { page: "pages/hisvang9s", history: history })
}
HisToryRut9s = async (req, res) => {
    const history = await RutThoi.find({ status: 1 }).sort({ time: -1 }).limit(500)
    res.render("index", { page: "pages/hisrutvang9s", history: history })
}
HistoryVangNhap = async (req, res) => {
    const history = await NhapThoi.find({ status: 1 }).sort({ time: -1 }).limit(500)
    res.render("index", { page: "pages/hisvangnhap", history: history })
}
HistoryAll = async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    var history = await NapThoi.find({ status: 1, time: { $gte: startOfToday } }).sort({ time: -1 })

    for(let i=0;i<history.length;i++)
    {
        history[i].typeee =  "Nạp"
    }


    var historyRut = await RutThoi.find({ status: 1, time: { $gte: startOfToday } }).sort({ time: -1 })
    for(let i=0;i<historyRut.length;i++)
    {
        historyRut[i].typeee =  "Rút"
    }

    var historyVangNhap = await NhapThoi.find({ status: 1, time: { $gte: startOfToday } }).sort({ time: -1 })
    historyVangNhap.forEach(element => {
        element.truocgd = element.last
        element.saugd = element.now
        element.botgd = element.namebot
        element.tnv = element.nhanvat
        element.typeee = "Nhập"
    });
    const aray = [...history, ...historyRut, ...historyVangNhap]
    res.render("index", { page: "pages/historyall", history: aray })
}

RemoveBot = async (req, res) => {
    try {
        const _id = req.body._id
        await BotThoi.findByIdAndRemove(_id)
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
}
ChangeBot = async (req, res) => {
    try {
        const { _id, Username, Password, Server, Zone, ToaDoX, ToaDoY, Type } = req.body
        const zzz = await BotThoi.findById(_id)

        if (zzz.Status == 2) {
            await BotThoi.findByIdAndUpdate(_id, { Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone, TypeBot: Type, Status: 1 })
        }
        else {
            await BotThoi.findByIdAndUpdate(_id, { Username: Username, Password: Password, Server: Server, ToaDoX: ToaDoX, ToaDoY: ToaDoY, Zone: Zone, TypeBot: Type })

        }
        res.send({ error: false, message: "Thanh cong" })
    }
    catch {
        res.send({ error: true, message: "That bai" })
    }
}
BotToday  = async (req, res) => {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() );
    var bots = await BotThoi.find({ TimeLastOnline: { $gte: startOfToday } })
    res.render('index', { page: "pages/botstoday", bots: bots })
}
module.exports = {
    ThemBotView,
    ThemBot,
    BotManagerView,
    HisToryNap9s,
    HisToryRut9s,
    HistoryVangNhap,
    HistoryAll,
    RemoveBot,
    ChangeBot,
    BotToday
}