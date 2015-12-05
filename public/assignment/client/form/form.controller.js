(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);


    function FormController($scope, $rootScope, $location, FormService) {
        var user = $rootScope.currentUser;
        
        if (user == undefined) {
            alert("not logged in !");
            return;
        }

        FormService.findAllFormsForUser(user.id, updateForms);

        // loadl all forms
        function updateForms(fs) {
            $scope.forms = fs;
        }

        $scope.addForm = function () {
            // allocate new form.
            var form = {};
            form.name = $scope.formname;

            FormService.createFormForUser(user.id, form, addNewForm);
            clear();
            // add to model 
            function addNewForm(newForm) {
                $scope.forms.push(newForm);
            }

        }

        $scope.updateForm = function () {
            if ($scope.selectedFormIdx != undefined) {
                var idx = $scope.selectedFormIdx;
                $scope.forms[idx].name = $scope.formname;
                FormService.updateFormById($scope.forms[idx].id, $scope.forms[idx], getNewForm);

                function getNewForm(newForm) {
                    $scope.forms[idx] = newForm;
                }

                clear();
            }
        }

        $scope.selectForm = function (index) {
            $scope.selectedFormIdx = index;
            $scope.formname = $scope.forms[index].name;
        }

        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index].id, bindRemaining);

            function bindRemaining(fs) {
                $scope.forms = fs;
            }
        }

        function clear(){
            $scope.selectedFormIdx = undefined;
            $scope.formname = undefined;
        }
    }

})();