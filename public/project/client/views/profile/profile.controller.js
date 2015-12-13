(function () {
    "use strict";
    angular.module("MovieApp").controller("ProfileController", ProfileController);


    function ProfileController($scope, $rootScope, $location, UserService) {
        // login check
        if(!$rootScope.currentUser){
            alert('Pleaae login');
            $location.path('/login');
            return;
        }

        // fill form with current user info.
    
        var currentUser = $rootScope.currentUser;
        $scope.username = currentUser.username;
        $scope.password = currentUser.password;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;
        $scope.email = currentUser.email;
        


        // click function.
        $scope.update = function () {

            var user = $rootScope.currentUser;
            if (!user) {
                alert("please login");
                return;
            }

            user.username = $scope.username;
            user.password = $scope.password;
            user.firstName = $scope.firstName;
            user.lastName = $scope.lastName;
            user.email = $scope.email;

            UserService.updateUser(user.id, user).then(callback);


            function callback(_user) {

                $rootScope.currentUser = _user;
                console.log($rootScope.currentUser);

            }

        }


    }

})();