var mongoose = require('mongoose');

module.exports = {User};

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1
  }
});
