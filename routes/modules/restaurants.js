const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//  設置路由: 創建餐廳頁面
router.get('/new', (req, res) => {
  res.render('new', { style: 'newandedit.css' })
})

//  設置路由: 接收新創建的餐廳資料
router.post('/', (req,res) => {
  /*const {name, enName, rating, category, phoneNumber, address, description, googleMap, image} = req.body*/
  return Restaurant.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

//  設置路由: 各餐廳詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show', { restaurant, style: 'show.css' }))
  .catch(error => console.error(error))
})

//  設置路由: 修改各餐廳資料的頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('edit', {restaurant, style: 'newandedit.css' }))
})

//  設置路由: 接收修改後的餐廳資料
router.put('/:id', (req,res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .then(restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

module.exports = router