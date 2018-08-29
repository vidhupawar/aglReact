var express = require("express");

var app = express();
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
	next(); 
})

var port = process.env.PORT || 4001;
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
