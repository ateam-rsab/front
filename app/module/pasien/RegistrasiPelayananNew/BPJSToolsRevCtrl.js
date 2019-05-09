define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('BPJSToolsRevCtrl', ['$rootScope', '$scope', '$state', 'ModelItem'    , 'DateHelper', 'ManageServicePhp',
        function($rootScope, $scope, $state, ModelItem, dateHelper,manageServicePhp) {
            $scope.now = new Date();
            $scope.nav = function(state) {
                // debugger;
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }
      
        }
    ]);
});