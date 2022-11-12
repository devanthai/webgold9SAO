const router = require('express').Router()
const BotThoiController = require("../controllers/BotthoiController")

router.get("/thembot", BotThoiController.ThemBotView)
router.post("/thembot", BotThoiController.ThemBot)

router.get("/bots", BotThoiController.BotManagerView)
router.get("/botstoday", BotThoiController.BotToday)



router.post("/remove", BotThoiController.RemoveBot)
router.post("/change", BotThoiController.ChangeBot)


router.get("/hisnap9s", BotThoiController.HisToryNap9s)
router.get("/hisrutvang9s", BotThoiController.HisToryRut9s)
router.get("/hisvangnhap", BotThoiController.HistoryVangNhap)
router.get("/historyall", BotThoiController.HistoryAll)

module.exports = router