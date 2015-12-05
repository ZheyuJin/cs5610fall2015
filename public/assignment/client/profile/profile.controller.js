(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("ProfileController", ProfileController);


    function ProfileController($scope, $rootScope, $location, UserService) {

        // fill form with current user info.
        if ($rootScope.currentUser != null) {
            
            var currentUser = $rootScope.currentUser;
            $scope.username = currentUser.username;
            $scope.password = currentUser.password;
            $scope.firstname = currentUser.firstname;
            $scope.lastname = currentUser.lastname;
            $scope.email = currentUser.email;
        }
        
        // click function.
        $scope.update = function () {
            
            var user = $rootScope.currentUser;

            console.log(user);

            user.username = $scope.username;
            user.password = $scope.password;
            user.firstname = $scope.firstname;
            user.lastname = $scope.lastname;
            user.email = $scope.email;

            console.log(user);

            UserService.updateUser(user.id, user, callback);
            
            
            function callback(_user) {

                $rootScope.currentUser = _user;
                console.log($rootScope.currentUser);

            }

        }


    }

})();