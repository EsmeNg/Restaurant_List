//  express的基本設置
const express = require('express')
const app = express()
const port = 3000

//  載入resaurant清單
const restaurantList = require('./restaurant.json')

//  樣板引擎的基本設置
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//  指定靜態資料位置
app.use(express.static('public'))

//  設置路由: 餐廳清單主頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, style: 'index.css' })
})

//  設置路由: 各餐廳詳細資料
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
