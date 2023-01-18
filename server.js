const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


//database connection
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/password-template", ()=>{
console.log("Database Connected")
})

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-0zd4zxu226vwide7.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://login-template-api/',
  issuer: 'https://dev-0zd4zxu226vwide7.us.auth0.com/',
  algorithms: ['RS256']
});


app.get("/", (req, res, next)=>{
    console.log("initial get")
    res.send("Welcome to the login Template")
    })


app.use( (require('./routes/authRouter.js')))


//this validates the webtokens
app.use('/api', jwt({secret:process.env.SECRET, algorithms:["HS256"] }))
app.use('/authorized', jwtCheck);

app.get("/authorized", (req, res, next)=>{
   
    console.log("initial get")
    res.send("Your Authorized")
    })

// Err Handling
app.use( (err, req, res, next)=>{
    return res.send({errMsg:err.message})
})

app.listen(9000, ()=>{
    console.log("Server listening on port 9000")
})