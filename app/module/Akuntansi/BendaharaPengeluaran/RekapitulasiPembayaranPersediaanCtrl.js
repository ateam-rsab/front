define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiPembayaranPersediaanCtrl', ['CacheHelper', '$timeout', '$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'DateHelper', 'ManageSarpras', 'ModelItemAkuntansi', '$mdDialog',
        function (cacheHelper, $timeout, $q, $rootScope, $scope, ManageAkuntansi, $state, dateHelper, ManageSarpras, modelItemAkuntansi, $mdDialog) {

            //catatan : PENTING
            //cek tabel maploginusertoruangan_s
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            $scope.listAnggaran = [];
            $scope.listSumberDana = [];

            $scope.isPagu = false;
            $scope.isKasubag = false;

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.verif = {};
            $scope.confirm = {};
            $scope.dataSelected = {};
            $scope.item.tanggalVerifikasi = new Date();
            //$scope.dataSelectedPiutang = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;

            $scope.showInputNoSpk = false;
            $scope.showInputNoFaktur = false;
            $scope.showInputBa = false;
            $scope.showInputSppb = false;

            // $scope.listStatus = [{
            //   "id": 0,
            //   "namaStatus": "Verifikasi"
            // }, {
            //   "id": 1,
            //   "namaStatus": "Belum Verifikasi"
            // }]

            // $scope.item.status = {
            //   id: 1,
            //   namaStatus: "Belum Verifikasi"
            // }

            //ON LOAD with Params
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;

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

            $scope.loadData = function () {
                let dataTempVerified = [],
                    dataTempUnverified = [];
                $scope.isRouteLoading = true;
                // YYYY-MM-DD
                // filtering status
                // + ($scope.item.status.namaStatus ? $scope.item.status.namaStatus : "")
                ManageAkuntansi.getDataTableTransaksi("bendahara-pengeluaran/get-data-tagihan-suplier-rev-1?tglAwal=" + dateHelper.formatDate($scope.item.tanggalAwal, 'YYYY-MM-DD') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tanggalAkhir, 'YYYY-MM-DD') + "&Supplier=" + ($scope.item.namaSupplier ? $scope.item.namaSupplier : "") + "&status=").then((res) => {
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

                        res.data.daftar[i].selisihBayarFormatted = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(res.data.daftar[i].selisihbayar);
                    }

                    $scope.dataGrid = new kendo.data.DataSource({
                        data: res.data.daftar,
                        pageSize: 5
                    });
                    // for (let i = 0; i < res.data.daftar.length; i++) {

                    //     if (res.data.daftar[i].status === "BLM VERIFIKASI") dataTempUnverified.push(res.data.daftar[i])
                    //     else dataTempVerified.push(res.data.daftar[i])
                    // }

                    // $scope.dataGridVerified = new kendo.data.DataSource({
                    //     data: dataTempVerified,
                    //     pageSize: 5
                    // });

                    // $scope.dataGridUnverified = new kendo.data.DataSource({
                    //     data: dataTempUnverified,
                    //     pageSize: 5
                    // })
                    $scope.isRouteLoading = false;
                }, err => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.loadData();

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
            }
            $scope.formatTgl = function (value) {
                return dateHelper.formatDate(value, "YYYY-MM-DD");
            }

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

            $scope.columnGrid = [{
                    "field": "namarekanan",
                    "title": "<h3>Nama Rekanan</h3>",
                    "width": "200px"
                },
                {
                    "field": "noverifikasi",
                    "title": "<h3>No. Voucher</h3>",
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
                    "field": "nostruk",
                    "title": "<h3>No. PB</h3>",
                    "template": "<span class='style-center'>{{'#: nostruk ? nostruk : '-' #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "tgldokumen",
                    "title": "<h3>Tanggal<br> Dokumen</h3>",
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
                // {
                //   "field": "sisautangFormatted",
                //   "title": "<h3>Sisa Hutang</h3>",
                //   "template": "<span class='style-center'>{{'#: sisautangFormatted #'}}</span>",
                //   "width": "150px"
                // },
                // {
                //   "field": "statusbayar",
                //   "title": "<h3>Status Bayar</h3>",
                //   "template": "<span class='style-center'>{{'#: statusbayar #'}}</span>",
                //   "width": "150px"
                // },
                {
                    "field": "status",
                    "title": "<h3>Status</h3>",
                    "template": "<span class='style-center'>{{'#: status #'}}</span>",
                    "width": "150px"
                },
                {
                    "field": "selisihBayarFormatted",
                    "title": "<h3>Selisih Bayar</h3>",
                    "template": "<span class='style-center'>{{'#: selisihBayarFormatted #'}}</span>",
                    "width": "150px"
                },
                {
                    command: [{
                        text: "Detail Tagihan",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        click: detailTagihan,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: "150px",
                    attributes: {
                        style: "text-align:center;valign=middle"
                    },
                }
            ];

            function confirmBatalVerif(e) {
                e.preventDefault();
                let tr = $(e.target).closest("tr");
                let dataItem = this.dataItem(tr);

                if (dataItem.confirmfk || dataItem.confirm1fk) {
                    toastr.info("Data sudah di verifikasi", "Tidak Bisa Membatalkan")
                    return;
                }

                var confirm = $mdDialog.confirm()
                    .title(`Apakah Anda yakin akan membatalkan Verifikasi Tagihan`)
                    .textContent(`Anda akan membatalkan Verifikasi Tagihan dengan No. Voucher ${dataItem.noverifikasi} dengan No. SPK ${dataItem.noSPK}`)
                    .ok('Ya')
                    .cancel('Tidak');

                $mdDialog.show(confirm).then(function () {
                    batalVerif(dataItem);
                }, function () {});
            }

            let batalVerif = (data) => {
                console.log(data);
                let dataSave = {
                    noverifikasi: data.noverifikasi,
                    norec: data.norec
                }
                console.log(dataSave);
                ManageAkuntansi.postpost(dataSave, 'bendahara-pengeluaran/batal-verifikasi-tagihan-rekanan').then((data) => {
                    $scope.loadData();
                })
            }

            $scope.getTerbilang = function (data, model) {
                modelItemAkuntansi.getDataGlobal('valet/terbilang/' + data).then(res => {
                    $scope.verif[`${model}`] = res.terbilang;
                });
            }

            $scope.clearVerifikasi = function () {
                $scope.dataSelected = {};
                $scope.verif = {};
            }

            $scope.gridOpt = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
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

            $scope.gridOptPenggunaanAnggaran = {
                pageable: true,
                scrollable: true,
                columns: $scope.columnGridAnggaran
            }

            $scope.exportExcel = (isVerified) => {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                            value: "Nama Rekanan"
                        },
                        {
                            value: "No. Voucher"
                        },
                        {
                            value: "Tanggal SPK"
                        },
                        {
                            value: "No. SPK"
                        },
                        {
                            value: "No. PB"
                        },
                        // {
                        //     value: "Tanggal Struk"
                        // },
                        {
                            value: "Tanggal Dokumen"
                        },
                        {
                            value: "No. Dokumen"
                        },
                        {
                            value: "Total"
                        },
                        {
                            value: "PPN"
                        },
                        {
                            value: "Diskon"
                        },
                        {
                            value: "Sub Total"
                        },
                        {
                            value: "Status"
                        }
                    ]
                }];

                tempDataExport = $scope.dataGrid;
                tempDataExport.fetch(() => {
                    var data = tempDataExport._data;
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].namarekanan
                                },
                                {
                                    value: data[i].noverifikasi
                                },
                                {
                                    value: data[i].tglSPK
                                },
                                {
                                    value: data[i].noSPK
                                },
                                {
                                    value: data[i].nostruk
                                },
                                // {
                                //     value: data[i].tglstruk
                                // },
                                {
                                    value: data[i].tgldokumen
                                },
                                {
                                    value: data[i].nodokumen
                                },
                                // {
                                //   value:
                                // },
                                {
                                    value: data[i].total
                                },
                                {
                                    value: data[i].totalppn
                                },
                                {
                                    value: data[i].totaldiskon
                                },
                                {
                                    value: data[i].subtotal
                                },
                                // {
                                //   value: data[i].sisautang
                                // },
                                // {
                                //   value: data[i].statusbayar
                                // },
                                {
                                    value: data[i].status
                                },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [
                                // Column settings (width)
                                {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                },
                            ],
                            // Title of the sheet
                            title: "Rekapitulasi Pembayaran Persediaan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "rekapitulasi-pembayaran-persediaan.xlsx"
                    });
                });
            };

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
        }
    ]);
});