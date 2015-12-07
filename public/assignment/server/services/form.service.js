module.exports = function (app, formModel, db) {

    var uuid = require('node-uuid');
    
    app.get("/api/assignment/user/:userId/form", function (req, res) {
        var userId = req.params["userId"];
        formModel.findFormsForUser(userId).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.get("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params["formId"];
        formModel.findFormById(formId).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.delete("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params["formId"];
        formModel.deleteForm(formId).then(send);
        
        function send(response) {
            res.json(response);
        }
    });
    
    app.post("/api/assignment/user/:userId/form", function (req, res) {
        var userId = req.params["userId"];
        var form = req.body;
        form.userId = userId;
        form.id = uuid.v1();
        formModel.createForm(form).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.put("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params["formId"];
        var form = req.body;
        formModel.updateForm(formId, form).then(send);
        
        function send(response) {
            res.json(response);
        }
    });
};