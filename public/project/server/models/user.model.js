module.exports = function (app, mongoose, UserSchema) {
    'use strict'

    var fs = require("fs");
    var userList = JSON.parse(fs.readFileSync("public/project/server/models/user.mock.json", "utf8"));

    console.log(mongoose);
    console.log(UserSchema);
    
    // data access object
    var UserModel = mongoose.model("cs5610.project.user", UserSchema);
    var q = require('q');

    // delete and re-insert all mock users.
    UserModel.remove(function (err, result) {
        if(err)
            console.err(err);
        else 
            /*insert all*/
        userList.forEach(function(ele){
            createUser(ele);
        })
    });    
    


    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        addToCollections:addToCollections,
        findRecommendations : findRecommendations,
        findCollections: findCollections,
        addToRecommendations : addToRecommendations
    }

    return api;

    /*return array of collections*/
    function findCollections(id){
        var d = q.defer();
        UserModel.findOne(
        {
            id: id
        },
        function (err, user) {
            if(err){
                console.error(err)
                d.reject(err);
            }
            else{
                console.log('user' + user)
                d.resolve(user? user.collections : []);
            }
        });

        return d.promise;
    }

    /*return array of recommendations*/
    function findRecommendations(id){
        var d = q.defer();
        UserModel.findOne(
        {
            id: id
        },
        function (err, user) {
            if(err){
                console.error(err)
                d.reject(err);
            }
            else
                d.resolve(user? user.recommendations : []);
        });

        return d.promise;
    }


    /*bugs here*/
    function addToCollections(id, idIMDB){
      
        var d = q.defer();                    

        findCollections(id).then(function(data){
            data.push(idIMDB);

            UserModel.findOneAndUpdate(
                {id: id}, 
                {collections: data}, 
                function (err, user) {
                    if(err){
                        console.error(err)
                        d.reject(err);
                    }
                    else
                        d.resolve(data);
                });
        });                        

        return d.promise;
    }


    function addToRecommendations(id, recommendations){
      
        var d = q.defer();                    

        findRecommendations(id).then(function(data){
            console.log(recommendations)
            data = data.concat(recommendations);

            UserModel.findOneAndUpdate(
                {id: id}, 
                {recommendations: data}, 
                function (err, user) {
                    if(err){
                        console.error(err)
                        d.reject(err);
                    }
                    else{
                        console.log('resolve')
                        console.log(data);
                        d.resolve(data);
                    }
                });
        });                        

        return d.promise;
    }



    function createUser(user) {
        var d = q.defer();
        UserModel.create({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            collections: user.collections,
            recommendations: user.recommendations
        }, function (err, result) {
            if(err){
                d.reject(err);
                console.error(err);
            }
            else
                d.resolve(user);                        
        });

        return d.promise;
    }


    function findAllUsers() {
        var d = q.defer();
        UserModel.find(function (err, result) {
            if(err){
                console.error(err);
                d.reject(err);
            }
            else
                d.resolve(result);
        });
        return d.promise;
    }

    function findUserById(id) {
        var d = q.defer();
        UserModel.find(
        {
            id: user.id
        }, 

        function (err, result) {
            if(err){
                console.error(err);
                d.reject(err);
            }
            else // will give undefined if result has length 0. dont worry.
                d.resolve(result[0]);
            
        });

        return d.promise;
    }


    function updateUser(id, user) {
        var d = q.defer();
        user.id = id;
        UserModel.findOneAndUpdate(
        {
            id: id
        }, 
        {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email
        }, function (err, result) {
            if(err){
                console.error(err)
                d.reject(err);
            }
            else
                d.resolve(user);
        });


        return d.promise;
    }


    function deleteUser(id) {
        var d = q.defer();
        UserModel.remove(
        {
            id: user.id
        }, 

        function (err, result) {
            UserModel.find(function (err, result) {
                if(err){
                    console.error(err)  ;
                    d.reject(err);
                }
                else
                    d.resolve(null);
            });
        });


        return d.promise;
    }

    function findUserByUsername(username) {
        var d = q.defer();

        UserModel.find(
        {
            username: username
        },
        function (err, result) {
            console.log(result);
            if (err) {
                console.error(err);
                d.reject(err);
            } else {
                d.resolve(result[0]);
            }
        });
        return d.promise;
    }

    function findUserByCredentials(credentials) {
        var d = q.defer();
        UserModel.find(
        {
            username: credentials.username,
            password: credentials.password
        },
        function (err, result) {
            if (err) {
                console.error(err);
                d.reject(err);
            } else {
                console.log(result);
                d.resolve(result[0]);
            }
        });
        return d.promise;
    }
};