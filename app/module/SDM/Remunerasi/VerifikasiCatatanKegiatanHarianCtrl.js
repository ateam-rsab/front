define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('VerifikasiCatatanKegiatanHarianCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            let dataPegawai = JSON.parse(localStorage.getItem('pegawai'));

            $scope.init = () => {
                $scope.optGrid = {
                    pageable: true,
                    scrollable: true,
                    columns: [{
                        field: "namaIndikator",
                        title: "<h3>Indikator</h3>",
                        width: 120
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
                        field: "tglKegiatanFormat",
                        title: "<h3>Tanggal</h3>",
                        width: 50
                    }, {
                        field: "statusVerifikasi",
                        title: "<h3>Status</h3>",
                        width: 50
                    }, {
                        command: [{
                            text: "Verifikasi",
                            click: verifData,
                            imageClass: "k-icon k-i-pencil"
                        }, {
                            text: "Hapus",
                            click: hapusData,
                            imageClass: "k-icon k-i-pencil"
                        },],
                        title: "",
                        width: 100
                    }],
                }

                ManageSdmNew.getListData("iki-remunerasi/get-akses-pegawai-verifikasi-kinerja?pegawaiId=" + dataPegawai.id).then((res) => {
                    $scope.listPegawai = res.data.data;
                });
            }
            $scope.init();

            $scope.getJabatanByIdPegawai = (id) => {
                ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + id + "&pegawaiLoginId=" + dataPegawai.id).then((res) => {
                    $scope.listJabatan = res.data.data;
                })
            }

            $scope.getDataCatatanKegiatan = () => {
                if (!$scope.item.srcBulan) {
                    toastr.info("Harap pilih Bulan terlebih dahulu");
                    return;
                }

                if (!$scope.item.srcPegawai) {
                    toastr.info("Harap pilih Pegawai terlebih dahulu");
                    return;
                }

                if (!$scope.item.srcJabatan) {
                    toastr.info("Harap pilih Jabatan Pegawai terlebih dahulu");
                    return;
                }

                if ($scope.item.srcJabatan && !$scope.item.srcJabatan.isCariAkses) {
                    toastr.warning("Tidak ada akses untuk menampilkan data", "Peringatan")
                    return
                }

                $scope.isRouteLoading = true;
                let URL = "iki-remunerasi/get-catatan-kegiatan-harian?pegawaiId=" + ($scope.item.srcPegawai ? $scope.item.srcPegawai.id : "") + "&jabatanId=" + ($scope.item.srcJabatan ? $scope.item.srcJabatan.id : "") + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : '')

                ManageSdmNew.getListData(URL).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 50
                    });

                    $scope.isRouteLoading = false;
                })
            }

            $scope.simpanVerif = (data, method) => {
                let statusEnabled = method === "verif";

                let dataSave = {
                    namaKegiatan: data.namaIndikator,
                    capaian: data.hasil,
                    catatan: data.catatan,
                    statusVerifikasi: true,
                    logbookKinerja: {
                        noRec: data.logbookKinerja.noRec
                    },
                    kdProfile: 0,
                    statusEnabled: statusEnabled,
                    noRec: data.noRec
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-working-record").then(res => {
                    $scope.getDataCatatanKegiatan();
                })
            }

            function verifData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Catatan Kegiatan Sudah Terverifikasi", "Peringatan")
                    return
                }

                if (dateHelper.toTimeStamp(new Date()) > dataItem.tglBatasAkhirVerif) {
                    toastr.warning("Batas masa verifikasi sudah lewat", "Peringatan")
                    return
                }

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Verifikasi Catatan Kegiatan ' + dataItem.namaIndikator + '?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.simpanVerif(dataItem, "verif");
                }, function () {});
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Catatan Kegiatan Sudah Terverifikasi", "Peringatan")
                    return
                }

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Menghapus Catatan Kegiatan ' + dataItem.namaIndikator + '?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.simpanVerif(dataItem, "hapus");
                }, function () {});
            }

            $scope.$watch('item.srcPegawai', function (e) {
                if (!e) return;

                $scope.item.srcJabatan = null
            })
        }
    ])
});