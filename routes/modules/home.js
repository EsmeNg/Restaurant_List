const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//  設置路由: 餐廳清單主頁
router.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, style: 'index.css' }))
    .catch(error => console.error(error))
  })

//  設置路由: 用戶搜尋餐龐的結果
router.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim()
    return Restaurant.find({ name: {$regex: keyword, $options: 'i' }})
    .lean()
    .then( restaurants => {
      const noSearchResult = restaurants.length? 0 : 1
      res.render('index', { keyword, restaurants,noSearchResult, style: 'index.css' })
    })
  })

module.exports = router