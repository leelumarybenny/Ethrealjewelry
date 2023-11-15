const mongoose = require('mongoose')

const{Schema} = mongoose;

const Userschema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    }
},{timestamps:true});
const User = mongoose.model('users', Userschema)
module.exports = User;
