module.exports = function (app) {
    'use strict'

    var fs = require("fs");
    var userList = JSON.parse(fs.readFileSync("public/assignment/server/models/user.mock.json", "utf8"));

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
        userList.push(user);
        return user;
    }

    function findAllUsers() {
        return userList;
    }

    function findUserById(id) {
        var lst = userList.filter(function (user) {
            return user.id == id
        });
        // cant find.
        if (lst.length == 0)
            return null;
        else
            return lst[0];

    }

    function updateUser(id, user) {
        for (var idx in userList) {
            if (userList[idx].id == id) {
                userList[idx] = user;
                return userList[idx];
            }
        }

        return null;
    }

    function deleteUser(id) {
        for (var idx in userList) {
            if (userList[idx].id == id)
                userList.splice(idx, 1);
        }

        return userList;
    }

    function findUserByUsername(username) {
        for (var idx in userList) {
            if (userList[idx].username == username)
                return userList[idx];
        }

        return null;
    }

    function findUserByCredentials(credentials) {
        for (var idx in userList) {
            if (credentials.username == userList[idx].username && credentials.password == userList[idx].password)
                return userList[idx];
        }

        return null;
    }
};