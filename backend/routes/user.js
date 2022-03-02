const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JsonWebTokenError } = require("jsonwebtoken");
const user = require("../models/user");

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('./log.txt', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

let today = new Date();

const router = express.Router();

router.post("/signup", (req, res, next)=>{
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result =>{
      console.log("[" +today + "]" + " User has been created successfully!");
      res.status(201).json({
        message: "User has been created successfully!",
        result: result
      });
    })
    .catch(err =>{
      console.log("[" +today + "]" + " User has not been created successfully!");
      res.status(500).json({
          message: "Invalid authentication credentials!"
      });
    });
  });
});



router.post("/login", (req, res, next)=>{
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user =>{
    if (!user){
      console.log("[" +today + "]" + " User login failed, user has not been authenticated!");
      return res.status(401).json({
        message: "User authentication has failed!"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result =>{
    if (!result){
      console.log("[" +today + "]" + " User login failed, user has not been authenticated!");
      return res.status(401).json({
        message: "User authentication has failed!"
      });
    }
     const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_this_should_be_longer', { expiresIn: "1h" });
     console.log("[" +today + "]" + " User has logged in successfully, user authenticated!");
     res.status(200).json({
       token: token,
       expiresIn: 3600,
       userId: fetchedUser._id
     });
  })
  .catch(err =>{
    console.log("[" +today + "]" + " User login failed, user has not been authenticated!");
    return res.status(401).json({
      message: "Invalid authentication credentials!"
    });
  });
});
module.exports = router;

