const mongoose = require("mongoose")
const Schema = mongoose.Schema
const cloudUserSchema = Schema({
username:{type:String, unique:true}



})


module.exports(mongoose.model("CloudUser", cloudUserSchema))