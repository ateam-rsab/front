define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RiwayatEvaluasiJabatanCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {

            $scope.optSourceRiwayatEJ= {
                toolbar: [{
                        text: "export",
                        name: "Export detail",
                        template: '<button ng-click="exportExcel()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
                    },  {
                        text: "history",
                        name: "Rekapitulasi",
                        template: '<button ng-click="goToRekap()" class="k-button k-button-icontext k-grid-upload">Rekapitulasi Evaluasi Jabatan</button>'
                    }
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
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "tglHitungFormatted",
                    title: "<h3>Tanggal<br>Perhitungan</h3>",
                    width: "170px",
                }, {
                    field: "periodePerhitungan",
                    title: "<h3>Periode<br>Perhitungan</h3>",
                    width: "100px",
                }, {
                    field: "namaJabatan",
                    title: "<h3>Jabatan</h3>",
                    width: "170px",
                }, {
                    field: "kelompokJabatan",
                    title: "<h3>Kelompok Jabatan</h3>",
                    width: "170px",
                }, {
                    field: "nilaiJabatan",
                    title: "<h3>Nilai<br>Jabatan</h3>",
                    width: "70px",
                }, {
                    field: "grade",
                    title: "<h3>Grade</h3>",
                    width: "70px",
                }, {
                    // field: "",
                    title: "<h3>Faktor Penimbang</h3>",
                    width: "170px",
                    columns: [{
                        field: "f1",
                        title: "<h3>1</h3>",
                        width: "70px",
                    }, {
                        field: "f2",
                        title: "<h3>2</h3>",
                        width: "70px",
                    }, {
                        field: "f3",
                        title: "<h3>3</h3>",
                        width: "70px",
                    }, {
                        field: "f4",
                        title: "<h3>4</h3>",
                        width: "70px",
                    }, {
                        field: "f5",
                        title: "<h3>5</h3>",
                        width: "70px",
                    }, {
                        // field: "",
                        title: "<h3>6</h3>",
                        width: "70px",
                        columns: [{
                            field: "fa",
                            title: "<h3>A</h3>",
                            width: "70px",
                        }, {
                            field: "fb",
                            title: "<h3>B</h3>",
                            width: "70px",
                        }, {
                            field: "fc",
                            title: "<h3>C</h3>",
                            width: "70px",
                        }, {
                            field: "fd",
                            title: "<h3>D</h3>",
                            width: "70px",
                        }, {
                            field: "fe",
                            title: "<h3>E</h3>",
                            width: "70px",
                        }, {
                            field: "ff",
                            title: "<h3>F</h3>",
                            width: "70px",
                        }, {
                            field: "fg",
                            title: "<h3>G</h3>",
                            width: "70px",
                        }, {
                            field: "fh",
                            title: "<h3>H</h3>",
                            width: "70px",
                        }, {
                            field: "fi",
                            title: "<h3>I</h3>",
                            width: "70px",
                        }, {
                            field: "fj",
                            title: "<h3>J</h3>",
                            width: "70px",
                        }, {
                            field: "fk",
                            title: "<h3>K</h3>",
                            width: "70px",
                        }, {
                            field: "fl",
                            title: "<h3>L</h3>",
                            width: "70px",
                        }, ]
                    }, {
                        field: "f7",
                        title: "<h3>7</h3>",
                        width: "70px",
                    }, {
                        field: "f8",
                        title: "<h3>8</h3>",
                        width: "70px",
                    }, {
                        field: "f9",
                        title: "<h3>9</h3>",
                        width: "70px",
                    }, {
                        field: "f10",
                        title: "<h3>10</h3>",
                        width: "70px",
                    }, ]
                }, ]
            }

            let init = () => {
                ManageSdmNew.getListData('sdm/get-histori-evaluasi-jabatan').then(res => {
                    $scope.dataSourceRiwayatEJ= new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 20
                    })
                })
                // ManageSdmNew.getListData("sdm/get-all-evaluasi-jabatan").then((res) => {
                //     console.log(res);

                //     // res.data.data

                //     $scope.dataSourceRiwayatEJ= new kendo.data.DataSource({
                //         data: res.data.data,
                //         pageSize: 20
                //     })
                // })
            }
            init();

            $scope.exportExcel = function () {
                var tempDataExport = [];
                var rows = [];

                tempDataExport = $scope.dataSourceRekapitulasi;
                tempDataExport.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                        //push single row for every record
                        rows.push({
                            cells: [{
                                value: data[i].periodePerhitungan
                            }, {
                                value: data[i].namaJabatan
                            }, {
                                value: data[i].kelompokJabatan
                            }, {
                                value: data[i].nilaiJabatan
                            }, {
                                value: data[i].grade
                            }, {
                                value: data[i].f1
                            }, {
                                value: data[i].f2
                            }, {
                                value: data[i].f3
                            }, {
                                value: data[i].f4
                            }, {
                                value: data[i].f5
                            }, {
                                value: data[i].fa
                            }, {
                                value: data[i].fb
                            }, {
                                value: data[i].fc
                            }, {
                                value: data[i].fd
                            }, {
                                value: data[i].fe
                            }, {
                                value: data[i].ff
                            }, {
                                value: data[i].fg
                            }, {
                                value: data[i].fh
                            }, {
                                value: data[i].fi
                            }, {
                                value: data[i].fj
                            }, {
                                value: data[i].fk
                            }, {
                                value: data[i].fl
                            }, {
                                value: data[i].f7
                            }, {
                                value: data[i].f8
                            }, {
                                value: data[i].f9
                            }, {
                                value: data[i].f10
                            }, ]
                        })
                    }
                    console.log(rows);
                    var workbook = new kendo.ooxml.Workbook({
                        sheets: [{
                            // freezePane: {
                            //     rowSplit: 1
                            // },
                            mergedCells: ["A1:A3", "B1:B3", "C1:C3", "D1:D3", "E1:E3",
                                "F1:Z1", // faktor
                                "F2:F3", "G2:G3", "H2:H3", "I2:I3", "J2:J3", // 1-5
                                "K2:V2", // 6
                                "W2:W3", "X2:X3", "Y2:Y3", "Z2:Z3" // 7-10
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
                            title: "RiwayatEJEvaluasi Jabatan",
                            // Rows of the sheet
                            rows: [{
                                cells: [{
                                    value: "Periode Perhitungan",
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
                                    value: "Jabatan",
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
                                    value: "Kelompok Jabatan",
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
                                    value: "Nilai Jabatan",
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
                                    value: "Grade",
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
                                    value: "Faktor Penimbang",
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
                                }, ]
                            }, {
                                cells: [{
                                    value: "1",
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
                                    value: "2",
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
                                    value: "3",
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
                                    value: "4",
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
                                }, {
                                    value: "5",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 9,
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
                                    value: "6",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 10,
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
                                    value: "7",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 22,
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
                                    value: "8",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 23,
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
                                    value: "9",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 24,
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
                                    value: "10",
                                    textAlign: "center",
                                    verticalAlign: "center",
                                    index: 25,
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
                            }, {
                                cells: [{
                                    value: "A",
                                    textAlign: "center",
                                    index: 10,
                                    background: "#276678",
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
                                    }
                                }, {
                                    value: "B",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 11
                                }, {
                                    value: "C",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 12
                                }, {
                                    value: "D",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 13
                                }, {
                                    value: "E",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 14
                                }, {
                                    value: "F",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 15
                                }, {
                                    value: "G",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 16
                                }, {
                                    value: "H",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 17
                                }, {
                                    value: "I",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 18
                                }, {
                                    value: "J",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 19
                                }, {
                                    value: "K",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 20
                                }, {
                                    value: "L",
                                    textAlign: "center",
                                    background: "#276678",
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
                                    index: 21
                                }, ]
                            }, ...rows]
                        }]
                    });
                    //save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "rekapitulasi-evaluasi.xlsx"
                    });
                });
            };

            $scope.goToRekap = function() {
                $state.go('RekapitulasiEvaluasiJabatan');
            }
        }
    ])
});