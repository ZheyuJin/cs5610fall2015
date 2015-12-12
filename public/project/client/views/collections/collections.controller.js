(function () {
    "use strict";
    angular.module("MovieApp").controller("CollectionsController", CollectionsController);

    /*use location and scope.*/
    function CollectionsController($scope, $location, MovieService) {
        var _this = this;
        MovieService.getCollections().then(function(movies){
            _this.movies = movies;    
        });                
    }
})();