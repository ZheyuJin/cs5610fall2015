(function () {
    angular.module("MovieApp").config(Configure);

    //    must use $routeProvider , it;s global. 
    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController as con"
            })
            .when("/collections", {
                templateUrl: "views/collections/collections.view.html",
                controller: "CollectionsController as con"
            })
            .when("/recommendations", {
                templateUrl: "views/recommendations/recommendations.view.html",
                controller: "RecommendationsController as con"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController as con"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController as con"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController as con"
            }).when("/details", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController as con"
            }).otherwise({
                redirectTo: "/"
            });
    };



})();