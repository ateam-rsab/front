define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookKinerjaDokterCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.grandTotal = 0;
            $scope.dataSource = [];
            $scope.item.periode = new Date();

            let groupJSON = function (xs, key) {
                return xs.reduce(function (rv, x) {

                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };

            let getHeaderTable = () => {
                $scope.headerTable = [];
                var dt = new Date($scope.item.periode);
                var month = dt.getMonth() + 1;
                var year = dt.getFullYear();
                $scope.daysInMonth = new Date(year, month, 0).getDate();

                $scope.headerTable = [
                    // {
                    //     width: "300px",
                    //     title: "Indikator"
                    // },
                    // {
                    //     width: "300px",
                    //     title: "Kegiatan"
                    // }
                ];

                for (let i = 0; i < $scope.daysInMonth; i++) {
                    $scope.headerTable.push({
                        width: "20px",
                        title: i + 1,
                        value: i + 1
                    });
                }
            }

            let init = () => {
                ManageSdmNew.getListData(`service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,namaLengkap&values=true,!'-'&order=namaLengkap:asc`).then(res => {
                    $scope.listPegawai = res.data;
                })
                getHeaderTable();
            }
            init();

            $scope.getDataLogbook = () => {
                getHeaderTable();

                if (!$scope.item.pegawai) {
                    toastr.info("Harap pilih pegawai terlebih dahulu");
                    return;
                }
                $scope.isRouteLoading = true;
                let dataTemp = [];
                // ${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}
                // ${$scope.item.pegawai.id}
                // Request URL: http://192.168.12.3:8080/jasamedika-sdm/iki-remunerasi/get-logbook-skoring-dokter?bulan=1614127280000&pegawaiId=3
                ManageSdmNew.getListData(`iki-remunerasi/get-logbook-skoring-dokter?bulan=${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}&pegawaiId=${$scope.item.pegawai.id}`).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        dataTemp.push({
                            namaIndikator: res.data.data[i].namaIndikator,
                            namaProduk: res.data.data[i].namaProduk,
                            skor: res.data.data[i].skor,
                            totalSkor: res.data.data[i].tSkor,
                            jumlah: res.data.data[i].jumlah,
                            dataDetail: []
                        });

                        for (let ii = 0; ii < $scope.daysInMonth; ii++) {
                            dataTemp[i].dataDetail.push({
                                tgl: ii + 1,
                                jmlLayanan: 0
                            })

                        }

                    }

                    for (let i = 0; i < res.data.data.length; i++) {
                        for (let ii = 0; ii < res.data.data[i].detail.length; ii++) {
                            for (let iii = 0; iii < dataTemp[i].dataDetail.length; iii++) {
                                let tglPelayanan = res.data.data[i].detail[ii].tglPelayanan.split('-');
                                if (parseInt(tglPelayanan[2]) === iii + 1) {
                                    dataTemp[i].dataDetail[iii].jmlLayanan = res.data.data[i].detail[ii].jumlah;
                                    break;
                                }
                            }

                        }
                    }

                    // $scope.dataSource = dataTemp;
                    let groupedJSON = groupJSON(dataTemp, 'namaIndikator');
                    let formattedJSON = Object.keys(groupedJSON).map((key) => [(key), groupedJSON[key]]);
                    let dataGet = [];

                    for (let i = 0; i < formattedJSON.length; i++) {
                        dataGet.push({
                            label: formattedJSON[i][0],
                            detail: [],
                            subTotalSkor: 0,
                            subJumlah: 0,
                            subSkor: 0
                        })

                        for (let ii = 0; ii < formattedJSON[i][1].length; ii++) {
                            dataGet[i].detail.push(formattedJSON[i][1][ii]);
                            dataGet[i].subJumlah += formattedJSON[i][1][ii].totalSkor;
                            dataGet[i].subSkor += formattedJSON[i][1][ii].skor;
                            dataGet[i].subTotalSkor += formattedJSON[i][1][ii].totalSkor;

                            dataGet[i].subJumlah = Math.round(dataGet[i].subJumlah);
                            dataGet[i].subSkor = Math.round(dataGet[i].subSkor);
                            dataGet[i].subTotalSkor = Math.round(dataGet[i].subTotalSkor);
                        }
                        $scope.grandTotal = dataGet[i].subTotalSkor + $scope.grandTotal;
                    }
                    $scope.dataSource = dataGet;

                    $scope.kendoDataSource = new kendo.data.DataSource({
                        data: dataGet,
                        pageSize: 100
                    })
                    $scope.isRouteLoading = false;
                });
            }
            // $scope.getDataLogbook();

            $scope.exportExcel = () => {
                var rows = [{
                    cells: [{ value: "Nama Kegiatan" },
                    { value: "Jumlah" },
                    { value: "Skor" },
                    { value: "Total Skor" },
                    ...$scope.headerTable,
                    ]
                }];
                $scope.columnsConfig = [];

                let tempDataExport = $scope.kendoDataSource;
                tempDataExport.fetch(() => {
                    var data = tempDataExport._data;
                    let dataTemp = [];

                    for (let i = 0; i < data.length; i++) {
                        dataTemp.push(data[i])
                        for (let ii = 0; ii < data[i].detail.length; ii++) {
                            dataTemp.push(data[i].detail[ii]);
                        }
                    }
                    let dataTgl = []
                    for (var i = 0; i < dataTemp.length; i++) {
                        dataTgl = [];
                        if (dataTemp[i].dataDetail) {
                            for (let ii = 0; ii < dataTemp[i].dataDetail.length; ii++) {
                                dataTgl.push({
                                    value: dataTemp[i].dataDetail[ii].jmlLayanan
                                })
                            }
                        }

                        //push single row for every record
                        rows.push({
                            cells: [{
                                value: dataTemp[i].label ? dataTemp[i].label : dataTemp[i].namaProduk
                            },
                            {
                                value: dataTemp[i].jumlah ? dataTemp[i].jumlah : ""
                            },
                            {
                                value: dataTemp[i].skor ? dataTemp[i].skor : ""
                            },
                            {
                                value: dataTemp[i].totalSkor ? dataTemp[i].totalSkor : ""
                            },
                            ...dataTgl
                            ]
                        })
                    }
                    let month = new Date($scope.item.periode);
                    rows.unshift({
                        cells: [{ value: "Logbook Kinerja " + $scope.item.pegawai.namaLengkap + " Periode " + dateHelper.toMonth(month.getMonth()), }]
                    });

                    var workbook = new kendo.ooxml.Workbook({
                        freezePane: {
                            rowSplit: 1
                        },
                        mergedCells: ["A1:D1"],
                        sheets: [{
                            freezePane: {
                                rowSplit: 1
                            },
                            columns: [
                                {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }, {
                                    autoWidth: true
                                }
                            ],
                            // Title of the sheet
                            title: "Logbook Kinerja Dokter",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });
                    // save the file as Excel file with extension xlsx


                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "logbook-kinerja-dokter" + $scope.item.pegawai.namaLengkap + "-periode=" + dateHelper.toMonth(month.getMonth()) + ".xlsx"
                    });
                });
            };
        }
    ])
});