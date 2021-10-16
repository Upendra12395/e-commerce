const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const productRouter = require('./routes/product')
const bodyParser = require('body-parser')


const app = express();
const PORT = process.env.PORT || 5000
const password = process.env.PASSWORD
const mongoose_URL = `mongodb+srv://upendraa:${password}@cluster0.mwuaz.mongodb.net/eccomerce?retryWrites=true&w=majority`
app.use(express.json());

mongoose.connect(mongoose_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', ()=>{
    console.log("Database connected")
})

app.use('/product', productRouter)
app.get('/', (req,res)=>{
    res.send("hello")
})


app.listen(PORT, ()=>{
    console.log(`App running on Port ${PORT}`)
})