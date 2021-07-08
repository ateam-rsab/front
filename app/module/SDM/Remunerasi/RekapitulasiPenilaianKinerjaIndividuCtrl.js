define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiPenilaianKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.optGrid = {
                toolbar: [{
                    text: "export",
                    name: "Export detail",
                    template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                },],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "unitKerja",
                    title: "<h3>Unit Kerja</h3>",
                    width: 200,
                }, {
                    field: "subunitKerja",
                    title: "<h3>Sub Unit Kerja</h3>",
                    width: 200
                }, {
                    field: "namaLengkap",
                    title: "<h3>Nama Pegawai</h3>",
                    width: 200,
                }, {
                    title: "<h3>Kuantitas</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotKuantitas",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilKuantitas",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    title: "<h3>Kualitas</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotKualitas",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilKualitas",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    title: "<h3>Perilaku</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotPerilaku",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilPerilaku",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    field: "iki",
                    title: "<h3>IKI</h3>",
                    width: 50,
                }, {
                    field: "kriteria",
                    title: "<h3>Kriteria</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: center;"
                    }
                }, {
                    field: "rpP1",
                    title: "<h3>P1</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "rpP2",
                    title: "<h3>P2</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                },]
            }

            $scope.getData = () => {
                $scope.isRouteLoading = true;

                if (!$scope.item.bulan) {
                    toastr.warning("Silakan pilih bulan terlebih dahulu", "Peringatan")

                    $scope.isRouteLoading = false;
                    return
                }

                let bulan = dateHelper.toTimeStamp($scope.item.bulan)

                ManageSdmNew.getListData(`iki-remunerasi/get-rekap-penilaian-kinerja-individu?bulan=${bulan}&unitKerjaId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&subunitKerjaId=${$scope.item.subUnitKerja ? $scope.item.subUnitKerja.id : ""}&pegawaiId=${$scope.item.pegawai ? $scope.item.pegawai.id : ""}`).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    });

                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,!0&order=name:asc").then((res) => {
                    $scope.listOfUnitKerja = res.data;
                })

                ManageSdmNew.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,kategoryPegawaiId&values=true,(1;10;14)&order=namaLengkap:asc").then((res) => {
                    $scope.listOfPegawai = res.data;
                })
            }

            init();

            $scope.getSubUnitKerja = (id) => {
                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,id,unitKerjaId&values=true,!0," + id + "&order=name:asc").then((res) => {
                    $scope.listOfSubUnitKerja = res.data;
                })
            }

            $scope.exportExcel = function () {

                let tempDataExport = [];
                let rows = []
                // var rows = [{
                //     cells: [
                //         { value: "Unit Kerja" },
                //         { value: "Sub Unit Kerja" },
                //         { value: "Nama Pegawai" },

                //         { value: "Kualitas" },
                //         { value: "Kuantitas" },
                //         { value: "Perilaku" },

                //         { value: "IKI" },
                //         { value: "Kriteria" },
                //         { value: "P1" },
                //         { value: "P2" },
                //     ]
                // }];

                tempDataExport = $scope.dataSource;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [
                                { value: data[i].unitKerja },
                                { value: data[i].subunitKerja },
                                { value: data[i].namaLengkap },
                                
                                { value: data[i].bobotKuantitas },
                                { value: data[i].hasilKuantitas },
                                { value: data[i].bobotKualitas },
                                { value: data[i].hasilKualitas },
                                { value: data[i].bobotPerilaku },
                                { value: data[i].hasilPerilaku },
                                { value: data[i].iki },
                                { value: data[i].kriteria },
                                { value: data[i].rpP1 },
                                { value: data[i].rpP2 },
                            ]
                        })
                    }
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            // freezePane: {
                            //     rowSplit: 1
                            // },
                            mergedCells: ["A1:A2", "B1:B2", "C1:C2", "D1:E1", "F1:G1", "H1:I1", "J1:J2", "K1:K2", "L1:L2", "M1:M2"
                            ],
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
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
                                {
                                    autoWidth: true
                                },
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
                            title: "Rekapitulasi Penilaian Kinerja Individu",
                            // Rows of the sheet
                            rows: [{
                                cells: [{
                                    value: "Unit Kerja",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    background: "#d3e0ea",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Sub Unit Kerja",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    background: "#d3e0ea",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Nama Pegawai",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    background: "#d3e0ea",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Kuantitas",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    background: "#d3e0ea",
                                    index: 3,
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Kualitas",
                                    textAlign: "center",
                                    index: 5,
                                    verticalAlign: "center",
                                    background: "#d3e0ea",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Perilaku",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 7,
                                    background: "#d3e0ea",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "IKI",
                                    textAlign: "center",
                                    background: "#d3e0ea",
                                    index: 9,
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Kriteria",
                                    index: 10,
                                    textAlign: "center",
                                    background: "#d3e0ea",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "P1",
                                    textAlign: "center",
                                    background: "#d3e0ea",
                                    index: 11,
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                },{
                                    value: "P2",
                                    textAlign: "center",
                                    background: "#d3e0ea",
                                    index: 12,
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                },]
                            }, {
                                cells: [{
                                    value: "Bobot (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 3,
                                    background: "#1687a7",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Hasil (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 4,
                                    background: "#1687a7",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Bobot (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 5,
                                    background: "#1687a7",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Hasil (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 6,
                                    background: "#1687a7",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Bobot (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 7,
                                    background: "#1687a7",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, {
                                    value: "Hasil (%)",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 8,
                                    background: "#1687a7",
                                    borderRight: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderTop: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderLeft: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                    borderBottom: {
                                        color: "#f2f2f2f",
                                        size: 1
                                    },
                                }, ]
                            }, ...rows]
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Rekapitulasi Penilaian Kinerja Individu.xlsx" });
                });

            }
        }
    ])
});