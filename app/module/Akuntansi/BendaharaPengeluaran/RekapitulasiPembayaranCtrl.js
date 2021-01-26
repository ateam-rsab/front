define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiPembayaranCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
        function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.confirm = {};


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
                $scope.isRouteLoading = true;
                $scope.dataTemp = [];
                ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-rekap-pembayaran?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD')).then((res) => {
                    for (let i in res.data.daftar) {
                        res.data.daftar[i].subtotalFormatted = res.data.daftar[i].subtotal;
                        res.data.daftar[i].totalFormatted = res.data.daftar[i].total
                    }
                    $scope.dataGridVerified = new kendo.data.DataSource({
                        data: res.data.daftar,
                        pageSize: 20
                    })


                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            }



            let init = () => {
                $scope.loadAllData();
            }

            init();

            $scope.columnGrid = [{
                    "field": "namarekanan",
                    "title": "<h3>Kepada</h3>",
                    "width": "200px"
                },
                {
                    "field": "tglverifikasi",
                    "title": "<h3>Tanggal Verifikasi</h3>",
                    "width": "150px",
                    "template": "<span class='style-center'>{{'#: tglverifikasi ? tglverifikasi : '-' #'}}</span>",
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. Verifikasi</h3>",
                    "template": "<span class='style-center'>{{'#: noverifikasi #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "tglsbk",
                    "title": "<h3>Tanggal Verifikasi</h3>",
                    "width": "150px",
                    "template": "<span class='style-center'>{{'#: tglsbk ? tglsbk : '-' #'}}</span>",
                },
                {
                    "field": "nosbk",
                    "title": "<h3>No. Verifikasi</h3>",
                    "template": "<span class='style-center'>{{'#: nosbk ? nosbk : '-' #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "namaAnggaran",
                    "title": "<h3>Nama Anggaran</h3>",
                    "width": "150px",
                    "template": "<span class='style-center'>{{'#: namaAnggaran ? namaAnggaran : '-' #'}}</span>",
                },
                {
                    "field": "kodeanggaran",
                    "title": "<h3>Kode Anggaran</h3>",
                    "width": "150px",
                    "template": "<span class='style-center'>{{'#: kodeanggaran ? kodeanggaran : '-' #'}}</span>",
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
                    "field": "faktur",
                    "title": "<h3>No. Faktur</h3>",
                    "width": "170px",
                    "template": "<span class='style-center'>{{'#: faktur ? faktur : '-' #'}}</span>",
                },
                {
                    "field": "totalFormatted",
                    "title": "<h3>Total</h3>",
                    "width": "150px",
                    "template": "<span class='style-center'>{{'#: totalFormatted #'}}</span>",
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
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                pageable: true,
                scrollable: true,
                columns: $scope.columnGrid
            };

            $scope.exportExcel = (isVerified) => {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                        value: "Kepada"
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
                        value: "Total"
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
                    }]
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
                                value: data[i].tglverifikasi
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
                                value: data[i].total
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