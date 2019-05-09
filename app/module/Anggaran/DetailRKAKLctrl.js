define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailRKAKLctrl', ['$q', '$rootScope', '$scope','FindPasien','DateHelper','$http','$route',
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
                    "title": "Detail Kegiatan",
                    "width":"360px"
                },
                {
                    "field": "totalKegiatan",
                    "title": "Total",
                    "width":"200px",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalKegiatan #', 'Rp.')}}</span>"
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
                            "title": "Mata Anggaran",
                            "width":"360px"
                        },
                        {
                            "field": "totalMata",
                            "title": "Total",
                            "width":"200px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalMata #', 'Rp.')}}</span>"
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
                            "width":"300px"
                        },
                        {
                            "field": "qty",
                            "title": "Jumlah",
                            "width":"100px"
                        },
                        {
                            "field": "harga",
                            "title": "Harga",
                            "width":"150px",
                            "template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "total ",
                            "width":"200px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
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

              $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };
            /////////////////////////////////////////////////////////////////////
        }
        ]);
});