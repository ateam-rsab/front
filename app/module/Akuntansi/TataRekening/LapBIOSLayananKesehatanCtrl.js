define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LapBIOSLayananKesehatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.dataVOloaded = true;
            $scope.item = {};

            var initIndikator = function () {
                $scope.gridIndikator = {
                    toolbar: ["excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Hasil Hitung Data Layanan Kesehatan - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:C1"];
                        sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY');
                        var myHeaders = [{
                            value: "Hasil Hitung Data Layanan Kesehatan Periode " + dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                            fontSize: 14,
                            textAlign: "center",
                            background: "#ffffff",
                        }];
                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    },
                    pageable: true,
                    columns: [
                        {
                            "field": "kodeKelas",
                            "title": "Kode Kelas", "width": "150px"
                        },
                        {
                            "field": "jmlPasien",
                            "title": "Jumlah Pasien", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: jmlPasien #' }}</p>"

                        },
                        {
                            "field": "jmlHariRawat",
                            "title": "Jumlah Hari Rawat", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: jmlHariRawat #' }}</p>"
                        }
                    ]
                };
            };

            $scope.loadDataGridIndikator = function () {
                $scope.isRouteLoading = true;

                ReportService.getListData("reporting/bios-data-layanan-kesehatan?tglAwal=" + dateHelper.formatDate($scope.item.tglAwal, 'YYYY-MM-DD HH:mm:ss') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tglAkhir, 'YYYY-MM-DD HH:mm:ss')).then(function (data) {
                    $scope.dataSourceIndikator = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "kelas", dir: "asc" }
                        ]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.LoadData = function () {
                $scope.loadDataGridIndikator();
                initIndikator();
            }

            $scope.init = function () {
                $scope.date = new Date();
                var tanggals = dateHelper.getDateTimeFormatted3($scope.date);
                $scope.item.tglAwal = tanggals + " 00:00";
                $scope.item.tglAkhir = tanggals + " 23:59";

                initIndikator();

                $scope.isRouteLoading = false;
            };

            $scope.init();

            $scope.Save = function () {
                // TODO
            }
        }
    ]);
});
