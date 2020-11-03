define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PelunasanPembayaranUmumCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
        function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};

            $scope.now = new Date();

            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;

            $scope.columnGrid = [{
                    "field": "tgltransaksi",
                    "title": "<h3>Tanggal Transaksi</h3>",
                    "width": "150px"
                },
                {
                    "field": "tglverifikasi",
                    "title": "<h3>Tanggal Verifikasi</h3>",
                    "width": "150px"
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. Verifikasi</h3>",
                    "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "nospk",
                    "title": "<h3>No. SPK</h3>",
                    "width": "150px"
                },
                {
                    "field": "namaAnggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "200px"
                },
                {
                    "field": "kodeanggaran",
                    "title": "<h3>Kode Anggaran</h3>",
                    "width": "170px"
                },
                {
                    "field": "status",
                    "title": "<h3>Status</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusbayar",
                    "title": "<h3>Status Bayar</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusconfirmkabag",
                    "title": "<h3>Status Konfirmasi<br> Ka. Subag</h3>",
                    "width": "150px"
                },
                {
                    "field": "statusconfirmanggaran",
                    "title": "<h3>Status Konfirmasi<br> Ka. Bag</h3>",
                    "width": "200px"
                },
                {
                    "field": "totaltagihanFormatted",
                    "title": "<h3>Total Tagihan</h3>",
                    "width": "150px"
                },
                {
                    "field": "totalbayarFormatted",
                    "title": "<h3>Total Bayar</h3>",
                    "width": "150px"
                },
                {
                    "field": "keperluan",
                    "title": "<h3>Keterangan Keperluan</h3>",
                    "width": "150px"
                }, {
                    command: [{
                        text: "Pelunasan",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        // click: cetakTagihan,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            $scope.gridOptVerified = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel(true)" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            };

            $scope.getData = () => {
                $scope.isRouteLoading = true;
                ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-pelunasan-pembayaran-umum?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD')).then((res) => {

                    for(let i in res.data.daftar) {
                        res.data.daftar[i].tgltransaksi = dateHelper.formatDate(res.data.daftar[i].tgltransaksi);
                        res.data.daftar[i].tglverifikasi = dateHelper.formatDate(res.data.daftar[i].tglverifikasi);

                        res.data.daftar[i].totaltagihanFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          }).format(res.data.daftar[i].totaltagihan ? res.data.daftar[i].totaltagihan : 0);

                          res.data.daftar[i].totalbayarFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          }).format(res.data.daftar[i].totalbayar ? res.data.daftar[i].totalbayar : 0);
                    }

                    $scope.dataGrid = new kendo.data.DataSource({
                        data: res.data.daftar,
                        pageSize: 5
                    });
                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            }

            let init = () => {
                $scope.getData();
            }
            init();
        }
    ]);
});