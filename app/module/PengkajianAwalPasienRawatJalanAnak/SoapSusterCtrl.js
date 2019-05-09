define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SoapSusterCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian Medis";
            $rootScope.showMenuDetail = false;
            $rootScope.showMenu = true;
            $rootScope.showMenuPengkajianMedis = true;

            //---

        }
    ]);
});