module.exports = function (app, mongoose, db) {
	/*schemas*/

	var userSchema =  require("./models/user.schema.js")(mongoose);

	/*models get schemas*/
	var userModel = require("./models/user.model.js")(app, mongoose, userSchema);

	/*services get models*/

	require("./services/user.service.js")(app, userModel, null);   
	require("./services/movie.service.js")(app, userModel, null);   

};