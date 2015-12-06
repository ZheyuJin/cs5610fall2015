module.exports = function (app, formModel, db) {

    var uuid = require('node-uuid');

    app.get("/api/assignment/user/:userId/form", function (req, res) {
        var userId = req.params.userId;
        res.json(formModel.findFormsForUser(userId));
    });

    app.get("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    });

    app.delete("/api/assignment/form/:formId", function (req, res) {
        var formId = req.params.formId;
        res.json(formModel.deleteForm(formId));
    });

    app.post("/api/assignment/user/:userId/form", function (req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        form.id = uuid.v1();
        res.json(formModel.createForm(form));
    });

    app.put("/api/assignment/form/:formId", function (req, res) {
        var form = req.body;
        var formId = req.params.formId;
        res.json(formModel.updateForm(formId, form));
    });
};