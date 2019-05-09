define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PreventiveMaintenancePihakLuarCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state', 'IPSRSService',
        function($rootScope, $scope, ModelItem, DateHelper, $state, IPSRSService) {
            ModelItem.get("IPSRS/PreventiveMaintenancePihakLuar").then(function(data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
                IPSRSService.getItem("ipsrs-preventive-maintenance/get-aset-preventive-maintenance", true).then(function(dat){
                    $scope.listAlat = dat.data.data.dataAset;
                    //debugger;
                });
                $scope.kebutuhanAlat = function() {
                    $scope.item.merk = $scope.item.namaAlat.merkProduk;
                    $scope.item.tipe = $scope.item.namaAlat.typeProduk;
                    $scope.item.noSeri = $scope.item.namaAlat.noSeri;
                    var asetId = $scope.item.namaAlat.produkId;
                    // debugger;
                    IPSRSService.getItem("ipsrs-preventive-maintenance/get-bagian-alat?id="+asetId, true).then(function(dat){
                        $scope.daftarPemeriksaan = dat.data.data.listBagianAlat;
                        $scope.columndaftarPemeriksaanTandingan = [
                        {
                            "field": "bagianAlat",
                            "title": "<h1 align=center>Kebutuhan Alat</h1>",
                            "width": "200px"
                        },
                        {
                            "field": "pemeriksaanFisik",
                            "title": "<h3 align=center>PermeriksaanFisik</h3>",
                            "width": "200px"
                        },
                        {
                            "field": "pemeriksaanFungsi",
                            "title": "<h3 align=center>Permeriksaan Fungsi</h3>",
                            "width": "200px"
                        }];
                        $scope.columndaftarPemeriksaan = [
                        {
                            "field": "bagianAlat",
                            "title": "<h1 align=center>Kebutuhan Alat</h1>",
                            "width": "200px"
                        },
                        {
                            "field": "pemeriksaanFisik",
                            "title": "<h3 align=center>PermeriksaanFisik</h3>",
                            "width": "200px",
                            columns: [
                            {
                                "title": "<h3 align=center>Baik</h3>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='columndaftarPemeriksaan[$index].baik' value='1' ng-click='klik(dataItem,Fisik)'></div>",
                                "width":"50px"
                            },{
                                "title": "<h3 align=center>Tidak</h3>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='Fisik' value='2' ng-click='klik(dataItem,Fisik)'></div>",
                                "width":"50px"
                            }]
                        },
                        {
                            "field": "pemeriksaanFungsi",
                            "title": "<h3 align=center>Permeriksaan Fungsi</h3>",
                            "width": "200px",
                            columns: [
                            {
                                "title": "<h3 align=center>Baik</h3>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='Fungsi' value='1' ng-click='klik(dataItem,Fungsi)'></div>",
                                width:"50px"
                            },{
                                "title": "<h3 align=center>Tidak</h3>",
                                "template": "<div class='center'><input type=\"radio\" ng-model='Fungsi' value='2' ng-click='klik(dataItem,Fungsi)'></div>",
                                width:"50px"
                            }]
                        }];
                    });
                };
            }, function errorCallBack(err) {});
        }
        ]);
});
