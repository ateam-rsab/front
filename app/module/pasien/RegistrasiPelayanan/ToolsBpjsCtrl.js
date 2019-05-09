define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('ToolsBpjsCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 
        function($rootScope, $scope, $state, ModelItem, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.nav = function(state) {
                debugger;
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }
        }
    ]);
});