(function () {
    "use strict";
    angular
        .module("MovieApp")
        //    factory is just a registry for services. each service is just a function object.
        .factory("MovieService", MovieService);

    function MovieService($rootScope, $http, $q) {

        var api = {
            trendingMovies: trendingMovies,
            getCollections: getCollections,
            getRecommendations :getRecommendations
        };

        return api;

        /*impl below*/

        /*
            
        Top 250 ULR: http: //www.myapifilms.com/imdb/top 
        Bottom 100 ULR: http: //www.myapifilms.com/imdb/bottom 
        In Theaters ULR: http: //www.myapifilms.com/imdb/inTheaters 
        Coming Soon ULR: http: //www.myapifilms.com/imdb/comingSoon
    
        */

        function trendingMovies() {
            var url = "http://www.myapifilms.com/imdb/inTheaters";
            var mockURL = "movies.json";
            var d = $q.defer();
            $http.get(mockURL).success(function (data) {
                d.resolve(data[1].movies)
            });
            return d.promise;
        }

        
        function getRecommendations() {
            /*    var url = "http://www.myapifilms.com/imdb/inTheaters";*/
            var mockURL = "movies.json";
            var d = $q.defer();
            $http.get(mockURL).success(function (data) {
                d.resolve(data[0].movies)
            });
            return d.promise;
        }

        
        function getCollections() {
            /*    var url = "http://www.myapifilms.com/imdb/inTheaters";*/
            var mockURL = "movies.json";
            var d = $q.defer();
            $http.get(mockURL).success(function (data) {
                d.resolve(data[0].movies)
            });
            return d.promise;
        }


    };

})();