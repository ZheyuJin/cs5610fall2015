module.exports = function (app, userModel, db) {

    var uuid = require('node-uuid');

    /*try some functional styles..*/

    app.post("/api/assignment/user", (req, res) => {
        
        var user = req.body;
        user.id = uuid.v1();
        var response = userModel.createUser(user);
        res.json(response);
    });

    app.get("/api/assignment/user", (req, res) => {
        var username = req.query.username;
        var password = req.query.password;

        var ret = null;

        if (username && password) {
            var credentials = {
                username: username,
                password: password
            };

            ret = userModel.findUserByCredentials(credentials);
        } else if (username) {
            ret = userModel.findUserByUsername(username);
        } else {
            ret = userModel.findAllUsers();

        }

        res.json(ret);
    });


    app.get("/api/assignment/user/:id", (req, res) => {
        var id = req.params.id;
        res.json(userModel.findUserById(id));
    });

    app.put("/api/assignment/user/:id", (req, res) => {
        var id = req.params.id;
        var user = req.body;
        res.json(userModel.updateUser(id, user));
    });

    app.delete("/api/assignment/user/:id", (req, res) => {
        var id = req.params.id;
        res.json(userModel.deleteUser(id));
    });
};