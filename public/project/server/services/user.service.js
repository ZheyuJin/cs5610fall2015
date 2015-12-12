module.exports = function (app, userModel, db) {

    var uuid = require('node-uuid');
    
    app.post("/api/assignment/user", function (req, res) {
        var user = req.body;
        console.log(req.body);
        user.id = uuid.v1();
        userModel.createUser(user).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.get("/api/assignment/user", function (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username != null && password != null) {
            var credentials = {
                username: username,
                password: password
            };
            userModel.findUserByCredentials(credentials).then(send);
        } else if (username != null) {
            userModel.findUserByUsername(username).then(send);
        } else {
            userModel.findAllUsers().then(send);
        }
        
        function send(response) {
            res.json(response);
        }
    });

    app.get("/api/assignment/user/:id", function (req, res) {
        var id = req.params["id"];
        userModel.findUserById(id).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.put("/api/assignment/user/:id", function (req, res) {
        var id = req.params["id"];
        var user = req.body;
        userModel.updateUser(id, user).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.delete("/api/assignment/user/:id", function (req, res) {
        var id = req.params["id"];
        userModel.deleteUser(id).then(send);
        
        function send(response) {
            res.json(response);
        }
    });
};