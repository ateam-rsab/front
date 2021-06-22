define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookKinerjaDokterCtrl', ['$q', '$http', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'ReportHelper', 'FindPegawai', 'CetakHelper', 'FindSdm',
        function ($q, $http, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, reportHelper, findPegawai, cetakHelper, FindSdm) {
            $scope.item = {};
            $scope.isLoading = true;
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = true;

            $scope.now = new Date();
            $scope.yearSelected = {
                format: "MMMM yyyy",
                start: "year",
                depth: "year"
            };

            $q.all([
                ManageSdmNew.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,namaLengkap&values=true,!'-'&order=namaLengkap:asc")
            ]).then(function (res) {
                if (res[0].statResponse) {
                    $scope.listPegawai = res[0].data;
                    $scope.daftarListPegawai = $scope.listPegawai
                }
                $scope.isRouteLoading = false;
            })

            $scope.cari = function () {
                var listRawRequired = [
                    "item.pegawai|k-ng-model|Nama pegawai",
                    "item.periode|k-ng-model|Periode"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.isRouteLoading = true;
                    $q.all([
                        ManageSdmNew.getListData("iki-remunerasi/get-logbook-skoring-dokter?bulan=" + dateHelper.toTimeStamp($scope.item.periode) + "&pegawaiId=" + $scope.item.pegawai.id)
                    ]).then(function (res) {
                        if (res[0].statResponse) {
                            // define grid logbook kinerja and show data
                            $scope.showGridKinerja = true;
                            var dataGrid = [];
                            res[0].data.data.forEach(function (element) {
                                var customData = {};
                                for (var key in element) {
                                    switch (key) {
                                        case "detail":
                                            var lisObjek = element.detail;
                                            lisObjek.forEach(function (subElement) {
                                                var tgl = subElement.tglPelayanan;
                                                var key = tgl.slice(-2);
                                                if (key[0] === "0") {
                                                    key = key.slice(-1);
                                                    customData[key] = subElement["jumlah"];
                                                } else {
                                                    customData[key] = subElement["jumlah"];
                                                };
                                            });
                                            break;
                                        default:
                                            customData[key] = element[key];
                                            break;
                                    }
                                };
                                dataGrid.push(customData);
                            });
                            $scope.mainGridOption = {
                                editable: false,
                                scrollable: true,
                                selectable: "row",
                                columns: [{
                                    field: "namaIndikator",
                                    title: "Indikator",
                                    hidden: true
                                }, {
                                    field: "namaProduk",
                                    title: "Kegiatan",
                                    width: 400,
                                    headerAttributes: {
                                        style: "text-align: center"
                                    }
                                }, {
                                    field: "skor",
                                    title: "Skor",
                                    width: 80,
                                    format: "{0:n2}",
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    attributes: {
                                        class: "table-cell",
                                        style: "text-align: right;"
                                    }
                                }, {
                                    field: "jumlah",
                                    title: "Jumlah",
                                    width: 80,
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    attributes: {
                                        class: "table-cell",
                                        style: "text-align: right;"
                                    },
                                    footerTemplate: "#= sum #",
                                    footerAttributes: {
                                        class: "table-footer-cell",
                                        style: "text-align: right;"
                                    },
                                    aggregates: ["sum"],
                                    groupFooterTemplate: "#= sum #"
                                }, {
                                    field: "tSkor",
                                    title: "Total Skor",
                                    width: 100,
                                    format: "{0:n2}",
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    attributes: {
                                        class: "table-cell",
                                        style: "text-align: right;",
                                    },
                                    footerTemplate: "#= kendo.toString(sum, '0.00') #",
                                    footerAttributes: {
                                        class: "table-footer-cell",
                                        style: "text-align: right;"
                                    },
                                    aggregates: ["sum"],
                                    groupFooterTemplate: "#= sum #"
                                }, {
                                    field: "Capaian",
                                    headerAttributes: {
                                        style: "text-align: center"
                                    },
                                    columns: $scope.generateGridColumn()
                                }],
                                dataBound: $scope.onDataBound
                            };
                            $scope.dataSource = new kendo.data.DataSource({
                                data: dataGrid,
                                aggregate: [
                                    { field: "jumlah", aggregate: "sum" },
                                    { field: "skor", aggregate: "sum" },
                                    { field: "tSkor", aggregate: "sum" }
                                ],
                                group: {
                                    field: "namaIndikator",
                                    aggregates: [
                                        { field: "jumlah", aggregate: "sum" },
                                        { field: "skor", aggregate: "sum" },
                                        { field: "tSkor", aggregate: "sum" }
                                    ]
                                },
                            })
                            $scope.isLoading = false;
                            $scope.isRouteLoading = false;
                        }
                    }, (error) => {
                        $scope.isRouteLoading = false;
                        throw (error);
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };

            $scope.generateGridColumn = function () {
                var year = $scope.item.periode.getYear();
                var month = $scope.item.periode.getMonth();
                var dateInMonth = new Date(year, month + 1, 0);
                var listDay = [];
                for (var i = 0; i < dateInMonth.getDate(); i++) {
                    var data = {
                        field: "[" + (i + 1) + "]",
                        title: (i + 1).toString(),
                        width: "50px", attributes: { style: "text-align: right;" },
                        headerAttributes: { style: "text-align: center;  " }
                    };
                    listDay.push(data);
                }
                return listDay;
            }

            $scope.onDataBound = function (e) {
                var grid = $("#gridLogKinerja").data("kendoGrid");
                var totalCapaian = grid.dataSource.aggregates().tSkor.sum;
                $scope.totalCapaian = totalCapaian.toFixed(2);
                $(grid.tbody).on("click", "td", function (e) {
                    // disable show popup on empty cell date value
                    if (e.currentTarget.innerText === "") return;

                    var row = $(this).closest("tr");
                    var colIdx = $("td", row).index(this);
                    if (colIdx >= 5) {
                        // disable show popup if cell index < 4
                        var colDateIdx = colIdx - 5;
                        var colName = $('#gridLogKinerja tr').eq(1).find('th').eq(colDateIdx).text();
                        if (colName.length === 1) {
                            colName = "0" + colName;
                        }
                    }
                });
            }
        }
    ]);
});