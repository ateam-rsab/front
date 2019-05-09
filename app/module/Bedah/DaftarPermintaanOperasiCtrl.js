define([
    'initialize'
], function(initialize) {
    'use strict';
    initialize.controller('DaftarPermintaanOperasiCtrl',['$q', '$rootScope', '$scope', '$state', 'FindPasien', 'ManagePasien', '$mdDialog', 'DateHelper',
    function($q, $rootScope, $scope, $state, findPasien, ManagePasien, $mdDialog, dateHelper){
        $scope.dataVOloaded = true;
        $scope.item = {};
        $scope.now = new Date();
        $scope.item.tglRencanaOperasi = new Date();
        $scope.item.tanggalAwal = new Date();
        $scope.item.tanggalAkhir = new Date();

        findPasien.getPermintaanOperasiAll("registrasi-pelayanan/get-all-permintaan-operasi").then(function(dat){
            debugger;
            $scope.listPermintaanOperasi = dat.data.data;

            $scope.sourceDaftarPermintaanOperasi = new kendo.data.DataSource({
                data: $scope.listPermintaanOperasi,
                pageSize: 10
            });
        });

        $scope.btnCari = function(){
            var tglAwal = dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD');
            var tglAkhir = dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD');
            var noCM = $scope.item.noCm;
            findPasien.getPermintaanOperasiByDateNoCm(tglAwal,tglAkhir,noCM).then(function(dat){
                $scope.listPermintaanOperasi = dat.data.data;

                $scope.sourceDaftarPermintaanOperasi = new kendo.data.DataSource({
                    data: $scope.listPermintaanOperasi,
                    pageSize: 10
                });
            })
        }

        $scope.mainGridOptions = {
            pageable: true,
            scrollable:true,
            columns: [
            {
                "template": "#= new moment(new Date(tglPermintaanOperasi)).format('DD-MM-YYYY') #",
                "title": "<h3 align=center>Tgl Permintaan Operasi</h3>",
                "width": "100px",
                "attributes": {align:"center"}
            },
            {
                "field": "noCm",
                "title": "<h3 align=center>No RM</h3>",
                "width": "100px",
                "attributes": {align:"center"}
            },
            {
                "field": "namaPasien",
                "title": "<h3 align=center>Nama Pasien</h3>",
                "width": "300px"
            }
            ]
        };
        $scope.validasi= function(){
            var confirm = $mdDialog.confirm()
              .title('Validasi')
              .textContent('Data belum di pilih !!!')
              .ariaLabel('Lucky day')
              .cancel('Ok')
            $mdDialog.show(confirm).then(function() {
            })
        };
       
        $scope.goVerifikasi = function(){
            debugger;
            findPasien.getPermintaanOperasiByNoRec($scope.dataSelectedRow.noRec).then(function(dat){
                $scope.tanggalRencana = dat.data.data.tglRencana;

                if($scope.tanggalRencana === null){
                    $state.go('PermintaanOperasi',{
                        "noAntrianPasien": $scope.dataSelectedRow.noRecAntrian,
                        "noRecRegistrasi": $scope.dataSelectedRow.noRec,
                        "noCm": $scope.dataSelectedRow.noCm,
                        "namaPasien": $scope.dataSelectedRow.namaPasien,
                        "namaKamar": $scope.dataSelectedRow.namaKamar,
                        "namaRuangan": $scope.dataSelectedRow.namaRuangan
                    })
                }else{
                    var confirm = $mdDialog.confirm()
                      .title('peringatan')
                      .textContent('Data sudah di verifikasi !!!')
                      .ariaLabel('Lucky day')
                      .cancel('Ok')
                    $mdDialog.show(confirm).then(function() {
                    })
                }
            })
            
        };
    }]);
});