define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DefinitifRKAKLctrl', ['$q', '$rootScope', '$scope','FindPasien','DateHelper','$http','$route',
        function($q, $rootScope, $scope,findPasien,dateHelper,$http,$route) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeTahun = $scope.now;

            $scope.monthSelectorOptions = function() {
                return {
                    start: "year",
                    depth: "year"
                }
            }

            
            
            var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
            /*findPasien.getDataDetail(tahunPriode).then(function(data) {*/
            $http.get('module/Anggaran/dummy_json/DefinitifRKAKL.json').success(function(data) {
                var arraydata = data.result;
                $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                    data: arraydata,
                    total: data.length,
                    serverPaging: false,
                    pageSize: 10,
                    schema:  {
                        model: {
                            fields: {
                                tanggalMasuk: { type: "date" },
                                tanggalPulang: { type: "date" }
                            }
                        }
                    }
                });
            })

            $scope.findData = function() {

                var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
                findPasien.lalala(tahunPriode).then(function(data) {

                    var arraydata = data.data.data;
                    $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                        data: arraydata,
                        total: data.length,
                        serverPaging: false,
                        schema:  {
                            model: {
                                fields: {
                                    tanggalMasuk: { type: "date" },
                                    tanggalPulang: { type: "date" }
                                }
                            }
                        }
                    });
                })

            }


            $scope.columnPenyusunanTRPNBP = [
                {
                    "field": "kodeProgram",
                    "title": "Kode",
                    "width":"150px"
                },
                {
                    "field": "namaProgram",
                    "title": "Program"
                },
                {
                    "field": "",
                    "title": "Jumlah Biaya"
                }
            ];

            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.listKegiatan
                    }),
                    columns: [
                        {
                            "field": "kodeKegiatan",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaKegiatan",
                            "title": "Kegiatan"
                        },
                        {
                            "field": "",
                            "title": "Jumlah Biaya"
                        }]
                };
            };

            $scope.detailGridOptionsDua = function(dataItem) {
                debugger;
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.listDetailKegiatan
                    }),
                    columns: [
                        {
                            "field": "kodeKegiatanDetail",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaKegiatanDetail",
                            "title": "Detail Kegiatan",
                        },
                        {
                            "field": "volume",
                            "title": "Volume"
                        },
                        {
                            "field": "hargaSatuan",
                            "title": "Harga Satuan"
                        },
                        {
                            "field": "jumlahBiaya",
                            "title": "Jumlah Biaya"
                        }]
                };
            };
            $scope.Cetak = function(){
                debugger;
                var xxx = $scope.dataPasienSelected.detail;
                var yyy = "aasas";
            }
            $scope.refresh = function() {
              /*$route.reload('#/DetailRKAKL');*/
              location.reload();
              /*$scope.item = "";*/

            }
            /////////////////////////////////////////////////////////////////////
        }
    ]);
});