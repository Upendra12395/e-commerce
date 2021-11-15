const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    size:{
        type: Array,                //added for mongoDB query practice
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)