const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mbot = require('./models/BotGold')
const fs = require('fs')
dotenv.config()
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));
zzzz = async () => {
    fs.readFile('list.txt', async function (err, data) {
        if (err) { console.log("loi") }
        const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
        arr.forEach(async (element) => {
            try {
                let server = element.split('|')[1].replace("Server ", "")
                let zzzz = element.split('|')[3]
                let taikhoan = zzzz.split(':')[0]
                let matkhau = zzzz.split(':')[1]
                const zzz = await Mbot.findOne({ Username: taikhoan })
                if (!zzz) {
                    console.log(server + "|" + taikhoan + "|" + matkhau)
                }
                // console.log(zzz)
            }
            catch { }
        });
        console.log("done")
    })

}
zzzz()