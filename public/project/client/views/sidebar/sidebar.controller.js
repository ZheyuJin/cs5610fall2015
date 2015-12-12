(function () {
    "use strict";
    angular.module("MovieApp").controller("SidebarController", SidebarController);

    /*use location and scope.*/
    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();