define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MenuRehabilitasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "Psikologi";
            $scope.dataVOloaded = true;
            $scope.nav = function(state) {
                $state.go(state, $state.params);
            }
        }
    ]);
});