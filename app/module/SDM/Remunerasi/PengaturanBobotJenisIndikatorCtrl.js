define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengaturanBobotJenisIndikatorCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};
            $scope.data = {};
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            // $scope.isEditJabatan = false;
            $scope.item.bulan = new Date();
            $scope.data.bulan = new Date();
            $scope.isEdit = false;

            $scope.listJenisIndikator = [{
                "id": 1,
                "name": "Kuantitas"
            }, {
                "id": 2,
                "name": "Kualitas"
            }, {
                "id": 3,
                "name": "Perilaku"
            }];

            $scope.data.dataSave = [{
                jenisIndikator: { id: 1, name: "Kuantitas" },
                persentase: 0
            }, {
                jenisIndikator: { id: 2, name: "Kualitas" },
                persentase: 0
            }, {
                jenisIndikator: { id: 3, name: "Perilaku" },
                persentase: 0
            }]

            $scope.data.kuantitas = { id: 1, name: "Kuantitas" }
            $scope.data.kualitas = { id: 2, name: "Kualitas" }
            $scope.data.perilaku = { id: 3, name: "Perilaku" }

            $scope.optGrid = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="showPopupAdd()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "bulanBerlakuFormatted",
                    title: "<h3>Bulan Berlaku</h3>",
                    width: 70
                }, {
                    field: "jenisIndikator",
                    title: "<h3>Jenis Indikator</h3>",
                    width: 200
                }, {
                    field: "kelompokJabatan",
                    title: "<h3>Kelompok Jabatan</h3>",
                    width: 200
                }, {
                    field: "persentase",
                    title: "<h3>Persentase<br>(%)</h3>",
                    width: 50
                }, {
                    field: "status",
                    title: "<h3>Status<br>(%)</h3>",
                    width: 70
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

            let init = () => {
                ManageSdmNew.getListData("service/list-generic/?view=KelompokJabatan&select=id,namaKelompokJabatan&criteria=statusEnabled,id&values=true,(1;2;3;4;5;6;7;8;9;10)&order=namaKelompokJabatan:asc").then((res) => {
                    $scope.listKelompokJabatan = res.data;
                });
            }

            init();

            $scope.getData = () => {
                if (!$scope.item.bulan) {
                    toastr.info("Harap pilih bulan");
                    return;
                }
                let bln = dateHelper.toTimeStamp($scope.item.bulan);
                ManageSdmNew.getListData("iki-remunerasi/get-master-bobot-jenis-indikator?periode=" + bln + "&kelompokKerjaId=" + ($scope.item.kelompokJabatan ? $scope.item.kelompokJabatan.id : "")).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                })
            }

            $scope.getData();

            $scope.showPopupAdd = () => {
                $scope.reset();
                $scope.popupTambah.open().center();
            }

            $scope.validasiDataDouble = () => {
                if ($scope.data.noRec) {
                    $scope.saveData("save");
                    return;
                }
                ManageSdmNew.getListData("iki-remunerasi/get-duplikat-bobot-jenis-indikator?periode=" + dateHelper.toTimeStamp($scope.data.bulan) + "&jenisIndikatorId=" + ($scope.data.jenisIndikator ? $scope.data.jenisIndikator.id : "") + "&kelompokJabatanId=" + ($scope.data.kelompokJabatan ? $scope.data.kelompokJabatan.id : "")).then((res) => {
                    if (res.data.data.length === 0) {
                        $scope.saveData("save");
                        return;
                    }
                    toastr.info("Data sudah ada!", "Gagal Simpan");
                });
            }

            $scope.saveData = (method) => {
                let dataSave = [];
                let statusEnabled = method === "save";
                let URL = "save-all-bobot-jenis-indikator";

                // update-all-bobot-jenis-indikator
                if (!$scope.data.bulan) {
                    toastr.info("Harap pilih Bulan terlebih dahulu!")
                    return;
                }

                for (let i = 0; i < $scope.data.dataSave.length; i++) {
                    dataSave.push({
                        kdProfile: 0,
                        statusEnabled: statusEnabled,
                        bulan: dateHelper.toTimeStamp($scope.data.bulan),
                        jenisIndikator: $scope.data.dataSave[i].jenisIndikator.id,
                        persentase: $scope.data.dataSave[i].persentase
                    });
                    if ($scope.data.kelompokJabatan && $scope.data.kelompokJabatan.id) {
                        dataSave[i].kelompokJabatan = {
                            id: $scope.data.kelompokJabatan.id
                        }
                    }
                    if ($scope.data.dataSave[i].noRec) {
                        URL = "update-all-bobot-jenis-indikator";
                        dataSave[i].noRec = $scope.data.dataSave[i].noRec;
                    }
                }

                // console.log(dataSave);
                ManageSdmNew.saveData(dataSave, `iki-remunerasi/${URL}`).then(res => {
                    $scope.getData();
                    $scope.reset();
                    $scope.closepopupTambah();
                })
            }

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                ManageSdmNew.getListData("iki-remunerasi/get-edit-master-bobot-jenis-indikator?tglPembaharuanData=" + dataItem.tglPembaharuanData).then((res) => {
                    // console.log(res);
                    for (let i = 0; i < res.data.data.detail.length; i++) {
                        $scope.data.dataSave[i].jenisIndikator = { id: res.data.data.detail[i].jenisIndikatorId, name: res.data.data.detail[i].jenisIndikator };
                        $scope.data.dataSave[i].persentase = res.data.data.detail[i].persentase;
                        $scope.data.dataSave[i].noRec = res.data.data.detail[i].noRec;
                    }
                    $scope.isEdit = true;
                    // $scope.isEditJabatan = dataItem.kelompokJabatanId && dataItem.kelompokJabatan;

                    $scope.data.noRec = dataItem.noRec;
                    $scope.data.bulan = new Date(dataItem.bulanBerlaku);
                    $scope.data.jenisIndikator = {
                        id: dataItem.jenisIndikatorId,
                        name: dataItem.jenisIndikator
                    }
                    $scope.data.kelompokJabatan = {
                        id: dataItem.kelompokJabatanId,
                        namaKelompokJabatan: dataItem.kelompokJabatan
                    }
                    $scope.data.persentase = dataItem.persentase;

                    $scope.popupTambah.open().center();
                })
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.data.noRec = dataItem.noRec;
                $scope.data.bulan = new Date(dataItem.bulanBerlaku);
                $scope.data.jenisIndikator = {
                    id: dataItem.jenisIndikatorId,
                    name: dataItem.jenisIndikator
                }
                $scope.data.kelompokJabatan = {
                    id: dataItem.kelompokJabatanId,
                    namaKelompokJabatan: dataItem.kelompokJabatan
                }
                $scope.data.persentase = dataItem.persentase;

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .textContent('Anda akan menghapus data secara permanen!')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');

                $mdDialog.show(confirm).then(function () {
                    ManageSdmNew.saveData({}, "iki-remunerasi/delete-all-master-bobot-jenis-indikator?tglPembaharuanData=" + dataItem.tglPembaharuanData).then(res => {
                        $scope.reset();
                        $scope.getData();
                        // console.log("HAPUSED");
                    })
                }, function () {
                    // console.info("Batal hapus....");
                    $scope.reset();
                });

            }

            $scope.reset = () => {
                $scope.data.bulan = new Date();
                $scope.data.jenisIndikator = null;
                $scope.data.persentase = null;
                $scope.data.kelompokJabatan = null;
                $scope.data.noRec = null;
                $scope.data.dataSave = [{
                    jenisIndikator: { id: 1, name: "Kuantitas" },
                    persentase: 0
                }, {
                    jenisIndikator: { id: 2, name: "Kualitas" },
                    persentase: 0
                }, {
                    jenisIndikator: { id: 3, name: "Perilaku" },
                    persentase: 0
                }]

                $scope.isEdit = false;
            }

            $scope.closepopupTambah = () => {
                $scope.reset();
                $scope.popupTambah.close();
            };
        }
    ])
});