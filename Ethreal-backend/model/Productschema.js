const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const Productschema = new Schema({

    productName : {
        type: String,
        required: true,

    },
    category : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categories',
        required: true
    },
    
    specification: {
        type: String,
        required: true,
    },
    market_price: {
        type: Number,
        required: true
       
    },
    sale_price: {
        type: Number,
        required: true
       
    },
    available: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        required: false

    }

     
},{timestamps:true});
 const Product = mongoose.model("Products",Productschema);
module.exports = Product
