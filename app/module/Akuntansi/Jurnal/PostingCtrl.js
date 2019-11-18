define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PostingCtrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi', "$mdDialog",
        function ($q, $rootScope, $scope, manageAkuntansi, $state, cacheHelper, dateHelper, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.item.tglAwal = new Date();
            $scope.item.tglAwalPosting = new Date();
            let tahun = $scope.item.tglAwal.getFullYear();
            let bulan = $scope.item.tglAwal.getMonth();
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.cekPosting = function () {
                manageAkuntansi.getPosting("accounting/list-posted/?bulan=" + bulan + "&tahun=" + tahun).then(res => {
                    console.log(res);
                });
            }

            $scope.posting = function () {
                // 192.168.12.4:6666/accounting/posting-harian/2019-11-01
                let tanggal = dateHelper.formatDate($scope.item.tglAwalPosting, 'YYYY-MM-DD');
                manageAkuntansi.posting("accounting/posting-harian/" + tanggal).then(res => {
                    console.log(res);
                })
                console.log(tanggal);
            }
            


            $scope.cekPosting();

            $scope.columnGridExcel = {

                pageable: true,
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
                columns: [
                    {
                        "field": "id",
                        "title": "<h3>ID</h3>",
                        "width": "100px",
                        "filterable": true
                    },
                    {
                        "field": "userName",
                        "title": "<h3>User Name</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": true
                    },
                    {
                        "field": "lastUpdate",
                        "title": "<h3>Last Update</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },
                    {
                        "field": "tglTrans",
                        "title": "<h3>Tanggal Transaksi</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },
                    {
                        "field": "tglUpdate",
                        "title": "<h3>Tanggal Update</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },
                    {
                        "field": "posted",
                        "title": "<h3>Posted</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },
                    {
                        "field": "closed",
                        "title": "<h3>Closed</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },
                    {
                        "field": "counter",
                        "title": "<h3>Counter</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },
                    {
                        "field": "Keterangan",
                        "title": "<h3>Keterangan</h3>",
                        "width": "100px",
                        "attributes": { style: "text-align:right;valign=middle" },
                        "filterable": false
                    },

                ]
            }           
        }
    ]);
});
