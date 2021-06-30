define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapPendapatanRuanganCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog', 'CetakHelper', 'ManageLogistikPhp',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog, cetakHelper, ManageLogistikPhp) {
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.tglAwal = new Date();
            $scope.item.tglAkhir = new Date();

            $scope.item.administrasi = 0;
            $scope.item.visite = 0;
            $scope.item.konsultasi = 0;
            $scope.item.akomodasi = 0;
            $scope.item.alatCanggih = 0;
            $scope.item.tindakan = 0;
            $scope.item.obatAlkes = 0;
            $scope.item.diskon = 0;
            $scope.item.totalDiRuangan = 0;

            var initLoadData = function () {
                $scope.gridData = {
                    toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    }],
                    // excel: {
                    //     allPages: true,
                    //     fileName: "RSAB HK Export Rekapitulasi Pendapatan Ruangan (Harian) - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    // },
                    // excelExport: function (e) {
                    //     var sheet = e.workbook.sheets[0];
                    //     sheet.frozenRows = 2;
                    //     sheet.mergedCells = ["A1:K1"];
                    //     sheet.name = dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY');
                    //     var myHeaders = [{
                    //         value: "Rekapitulasi Pendapatan Ruangan Periode " + dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                    //         fontSize: 14,
                    //         textAlign: "center",
                    //         background: "#ffffff",
                    //     }];
                    //     sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    // },
                    pageable: false,
                    columns: [
                        {
                            field: "namadepartemen",
                            title: "Departemen", width: "200px",
                            hidden: true
                        },
                        {
                            field: "namaruangan",
                            title: "Ruangan", width: "200px",
                            footerTemplate: "Jumlah : ",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "administrasiFormatted",
                            title: "Administrasi", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.administrasi}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "visiteFormatted",
                            title: "Visite", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.visite}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "konsultasiFormatted",
                            title: "Konsultasi", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.konsultasi}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "akomodasiFormatted",
                            title: "Akomodasi", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.akomodasi}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "alatcanggihFormatted",
                            title: "Alat Canggih", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.alatcanggih}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "tindakanFormatted",
                            title: "Tindakan", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.tindakan}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                        {
                            field: "obatalkesFormatted",
                            title: "Obat Alkes", width: "200px",
                            attributes: {
                                style: "text-align: right;"
                            },
                            footerTemplate: "{{item.obatalkes}}",
                            footerAttributes: { style: "text-align : right" }
                        },
                    ]
                };
            };

            $scope.exportExcel = function () {
                var tempDataExport = [];
                var rows = [{
                    cells: [{
                        value: "Ruangan"
                    }, {
                        value: "Admintrasi"
                    }, {
                        value: "Visite"
                    }, {
                        value: "Konsultasi"
                    }, {
                        value: "Akomodasi"
                    }, {
                        value: "Alat Canggih"
                    }, {
                        value: "Tindakan"
                    }, {
                        value: "Obat Alkes"
                    }]
                }];

                tempDataExport = $scope.dataSourceRekap;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                value: data[i].namaruangan
                            }, {
                                value: parseInt(data[i].administrasi ? data[i].administrasi : 0)
                            }, {
                                value: parseInt(data[i].visite ? data[i].visite : 0)
                            }, {
                                value: parseInt(data[i].konsultasi ? data[i].konsultasi : 0)
                            }, {
                                value: parseInt(data[i].akomodasi ? data[i].akomodasi : 0)
                            }, {
                                value: parseInt(data[i].alatcanggih ? data[i].alatcanggih : 0)
                            }, {
                                value: parseInt(data[i].tindakan ? data[i].tindakan : 0)
                            }, {
                                value: parseInt(data[i].obatalkes ? data[i].obatalkes : 0)
                            }]
                        })
                    }
                    var myHeaders = [{
                        value: "Rekapitulasi Pendapatan Ruangan Periode " + dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                        fontSize: 14,
                        textAlign: "center",
                        background: "#ffffff",
                    }];
                    rows.splice(0, 0, { cells: myHeaders, type: "header", height: 30 });
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            frozenRows: 2,
                            mergedCells: ["A1:K1"],
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
                            }],
                            name: dateHelper.formatDate($scope.item.tglAwal, 'DD MMM YYYY') + " - " + dateHelper.formatDate($scope.item.tglAkhir, 'DD MMM YYYY'),
                            title: "Rekapitulasi Pendapatan Ruangan",
                            rows: rows
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "RSAB HK Export Rekapitulasi Pendapatan Ruangan - " + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
                    });
                });
            };

            $scope.init = function () {
                // $q.all([
                //     ManageSdm.getOrderList("service/list-generic/?view=Departemen&select=id,namaDepartemen&criteria=statusEnabled&values=true&order=namaDepartemen:asc", true),
                //     ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=statusEnabled&values=true&order=namaRuangan:asc", true)
                // ]).then(function (res) {
                //     $scope.Departemen = res[0].data;
                //     $scope.Ruangan = res[1].data;

                initLoadData();

                $scope.isRouteLoading = false;
                // });
            };

            $scope.init();

            $scope.cetakRekap = () => {
                var tglAwal = dateHelper.getDateTimeFormatted3($scope.item.tglAwal) + " 00:00:00";
                var tglAkhir = dateHelper.getDateTimeFormatted3($scope.item.tglAkhir) + " 23:59:59";
                cetakHelper.openURLReportingNew(`lap-pendapatan-ruangan?tglAwal=${tglAwal}&tglAkhir=${tglAkhir}&departemen=${$scope.item.departemen ? $scope.item.departemen.namaDepartemen : ""}&ruangan=`, '?');
            }


            $scope.loadDataGridRekap = function () {
                $scope.isRouteLoading = true;
                let dataSource = [];
                var tglAwal = dateHelper.getDateTimeFormatted3($scope.item.tglAwal) + " 00:00:00";
                var tglAkhir = dateHelper.getDateTimeFormatted3($scope.item.tglAkhir) + " 23:59:59";
                var administrasi = 0;
                var visite = 0;
                var konsultasi = 0;
                var akomodasi = 0;
                var alatCanggih = 0;
                var tindakan = 0;
                var obatAlkes = 0;
                var diskon = 0;
                var totalDiRuangan = 0;

                ManageLogistikPhp.getDataTableTransaksi("laporan/get-data-lap-rekap-pendapatan-ruangan?tglAwal=" + dateHelper.formatDate(tglAwal, 'YYYY-MM-DD HH:mm:ss') + "&tglAkhir=" + dateHelper.formatDate(tglAkhir, 'YYYY-MM-DD HH:mm:ss')).then(function (data) {
                    // dataSource.push = [...data.data.pendapatan_non_farmasi];
                    if (data.data.pendapatan_farmasi) {
                        data.data.pendapatan_farmasi.namaruangan = data.data.pendapatan_farmasi.namadepartemen;
                        dataSource.push(data.data.pendapatan_farmasi);
                    }

                    for (let i = 0; i < data.data.pendapatan_non_farmasi.length; i++) {
                        dataSource.push(data.data.pendapatan_non_farmasi[i]);
                    }

                    if (dataSource.length > 0) {
                        for (let i = 0; i < dataSource.length; i++) {
                            dataSource[i].konsultasiFormatted = $scope.formatRupiah(dataSource[i].konsultasi ? dataSource[i].konsultasi : 0, 'Rp.');
                            dataSource[i].akomodasiFormatted = $scope.formatRupiah(dataSource[i].akomodasi ? dataSource[i].akomodasi : 0, 'Rp.');
                            dataSource[i].administrasiFormatted = $scope.formatRupiah(dataSource[i].administrasi ? dataSource[i].administrasi : 0, 'Rp.');
                            dataSource[i].alatcanggihFormatted = $scope.formatRupiah(dataSource[i].alatcanggih ? dataSource[i].alatcanggih : 0, 'Rp.');
                            dataSource[i].tindakanFormatted = $scope.formatRupiah(dataSource[i].tindakan ? dataSource[i].tindakan : 0, 'Rp.');
                            dataSource[i].visiteFormatted = $scope.formatRupiah(dataSource[i].visite ? dataSource[i].visite : 0, 'Rp.');
                            dataSource[i].obatalkesFormatted = $scope.formatRupiah(dataSource[i].obatalkes ? dataSource[i].obatalkes : 0, 'Rp.');

                            administrasi = parseInt(administrasi) + parseInt(dataSource[i].administrasi ? dataSource[i].administrasi : 0);
                            visite = parseInt(visite) + parseInt(dataSource[i].visite ? dataSource[i].visite : 0);
                            konsultasi = parseInt(konsultasi) + parseInt(dataSource[i].konsultasi ? dataSource[i].konsultasi : 0);
                            akomodasi = parseInt(akomodasi) + parseInt(dataSource[i].akomodasi ? dataSource[i].akomodasi : 0);
                            alatCanggih = parseInt(alatCanggih) + parseInt(dataSource[i].alatCanggih ? dataSource[i].alatCanggih : 0);
                            tindakan = parseInt(tindakan) + parseInt(dataSource[i].tindakan ? dataSource[i].tindakan : 0);
                            obatAlkes = parseInt(obatAlkes) + parseInt(dataSource[i].obatalkes ? dataSource[i].obatalkes : 0);
                            diskon = parseInt(diskon) + parseInt(dataSource[i].diskon ? dataSource[i].diskon : 0);
                            totalDiRuangan = parseInt(totalDiRuangan) + parseInt(dataSource[i].totalDiRuangan ? dataSource[i].totalDiRuangan : 0);
                        };
                    }

                    console.log(dataSource)
                    $scope.dataSourceRekap = new kendo.data.DataSource({
                        data: dataSource,
                        pageSize: 100
                    });
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
