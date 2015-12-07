module.exports = function (app, mongoose, db) {
    /*schemas*/
    var userSchemaModule = require("./models/user.schema.js");
    var userSchema = new userSchemaModule(mongoose);
    
    var fieldSchemaModule = require("./models/field.schema.js");
    var fieldSchema = new fieldSchemaModule(mongoose);
    
    var formSchemaModule = require("./models/form.schema.js");
    var formSchema = new formSchemaModule(mongoose, fieldSchema);
    
    /*models get schemas*/
    var userModelModule = require("./models/user.model.js");
    var userModel = new userModelModule(app, mongoose, userSchema);
    
    var formModelModule = require("./models/form.model.js");
    var formModel = new formModelModule(app, mongoose, formSchema);
    
    /*services get models*/
    var userServiceModule = require("./services/user.service.js");
    var userService = new userServiceModule(app, userModel, null);
    
    var formServiceModule = require("./services/form.service.js");
    var formService = new formServiceModule(app, formModel, null);
    
    var fieldServiceModule = require("./services/field.service.js");
    var fieldService = new fieldServiceModule(app, formModel, null);
};