module.exports = function (app, userModel, db) {

    var uuid = require('node-uuid');
    
    /*create user*/
    app.post("/api/project/user", function (req, res) {
        var user = req.body;
        console.log(req.body);
        user.id = uuid.v1();
        userModel.createUser(user).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    /*find user*/
    app.get("/api/project/user", function (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            };
            userModel.findUserByCredentials(credentials).then(send);
        } 

        /*will not support get all users*/

        /*else if (username != null) {
            userModel.findUserByUsername(username).then(send);
        } else {
            userModel.findAllUsers().then(send);
        }*/
        
        function send(response) {
            res.json(response);
        }
    });

    app.get("/api/project/user/:id", function (req, res) {
        var id = req.params["id"];
        userModel.findUserById(id).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    /*admin can use this*/
    app.put("/api/project/user/:id", function (req, res) {
        var id = req.params["id"];
        var user = req.body;
        userModel.updateUser(id, user).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.delete("/api/project/user/:id", function (req, res) {
        var id = req.params["id"];
        userModel.deleteUser(id).then(send);
        
        function send(response) {
            res.json(response);
        }
    });
};