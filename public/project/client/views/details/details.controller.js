(function () {
    "use strict";
    angular.module("MovieApp").controller("DetailsController", DetailsController);


    function DetailsController($scope, $rootScope, $location, UserService, MovieService) {
        var _this = this;

        MovieService.getDetails('asdf').then(function (details) {
            _this.details = details;
            console.log(details)
        });        

    }


})();