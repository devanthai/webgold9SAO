const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Mbot = require('./models/BotGold')
const fs = require('fs')
dotenv.config()
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

zzzz = async () => {
    const accs = await Mbot.find({}).sort({Server:1})
    accs.forEach(element => {
        const content = element.Server +"|"+ element.Username +"|"+element.Password
        console.log(content);
    });
}
zzzz()