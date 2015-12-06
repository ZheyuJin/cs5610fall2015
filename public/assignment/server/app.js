module.exports = function (app) {
    
    var userModelModule = require("./models/user.model.js");
    var userModel = new userModelModule(app);
    
    var formModelModule = require("./models/form.model.js");
    var formModel = new formModelModule(app);
    
    var userServiceModule = require("./services/user.service.js");
    var userService = new userServiceModule(app, userModel, null);
    
    var formServiceModule = require("./services/form.service.js");
    var formService = new formServiceModule(app, formModel, null);
    
    var fieldServiceModule = require("./services/field.service.js");
    var fieldService = new fieldServiceModule(app, formModel, null);
};