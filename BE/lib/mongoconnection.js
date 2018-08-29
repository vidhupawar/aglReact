var mongoose = require('mongoose');
var db = mongoose.connection;
//var connectionInstance;

//if already we have a connection, don't connect to database again
if(connectionInstance) {
  module.exports = connectionInstance;
  return;
}
//connect to the db - host:port/dbName
//connectionInstance  = mongoose.connect('mongodb://'+ config.MONGO_HOST +':'+ config.MONGO_PORT +'/'+ config.MONGO_DBNAME); //without db authentication
var connectionInstance = mongoose.connect('mongodb://localhost:27017/react_login'); //with DB authentication

//error connecting to db
db.on('error', function (err) {
  if(err) {
    throw err;
  }
});
//db connected
db.once('open', function() {
	console.log("MongoDb connected successfully");
});

//export the db connection
module.exports = connectionInstance;
mongoose.set('debug', true);