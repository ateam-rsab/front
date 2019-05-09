
define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('MenuPengkajianCtrl', ['$rootScope', '$scope', '$state', 'ModelItem'    , 'DateHelper', 'CacheHelper',
        function($rootScope, $scope, $state, ModelItem, dateHelper,cacheHelper) {
            $scope.now = new Date();
            // $scope.isRawatInap =true;
            var usiaPengkajian = window.localStorage.getItem('usiaPengkajian')
            usiaPengkajian = JSON.parse(usiaPengkajian)
            
            var departemen = window.localStorage.getItem('departemenPengkajian')
            if (usiaPengkajian.hari >= 1 && usiaPengkajian.hari <= 31) { $scope.isNeonatal = true }
            if (usiaPengkajian.hari > 31 && usiaPengkajian.umur <= 17) { $scope.isAnak = true }
            if (usiaPengkajian.umur  >= 18 && usiaPengkajian.umur <= 49) { $scope.isDewasa = true }
            if (usiaPengkajian.umur  > 50) { $scope.isGeriatri = true }
            if (departemen == 18 || departemen == 28){$scope.isRawatJalan = true}
            if (departemen == 16 || departemen == 35){$scope.isRawatInap = true}
            $scope.navigasiPap = function (state) {
                $scope.currentPasien = cacheHelper.get('currentPasien');
                $scope.activeMenuDashboardPAP = state;
                localStorage.setItem('activeMenuDashboardPAP', state);
                $state.go(state);
            }
            
      
        }
    ]);
});