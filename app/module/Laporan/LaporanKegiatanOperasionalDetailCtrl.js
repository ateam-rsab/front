define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanKegiatanOperasionalDetailCtrl', ['CacheHelper', '$q', '$scope', 'ManagePhp', 'DateHelper', '$state', 'ReportHelper',
        function (cacheHelper, $q, $scope, ManagePhp, DateHelper, $state, reportHelper) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.bulan = $scope.now;
            $scope.monthOnly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy",
            }
            $scope.yearOnly = {
                start: "decade",
                depth: "decade"
            }
            ManagePhp.getMaster("master-laporan/get-list-combo", true).then(function (dat) {
                $scope.listJenis = dat.data.jenisruangan
            });
            $scope.search = function () {
                loadData()
            }

            function loadData() {

                $scope.isRouteLoading = true;
                var bulan = moment($scope.item.bulan).format('YYYY-MM');
                var jenisId = ""
                if ($scope.item.jenis != undefined)
                    jenisId = "&jenisRuanganId=" + $scope.item.jenis.id
                ManagePhp.getMaster("master-laporan/get-laporankegiatanoperasional-detail?"
                    + "monthYear=" + bulan
                    + jenisId
                ).then(function (data) {
                    var result = data.data
                    if (result.length > 0) {
                        $scope.totalPersenVol = 0
                        $scope.totalPersenRup = 0
                        for (let i = 0; i < result.length; i++) {
                            result[i].no = i + 1;

                            // result[i].persenVol = ((result[i].jmlVol / result[i].targetvolume) * 100).toFixed(2)
                            // result[i].persenRup = ((result[i].jmlRup / result[i].targetrupiah) * 100).toFixed(2)
                            // $scope.totalPersenVol = parseFloat(result[i].persenVol) + $scope.totalPersenVol
                            // $scope.totalPersenRup = parseFloat(result[i].persenRup) + $scope.totalPersenRup
                        }
                        // $scope.totalPersenVol = $scope.lPersenRup / result.length
                    }
                    $scope.isRouteLoading = false;
                    $scope.sourceLaporan =
                        {
                            data: result,
                            // $scope.totalPersenRup = $scope.tota
                            group: $scope.group,
                            pageSize: 10,
                            total: result.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            },
                            group: [
                                {
                                    field: "jenis", aggregates: [
                                        { field: 'volume', aggregate: 'sum' },
                                        { field: 'rupiah', aggregate: 'sum' },
                                        { field: 'targetvolume', aggregate: 'sum' },
                                        { field: 'targetrupiah', aggregate: 'sum' },
                                    ]
                                },
                            ],
                            aggregate: [
                                { field: 'volume', aggregate: 'sum' },
                                { field: 'rupiah', aggregate: 'sum' },
                                { field: 'targetvolume', aggregate: 'sum' },
                                { field: 'targetrupiah', aggregate: 'sum' },
                            ],

                        }
                })
            }

            $scope.pdfExport = function () {
                let kdProfile = 1
                let bulan = moment($scope.item.bulan).format('YYYY-MM');
                let url = 'export/laporankegiatanoperasional/' +
                    kdProfile + '/report/pdf/LaporanKegiatanOperasional?monthYear=' + bulan;
                let urlLaporan = reportHelper.openUrlPhp(url)
                window.open(urlLaporan, '_blank', 'width=' + screen.availWidth + ', height=' + screen.availHeight)

            }
            var onDataBound = function (e) {
                $('td').each(function () {
                    if ($(this).text() == '-') { $(this).addClass('center') }
                    if ($(this).text() == 'Selesai') { $(this).addClass('green') }

                })
            }
            $scope.group = {
                field: "jenis",
            };
            $scope.optionsGrid = {
                // dataBound: onDataBound,
                toolbar: [
                    "excel",
                    {
                        template: '<button ng-click="pdfExport()" class="k-button k-button-icontext k-grid-upload" > <span class="k-icon k-i-pdf"></span>Export to Pdf</button>'
                    },
                ],
                excel: { fileName: "LaporanKegiatanOperasional.xlsx", allPages: true, },

                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 3;
                    sheet.mergedCells = ["A1:H1"];
                    sheet.name = "Laporan";

                    var myHeaders = [

                        {
                            value: "LAPORAN KEGIATAN & OPERASIONAL " + (DateHelper.formatDate($scope.item.bulan, 'MMMM YYYY')).toUpperCase(),
                            fontSize: 15,
                            textAlign: "center",
                            background: "#c1d2d2",
                            // color:"#ffffff"
                        }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 50 });
                },
                sortable: true,
                pageable: true,
                resizeable: true,
                groupable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "NO", width: "20px" },
                    {
                        field: "namaruangan", title: "KEGIATAN", width: "150px",
                        groupFooterTemplate: "Jumlah",
                        footerTemplate: "Total"
                    },
                    {
                        title: "RBA", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "targetvolume", title: "Vol", width: "30px",
                                template: "<span style='text-align: center;'>{{formatRupiah('#: targetvolume #','')}}</span>",
                                aggregates: ["sum"],
                                footerTemplate: "<span>#:data.targetvolume.sum  #</span>",
                                groupFooterTemplate: "<span>#:data.targetvolume.sum  #</span>"
                            },
                            {
                                field: "targetrupiah", title: "Rp", width: "100px",
                                template: "<span style='text-align: center;'>{{formatRupiah('#: targetrupiah #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span >Rp. {{formatRupiah('#:data.targetrupiah.sum  #', '')}}</span>",
                                groupFooterTemplate: "<span>#:data.targetrupiah.sum  #</span>"
                            },
                        ]
                    },
                    { field: "", title: "TARIF", width: "30px", },
                    {
                        title: "REALISASI", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "volume", title: "Vol", width: "30px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: volume #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span>#:data.volume.sum  #</span>",
                                groupFooterTemplate: "<span>#:data.volume.sum  #</span>"
                            },
                            {
                                field: "rupiah", title: "Rp", width: "100px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: rupiah #','')}}</span>",
                                aggregates: ["sum"], footerTemplate: "<span >Rp. {{formatRupiah('#:data.rupiah.sum  #', '')}}</span>",
                                groupFooterTemplate: "<span>#:data.rupiah.sum  #</span>"
                            },
                        ]
                    },
                    {
                        title: "CAPAIAN %", headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                field: "persentasevolume", title: "Vol", width: "30px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: persentasevolume #','')}}%</span>",

                                // footerTemplate: "<span >{{formatRupiah(totalPersenVol,'')}}%</span>"
                            },
                            {
                                field: "persentaserp", title: "Rp", width: "30px",
                                template: "<span style='text-align: right;'>{{formatRupiah('#: persentaserp #','')}}%</span>",
                                // footerTemplate: "<span >{{formatRupiah(totalPersenRup,'')}}%</span>"
                            },
                        ]
                    },

                ]

            }
            $scope.Perbaharui = function () {
                $scope.clears();
            }
            $scope.formatRupiah = function (value, currency) {
                if (value == null || value == "null")
                    value = 0
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.clears = function () {
                delete $scope.item.bulan
            }
        }
    ]);
});