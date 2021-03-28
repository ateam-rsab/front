define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KontrakKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.indikator = {};
            $scope.item.srcBulan = "";

            let dataLogin = JSON.parse(localStorage.getItem('pegawai'));

            $scope.listJenisIndikator = [{
                "id": 1,
                "jenisIndikator": "Kuantitas"
            }, {
                "id": 2,
                "jenisIndikator": "Kualitas"
            }, {
                "id": 3,
                "jenisIndikator": "Perilaku"
            }];

            $scope.optGridKontrakKinerja = {
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200
                }, {
                    field: "satuanIndikator",
                    title: "<h3>Satuan Indikator</h3>",
                    width: 50
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50
                }, {
                    field: "bobot",
                    title: "<h3>Bobot</h3>",
                    width: 50
                }, {
                    field: "statusVerifikasi",
                    title: "<h3>Status</h3>",
                    width: 80
                }, {
                    command: [{
                        text: "Edit",
                        click: editData,
                        imageClass: "k-icon k-i-pencil"
                    }, {
                        text: "Hapus",
                        click: confirmHapus,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 100
                }],
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
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-kontrak-kinerja?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : "") + "&jabatanId=" + ($scope.item.jabatan ? $scope.item.jabatan.id : "") + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : "")).then((res) => {
                    $scope.dataSourceKontrakKinerja = {
                        kualitas: new kendo.data.DataSource({
                            data: res.data.data.Kualitas,
                            pageSize: pageSize
                        }),
                        kuantitas: new kendo.data.DataSource({
                            data: res.data.data.Kuantitas,
                            pageSize: pageSize
                        }),
                        perilaku: new kendo.data.DataSource({
                            data: res.data.data.Perilaku,
                            pageSize: pageSize
                        })
                    }

                    $scope.isRouteLoading = false;
                })
            }

            $scope.init = () => {
                $q.all([
                    ManageSdmNew.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,kategoryPegawaiId&values=true,(1;10;14)&order=namaLengkap:asc"),
                    ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=id:asc"),
                    ManageSdmNew.getListData("pegawai/get-pegawai-sdm-for-cred")
                ]).then(function (res) {
                    $scope.listPegawai = []
                    $scope.isPegawaiSDM = false
                    $scope.listDataSatuanIndikator = res[1].data;
                    for (var i = 0; i < res[2].data.data.data.length; i++) {
                        if (res[2].data.data.data[i] == modelItem.getPegawai().id) {
                            $scope.isPegawaiSDM = true;
                            break
                        }
                    };

                    if (!$scope.isPegawaiSDM) {
                        $scope.item.pegawai = {
                            id: dataLogin.id,
                            namaLengkap: dataLogin.namaLengkap
                        }
                        $scope.listPegawai.push($scope.item.pegawai)

                        $scope.getJabatanByIdPegawai()
                    } else {
                        $scope.listPegawai = res[0].data;
                    }
                }, (error) => {
                    throw (error);
                })
            }

            $scope.init();

            $scope.getIndikatorKerja = (id) => {
                ManageSdmNew.getListData("service/list-generic/?view=IndikatorKinerja&select=id,namaIndikator&criteria=jenisIndikator,statusEnabled,statusVerifikasi&values=" + id + ",true,true&order=namaIndikator:asc").then((res) => {
                    $scope.listIndikatorKinerja = res.data;
                })
            }

            $scope.getJabatanByIdPegawai = () => {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + $scope.item.pegawai.id).then((res) => {
                    $scope.listJabatan = res.data.data;
                })
            }

            $scope.tambahData = () => {
                $scope.item.jabatan = null;
                $scope.item.pegawai = null;
                $scope.reset();
                $scope.popupTambah.open().center();
            }

            $scope.tambahIndikator = () => {
                $scope.item.pegawai = {
                    id: dataLogin.id,
                    namaLengkap: dataLogin.namaLengkap
                }

                $scope.getJabatanByIdPegawai();
                $scope.popupTambahIndikator.open().center();
            }

            $scope.simpanPengajuanIndikator = () => {
                let dataSave = {
                    bulan: dateHelper.toTimeStamp($scope.indikator.bulan),
                    target: $scope.indikator.target,
                    bobot: $scope.indikator.bobot,
                    pegawai: {
                        id: dataLogin.id
                    },
                    jabatan: {
                        id: $scope.indikator.jabatan.id
                    },
                    indikatorKinerja: {
                        namaIndikator: $scope.indikator.indikatorKerja.namaIndikator,
                        satuanIndikator: {
                            id: $scope.indikator.satuanIndikator.id
                        },
                        jenisIndikator: $scope.indikator.jenisIndikator.id,
                        statusVerifikasi: false
                    },
                    statusVerifikasi: false
                }
                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-pengajuan-kontrak-kinerja").then(res => {
                    $scope.resetDataPengajuan();
                    $scope.closePopUpPengajuan();
                })
            }

            $scope.closePopUpPengajuan = () => {
                $scope.popupTambahIndikator.close();
            }

            $scope.resetDataPengajuan = () => {
                $scope.indikator.target = null;
                $scope.indikator.bobot = null;
                $scope.indikator.jabatan = null;

                $scope.indikator.indikatorKerja = null;
                $scope.indikator.jenisIndikator = null;
                $scope.indikator.satuanIndikator = null;
            }

            $scope.simpanData = (method) => {
                let statusEnabled = method === 'save' || method === 'update';
                let dataSave = {
                    bulan: dateHelper.toTimeStamp($scope.item.srcBulan),
                    target: $scope.item.target,
                    bobot: $scope.item.bobot,
                    statusVerifikasi: $scope.item.statusVerif ? true : false,
                    pegawai: {
                        id: $scope.item.pegawai.id
                    },
                    jabatan: {
                        id: $scope.item.jabatan.id
                    },
                    indikatorKinerja: {
                        id: $scope.item.indikatorKerja.id
                    },
                    statusEnabled: statusEnabled,
                    kdProfile: 0
                }

                if ($scope.norecData) {
                    dataSave.noRec = $scope.norecData;
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-kontrak-kinerja").then(res => {
                    $scope.getAllData();
                    $scope.closePopUp();
                })
            }

            $scope.closePopUp = () => {
                // $scope.reset();
                $scope.popupTambah.close();
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.bulan = new Date(dataItem.bulan);
                $scope.item.target = dataItem.target;
                $scope.item.bobot = dataItem.bobot;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                $scope.item.indikatorKerja = {
                    id: dataItem.indikatorId,
                    namaIndikator: dataItem.namaIndikator
                }
                $scope.norecData = dataItem.noRec;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;

                if (!$scope.isPegawaiSDM && dataItem.isStatusVerifikasi) {
                    $scope.isVerifGranted = false;
                    $scope.isNotEditable = true;
                } else if (!$scope.isPegawaiSDM
                    && (!dataItem.isStatusVerifikasi || dataItem.isStatusVerifikasi == null)) {
                    $scope.isVerifGranted = false;
                    $scope.isNotEditable = false;
                } else {
                    $scope.isVerifGranted = true;
                    $scope.isNotEditable = false;
                }

                $scope.popupTambah.open().center();
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Data sudah terverifikasi, tidak dapat dihapus!", "Perhatian!");
                    return;
                } else if (!$scope.isPegawaiSDM) {
                    toastr.warning("Tidak memiliki akses hapus!", "Perhatian!");
                    return;
                }

                $scope.item.bulan = dataItem.bulan;
                $scope.item.target = dataItem.target;
                $scope.item.bobot = dataItem.bobot;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                // $scope.item.pegawai = {
                //     id: dataItem.idPegawai,
                //     namaLengkap: dataItem.namaPegawai
                // }
                // $scope.item.jabatan = {
                //     id: dataItem.idJabatan,
                //     namaJabatan: dataItem.namaJabatan
                // }
                $scope.item.indikatorKerja = {
                    id: dataItem.indikatorId,
                    namaIndikator: dataItem.namaIndikator
                }

                $scope.norecData = dataItem.noRec;

                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.simpanData('delete');
                }, function () {
                    // $scope.reset();
                    // console.error('Tidak jadi hapus');
                });
            }

            $scope.reset = () => {
                $scope.norecData = null;
                $scope.item.bulan = null;
                $scope.item.target = null;
                $scope.item.bobot = null;
                $scope.item.statusVerif = false;
                // $scope.item.pegawai = null;
                // $scope.item.jabatan = null;
                $scope.item.indikatorKerja = null;
            }
        }
    ])
});