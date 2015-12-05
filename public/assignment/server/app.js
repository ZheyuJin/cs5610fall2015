module.exports = function (app) {

    /*models */
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);


    /*pass models to services*/
    var userService = new require("./services/user.service.js")(app, userModel, null);

    var formService = require("./services/form.service.js")(app, formModel, null);

    var fieldService = require("./services/field.service.js")(app, formModel, null);
};