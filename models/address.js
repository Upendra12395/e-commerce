const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    address1 : {
        type : String,
        required : true
    },
    address2 : {
        type : String,
        required : true
    },
    landmark : {
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    pincode : {
        type: Number,
        required : true
    }
})

module.exports = mongoose.model('Address', addressSchema)