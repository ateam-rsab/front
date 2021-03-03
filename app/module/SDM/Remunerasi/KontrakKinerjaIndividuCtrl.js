define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KontrakKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.indikator = {};
            let dataLogin = JSON.parse(localStorage.getItem('pegawai'));
            $scope.item.srcBulan = new Date();

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
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }, {
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahIndikator()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Pengajuan Indikator</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "bulanFormatted",
                    title: "<h3>Bulan</h3>",
                    width: 100
                }, {
                    field: "namaJabatan",
                    title: "<h3>Jabatan</h3>",
                    width: 100
                }, {
                    field: "namaIndikator",
                    title: "<h3>Indikator</h3>",
                    width: 150
                }, {
                    field: "jenisIndikator",
                    title: "<h3>Jenis Indikator</h3>",
                    width: 150
                }, {
                    field: "bobot",
                    title: "<h3>Bobot</h3>",
                    width: 70
                }, {
                    field: "target",
                    title: "<h3>Target</h3>",
                    width: 70
                }, {
                    field: "statusVerifikasi",
                    title: "<h3>Status</h3>",
                    width: 120
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
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-kontrak-kinerja?pegawaiId=" + ($scope.item.pegawai ? $scope.item.pegawai.id : "") + "&jabatanId=" + ($scope.item.jabatan ? $scope.item.jabatan.id : "") + "&bulan=" + ($scope.item.srcBulan ? dateHelper.toTimeStamp($scope.item.srcBulan) : new Date())).then((res) => {

                    for(let i = 0; i < res.data.data.length; i++) {
                        if(res.data.data[i].bulan) {
                            res.data.data[i].bulanFormatted = dateHelper.formatDate(res.data.data[i].bulan, "MMM, YYYY");
                        }
                    }
                    $scope.dataSourceKontrakKinerja = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                    $scope.isRouteLoading = false;
                })
            }

            $scope.init = () => {
                ManageSdmNew.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true&order=namaLengkap:asc").then((res) => {
                    $scope.listPegawai = res.data;
                })

                ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=id:asc").then((res) => {
                    $scope.listDataSatuanIndikator = res.data;
                })
            }
            $scope.init();

            $scope.getIndikatorKerja = (id) => {
                ManageSdmNew.getListData("service/list-generic/?view=IndikatorKinerja&select=id,namaIndikator&criteria=jenisIndikator,statusEnabled&values=" + id + ",true&order=namaIndikator:asc").then((res) => {
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
                    bulan: dateHelper.toTimeStamp($scope.item.bulan),
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
                $scope.reset();
                $scope.popupTambah.close();
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.bulan = new Date(dataItem.bulan);
                $scope.item.target = dataItem.target;
                $scope.item.bobot = dataItem.bobot;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                $scope.item.pegawai = {
                    id: dataItem.idPegawai,
                    namaLengkap: dataItem.namaPegawai
                }
                $scope.item.jabatan = {
                    id: dataItem.idJabatan,
                    namaJabatan: dataItem.namaJabatan
                }
                $scope.item.indikatorKerja = {
                    id: dataItem.idIndikator,
                    namaIndikator: dataItem.namaIndikator
                }

                $scope.norecData = dataItem.noRec;

                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                $scope.popupTambah.open().center();
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.item.bulan = dataItem.bulan;
                $scope.item.target = dataItem.target;
                $scope.item.bobot = dataItem.bobot;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                $scope.item.pegawai = {
                    id: dataItem.idPegawai,
                    namaLengkap: dataItem.namaPegawai
                }
                $scope.item.jabatan = {
                    id: dataItem.idJabatan,
                    namaJabatan: dataItem.namaJabatan
                }
                $scope.item.indikatorKerja = {
                    id: dataItem.idIndikator,
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
                    $scope.reset();
                    console.error('Tidak jadi hapus');
                });
            }

            $scope.reset = () => {
                $scope.norecData = null;
                $scope.item.bulan = null;
                $scope.item.target = null;
                $scope.item.bobot = null;
                $scope.item.statusVerif = false;
                $scope.item.pegawai = null;
                $scope.item.jabatan = null;
                $scope.item.indikatorKerja = null;
            }
        }
    ])
});