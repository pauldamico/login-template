const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

authRouter.post("signup", (req, res, next) => {
  User.find({ username: req.body.username }, (err, foundUser) => {
    {
      if (foundUser) {
        res.status(403);
        return next(new Error("Username already exists"));
      }
      const newUser = new User(req.body);
      newUser.save((err, newUserInfo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        const token = jwt.sign(newUserInfo.removePassword, prcess.env.SECRET);
        res.send({ user: newUserInfo.removePassword, token });
      });
    }
  });
});

authRouter.post("login", (req, res, next) => {});

modules.export = authRouter;
