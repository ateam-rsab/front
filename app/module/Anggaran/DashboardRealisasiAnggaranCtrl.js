define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardRealisasiAnggaranCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ManageSdm', 'ManageAkuntansi', 'DateHelper', '$http', '$state', 'ManageServicePhp',
        function (cacheHelper, $q, $rootScope, $scope, manageSdm, manageAkuntansi, dateHelper, $http, $state, manageServicePhp) {
            $scope.isRouteLoading = false;
            $scope.item = {};

            $scope.getDataRealisasiAnggaran = function () {
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-penggunaan-anggaran?tahun=" + (new Date().getFullYear()) + "&kodeDana=" + ($scope.item.sumberDana ? $scope.item.sumberDana.kodeanggaran : ""), true).then(function (dat) {
                    $scope.isRouteLoading = false;
                    console.log(dat.data.data);

                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i + 1
                        dat.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(dat.data.data[i].anggaran);
                        dat.data.data[i].penggunaanFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(dat.data.data[i].penggunaan);
                    };
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.data.length,
                        pageSize: 10,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {}
                            }
                        }
                    });
                });
            }

            let init = function () {
                manageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-sumber-dana').then(res => {
                    $scope.listSumberDana = res.data;
                })
                $scope.getDataRealisasiAnggaran();
            }
            init();

            $scope.columnGrid = [{
                    "field": "no",
                    "title": "<h3>No</h3>",
                    "width": "35px",
                },
                {
                    "field": "kode_anggaran",
                    "title": "<h3>Kode</h3>",
                    "width": "70px",
                },
                {
                    "field": "nama_anggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "150px",
                },
                {
                    "field": "kode_dana",
                    "title": "<h3>Kode Dana</h3>",
                    "width": "150px",
                },
                {
                    "field": "anggaranFormatted",
                    "title": "<h3>Anggaran</h3>",
                    "width": "200px",
                },
                {
                    "field": "penggunaanFormatted",
                    "title": "<h3>Penggunaan</h3>",
                    "width": "150px",
                }
            ];
        }
    ]);
});