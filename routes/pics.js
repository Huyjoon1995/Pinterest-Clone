var express = require('express');
var router = express.Router();
var Pic = require('../models/pic');
var validUrl = require('valid-url');

//post request
router.post('/addpic', function(req, res, next) {
  var url;
  var title = req.body.title || 'A cool image uploaded by ' + req.user.twitter.username + '!';
  if (validUrl.isUri(req.body.url)) {
    url = req.body.url;
  } else {
    url = 'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png';
  }
  var newPic = new Pic({
    user: req.user.twitter.username,
    url: url,
    title: title
  });

//save the pic to the database
  Pic.savePic(newPic, function(err, data) {
    if (err) throw err;
    res.redirect('/users/myprofile');
  });

});

//delete the pic user doesnt want
router.get('/delete/:id', function(req, res, next) {
  Pic.deletePic(req.params.id, function(err, data) {
    if (err) throw err;
    console.log('Pic was removed');
    res.redirect('/users/myprofile');
  });
});

module.exports = router;
