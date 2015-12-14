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
    	_this.addToCollections = addToCollections;
        _this.setShared  = setShared;


    	var id = $rootScope.currentUser.id;
    	MovieService.getRecommendations(id).then(function(movies){
    		_this.movies = movies;    
    	});                


    	function addToCollections(movie){

    		if(!$rootScope.currentUser){
    			alert('please login')
    			return;
    		}

    		console.log(movie)

    		var user = $rootScope.currentUser;

    		movie.hidebutton = true;
    		MovieService.addToCollections(user.id, movie.idIMDB, movie);
    	}


        function setShared(movie){

            $rootScope.sharedMovie = movie;
            $location.path('/details')
        }
    }





})();