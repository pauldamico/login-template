const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


//database connection
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/password-template", ()=>{
console.log("Database Connected")
})

app.get("/", (req, res, next)=>{
console.log("initial get")
res.send("Welcome to the login Template")
})


app.use( (require('./routes/authRouter.js')))


//this validates the webtokens
app.use('/api', expressjwt({secret:process.env.SECRET, algorithms:["HS256"] }))


// Err Handling
app.use( (err, req, res, next)=>{
    return res.send({errMsg:err.message})
})

app.listen(9000, ()=>{
    console.log("Server listening on port 9000")
})