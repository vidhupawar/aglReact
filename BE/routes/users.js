var userCtrl = require('./../controllers/users');

  module.exports.set = function(){
    appObj.get('users/:id', userCtrl.getDetails, function(req, res){});
    appObj.post('login', userCtrl.userLogin);
  }