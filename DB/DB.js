require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async()=>{
    await mongoose.connect(process.env.DATABASE_URI,{useUnifiedTopology:true, useNewUrlParser:true})
    console.log('Connected to cloud database')
}

module.exports = connectDB