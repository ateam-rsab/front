define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterIndikatorKinerjaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', '$timeout', '$mdDialog', "DateHelper",
        function ($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, $timeout, $mdDialog, dateHelper) {
            $scope.item = {};
            $scope.mapping = {};
            let dataLogin = JSON.parse(localStorage.getItem("datauserlogin"));
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
                        text: "Mapping",
                        click: mapping,
                        imageClass: "k-icon k-i-pencil"
                    }, {
                        text: "Hapus",
                        click: hapusData,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 120
                }],
            };

            $scope.onChangeTab = (data) => {
                console.log(data);
                switch (data) {
                    case 3:
                        // $scope.getDataMapping()
                        break;
                    default:
                        break;
                }
            }

            function mapping(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                console.log(dataItem);
                $scope.mapping = dataItem;
                $scope.popUpMapping.open().center();

            }

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

            $scope.getDataMaster = () => {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-master-indikator-kinerja?jenisIndikatorId=" + ($scope.item.srcJenisIndikator ? $scope.item.srcJenisIndikator.id : "") + "&namaIndikator=" + ($scope.item.srcNamaIndikator ? $scope.item.srcNamaIndikator.toLowerCase() : "") + "&isStatusVerifikasi=" + ($scope.item.srcStatusVerif ? $scope.item.srcStatusVerif : false)).then((res) => {
                    $scope.isRouteLoading = false;
                    $scope.dataSourceMasterKinerja = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                })
            }

            $scope.init = () => {
                $scope.getDataMaster();
                ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=id:asc").then((res) => {
                    $scope.listDataSatuanIndikator = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled,id&values=true,!0").then((res) => {
                    console.log(res)
                    $scope.listJenisJabatan = res.data;

                });
            }
            $scope.init();

            $scope.getJabatan = (id) => {
                $scope.mapping.jabatan = null;
                $scope.mapping.srcJabatan = null;
                ManageSdmNew.getListData("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled,kdJabatan,jenisJabatanId&values=true,ANJAB," + id).then((res) => {
                    $scope.listJabatan = res;

                    $scope.listGridJabatan = res.data;
                    for (let i = 0; i < $scope.listGridJabatan.length; i++) {
                        $scope.listGridJabatan[i].statCheckbox = false;
                    }

                    // $scope.dataSourceJabatan = new kendo.data.DataSource({
                    //     data: res.data,
                    //     pageSize: 100
                    // })
                })
            }

            $scope.tambahData = () => {
                $scope.popupTambah.open().center();
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            let checkDuplicateData = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-duplicate-indikator-kinerja?idIndikator=" + ($scope.item.idMasterKinerja ? $scope.item.idMasterKinerja : "") + "&namaIndikator=" + $scope.item.namaIndikator).then(res => {
                    if (res.data.data.length > 0) {
                        toastr.warning("Indikator kinerja sudah tersedia!");
                        return false;
                    }

                    return true;
                })
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

                if (checkDuplicateData()) {
                    ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-master-indikator-kinerja").then(res => {

                        $scope.closePopUp();
                    })
                }


            }

            $scope.simpanDataMapping = (method) => {
                let statusEnabled = method === 'save' || method === 'update';
                let dataSave = {
                    indikatorKinerja: {
                        id: $scope.mapping.id
                    },
                    jabatan: {
                        id: $scope.mapping.jabatan.id
                    },
                    loginUserId: dataLogin.id,
                    tanggalMulaiBerlaku: dateHelper.toTimeStamp($scope.mapping.tglBerlaku),
                    kdProfile: 0,
                    statusEnabled: statusEnabled,

                }

                if (!statusEnabled) {
                    dataSave.noRec = $scope.norecDataMapping;
                }

                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-mapping-indikator-jabatan").then(res => {
                    if (!statusEnabled) $scope.getDataMapping();
                    $scope.closePopUpMapping();
                })

            }

            $scope.reset = () => {
                $scope.item.jenisIndikator = null;
                $scope.item.satuanIndikator = null;
                $scope.item.namaIndikator = null;
                $scope.item.statusVerif = false;
                $scope.item.idMasterKinerja = null;
            }

            // #region mapping

            $scope.optGridMappingKinerja = {

                pageable: true,
                scrollable: true,
                columns: [{
                    field: "namaIndikator",
                    title: "<h3>Nama Indikator</h3>",
                    width: 150
                }, {
                    field: "satuanIndikator",
                    title: "<h3>Satuan Indikator</h3>",
                    width: 70
                }, {
                    field: "tglBerlakuFormatted",
                    title: "<h3>Tanggal Berlaku</h3>",
                    width: 70
                }, {
                    command: [{
                        text: "Hapus",
                        click: confirmHapus,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 50
                }],
            }

            $scope.optGridJabatan = {
                pageable: true,
                scrollable: true,
                columns: [{
                    "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                    template: "# if (statCheckbox) { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
                        "# } else { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
                        "# } #",
                    width: "50px"
                }, {
                    field: "namaJabatan",
                    title: "<h3>Nama Jabatan</h3>",
                    // width: 150
                }],
            }

            function confirmHapus(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.norecDataMapping = dataItem.noRec;
                $scope.mapping = {
                    id: dataItem.indikatorId,
                    jabatan: {
                        id: $scope.mapping.srcJabatan.id
                    },
                }

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin menghapus data?')
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');

                $mdDialog.show(confirm).then(function () {
                    $scope.simpanDataMapping('delete');
                }, function () {
                    reset();
                    // console.error('Tidak jadi hapus');
                });

                // $scope.hapusDataMapping(dataItem);
            }

            $scope.getDataMapping = () => {
                ManageSdmNew.getListData("iki-remunerasi/get-mapping-indikator-jabatan?jabatanId=" + ($scope.mapping.srcJabatan ? $scope.mapping.srcJabatan.id : 2122)).then((res) => {

                    $scope.dataSourceMappingKinerja = {
                        kualitas: new kendo.data.DataSource({
                            data: res.data.data.Kualitas,
                            pageSize: 5
                        }),
                        kuantitas: new kendo.data.DataSource({
                            data: res.data.data.Kuantitas,
                            pageSize: 5
                        }),
                        perilaku: new kendo.data.DataSource({
                            data: res.data.data.Perilaku,
                            pageSize: 5
                        }),
                    }
                })
            }

            $scope.getMasterIndikator = (id) => {
                if(!id) return;
                
                ManageSdmNew.getListData("service/list-generic/?view=IndikatorKinerja&select=id,namaIndikator&criteria=statusEnabled,jenisIndikator&values=true," + id + "&order=namaIndikator:asc").then((res) => { 
                    $scope.listMasterIndikator = res.data;
                })
            }

            $scope.getAllJabatan = () => {
                if(!$scope.mapping.srcNamaIndikator.id) {
                    toastr.warning("Gagal menampilkan data", "Perhatian!");
                    return;
                }
                ManageSdmNew.getListData("iki-remunerasi/set-mapping-indikator-jabatan?indikatorId=" + $scope.mapping.srcNamaIndikator.id).then((res) => { 
                    console.log(res);
                });
            }

            $scope.selectRow = function (dataItem) {
                var dataSelect = _.find($scope.dataSourceJabatan._data, function (data) {
                    return data.noRec == dataItem.noRec;
                });

                if (dataSelect.statCheckbox) {
                    dataSelect.statCheckbox = false;
                } else {
                    dataSelect.statCheckbox = true;
                }
            }

            var isCheckAll = false
            $scope.selectUnselectAllRow = function () {
                var tempData = $scope.dataSourceJabatan._data;

                if (isCheckAll) {
                    isCheckAll = false;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statCheckbox = false;
                    }
                } else {
                    isCheckAll = true;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statCheckbox = true;
                    }
                }
                $scope.dataSourceJabatan = new kendo.data.DataSource({
                    data: tempData,
                    pageSizeP: 100
                })
            }

            let reset = () => {
                $scope.mapping = null;
            }

            $scope.closePopUpMapping = () => {
                reset()
                $scope.popUpMapping.close();
            }


            // #endregion mapping


        }
    ]);
});