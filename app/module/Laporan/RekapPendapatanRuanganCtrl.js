define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapPendapatanRuanganCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();

            var initLoadData = function () {
                $scope.gridData = {
                    toolbar: ["excel"],
                    excel: {
                        allPages: true,
                        fileName: "RSAB HK Export Rekapitulasi Pendapatan Ruangan (Harian) - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    },
                    excelExport: function (e) {
                        var sheet = e.workbook.sheets[0];
                        sheet.frozenRows = 2;
                        sheet.mergedCells = ["A1:K1"];
                        sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY');
                        var myHeaders = [{
                            value: "Rekapitulasi Pendapatan Ruangan Periode " + dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                            fontSize: 14,
                            textAlign: "center",
                            background: "#ffffff",
                        }];
                        sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    },
                    pageable: false,
                    columns: [
                        {
                            field: "departemen.namaDepartemen",
                            title: "Departemen", width: "200px",
                            hidden: true
                        },
                        {
                            field: "ruangan.namaRuangan",
                            title: "Ruangan", width: "200px",
                            footerTemplate: "Jumlah : ",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "administrasi",
                            title: "Administrasi", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: administrasi #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.administrasi}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "visite",
                            title: "Visite", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: visite #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.visite}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "konsultasi",
                            title: "Konsultasi", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: konsultasi #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.konsultasi}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "akomodasi",
                            title: "Akomodasi", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: akomodasi #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.akomodasi}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "alatCanggih",
                            title: "Alat Canggih", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: alatCanggih #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.alatCanggih}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "tindakan",
                            title: "Tindakan", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: tindakan #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.tindakan}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "obatAlkes",
                            title: "Obat Alkes", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: obatAlkes #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.obatAlkes}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "diskon",
                            title: "Diskon", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: diskon #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.diskon}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "totalDiRuangan",
                            title: "Total", width: "200px",
                            template: "<span class='style-right'>{{formatRupiah('#: totalDiRuangan #', 'Rp.')}}</span>",
                            attributes: {
                                style: "text-align: right;"
                            },
                            aggregates: ["sum"],
                            footerTemplate: "{{item.totalDiRuangan}}",
                            footerAttributes: { style: "text-align : right" }
                        }
                    ]
                };
            };

            $scope.init = function () {
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=Departemen&select=id,namaDepartemen&criteria=statusEnabled&values=true&order=namaDepartemen:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=statusEnabled&values=true&order=namaRuangan:asc", true)
                ]).then(function (res) {
                    $scope.Departemen = res[0].data.data;
                    $scope.Ruangan = res[1].data.data;

                    initLoadData();

                    $scope.isRouteLoading = false;
                });
            };

            $scope.init();

            $scope.loadDataGridRekap = function () {
                $scope.isRouteLoading = true;

                var tglAwal = dateHelper.getDateTimeFormatted3($scope.item.tglAwal) + " 00:00:00";
                var tglAkhir = dateHelper.getDateTimeFormatted3($scope.item.tglAkhir) + " 23:59:59";

                ReportService.getListData("reporting/rekapitulasi-laporan-pendapatan-ruangan?tglAwal=" + dateHelper.formatDate(tglAwal, 'YYYY-MM-DD HH:mm:ss') + "&tglAkhir=" + dateHelper.formatDate(tglAkhir, 'YYYY-MM-DD HH:mm:ss')).then(function (data) {
                    $scope.dataSourceRekap = new kendo.data.DataSource({
                        data: data.data.data,
                        schema: {
                            model: {
                                fields: {
                                    "departemen.namaDepartemen": { type: "string" },
                                    "ruangan.namaRuangan": { type: "string" },
                                    "administrasi": { type: "number" },
                                    "visite": { type: "number" },
                                    "konsultasi": { type: "number" },
                                    "akomodasi": { type: "number" },
                                    "alatcanggih": { type: "number" },
                                    "tindakan": { type: "number" },
                                    "obatalkes": { type: "number" },
                                    "diskon": { type: "number" },
                                    "totalDiRuangan": { type: "number" }
                                }
                            }
                        },
                        // pageSize: data.data.data.length,
                        group: {
                            field: "departemen.namaDepartemen"
                        },
                        sort: [
                            { field: "departemen.namaDepartemen", dir: "asc" },
                            { field: "ruangan.namaRuangan", dir: "asc" }
                        ]
                    });

                    var administrasi = 0;
                    var visite = 0;
                    var konsultasi = 0;
                    var akomodasi = 0;
                    var alatCanggih = 0;
                    var tindakan = 0;
                    var obatAlkes = 0;
                    var diskon = 0;
                    var totalDiRuangan = 0;
                    if (data.data.data.length > 0) {
                        for (var i = 0; i < data.data.data.length; i++) {
                            administrasi = administrasi + data.data.data[i].administrasi;
                            visite = visite + data.data.data[i].visite;
                            konsultasi = konsultasi + data.data.data[i].konsultasi;
                            akomodasi = akomodasi + data.data.data[i].akomodasi;
                            alatCanggih = alatCanggih + data.data.data[i].alatCanggih;
                            tindakan = tindakan + data.data.data[i].tindakan;
                            obatAlkes = obatAlkes + data.data.data[i].obatAlkes;
                            diskon = diskon + data.data.data[i].diskon;
                            totalDiRuangan = totalDiRuangan + data.data.data[i].totalDiRuangan;
                        };
                    }
                    $scope.item.administrasi = $scope.formatRupiah(administrasi, "Rp.");
                    $scope.item.visite = $scope.formatRupiah(visite, "Rp.");
                    $scope.item.konsultasi = $scope.formatRupiah(konsultasi, "Rp.");
                    $scope.item.akomodasi = $scope.formatRupiah(akomodasi, "Rp.");
                    $scope.item.alatCanggih = $scope.formatRupiah(alatCanggih, "Rp.");
                    $scope.item.tindakan = $scope.formatRupiah(tindakan, "Rp.");
                    $scope.item.obatAlkes = $scope.formatRupiah(obatAlkes, "Rp.");
                    $scope.item.diskon = $scope.formatRupiah(diskon, "Rp.");
                    $scope.item.totalDiRuangan = $scope.formatRupiah(totalDiRuangan, "Rp.");

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.LoadData = function () {
                $scope.loadDataGridRekap();
                initLoadData();
            }

            $scope.formatRupiah = function (value, currency) {
                if (value == "undefined" || value == "null") {
                    value = 0;
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
                } else {
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
                }
            };
        }
    ]);
});
