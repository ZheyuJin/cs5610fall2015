(function () {
    angular.module("FormBuilderApp").config(Configure);

    //    must use $routeProvider , it;s global. 
    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home/home.view.html "
            }).when("/profile", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController"
            }).when("/admin", {
                templateUrl: "admin.html"
            }).when("/forms", {
                templateUrl: "form/form.view.html",
                controller: "FormController"
            })
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "LoginController"
            })

        .otherwise({
            redirectTo: "/"
        });
    };



})();