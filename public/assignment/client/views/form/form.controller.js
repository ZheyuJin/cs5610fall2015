(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("FormController", FormController);


    function FormController($scope, $rootScope, $location, FormService) {
        var _this = this;
        var user = $rootScope.currentUser;


        if (!user) {
            alert("Please login !");
            $location.path("/login");
            return;
        }

        _this.userId = user.id;

        FormService.findAllFormsForUser(user.id).then(updateForms);

        // loadl all forms
        function updateForms(fs) {
            _this.forms = fs;
        }

        _this.addForm = function () {
            if (!user) {
                alert("Please login !");
                $location.path("/login");
                return;
            }

            // allocate new form.
            var form = {};
            form.title = _this.formname;
            console.log(_this.formname);

            FormService.createFormForUser(user.id, form).then(addNewForm);
            clear();
            // add to model 
            function addNewForm(newForm) {
                _this.forms.push(newForm);
                console.log(_this.forms);


            }

        }

        _this.updateForm = () => {
            if (_this.selectedFormIdx) {
                alert("_this.selectedFormIdx" + _this.selectedFormIdx);

                var idx = _this.selectedFormIdx;
                _this.forms[idx].title = _this.formname;
                FormService.updateFormById(_this.forms[idx].id, _this.forms[idx]).then(getNewForm);

                function getNewForm(newForm) {
                    _this.forms[idx] = newForm;
                }

                clear();
            }
        }

        _this.selectForm = function (index) {
            alert("select " + index);
            _this.selectedFormIdx = index;
            _this.formname = _this.forms[index].title;
        }

        _this.deleteForm = function (index) {
            FormService.deleteFormById(_this.forms[index].id).then(bindRemaining);

            function bindRemaining(fs) {
                _this.forms = fs;
            }
        }

        function clear() {
            _this.selectedFormIdx = undefined;
            _this.formname = undefined;
        }
    }

})();