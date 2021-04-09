define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardCalculateIndikatorPelayananCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageLogistikPhp',
        function (socket, ManageManegement, $rootScope, $scope, ModelItem, $state, manageLogistikPhp) {
            $scope.isRouteLoading = false;
            $scope.selectedYear = {
                tahun: new Date().getFullYear(),
                id: new Date().getFullYear() - 2020
            }
            $scope.mainGridOptions = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                scrollable: true,
                columns: [{
                        "field": "no",
                        "title": "No",
                        "title": "<h3>No</h3>",
                        "width": "20px",
                    },
                    {
                        "field": "bulan",
                        "title": "<h3>Bulan</h3>",
                        "width": "40px",
                    },
                    {
                        "field": "totalBed",
                        "title": "<h3>Tempat<br/>Tidur</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalBed #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "totalBedPeriod",
                        "title": "<h3>Tempat<br/>Tidur<br/>x Hari</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalBedPeriod #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "totalLos",
                        "title": "<h3>LOS</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalLos #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "totalLosPulang",
                        "title": "<h3>LOS<br/>Pasien<br/>Pulang</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalLosPulang #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "totalPasPulang",
                        "title": "<h3>Pasien<br/>Pulang</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalPasPulang #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "totalPasienMeninggal",
                        "title": "<h3>Pasien<br/>Meninggal</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalPasienMeninggal #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "totalPasienMeninggal48Jam",
                        "title": "<h3>Pasien<br/>Meninggal<br/>Lebih<br/>2 Hari</h3>",
                        "template": "<p style='text-align:right'>{{ '#: totalPasienMeninggal48Jam #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "bor",
                        "title": "<h3>BOR(%)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: bor #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "alos",
                        "title": "<h3>ALOS(hari)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: alos #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "bto",
                        "title": "<h3>BTO</h3>",
                        "template": "<p style='text-align:right'>{{ '#: bto #' }}</p>",
                        "width": "40px",
                        "aggregates": ["sum"],
                        "footerTemplate": "Total: <span>{{totalBTO}}</span>",
                        "footerAttributes": {
                            "class": "table-footer-cell",
                            "style": "text-align: right;"
                        }
                    },
                    {
                        "field": "toi",
                        "title": "<h3>TOI(hari)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: toi #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "gdr",
                        "title": "<h3>GDR(‰)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: gdr #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "ndr",
                        "title": "<h3>NDR(‰)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: ndr #' }}</p>",
                        "width": "40px",
                    }
                ]
            }

            $scope.exportExcel = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                        value: "No"
                    }, {
                        value: "Bulan"
                    }, {
                        value: "Tempat Tidur"
                    }, {
                        value: "Tempat Tidur x Hari"
                    }, {
                        value: "LOS"
                    }, {
                        value: "LOS Pasien Pulang"
                    }, {
                        value: "Pasien Pulang"
                    }, {
                        value: "Pasien Meninggal"
                    }, {
                        value: "Pasien Meninggal > 2 Hari"
                    }, {
                        value: "BOR(%)"
                    }, {
                        value: "ALOS(hari)"
                    }, {
                        value: "BTO"
                    }, {
                        value: "TOI(hari)"
                    }, {
                        value: "GDR(‰)"
                    }, {
                        value: "NDR(‰)"
                    }]
                }];

                tempDataExport = $scope.dataSource;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                value: data[i].no
                            }, {
                                value: data[i].bulan
                            }, {
                                value: data[i].totalBed
                            }, {
                                value: data[i].totalBedPeriod
                            }, {
                                value: data[i].totalLos
                            }, {
                                value: data[i].totalLosPulang
                            }, {
                                value: data[i].totalPasPulang
                            }, {
                                value: data[i].totalPasienMeninggal
                            }, {
                                value: data[i].totalPasienMeninggal48Jam
                            }, {
                                value: data[i].bor
                            }, {
                                value: data[i].alos
                            }, {
                                value: data[i].bto
                            }, {
                                value: data[i].toi
                            }, {
                                value: data[i].gdr
                            }, {
                                value: data[i].ndr
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
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }, {
                                autoWidth: true
                            }],
                            // Title of the sheet
                            title: "Perhitungan Indikator Pelayanan",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "perhitungan-indikator-pelayanan.xlsx"
                    });
                });
            };

            $scope.getData = () => {
                $scope.totalBTO = 0;
                $scope.isRouteLoading = true;
                ManageManegement.getSDMService('pelayanan/calculate-indikator-pelayanan?tahun=' + ($scope.selectedYear ? $scope.selectedYear.tahun : new Date().getFullYear())).then((e) => {
                    $scope.isRouteLoading = false;

                    for (let i = 0; i < e.data.data.length; i++) {
                        e.data.data[i].no = i + 1;
                        $scope.totalBTO += parseFloat(e.data.data[i].bto)
                    }

                    $scope.totalBTO = parseFloat($scope.totalBTO).toFixed(2);
                    $scope.dataSource = new kendo.data.DataSource({
                        data: e.data.data,
                        pageSize: 12,
                        aggregates: [{
                            field: 'bto',
                            aggregate: 'sum'
                        }]
                    })
                })
            }

            $scope.getListYear = () => {
                let currentYear = new Date().getFullYear();
                $scope.listOfYear = [];
                let startYear = 2020;
                let j = 0
                for (let i = startYear; i <= currentYear; i++) {
                    $scope.listOfYear.push({
                        tahun: startYear++,
                        id: j + 1
                    })
                }

                console.log($scope.listOfYear);
            }
            $scope.getListYear();

            $scope.init = () => {
                $scope.getData();
            }
            $scope.init();

        }
    ]);
});