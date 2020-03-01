const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  items: [{
    url: {type:String},
    image: {type:String}
  }],
})

module.exports = mongoose.model('Ad', schema)