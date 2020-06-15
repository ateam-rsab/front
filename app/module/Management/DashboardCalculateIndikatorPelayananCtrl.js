define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardCalculateIndikatorPelayananCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageLogistikPhp',
        function (socket, ManageManegement, $rootScope, $scope, ModelItem, $state, manageLogistikPhp) {
            $scope.isRouteLoading = false;
            $scope.selectedYear = {
                tahun: new Date().getFullYear(),
                id: 1
            }
            $scope.mainGridOptions = {
                scrollable: true,
                columns: [{
                        "field": "no",
                        "title": "No",
                        "title": "<h3>No</h3>",
                        "width": "10px",
                    },
                    {
                        "field": "bulan",
                        "title": "<h3>Bulan</h3>",
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
                        "field": "toi",
                        "title": "<h3>GDR(‰)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: gdr #' }}</p>",
                        "width": "40px",
                    },
                    {
                        "field": "toi",
                        "title": "<h3>NDR(‰)</h3>",
                        "template": "<p style='text-align:right'>{{ '#: ndr #' }}</p>",
                        "width": "40px",
                    }
                ]
            }

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
                for (let i = startYear; i <= currentYear; i++) {
                    $scope.listOfYear.push({
                        tahun: startYear++,
                        id: i + 1
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