const mongoose = require('mongoose')

const{Schema} = mongoose;

const CategorySchema = new Schema({
    category:{
        type: String,
        required: true
    }
},{timestamps:true});
const Category = mongoose.model('categories', CategorySchema)
module.exports = Category;
