define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatKeluargaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','ManagePasien','DateHelper',
        function($rootScope, $scope, ModelItem, $state,managePasien,dateHelper ) {
            //$rootScope.listActive -> data listMen
            ModelItem.setActiveMenu($rootScope.listActive, "RiwayatKeluarga");

            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Riwayat";
            $scope.item = {};
            $rootScope.showMenu = true;$rootScope.showMenuDetail = false;
            $scope.noCM = $state.params.noCM;
            ModelItem.get("RiwayatKeluarga").then(function(data) {
                $scope.item = data;
            })
            $scope.Save = function() {
                debugger;
                $scope.item.AntrianPasienDiPeriksa = {"noRec" : $state.params.noRec}
                managePasien.saveRiwayatKeluarga(ModelItem.beforePost($scope.item)).then(function() {
                   $scope.isNext = true;
                }, function(err) {

                });
                }
        }
    ]);
});
/**
 * Created by jasamedika on 6/7/2016.
 */