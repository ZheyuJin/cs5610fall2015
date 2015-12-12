(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    /*use location and scope.*/
    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = function () {
            //            alert("id "+ $scope.username  + ' passwd:' + $scope.password);
            //            $rootScope.currentUser = "not defined. yeas. "

            UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(callback);

            function callback(currentUser) {
                console.log("callback : " + currentUser);
                                
                if (!currentUser) {
                    alert('user does not exist');
                    return;
                }

                $rootScope.currentUser = currentUser;
                console.log($rootScope.currentUser);
                $location.path("/profile")



                //                goto /profile page
                //                $location.path("/register")
            }
        }
    }
})();