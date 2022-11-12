const router = require('express').Router()
const MbotVang = require('../../models/BotGold')

setInterval(async () => {
    const ccc = await MbotVang.find({})
    ccc.forEach(async (element) => {
        if (secondSince(element.updatedAt) > 40 && element.Status == 1) {
            await MbotVang.findByIdAndUpdate(element._id, { Status: -1, CodeVps: "null", IpVps: "null" });
        }
        else if (secondSince(element.updatedAt) > 200 && element.Status == -1 && element.CodeVps != "null") {
            await MbotVang.findByIdAndUpdate(element._id, { Status: -1, CodeVps: "null", IpVps: "null" });
        }
    });
}, 85000);

router.post("/updatefail", async (req, res) => {
    const { _id } = req.body
    console.log(_id)
    const findzzz = await MbotVang.findById(_id)
    if (!findzzz) {
        return res.send("out")
    }
    const findup = await MbotVang.findByIdAndUpdate({ _id: _id }, { Status: 2 })
    res.send("out")
})

router.post("/updatebot", async (req, res) => {
    const { _id, Name, Gold, TypeBot, Version } = req.body
    const findzzz = await MbotVang.findById(_id)
    if (!findzzz) {
        return res.send("out")
    }
    else if (Gold > 1500000000 && TypeBot == 1) {
        await MbotVang.findByIdAndUpdate({ _id: _id }, { Version: (Version || "1.6.6"), Name: Name, Gold: Gold, Status: -1, TypeBot: 2, CodeVps: "null" })
        return res.send("out")
    }
    else if (Gold < 500000000 && TypeBot == 2) {
        await MbotVang.findByIdAndUpdate({ _id: _id }, { Version: (Version || "1.6.6"), Name: Name, Gold: Gold, Status: -1, TypeBot: 1, CodeVps: "null" })
        return res.send("out")
    }
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    const findup = await MbotVang.findByIdAndUpdate({ _id: _id }, { Version: (Version || "1.6.6"),Name: Name, Gold: Gold, Status: 1, IpVps: ip, TimeLastOnline: new Date() })

    res.send(findup._id + "|" + findup.Server + "|" + findup.Username + "|" + findup.Password + "|" + findup.ToaDoX + "|" + findup.ToaDoY + "|" + findup.Zone + "|" + findup.TypeBot)
})
router.post("/updatebot2", async (req, res) => {
    const { _id, Name, Gold, TypeBot } = req.body

    console.log(req.body)
    const findzzz = await MbotVang.findById(_id)
    if (!findzzz) {
        return res.send("out")
    }
    else if (Gold > 1500000000 && TypeBot == 1) {
        await MbotVang.findByIdAndUpdate({ _id: _id }, { Name: Name, Gold: Gold, Status: -1, TypeBot: 2, CodeVps: "null" })
        return res.send("out")
    }
    else if (Gold < 500000000 && TypeBot == 2) {
        await MbotVang.findByIdAndUpdate({ _id: _id }, { Name: Name, Gold: Gold, Status: -1, TypeBot: 1, CodeVps: "null" })
        return res.send("out")
    }
    const findup = await MbotVang.findByIdAndUpdate({ _id: _id }, { Name: Name, Gold: Gold })
    if (findup) {
        return res.send("out")
    }
    res.send(findup._id + "|" + findup.Server + "|" + findup.Username + "|" + findup.Password + "|" + findup.ToaDoX + "|" + findup.ToaDoY + "|" + findup.Zone + "|" + findup.TypeBot)
})
router.post('/getbottool', async (req, res) => {
    var accFirt = null
    var accFind = await MbotVang.find({})
    //Tìm acc nào trong vps đó ko hoạt động trong 3600s = 1 tiếng
    for (let i = 0; i < accFind.length; i++) {
        if (secondSince(accFind[i].updatedAt) > 36000) {
            accFirt = accFind[i]
            break
        }
    }
    //nếu có acc không hoạt động quá 3600s thì trả về acc đó
    if (accFirt != null) {
        const setMacAcc = await MbotVang.findByIdAndUpdate(accFirt._id, { CodeVps: "null" })
        res.send(setMacAcc)
    }
    else {
        res.send("null")
    }
})
router.post('/getbottoolz', async (req, res) => {
    var accFirt = null
    var accFind = await MbotVang.find({ Name: "Chưa vào game", Status: { $ne: 2 } })
    //TÌm acc chưa có tên nhân vật và time lớn hơn 60s
    for (let i = 0; i < accFind.length; i++) {
        if (secondSince(accFind[i].updatedAt) > 60) {
            accFirt = accFind[i]
            break
        }
    }
    //Nếu có thìvaof
    if (accFirt != null) {
        const setMacAcc = await MbotVang.findByIdAndUpdate(accFirt._id, { CodeVps: "null" })
        res.send(setMacAcc)
    }
    else {
        res.send("null")
    }
})

