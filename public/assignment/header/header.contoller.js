(function () {
    "use strict";
    angular.module("FormBuilderApp").controller("HeaderController", HeaderController);

    /*use location and scope.*/
    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();