
var async = require('async');
var MD5 = require('MD5');


exports.userLogin = function(){
	if (req.headers.username && req.headers.password) {
		async.waterfall([
			function(cb){
				users_model.find({"name" : req.headers.username}, function(err, user_docs){
					if(err){
						cb(err)
					}else{
						cb(null, user_docs)
					}
				});
			},
			function(user_docs, cb){
				console.log("user_docs", user_docs)
				if (MD5(req.headers.password) == user_docs.pass){
					cb(null, user_docs);
				}else{
					cb('Invalid password');
				}
			}
		], function(err, user_docs){
			if(err){
				res.status(404).json({status:'failure', error: err});
			}else{
				res.status(200).json({'status':'success', 'searchResult': user_docs});
			}
		})
	}else{
		res.status(404).json({status:'failure', error: "Invalid credentials"});
	}
}

exports.getDetails = function(){
		app.get('/users/:id', function(req, res){
		var id = req.params.id;
		users_model.find({"id" : id}, function(err, user_docs){
			if(err){
				res.status(404).json({status:'failure', error: err});
			}else{
				res.status(200).json({'status':'success', 'searchResult': user_docs});
			}
		});
	});
}