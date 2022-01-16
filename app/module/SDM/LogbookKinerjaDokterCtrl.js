define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookKinerjaDokterCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            let baseUrl = "";
            let urlDetail = "";
            $scope.namaJenisPegawai = "";
            $scope.isPelayanaPasien = true;
            $scope.isRouteLoading = false;
            $scope.monthly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };
            $scope.dataSource = [];
            // $scope.item.periode = new Date();

            $scope.pegawaiLogin = modelItem.getPegawai();
            console.log($scope.pegawaiLogin.jenisPegawai.jenispegawai !== "DOKTER")

            $scope.columnGrid = [{
                "field": "namaProduk",
                "title": "Nama Layanan",
                "width": "30%"
            }, {
                "field": "namaRuangan",
                "title": "Nama Ruangan",
                "width": "30%"
            }, {
                "field": "jenisPetugas",
                "title": "Jenis Petugas",
                "width": "20%",
                hidden: $scope.pegawaiLogin.jenisPegawai.jenispegawai !== "DOKTER",
            }, {
                "field": "noRegistrasi",
                "title": "No. Registrasi",
                "width": "20%"
            }, {
                "field": "tglPelayananFormatted",
                "title": "Tanggal<br>Pelayanan",
                "width": "20%"
            }, {
                "field": "noCm",
                "title": "No.<br>Rekam Medis",
                "width": "20%"
            }, {
                "field": "namaPasien",
                "title": "Nama Pasien",
                "width": "30%"
            }, {
                "field": "kelompokPasien",
                "title": "Kelompok Pasien",
                "width": "30%",
                hidden: $scope.pegawaiLogin.jenisPegawai.jenispegawai !== "DOKTER",
            }];
            $scope.columnGridNonPelayanan = [ {
                    "field": "tglPelayananFormatted",
                    "title": "Tanggal Pelayanan",
                    "width": "40%"
                }, {
                    "field": "jumlah",
                    "title": "Jumlah Layanan",
                    "width": "30%"
                }, {
                    "field": "catatan",
                    "title": "Catatan",
                    "width": "30%"
                },
            ]

            let groupJSON = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };

            let getHeaderTable = () => {
                $scope.headerTable = [];
                var dt = new Date();
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
                        title: i + 1
                    });
                }
            }

            $scope.getDataLogbook = () => {
                if(!baseUrl) {
                    init();
                    // $scope.getDataLogbook();
                    return;
                }
                
                getHeaderTable();
                $scope.isRouteLoading = true;

                if (!$scope.item.periode) {
                    toastr.info("Harap pilih periode terlebih dahulu");
                    $scope.isRouteLoading = false;
                    return;
                }

                if (!$scope.item.pegawai) {
                    toastr.info("Harap pilih pegawai terlebih dahulu");
                    $scope.isRouteLoading = false;
                    return;
                }

                let dataTemp = [];
                ManageSdmNew.getListData(`iki-remunerasi/${baseUrl}?bulan=${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}&pegawaiId=${$scope.item.pegawai.id}`).then(res => {
                    
                    let periode = new Date($scope.item.periode), bln = periode.getMonth(), thn = periode.getFullYear();
                    // console.log(bln, thn)

                    $scope.grandTotal = 0;
                    $scope.grandJumlah = 0;
                    for (let i = 0; i < res.data.data.length; i++) {
                        dataTemp.push({
                            namaIndikator: res.data.data[i].namaIndikator,
                            indikatorId: res.data.data[i].indikatorId,
                            namaProduk: res.data.data[i].namaProduk,
                            jenisPetugasId: res.data.data[i].jenisPetugasId,
                            produkId: res.data.data[i].produkId,
                            skor: res.data.data[i].skor,
                            totalSkor: res.data.data[i].tSkor,
                            kdProduk: res.data.data[i].kdProduk ? res.data.data[i].kdProduk : 1,
                            jumlah: res.data.data[i].jumlah,
                            // tglPelayanan: res.data.data[i].tglPelayanan,
                            dataDetail: []
                        });

                        for (let ii = 0; ii < $scope.daysInMonth; ii++) {
                            let frmtBln = bln + 1 > 9 ? bln + 1 : '0' + (bln + 1), frmtDate = ii + 1 > 9 ? ii + 1 : '0' + (ii + 1);
                            dataTemp[i].dataDetail.push({
                                tgl: ii + 1,
                                tglPelayanan: `${thn}-${frmtBln}-${frmtDate}`,
                                jmlLayanan: ''
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
                    console.log(groupedJSON);
                    let formattedJSON = Object.keys(groupedJSON).map((key) => [(key), groupedJSON[key]]);
                    console.log(formattedJSON)
                    let dataGet = [];

                    for (let i = 0; i < formattedJSON.length; i++) {
                        dataGet.push({
                            label: formattedJSON[i][0],
                            detail: [],
                            subTotalSkor: 0,
                            subJumlah: 0,
                            subSkor: 0,
                        })

                        for (let ii = 0; ii < formattedJSON[i][1].length; ii++) {
                            formattedJSON[i][1][ii].jenisPelayanan = formattedJSON[i][1][ii].kdProduk === 2 ? "Pasien" : "Non Pasien";
                            dataGet[i].detail.push(formattedJSON[i][1][ii]);
                            dataGet[i].subSkor += formattedJSON[i][1][ii].skor;
                            dataGet[i].subJumlah += formattedJSON[i][1][ii].jumlah;
                            dataGet[i].subTotalSkor += formattedJSON[i][1][ii].totalSkor;
                            // dataGet[i].kdProduk += formattedJSON[i][1][ii].kdProduk;
                        }
                        dataGet[i].subTotalSkor = parseFloat(dataGet[i].subTotalSkor.toFixed(2));

                        
                        $scope.grandJumlah = dataGet[i].subJumlah + $scope.grandJumlah;
                        $scope.grandTotal = dataGet[i].subTotalSkor + $scope.grandTotal;
                    }
                    $scope.grandTotal = parseFloat($scope.grandTotal.toFixed(2));

                    $scope.dataSource = dataGet;
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }

            let init = () => {
                ManageSdmNew.getListData("sdm/get-kelompok-jabatan-logbook-skor?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : $scope.pegawaiLogin.id)).then((res) => {
                    
                    switch (res.data.data) {
                        case 3:
                            baseUrl = "get-logbook-skoring-dokter-jam-kerja";
                            urlDetail = "get-detail-pasien-dokter-jam-kerja";
                            $scope.namaJenisPegawai = "Dokter";
                            break;
                        case 4:
                            baseUrl = "get-logbook-skoring-dokter-jam-kerja";
                            urlDetail = "get-detail-pasien-dokter-jam-kerja";
                            $scope.namaJenisPegawai = "Dokter";
                        case 5:
                            baseUrl = "";
                            $scope.namaJenisPegawai = "Perawat";
                            toastr.info("Service blm tersedia");
                            break;
                        case 6:
                            $scope.namaJenisPegawai = "Tenaga Kesehatan Lain";
                            urlDetail = "get-detail-logbook-skoring-nakes";
                            baseUrl = "get-logbook-skoring-nakes";
                        default:
                            break;
                    }
                    if(baseUrl) $scope.getDataLogbook();
                })
                
                ManageSdmNew.getListData(`service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,namaLengkap&values=true,!'-'&order=namaLengkap:asc`).then(res => {
                    $scope.listPegawai = res.data;
                })
                getHeaderTable();
            }
            init();
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

            $scope.detailTindakan = (ds, detail, data) => {
                if (data.jmlLayanan === "") {
                    toastr.info("Tidak ada data");
                    return;
                }

                $scope.isPelayanaPasien = detail.kdProduk === 1;

                ManageSdmNew.getListData(`iki-remunerasi/${urlDetail}?pegawaiId=${$scope.item.pegawai.id}&indikatorId=${detail.indikatorId}&produkId=${detail.produkId}&tglPelayanan=${data.tglPelayanan}&jenisPetugasId=${detail.jenisPetugasId}&skor=${detail.skor}`).then((res) => {
                    $scope.dataSourceDetailTindakan = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    })
                    $scope.popupDetail.open().center();
                })
            }

            $scope.Verify = function () {
                $scope.isRouteLoading = true;

                if (!$scope.item.pegawai.isVerifAkses) {
                    toastr.warning("Tidak memiliki akses", "Peringatan")
                    $scope.isRouteLoading = false
                    return
                }

                var dataSend = {
                    "bulan": dateHelper.toTimeStamp($scope.item.periode),
                    "capaian": $scope.grandTotal,
                    "pegawai": {
                        "id": $scope.item.pegawai.id
                    },
                    "indikatorKinerja": {
                        "id": 466 //indikator jumlah pelayanan medis di jam kerja
                    }
                }

                ManageSdmNew.saveData(dataSend, "iki-remunerasi/verifikasi-logbook-dokter").then(function (e) {
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ])
});