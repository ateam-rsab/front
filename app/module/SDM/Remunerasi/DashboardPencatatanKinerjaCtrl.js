define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardPencatatanKinerjaCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.showDetailKuantitas = false;
            $scope.showDetailKualitas = false;
            $scope.showDetailPerilaku = false;
            $scope.showIsSingleJabatan = false;
            $scope.showSyaratKetentuan = false;

            $scope.item = {};

            $scope.dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            var listKategoriRemun = [1, 10, 14]
            if (listKategoriRemun.includes($scope.dataLogin.kategoryPegawai.id)) {
                $scope.showSyaratKetentuan = true
            }

            let getJabatanPegawai = () => {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.dataLogin.id).then((res) => {
                    $scope.showIsSingleJabatan = res.data.data.length === 1;

                    $scope.dataSingleJabatan = res.data.data[0].namaJabatan;
                    $scope.idJabatanSingle = res.data.data[0].id;

                    $scope.listJabatan = res.data.data;

                    $scope.item.bulan = new Date();

                    $scope.getDataDashboard();
                })
            }

            getJabatanPegawai();

            $scope.init = () => {
                $scope.optGrid = {
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
            }

            $scope.init();

            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.getDataDashboard = () => {
                let bulan = new Date();
                var bulanSF = bulan.getFullYear() + '-' + (bulan.getMonth() + 1)

                if ($scope.item.bulan) {
                    bulan = $scope.item.bulan
                }
                let date = dateHelper.toTimeStamp(bulan);
                var monthSF = bulan.getFullYear() + '-' + (bulan.getMonth() + 1)

                $scope.isBulanIni = false;
                if (monthSF == bulanSF) {
                    $scope.isBulanIni = true;
                }

                var jabatanId = ""
                if ($scope.showIsSingleJabatan) {
                    jabatanId = $scope.idJabatanSingle
                } else {
                    jabatanId = ($scope.item.jabatan ? $scope.item.jabatan.id : "")
                }

                ManageSdmNew.getListData("iki-remunerasi/get-dashboard-kinerja?pegawaiId=" + $scope.dataLogin.id
                    + "&jabatanId=" + jabatanId
                    + "&bulan=" + date).then((res) => {
                        $scope.dataDashboard = res.data.data;
                        // console.log($scope.dataDashboard);

                        $scope.dataDetailDashboardKinerja = {
                            kuantitas: res.data.data.listJenisIndikator[0],
                            kualitas: res.data.data.listJenisIndikator[1],
                            perilaku: res.data.data.listJenisIndikator[2],
                            persentaseCapaianKuntitas: res.data.data.listJenisIndikator[0].persenCapaianDibulatkan,
                            persentaseCapaianKualitas: res.data.data.listJenisIndikator[1].persenCapaianDibulatkan,
                            persentaseCapaianPerilaku: res.data.data.listJenisIndikator[2].persenCapaianDibulatkan,

                        };
                        // console.log($scope.dataDetailDashboardKinerja);
                    });
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

            $scope.showDetail = (data) => {
                $scope.labelDetail = data.namaIndikator

                let URL = "iki-remunerasi/catatan-kegiatan-harian-indikator?pegawaiId=" + data.idPegawai
                    + "&jabatanId=" + data.idJabatan
                    + "&bulan=" + dateHelper.toTimeStamp($scope.item.bulan)
                    + "&indikatorId=" + data.idIndikator

                ManageSdmNew.getListData(URL).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 5
                    });

                    $scope.popupDetail.open().center();
                })
            }

            $scope.addData = (data) => {
                $scope.dataAdd = data;
                $scope.labelData = data.namaIndikator;

                $scope.popupAdd.open().center();
            }

            $scope.simpanData = () => {
                let dataSave = {
                    namaKegiatan: $scope.item.namaKegiatan,
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
                    $scope.closepopUp();
                    $scope.getDataDashboard();
                })
            }

            $scope.resetForm = () => {
                $scope.item.namaKegiatan = null;
                $scope.item.hasilKegiatan = null;
                $scope.item.catatanKegiatan = null;
            }

            $scope.closepopUp = () => {
                $scope.resetForm();
                $scope.popupAdd.close();
            }
        }
    ])
});