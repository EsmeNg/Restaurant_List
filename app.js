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

//  設置路由: 餐廳清單主頁
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants, style: 'index.css' }))
  .catch(error => console.error(error))
})

//  設置路由: 創建餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new', { style: 'newandedit.css' })
})

//  設置路由: 接收新創建的餐廳資料
app.post('/restaurants', (req,res) => {
  /*const {name, enName, rating, category, phoneNumber, address, description, googleMap, image} = req.body*/
  return Restaurant.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})


//  設置路由: 各餐廳詳細資料
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show', { restaurant, style: 'show.css' }))
  .catch(error => console.error(error))
})

//  設置路由: 修改各餐廳資料的頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('edit', {restaurant, style: 'newandedit.css' }))
})

//  設置路由: 接收修改後的餐廳資料
app.put('/restaurants/:id', (req,res) => {
  const id = req.params.id
  //const {name, enName, rating, category, phoneNumber, address, description, googleMap, image} = req.body
  return Restaurant.findById(id)
  .then(restaurant => {
    // restaurant.name = name
    // restaurant.enName = enName
    // restaurant.rating = rating
    // restaurant.phoneNumber = phoneNumber
    // restaurant.address = address
    // restaurant.description = description
    // restaurant.googleMap = googleMap
    // restaurant.image = image
    restaurant = Object.assign(restaurant, req.body)
    return restaurant.save()
  })
  .then(() => res.redirect(`/restaurants/${id}`))
  .catch(error => console.error(error))
})

//  設置路由: 刪除餐廳資料
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

//  設置路由: 用戶搜尋餐龐的結果
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find({ name: {$regex: keyword, $options: 'i' }})
  .lean()
  .then( restaurants => {
    const noSearchResult = restaurants.length? 0 : 1
    res.render('index', { keyword, restaurants,noSearchResult, style: 'index.css' })
  })
})

//  監聽瀏覽器與伺服器的連結情形
app.listen(port, () => {
  console.log(`you're running on localhost:${port}`)
})
