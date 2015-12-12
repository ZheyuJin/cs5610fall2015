(function () {
    "use strict";
    angular.module("MovieApp").controller("RecommendationsController", RecommendationsController);

    /*use location and scope.*/
    function RecommendationsController($scope, $location, MovieService) {
        var _this = this;
        MovieService.getCollections().then(function(movies){
            _this.movies = movies;    
        });                
    }
})();