router.post('/getbot', async (req, res) => {
    const MacAddress = req.body.Mac
    const Type = req.body.Type
    var findAcc = await MbotVang.find({ CodeVps: MacAddress, TypeBot: Type })
    var serverNo = -1
    var accFirt = null
    var accFind = await MbotVang.find({ TypeBot: Type, Status: -1 })
    //Tìm server chưa có trong vps
    for (let z = 1; z <= 10; z++) {
        const findAcccc = accFind.find(({ Server }) => Server === z);
        if (!findAcccc) {
            continue
        }

        var findAccUpdate = await MbotVang.findOne({ CodeVps: "null", TypeBot: Number(Type), Server: Number(z), Status: { $ne: 2 } })
        if (!findAccUpdate) {
            console.log("het nick next " + MacAddress + "|" + Type + "|" + z)
            continue
        }


        const checkContain = findAcc.find(({ Server }) => Server === z);
        if (!checkContain && findAccUpdate) {
            serverNo = z
            break
        }
    }
    console.log("Server chua co trong vps " + serverNo)
    //Tìm acc nào trong vps đó ko hoạt động trong 60s
    for (let i = 0; i < findAcc.length; i++) {
        if (secondSince(findAcc[i].updatedAt) > 100 && findAcc[i].Status != 2) {
            accFirt = findAcc[i]
            break
        }
    }
    //nếu có acc không hoạt động thì trả về acc đó
    if (accFirt != null) {
        const setMacAcc = await MbotVang.findByIdAndUpdate(accFirt._id, { CodeVps: MacAddress })
        console.log("k hoat dong",accFirt)
        res.send(setMacAcc)
    }
    //Không tìm thấy server trống thì trả null
    else if (serverNo == -1) {

        res.send("null")
    }
    else {
        var setMacAcc = await MbotVang.findOneAndUpdate({ CodeVps: "null", TypeBot: Number(Type), Server: Number(serverNo), Status: { $ne: 2 } }, { CodeVps: MacAddress })
        console.log("set mac "+setMacAcc)

        if (!setMacAcc) {
            console.log("k tim thay set mac " + MacAddress + "|" + Type + "|" + serverNo)

            return res.send("null")
        }
        res.send(setMacAcc)
    }
})

function filterByServer(Acc, Server) {
    if (Acc.Server == Server) {
        return true
    }
    return false;
}
router.post('/getbot2', async (req, res) => {
    const MacAddress = req.body.Mac
    const Type = req.body.Type
    var findAcc = await MbotVang.find({ CodeVps: MacAddress, TypeBot: Type })
    var serverNo = -1
    var accFirt = null
    var accFind = await MbotVang.find({ TypeBot: Type, Status: -1 })
    //Tìm server chưa có trong vps
    for (let z = 1; z <= 10; z++) {
        let findAccByServer = accFind.filter((acc) => filterByServer(acc, z))
        if (findAccByServer.length == 0) {
            continue
        }
        let findAccByServer2 = findAcc.filter((acc) => filterByServer(acc, z))
        if (findAccByServer2.length < 2) {
            serverNo = z
            break
        }
    }
    //Tìm acc nào trong vps đó ko hoạt động trong 60s
    for (let i = 0; i < findAcc.length; i++) {
        if (secondSince(findAcc[i].updatedAt) > 100 && findAcc[i].Status != 2) {
            accFirt = findAcc[i]
            break
        }
    }
    //nếu có acc không hoạt động thì trả về acc đó
    if (accFirt != null) {
        const setMacAcc = await MbotVang.findByIdAndUpdate(accFirt._id, { CodeVps: MacAddress })
        console.log("k hoat dong",setMacAcc)

        res.send(setMacAcc)
    }
    //Không tìm thấy server trống thì trả null
    else if (serverNo == -1) {
        res.send("null")
    }
    else {
        var setMacAcc = await MbotVang.findOneAndUpdate({ CodeVps: "null", TypeBot: Type, Server: serverNo, Status: { $ne: 2 } }, { CodeVps: MacAddress })
        if (!setMacAcc) {
            
            return res.send("null")
        }
        console.log("set mac ",setMacAcc)

        res.send(setMacAcc)
    }
})
function secondSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    return Math.floor(seconds)
}
module.exports = router
