const mongoose = require('congoose');

const  Blog = new mongoose.schema({
    title:String,
    body:String,
    author:String,
    date:String
});
module.exports = mongoose.model("Blog",Blog);