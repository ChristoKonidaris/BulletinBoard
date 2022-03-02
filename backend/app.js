const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect('mongodb+srv://Christo_Konidaris_19013888:Ckon2809@cluster0.sp5k7.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to database!');
})
.catch(()=>{
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
  res.setHeader("X-Frame-Options", "Deny"); //prevent framing or frame busting
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "*", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
