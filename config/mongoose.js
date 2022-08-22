//  mongoose的基本設置及與資料庫伺服器連線
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
  
db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db