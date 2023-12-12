const mongoose = require("mongoose");
const QrSchema = mongoose.Schema({
    productId:{
         type: mongoose.Types.ObjectId, 
         ref: 'form' ,
        required:true
    },
    
    qrcode:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("qrcode",QrSchema);