var express = require('express');
var router = express.Router();
var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../models/user');
var Pic = require('../models/pic');

/* GET users listing. */
router.get('/myprofile', ensureAuthenticated, function(req, res, next) {
  Pic.allPics({user: req.user.twitter.username}, function(err, data) {
    res.render('myprofile', {user: req.user.twitter.username, pics: data});
  });
});

router.get('/:user', function(req, res, next) {
  Pic.allPics({user: req.params.user}, function(err, data) {
    res.render('userprofile', {user: req.params.user, pics: data});
  });
});

/* Passport function for access control. */
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
 res.send('You need to log in!!!');
}
module.exports = router;
