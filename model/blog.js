const mongoose = require('mongoose');

const  Blog = mongoose.Schema({
    title:String,
    body:String,
    author:String,
    date:String
});
module.exports = mongoose.model("Blog",Blog);