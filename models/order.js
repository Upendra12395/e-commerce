const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    product : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }],
    quantity : {
        type : Number,
        required : true
    },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    }
})

module.exports = mongoose.model("Order", orderSchema)