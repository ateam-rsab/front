define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('LaporanKunjunganRadiologiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 
        function($rootScope, $scope, $state, ModelItem, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.nav = function(state) {
           
                $scope.currentState = state;
                $state.go(state, $state.params);
                console.log($scope.currentState);
            }
        }
    ]);
});