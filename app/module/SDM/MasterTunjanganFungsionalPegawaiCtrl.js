define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasterTunjanganFungsionalPegawaiCtrl', ['$rootScope', '$scope',
        'ModelItem', '$state', 'InstitusiPendidikan', 'JenisSantunanService', 'ManageSdm',
        function($rootScope, $scope, ModelItem, $state,
            InstitusiPendidikan, JenisSantunanService, ManageSdm) { 
           
                $scope.item = {};
                $scope.now = new Date();
                $scope.dataVOloaded = true; 
                
            ManageSdm.getOrderList("service/list-generic/?view=Pendidikan&select=id,namaPendidikan", true).then(function (dat) {
                $scope.listPendidikan = dat.data;
            });
 
            ManageSdm.getOrderList("service/list-generic/?view=KomponenHarga&select=id,komponenHarga", true).then(function(dat) {
                $scope.listKomponenHarga = dat.data;
            });

            ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan", true).then(function(dat) {
                $scope.listJabatan = dat.data;
            });

            initial();
            function initial(){

                ManageSdm.getOrderList("pegawai-jape/get-all-pegawai-jape", true).then(function(dat) {
                    $scope.gridMasterTunjanganFungsionalPeg = dat.data;
                });
                 $scope.item = {};
                  $scope.vals = false;
            }

            $scope.listOperatorFactorRate = [
            {
                "op": "+"
            }, {
                "op": "-"
            }, {
                "op": "x"
            }, {
                "op": "/"
            }] 

            $scope.columnGridMasterTunjanganFungsionalPeg = {
            columns :[
              /*{
                    "field": "no",
                    "title": "Kode Profile",
                    "width": "40%"
                },*/
                {
                    "field": "namaJabatan",
                    "title": "Jabatan",
                    "width": "20%"
                },
                {
                    "field": "namaPendidikan",
                    "title": "Pendidikan",
                    "width": "10%"
                },
                {
                    "field": "namaKomponenHarga",
                    "title": "Komponen Harga",
                    "width": "20%"
                },
                {
                    "field": "hasilUji",
                    "title": "Harga Satuan",
                    "width": "10%"
                },
                {
                    "field": "factorRate",
                    "title": "Factor Rate",
                    "width": "10%"
                },
                {
                    "field": "operatorFactorRate",
                    "title": "Operator Factor Rate",
                    "width": "10%"
                },
                {
                    "field": "statusEnabled",
                    "title": "Status Aktif",
                    "width": "10%"
                }
            ]};
      
             $scope.klik = function(current) {
                $scope.item.dataFromGrid = current; 
                $scope.item.hargaSatuan = current.hargaSatuan;
                $scope.item.faktorRate = current.factorRate; 
                var x = 0; 

                for (x = 0; x < $scope.listJabatan.length; x++) {
                    if ($scope.listJabatan[x].id === current.jabatanId) {
                        $scope.item.jabatan = $scope.listJabatan[x];
                    }
                } 

                for (x = 0; x < $scope.listPendidikan.length; x++) {
                    if ($scope.listPendidikan[x].id === current.pendidikanId) {
                        $scope.item.pendidikan = $scope.listPendidikan[x];
                    }
                }

                for (x = 0; x < $scope.listKomponenHarga.length; x++) {
                    if ($scope.listKomponenHarga[x].id === current.komponenHargaId) {
                        $scope.item.komponenHarga = $scope.listKomponenHarga[x];
                    }
                }
  
                for (x = 0; x < $scope.listOperatorFactorRate.length; x++) {
                    if ($scope.listOperatorFactorRate[x].op === current.operatorFactorRate) {
                        $scope.item.operatorFactorRate = $scope.listOperatorFactorRate[x];
                    }
                }

                if (current.statusEnabled === '1' || current.statusEnabled === true) {
                    $scope.vals = true;
                } else {
                    $scope.vals = false;
                }

            };
            $scope.Cancel = function(){ 
                debugger;
 
                initial();
            }
            $scope.Save = function () { 
                  debugger;
                if($scope.item.komponenHarga === undefined || $scope.item.operatorFactorRate === undefined || 
                    $scope.item.pendidikan  === undefined || $scope.item.komponenHarga === undefined 
                    || $scope.item.jabatan  === undefined){
                    toastr.warning("Lengkapi semua data");
                    return;
                }
                var id;
                if ($scope.item.dataFromGrid !== undefined) {
                    id =  $scope.item.dataFromGrid.id;
                }
                if ($scope.item.dataAktif === undefined) {
                    $scope.item.dataAktif = false;
                }
                var data = {
                    "id": id,
                    "kdProfile":0,
                    "jabatanId": $scope.item.jabatan.id,
                    "namajabatan": $scope.item.jabatan.namajabatan,
                    "pendidikanId": $scope.item.pendidikan.id,
                    "namaPendidikan": $scope.item.pendidikan.namaPendidikan, 
                    "komponenHargaId": $scope.item.komponenHarga.id,
                    "namaKomponenHarga": $scope.item.komponenHarga.namaKomponenHarga, 
                    "hargaSatuan": $scope.item.hargaSatuan,
                    "factorRate": $scope.item.faktorRate,
                    "operatorFactorRate": $scope.item.operatorFactorRate.op,
                    "statusEnabled": $scope.item.dataAktif 
                };

                ManageSdm.saveJenisSantunan(ModelItem.beforePost(data), "pegawai-jape/save-pegawai-jape").then(function(e) {
                    initial();                 
                });
            };
         }
    ]);
});