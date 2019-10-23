define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SipStrExpiredCtrl', ['$rootScope', '$scope', '$timeout', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'FindSdm', 'DateHelper',
        function ($rootScope, $scope, $timeout, ModelItem, $state, ManageSdm, ManageSdmNew, FindSdm, dateHelper) {
            $scope.item = {};
            $scope.yearSelected = {
                format: "MMMM yyyy",
                start: "year",
                depth: "year"
            };
            function getSixMonths() {
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth();
                let today = now.getDate();
                let lastDayNextSixMonth = new Date(year, month + 6, 0);
                if (lastDayNextSixMonth == 31) {
                    today = today - 1;
                } else if (lastDayNextSixMonth == 28) {
                    today = today + 2;
                } else if (lastDayNextSixMonth == 29) {
                    today = today + 1;
                }
                return today;
            }
            $scope.batasData = dateHelper.getTanggalFormatted(new Date(new Date().getFullYear(), new Date().getMonth() + 6, getSixMonths()));
            $scope.loadDataSip = function () {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("pegawai/get-pegawai-sip-expired").then(function (res) {
                    $scope.datagridSip = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 15,
                        // group: {
                        //     field: "tglBerakhirSip2",
                        //     aggregates: [{
                        //         field: "tglBerakhirSip2",
                        //         aggregate: "count"
                        //     }]
                        // },
                        aggregate: [{ field: "tglBerakhirSip2", aggregate: "count" }]
                    });
                    $scope.isRouteLoading = false;
                }, (err) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'masaBerlakuSip';
            };
            $scope.loadDataStr = function () {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("pegawai/get-pegawai-str-expired").then(function (res) {
                    $scope.datagridStr = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10,
                        // group: {
                        //     field: "tglBerakhirStr2",
                        //     aggregates: [{
                        //         field: "tglBerakhirStr2",
                        //         aggregate: "count"
                        //     }]
                        // },
                        aggregate: [{ field: "tglBerakhirStr2", aggregate: "count" }]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'masaBerlakuStr';
            };

            $scope.onTabChanges = function (value) {
                if (value === 1) {
                    if (!$scope.datagridSip) {
                        $scope.loadDataSip();
                    }
                } else if (value === 2) {
                    if (!$scope.datagridStr) {
                        $scope.loadDataStr();
                    }
                }
            };

            $scope.opsiGridSip = {
                toolbar: [
                    // "excel", 
                    { text: "export", name: "Export detail", template: '<button ng-click="exportDetailSIP()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' }
                ],
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
                excel: {
                    fileName: "Daftar SIP Pegawai.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:F1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar SIP Pegawai",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
                    {
                        field: "nipPns", title: "<h3>NIP</h3>", "width": 180
                    },
                    { field: "namaLengkap", title: "<h3>Nama</h3>", "width": 280 },
                    { field: "unitKerja", title: "<h3>Unit Kerja</h3>" },
                    { field: "subUnitKerja", title: "<h3>Sub-Unit Kerja</h3>" },
                    { field: "noSip", title: "<h3>Nomor SIP</h3>" },
                    {
                        field: "tglBerakhirSip2", title: "<h3>Tanggal Berakhir</h3>"
                        // aggregates: ["count"],
                        // groupHeaderTemplate: "Tanggal Berakhir SIP [#= kendo.toString(value) #] (Total: #= count#)" 
                    }

                ]
            };

            $scope.exportDetailSIP = function () {
                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "NIP" },
                            { value: "Nama" },
                            { value: "Unit Kerja" },
                            { value: "Sub Unit Kerja" },
                            { value: "No. SIP" },
                            { value: "Tanggal Berakhir" }

                        ]
                    }
                ];

                tempDataExport = $scope.datagridSip;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].nipPns },
                                { value: data[i].namaLengkap },
                                { value: data[i].unitKerja },
                                { value: data[i].subUnitKerja },
                                { value: data[i].noSip },
                                { value: data[i].tglBerakhirSip2 },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "SIP",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Daftar Masa Berlaku SIP-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY') + ".xlsx" });
                });
            };

            $scope.opsiGridStr = {
                toolbar: [
                    { text: "export", name: "Export detail", template: '<button ng-click="exportDetailSTR()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' },
                ],
                excel: {
                    fileName: "Daftar STR Pegawai.xlsx",
                    allPages: true,
                },
                excelExport: function (e) {
                    var sheet = e.workbook.sheets[0];
                    sheet.frozenRows = 2;
                    sheet.mergedCells = ["A1:G1"];
                    sheet.name = "Orders";

                    var myHeaders = [{
                        value: "Daftar STR Pegawai",
                        fontSize: 20,
                        textAlign: "center",
                        background: "#ffffff",
                        // color:"#ffffff"
                    }];

                    sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
                },
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
                    { field: "nipPns", title: "<h3>NIP</h3>", "width": 180 },
                    { field: "namaLengkap", title: "<h3>Nama</h3>", "width": 280 },
                    { field: "unitKerja", title: "<h3>Unit Kerja</h3>" },
                    { field: "subUnitKerja", title: "<h3>Sub-Unit Kerja</h3>" },
                    { field: "noStr", title: "<h3>Nomor STR</h3>" },
                    {
                        field: "tglBerakhirStr2", title: "<h3>Tanggal Berakhir</h3>"
                        // aggregates: ["count"], groupHeaderTemplate: "Tanggal Berakhir STR [#= kendo.toString(value) #] (Total: #= count#)"
                    }
                ]
            };

            $scope.exportDetailSTR = function () {
                var tempDataExport = [];
                var rows = [
                    {
                        cells: [
                            { value: "NIP" },
                            { value: "Nama" },
                            { value: "Unit Kerja" },
                            { value: "Sub Unit Kerja" },
                            { value: "No. STR" },
                            { value: "Tanggal Berakhir" }

                        ]
                    }
                ];

                tempDataExport = $scope.datagridStr;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].nipPns },
                                { value: data[i].namaLengkap },
                                { value: data[i].unitKerja },
                                { value: data[i].subUnitKerja },
                                { value: data[i].noStr },
                                { value: data[i].tglBerakhirStr2 },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [
                            {
                                freezePane: {
                                    rowSplit: 1
                                },
                                columns: [
                                    // Column settings (width)
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true },
                                    { autoWidth: true }
                                ],
                                // Title of the sheet
                                title: "SIP",
                                // Rows of the sheet
                                rows: rows
                            }
                        ]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Daftar Masa Berlaku STR-" + dateHelper.formatDate(new Date(), 'DD-MMM-YYYY') + ".xlsx" });
                });
            };

            var timeoutPromise;
            $scope.$watch('item.tglAwalSip', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilterDate("#gridSip", "tglBerakhirSip", "gte", newVal)
                    }
                }, 500);
            });
            $scope.$watch('item.tglAkhirSip', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilterDate("#gridSip", "tglBerakhirSip", "lte", newVal)
                    }
                }, 500);
            });
            $scope.$watch('item.tglAwalStr', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilterDate("#gridStr", "tglBerakhirStr", "gte", newVal)
                    }
                }, 500);
            });
            $scope.$watch('item.tglAkhirStr', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilterDate("#gridStr", "tglBerakhirStr", "lte", newVal)
                    }
                }, 500);
            });
            function applyFilterDate(gridId, filterField, filterOperator, filterValue) {
                var gridData = $(gridId).data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField && currentFilters[i].operator == filterOperator) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterValue !== "") {
                    var tgl;
                    if (filterOperator === "gte") {
                        tgl = dateHelper.setJamAwal(new Date(filterValue));
                    } else if (filterOperator === "lte") {
                        tgl = dateHelper.setJamAkhir(new Date(filterValue));
                    }
                    currentFilters.push({
                        field: filterField,
                        operator: filterOperator,
                        value: new Date(tgl).getTime()
                    });
                }

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });
            };
            $scope.resetFilter = function (gridId) {
                var gridData = $(gridId).data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = {};
            };
        }
    ]);
});