
const express = require('express');
const port = 3000;
const app = express();
const bp = require('body-parser');
const path = require('path');
var passport   = require('passport');
var session    = require('express-session');

//set view engine
app.set("view engine", "pug");

//Models
var user = require("./models/User");



//mounting middleware
app.use('/diseases', require('./routes/disease'));
app.use('/variants', require('./routes/variant'));
app.use('/genedisassoc', require('./routes/genedisassoc'));
app.use('/vardisassoc', require('./routes/vardisassoc'));
app.use('/genes', require('./routes/gene'));
app.use(express.static(path.join(__dirname+'/public')));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions


//load passport strategies
require('./config/passport.js')(passport, user);

//load passport strategies
var authRoute = require('./routes/admin.js')(app,passport);

app.get('/signin', function(req, res){
    res.render('login');
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/home', function(req, res) {
    res.render('home');
});

app.get('/home/sr', function(req,res){
   res.redirect('/'+req.query.type+'/search/'+req.query.id);
});


app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
