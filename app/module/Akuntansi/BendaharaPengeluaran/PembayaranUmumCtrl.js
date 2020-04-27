define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PembayaranUmumCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
        function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.confirm = {};
            $scope.verif = {};
            $scope.now = new Date();
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            $scope.item.tanggalVerifikasi = $scope.now;

            let init = function () {
                // serive get sumber dana
                ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-sumber-dana').then(res => {
                    $scope.listSumberDana = res.data;
                })

            }

            init();

            $scope.getListAnggaran = function () {
                $scope.verif.anggaran = null;
                $scope.isPagu = false;
                ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear() + "&kodeDana=" + $scope.verif.sumberDana.kodeanggaran).then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.data[i].anggaran);
                    }
                    $scope.listAnggaran = res.data.data;
                });
            }

            $scope.showPagu = function (data) {
                $scope.verif.kodeDana = data.kode_dana;
                $scope.verif.tahunDana = data.tahun;
                $scope.verif.namaAnggaran = data.nama_anggaran;
                console.log($scope.verif.anggaran);
                $scope.verif.sisaPagu = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format((data.anggaran - data.penggunaan));
                $scope.verif.pagu = data.anggaranFormatted;
                $scope.verif.rawSisaPagu = (data.anggaran - data.penggunaan);
                $scope.getTerbilang((data.anggaran - data.penggunaan), 'sisaPaguTerbilang');
                $scope.getTerbilang(data.anggaran, 'paguTerbilang');
                $scope.isPagu = true;
            }

            $scope.loadData = function () {
                let dataTempVerified = [],
                    dataTempUnverified = [];
                $scope.isRouteLoading = true;
                ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-verifikasi-tagihan-suplier?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD') + "&Supplier=" + ($scope.item.namaSupplier ? $scope.item.namaSupplier : "") + "&status=").then((res) => {
                    for (let i = 0; i < res.data.daftar.length; i++) {
                        res.data.daftar[i].totalFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].total);
                        res.data.daftar[i].totalppnFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].totalppn);
                        res.data.daftar[i].totaldiskonFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].totaldiskon);
                        res.data.daftar[i].subtotalFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].subtotal);
                        res.data.daftar[i].sisautangFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].sisautang);
                    }

                    for (let i = 0; i < res.data.daftar.length; i++) {

                        if (res.data.daftar[i].status === "BLM VERIFIKASI") dataTempUnverified.push(res.data.daftar[i])
                        else dataTempVerified.push(res.data.daftar[i])
                    }
                    $scope.dataGridVerified = new kendo.data.DataSource({
                        data: dataTempVerified,
                        pageSize: 5
                    });

                    $scope.dataGridUnverified = new kendo.data.DataSource({
                        data: dataTempUnverified,
                        pageSize: 5
                    })
                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.loadData();

            $scope.columnGridVerified = [{
                    "field": "namarekanan",
                    "title": "<h3>Nama Rekanan</h3>",
                    "width": "200px"
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. Verifikasi</h3>",
                    "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "tglSPK",
                    "title": "<h3>Tanggal <br>SPK</h3>",
                    "template": "<span class='style-center'>{{'#: tglSPK ? tglSPK : '-' #'}}</span>",
                    "width": "170px"
                },
                {
                    "field": "noSPK",
                    "title": "<h3>No. SPK</h3>",
                    "template": "<span class='style-center'>{{'#: noSPK ? noSPK : '-' #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "tgldokumen",
                    "title": "<h3>Tanggal Dokumen</h3>",
                    "template": "<span class='style-center'>{{'#: tgldokumen #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "nodokumen",
                    "title": "<h3>No. Dokumen</h3>",
                    "template": "<span class='style-center'>{{'#: nodokumen #'}}</span>",
                    "width": "200px"
                },
                {
                    "field": "totalFormatted",
                    "title": "<h3>Total</h3>",
                    "template": "<span class='style-center'>{{'#: totalFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "totalppnFormatted",
                    "title": "<h3>PPN</h3>",
                    "template": "<span class='style-center'>{{'#: totalppnFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "totaldiskonFormatted",
                    "title": "<h3>Diskon</h3>",
                    "template": "<span class='style-center'>{{'#: totaldiskonFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "subtotalFormatted",
                    "title": "<h3>Sub Total</h3>",
                    "template": "<span class='style-center'>{{'#: subtotalFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "sisautangFormatted",
                    "title": "<h3>Sisa Hutang</h3>",
                    "template": "<span class='style-center'>{{'#: sisautangFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "statusbayar",
                    "title": "<h3>Status Bayar</h3>",
                    "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "status",
                    "title": "<h3>Status</h3>",
                    "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },

                {
                    "field": "statusConfirmKabag",
                    "title": "<h3>Ka. Bag</h3>",
                    // "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },

                {
                    "field": "statusConfirmAnggaran",
                    "title": "<h3>Bagian Anggaran</h3>",
                    // "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },
                {
                    command: [{
                            text: "Konfirmasi Kabag",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: showWindowKonfirmasi,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Konfirmasi Bagian Anggaran",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: showWindowKonfirmasi,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Detail Tagihan",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: detailTagihan,
                            imageClass: "k-icon k-i-pencil"
                        }
                    ],
                    title: "",
                    width: "600px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            $scope.columnGridUnverified = [{
                    "field": "namarekanan",
                    "title": "<h3>Nama Rekanan</h3>",
                    "width": "200px"
                },
                {
                    "field": "tglSPK",
                    "title": "<h3>Tanggal <br>SPK</h3>",
                    "template": "<span class='style-center'>{{'#: tglSPK ? tglSPK : '-' #'}}</span>",
                    "width": "170px"
                },
                {
                    "field": "noSPK",
                    "title": "<h3>No. SPK</h3>",
                    "template": "<span class='style-center'>{{'#: noSPK #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "tgldokumen",
                    "title": "<h3>Tanggal Dokumen</h3>",
                    "template": "<span class='style-center'>{{'#: tgldokumen #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "nodokumen",
                    "title": "<h3>No. Dokumen</h3>",
                    "template": "<span class='style-center'>{{'#: nodokumen #'}}</span>",
                    "width": "200px"
                },
                {
                    "field": "totalFormatted",
                    "title": "<h3>Total</h3>",
                    "template": "<span class='style-center'>{{'#: totalFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "totalppnFormatted",
                    "title": "<h3>PPN</h3>",
                    "template": "<span class='style-center'>{{'#: totalppnFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "totaldiskonFormatted",
                    "title": "<h3>Diskon</h3>",
                    "template": "<span class='style-center'>{{'#: totaldiskonFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "subtotalFormatted",
                    "title": "<h3>Sub Total</h3>",
                    "template": "<span class='style-center'>{{'#: subtotalFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "sisautangFormatted",
                    "title": "<h3>Sisa Hutang</h3>",
                    "template": "<span class='style-center'>{{'#: sisautangFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "statusbayar",
                    "title": "<h3>Status Bayar</h3>",
                    "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "status",
                    "title": "<h3>Status</h3>",
                    "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },
                {
                    command: [{
                            text: "Verifikasi",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: showDataVerifikasi,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Detail Tagihan",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: detailTagihan,
                            imageClass: "k-icon k-i-pencil"
                        }
                    ],
                    title: "",
                    width: "300px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            $scope.columnGridAnggaran = [{
                    "field": "kode_anggaran",
                    "title": "<h3>Kode Anggaran</h3>",
                    "width": "150px"
                },
                {
                    "field": "kode_dana",
                    "title": "<h3>Kode Dana</h3>",
                    "width": "150px"
                },
                {
                    "field": "nama_anggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "170px"
                },
                {
                    "field": "anggaranFormatted",
                    "title": "<h3>Anggaran</h3>",
                    "width": "150px"
                },
                {
                    "field": "penggunaanFormatted",
                    "title": "<h3>Penggunaan</h3>",
                    "width": "150px"
                }
            ];

            $scope.gridOptVerified = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridVerified
            };

            $scope.gridOptUnverified = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridUnverified
            };

            $scope.gridOptPenggunaanAnggaran = {
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridAnggaran
            }

            function showWindowKonfirmasi(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);

                $scope.confirm = dataItem;
                console.log(e);

                $scope.isBagAnggaran = e.data.commandName === "Konfirmasi Bagian Anggaran" ? true : false;
                if ($scope.isBagAnggaran && !$scope.confirm.confirmfk) {
                    toastr.warning('Harap Konfirmasi Ka. Bag Terlebih dahulu')
                    return;
                }
                ManageAkuntansi.getDataTableTransaksi('bendahara-pengeluaran/get-penggunaan-anggaran?tahun=' + new Date().getFullYear() + "&kodeAnggaran=" + dataItem.kodeanggaran).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.data[i].anggaran);

                        res.data.data[i].penggunaanFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.data[i].penggunaan);
                    }
                    $scope.dataGridPenggunaanAnggaran = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    });
                    // $scope.listAnggaran = res.data.data;
                });
                $scope.konfirmasiAnggaran.open().center();
            }

            function detailTagihan(e) {}

            function showDataVerifikasi(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);
                $scope.dataSelected = dataItem;
                if (dataItem.statusbayar !== 'BELUM LUNAS') {
                    toastr.info('Data Tagihan SUDAH LUNAS');
                    return;
                }

                // status
                if (dataItem.status !== 'BLM VERIFIKASI') {
                    toastr.info('Data Tagihan Sudah Verifikasi');
                    return;
                }


                $scope.loadData();
                $scope.verif.totalBayar = dataItem.sisautang;
                $scope.verifkasiRekanan.open().center();

            }

            $scope.verifikasiTagihan = function () {
                if (!$scope.verif.sumberDana) {
                    toastr.warning("Harap isi Sumber Dana");
                    return;
                };
                if (!$scope.verif.anggaran) {
                    toastr.warning("Harap isi Anggaran");
                    return;
                }

                if (!$scope.verif.totalBayar) {
                    toastr.warning("Harap isi Total yang akan dibayarkan");
                    return;
                };
                let dataSave = {
                    norec: $scope.dataSelected.norec,
                    tglVerifikasi: dateHelper.formatDate($scope.item.tanggalVerifikasi, "YYYY-MM-DD"),
                    pegawaifk: $scope.dataPegawaiLogin.id,
                    kodeAnggaran: $scope.verif.anggaran.kode_anggaran,
                    noverifikasifk: $scope.dataSelected.noverifikasifk ? $scope.dataSelected.noverifikasifk : ""
                };
                // console.log(dataSave);
                $scope.verifkasiRekanan.close();


                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Verifikasi Tagihan Rekanan (' + $scope.dataSelected.namarekanan + ')')
                    .ok('Ya')
                    .cancel('Batal');

                $mdDialog.show(confirm).then(() => {
                    // yes
                    ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/save-verifikasi-tagihan-suplier').then(res => {
                        $scope.verifkasiRekanan.close();
                        $scope.loadData();
                    });
                }, () => {
                    // no
                    $scope.closePopUpVerifikasi();
                    $scope.verifkasiRekanan.open().center();
                });

            };

            $scope.closePopUpVerifikasi = function () {
                $scope.clearVerifikasi();
                $scope.isPagu = false;
                $scope.verifkasiRekanan.close();
            }

            $scope.getTerbilang = function (data, model) {
                modelItemAkuntansi.getDataGlobal('valet/terbilang/' + data).then(res => {
                    $scope.verif[`${model}`] = res.terbilang;
                });
            }
        }
    ]);
});