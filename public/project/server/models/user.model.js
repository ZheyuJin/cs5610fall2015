module.exports = function (app, mongoose, UserSchema) {
    'use strict'

    var fs = require("fs");
    var userList = JSON.parse(fs.readFileSync("public/assignment/server/models/user.mock.json", "utf8"));
    var UserModel = mongoose.model("cs5610.assignment.user", UserSchema);
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
        findUserByCredentials: findUserByCredentials
    }

    return api;

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email
        }, function (err, result) {
            if(err){
                deferred.reject(err);
                console.error(err);
            }
            else
                deferred.resolve(user);                        
        });

        return deferred.promise;
    }


    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(function (err, result) {
            if(err){
                console.error(err);
                deferred.reject(err);
            }
            else
                deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.find(
        {
            id: user.id
        }, 

        function (err, result) {
            if(err){
                console.error(err);
                deferred.reject(err);
            }
            else // will give undefined if result has length 0. dont worry.
                deferred.resolve(result[0]);
            
        });

        return deferred.promise;
    }


    function updateUser(id, user) {
        var deferred = q.defer();
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
                deferred.reject(err);
            }
            else
                deferred.resolve(user);
        });


        return deferred.promise;
    }








    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.remove(
        {
            id: user.id
        }, 

        function (err, result) {
            UserModel.find(function (err, result) {
                if(err){
                    console.error(err)  ;
                    deferred.reject(err);
                }
                else
                    deferred.resolve(null);
            });
        });


        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find(
        {
            username: username
        },
        function (err, result) {
            console.log(result);
            if (err) {
                console.error(err);
                deferred.reject(err);
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.find(
        {
            username: credentials.username,
            password: credentials.password
        },
        function (err, result) {
            if (err) {
                console.error(err);
                deferred.reject(err);
            } else {
                console.log(result);
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }
};