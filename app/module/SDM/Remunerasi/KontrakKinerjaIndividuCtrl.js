define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KontrakKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.indikator = {};
            $scope.item.srcBulan = "";
            $scope.currentNilaiBobot = {};
            // let nilaiMaxKuantitas = 40, nilaiMaxKualitas = 30, nilaiMaxPerilaku = 30;
            let nilaiMax = {
                kuantitas: 40,
                kualitas: 30,
                perilaku: 30
            }

            let dataPegawai = JSON.parse(localStorage.getItem('pegawai'));
            let dataLogin = JSON.parse(localStorage.getItem("datauserlogin"));

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

                    let tempNilaiBobotKualitas = 0, tempNilaiBobotKuantitas = 0, tempNilaiBobotPerilaku = 0;
                    for(let i = 0; i < res.data.data.Kualitas.length; i++) {
                        tempNilaiBobotKualitas += res.data.data.Kualitas[i].bobot;
                        res.data.data.Kualitas[i].jenisIndikator = "kualitas";
                    }

                    for(let ii = 0; ii < res.data.data.Kuantitas.length; ii++) {
                        tempNilaiBobotKuantitas += res.data.data.Kuantitas[ii].bobot;
                        res.data.data.Kuantitas[ii].jenisIndikator = "kuantitas";
                    }

                    for(let iii = 0; iii < res.data.data.Perilaku.length; iii++) {
                        tempNilaiBobotPerilaku += res.data.data.Perilaku[iii].bobot;
                        res.data.data.Perilaku[iii].jenisIndikator = "perilaku";
                    }

                    $scope.currentNilaiBobot.kualitas = tempNilaiBobotKualitas;
                    $scope.currentNilaiBobot.perilaku = tempNilaiBobotPerilaku;
                    $scope.currentNilaiBobot.kuantitas = tempNilaiBobotKuantitas;

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

                    console.log($scope.dataSourceKontrakKinerja);

                    $scope.isRouteLoading = false;
                })
            }

            $scope.init = () => {
                $q.all([
                    ManageSdmNew.getListData("iki-remunerasi/get-akses-pegawai-kontrak-kinerja?pegawaiId=" + dataPegawai.id),
                    ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=id:asc")
                ]).then(function (res) {
                    $scope.listPegawai = res[0].data.data;
                    $scope.getJabatanByIdPegawai(dataPegawai.id)

                    $scope.listDataSatuanIndikator = res[1].data;
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

            $scope.getJabatanByIdPegawai = (pegawaiId) => {
                ManageSdmNew.getListData("pegawai/get-all-jabatan-by-pegawai?idPegawai=" + pegawaiId).then((res) => {
                    $scope.listJabatan = res.data.data;
                })
            }

            $scope.tambahData = () => {
                $scope.reset();
                $scope.popupTambah.open().center();
            }

            $scope.tambahIndikator = () => {
                $scope.listPegawaiPengusul = []

                $scope.indikator.pegawai = {
                    id: dataPegawai.id,
                    namaLengkap: dataPegawai.namaLengkap
                }

                $scope.listPegawaiPengusul.push($scope.indikator.pegawai)
                $scope.getJabatanByIdPegawai(dataPegawai.id);
                $scope.popupTambahIndikator.open().center();
            }

            $scope.simpanPengajuanIndikator = () => {
               
                let dataSave = {
                    bulan: dateHelper.toTimeStamp($scope.indikator.bulan),
                    target: $scope.indikator.target,
                    bobot: $scope.indikator.bobot ? $scope.indikator.bobot : 0,
                    pegawai: {
                        id: dataPegawai.id
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
                        statusVerifikasi: false,
                        id: $scope.indikator.indikatorKerja.id
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

            $scope.hapusMappingIndikatorJabatan = (noRec) => {
                let dataSave = {
                    noRec: noRec,
                    statusEnabled: false,
                    loginUserId: dataLogin.id
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-mapping-indikator-jabatan").then(res => {
                    $scope.getAllData();
                    $scope.closePopUp();
                })
            }

            $scope.simpanData = (method) => {
                let statusEnabled = method === 'save' || method === 'update';

                console.log($scope.selectedJenisIndikator);
                console.log((($scope.currentNilaiBobot[$scope.selectedJenisIndikator] - $scope.tempSelectedBobot) + parseInt($scope.item.bobot)));
                if((($scope.currentNilaiBobot[$scope.selectedJenisIndikator] - $scope.tempSelectedBobot) + parseInt($scope.item.bobot)) > nilaiMax[$scope.selectedJenisIndikator]) {
                    toastr.info('Nilai Bobot ' + $scope.selectedJenisIndikator.toUpperCase() + ' tidak bisa lebih dari ' + nilaiMax[$scope.selectedJenisIndikator]);
                    return;
                }

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

                // ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-kontrak-kinerja").then(res => {
                //     $scope.getAllData();
                //     $scope.closePopUp();
                // })
            }

            $scope.closePopUp = () => {
                $scope.popupTambah.close();
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                
                $scope.tempSelectedBobot = parseInt(dataItem.bobot);
                $scope.selectedJenisIndikator = dataItem.jenisIndikator

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

                if ($scope.item.pegawai.isModifAkses) {
                    $scope.isVerifGranted = true;
                    $scope.isNotEditable = false;
                } else if (!$scope.item.pegawai.isModifAkses) {
                    $scope.isVerifGranted = false;
                    $scope.isNotEditable = true;
                }

                $scope.popupTambah.open().center();
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi) {
                    toastr.warning("Data sudah terverifikasi, tidak dapat dihapus!", "Perhatian!");
                    return;
                } else if (!$scope.item.pegawai.isModifAkses) {
                    toastr.warning("Tidak memiliki akses hapus!", "Perhatian!");
                    return;
                }

                $scope.item.bulan = dataItem.bulan;
                $scope.item.target = dataItem.target;
                $scope.item.bobot = dataItem.bobot;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
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
                    if (dataItem.noRecMap && dataItem.noRec == null) {
                        $scope.hapusMappingIndikatorJabatan(dataItem.noRecMap)
                    } else {
                        $scope.simpanData('delete');
                    }
                });
            }

            $scope.reset = () => {
                $scope.norecData = null;
                $scope.item.bulan = null;
                $scope.item.target = null;
                $scope.item.bobot = null;
                $scope.item.statusVerif = false;
                $scope.item.indikatorKerja = null;
            }

            $scope.$watch('item.pegawai', function (e) {
                if (!e) return;

                $scope.item.jabatan = null
            })
        }
    ])
});