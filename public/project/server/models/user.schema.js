module.exports = function (mongoose) {
	var UserSchema = new mongoose.Schema(
	{
		id: String,
		firstName: {type: String, default: ""},
		lastName: {type: String, default: ""},
		username: String,
		password: String,
		email: {type: String, default: ""}
	},
	{
		collection: "cs5610.assignment.user"
	});


	return UserSchema;
}