module.exports = function (app, formModel, db) {
    
    var uuid = require('node-uuid');
    
    app.get("/api/assignment/form/:formId/field", function (req, res) {
        var formId = req.params["formId"];
        formModel.getFieldsByFormId(formId).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        formModel.getField(formId, fieldId).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        formModel.removeField(formId, fieldId).then(send);

        function send(response) {
            res.json(response);
        }
    });
     
    app.post("/api/assignment/form/:formId/field", function (req, res) {
        var formId = req.params["formId"];
        var field = req.body;
        field.id = uuid.v1();
        formModel.createField(formId, field).then(send);
        
        function send(response) {
            res.json(response);
        }
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function (req, res) {
        var formId = req.params["formId"];
        var fieldId = req.params["fieldId"];
        var field = req.body;
        formModel.updateField(formId, fieldId, field).then(send);

        function send(response) {
            res.json(response);
        }
    });
};