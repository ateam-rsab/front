define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardPencatatanKinerjaCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.showDetailKuantitas = false;
            $scope.showDetailKualitas = false;
            $scope.showDetailPerilaku = false;
            $scope.showIsSingleJabatan = false;
            $scope.showIsSinglePegawai = false;
            $scope.showSyaratKetentuan = false;
            $scope.showInputHasil = true;
            $scope.endOfDay = new Date(new Date().setHours(23, 59, 59, 999))

            $scope.item = {};
            $scope.nakes = {};

            $scope.dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            var listKategoriRemun = [1, 10, 14]
            if (listKategoriRemun.includes($scope.dataLogin.kategoryPegawai.id)) {
                $scope.showSyaratKetentuan = true
            }

            let getListMaster = () => {
                $q.all([
                    ManageSdmNew.getListData("sdm/get-daftar-profesi?pegawaiId=" + $scope.dataLogin.id).then(function (res) {
                        $scope.listProfesi = res.data.data;
                        if (res.data.data.length == 1) {
                            $scope.nakes.profesi = res.data.data[0];
                        }
                    })
                ])
            }

            getListMaster();

            $scope.getListProduk = (profesiId) => {
                $scope.nakes.kegiatan = null;
                ManageSdmNew.getListData("service/list-generic/?view=ProdukNakes&select=id,namaProduk&criteria=statusEnabled,profesiId,kdProduk&values=true,(" + profesiId + "),(2)&order=namaProduk:asc").then(res => {
                    $scope.listProduk = res.data;
                })
            }

            let getListPegawai = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-pegawai-akses-kinerja?pegawaiId=" + $scope.dataLogin.id).then((res) => {
                    $scope.showIsSinglePegawai = res.data.data.length === 1;
                    $scope.listPegawaiLength = res.data.data.length;
                    $scope.listPegawai = res.data.data;
                    $scope.item.bulan = new Date();

                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].id == $scope.dataLogin.id) {
                            $scope.dataSinglePegawai = res.data.data[i].namaLengkap;
                            $scope.idPegawaiSingle = res.data.data[i].id;

                            $scope.item.pegawai = {
                                id: res.data.data[i].id,
                                namaLengkap: res.data.data[i].namaLengkap
                            }

                            break
                        }
                    }

                    if ($scope.item.pegawai) {
                        $scope.showIsSinglePegawai = true
                    }

                    $scope.getJabatanPegawai($scope.idPegawaiSingle);
                })
            }

            getListPegawai();

            $scope.getJabatanPegawai = (pegawaiId) => {
                $scope.showIsSinglePegawai = true

                if ($scope.item.pegawai) {
                    $scope.dataSinglePegawai = $scope.item.pegawai.namaLengkap;
                    $scope.idPegawaiSingle = $scope.item.pegawai.id;
                }

                ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + pegawaiId + "&pegawaiLoginId=" + $scope.dataLogin.id).then((res) => {
                    $scope.showIsSingleJabatan = res.data.data.length === 1;

                    $scope.dataSingleJabatan = res.data.data[0].namaJabatan;
                    $scope.idJabatanSingle = res.data.data[0].id;

                    $scope.listJabatan = res.data.data;

                    $scope.getDataDashboard();
                })
            }

            $scope.getJabatanPegawai($scope.dataLogin.id);

            $scope.init = () => {
                $scope.optGrid1 = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "tglKegiatanFormat",
                        title: "<h3>Tanggal</h3>",
                        width: 50
                    }, {
                        field: "namaKegiatan",
                        title: "<h3>Kegiatan</h3>",
                        width: 120
                    }, {
                        field: "hasil",
                        title: "<h3>Hasil</h3>",
                        width: 50
                    }, {
                        field: "satuanIndikator",
                        title: "<h3>Satuan</h3>",
                        width: 50
                    }, {
                        field: "catatan",
                        title: "<h3>Catatan</h3>",
                        width: 120
                    }, {
                        field: "statusVerifikasi",
                        title: "<h3>Status</h3>",
                        width: 50
                    }],
                }

                $scope.optGrid2 = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "tglPelayananFormatted",
                        title: "<h3>Tanggal</h3>",
                        width: 70
                    }, {
                        field: "namaProduk",
                        title: "<h3>Kegiatan</h3>",
                        width: 120
                    }, {
                        field: "namaProfesi",
                        title: "<h3>Profesi Pelaksana</h3>",
                        width: 70
                    }, {
                        field: "jumlah",
                        title: "<h3>Jumlah</h3>",
                        width: 30
                    }, {
                        field: "skor",
                        title: "<h3>Skor</h3>",
                        width: 30
                    }, {
                        field: "tSkor",
                        title: "<h3>Total<br/>Skor</h3>",
                        width: 30
                    }, {
                        field: "catatan",
                        title: "<h3>Catatan</h3>",
                        width: 150
                    }],
                }
            }

            $scope.init();

            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.getDataDashboard = () => {
                $scope.isRouteLoading = true;

                if ($scope.item.jabatan && !$scope.item.jabatan.isCariAkses) {
                    toastr.warning("Tidak ada akses untuk menampilkan data", "Peringatan")
                    $scope.isRouteLoading = false;
                    return
                }

                let bulan = new Date();
                var bulanSF = bulan.getFullYear() + '-' + (bulan.getMonth() + 1)

                if ($scope.item.bulan) {
                    bulan = $scope.item.bulan
                }
                let date = dateHelper.toTimeStamp(bulan);
                var monthSF = bulan.getFullYear() + '-' + (bulan.getMonth() + 1)

                $scope.isAksesWR1 = false;
                $scope.isAksesWR2 = false;
                $scope.isAksesWR3 = false;
                if (monthSF == bulanSF && $scope.dataLogin.id == $scope.idPegawaiSingle) {
                    $scope.isAksesWR1 = true;
                } else if (monthSF == bulanSF && $scope.dataLogin.id != $scope.idPegawaiSingle) {
                    $scope.isAksesWR2 = true;
                    $scope.isAksesWR3 = true;
                }

                if (listKategoriRemun.includes($scope.dataLogin.kategoryPegawai.id) && $scope.dataLogin.id == $scope.idPegawaiSingle) {
                    $scope.showSyaratKetentuan = true
                } else {
                    $scope.showSyaratKetentuan = false;
                }

                var pegawaiId = ""
                if ($scope.showIsSinglePegawai) {
                    pegawaiId = $scope.idPegawaiSingle
                } else {
                    pegawaiId = ($scope.item.pegawai ? $scope.item.pegawai.id : "")
                }

                var jabatanId = ""
                if ($scope.showIsSingleJabatan) {
                    jabatanId = $scope.idJabatanSingle
                } else {
                    jabatanId = ($scope.item.jabatan ? $scope.item.jabatan.id : "")
                }

                if (pegawaiId && jabatanId && date) {
                    ManageSdmNew.getListData("iki-remunerasi/get-dashboard-kinerja?pegawaiId=" + pegawaiId
                        + "&jabatanId=" + jabatanId
                        + "&bulan=" + date).then((res) => {
                            $scope.isRouteLoading = false;

                            $scope.dataDashboard = res.data.data.data[0];
                            // console.log($scope.dataDashboard);

                            $scope.dataDetailDashboardKinerja = {
                                kuantitas: res.data.data.data[0].listJenisIndikator[0],
                                kualitas: res.data.data.data[0].listJenisIndikator[1],
                                perilaku: res.data.data.data[0].listJenisIndikator[2],
                                persentaseCapaianKuntitas: res.data.data.data[0].listJenisIndikator[0].persenCapaianDibulatkan,
                                persentaseCapaianKualitas: res.data.data.data[0].listJenisIndikator[1].persenCapaianDibulatkan,
                                persentaseCapaianPerilaku: res.data.data.data[0].listJenisIndikator[2].persenCapaianDibulatkan,

                            };
                            // console.log($scope.dataDetailDashboardKinerja);
                        }, (error) => {
                            $scope.isRouteLoading = false;
                        });
                } else {
                    $scope.isRouteLoading = false;
                }
            }

            $scope.detailData = (state) => {
                switch (state) {
                    case "kuantitas":
                        $scope.showDetailKuantitas = !$scope.showDetailKuantitas;
                        $scope.showDetailKualitas = false;
                        $scope.showDetailPerilaku = false;
                        break;
                    case "kualitas":
                        $scope.showDetailKualitas = !$scope.showDetailKualitas;
                        $scope.showDetailKuantitas = false;
                        $scope.showDetailPerilaku = false;
                        break;
                    case "perilaku":
                        $scope.showDetailPerilaku = !$scope.showDetailPerilaku;
                        $scope.showDetailKuantitas = false;
                        $scope.showDetailKualitas = false;
                        break;
                    default:
                        break;
                }
            }

            let autoIndikator = [466, 350, 351, 357, 674]
            $scope.showDetail = (data) => {
                if (!autoIndikator.includes(data.idIndikator) && data.idIndikator != 678) {
                    $scope.labelDetail = data.namaIndikator

                    let URL = "iki-remunerasi/catatan-kegiatan-harian-indikator?pegawaiId=" + data.idPegawai
                        + "&jabatanId=" + data.idJabatan
                        + "&bulan=" + dateHelper.toTimeStamp($scope.item.bulan)
                        + "&indikatorId=" + data.idIndikator

                    ManageSdmNew.getListData(URL).then((res) => {
                        $scope.dataSource1 = new kendo.data.DataSource({
                            data: res.data.data,
                            pageSize: 5
                        });

                        $scope.popupDetail1.open().center();
                    })
                } else if (data.idIndikator == 466 || data.idIndikator == 678) {
                    $state.go('LihatLogbookSkorKinerja', { bulan: dateHelper.toTimeStamp($scope.item.bulan), pegawaiId: $scope.item.pegawai.id });
                } else {
                    toastr.info("Indikator ini dihitung otomatis", "Informasi")
                }
            }

            $scope.showListPegawai = () => {
                if ($scope.listPegawaiLength > 1) {
                    $scope.showIsSinglePegawai = false
                }

                $scope.item.jabatan = null
            }

            $scope.addData = (data) => {
                if (autoIndikator.includes(data.idIndikator)) {
                    toastr.info("Indikator ini dihitung otomatis", "Informasi")
                    return
                }

                $scope.dataAdd = data;
                $scope.labelData = data.namaIndikator;


                $scope.showInputHasil = data.satuanId === 11743 && (data.jenisIndikator === "Kualitas" || data.jenisIndikator === "Perilaku");
                // console.log($scope.showInputHasil);
                if (data.idIndikator == 678) {
                    $scope.resetForm2()
                    if ($scope.nakes.profesi) {
                        $scope.getListProduk($scope.nakes.profesi.id)
                    }
                    $scope.popupAdd2.open().center();
                } else {
                    $scope.resetForm1()
                    $scope.popupAdd1.open().center();
                }
            }

            $scope.simpanData1 = () => {
                let dataSave = {
                    namaKegiatan: $scope.item.namaKegiatan ? $scope.item.namaKegiatan : $scope.labelData,
                    capaian: $scope.item.hasilKegiatan,
                    catatan: $scope.item.catatanKegiatan,
                    statusVerifikasi: false,
                    logbookKinerja: {
                        noRec: $scope.dataAdd.noRec
                    },
                    kdProfile: 0,
                    statusEnabled: true
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-working-record").then(res => {
                    $scope.closepopUp1();
                    $scope.getDataDashboard();
                })
            }

            $scope.simpanData2 = () => {
                if (!$scope.nakes.jmlLayanan || $scope.nakes.jmlLayanan === 0) {
                    toastr.warning("Jumlah layanan belum diisi");
                    return;
                }

                let dataSave = {
                    kdProfile: 0,
                    statusEnabled: true,
                    produk: {
                        id: $scope.nakes.kegiatan.id
                    },
                    tglPelayanan: dateHelper.toTimeStamp($scope.nakes.tglPelayanan),
                    jumlah: $scope.nakes.jmlLayanan,
                    pegawai: {
                        id: $scope.item.pegawai.id
                    },
                    catatan: $scope.nakes.catatan
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-pelayanan-nakes").then(res => {
                    $scope.closepopUp2();
                    $scope.getDataDashboard();
                }, (error) => {
                    if (error.status == 400) {
                        toastr.error("Tanggal kegiatan harus diisi dengan tanggal di bulan berjalan", "Informasi")
                    }
                })
            }

            $scope.resetForm1 = () => {
                if ($scope.item) {
                    $scope.item.namaKegiatan = null
                    $scope.item.hasilKegiatan = null
                    $scope.item.catatanKegiatan = null
                } else {
                    $scope.item = undefined
                }
            }

            $scope.resetForm2 = () => {
                $scope.nakes = undefined
                $scope.listProduk = undefined
            }

            $scope.closepopUp1 = () => {
                $scope.resetForm1();
                $scope.popupAdd1.close();
            }

            $scope.closepopUp2 = () => {
                $scope.resetForm2();
                $scope.popupAdd2.close();
            }

            document.querySelector("#hasil").addEventListener("keypress", function (evt) {
                if (evt.which != 8 && evt.which != 0 && (evt.which > 31 && (evt.which != 46 && (evt.which < 48 || evt.which > 57)))) {
                    evt.preventDefault();
                }
            });

            $scope.$watch('item.bulan', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    $scope.getDataDashboard();
                }
            })

            $scope.$watch('item.jabatan', function (newVal, oldVal) {
                if (!newVal) return;
                if ((newVal && !oldVal) || (newVal && oldVal && newVal.id !== oldVal.id)) {
                    $scope.getDataDashboard();
                }
            })
        }
    ])
});