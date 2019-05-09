define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumReportPemeriksaanCtrl', ['ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            $scope.now = new Date();
            $rootScope.isOpen = true;
            $scope.tglAwal = new Date();
            $scope.tglAkhir = new Date();
            $scope.listdetailJenisProduk = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=1');
            $scope.refresh = function() {
                findPasienLaboratorium.getReportPemeriksaan(dateHelper.formatDate($scope.tglAwal, 'YYYY-MM-DD'), dateHelper.formatDate($scope.tglAkhir, 'YYYY-MM-DD'), $scope.item.detailJenisProduk.id).then(function(e) {
                    $scope.listData = ModelItem.beforePost(e.data.data, true);
                });


            }

            $scope.cetakLaporan = function(noLab)
            {
                if(noLab != undefined){
                    var fixUrlLaporan = reportHelper.open("reporting/lapHasilPemeriksaanLab?noLab="+noLab);
                    window.open(fixUrlLaporan, '_blank')
                } 
            }

        }
    ]);
});