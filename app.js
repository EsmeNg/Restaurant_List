//  express的基本設置
const express = require('express')
const app = express()
const port = 3000

//  mongoose的基本設置及與資料庫伺服器連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

//  載入body-parser，接收form request的資料
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//  載入method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 把Restaurant Model的資料引進樣板
const Restaurant = require('./models/restaurant')

//  樣板引擎的基本設置
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//  指定靜態資料位置
app.use(express.static('public'))

//  告訴express收到請求後到這裡找路由
const routes = require('./routes')
app.use(routes)

//  監聽瀏覽器與伺服器的連結情形
app.listen(port, () => {
  console.log(`you're running on localhost:${port}`)
})
