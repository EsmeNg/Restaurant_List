//  express的基本設置
const express = require('express')
const app = express()
const port = 3000

//  mongoose的基本設置及與資料庫伺服器連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//////////////待修理,等等把它拿掉  載入resaurant清單///////////////////////////
const restaurantList = require('./public/mydata/restaurant.json')

// 把Restaurant Model的資料引進樣板
const Restaurant = require('./models/restaurant')

//  樣板引擎的基本設置
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//  指定靜態資料位置
app.use(express.static('public'))

//  設置路由: 餐廳清單主頁
TODO: //根目錄要靠db render,而不是json
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants, style: 'index.css' }))
  .catch(error => console.error(error))
})

//  設置路由: 各餐廳詳細資料
//TODO:去db找而不是json
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant, style: 'show.css' })
})

//  設置路由: 用戶搜尋餐龐的結果
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.trim().toLowerCase()) || restaurant.name_en.toLowerCase().includes(req.query.keyword.trim().toLowerCase()) || restaurant.category.includes(req.query.keyword.trim())) 
  const noSearchResult = restaurants.length? 0 : 1
  res.render('index', { keyword, restaurants, noSearchResult, style: 'index.css' })
})

//  監聽瀏覽器與伺服器的連結情形
app.listen(port, () => {
  console.log(`you're running on localhost:${port}`)
})
