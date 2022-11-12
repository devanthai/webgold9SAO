const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mbot = require('./models/BotGold')
const fs = require('fs')
dotenv.config()
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));
zzzz = async () => {
    fs.readFile('accchange.txt', async function (err, data) {
        if (err) { console.log("loi") }
        const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
        arr.forEach(async (element) => {
            try {

                let taikhoan = element.split('|')[0]
                let matkhau = element.split('|')[1]
                let matkhaunew = element.split('|')[2]
                var zzz = await Mbot.findOne({ Username: taikhoan })
                if (zzz) {
                    zzz.Password = matkhaunew
                    zzz.Status = -1
                    zzz.save()
                    //console.log(taikhoan+"|"+matkhau+"|"+matkhaunew)
                }
                // console.log(zzz)
            }
            catch { }
        });
        console.log("done")
    })

}
zzzz()