const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mbot = require('./models/BotGold')
const fs = require('fs')
dotenv.config()
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));
zzzz = async () => {




    fs.readFile('aacc1.txt', async function (err, data) {
       
            const arr = data.toString().replace(/\r\n/g, '\n').split('\n');
            var files = ""
            arr.forEach(async (element) => {
                try {

                    let taikhoan = element.split('|')[0]
                    let mkmoi = element.split('|')[1]
                    let mkcu = element.split('|')[2]
                  
                        files+= taikhoan+"|"+mkcu + "|" + mkmoi+"\r\n"
                       
                    
                    
                }
                catch { }
            });
            console.log(files)


            console.log("done")
    
    })

}
zzzz()