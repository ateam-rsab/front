define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MenuSkriningUmumCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            if (currentState.indexOf('TandaVital') > 0 || currentState.indexOf('Alergi') >0 || currentState.indexOf('SkriningGizi') >0 || currentState.indexOf('SkriningNyeri') >0 || currentState.indexOf('ResikoJatuh') >0 || currentState.indexOf('StatusFungsional') >0 || currentState.indexOf('Kebutuhan') >0 || currentState.indexOf('Psikososial') >0) 
                $scope.activeMenuSkriningUmum = localStorage.getItem('activeMenuSkriningUmum');
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function(state) {
                $scope.activeMenuSkriningUmum = state;
                localStorage.setItem('activeMenuSkriningUmum', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});