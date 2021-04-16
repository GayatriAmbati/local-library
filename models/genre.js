var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Genre = new Schema(
  {
name:{type: String , required: true , maxlength:100 , minlength: 3 }
  }
);

// Virtual for bookinstance's URL
Genre
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', Genre);