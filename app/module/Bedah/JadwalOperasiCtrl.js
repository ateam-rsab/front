define([
    'initialize'
], function(initialize) {
    'use strict';
    initialize.controller('JadwalOperasiCtrl',['$q', '$rootScope', '$scope', 'FindPasien', 'ManagePasien', '$mdDialog', 'DateHelper',
    function($q, $rootScope, $scope, findPasien, ManagePasien, $mdDialog, dateHelper){
        $scope.dataVOloaded = true;
        $scope.item = {};
        $scope.now = new Date();
        $scope.item.tglRencanaOperasi = new Date();
        $scope.item.tanggalAwal = new Date();
        $scope.item.tanggalAkhir = new Date();
        
        $scope.JadwalOperasi = function(){
        findPasien.getRencanaOperasiAll("registrasi-pelayanan/get-all-rencana-operasi").then(function(dat){
            $scope.listRencanaOperasi = dat.data.data;
            $scope.sourceDaftarRencanaOperasi = new kendo.data.DataSource({
                data: $scope.listRencanaOperasi,
                pageSize: 10
            });
        });
        }
        $scope.JadwalOperasi();
        

         $scope.btnCari = function(){
            var tglAwal = dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD');
            var tglAkhir = dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD');
            var noCM = $scope.item.noCm;
            findPasien.getPermintaanOperasiByDateNoCm(tglAwal,tglAkhir,noCM).then(function(dat){
                $scope.listRencanaOperasi = dat.data.data;

                $scope.sourceDaftarRencanaOperasi = new kendo.data.DataSource({
                    data: $scope.listRencanaOperasi,
                    pageSize: 10
                });
            })
        }

        $scope.mainGridOptions = {
            pageable: true,
            scrollable:true,
            columns: [
            {
                "template": "#= new moment(new Date(tglRencana)).format('DD-MM-YYYY') #",
                "title": "<h3 align=center>Tgl Rencana Operasi</h3>",
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

        $scope.isShowPopUp = false;
        $scope.validasi= function(){
            var confirm = $mdDialog.confirm()
              .title('Validasi')
              .textContent('Data belum di pilih !!!')
              .ariaLabel('Lucky day')
              .cancel('Ok')
            $mdDialog.show(confirm).then(function() {
            })
        };
        
        $scope.goVerify = function(ev){
            debugger;
            if($scope.dataSelectedRow === undefined)
            {
                $scope.validasi();
            }else {
                var myWindow = $("#winPopUp");
                    myWindow.data("kendoWindow").open();
                    $scope.isShowPopUp = true;

                $scope.item.noRecAntrian = $scope.dataSelectedRow.noRecAntrian;
                $scope.item.asalRujukan = $scope.dataSelectedRow.asalRujukan;
                $scope.item.noRM = $scope.dataSelectedRow.noCm;
                $scope.item.namaPasien = $scope.dataSelectedRow.namaPasien;
                $scope.item.tglOperasi = new Date($scope.dataSelectedRow.tglRencana);
                $scope.item.pasienDaftar = $scope.dataSelectedRow.pasienDaftar;
                $scope.item.tglRegistrasi = $scope.dataSelectedRow.tglRegistrasi;
                $scope.item.noRecAntrian = $scope.dataSelectedRow.noRecAntrian;
                $scope.item.strukOrderId = $scope.dataSelectedRow.strukOrderId;
            }
        };

        $scope.simpanRencanaOperasi=function(){
            debugger;
            var tglOperasi = dateHelper.formatDate($scope.item.tglOperasi, 'YYYY-MM-DD');
            var tglRegistrasi = dateHelper.formatDate($scope.item.tglRegistrasi, 'YYYY-MM-DD');
            var dataFix =  {
                                    "strukOrder" : {"noRec" : $scope.dataSelectedRow.strukOrderId},
                                    "noCm" : {"noRec" : $scope.dataSelectedRow.noRecAntrian},
                                    "tglOperasi":tglOperasi,
                                    "ruangan" : {"id" : 44},
                                    "asalRujukan" : {"id":$scope.dataSelectedRow.asalRujukan}
                            }
            ManagePasien.saveRencanaOperasiBedah(dataFix,"registrasi-pelayanan/save-operasi").then(function(e){
            });
            $scope.close();
            $scope.JadwalOperasi();
        }

        $scope.close = function(){
            var myWindow = $("#winPopUp");
            myWindow.data("kendoWindow").close();
        }

    }]);
});