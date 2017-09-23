var express = require('express');
require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');


var index = require('./routes/index');
var users = require('./routes/users');
var pics = require('./routes/pics');

var app = express();

//connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://Huyjoon1995:Iamlegend3000!@ds147304.mlab.com:47304/pinterest');

//require the passport file to get the customer key and secret
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Handle session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true

}));
//passport
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next) { // asterick applies to all views
  res.locals.user = req.user || null; // locals is a var accessible for all views
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/pics', pics);


// send to twitter to do the authentication
app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

//logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
