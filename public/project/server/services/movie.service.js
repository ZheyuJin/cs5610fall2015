module.exports = function (app, userModel, movieModel, db) {

    var uuid = require('node-uuid');
    var request = require("request");
    var q = require('q');

    app.get("/api/project/trending", function (req, res) {

        request("http://www.myapifilms.com/imdb/inTheaters"
            ,function(error, response, body) {
              res.send(body);
          });
    });


    app.post("/api/project/movies", function (req, res) {
        var idIMDBs = req.body.idIMDBs;
        console.log(idIMDBs)

        movieModel.readMovies(idIMDBs).then(send, send);

        function send( data){
            console.log(data);
            res.send(data);
        }
    });


    app.get("/api/project/movies/idIMDB", function (req, res) {
        var idIMDBs = req.body.idIMDBs;
        console.log(idIMDBs)

        movieModel.getAllidIMDBs().then(send, send);

        function send( data){
            console.log(data);
            res.send(data);
        }
    });
    
    /*add to collections; return uopdated collectinos and recommendations*/    
    app.post("/api/project/collections/", function (req, res) {
        var id = req.body.id;
        var movie = req.body.movie;
        var idIMDB = req.body.idIMDB;

        console.log('post \t' +movie.idIMDB);
        /*define a list of  operations*/
        var psReco = findSimilar(idIMDB).then(function (recommendations){


            Array.prototype.diff = function(a) {
                return this.filter(function(i) {return a.indexOf(i) < 0;});
            };

            /*will remove recommendations whose idIMDB already in DB.*/
            movieModel.getAllidIMDBs().then(function(existing){

                recommendations.diff(existing).forEach(function(idIMDB){
                    requestMovie(idIMDB).then(
                        function(movie){
                            movieModel.insertMovie(movie)
                        });

                });
            });


            return userModel.addToRecommendations(id, recommendations);
        });

        var psColl = userModel.addToCollections(id, idIMDB);
        var psInsertMovie = movieModel.removeIfExists([movie.idIMDB])
            .then( function(ignore){movieModel.insertMovie(movie);});
        
        // do all three operations above
        q.all([psReco, psColl, psInsertMovie]).then(send, err)
        
        function send() {
            res.send(200);
        }

        function err(reason){
            console.err(reason);
            res.send(reason);
        }
    });

function requestMovie(idIMDB){
    var d = q.defer();   

    var url = "http://www.myapifilms.com/imdb?idIMDB="+idIMDB+"&similarMovies=1&format=JSON";
    request(url, function(error, response, body) {
        var movie = JSON.parse(body);            
        d.resolve(movie);            
    });

    return d.promise;
}

function findSimilar(idIMDB){
        // find similar movies.
        var d = q.defer();                
        
        var url = "http://www.myapifilms.com/imdb?idIMDB="+idIMDB+"&similarMovies=1&format=JSON";
        request(url, function(error, response, body) {
            var data = JSON.parse(body);
            var reco = data.similarMovies.map(function(ele){return ele.id});

            d.resolve(reco);
            
        });

        return d.promise;
    }

    /*return array of collections*/
    app.get("/api/project/collections/:id", function (req, res) {
        var id = req.params["id"];
        console.log(id);
        
        

        userModel.findCollections(id).then(send);
        id ? console.log('\t  hit it yes') : console.log('\t  hit it no');

        function send(response) {
            console.log('\t\t will return size of movies \t' + response)

            movieModel.readMovies(response).then(
                function(movies){res.send(movies)}
                );

        }
    });


    /*return array of recommendations*/
    app.get("/api/project/recommendations/:id", function (req, res) {
        var id = req.params["id"];
        console.log(id);

        userModel.findRecommendations(id).then(send);
        
        function send(response) {
            // only return 10 recoomendtaions
            response = response.slice(0,10);

            movieModel.readMovies(response).then(
                function(movies){res.send(movies)}
                );

            
        }
    });
};