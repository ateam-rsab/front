define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CatatanTindakanKeperawatanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal',
        function($rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal) {
            
            //$rootScope.listActive -> data listMenu
            ModelItem.setActiveMenu($rootScope.listActive, "Alergi");

            $scope.noRegistrasi = $state.params.noRegistrasi;
            $rootScope.showMenu = true;
            $rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenuDetail = false;
            $rootScope.isOpen = true;
            $scope.listTindakan = [];
            $scope.now = new Date();
            getPostOnPengkajianAwal.getListCppt().then(function(e) {
                $scope.listTindakan = e.data;
            });
        }
    ]);
});