define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemeriksaanFisikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "PemeriksaanFisikCtrl";
            $rootScope.showMenuDetail = true;
            $rootScope.showMenu = false;
            $rootScope.showMenuPengkajianMedis = false;
        }
    ]);
});