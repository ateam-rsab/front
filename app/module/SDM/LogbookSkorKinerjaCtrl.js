define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookSkorKinerjaCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.isNov2022=true;
            $scope.dataSource = [];
            $scope.listKelompokJabatanId = [];
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = false;
            $scope.isNakesLain = false;
            $scope.namaJenisPegawai = "";
            let baseUrl = "";
            let urlDetail = "";
            let indikatorId = "";

            $scope.monthly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };

            $scope.pegawaiLogin = modelItem.getPegawai();
            let sotk = JSON.parse(localStorage.getItem('sotk_coor'));

            $scope.columnGridDokter = [{
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
                "width": "20%"
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
                "width": "30%"
            }];

            $scope.columnGridNakes = [{
                "field": "namaProduk",
                "title": "Nama Layanan",
                "width": "30%"
            }, {
                "field": "namaRuangan",
                "title": "Nama Ruangan",
                "width": "30%"
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
            }];

            $scope.columnGridNakesNonPasien = [{
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
            }];

            let groupJSON = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };

            let getHeaderTable = () => {
                $scope.headerTable = [];
                var dt = $scope.periode ? new Date($scope.periode) : new Date();
                var month = dt.getMonth() + 1;
                var year = dt.getFullYear();
                $scope.daysInMonth = new Date(year, month, 0).getDate();

                for (let i = 0; i < $scope.daysInMonth; i++) {
                    $scope.headerTable.push({
                        width: "20px",
                        title: i + 1
                    });
                }
            }

            $scope.getDataLogbook = () => {
                $scope.isRouteLoading = true;
                $scope.dataSource = [];

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

                if(dateHelper.toTimeStamp($scope.item.periode)=='1669741200000'){
                    $scope.isDtMain=true;
                    $scope.isNov2022=false;
                    $scope.isRouteLoading = false;
                }else{
                    $scope.isDtMain=false;
                    $scope.isNov2022=true;
                    $scope.afterGetDataLogBook();
                    $scope.isRouteLoading = false;
                }
               
            }

            $scope.afterGetDataLogBook=()=>{
                ManageSdmNew.getListData("sdm/get-akses-logbook-skor?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : $scope.pegawaiLogin.id)).then((res) => {
                    switch (res.data.data.kategori) {
                        case 3:
                        case 4:
                            if (res.data.data.subKategori == 1) {
                                baseUrl = "get-logbook-skoring-farmakologi";
                                urlDetail = "get-detail-logbook-skoring-farmakologi";
    
                                indikatorId = 758;
                                $scope.namaJenisPegawai = "Dokter Farmakologi";
                                $scope.isNakesLain = false;
                                break;
                            } else {
                                baseUrl = "get-logbook-skoring-dokter-jam-kerja";
                                urlDetail = "get-detail-pasien-dokter-jam-kerja";
    
                                indikatorId = 466;
                                $scope.namaJenisPegawai = "Dokter";
                                $scope.isNakesLain = false;
                                break;
                            }
                        case 5:
                            baseUrl = "get-logbook-skoring-perawat";
                            urlDetail = "get-detail-logbook-skoring-perawat";

                            indikatorId = 712;
                            $scope.namaJenisPegawai = "Perawat";
                            $scope.isNakesLain = false;
                            break;
                        case 6:
                            baseUrl = "get-logbook-skoring-nakes";
                            urlDetail = "get-detail-logbook-skoring-nakes";

                            indikatorId = 678;
                            $scope.namaJenisPegawai = "Tenaga Kesehatan Lain";
                            $scope.isNakesLain = true;
                            break;
                        default:
                            toastr.info("Saat ini fitur logbook skor kinerja hanya untuk dokter, perawat, dan penunjang medik");
                            $scope.isRouteLoading = false;
                            return;
                    }

                    let dataTemp = [];
                    ManageSdmNew.getListData(`iki-remunerasi/${baseUrl}?bulan=${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}&pegawaiId=${$scope.item.pegawai.id}`).then(res => {
                        let periode = new Date($scope.item.periode), bln = periode.getMonth(), thn = periode.getFullYear();

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
                                kdProduk: res.data.data[i].kdProduk ? res.data.data[i].kdProduk : undefined,
                                jumlah: res.data.data[i].jumlah,
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

                        let groupedJSON = groupJSON(dataTemp, 'namaIndikator');
                        let formattedJSON = Object.keys(groupedJSON).map((key) => [(key), groupedJSON[key]]);
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
                                formattedJSON[i][1][ii].jenisPelayanan = formattedJSON[i][1][ii].kdProduk === 1 ? "Pasien" : "Non Pasien";
                                dataGet[i].detail.push(formattedJSON[i][1][ii]);
                                dataGet[i].subSkor += formattedJSON[i][1][ii].skor;
                                dataGet[i].subJumlah += formattedJSON[i][1][ii].jumlah;
                                dataGet[i].subTotalSkor += formattedJSON[i][1][ii].totalSkor;
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
                    })
                })

                $scope.periode = $scope.item.periode;
                getHeaderTable();
            }
            let load = () => {
                ManageSdmNew.getListData("sdm/get-akses-logbook-skor?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : $scope.pegawaiLogin.id)).then((res) => {
                    switch (res.data.data.kategori) {
                        case 3:
                        case 4:
                            if (res.data.data.subKategori == 1) {
                                baseUrl = "get-logbook-skoring-farmakologi";
                                urlDetail = "get-detail-logbook-skoring-farmakologi";
    
                                indikatorId = 758;
                                $scope.namaJenisPegawai = "Dokter Farmakologi";
                                $scope.isNakesLain = false;
                                break;
                            } else {
                                baseUrl = "get-logbook-skoring-dokter-jam-kerja";
                                urlDetail = "get-detail-pasien-dokter-jam-kerja";
    
                                indikatorId = 466;
                                $scope.namaJenisPegawai = "Dokter";
                                $scope.isNakesLain = false;
                                break;
                            }
                        case 5:
                            baseUrl = "get-logbook-skoring-perawat";
                            urlDetail = "get-detail-logbook-skoring-perawat";

                            indikatorId = 712;
                            $scope.namaJenisPegawai = "Perawat";
                            $scope.isNakesLain = false;
                            break;
                        case 6:
                            baseUrl = "get-logbook-skoring-nakes";
                            urlDetail = "get-detail-logbook-skoring-nakes";

                            indikatorId = 678;
                            $scope.namaJenisPegawai = "Tenaga Kesehatan Lain";
                            $scope.isNakesLain = true;
                            break;
                        default:
                            break;
                    }
                })
            }

            let init = () => {
                for (var index = 0; index < sotk.length; index++) {
                    var item = sotk[index];
                    if (item.x == 65) {
                        $scope.listKelompokJabatanId.push(3, 4, 5, 6);
                    } else if (item.x == 58 || item.x == 59 || item.x == 60 || item.x == 61 || item.x == 62 || item.x == 63 || item.x == 82) {
                        $scope.listKelompokJabatanId.push(3, 4);
                    } else if (item.x == 30 || item.x == 31 || item.x == 32 || item.x == 33) {
                        $scope.listKelompokJabatanId.push(5);
                    } else if (item.x == 35 || item.x == 36 || item.x == 37 || item.x == 38 || item.x == 40 || item.x == 41 || item.x == 46 || item.x == 48 || item.x == 57) {
                        $scope.listKelompokJabatanId.push(6);
                    } else if (item.x == 71) {
                        $scope.listKelompokJabatanId.push(5, 6);
                    }
                }

                load();

                ManageSdmNew.getListData(`iki-remunerasi/get-pegawai-akses-kinerja?pegawaiId=` + $scope.pegawaiLogin.id + `&listKelompokJabatanId=` + $scope.listKelompokJabatanId).then(res => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (($state.params.pegawaiId
                            && res.data.data[i].id == $state.params.pegawaiId)) {
                            $scope.item.pegawai = res.data.data[i];

                            break;
                        }
                        
                    }
                    if (!$scope.item.pegawai) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            if (res.data.data[i].id == $scope.pegawaiLogin.id) {
                                $scope.item.pegawai = res.data.data[i];
    
                                break;
                            }
                        }
                    }
                    $scope.listPegawai = res.data.data;

                    if ($state.params.bulan) {
                        $scope.item.periode = new Date(Number($state.params.bulan));
                    }

                    if ($scope.item.periode && $scope.item.pegawai) {
                        $scope.getDataLogbook();
                    }
                })

                $scope.periode = $scope.item.periode;
                getHeaderTable();
            }

            init();

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
                        cells: [{ value: "Logbook Skor Kinerja " + $scope.item.pegawai.namaLengkap + " Periode " + dateHelper.toMonth(month.getMonth()), }]
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
                            title: "Logbook Skor Kinerja",
                            // Rows of the sheet
                            rows: rows
                        }]
                    });

                    // save the file as Excel file with extension xlsx
                    kendo.saveAs({
                        dataURI: workbook.toDataURL(),
                        fileName: "logbook-skor-kinerja" + $scope.item.pegawai.namaLengkap + "-periode=" + dateHelper.toMonth(month.getMonth()) + ".xlsx"
                    });
                });
            };

            $scope.detailTindakan = (ds, detail, data) => {
                $scope.isRouteLoading = true;

                if (data.jmlLayanan === "") {
                    toastr.info("Tidak ada data");

                    $scope.isRouteLoading = false;
                    return;
                }

                if (detail.kdProduk && detail.kdProduk == 1) {
                    $scope.popUpDetailId = 2;
                } else if (detail.kdProduk && detail.kdProduk == 2) {
                    $scope.popUpDetailId = 3;
                } else if ($scope.item.pegawai.jenisPegawaiId == 1) {
                    $scope.popUpDetailId = 1;
                } else {
                    $scope.popUpDetailId = 4;
                }

                ManageSdmNew.getListData(`iki-remunerasi/${urlDetail}?pegawaiId=${$scope.item.pegawai.id}&indikatorId=${detail.indikatorId}&produkId=${detail.produkId}&tglPelayanan=${data.tglPelayanan}&jenisPetugasId=${detail.jenisPetugasId}&skor=${detail.skor}`).then((res) => {
                    $scope.dataSourceDetailTindakan = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    })
                    $scope.popupDetail.open().center();

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }

            $scope.verify = function () {
                $scope.isRouteLoading = true;

                if (!$scope.item.pegawai.isGranted) {
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
                        "id": indikatorId
                    }
                }
                ManageSdmNew.saveData(dataSend, "iki-remunerasi/verifikasi-logbook-skor").then(function (e) {
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }
        }
    ])
});