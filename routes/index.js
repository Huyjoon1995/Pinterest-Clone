var express = require('express');
var router = express.Router();
var Pic = require('../models/pic');

/* GET home page. */

//go to the pic database and display the picture and username also caption
router.get('/', function(req, res, next) {
  Pic.allPics({}, function(err, data) {
    console.log(data);
    res.render('index', {pics: data});
  });
});

module.exports = router;
