const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const passwordLength = 8

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, foundUser) => {
    console.log(req.body.password.length);

    //Password must be longer then 8 characters
    if (req.body.password.length <= passwordLength) {
      return next (new Error("Password must be longer the 8 characters"));
    }
    //Username already exists
    if (foundUser) {
      res.status(403);
      return next(new Error("Username already exists"));
    }
    const newUser = new User(req.body);
    newUser.save((err, newUserInfo) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const token = jwt.sign(newUserInfo.removePassword(), process.env.SECRET);

      res.send({ user: newUserInfo.removePassword(), token });
    });
  });
});

authRouter.post("/login", (req, res, next) => {
User.findOne({username:req.body.username.toLowerCase()}, (err, foundUser)=>{
 
  if(!foundUser){
     res.status(403)
     return next(new Error("Username or password is incorrect"))
  }
  //if the user exists

foundUser.checkPassword(req.body.password, (err, isMatch)=>{
  if(err){
    res.status(500)
    return(next(err))
  }
    
  //if username is correct but the password does match
if(!isMatch){
 
res.status(403)
return next(new Error("Username or password is incorrect"))
}
//if the username and password match
if(isMatch){ 
  const token = jwt.sign(foundUser.removePassword(), process.env.SECRET);
  res.status(200)
  return res.send({user: foundUser.removePassword(), token:token})}
})
  
})

});

module.exports = authRouter;
