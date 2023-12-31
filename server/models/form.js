const mongoose = require("mongoose");
const FormSchema = mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    manufacturername:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    }
});

module.exports = mongoose.model("form",FormSchema);