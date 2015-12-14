(function () {
    "use strict";
    angular.module("MovieApp").controller("CollectionsController", CollectionsController);

    /*use location and scope.*/
    function CollectionsController($rootScope, $scope, $location, MovieService) {
    	// login check
        if(!$rootScope.currentUser){
            alert('Pleaae login');
            $location.path('/login');
            return;
        }

        var _this = this;
        

        var id =$rootScope.currentUser.id;
        console.log(id);
        MovieService.getCollections(id).then(function(movies){
            console.log(movies)
            _this.movies = movies;    
        });                

        _this.setShared  = setShared;
        function setShared(movie){
            $rootScope.sharedMovie = movie;
            $location.path('/details')
        }
    }
})();