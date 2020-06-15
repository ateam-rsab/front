define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SimulasiRemunerasiCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageLogistikPhp', 'DateHelper',
        function (socket, ManageManegement, $rootScope, $scope, ModelItem, $state, manageLogistikPhp, DateHelper) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.item.periodeAwal = new Date();
            $scope.item.periodeAkhir = new Date();
            $scope.totalKur = 'Rp 0,00';
            $scope.mainGridOptions = {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel(false)" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }

                ],
                scrollable: true,
                columns: [{
                        "field": "no",
                        "title": "No",
                        "title": "<h3>No</h3>",
                        "width": "10px",
                    },
                    {
                        "field": "namaPegawai",
                        "title": "<h3>Nama Pegawai</h3>",
                        "width": "200px",
                        "footerTemplate": "Total",
                        "footerAttributes": {
                            "class": "table-footer-cell",
                            "style": "text-align: right;"
                        }
                    },
                    {
                        "field": "remunKurs",
                        "title": "<h3>Remunerasi Dibayarkan</h3>",
                        "width": "200px",
                        "template": "<p style='text-align:right'>{{ '#: remunKurs #' }}</p>",
                        "footerTemplate": "<span>{{totalKur}}</span>",
                        "footerAttributes": {
                            "class": "table-footer-cell",
                            "style": "text-align: right;"
                        }
                    }
                ]
            };

            $scope.exportExcel = () => {
                var tempDataExport = [];
                var rows = [{
                    cells: [
                        {
                            value:"No."
                        },
                        {
                            value: "Nama Rekanan"
                        },
                        {
                            value: "Remunerasi Dibayarkan"
                        },
                    ]
                }];

                tempDataExport = $scope.dataSource;
                tempDataExport.fetch(() => {
                    var data = tempDataExport._data;
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                    value: data[i].no
                                },
                                {
                                    value: data[i].namaPegawai
                                },
                                {
                                    value: data[i].remunValue
                                }
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
                                }
                            ],
                            // Title of the sheet
                            title: "Simulasi Remunerasi",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "simulasi-remunerasi-prinsip-FFS-periode" + DateHelper.formatDate($scope.item.periodeAwal, 'DD-MM-YYYY') + "s/d" +  DateHelper.formatDate($scope.item.periodeAwal, 'DD-MM-YYYY') + ".xlsx"
                    });
                });
            };

            $scope.getData = function () {
                $scope.totalKur = 'Rp 0,00';
                let tempTotalKurs = 0;
                $scope.isRouteLoading = true;
                console.log(DateHelper.formatDate($scope.item.periodeAwal, 'YYYY-MM-DD HH:mm:ss'));

                ManageManegement.getSDMServiceReporting(`reporting/hitung-remun-dengan-ffs?tglAwal=${DateHelper.formatDate($scope.item.periodeAwal ? $scope.item.periodeAwal : new Date(), 'YYYY-MM-DD HH:mm:ss')}&tglAkhir=${DateHelper.formatDate($scope.item.periodeAkhir ? $scope.item.periodeAkhir : new Date(), 'YYYY-MM-DD HH:mm:ss')}`).then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        res.data.data[i].no = i + 1;
                        tempTotalKurs += parseInt(res.data.data[i].remunValue);
                    }
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    });
                    $scope.totalKur = tempTotalKurs.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                    });
                    $scope.isRouteLoading = false;
                })
            }

            $scope.getData();
        }
    ]);
});