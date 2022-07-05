define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PenilaianKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = false;
            $scope.currentNilaiBobot = {};

            $scope.item = {};
            $scope.item.srcBulan = "";
            $scope.item.showJabatanHistori = false;

            $scope.subTotalBobotKualitas = 0;
            $scope.subTotalBobotKuantitas = 0;
            $scope.subTotalBobotPerilaku = 0;
            $scope.subTotalHasilKualitas = 0;
            $scope.subTotalHasilKuantitas = 0;
            $scope.subTotalHasilPerilaku = 0;

            $scope.nilaiIki = 0;
            $scope.totalBobot = 0;
            $scope.totalHasil = 0;
            $scope.kriteria = "-";

            $scope.nilaiMax = {
                kuantitas: 40,
                kualitas: 30,
                perilaku: 30
            }

            let dataPegawai = JSON.parse(localStorage.getItem('pegawai'));

            let columns = {
                kualitas: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200,
                    footerTemplate: "<span>Sub Total :</span>",
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    },
                }, {
                    field: "bobot",
                    title: "<h3>Bobot<br/>(%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalBobotKualitas}}</span>",
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "realisasi",
                    title: "<h3>Realisasi</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "satuan",
                    title: "<h3>Satuan</h3>",
                    width: 50
                }, {
                    field: "nilai",
                    title: "<h3>Nilai</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "hasil",
                    title: "<h3>Hasil<br/>(%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalHasilKualitas}}</span>",
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }],
                kuantitas: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200,
                    footerTemplate: "<span>Sub Total :</span>",
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "bobot",
                    title: "<h3>Bobot<br/>(%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalBobotKuantitas}}</span>",
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "realisasi",
                    title: "<h3>Realisasi</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "satuan",
                    title: "<h3>Satuan</h3>",
                    width: 50
                }, {
                    field: "nilai",
                    title: "<h3>Nilai</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "hasil",
                    title: "<h3>Hasil<br/>(%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalHasilKuantitas}}</span>",
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }],
                perilaku: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200,
                    footerTemplate: "<span>Sub Total :</span>",
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "bobot",
                    title: "<h3>Bobot<br/>(%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalBobotPerilaku}}</span>",
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "realisasi",
                    title: "<h3>Realisasi</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "satuan",
                    title: "<h3>Satuan</h3>",
                    width: 50
                }, {
                    field: "nilai",
                    title: "<h3>Nilai</h3>",
                    width: 50,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "hasil",
                    title: "<h3>Hasil<br/>(%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalHasilPerilaku}}</span>",
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    },
                    footerAttributes: {
                        class: "table-footer-cell",
                        style: "text-align: right;"
                    }
                }]
            }

            $scope.optGridKontrakKinerjaKualitas = {
                pageable: true,
                scrollable: true,
                columns: columns.kualitas
            }

            $scope.optGridKontrakKinerjaKuantitas = {
                pageable: true,
                scrollable: true,
                columns: columns.kuantitas
            }

            $scope.optGridKontrakKinerjaPerilaku = {
                pageable: true,
                scrollable: true,
                columns: columns.perilaku
            }

            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.getAllData = () => {
                let pageSize = 20;

                if (!$scope.item.srcBulan) {
                    toastr.info("Harap pilih Bulan terlebih dahulu");
                    return;
                }

                if (!$scope.item.pegawai) {
                    toastr.info("Harap pilih Pegawai terlebih dahulu");
                    return;
                }

                if (!$scope.item.jabatan) {
                    toastr.info("Harap pilih Jabatan Pegawai terlebih dahulu");
                    return;
                }

                if ($scope.item.jabatan && !$scope.item.jabatan.isCariAkses && !$scope.isPegawaiSDM) {
                    toastr.warning("Tidak ada akses untuk menampilkan data", "Peringatan")
                    return
                }

                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("iki-remunerasi/get-penilaian-kinerja-individu?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : "")
                    + "&jabatanId=" + ($scope.item.jabatan ? $scope.item.jabatan.id : "")
                    + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : "")).then((res) => {
                        let tempNilaiBobotKualitas = 0, tempNilaiBobotKuantitas = 0, tempNilaiBobotPerilaku = 0;

                        $scope.nilaiIki = res.data.data.iki;
                        $scope.totalBobot = res.data.data.tBobot;
                        $scope.totalHasil = res.data.data.tHasil;
                        $scope.kriteria = res.data.data.kriteria;

                        $scope.subTotalBobotKualitas = res.data.data.kualitas.stBobot;
                        $scope.subTotalHasilKualitas = res.data.data.kualitas.stHasil;

                        $scope.subTotalBobotKuantitas = res.data.data.kuantitas.stBobot;
                        $scope.subTotalHasilKuantitas = res.data.data.kuantitas.stHasil;

                        $scope.subTotalHasilPerilaku = res.data.data.perilaku.stHasil;
                        $scope.subTotalBobotPerilaku = res.data.data.perilaku.stBobot;

                        for (let i = 0; i < res.data.data.kualitas.detail.length; i++) {
                            tempNilaiBobotKualitas += res.data.data.kualitas.detail[i].bobot;
                            res.data.data.kualitas.detail[i].jenisIndikator = "kualitas";
                        }

                        for (let ii = 0; ii < res.data.data.kuantitas.detail.length; ii++) {
                            tempNilaiBobotKuantitas += res.data.data.kuantitas.detail[ii].bobot;
                            res.data.data.kuantitas.detail[ii].jenisIndikator = "kuantitas";
                        }

                        for (let iii = 0; iii < res.data.data.perilaku.detail.length; iii++) {
                            tempNilaiBobotPerilaku += res.data.data.perilaku.detail[iii].bobot;
                            res.data.data.perilaku.detail[iii].jenisIndikator = "perilaku";
                        }

                        $scope.currentNilaiBobot.kualitas = tempNilaiBobotKualitas;
                        $scope.currentNilaiBobot.perilaku = tempNilaiBobotPerilaku;
                        $scope.currentNilaiBobot.kuantitas = tempNilaiBobotKuantitas;

                        $scope.dataSourceKontrakKinerja = {
                            kualitas: new kendo.data.DataSource({
                                data: res.data.data.kualitas.detail,
                                pageSize: pageSize
                            }),
                            kuantitas: new kendo.data.DataSource({
                                data: res.data.data.kuantitas.detail,
                                pageSize: pageSize
                            }),
                            perilaku: new kendo.data.DataSource({
                                data: res.data.data.perilaku.detail,
                                pageSize: pageSize
                            })
                        }

                        $scope.isRouteLoading = false;
                    })
            }

            $scope.getBobotJenisByJabatan = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-bobot-jenis-by-jabatan?periode=" + dateHelper.toTimeStamp($scope.item.srcBulan) + "&jabatanId=" + ($scope.item.jabatan ? $scope.item.jabatan.id : "")).then((res) => {
                    // console.log(res.data.data)
                    if (res.data.data.length != 0) {
                        $scope.nilaiMax = {
                            kuantitas: res.data.data[0],
                            kualitas: res.data.data[1],
                            perilaku: res.data.data[2]
                        }
                    }
                })
            }

            $scope.init = () => {
                $q.all([
                    ManageSdmNew.getListData("iki-remunerasi/get-pegawai-akses-kinerja?pegawaiId=" + dataPegawai.id),
                    ManageSdmNew.getListData("pegawai/get-pegawai-sdm-for-cred")
                ]).then(function (res) {
                    $scope.listPegawai = res[0].data.data;

                    $scope.getJabatanByIdPegawai(dataPegawai.id)

                    $scope.isPegawaiSDM = false;
                    for (var i = 0; i < res[1].data.data.data.length; i++) {
                        if (res[1].data.data.data[i] == modelItem.getPegawai().id) {
                            $scope.isPegawaiSDM = true;
                            break
                        }
                    };
                }, (error) => {
                    throw (error);
                })
            }

            $scope.init();

            $scope.getJabatanByIdPegawai = (pegawaiId) => {
                ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + pegawaiId + "&pegawaiLoginId=" + dataPegawai.id).then((res) => {
                    $scope.listJabatan = res.data.data;
                })
            }

            $scope.$watch('item.srcBulan', function (e) {
                if (!e) return;

                $scope.updateListJabatan($scope.item.pegawai ? $scope.item.pegawai.id : undefined);
            })

            $scope.$watch('item.pegawai', function (e) {
                if (!e) return;

                $scope.item.jabatan = null;
                $scope.updateListJabatan($scope.item.pegawai ? $scope.item.pegawai.id : undefined);
            })

            $scope.updateListJabatan = (id) => {
                if ((!$scope.item || !$scope.item.srcBulan) && $scope.item.showJabatanHistori) {
                    $scope.item.showJabatanHistori = false;

                    toastr.warning("Harap pilih Bulan terlebih dahulu", "Peringatan");
                    return;
                }

                if (!id && $scope.item.showJabatanHistori) {
                    $scope.item.showJabatanHistori = false;

                    toastr.warning("Harap pilih Pegawai terlebih dahulu", "Peringatan");
                    return;
                }

                if ($scope.item.showJabatanHistori) {
                    $scope.item.srcJabatan = undefined;
                    $scope.listJabatan = [];
                    ManageSdmNew.getListData("pegawai/jabatan-logbook-kinerja?pegawaiId=" + id + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : '')).then((res) => {
                        $scope.listJabatan = res.data.data;
                    });
                } else {
                    $scope.item.srcJabatan = undefined;
                    $scope.listJabatan = [];
                    ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + id + "&pegawaiLoginId=" + dataPegawai.id).then((res) => {
                        $scope.listJabatan = res.data.data;
                    });
                }
            }
        }
    ])
});