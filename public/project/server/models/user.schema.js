module.exports = function (mongoose) {
	var UserSchema = new mongoose.Schema(
	{
		id: String,
		firstName: {type: String, default: ""},
		lastName: {type: String, default: ""},
		username: String,
		password: String,
		email: {type: String, default: ""},
		collections:[],
		recommendations:[]
	},
	{
		collection: "cs5610.project.user"
	});


	return UserSchema;
}