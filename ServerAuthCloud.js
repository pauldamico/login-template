var express = require('express');
var app = express();
var { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors')
app.use(cors())
app.use (express.json())

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-0zd4zxu226vwide7.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://localhost:8080',
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

app.listen(8080, ()=>{
    console.log("server running on port 8080")
});