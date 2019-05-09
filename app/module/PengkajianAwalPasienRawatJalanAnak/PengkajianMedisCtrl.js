define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PengkajianMedisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian Medis";
            $rootScope.showMenuDetail = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuPengkajianMedis = true;

            //---

        }
    ]);
});