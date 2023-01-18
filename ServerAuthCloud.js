const express = require('express');
const app = express();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors')
app.use(cors())
app.use (express.json())

const port = process.env.PORT || 8080;

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


app.get('/', (req, res, next)=>{    
res.send("test")
})

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.use(jwtCheck);

app.listen(port, ()=>{
    console.log("server running on port 8080")
});