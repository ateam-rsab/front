define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardResepElektronikCtrl', ['ManagePasien', 'socket', '$state', '$timeout', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', 'ManageLogistikPhp', 'CacheHelper',
        function (managePasien, socket, $state, $timeout, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r, manageLogistikPhp, cacheHelper) {
            $("#header").hide();
            $scope.item = {};
            $scope.dataPasienAntrian = [];
            $scope.showLoader = false;

            var tglAwal = moment(new Date()).format('YYYY-MM-DD');
            var tglAkhir = moment(new Date()).format('YYYY-MM-DD');

            $scope.gridOptionDashboardResep = {
                dataBound: function (e) {
                    $('td').each(function () {
                        if ($(this).text() == 'Sudah Bayar') {
                            $(this).addClass('sudah-bayar')
                        };
                        if ($(this).text() == 'Selesai') {
                            $(this).addClass('selesai')
                        };
                        if ($(this).text() == 'Verifikasi') {
                            $(this).addClass('verifikasi')
                        };
                        if ($(this).text() == 'Dibatalkan Pasien') {
                            $(this).addClass('dibatalkan-pasien')
                        };
                        if ($(this).text() == 'Blm Verifikasi') {
                            $(this).addClass('blm-verifikasi')
                        };
                        if ($(this).text() == 'Ya') {
                            $(this).addClass('selesai')
                        };
                        if ($(this).text() == 'Tidak') {
                            $(this).addClass('dibatalkan-pasien')
                        };
                    })
                },
                columns: [{
                        "field": "noorder",
                        "title": "<h3>No. Pesanan</h3>",
                        "width": "160px",
                    },
                    {
                        "field": "noresep",
                        "title": "<h3>No. Resep</h3>",
                        "width": "160px",
                    },
                    {
                        "field": "namapasien",
                        "title": "<h3>Nama Pasien</h3>",
                        "width": "150px",

                    },
                    {
                        "field": "jeniskelamin",
                        "title": "<h3>Jenis Kelamin</h3>",
                        "width": "100px",

                    },
                    {

                        "field": "strukOrder.tglOrder",
                        "title": "<h3>Tanggal/Jam Masuk</h3>",
                        "width": "150px",
                        "template": "#= new moment(new Date(tglorder)).format('DD-MM-YYYY HH:mm:ss') #"
                    },
                    {
                        "field": "namalengkap",
                        "title": "<h3>Dokter</h3>",
                        "width": "150px",

                    },
                    {
                        "field": "statusorder",
                        "title": "<h3>Status</h3>",
                        "width": "100px",

                    },
                ],
                editable: false
            }

            $scope.init = function () {
                // manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-order-resep-elektronik?tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + "&dep_id=" + ($scope.item.namaDept ? $scope.item.namaDept.id : "") + "&kelompok_id=" + ($scope.item.kelompokPasien ? $scope.item.kelompokPasien.id : "")).then(function (e) {
                // manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-order-resep-elektronik?tglAwal=2020-05-01&tglAkhir=2020-07-08&nocm=&dep_id=18&kelompok_id=').then(function (e) {
                //     $scope.showLoader = false;
                //     let data = [];
                //     if (e.data.length > 0) {
                //         for (var i = 0; i < e.data.length; i++) {
                //             e.data[i].no = i + 1
                //             var tanggal = $scope.now;
                //             var tanggalLahir = new Date(e.data[i].tgllahir);
                //             var umur = DateHelper.CountAge(tanggalLahir, tanggal);
                //             e.data[i].umur = umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari';
                //             e.data[i].isVerifikasi = e.data[i].statusorder == "Verifikasi" ? true : false;
                //             data.push(e.data[i]);
                //             // if (e.data[i].statusorder == "Sudah Bayar" || e.data[i].statusorder == "Verifikasi") {
                //             //     data.push(e.data[i]);
                //             // }

                //         }
                //     }
                //     $scope.dataPasienAntrian = ModelItem.beforePost(data, true);
                //     console.log(ModelItem.beforePost(data, true));
                //     // $scope.patienGrids = new kendo.data.DataSource({
                //     //     data: ModelItem.beforePost(data, true),
                //     // });
                // });
            }

            // $scope.intervalFunction = function () {
            //     $timeout(function () {
            //         $scope.init();
            //         $scope.intervalFunction();
            //     }, 6000);
            // }

            // $scope.intervalFunction();

            $scope.init();
        }
    ]);
});