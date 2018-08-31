// var express = require("express");

// var app = express();
// app.use(function(req, res, next){
// 	res.header("Access-Control-Allow-Origin", "*"); 
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
// 	next(); 
// })

// var port = process.env.PORT || 4001;
// app.listen(port, function() {
// 	console.log('Our app is running on http://localhost:' + port);
// });


var express = require('express');
var bodyParser = require('body-parser');
var app = express();

    app.get('/', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

// app.use(function(req, res, next) { 
//     res.header("Access-Control-Allow-Origin", "*");
//   	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next(); 
// });

    app.use(function (req, res, next) {
        var oneof = false;
        if (req.headers.origin) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            oneof = true;
        }
        if (req.headers['access-control-request-method']) {
            res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
            oneof = true;
        }
        if (req.headers['access-control-request-headers']) {
            res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
            oneof = true;
        }
        if (oneof) {
            res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
        }
        // intercept OPTIONS method
        if (oneof && req.method == 'OPTIONS') {
            res.send(200);
        }
        else {
            next();
        }
    });

    app.use(bodyParser.urlencoded({
	  extended: true
	}));
	var mongoose = require('mongoose');
  	mongoose.connection.once('open', function(){
        console.log("MongoDb connected successfully");
    });
	var connectionInstance  = mongoose.createConnection('mongodb://localhost:27017/react_login');

	//error connecting to db
	connectionInstance.on('error', function (err) {
	  if(err) {
	    throw err;
	  }
	});
	//connectionInstance connected
	connectionInstance.once('open', function() {
		console.log("MongoDb connected successfully");
	});
	mongoose.set('debug', true);


	var user_schema = {
		name: {type: String},
		id: {type:Number}
	};
	var admin_schema = {
		id: {type: Number},
		name : {type: String},
		email: {type: String},
		role : {type: String},
		pass: {type: String},
		users : [user_schema]
		
	}
	var admin_schema = new mongoose.Schema(admin_schema);
	var users_model = connectionInstance.model('users', admin_schema);

	var perms_schema = {
		"suId" : {type: Number},
	    "userId" : {type: Number},
	    "rights" :  {type: Array},
	}
	var perms_schema = new mongoose.Schema(perms_schema);
	var perms_model = connectionInstance.model('permissions', perms_schema);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 4001;
var async = require('async');
var MD5 = require('MD5');
var jwt = require('jsonwebtoken');


getToken = function(auth, callback) {
  var token = jwt.sign(
        {   id : auth._id,
            usr_id: auth.usr_id,
            usr_type: auth.usr_type
        },
        "dev"
    );
    return callback(token);
};
    app.post('/login', function(req, res){
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
					if (MD5(req.headers.password) == (user_docs[0] && user_docs[0].pass)){
						cb(null, user_docs);
					}else{
						cb('Invalid password');
					}
				},
				function(user_docs, cb){
					getToken(user_docs[0], function(token){
						if (token == null) {
							cb('Invalid password');
						}else{
							cb(null, user_docs, token)
						}
					})
				}
			], function(err, user_docs, token){
				if(err){
					res.status(400).json({status:'failure', error: err});
				}else{
					res.status(200).json({'status':'success', "token" : token, 'result': user_docs});
				}
			})
		}else{
			res.status(400).json({status:'failure', error: "Invalid credentials"});
		}
    });

    app.post('/add/user', function(req, res){
    	console.log("\n\n req.body.name", req.body)
    	users_model.update({id: req.params.id}, {"$set" : {users : req.body.name}}, {upsert:true}, function(err, user_docs){
			if(err){
				res.status(400).json({status:'failure', error: "Error while updating users"});
			}else{
				res.status(200).json({'status':'success', 'result': user_docs});
			}
		});
    });

    app.get('/perm/:id', function(req, res){
    	perms_model.findOne({userId : req.params.id}, function(err, perm_docs){
    		if(err){
				res.status(400).json({status:'failure', error: "Error while getting permissions"});
			}else{
				res.status(200).json({'status':'success', 'result': perm_docs});
			}
		});
    });

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});


// {
//     "_id" : ObjectId("5b86784d489306aab554c56a"),
//     "id" : 1.0,
//     "name" : "super admin",
//     "role" : "su",
//     "pass" : "81dc9bdb52d04dc20036dbd8313ed055", //1234
//     "users" : [ 
//         {
//             "name" : "user1",
//             "acc_right" : {
//                 "add" : 1,
//                 "edit" : 1
//             }
//         }, 
//         {
//             "name" : "user2",
//             "acc_right" : {
//                 "add" : 0,
//                 "edit" : 0
//             }
//         }
//     ]
// }