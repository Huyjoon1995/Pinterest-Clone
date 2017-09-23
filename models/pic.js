var mongoose = require('mongoose');

//create the schema for pic database
var PicSchema = mongoose.Schema({
  user: String,
  url: String,
  title: String
});

var Pic = module.exports = mongoose.model('Pic', PicSchema);

//savePic
module.exports.savePic = function(newPic, callback) {
  newPic.save(callback);
};

//display all the pic
module.exports.allPics = function(query, callback) {
  Pic.find(query, callback);
};

//delete the pic user doesn't want
module.exports.deletePic = function(id, callback) {
  Pic.findByIdAndRemove(id, callback);
};
