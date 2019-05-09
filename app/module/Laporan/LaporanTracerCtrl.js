define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanTracerCtrl', ['$q', '$scope', 'CacheHelper', 'DateHelper', 'ManagePhp', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $scope, cacheHelper, dateHelper, ManagePhp, modelItemAkuntansi, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.isRouteLoading = false;
            $scope.dataPasienSelected = {};
            $scope.item.jmlRows = 100
            loadCombo();

            function loadCombo() {
                var chacePeriode = cacheHelper.get('cacheLaporanTracer');
                if (chacePeriode != undefined) {
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]);
                } else {
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                }
                ManagePhp.getData("dokumenrm/get-data-combo-kdrm", false).then(function (data) {
                    $scope.listStatus = data.data.dataStatusKendali;
                });
                ManagePhp.getData("operator/get-data-combo-operator", false).then(function (data) {
                    $scope.listRuangan = data.data.ruanganall;


                });

                $scope.ListKondisi = [
                    {
                        id: 1,
                        kondisi: "Jam Kerja"
                    }, {
                        id: 2,
                        kondisi: "Luar Jam Kerja"
                    }
                ]

            }
            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.instalasi.ruangan
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }


            $scope.columnGrid = {
                toolbar: [
                    "excel",
                    "pdf",
                ],
                excel: {
                    fileName: "LaporanPenyediaanRM " + moment($scope.item.periodeAwal).format('DD-MM-YYYY') + " sampai "
                        + moment($scope.item.periodeAkhir).format('DD-MM-YYYY') + ".xlsx",
                    allPages: true,
                },
                pdf: {

                    fileName: "LaporanPenyediaanRM " + moment($scope.item.periodeAwal).format('DD-MM-YYYY') + " sampai "
                        + moment($scope.item.periodeAkhir).format('DD-MM-YYYY') + ".pdf",
                    allPages: true,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.8
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:F1"];
                    sheet.name = "KSM";

                    var myHeaders = [{
                        value: "Laporan Penyediaan Rekam Medis",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#c1d2d2",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                selectable: 'row',
                sortable: false,
                reorderable: true,
                filterable: false,
                pageable: true,
                columnMenu: false,
                resizable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width": "20px",
                    },
                    {
                        "field": "nocm",
                        "title": "No RM",
                        "width": "50px",
                        "template": "<span class='style-left'>#: nocm #</span>"
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "100px",
                        "template": "<span class='style-left'>#: namapasien #</span>"
                    },
                    {
                        "field": "unitasal",
                        "title": "Unit Asal",
                        "width": "80px",
                        "template": "#if (unitasal) {# #= unitasal # #} else {# - #} #",
                    },
                    {
                        "field": "unittujuan",
                        "title": "Unit Tujuan",
                        "width": "90px",
                        "template": "#if (unitasal) {# #= unittujuan # #} else {# - #} #",
                    },
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "width": "90px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                    },
                    {
                        "field": "tglkeluar",
                        "title": "Tgl Keluar",
                        "width": "90px",
                        "template": "#if (tglkeluar) {# #= new moment(tglkeluar).format(\'DD-MMM-YYYY HH:mm\')# #} else {# - #} #",
                        // "template": "<span class='style-left'>{{formatTanggal('#: tglkeluar #')}}</span>"
                    },
                    {
                        "field": "selisih",
                        "title": "Seiisih Waktu Kendali",
                        "width": "90px",
                        "template": "<span class='style-left'>#: selisih #</span>"
                    },


                ],
                sortable: {
                    mode: "single",
                    allowUnsort: false,
                }
                ,
                pageable: {
                    messages: {
                        display: "Menampilkan {0} - {1} data dari {2} data"
                    },
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
            };


            $scope.SearchData = function () {
                loadData()
            }

            function loadData() {


                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var ins = ""
                if ($scope.item.instalasi != undefined) {
                    ins = "&deptId=" + $scope.item.instalasi.id
                }
                var rg = ""
                if ($scope.item.ruangan != undefined) {
                    rg = "&ruangId=" + $scope.item.ruangan.id
                }

                var layanan = ""
                if ($scope.item.layanan != undefined) {
                    layanan = "&namaProduk=" + $scope.item.layanan
                }
                var kondisi = ""
                if ($scope.item.kondisi != undefined) {
                    kondisi = "&kondisi=" + $scope.item.kondisi.id
                }
                var unit = ""
                if ($scope.item.unit != undefined) {
                    unit = "&unit=" + $scope.item.unit.id
                }
                var status = ""
                if ($scope.item.status != undefined) {
                    status = "&status=" + $scope.item.status.id
                }
                var nocm = ""
                if ($scope.item.noCm != undefined) {
                    nocm = "&nocm=" + $scope.item.noCm
                }
                var jmlRows = ""
                if ($scope.item.jmlRows != undefined) {
                    jmlRows = "&jmlRows=" + $scope.item.jmlRows
                }
                var namaPasien = ""
                if ($scope.item.namaPasien != undefined) {
                    namaPasien = "&namaPasien=" + $scope.item.namaPasien
                }
                $scope.isRouteLoading = true;
                ManagePhp.getData("dokumenrm/get-laporan-tracer?" +
                    "tglAwal=" + tglAwal +
                    "&tglAkhir=" + tglAkhir +
                    layanan + ins + rg + kondisi +
                    unit + status + nocm + namaPasien

                )
                    .then(function (e) {
                        var result = e.data.data
                        $scope.isRouteLoading = false;
                        for (var i = 0; i < result.length; i++) {
                            result[i].no = i + 1
                        }
                        $scope.dataSourceGrid = {
                            data: result,
                            schema: {
                                model: {
                                    fields: {
                                        nocm: { type: "string" },
                                        unitasal: { type: "string" },
                                        tglregistrasi: { type: "string" },
                                        tglkeluar: { type: "string" },
                                        selisij: { type: "string" },
                                        // totalPenerimaan:{type:"number"},
                                    }
                                }
                            },
                            selectable: true,
                            refresh: true,
                            pageSize: 10,
                            selectable: true,
                            refresh: true,
                            total: result.length,
                            serverPaging: false,
                            groupable: true,
                            allowCopy: true,
                            // group:[
                            //     {
                            //         field:"kelompokpasien", aggregates:[
                            //             {field:'subtotal', aggregate:'sum'},
                            //             {field:"jumlah", aggregate:'sum'},
                            //             {field:'harga', aggregate:'sum'},
                            //         ]                            
                            //     },                        
                            // ],
                            // aggregate:[
                            //     {field:'harga', aggregate:'sum'},
                            //     {field:'subtotal', aggregate:'sum'},
                            //     {field:'jumlah',  aggregate:'sum'},
                            // ]
                        };
                        var chacePeriode = tglAwal + "~" + tglAkhir;
                        cacheHelper.set('cacheLaporanTracer', chacePeriode);
                    });

            };

            $scope.klikGrid = function (dataSelected) {
                if (dataSelected != undefined) {
                }
            }
            $scope.Clear = function () {
                delete $scope.item.unit
                delete $scope.item.noCm
                delete $scope.item.namaPasien
                // $scope.item.periodeAwal = new Date();
                // $scope.item.periodeAkhir = new Date();
                // loadData()
            }

        }
    ]);
});