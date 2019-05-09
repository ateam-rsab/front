define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KeluhanUtamaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.noCM = $state.params.noCM;
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = false;
            $scope.noCM = $state.params.noCM;
        }
    ]);
});