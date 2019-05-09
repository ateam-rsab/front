define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonevBelanjactrl', ['$q', '$rootScope', '$scope','FindPasien','DateHelper','$http','$route','$state',
        function($q, $rootScope, $scope,findPasien,dateHelper,$http,$route,$state) {
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
            debugger;
            var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
            // findPasien.getDataDetail(tahunPriode).then(function(data) {
                $http.get('module/Anggaran/dummy_json/DetailRKAKL.json').success(function(data) {
                    debugger;
                    var arraydata = data.result[0].listKegiatanDetail;
                    $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                        data: arraydata,
                        total: data.length,
                        serverPaging: false,
                        pageSize: 12,
                    // schema:  {
                    //     model: {
                    //         fields: {
                    //             tanggalMasuk: { type: "date" },
                    //             tanggalPulang: { type: "date" }
                    //         }
                    //     }
                    // }
                });
                })

                $scope.findData = function() {

                    var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');
                    $http.get('module/Anggaran/dummy_json/DetailRKAKL.json').success(function(data) {
                // findPasien.getDataDetail(tahunPriode).then(function(data) {
                    debugger;
                    var arraydata = data.data.result.listKegiatanDetail;
                    $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                        data: arraydata,
                        total: data.length,
                        serverPaging: false,
                        // schema:  {
                        //     model: {
                        //         fields: {
                        //             tanggalMasuk: { type: "date" },
                        //             tanggalPulang: { type: "date" }
                        //         }
                        //     }
                        // }
                    });
                })

                }


                $scope.columnPenyusunanTRPNBP = [
                {
                    "field": "kodeKegiatanDetail",
                    "title": "Kode",
                    "width":"150px"
                },
                {
                    "field": "namaKegiatanDetail",
                    "title": "Detail Kegiatan"
                },
                {
                    "field": "totalKegiatan",
                    "title": "Total"
                },
                {
                    "field": "realisasiBelanja",
                    "title": "Realisasi Belanja"
                }
                ];

                $scope.detailGridOptions = function(dataItem) {
                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.listMataAnggaran
                        }),
                        columns: [
                        {
                            "field": "kodeMataAnggaran",
                            "title": "Kode",
                            "width":"150px"
                        },
                        {
                            "field": "namaMataAnggaran",
                            "title": "Mata Anggaran"
                        },
                        {
                            "field": "totalMata",
                            "title": "Total"
                        },
                        {
                            "field": "realisasiBelanja",
                            "title": "Realisasi Belanja"
                        }]
                    };
                };

                $scope.detailGridOptionsDua = function(dataItem) {
                    debugger;
                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.listNamaPaket
                        }),
                        columns: [
                        {
                            "field": "namaPaket",
                            "title": "Paket Usulan",
                            "width":"150px"
                        },
                        {
                            "field": "qty",
                            "title": "Jumlah",
                        },
                        {
                            "field": "harga",
                            "title": "Harga",
                        },
                        {
                            "field": "total",
                            "title": "total ",
                        },
                        {
                            "field": "realisasiBelanja",
                            "title": "Realisasi Belanja"
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
              $scope.Riwayat = function(){
                $state.go('RiwayatMonev')
            }
            /////////////////////////////////////////////////////////////////////
        }

        

        ]);
});