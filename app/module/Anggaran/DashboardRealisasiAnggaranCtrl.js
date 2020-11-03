define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardRealisasiAnggaranCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ManageSdm', 'ManageAkuntansi', 'DateHelper', '$http', '$state', 'ManageServicePhp',
        function (cacheHelper, $q, $rootScope, $scope, manageSdm, manageAkuntansi, dateHelper, $http, $state, manageServicePhp) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.dataGridDetail = new kendo.data.DataSource({
                data: []
            })

            $scope.getDataRealisasiAnggaran = function () {
                $scope.isRouteLoading = true;
                // manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-penggunaan-anggaran?tahun=" + (new Date().getFullYear()) + "&kodeDana=" + ($scope.item.sumberDana ? $scope.item.sumberDana.kodeanggaran : ""), true).then(function (dat) {
                manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-data-monitoring-anggaran").then(function (dat) {
                    // bendahara-pengeluaran/get-data-monitoring-anggaran
                    $scope.isRouteLoading = false;
                    console.log(dat.data.daftar);

                    if (dat.data.daftar)
                        for (var i = 0; i < dat.data.daftar.length; i++) {
                            dat.data.daftar[i].no = i + 1;
                            dat.data.daftar[i].sisaAnggaran = parseFloat(dat.data.daftar[i].anggaran ? dat.data.daftar[i].anggaran : 0) - parseFloat(dat.data.daftar[i].penggunaan ? dat.data.daftar[i].penggunaan : 0);
                            dat.data.daftar[i].anggaranFormatted = new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(dat.data.daftar[i].anggaran);
                            dat.data.daftar[i].penggunaanFormatted = new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(dat.data.daftar[i].penggunaan);
                            dat.data.daftar[i].sisaAnggaranFormatted = new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR'
                            }).format(dat.data.daftar[i].sisaAnggaran);
                            // dat.data.daftar[i].sisaAnggaran
                        };
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 10,
                        total: dat.data.daftar.length,
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
                    "width": "50px",
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
                },
                {
                    "field": "sisaAnggaranFormatted",
                    "title": "<h3>Sisa Anggaran</h3>",
                    "width": "150px",
                },
                
                {
                    command: [{
                        text: "Detail",
                        align: "center",
                        attributes: {
                            align: "center"
                        },
                        click: detailData,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: "100px",
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
                            value: "No."
                        }, {
                            value: "Kode"
                        }, {
                            value: "Nama Anggaran"
                        }, {
                            value: "Kode Dana"
                        }, {
                            value: "Anggaran"
                        }, {
                            value: "Penggunaan"
                        }
                    ]
                }];

                tempDataExport = isVerified ? $scope.dataGridVerified : $scope.dataGridUnverified;
                tempDataExport.fetch(() => {
                    var data = tempDataExport._data;
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].no
                                },
                                {
                                    value: data[i].kode_anggaran
                                },
                                {
                                    value: data[i].nama_anggaran
                                },
                                {
                                    value: data[i].kode_dana
                                },
                                {
                                    value: data[i].anggaranFormatted
                                },
                                {
                                    value: data[i].penggunaanFormatted
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
                            ],
                            // Title of the sheet
                            title: "Data Realisasai Anggaran",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "data-realisasai-anggaran.xlsx"
                    });
                });
            };

            // namarekanan
            $scope.columnGridDetail = [{
                "field": "namarekanan",
                "title": "<h3>Nama<br>Rekanan</h3>",
                "width": "250px",
            }, {
                "field": "penggunaan",
                "title": "<h3>Penggunaan</h3>",
                "width": "130px",
                "template": "<span class='style-right'>{{formatRupiah('#: penggunaan #', '')}}</span>"
            }, {
                "field": "tgldokumen",
                "title": "<h3>Tanggal<br>Dokumen</h3>",
                "width": "120px",
                "template": "<span class='style-center'>{{formatTanggal('#: tgldokumen #', '')}}</span>"
            }, {
                "field": "tgljatuhtempo",
                "title": "<h3>Tanggal<br>Jatuh<br>Tempo</h3>",
                "width": "120px",
                "template": "<span class='style-center'>{{formatTanggal('#: tgljatuhtempo #', '')}}</span>"
            }, {
                "field": "tglorder",
                "title": "<h3>Tanggal<br>Order</h3>",
                "width": "120px",
                "template": "<span class='style-center'>{{formatTanggal('#: tglorder #', '')}}</span>"
            }, {
                "field": "tglstruk",
                "title": "<h3>Tanggal<br>Struk</h3>",
                "width": "120px",
                "template": "<span class='style-center'>{{formatTanggal('#: tglstruk #', '')}}</span>"
            }, {
                "field": "nodokumen",
                "title": "<h3>No. Dokumen</h3>",
                "width": "150px",
            }, {
                "field": "noorder",
                "title": "<h3>No. Order</h3>",
                "width": "150px",
            }, {
                "field": "noorderintern",
                "title": "<h3>No. Order Intern</h3>",
                "width": "150px",
            }, {
                "field": "nopo",
                "title": "<h3>No. PO</h3>",
                "width": "150px",
            }, {
                "field": "nostruk",
                "title": "<h3>No. Struk</h3>",
                "width": "150px",
            }, {
                "field": "noverifikasi",
                "title": "<h3>No. Verifikasi</h3>",
                "width": "150px",
            }]

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function (tanggal) {
                let data = tanggal ? moment(tanggal).format('DD-MMM-YYYY') : "-";
                data = data === "Invalid date" ? "-" : data;
                return data;
            }

            function detailData(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                // for(let i in dataItem.details) dataItem.details[i].no = dataItem.details.length + 1;

                $scope.dataGridDetail = new kendo.data.DataSource({
                    data: dataItem.details,
                    pageSize: 20
                });
                $scope.popupDetail.open().center();
            }
        }
    ]);
});