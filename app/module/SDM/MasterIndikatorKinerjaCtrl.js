define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterIndikatorKinerjaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', '$timeout', '$mdDialog', "DateHelper",
        function ($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, $timeout, $mdDialog, dateHelper) {
            $scope.item = {};
            $scope.isDuplicated = false
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
                if (dataItem.isStatusVerifikasi) {
                    $scope.isEdit = true
                } else {
                    $scope.isEdit = false
                }
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
                    } else if (dataItem.isStatusVerifikasi) {
                        toastr.warning("Data master sudah terverifikasi!")
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

            // $scope.item.statusVerif = false;
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
            $scope.listStatusVerif = [{
                id: 0,
                statusVerif: "Belum Terverifikasi"
            }, {
                id: 1,
                statusVerif: "Terverifikasi"
            }]

            $scope.getDataMaster = () => {
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-master-indikator-kinerja?jenisIndikatorId=" + ($scope.item.srcJenisIndikator ? $scope.item.srcJenisIndikator.id : "") + "&namaIndikator=" + ($scope.item.srcNamaIndikator ? $scope.item.srcNamaIndikator.toLowerCase() : "") + "&isStatusVerifikasi=" + ($scope.item.srcStatusVerif ? ($scope.item.srcStatusVerif.id == 1 ? true : false) : "")).then((res) => {
                    $scope.isRouteLoading = false;
                    $scope.dataSourceMasterKinerja = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 10
                    })
                })
            }

            $scope.init = () => {
                $scope.getDataMaster();
                ManageSdmNew.getListData("service/list-generic/?view=SatuanIndikator&select=id,satuanIndikator&criteria=statusEnabled&values=true&order=satuanIndikator:asc").then((res) => {
                    $scope.listDataSatuanIndikator = res.data;
                });

                ManageSdmNew.getListData("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled,id&values=true,!0").then((res) => {
                    // console.log(res)
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
                        $scope.listGridJabatan[i].statusPilih = false;
                    }

                    // $scope.dataSourceJabatan = new kendo.data.DataSource({
                    //     data: res.data,
                    //     pageSize: 100
                    // })
                })
            }

            $scope.tambahData = () => {
                $scope.isEdit = false
                $scope.popupTambah.open().center();
            }

            $scope.closePopUp = () => {
                $scope.reset();
                $scope.popupTambah.close();
            }

            $scope.simpanData = (method) => {
                var listRawRequired = [
                    "item.namaIndikator|ng-model|Nama Indikator",
                    "item.satuanIndikator|ng-model|Satuan Indikator",
                    "item.jenisIndikator|k-ng-model|Jenis Indikator"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    let statusEnabled = method === 'save' || method === 'update';
                    let dataSave = {
                        statusEnabled: statusEnabled,
                        kdProfile: 0,
                        namaIndikator: $scope.item.namaIndikator,
                        satuanIndikator: {
                            id: $scope.item.satuanIndikator.id
                        },
                        statusVerifikasi: $scope.item.statusVerif ? true : false,
                        jenisIndikator: $scope.item.jenisIndikator.id
                    }

                    if ($scope.item.idMasterKinerja) {
                        dataSave.id = $scope.item.idMasterKinerja;
                    }

                    if ($scope.isDuplicated) {
                        toastr.warning("Indikator kinerja sudah tersedia!")
                        return
                    } else {
                        ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-master-indikator-kinerja").then(res => {
                            $scope.getDataMaster();
                            $scope.closePopUp();
                        })
                    }
                } else {
                    $scope.isRouteLoading = false;
                    ModelItem.showMessages(isValid.messages);
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
                $scope.item.statusVerif = null;
                $scope.item.idMasterKinerja = null;
            }

            $scope.$watch('item.namaIndikator', function (e) {
                if (!e) return;
                ManageSdmNew.getListData("iki-remunerasi/get-duplicate-indikator-kinerja?idIndikator=" + ($scope.item.idMasterKinerja ? $scope.item.idMasterKinerja : "") + "&namaIndikator=" + encodeURIComponent($scope.item.namaIndikator).replace(/%20/g, "+")).then(res => {
                    if (res.data.data.length > 0) {
                        $scope.isDuplicated = true
                    }
                })
            })

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
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                columns: [{
                    "title": "<input id='headCheckbox' type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                    template: "# if (statusPilih) { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
                        "# } else { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
                        "# } #",
                    width: "50px"
                }, {
                    field: "namaJabatan",
                    title: "<h3>Nama Jabatan</h3>",
                    filterable: true
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
                });
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
                if (!id) return;

                ManageSdmNew.getListData("service/list-generic/?view=IndikatorKinerja&select=id,namaIndikator&criteria=statusEnabled,statusVerifikasi,jenisIndikator&values=true,true," + id + "&order=namaIndikator:asc").then((res) => {
                    $scope.listMasterIndikator = res.data;
                })
            }

            $scope.getAllJabatan = () => {
                if (!$scope.mapping.srcNamaIndikator.id) {
                    toastr.warning("Gagal menampilkan data", "Perhatian!");
                    return;
                }

                ManageSdmNew.getListData("iki-remunerasi/set-mapping-indikator-jabatan?indikatorId=" + $scope.mapping.srcNamaIndikator.id).then((res) => {
                    let lengthDataPilih = 0;
                    $scope.statusPilih
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].statusPilih) {
                            lengthDataPilih++;
                        }
                    }
                    $("#headCheckbox").prop("checked", false);
                    if(lengthDataPilih === res.data.data.length) $("#headCheckbox").prop("checked", true);
                    toastr.info(`Ditemukan data ${lengthDataPilih} terpilih`, "Info");
                    
                    $scope.dataSourceJabatan = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    })
                    
                });
            }

            $scope.confirmSimpanBanyakMapping = () => {
                let gridMapping = $("#gridConfirmMapping").data("kendoGrid");
                // gridMapping.hideColumn(0);
                $scope.showTanggalBerlaku = true;
                let dataTerpilih = [];
                if (!dataTerpilih) {
                    toastr.warning("Harap pilih data terlebih dahulu!", "Perhatian!");
                    return;
                }

                for (let i = 0; i < $scope.dataSourceJabatan._data.length; i++) {
                    if ($scope.dataSourceJabatan._data[i].statusPilih) {
                        dataTerpilih.push($scope.dataSourceJabatan._data[i]);
                    }
                }

                $scope.dataSourceConfirmMapping = new kendo.data.DataSource({
                    data: dataTerpilih,
                    pageSize: 100
                });

                $scope.popupConfirmMapping.open().center();
            }

            $scope.simpanDataMappingBanyak = () => {

                let dataSave = [],
                    dataSource = $scope.dataSourceConfirmMapping._data;
                console.log($scope.dataSourceConfirmMapping._data);

                for (let i = 0; i < dataSource.length; i++) {
                    dataSource[i].tglBerlaku = dateHelper.formatDate(dataSource[i].tglBerlaku, "YYYY-MM-DD");


                    let temp = {
                        indikatorKinerja: {
                            id: $scope.mapping.srcNamaIndikator.id
                        },
                        jabatan: {
                            id: dataSource[i].jabatanId
                        },
                        tanggalMulaiBerlaku: dateHelper.toTimeStamp(dataSource[i].tglBerlaku),
                        kdProfile: 0,
                        statusEnabled: true
                    }

                    if (dataSource[i].noRec && !dataSource[i].statusPilih) {
                        temp.noRec = dataSource[i].noRec;
                        temp.statusEnabled = dataSource[i].statusPilih;
                    }
                    dataSave.push(temp);

                }

                console.log(dataSave);
                ManageSdmNew.saveData(dataSave, "iki-remunerasi/save-mapping-indikator-all-jabatan?loginUserId=" + dataLogin.id).then(res => {
                    $scope.popupConfirmMapping.close();
                })

            }

            $scope.simpanTanggalBerlaku = () => {
                let dataSource = $scope.dataSourceConfirmMapping._data;
                for (let i = 0; i < dataSource.length; i++) {
                    dataSource[i].tglBerlaku = $scope.mapping.tglBerlakuBanyak;
                }

                $scope.dataSourceConfirmMapping = new kendo.data.DataSource({
                    data: dataSource,
                    pageSize: 100
                })
            }

            $scope.optConfirmMapping = {
                filterable: false,
                sortable: true,
                autoBind: true,
                navigatable: true,
                pageable: true,
                editable: {
                    mode: 'inline'
                },
                columns: [{
                    "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllMappingRow()' />",
                    template: "# if (statusPilih) { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRowMapping(dataItem)' checked />" +
                        "# } else { #" +
                        "<input type='checkbox' class='checkbox' ng-click='selectRowMapping(dataItem)' />" +
                        "# } #",
                    width: "5%"
                }, {
                    field: "jenisJabatan",
                    title: "<h3>Jenis Jabatan</h3>",
                    editable: false,
                    width: "20%"
                }, {
                    field: "namaJabatan",
                    title: "<h3>Nama Jabatan</h3>",
                    editable: false,
                    width: "60%"
                }, {
                    field: "tglBerlaku",
                    title: "<h3>Tanggal Berlaku</h3>",
                    editable: true,
                    format: "{0:yyyy-MM-dd}",
                    editor: dateTimeEditor,
                    width: "15%"
                }]
            }

            function dateTimeEditor(container, options) {
                console.log(options);
                let isEdit = options.model.tglBerlaku === null;
                if (isEdit) {
                    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"value="' + options.model.tglBerlaku + '"/>')
                        .appendTo(container)
                        .kendoDateTimePicker({});
                } else {
                    $('<input c-text-box type="input" class="k-textbox" ng-disabled="true" value="' + options.model.tglBerlaku + '"/>').appendTo(container);
                }

            }

            $scope.showDataDeleting = () => {
                let gridMapping = $("#gridConfirmMapping").data("kendoGrid");

                // gridMapping.showColumn(0);
                $scope.showTanggalBerlaku = false;

                let dataTerpilih = [];
                if (!dataTerpilih) {
                    toastr.warning("Harap pilih data terlebih dahulu!", "Perhatian!");
                    return;
                }

                for (let i = 0; i < $scope.dataSourceJabatan._data.length; i++) {
                    if ($scope.dataSourceJabatan._data[i].statusPilih) {
                        dataTerpilih.push($scope.dataSourceJabatan._data[i]);
                    }
                }

                console.log(dataTerpilih);
                $scope.dataSourceConfirmMapping = new kendo.data.DataSource({
                    data: dataTerpilih,
                    pageSize: 100,
                });

                $scope.popupConfirmMapping.open().center();
            }

            $scope.selectRow = function (dataItem) {
                let dataSelect = _.find($scope.dataSourceJabatan._data, (data) => {
                    return data.jabatanId == dataItem.jabatanId;
                });

                dataSelect.statusPilih = !dataSelect.statusPilih;
            }

            var isCheckAll = false;
            $scope.selectUnselectAllRow = function () {
            
                var tempData = $scope.dataSourceJabatan._data;

                if (isCheckAll) {
                    isCheckAll = false;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statusPilih = false;
                    }
                } else {
                    isCheckAll = true;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statusPilih = true;
                    }
                }

                console.log(tempData);
                $scope.dataSourceJabatan = new kendo.data.DataSource({
                    data: tempData,
                    pageSize: 100
                })
            }

            var isCheckAllMapping = false;
            $scope.selectRowMapping = function (dataItem) {
                let dataSelect = _.find($scope.dataSourceConfirmMapping._data, (data) => {
                    return data.jabatanId == dataItem.jabatanId;
                });

                dataSelect.statusPilih = !dataSelect.statusPilih;
            }

            $scope.selectUnselectAllRowMapping = function () {
                var tempData = $scope.dataSourceConfirmMapping._data;

                if (isCheckAllMapping) {
                    isCheckAllMapping = false;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statusPilih = false;
                    }
                } else {
                    isCheckAllMapping = true;
                    for (var i = 0; i < tempData.length; i++) {
                        tempData[i].statusPilih = true;
                    }
                }
                $scope.dataSourceConfirmMapping = new kendo.data.DataSource({
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