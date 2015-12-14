(function () {
    "use strict";
    angular.module("MovieApp").controller("HeaderController", HeaderController);

    /*use location and scope.*/
    function HeaderController($scope, $rootScope, $location) {
    	var _this = this;

        $scope.$location = $location;
        _this.logout = logout;


        function logout(){
        	$rootScope.currentUser = null;    	
        }

    }
})();