(function () {
    angular.module("FormBuilderApp").config(Configure);

    //    must use $routeProvider , it;s global. 
    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html"
            }).when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController"
            }).when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            }).when("/forms", {
                templateUrl: "views/form/form.view.html",
                controller: "FormController as model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController"
            }).when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/field/field.view.html",
                controller: "FieldController as model"
            }).otherwise({
                redirectTo: "/"
            });
    };



})();