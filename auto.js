const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mbot = require('./models/BotThoi')
const BotGold = require('./models/BotGold')
const fs = require('fs')
dotenv.config()
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

zzzz = async () => {

    fs.readFile('aacc1.txt', async function (err, data) {
        if (err) { console.log("loi") }
        const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
        arr.forEach(async (element) => {
            try {
                let taikhoan = element.split('|')[1]
                let server = element.split('|')[0]
                let matkhau = element.split('|')[2]
                const zzz = await Mbot.findOne({ Username: taikhoan, Server: server })
                if (!zzz) {
                    console.log(server + "|" + taikhoan + "|" + matkhau)
                    await new Mbot({ Gold: 0, Username: taikhoan, Password: matkhau, Server: server, Zone: getRandomIntInclusive(15, 55), ToaDoX: getRandomIntInclusive(880, 1320), ToaDoY: 432, TypeBot: 1 }).save()
                }
            }
            catch { }
        });
        console.log("done")
    })

}
zzzz()