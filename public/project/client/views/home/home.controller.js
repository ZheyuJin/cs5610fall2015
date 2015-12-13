(function () {
	"use strict";
	angular.module("MovieApp").controller("HomeController", HomeController);

	/*use location and scope.*/
	function HomeController($scope,$rootScope, $location, MovieService) {
		var _this = this;
		_this.movies = [];

		

		_this.addToCollections = addToCollections;
		_this.searchMovies = searchMovies;

		// load trendings
		MovieService.getTrendingMovies().then(function(movies){

			_this.movies = movies;
			console.log(_this.movies)
		})


		function searchMovies(title){
			MovieService.searchMovies(title).then(function(movies){
				_this.movies = movies;
			});	
		}

		function addToCollections(movie){

			if(!$rootScope.currentUser){
				alert('please login')
				return;
			}

			console.log(movie)

			var user = $rootScope.currentUser;

			movie.hidebutton = true;
			MovieService.addToCollections(user.id, movie.idIMDB);
		}

		 

	}
})();