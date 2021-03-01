const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    age: 
    {
        type:Number,
        required:true
    },

    description: 
    {
        type:String,
        required:true
    },
    type: 
    {
        type:String,
        required:true
    },
    facts: 
    {
        type:String,
        required:false
    },
    img:
    {
        data: Buffer,
        contentType: String,
        required:false
    }


})

module.exports = mongoose.model('Character', characterSchema);