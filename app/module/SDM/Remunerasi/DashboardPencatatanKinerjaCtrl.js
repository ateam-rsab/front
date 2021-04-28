define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardPencatatanKinerjaCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.showDetailKuantitas = false;
            $scope.showDetailKualitas = false;
            $scope.showDetailPerilaku = false;
            $scope.showIsSingleJabatan = false;
            $scope.item = {};
            $scope.item.tanggal = new Date();
            $scope.now = new Date();
            $scope.disabledButtonAdd = true;
            $scope.dataLogin = JSON.parse(localStorage.getItem("pegawai"));

            let getJabatanPegawai = () => {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.dataLogin.id).then((res) => {
                    $scope.showIsSingleJabatan = res.data.data.length === 1;
                    $scope.dataSingleJabatan = res.data.data[0].namaJabatan;
                    $scope.idJabatanSingle = res.data.data[0].id;

                    $scope.listJabatan = res.data.data;

                    $scope.getDataDashboard();
                })
            }

            getJabatanPegawai();

            $scope.getDataDashboard = () => {
                let date = dateHelper.toTimeStamp($scope.item.tanggal);
                let awalBulan = new Date();
                awalBulan = new Date(awalBulan.getFullYear(), awalBulan.getMonth(), 1);
                awalBulan = dateHelper.toTimeStamp(awalBulan);
                console.log(awalBulan);
                $scope.disabledButtonAdd = date < awalBulan;
                console.log(date > awalBulan);
                var jabatanId = "";
                if ($scope.showIsSingleJabatan) {
                    jabatanId = $scope.idJabatanSingle;
                } else {
                    jabatanId = ($scope.item.jabatan ? $scope.item.jabatan.id : "")
                }
                ManageSdmNew.getListData("iki-remunerasi/get-dashboard-kinerja?pegawaiId=" + $scope.dataLogin.id + "&jabatanId=" + jabatanId + "&bulan=" + date).then((res) => {
                    $scope.dataDashboard = res.data.data;
                    console.log($scope.dataDashboard);

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