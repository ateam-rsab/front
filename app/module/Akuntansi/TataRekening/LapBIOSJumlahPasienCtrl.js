define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LapBIOSJumlahPasienCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.dataVOloaded = true;
            $scope.item = {};

            var initIndikator = function () {
                $scope.gridIndikator = {
                    toolbar: ["excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Hasil Hitung Data Jumlah Pasien - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:C1"];
                        sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY');
                        var myHeaders = [{
                            value: "Hasil Hitung Data Jumlah Pasien Periode " + dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                            fontSize: 14,
                            textAlign: "center",
                            background: "#ffffff",
                        }];
                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    },
                    pageable: true,
                    columns: [
                        {
                            "field": "kodeBIOS",
                            "title": "Kode BIOS", "width": "150px"
                        },
                        {
                            "field": "indikator",
                            "title": "Indikator", "width": "150px"

                        },
                        {
                            "field": "jumlah",
                            "title": "Jumlah Pasien/Orang", "width": "150px",
                            "template": "<p style='text-align:right'>{{ '#: jumlah #' }}</p>"
                        }
                    ]
                };
            };

            $scope.loadDataGridIndikator = function () {
                $scope.isRouteLoading = true;

                ReportService.getListData("reporting/bios-data-jumlah-pasien?tglAwal=" + dateHelper.formatDate($scope.item.tglAwal, 'YYYY-MM-DD HH:mm:ss') + "&tglAkhir=" + dateHelper.formatDate($scope.item.tglAkhir, 'YYYY-MM-DD HH:mm:ss')).then(function (data) {
                    $scope.dataSourceIndikator = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "kodeBIOS", dir: "asc" }
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
                var objSave = [];
                var dataSource = $scope.dataSourceIndikator.options.data;
                for (let i = 0; i < dataSource.length; i++) {
                    var objModel = {
                        "indikatorBIOSVO" : {
                            "id" : dataSource[i].idMasterBIOS
                        },
                        "bulan" : dateHelper.toMonthNum(new Date().getMonth()),
                        "tahun" : new Date().getFullYear(),
                        "jumlah" : dataSource[i].jumlah
                    }
                    if (dataSource[i].idMasterBIOS !== "-") {
                        objSave.push(objModel);
                    }
                }
                ManageSdmNew.saveData(objSave,"pelayanan/save-transaksi-indikator-bios").then(function (e) {
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});
