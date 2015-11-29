(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("SidebarController", SidebarController);

    /*use location and scope.*/
    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();