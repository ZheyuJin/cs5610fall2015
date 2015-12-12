(function () {
    "use strict";
    angular.module("MovieApp").controller("HeaderController", HeaderController);

    /*use location and scope.*/
    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();