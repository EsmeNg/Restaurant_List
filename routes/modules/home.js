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

router.post('/search', (req,res) => {
    //  用IIFE找出sortList中哪個選項被用戶選取，藉此修改isSelect的boolean值（只會有一個為true）
    //  此用處是讓hbs替我們記住用戶選擇，因為只有isSelect為true，它才會幫我們加上"selected"屬性
  (function checkSelected(string) {
    for(let i in sortList) {
      sortList[i].isSelect = sortList[i].value === string
    }
  }(req.body.filter_option))

    //  找出使用者選取的分類方法，回傳sortList中相對應的sort method
  function getSortMethod(string) {
    for(let i in sortList) {
    if (sortList[i].value === string) return sortList[i].sortMethod
    }
  }
    const keyword = req.body.keyword.trim()
    return Restaurant.find({ name: {$regex: keyword, $options: 'i' }})
    .lean()
    .sort(getSortMethod(req.body.filter_option))
    .then( restaurants => {
      const noSearchResult = restaurants.length? 0 : 1
      res.render('index', { keyword, restaurants, sortList, noSearchResult, style: 'index.css' })
    })
  })


module.exports = router