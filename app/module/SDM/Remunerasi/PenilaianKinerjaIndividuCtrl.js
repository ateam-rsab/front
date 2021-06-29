define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PenilaianKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = false;
            $scope.isDuplicated = false
            $scope.isPopup = false
            $scope.item = {};
            $scope.indikator = {};
            $scope.item.srcBulan = "";
            $scope.currentNilaiBobot = {};

            $scope.subTotalBobotKualitas = 0;
            $scope.subTotalBobotKuantitas = 0;
            $scope.subTotalBobotPerilaku = 0;
            $scope.subTotalHasilKualitas = 0;
            $scope.subTotalHasilKuantitas = 0;
            $scope.subTotalHasilPerilaku = 0;

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

            $scope.nilaiIki = 0;
            $scope.totalBobot = 0;
            $scope.totalHasil = 0;

            $scope.nilaiMax = {
                kuantitas: 40,
                kualitas: 30,
                perilaku: 30
            }
            let dataPegawai = JSON.parse(localStorage.getItem('pegawai'));
            let dataLogin = JSON.parse(localStorage.getItem("datauserlogin"));

            let columns = {
                kualitas: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200,
                    footerTemplate: "<span>Sub Total :</span>",
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50
                }, {
                    field: "bobot",
                    title: "<h3>Bobot (%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalBobotKuantitas}}</span>",
                }, {
                    field: "nilai",
                    title: "<h3>Nilai</h3>",
                    width: 50
                }, {
                    field: "realisasi",
                    title: "<h3>Realisasi</h3>",
                    width: 50
                }, {
                    field: "hasil",
                    title: "<h3>Hasil</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalHasilKuantitas}}</span>",
                }, ],
                kuantitas: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200,
                    footerTemplate: "<span>Sub Total :</span>",
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50
                }, {
                    field: "bobot",
                    title: "<h3>Bobot (%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalBobotKuantitas}}</span>",
                }, {
                    field: "nilai",
                    title: "<h3>Nilai</h3>",
                    width: 50
                }, {
                    field: "realisasi",
                    title: "<h3>Realisasi</h3>",
                    width: 50
                }, {
                    field: "hasil",
                    title: "<h3>Hasil</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalHasilKualitas}}</span>",
                }, ],
                perilaku: [{
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 200,
                    footerTemplate: "<span>Sub Total :</span>",
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 50
                }, {
                    field: "bobot",
                    title: "<h3>Bobot (%)</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalBobotPerilaku}}</span>",
                }, {
                    field: "nilai",
                    title: "<h3>Nilai</h3>",
                    width: 50
                }, {
                    field: "realisasi",
                    title: "<h3>Realisasi</h3>",
                    width: 50
                }, {
                    field: "hasil",
                    title: "<h3>Hasil</h3>",
                    width: 50,
                    footerTemplate: "<span>{{subTotalHasilPerilaku}}</span>",
                }, ],
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

            $scope.optGridDetailIndikator = {
                pageable: true,
                scrollable: false,
                columns: [
                    {
                        field: "detailIndikator",
                        title: "<h3>Detail Indikator</h3>",
                        width: 200
                    }, {
                        field: "detailTarget",
                        title: "<h3>Target</h3>",
                        width: 100,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }
                ]
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
                $scope.isPopup = false;

                ManageSdmNew.getListData("iki-remunerasi/get-penilaian-kinerja-individu?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : "")
                    + "&jabatanId=" + ($scope.item.jabatan ? $scope.item.jabatan.id : "")
                    + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : "")).then((res) => {
                        let tempNilaiBobotKualitas = 0, tempNilaiBobotKuantitas = 0, tempNilaiBobotPerilaku = 0;

                        $scope.nilaiIki = res.data.data.iki;
                        $scope.totalBobot = res.data.data.tBobot;
                        $scope.totalHasil = res.data.data.tHasil;

                        // bug variable jadi kebalik :D
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
                        $scope.isPopup = false;
                    })
            }

            $scope.getBobotJenisByJabatan = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-bobot-jenis-by-jabatan?periode=" + dateHelper.toTimeStamp($scope.item.srcBulan) + "&jabatanId=" + ($scope.item.jabatan ? $scope.item.jabatan.id : "")).then((res) => {
                    console.log(res.data.data)
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
                    ManageSdmNew.getListData("iki-remunerasi/get-akses-pegawai-kontrak-kinerja?pegawaiId=" + dataPegawai.id),
                    ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=id:asc"),
                    ManageSdmNew.getListData("pegawai/get-pegawai-sdm-for-cred")
                ]).then(function (res) {
                    $scope.listPegawai = res[0].data.data;
                    $scope.getJabatanByIdPegawai(dataPegawai.id)

                    $scope.listDataSatuanIndikator = res[1].data;
                    $scope.isPegawaiSDM = false;
                    for (var i = 0; i < res[2].data.data.data.length; i++) {
                        if (res[2].data.data.data[i] == modelItem.getPegawai().id) {
                            $scope.isPegawaiSDM = true;
                            break
                        }
                    };
                }, (error) => {
                    throw (error);
                })
            }

            $scope.init();

            $scope.getIndikatorKerja = (id) => {
                ManageSdmNew.getListData("iki-remunerasi/daftar-indikator-di-unit-kerja?jenisIndikator=" + id + "&unitKerjaId=" + $scope.indikator.jabatan.idUnitKerja + "&levelJabatan=" + $scope.indikator.jabatan.levelJabatan).then((res) => {
                    $scope.listIndikatorKinerja = res.data.data;
                })
            }

            $scope.getJabatanByIdPegawai = (pegawaiId) => {
                ManageSdmNew.getListData("pegawai/jabatan-kontrak-verif-kinerja?pegawaiId=" + pegawaiId + "&pegawaiLoginId=" + dataPegawai.id).then((res) => {
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
                $scope.isRouteLoading = true;
                $scope.isPopup = true;

                var listRawRequired = [
                    "indikator.bobot|k-ng-model|Bobot",
                    "indikator.satuanIndikator|k-ng-model|Satuan",
                    "indikator.target|k-ng-model|Target",
                    "indikator.namaIndikator|k-ng-model|Nama Indikator",
                    "indikator.jenisIndikator|k-ng-model|Jenis Indikator",
                    "indikator.jabatan|k-ng-model|Jabatan",
                    "indikator.bulan|k-ng-model|Bulan"
                ]

                var isValid = modelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    if (!$scope.indikator.target && $scope.indikator.target <= 0) {
                        toastr.warning('Target harus diisi dan lebih besar dari 0')

                        $scope.isRouteLoading = false;
                        $scope.isPopup = true;
                        return
                    }

                    if (!$scope.indikator.bobot && $scope.indikator.bobot <= 0) {
                        toastr.warning('Bobot harus diisi dan lebih besar dari 0')

                        $scope.isRouteLoading = false;
                        $scope.isPopup = true;
                        return
                    }

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
                            namaIndikator: $scope.indikator.namaIndikator,
                            satuanIndikator: {
                                id: $scope.indikator.satuanIndikator.id
                            },
                            jenisIndikator: $scope.indikator.jenisIndikator.id,
                            statusVerifikasi: false
                        },
                        statusVerifikasi: false
                    }

                    if ($scope.isDuplicated) {
                        toastr.warning("Indikator kinerja sudah tersedia!")

                        $scope.isRouteLoading = false;
                        $scope.isPopup = true;
                        return
                    } else {
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-pengajuan-kontrak-kinerja").then(res => {
                            $scope.resetDataPengajuan();
                            $scope.closePopUpPengajuan();
                        })
                    }
                } else {
                    $scope.isRouteLoading = false;
                    $scope.isPopup = true;

                    modelItem.showMessages(isValid.messages);
                }
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
                $scope.isRouteLoading = true;
                $scope.isPopup = true;

                var tglBatasSimpan = new Date($scope.item.srcBulan);
                tglBatasSimpan.setDate(4);
                tglBatasSimpan.setHours(23, 59, 59, 999);
                if (dateHelper.toTimeStamp(new Date()) > tglBatasSimpan) {
                    toastr.warning("Batas masa simpan kontrak kinerja individu sudah lewat", "Peringatan")

                    $scope.isRouteLoading = false;
                    return
                }

                let statusEnabled = method === 'save' || method === 'update';

                if (!$scope.item.target && $scope.item.target <= 0) {
                    toastr.warning('Target harus diisi dan lebih besar dari 0')

                    $scope.isRouteLoading = false;
                    $scope.isPopup = true;
                    return
                }

                if (!$scope.item.bobot && $scope.item.bobot <= 0) {
                    toastr.warning('Bobot harus diisi dan lebih besar dari 0')

                    $scope.isRouteLoading = false;
                    $scope.isPopup = true;
                    return
                }

                if ((($scope.currentNilaiBobot[$scope.selectedJenisIndikator] - $scope.tempSelectedBobot) + parseFloat($scope.item.bobot)) > $scope.nilaiMax[$scope.selectedJenisIndikator]) {
                    toastr.info('Total Nilai Bobot ' + $scope.selectedJenisIndikator.toUpperCase() + ' Tidak Boleh Lebih dari ' + $scope.nilaiMax[$scope.selectedJenisIndikator]);

                    $scope.isRouteLoading = false;
                    $scope.isPopup = true;
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

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-kontrak-kinerja").then(res => {
                    $scope.getAllData();
                    $scope.closePopUp();

                    $scope.isRouteLoading = false;
                    $scope.isPopup = true;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    $scope.isPopup = true;
                })
            }

            $scope.closePopUp = () => {
                $scope.popupTambah.close();
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.bobot != null) {
                    $scope.tempSelectedBobot = parseFloat(dataItem.bobot);
                } else {
                    $scope.tempSelectedBobot = 0.0;
                }
                $scope.selectedJenisIndikator = dataItem.jenisIndikator

                $scope.item.bulan = new Date(dataItem.bulan);
                $scope.item.target = dataItem.target;
                $scope.item.satuanIndikator = dataItem.satuanIndikator;
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
                    if ($scope.item.statusVerif) {
                        $scope.isNotEditable1 = true;
                        $scope.isNotEditable2 = true;
                    } else {
                        if (dataItem.detail) {
                            $scope.isNotEditable1 = true;
                            $scope.isNotEditable2 = false;
                        } else {
                            $scope.isNotEditable1 = false;
                            $scope.isNotEditable2 = false;
                        }
                    }
                } else if (!$scope.item.pegawai.isModifAkses) {
                    $scope.isVerifGranted = false;
                    $scope.isNotEditable1 = true;
                    $scope.isNotEditable2 = true;
                }

                $scope.popupTambah.open().center();
            }

            function detailData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.dataSourceDetailIndikator = new kendo.data.DataSource({
                    data: dataItem.detail,
                    pageSize: 10
                })
                if (dataItem.detail) {
                    $scope.popupDetailIndikator.open().center();
                    return;
                }

                toastr.info("Tidak ada data");
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if (dataItem.isStatusVerifikasi && !$scope.item.pegawai.isModifAkses) {
                    toastr.warning("Data sudah terverifikasi, tidak dapat dihapus!", "Perhatian!");
                    return;
                } else if (dataItem.isStatusVerifikasi) {
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
                if (dataItem.noRec && dataItem.noRecMap) {
                    var confirm = $mdDialog.confirm()
                        .title('Apakah anda yakin menghapus data?')
                        .textContent('Hapus data hanya pada target dan bobot!')
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
                } else if (!dataItem.noRec && dataItem.noRecMap) {
                    if (!$scope.isPegawaiSDM) {
                        toastr.warning("Tidak memiliki akses hapus!", "Perhatian!");
                        return;
                    }

                    var confirm = $mdDialog.confirm()
                        .title('Apakah anda yakin menghapus data?')
                        .textContent('Hapus data juga menghilangkan mapping indikator - jabatan!')
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

            $scope.$watch('indikator.namaIndikator', function (e) {
                if (!e) return;

                ManageSdmNew.getListData("iki-remunerasi/get-duplicate-indikator-kinerja?idIndikator=" + ($scope.item.idMasterKinerja ? $scope.item.idMasterKinerja : "") + "&namaIndikator=" + encodeURIComponent($scope.item.namaIndikator).replace(/%20/g, "+")).then(res => {
                    if (res.data.data.length > 0) {
                        $scope.isDuplicated = true
                    } else {
                        $scope.isDuplicated = false
                    }
                })
            })

            document.querySelector("#targetGrid").addEventListener("keypress", function (evt) {
                if (evt.which != 8 && evt.which != 0 && (evt.which > 31 && (evt.which != 46 && (evt.which < 48 || evt.which > 57)))) {
                    evt.preventDefault();
                }
            });

            document.querySelector("#bobotGrid").addEventListener("keypress", function (evt) {
                if (evt.which != 8 && evt.which != 0 && (evt.which > 31 && (evt.which != 46 && (evt.which < 48 || evt.which > 57)))) {
                    evt.preventDefault();
                }
            });

            document.querySelector("#targetPop").addEventListener("keypress", function (evt) {
                if (evt.which != 8 && evt.which != 0 && (evt.which > 31 && (evt.which != 46 && (evt.which < 48 || evt.which > 57)))) {
                    evt.preventDefault();
                }
            });

            document.querySelector("#bobotPop").addEventListener("keypress", function (evt) {
                if (evt.which != 8 && evt.which != 0 && (evt.which > 31 && (evt.which != 46 && (evt.which < 48 || evt.which > 57)))) {
                    evt.preventDefault();
                }
            });
        }
    ])
});