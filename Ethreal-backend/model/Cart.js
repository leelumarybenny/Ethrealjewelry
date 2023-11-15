const mongoose = require('mongoose')

const{Schema} = mongoose;

const CartSchema = new Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Products',required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',required: true
    }
},{timestamps:true});
const Cart = mongoose.model('carts', CartSchema)
module.exports = Cart;
