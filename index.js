const express = require('express');
const app = express()

const dotenv = require('dotenv');
dotenv.config()
const mongoose = require('mongoose');
let bodyParser = require('body-parser')
let Router = require('./routers')
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'));

//let session = require('express-session')
let cookieSession = require('cookie-session')
let Keygrip = require('keygrip')
app.set('trust proxy', 1)

let session = cookieSession({
    name: 'session22',
    keys: new Keygrip(['key1', 'key2'], 'sha256', 'hex'),
    maxAge: 2400 * 60 * 60 * 10,
    cookie: {
      httpOnly: true,
      secure: true
    }
  })

app.use(session)
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(express.static('public'))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(Router)
const server = require('http').createServer(app);
server.listen(3001, () => console.log('Server Running on port 3001'));