var express  = require('express');
var app  = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');
const Blog = require("./model/blog");
require("dotenv/config"); 
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        findByIdAndUpdate:true,
        findByIdAndDelete:true
    },
        (req,res)=>{console.log("connected...");})

app.get('/blog', function(req,res){
    Blog.find()
    .then(blog=>{
        res.send(blog)
    })
    .catch(err=>{
        res.status(500).send({message:"something went wrong!"})
    })
});

app.post("/blog", async(req,res)=>{
try {
    const myblog = new Blog(req.body);
    await myblog.save();
} catch (error) {
    res.send({messsage:error});
}
});
app.put("/blog:id", async(req,res)=>{
    Blog.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"could not update"})
        }else{
            res.send(data)
        }
    })
    .catch(error=>{
        res.status(500).send({message:"Error!!!"})
    })
});
app.delete("/user:id", async(req,res)=>{
    Blog.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"could not delete"})
        }else{
            res.send({message:"User was deleted successfully!"})
        }
    })
    .catch(error=>{
        res.status(500).send({message:"Error!!!"})
    })
});
app.listen(3000,()=>{console.log('listening...');});