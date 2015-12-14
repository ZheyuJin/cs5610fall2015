(function () {
    "use strict";
    angular 
    .module("MovieApp").factory("MovieService", MovieService);



    function MovieService($rootScope, $http, $q) {


        //test block
        {


            $http.get("http://www.myapifilms.com/imdb/inTheaters?format=JSON")
            .success(console.log);
        }


        var api = {
            searchMovies: searchMovies,
            getCollections: getCollections,
            getRecommendations: getRecommendations,
            getDetails: getDetails,
            addToCollections: addToCollections,
            addToRecommendations : addToRecommendations,
            getTrendingMovies:getTrendingMovies
        };

        return api;



        /*impl below*/

        
        function getTrendingMovies(){
            var d = $q.defer();
            var url = '/api/project/trending';

            $http.get(url).success(function (movies) {
                console.log(movies[1])
                d.resolve(movies[1].movies.concat(movies[0].movies))
            });
            
            return d.promise;
        }

        /*return collections of this user*/
        function addToCollections(id, idIMDB, movie){            
            var url = '/api/project/collections/';
            var body = {id:id, idIMDB:idIMDB, movie: movie};

            $http.post(url,body).success(function () {
                console.log('success. body below');
                console.log(body);
            });
            
        }

        function addToRecommendations(id, idIMDB){
            /*get similars to idIMDB and then add to recommendations*/
            
        }


        /*
            
        Top 250 ULR: http: //www.myapifilms.com/imdb/top 
        Bottom 100 ULR: http: //www.myapifilms.com/imdb/bottom 
        In Theaters ULR: http://www.myapifilms.com/imdb/inTheaters 
        Coming Soon ULR: http://www.myapifilms.com/imdb/comingSoon
    
        */

        function searchMovies(title) {
            // var url = "http://www.myapifilms.com/imdb/inTheaters?format=JSONP&callback=JSON_CALLBACK";
            var url = "http://www.myapifilms.com/imdb?title=" + title +"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=10&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&similarMovies=1&adultSearch=0&callback=JSON_CALLBACK";

            
            /*var mockURL = "movies.json";*/
            var d = $q.defer();
            $http.jsonp(url).success(function (data) {
                console.log(data);
                d.resolve(data)
            });

            
            
            return d.promise;
        }


        /*read data from IDMB. 
        heavily used function.*/
        function fetchMovie(idIMDB){
            var d = $q.defer();

            var url = "http://www.myapifilms.com/imdb?idIMDB="+idIMDB+"&similarMovies=1&format=JSONP&callback=JSON_CALLBACK";
            console.log(url);
            $http.jsonp(url).success(function(movie){
                console.log('resolved one movie');
                console.log(movie);
                d.resolve(movie);
            });

            return d.promise;
        }


        // read from IMDB later.
        function getDetails(idIMDB) {
            /*    var url = "http://www.myapifilms.com/imdb/inTheaters";*/
            var mockURL = "movies.json";
            var d = $q.defer();
            $http.get(mockURL).success(function (data) {
                d.resolve(data[0].movies[1])
            });
            return d.promise;
        }


        function getRecommendations(id) {
            var url = "/api/project/recommendations/" + id;
            var d = $q.defer();
            
            $http.get(url).success(function (movies) {
                d.resolve(movies);            
            });

            return d.promise;
        }


        function getCollections(id) {
            var url = "/api/project/collections/" + id;
            var d = $q.defer();
            
            $http.get(url).success(function (movies) {
                d.resolve(movies);            
            });

            return d.promise;
        }






        /**************8mocks below/**************8*/ 

        function getRecommendations_mock() {

            /*    var url = "http://www.myapifilms.com/imdb/inTheaters";*/
            var mockURL = "movies.json";
            var d = $q.defer();
            $http.get(mockURL).success(function (data) {
                d.resolve(data[0].movies)
            });
            return d.promise;
        }


        function getCollections_mock() {
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