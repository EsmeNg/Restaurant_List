const mongoose = require('mongoose')
const restaurantJSON = require('../../public/mydata/restaurant.json')
const Restaurant = require('../restaurant')
const rawData = restaurantJSON.results

mongoose.connect('mongodb://localhost/restaurant')
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')

    for(let i = 0; i < rawData.length; i++) {
        Restaurant.create({ id: rawData[i].id,
            name: rawData[i].name,
            name_en: rawData[i].name_en,
            category: rawData[i].category,
            image: rawData[i].image,
            google_map: rawData[i].google_map,
            rating: rawData[i].rating,
            description: rawData[i].description })
    }
    console.log('done.')
})