const express = require("express");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

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

router.post("", checkAuth, (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
    post.save().then(createdPost =>{
    console.log("[" +today + "]" + " Post has been created successfully!");
    res.status(201).json({
    message: 'Post added successfully!',
    postId: createdPost._id
    });
  })
  .catch(error => {
    console.log("[" +today + "]" + " Post failed to create!");
    res.status(500).json({
      message: "Post failed to be created!"
    });
  });
});

router.get("", (req, res, next)=>{
  Post.find()
  .then(documents =>{
    console.log("[" +today + "]" + " Post fetched successfully!");
    res.status(200).json({
      message: 'Post fetched successfully!',
      posts: documents
    });
  })
  .catch(error => {
    console.log("[" +today + "]" + " Post failed to fetch!");
    res.status(500).json({
      message: "Failed to fetch posts!"
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next)=>{
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result =>{
    if(result.n > 0){
      console.log("[" +today + "]" + " Post deleted to successfully!");
      res.status(200).json({message: "Deletion successful!"});
    }
    else{
      console.log("[" +today + "]" + " User not authorized to delete post!");
      res.status(401).json({message: "Not authorized to delete!"});
    }
  }).catch(error => {
    console.log("[" +today + "]" + " Failed to delete post!");
    res.status(500).json({
      message: "Failed to delete post!"
    });
  });
});

module.exports = router;
