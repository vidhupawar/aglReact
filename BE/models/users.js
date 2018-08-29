	
module.exports.collectionName = 'users';


	var user_schema = {
		name: {type: String},
		acc_right : {type: Object},
		groups: {type: String}
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