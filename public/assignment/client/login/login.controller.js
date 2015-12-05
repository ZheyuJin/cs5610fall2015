(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("LoginController", LoginController);

    /*use location and scope.*/
    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = function () {
            //            alert("id "+ $scope.username  + ' passwd:' + $scope.password);
            //            $rootScope.currentUser = "not defined. yeas. "

            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, callback);

            function callback(currentUser) {
                alert("callback : " + currentUser);
                //                debugger;
                if (currentUser != undefined) {
                    $rootScope.currentUser = currentUser;
                    alert($rootScope.currentUser);
                    //                goto /profile page
                    $location.path("/profile")

                }

                //                goto /profile page
                //                $location.path("/register")
            }
        }
    }
})();