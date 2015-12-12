(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("ProfileController", ProfileController);


    function ProfileController($scope, $rootScope, $location, UserService) {

        // fill form with current user info.
        if ($rootScope.currentUser != null) {

            var currentUser = $rootScope.currentUser;
            console.log(currentUser);
            $scope.username = currentUser.username;
            $scope.password = currentUser.password;
            $scope.firstname = currentUser.firstName;
            $scope.lastname = currentUser.lastName;
            $scope.email = currentUser.email;
        }

        // click function.
        $scope.update = function () {

            var user = $rootScope.currentUser;
            if (!user) {
                alert("please login");
                return;
            }

            user.username = $scope.username;
            user.password = $scope.password;
            user.firstname = $scope.firstname;
            user.lastname = $scope.lastname;
            user.email = $scope.email;

            UserService.updateUser(user.id, user).then(callback);


            function callback(_user) {

                $rootScope.currentUser = _user;
                console.log($rootScope.currentUser);

            }

        }


    }

})();