define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookSkorDokterCtrl', ['$q', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.isRouteLoading = false;
            $scope.monthly = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };
            $scope.dataSourceDJK = [];
            $scope.dataSourceLJK = [];

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
            }];

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

                for (let i = 0; i < $scope.daysInMonth; i++) {
                    $scope.headerTable.push({
                        width: "20px",
                        title: i + 1
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

                $scope.isRouteLoading = true;

                if (!$scope.item.pegawai) {
                    toastr.info("Harap pilih pegawai terlebih dahulu");
                    $scope.isRouteLoading = false;
                    return;
                }

                let dataTempDJK = [];
                ManageSdmNew.getListData(`iki-remunerasi/get-logbook-skoring-dokter-jam-kerja?bulan=${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}&pegawaiId=${$scope.item.pegawai.id}`).then(res => {
                    let periode = new Date($scope.item.periode), bln = periode.getMonth(), thn = periode.getFullYear();

                    $scope.grandTotalDJK = 0;
                    $scope.grandJumlahDJK = 0;
                    for (let i = 0; i < res.data.data.length; i++) {
                        dataTempDJK.push({
                            namaIndikator: res.data.data[i].namaIndikator,
                            indikatorId: res.data.data[i].indikatorId,
                            namaProduk: res.data.data[i].namaProduk,
                            jenisPetugasId: res.data.data[i].jenisPetugasId,
                            produkId: res.data.data[i].produkId,
                            skor: res.data.data[i].skor,
                            totalSkor: res.data.data[i].tSkor,
                            jumlah: res.data.data[i].jumlah,
                            dataDetail: []
                        });

                        for (let ii = 0; ii < $scope.daysInMonth; ii++) {
                            let frmtBln = bln + 1 > 9 ? bln + 1 : '0' + (bln + 1), frmtDate = ii + 1 > 9 ? ii + 1 : '0' + (ii + 1);
                            dataTempDJK[i].dataDetail.push({
                                tgl: ii + 1,
                                tglPelayanan: `${thn}-${frmtBln}-${frmtDate}`,
                                jmlLayanan: ''
                            })
                        }
                    }

                    for (let i = 0; i < res.data.data.length; i++) {
                        for (let ii = 0; ii < res.data.data[i].detail.length; ii++) {
                            for (let iii = 0; iii < dataTempDJK[i].dataDetail.length; iii++) {
                                let tglPelayanan = res.data.data[i].detail[ii].tglPelayanan.split('-');

                                if (parseInt(tglPelayanan[2]) === iii + 1) {
                                    dataTempDJK[i].dataDetail[iii].jmlLayanan = res.data.data[i].detail[ii].jumlah;
                                    break;
                                }
                            }
                        }
                    }

                    let groupedJSON = groupJSON(dataTempDJK, 'namaIndikator');
                    let formattedJSON = Object.keys(groupedJSON).map((key) => [(key), groupedJSON[key]]);
                    let dataGet = [];

                    for (let i = 0; i < formattedJSON.length; i++) {
                        dataGet.push({
                            label: formattedJSON[i][0],
                            detailDJK: [],
                            subTotalSkor: 0,
                            subJumlah: 0,
                            subSkor: 0
                        })

                        for (let ii = 0; ii < formattedJSON[i][1].length; ii++) {
                            dataGet[i].detailDJK.push(formattedJSON[i][1][ii]);
                            dataGet[i].subSkor += formattedJSON[i][1][ii].skor;
                            dataGet[i].subJumlah += formattedJSON[i][1][ii].jumlah;
                            dataGet[i].subTotalSkor += formattedJSON[i][1][ii].totalSkor;
                        }
                        dataGet[i].subTotalSkor = parseFloat(dataGet[i].subTotalSkor.toFixed(2));

                        $scope.grandJumlahDJK = dataGet[i].subJumlah + $scope.grandJumlahDJK;
                        $scope.grandTotalDJK = dataGet[i].subTotalSkor + $scope.grandTotalDJK;
                    }
                    $scope.grandTotalDJK = parseFloat($scope.grandTotalDJK.toFixed(2));

                    $scope.dataSourceDJK = dataGet;
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });

                let dataTempLJK = [];
                ManageSdmNew.getListData(`iki-remunerasi/get-logbook-skoring-dokter-luar-jam-kerja?bulan=${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}&pegawaiId=${$scope.item.pegawai.id}`).then(res => {
                    let periode = new Date($scope.item.periode), bln = periode.getMonth(), thn = periode.getFullYear();

                    $scope.grandTotalLJK = 0;
                    $scope.grandJumlahLJK = 0;
                    for (let i = 0; i < res.data.data.length; i++) {
                        dataTempLJK.push({
                            namaIndikator: res.data.data[i].namaIndikator,
                            indikatorId: res.data.data[i].indikatorId,
                            namaProduk: res.data.data[i].namaProduk,
                            jenisPetugasId: res.data.data[i].jenisPetugasId,
                            produkId: res.data.data[i].produkId,
                            skor: res.data.data[i].skor,
                            totalSkor: res.data.data[i].tSkor,
                            jumlah: res.data.data[i].jumlah,
                            dataDetail: []
                        });

                        for (let ii = 0; ii < $scope.daysInMonth; ii++) {
                            let frmtBln = bln + 1 > 9 ? bln + 1 : '0' + (bln + 1), frmtDate = ii + 1 > 9 ? ii + 1 : '0' + (ii + 1);
                            dataTempLJK[i].dataDetail.push({
                                tgl: ii + 1,
                                tglPelayanan: `${thn}-${frmtBln}-${frmtDate}`,
                                jmlLayanan: ''
                            })
                        }
                    }

                    for (let i = 0; i < res.data.data.length; i++) {
                        for (let ii = 0; ii < res.data.data[i].detail.length; ii++) {
                            for (let iii = 0; iii < dataTempLJK[i].dataDetail.length; iii++) {
                                let tglPelayanan = res.data.data[i].detail[ii].tglPelayanan.split('-');

                                if (parseInt(tglPelayanan[2]) === iii + 1) {
                                    dataTempLJK[i].dataDetail[iii].jmlLayanan = res.data.data[i].detail[ii].jumlah;
                                    break;
                                }
                            }
                        }
                    }

                    let groupedJSON = groupJSON(dataTempLJK, 'namaIndikator');
                    let formattedJSON = Object.keys(groupedJSON).map((key) => [(key), groupedJSON[key]]);
                    let dataGet = [];

                    for (let i = 0; i < formattedJSON.length; i++) {
                        dataGet.push({
                            label: formattedJSON[i][0],
                            detailLJK: [],
                            subTotalSkor: 0,
                            subJumlah: 0,
                            subSkor: 0
                        })

                        for (let ii = 0; ii < formattedJSON[i][1].length; ii++) {
                            dataGet[i].detailLJK.push(formattedJSON[i][1][ii]);
                            dataGet[i].subSkor += formattedJSON[i][1][ii].skor;
                            dataGet[i].subJumlah += formattedJSON[i][1][ii].jumlah;
                            dataGet[i].subTotalSkor += formattedJSON[i][1][ii].totalSkor;
                        }
                        dataGet[i].subTotalSkor = parseFloat(dataGet[i].subTotalSkor.toFixed(2));

                        $scope.grandJumlahLJK = dataGet[i].subJumlah + $scope.grandJumlahLJK;
                        $scope.grandTotalLJK = dataGet[i].subTotalSkor + $scope.grandTotalLJK;
                    }
                    $scope.grandTotalLJK = parseFloat($scope.grandTotalLJK.toFixed(2));

                    $scope.dataSourceLJK = dataGet;
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            }

            $scope.detailTindakan = (ds, detail, data, jenisLogbook) => {
                if (data.jmlLayanan === "") {
                    toastr.info("Tidak ada data");
                    return;
                }

                if (jenisLogbook == 1) {
                    $scope.isDJK = true;
                    ManageSdmNew.getListData("iki-remunerasi/get-detail-pasien-dokter-jam-kerja?pegawaiId=" + $scope.item.pegawai.id + "&indikatorId=" + detail.indikatorId + "&produkId=" + detail.produkId + "&tglPelayanan=" + data.tglPelayanan + "&jenisPetugasId=" + detail.jenisPetugasId + "&skor=" + detail.skor).then((res) => {
                        $scope.dataSourceDetailTindakanDJK = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 5
                        })
                        $scope.popupDetail.open().center();
                    })
                } else if (jenisLogbook == 2) {
                    $scope.isDJK = false;
                    ManageSdmNew.getListData("iki-remunerasi/get-detail-pasien-dokter-luar-jam-kerja?pegawaiId=" + $scope.item.pegawai.id + "&indikatorId=" + detail.indikatorId + "&produkId=" + detail.produkId + "&tglPelayanan=" + data.tglPelayanan + "&jenisPetugasId=" + detail.jenisPetugasId + "&skor=" + detail.skor).then((res) => {
                        $scope.dataSourceDetailTindakanLJK = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 5
                        })
                        $scope.popupDetail.open().center();
                    })
                }

            }
        }
    ])
});