define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarPasienLayananMedikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, dateHelper) {
            $rootScope.showMenu = false;
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenuPengkajianMedis = false;

            if ($state.current.name.indexOf('rawatJalan') > 0)
                $scope.selected = 'rj';
            else if ($state.current.name.indexOf('rawatInap') > 0)
                $scope.selected = 'ri';
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.item = data.data.data;

            });
            $scope.rawatJalan = function() {
                $scope.selected = 'rj';
                $state.go('dashboardpasien.layananMedik.rawatJalan', {
                    noCM: $rootScope.currentNoCm
                });

            }
            $scope.rawatInap = function() {
                $scope.selected = 'ri';

                $state.go('dashboardpasien.layananMedik.rawatInap', {
                    noCM: $rootScope.currentNoCm
                });

            }
        }
    ]);
});