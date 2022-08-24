const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const sortList = require('../../public/mydata/sortlist')

//  設置路由: 餐廳清單主頁
router.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, sortList, style: 'index.css' }))
    .catch(error => console.error(error))
  })

//  設置路由: 用戶搜尋餐龐的結果
router.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim()
    return Restaurant.find({ name: {$regex: keyword, $options: 'i' }})
    .lean()
    .then( restaurants => {
      const noSearchResult = restaurants.length? 0 : 1
      res.render('index', { keyword, restaurants, noSearchResult, style: 'index.css' })
    })
  })

//  設置路由: 用戶排序餐廳
router.post('/sort', (req, res) => {
  //  用IIFE檢查哪個選項是被選取的
  (function checkSelected(string) {
    for(let i in sortList) {
      sortList[i].isSelect = sortList[i].value === string
    }
  }(req.body.filter_option))

  //  比對使用者選取的分類方法，在mongoDB中對應哪個sort method
  function getSortMethod(string) {
    for(let i in sortList) {
    if (sortList[i].value === string) return sortList[i].sortMethod
    }
  }

  return Restaurant.find()
  .lean()
  .sort(getSortMethod(req.body.filter_option))
  .then( restaurants => {
    res.render('index', { restaurants, sortList, style: 'index.css' })
  })
})

module.exports = router