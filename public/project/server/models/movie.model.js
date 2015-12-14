module.exports = function (app, mongoose, MovieSchema) {
    'use strict'

    var fs = require("fs");

    console.log(mongoose);
    console.log(MovieSchema);
    
    // data access object
    var MovieModel = mongoose.model("cs5610.project.movie", MovieSchema);
    var q = require('q');

    clearAll();
    
    var api = {
        insertMovie: insertMovie,
        readMovies: readMovies,
        removeIfExists:removeIfExists,
        getAllidIMDBs : getAllidIMDBs,
        clearAll :clearAll
    }

    return api;

    function getAllidIMDBs(){
        var d = q.defer();
        MovieModel.find(
        {
            
        }, 
        'idIMDB',

        function (err, result) {
            if(err){
                d.reject(err);
                console.error(err);
            }
            else
                d.resolve(result.map(function(ele){return ele.idIMDB}));                        
        });


        return d.promise;   
    }

    function removeIfExists(idIMDBs){
        var d = q.defer();
        MovieModel.remove(
            {
                idIMDB : {$in: idIMDBs}
            }, 
            function (err, removed) {
                if(err){
                    d.reject(err);
                    console.error(err);
                }
                else{
                    d.resolve(removed);                        
                    console.log('removed ' + removed);
                }
            });


        return d.promise;           
    }

    function clearAll(){
        MovieModel.remove(function (err, result) {
            if(err)
                console.err(err);
            
        });    

    }

    // insert one movie into db. 
    function insertMovie(movie){
        var d = q.defer();
        MovieModel.create(
        {
            directors   :   movie.directors,
            genres      :   movie.genres,
            idIMDB      :   movie.idIMDB,
            plot        :   movie.plot,
            rated       :   movie.rated,
            rating      :   movie.rating,
            releaseDate :   movie.releaseDate,
            runtime     :   movie.runtime,
            similarMovies   :movie.similarMovies,
            simplePlot  :   movie.simplePlot,
            title       :   movie.title,
            urlPoster   :   movie.urlPoster,
            year        :   movie.year
        }, function (err, result) {
            if(err){
                d.reject(err);
                console.error(err);
            }
            else
                d.resolve(movie);                        
        });

        return d.promise;
    }

    function readMovies(idIMDBs){
        var d = q.defer();
        MovieModel.find(
        {
            idIMDB : {$in: idIMDBs}
        }, function (err, result) {
            if(err){
                d.reject(err);
                console.error(err);
            }
            else
                d.resolve(result);                        
        });


        return d.promise;   
    }

};