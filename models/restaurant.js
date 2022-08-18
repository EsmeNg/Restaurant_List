const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema ({
    name: String,
    enName: String,
    category: String,
    image: String,
    googleMap: String,
    rating: Number,
    description: String,
    phoneNumber: String,
    address: String
})

module.exports = mongoose.model('Restaurant', restaurantSchema)