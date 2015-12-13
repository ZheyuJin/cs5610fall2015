(function () {
    "use strict";
    angular.module("MovieApp").controller("RecommendationsController", RecommendationsController);

    /*use location and scope.*/
    function RecommendationsController($rootScope,$scope, $location, MovieService) {

    	// login check
        if(!$rootScope.currentUser){
            alert('Pleaae login');
            $location.path('/login');
            return;
        }


        var _this = this;
        var id = $rootScope.currentUser.id;
        MovieService.getRecommendations(id).then(function(movies){
            _this.movies = movies;    
        });                
    }
})();