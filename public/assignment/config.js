(function () {
    angular.module("FormBuilderApp").config(Configure);

    //    must use $routeProvider , it;s global. 
    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home/home.view.html "
            }).when("/profile", {
                templateUrl: "profile.html"
            }).when("/admin", {
                templateUrl: "admin.html"
            }).when("/forms", {
                templateUrl: "forms.html"
            })
            .when("/register", {
                templateUrl: "register.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html"
            })

        .otherwise({
            redirectTo: "/"
        });
    };



})();