define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PenanggungCtrl', ['$scope', 'ModelItem', function($scope, ModelItem) {
       $scope.title = "PenanggungCtrl";
       

        $scope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){ 
        	
        })


    }]);
});
