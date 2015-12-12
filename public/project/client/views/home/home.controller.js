(function () {
    "use strict";
    angular.module("MovieApp").controller("HomeController", HomeController);

    /*use location and scope.*/
    function HomeController($scope, $location, MovieService) {
        var _this = this;
        MovieService.trendingMovies().then(function(data){
            _this.movies = data;    
        });
        
        
    }
})();