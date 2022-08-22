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

module.exports = router