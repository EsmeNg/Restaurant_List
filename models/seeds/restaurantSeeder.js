const restaurantJSON = require('../../public/mydata/restaurant.json')
const Restaurant = require('../restaurant')
const rawData = restaurantJSON.results
const db = require('../../config/mongoose')

db.once('open', () => {
    for(let i = 0; i < rawData.length; i++) {
        Restaurant.create({ name: rawData[i].name,
            enName: rawData[i].name_en,
            category: rawData[i].category,
            image: rawData[i].image,
            googleMap: rawData[i].google_map,
            rating: rawData[i].rating,
            description: rawData[i].description,
            phoneNumber: rawData[i].phone,
            address: rawData[i].location
         })
    }
    console.log('done.')
})