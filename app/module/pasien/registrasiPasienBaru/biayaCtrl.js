define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BiayaCtrl', ['$scope', 'ModelItem', function($scope, ModelItem) {
        $scope.title = "BiayaCtrl";
       

        $scope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){ 
        	
        })


    }]);
});
