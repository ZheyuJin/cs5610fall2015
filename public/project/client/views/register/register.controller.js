(function () {
        "use strict";
        angular.module("MovieApp").controller("RegisterController", RegisterController);


        function RegisterController($scope, $rootScope, $location, UserService) {


            $scope.register = function () {
                var newUser = {};
                newUser.username = $scope.username;
                newUser.password = $scope.password;
                newUser.email = $scope.emailaddr;


                UserService.createUser(newUser).then(callback);
                console.log(newUser);

                function callback(user) {
                    if (user != undefined) {
                        $rootScope.currentUser = user;
                        console.log($rootScope.currentUser);
                        $location.path("/profile")
                    }
                }

            }

        }


})();