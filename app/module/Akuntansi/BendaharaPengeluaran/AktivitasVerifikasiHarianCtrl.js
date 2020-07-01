define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AktivitasVerifikasiHarianCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
        function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.confirm = {};

            $scope.isKasubag = false;
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            $scope.now = new Date();
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;

            $scope.listJenisPembayaran = [{
                    name: "Verifikasi Tagihan Supplier",
                    id: 1
                },
                {
                    name: "Pembayaran Umum",
                    id: 2
                }
            ]

            $scope.loadAllData = () => {
                $scope.dataTemp = [];

                if (!$scope.item.jenisPembayaran) {
                    $scope.loadDataVerifikasi();
                    $scope.loadDataPembayaranUmum();
                } else if ($scope.item.jenisPembayaran.id === 2) {
                    $scope.loadDataPembayaranUmum();
                } else if ($scope.item.jenisPembayaran.id === 1) {
                    $scope.loadDataVerifikasi();
                }
            }

            $scope.loadDataVerifikasi = () => {
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

                        if (res.data.daftar[i].status === "VERIFIKASI") {
                            $scope.dataTemp.push({
                                confirm1fk: res.data.daftar[i].confirm1fk,
                                confirmfk: res.data.daftar[i].confirmfk,
                                namarekanan: res.data.daftar[i].namarekanan ? res.data.daftar[i].namarekanan : '-',
                                noverifikasi: res.data.daftar[i].noverifikasi ? res.data.daftar[i].noverifikasi : '-',
                                noverifikasifk: res.data.daftar[i].noverifikasifk ? res.data.daftar[i].noverifikasifk : '-',
                                namaAnggaran: res.data.daftar[i].namaAnggaran ? res.data.daftar[i].namaAnggaran : '-',
                                kodeanggaran: res.data.daftar[i].kodeanggaran ? res.data.daftar[i].kodeanggaran : '-',
                                tglSPK: res.data.daftar[i].tglSPK ? res.data.daftar[i].tglSPK : '-',
                                noSPK: res.data.daftar[i].noSPK ? res.data.daftar[i].noSPK : '-',
                                tgldokumen: res.data.daftar[i].tgldokumen ? res.data.daftar[i].tgldokumen : '-',
                                tglVerifikasi: res.data.daftar[i].tglverifikasi ? res.data.daftar[i].tglverifikasi : '-',
                                nodokumen: res.data.daftar[i].nodokumen ? res.data.daftar[i].nodokumen : '-',
                                totalFormatted: res.data.daftar[i].totalFormatted ? res.data.daftar[i].totalFormatted : '-',
                                totalppnFormatted: res.data.daftar[i].totalppnFormatted ? res.data.daftar[i].totalppnFormatted : '-',
                                totaldiskonFormatted: res.data.daftar[i].totaldiskonFormatted ? res.data.daftar[i].totaldiskonFormatted : '-',
                                subtotalFormatted: res.data.daftar[i].subtotalFormatted ? res.data.daftar[i].subtotalFormatted : '-',
                                subtotal: res.data.daftar[i].subtotal ? res.data.daftar[i].subtotal : '-',
                                sisautangFormatted: res.data.daftar[i].sisautangFormatted ? res.data.daftar[i].sisautangFormatted : '-',
                                statusbayar: res.data.daftar[i].statusbayar ? res.data.daftar[i].statusbayar : '-',
                                status: res.data.daftar[i].status ? res.data.daftar[i].status : '-',
                                statusConfirmKabag: res.data.daftar[i].statusConfirmKabag ? res.data.daftar[i].statusConfirmKabag : '-',
                                statusConfirmAnggaran: res.data.daftar[i].statusConfirmAnggaran ? res.data.daftar[i].statusConfirmAnggaran : '-',
                                jenisPembayaran: "Verifikasi Tagihan Rekanan"
                            })
                        }

                    }
                    $scope.dataGridVerified = new kendo.data.DataSource({
                        data: $scope.dataTemp,
                        pageSize: 5
                    });

                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.loadDataPembayaranUmum = function () {
                $scope.isRouteLoading = true;
                ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-verifikasi-pembayaran-umum?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD')).then((res) => {

                    for (let i = 0; i < res.data.daftar.length; i++) {
                        res.data.daftar[i].totalTagihanFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].totaltagihan);
                        res.data.daftar[i].totalBayarFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].totalbayar);
                        res.data.daftar[i].tglTransaksiFormatted = dateHelper.formatDate(res.data.daftar[i].tgltransaksi, 'DD-MM-YYYY');
                        res.data.daftar[i].tglVerifikasiFormatted = dateHelper.formatDate(res.data.daftar[i].tglverifikasi, 'DD-MM-YYYY');

                        if (res.data.daftar[i].status === "VERIFIKASI") {
                            // $scope.dataTemp.push(res.data.daftar[i])

                            $scope.dataTemp.push({
                                confirm1fk: res.data.daftar[i].confirm1fk,
                                confirmfk: res.data.daftar[i].confirmfk,
                                namarekanan: res.data.daftar[i].namarekanan ? res.data.daftar[i].namarekanan : '-',
                                noverifikasi: res.data.daftar[i].noverifikasi ? res.data.daftar[i].noverifikasi : '-',
                                noverifikasifk: res.data.daftar[i].noverifikasifk ? res.data.daftar[i].noverifikasifk : '-',
                                namaAnggaran: res.data.daftar[i].namaAnggaran ? res.data.daftar[i].namaAnggaran : '-',
                                kodeanggaran: res.data.daftar[i].kodeanggaran ? res.data.daftar[i].kodeanggaran : '-',
                                tglSPK: res.data.daftar[i].tglSPK ? res.data.daftar[i].tglSPK : '-',
                                noSPK: res.data.daftar[i].noSPK ? res.data.daftar[i].noSPK : '-',
                                tgldokumen: res.data.daftar[i].tgldokumen ? res.data.daftar[i].tgldokumen : '-',
                                tglVerifikasi: res.data.daftar[i].tglverifikasi ? res.data.daftar[i].tglverifikasi : '-',
                                nodokumen: res.data.daftar[i].nodokumen ? res.data.daftar[i].nodokumen : '-',
                                totalFormatted: res.data.daftar[i].totalFormatted ? res.data.daftar[i].totalFormatted : '-',
                                totalppnFormatted: res.data.daftar[i].totalppnFormatted ? res.data.daftar[i].totalppnFormatted : '-',
                                totaldiskonFormatted: res.data.daftar[i].totaldiskonFormatted ? res.data.daftar[i].totaldiskonFormatted : '-',
                                subtotalFormatted: res.data.daftar[i].totaltagihan ? res.data.daftar[i].totalTagihanFormatted : '-',
                                subtotal: res.data.daftar[i].totaltagihan ? res.data.daftar[i].totaltagihan : '-',
                                sisautangFormatted: res.data.daftar[i].sisautangFormatted ? res.data.daftar[i].sisautangFormatted : '-',
                                statusbayar: res.data.daftar[i].statusbayar ? res.data.daftar[i].statusbayar : '-',
                                status: res.data.daftar[i].status ? res.data.daftar[i].status : '-',
                                statusConfirmKabag: res.data.daftar[i].statusconfirmkabag ? res.data.daftar[i].statusconfirmkabag : '-',
                                statusConfirmAnggaran: res.data.daftar[i].statusconfirmanggaran ? res.data.daftar[i].statusconfirmanggaran : '-',
                                jenisPembayaran: "Pembayaran Umum"
                            })
                        }
                    }

                    $scope.dataGridVerified = new kendo.data.DataSource({
                        data: $scope.dataTemp,
                        pageSize: 5
                    });

                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            };

            let init = () => {
                $scope.loadDataVerifikasi();
                $scope.loadDataPembayaranUmum();
            }

            init();

            $scope.columnGrid = [{
                    "field": "namarekanan",
                    "title": "<h3>Nama Rekanan</h3>",
                    "width": "200px"
                },
                {
                    "field": "tglVerifikasi",
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
                    "field": "namaAnggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "150px"
                },
                {
                    "field": "kodeanggaran",
                    "title": "<h3>Kode Anggaran</h3>",
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
                    "field": "subtotalFormatted",
                    "title": "<h3>Sub Total</h3>",
                    "template": "<span class='style-center'>{{'#: subtotalFormatted #'}}</span>",
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
                    "title": "<h3>Ka. Subag</h3>",
                    // "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "statusConfirmAnggaran",
                    "title": "<h3>Ka. Bag</h3>",
                    // "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "jenisPembayaran",
                    "title": "<h3>Jenis Pembayaran</h3>",
                    // "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "200px"
                },
                {
                    command: [{
                            text: "Konfirmasi Kasubag",
                            // name:"Konfirmasi",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: showWindowKonfirmasi,
                            imageClass: "k-icon k-i-pencil"
                        },
                        {
                            text: "Konfirmasi Kabag",
                            // name:"Konfirmasi",
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

            $scope.closePopUpKonfirmasi = function () {
                $scope.konfirmasiAnggaran.close();
            }

            function detailTagihan(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);
                $scope.dataSelected = dataItem;
                let tglTerima = moment($scope.dataSelected.tglstruk).format('YYYY-MM-DD');
                let tglfaktur = moment($scope.dataSelected.tgldokumen).format('YYYY-MM-DD');
                let tglJatuhTempo = moment($scope.dataSelected.tgljatuhtempo).format('YYYY-MM-DD');

                var tempData = tglTerima + "#" + $scope.dataSelected.namarekanan + "#" + $scope.dataSelected.nodokumen + "#" + tglJatuhTempo + "#" + tglfaktur + "#" + $scope.dataSelected.norec + "#DaftarTagihanSupplier#" + $scope.dataSelected.nostruk;
                cacheHelper.set('DetailTagihanRekanan', tempData);
                $state.go('DetailTagihanRekanan', {
                    noTerima: '0308'
                })
            }

            function showWindowKonfirmasi(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);

                $scope.confirm = dataItem;
                console.log(e);

                $scope.isKasubag = e.data.commandName === "Konfirmasi Kasubag" ? true : false;
                if (!$scope.isKasubag && !$scope.confirm.confirmfk) {
                    toastr.warning('Harap Konfirmasi Ka. Subag Terlebih dahulu')
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

            $scope.gridOpt = {
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

            $scope.exportExcel = (isVerified) => {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                        value: "Nama Rekanan"
                    }, {
                        value: "Tanggal Verifikasi"
                    }, {
                        value: "No. Verifikasi"
                    }, {
                        value: "Nama Anggaran"
                    }, {
                        value: "Kode Anggaran"
                    }, {
                        value: "Tanggal SPK"
                    }, {
                        value: "No. SPK"
                    }, {
                        value: "Sub Total"
                    }, {
                        value: "Status Bayar"
                    }, {
                        value: "Status"
                    }, {
                        value: "Ka. Subag"
                    }, {
                        value: "Ka. Bag"
                    }, {
                        value: "Jenis Pembayaran"
                    }, ]
                }];

                tempDataExport = $scope.dataGridVerified;
                tempDataExport.fetch(() => {
                    var data = tempDataExport._data;
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                value: data[i].namarekanan
                            }, {
                                value: data[i].tglVerifikasi
                            }, {
                                value: data[i].noverifikasi
                            }, {
                                value: data[i].namaAnggaran
                            }, {
                                value: data[i].kodeanggaran
                            }, {
                                value: data[i].tglSPK
                            }, {
                                value: data[i].noSPK
                            }, {
                                value: data[i].subtotal
                            }, {
                                value: data[i].statusbayar
                            }, {
                                value: data[i].status
                            }, {
                                value: data[i].statusConfirmKabag
                            }, {
                                value: data[i].statusConfirmAnggaran
                            }, {
                                value: data[i].jenisPembayaran
                            }]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [{
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Daftar Aktivitasi Verifikasi Harian",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "daftar-aktivitas-verifikasi-harian.xlsx"
                    });
                });
            };

            $scope.konfirmasiData = (state) => {

                $scope.closePopUpKonfirmasi();

                var confirm = $mdDialog.confirm()
                    .title(`Apakah Anda yakin akan mengkonfirmasi Verifikasi Tagihan`)
                    .textContent(`Anda akan konfirmasi Verifikasi Tagihan dengan Supplier ${$scope.confirm.namarekanan} dengan No. SPK ${$scope.confirm.noSPK}`)
                    .ok('Ya')
                    .cancel('Batal');

                $mdDialog.show(confirm).then(function () {
                    // yes
                    if (state) {
                        let data = {
                            noverifikasifk: $scope.confirm.noverifikasifk,
                            confirmfk: $scope.dataPegawaiLogin.id,
                            tglconfirm: dateHelper.formatDate(new Date, 'YYYY-MM-DD')
                        }

                        ManageAkuntansi.postpost(data, 'bendahara-pengeluaran/save-confirm-verifikasi-tagihan-suplier').then(res => {
                            $scope.loadAllData();
                        });

                    } else {

                        let data = {
                            noverifikasifk: $scope.confirm.noverifikasifk,
                            confirmfk: $scope.confirm.confirmfk,
                            confirm1fk: $scope.dataPegawaiLogin.id,
                            tglconfirm: dateHelper.formatDate(new Date, 'YYYY-MM-DD')
                        }

                        ManageAkuntansi.postpost(data, 'bendahara-pengeluaran/save-confirm-anggaran-verifikasi-tagihan-suplier').then(res => {
                            $scope.loadAllData();
                        });

                    }
                }, function () {
                    $scope.konfirmasiAnggaran.open().center();
                    toastr.info('Konfirmasi dibatalkan');
                });
            }
        }
    ]);
});