define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InfoCtrl', ['$scope', 'ModelItem', function($scope, ModelItem) {
       $scope.title = "InfoCtrl";
       

        $scope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){ 
        	
        })


    }]);
});
