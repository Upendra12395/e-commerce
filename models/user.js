const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type : String,
        required: true
    },
    lastName:{
        type : String,
        required: true
    },
    phone:{
        type: Number,
        match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please fill a valid phone no'],
        required: true
    },
    email: {
        type: String,
        //validate: [ isEmail, 'invalid email' ]
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true
    },
    orderList:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order"
    }],
    loggedInAt:{
        type : Date
    }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)


