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
    },
    barcode:{
        type:String,
        
    }
});

module.exports = mongoose.model("qrcode",QrSchema);