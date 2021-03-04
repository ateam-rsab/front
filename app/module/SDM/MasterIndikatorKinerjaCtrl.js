define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterIndikatorKinerjaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, $timeout, $mdDialog) {
            $scope.item = {};
            $scope.optGridMasterKinerja = {
                toolbar: [{
                    text: "export",
                    name: "Tambah",
                    template: '<button ng-click="tambahData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-plus"></span>Tambah Data</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "jenisIndikator",
                    title: "<h3>Jenis Indikator</h3>",
                    width: 70
                }, {
                    field: "namaIndikator",
                    title: "<h3>Nama Indikator</h3>",
                    width: 150
                }, {
                    field: "satuanIndikator",
                    title: "<h3>Satuan Indikator</h3>",
                    width: 70
                }, {
                    field: "statusVerifikasi",
                    title: "<h3>Status</h3>",
                    width: 70
                }, {
                    command: [{
                        text: "Edit",
                        click: editData,
                        imageClass: "k-icon k-i-pencil"
                    }, {
                        text: "Hapus",
                        click: hapusData,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 50
                }],
            };

            function editData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.jenisIndikator = {
                    id: dataItem.jenisIndikatorId,
                    jenisIndikator: dataItem.jenisIndikator
                };
                $scope.item.satuanIndikator = {
                    satuanIndikator: dataItem.satuanIndikator,
                    id: dataItem.satuanIndikatorId
                }
                $scope.item.namaIndikator = dataItem.namaIndikator;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                $scope.item.idMasterKinerja = dataItem.id;
                $scope.popupTambah.open().center();

            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item.jenisIndikator = {
                    id: dataItem.jenisIndikatorId,
                    jenisIndikator: dataItem.jenisIndikator
                };
                $scope.item.satuanIndikator = {
                    satuanIndikator: dataItem.satuanIndikator,
                    id: dataItem.satuanIndikatorId
                }
                $scope.item.namaIndikator = dataItem.namaIndikator;
                $scope.item.statusVerif = dataItem.isStatusVerifikasi;
                $scope.item.idMasterKinerja = dataItem.id;
                ManageSdmNew.getListData("iki-remunerasi/cek-kontrak-kinerja?indikatorId=" + dataItem.id).then(rs1 => {
                    if (rs1.data.data.length > 0) {
                        toastr.warning("Indikator kinerja sudah dipakai dalam kontrak kinerja, tidak bisa hapus!")
                        return
                    } else {
                        var confirm = $mdDialog.confirm()
                            .title('Apakah anda yakin menghapus Indikator Kinerja?')
                            .ariaLabel('Lucky day')
                            .targetEvent(e)
                            .ok('Ya')
                            .cancel('Tidak');
                        $mdDialog.show(confirm).then(function () {
                            // $scope.item.idMasterKinerja = dataItem.id;
                            $scope.simpanData('delete');
                        }, function () {
                            $scope.reset();
                            console.error('Tidak jadi hapus');
                        });
                    }
                })
            }

            $scope.item.statusVerif = false;
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

            let getDataMaster = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-master-indikator-kinerja").then((res) => {
                    $scope.dataSourceMasterKinerja = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                })
            }

            $scope.init = () => {
                getDataMaster();
                ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=id:asc").then((res) => {
                    $scope.listDataSatuanIndikator = res.data;
                })
            }
            $scope.init();

            $scope.tambahData = () => {
                $scope.popupTambah.open().center();
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.simpanData = (method) => {
                let statusEnabled = method === 'save' || method === 'update';
                let dataSave = {
                    statusEnabled: statusEnabled,
                    kdProfile: 0,
                    namaIndikator: $scope.item.namaIndikator,
                    satuanIndikator: {
                        id: $scope.item.satuanIndikator.id
                    },
                    statusVerifikasi: $scope.item.statusVerif,
                    jenisIndikator: $scope.item.jenisIndikator.id
                }
                if ($scope.item.idMasterKinerja) {
                    dataSave.id = $scope.item.idMasterKinerja;
                }

                ManageSdmNew.getListData("iki-remunerasi/get-duplicate-indikator-kinerja?idIndikator=" + ($scope.item.idMasterKinerja ? $scope.item.idMasterKinerja : "") + "&namaIndikator=" + $scope.item.namaIndikator).then(rs1 => {
                    if (rs1.data.data.length > 0) {
                        toastr.warning("Indikator kinerja sudah tersedia!")
                        return
                    } else {
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-master-indikator-kinerja").then(rs2 => {
                            getDataMaster();
                            $scope.closePopUp();
                        })
                    }
                })
            }

            $scope.reset = () => {
                $scope.item.jenisIndikator = null;
                $scope.item.satuanIndikator = null;
                $scope.item.namaIndikator = null;
                $scope.item.statusVerif = false;
                $scope.item.idMasterKinerja = null;
            }
        }
    ]);
});