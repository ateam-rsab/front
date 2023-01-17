define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MapRuanganToAkomodasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.enableBtnSimpanAkomodasi = true;
            $scope.item = {};
            $scope.ma = {};
            $scope.ListBoolean = [
                { name: 'Tidak', id: 0 },
                { name: 'Ya', id: 1 }
            ];

            var initAkomodasi = function () {
                $scope.gridAkomodasi = {
                    toolbar: [{
                        name: "create",
                        text: "Buat Mapping Baru",
                        template: '<button ng-click="createNewMapping()" id="btnCreateNewMapping" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Mapping</button>'
                    }],
                    pageable: true,
                    columns: [
                        {
                            field: "ruangan",
                            title: "<h3 class='small-font'>Ruangan</h3>", width: "150px",
                            template: "#if(ruangan) { # #= ruangan.namaRuangan # #} else { #-# }#"
                        },
                        {
                            field: "kamar",
                            title: "<h3 class='small-font'>Kamar</h3>", width: "150px",
                            template: "#if(kamar) { # #= kamar.namaKamar # #} else { #-# }#"
                        },
                        {
                            field: "produk",
                            title: "<h3 class='small-font'>Produk</h3>", width: "150px",
                            template: "#if(produk) { # #= produk.namaProduk # #} else { #-# }#"
                        },
                        {
                            field: "isRawatGabung",
                            title: "<h3 class='small-font'>Status<br>Rawat Gabung</h3>",
                            template: "# if (isRawatGabung === 1) {# #= 'Ya' # #} else {# #= '-' # #}#",
                            width: "150px"
                        },
                        {
                            command: [{
                                text: "Edit",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataAkomodasi,
                                imageClass: "k-icon k-i-pencil"
                            }, {
                                text: "Hapus",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: hapusAkomodasi,
                                imageClass: "k-icon k-delete"
                            }],
                            title: "",
                            width: "120px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            }
                        }
                    ]
                };
            };

            $scope.init = function () {
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan&criteria=statusEnabled,departemenId&values=true,16&order=namaRuangan:asc", true)
                ]).then(function (res) {
                    $scope.ListRuangan = res[0].data;
                    $scope.ListRuanganFilter = [];
                    $scope.ListRuanganPop = res[0].data;

                    $scope.loadDataGrid();
                    initAkomodasi();
                });
            };

            $scope.init();

            $scope.loadDataGrid = function () {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("akomodasi/get-all-mapping").then(function (data) {
                    $scope.dataSourceAkomodasi = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "ruangan.namaRuangan", dir: "asc" },
                            { field: "produk.namaProduk", dir: "asc" }
                        ]
                    });

                    var listIdRuangan = [];
                    var tempListRuangan = $scope.ListRuangan;
                    tempListRuangan.forEach(function (el) {
                        data.data.data.forEach(function (dat) {
                            if (el.id == dat.ruangan.id && !listIdRuangan.includes(dat.ruangan.id)) {
                                var dataTemp = {
                                    namaRuangan: dat.ruangan.namaRuangan,
                                    id: dat.ruangan.id
                                };
                                listIdRuangan.push(dat.ruangan.id);
                                $scope.ListRuanganFilter.push(dataTemp);
                            };
                        })
                    })

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.createNewMapping = function () {
                clearPop();
                $scope.idGridAkomodasi = null;
                $scope.popUpAkomodasi.center().open();
                var actions = $scope.popUpAkomodasi.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpAkomodasi.setOptions({
                    actions: actions
                });
            };

            function hapusAkomodasi(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                var newModel = dataItem;
                if (newModel.isRawatGabung) {
                    if ($scope.ma && $scope.ma.isRawatGabung && $scope.ma.isRawatGabung.id == 1) {
                        newModel.isRawatGabung = $scope.ma.isRawatGabung.id
                    } else {
                        newModel.isRawatGabung = null
                    }
                }
                for (var key in newModel) {
                    if (newModel[key] === null || newModel[key] === undefined) {
                        delete newModel[key];
                    }
                }
                newModel.statusEnabled = false;

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data Mapping Akomodasi?')
                    .textContent(`Anda akan menghapus data Mapping Akomodasi`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    ManageSdmNew.saveData(newModel, "akomodasi/save-mapping").then(function (res) {
                        $scope.isRouteLoading = true;
                        $scope.idGridAkomodasi = null;
                        e.preventDefault();
                        $scope.loadDataGrid();
                    });
                }, function () {
                    e.preventDefault();
                });
            }

            $scope.simpanAkomodasi = function () {
                var listRawRequired = [
                    "ma.ruangan|k-ng-model|Ruangan",
                    "ma.produk|k-ng-model|Jenis Akomodasi"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.enableBtnSimpanAkomodasi = false;

                    var newModel = $scope.ma;
                    newModel.id = $scope.ma.idGridAkomodasi;
                    newModel.statusEnabled = true;
                    newModel.kdProfile = 0;
                    if (newModel.isRawatGabung) {
                        if ($scope.ma.isRawatGabung.id == 1) {
                            newModel.isRawatGabung = $scope.ma.isRawatGabung.id
                        } else {
                            newModel.isRawatGabung = null
                        }
                    }
                    for (var key in newModel) {
                        if (newModel[key] === null || newModel[key] === undefined) {
                            delete newModel[key];
                        }
                    }

                    ManageSdmNew.saveData(newModel, "akomodasi/save-mapping").then(function (res) {
                        $scope.isRouteLoading = true;
                        $scope.idGridAkomodasi = null;
                        $scope.popUpAkomodasi.close();
                        $scope.loadDataGrid();
                        $scope.enableBtnSimpanAkomodasi = true;
                    }, (error) => {
                        $scope.enableBtnSimpanAkomodasi = true;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.getDataKamarById = function (id) {
                $('#idComboKamar').data('kendoComboBox').value('');

                ManageSdmNew.getListData('akomodasi/get-kamar-by-ruangan?idRuangan=' + id).then(res => {
                    $scope.ListKamarById = [];
                    res.data.data.forEach(function (e) {
                        $scope.ListKamarById.push({
                            id: e.id,
                            namaKamar: e.namaKamar
                        })
                    })
                })
            }

            function editDataAkomodasi(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                clearPop();

                $scope.getDataKamarById(dataItem.ruangan.id);

                $scope.ma.idGridAkomodasi = dataItem.id;
                $scope.ma.ruangan = {
                    id: dataItem.ruangan.id,
                    namaRuangan: dataItem.ruangan.namaRuangan
                };
                if (dataItem.kamar) {
                    $scope.ma.kamar = {
                        id: dataItem.kamar.id,
                        namaKamar: dataItem.kamar.namaKamar
                    };
                }
                $scope.ma.produk = {
                    id: dataItem.produk.id,
                    namaProduk: dataItem.produk.namaProduk
                };
                $scope.ma.isRawatGabung = {
                    id: dataItem.isRawatGabung
                };
                $scope.popUpAkomodasi.center().open();
            }

            function clearPop() {
                $scope.id = "";
                $scope.ma.isRawatGabung = "";
                $scope.ma.ruangan = "";
                $scope.ma.kamar = null;
                $scope.ListKamarById = [];
                $scope.ma.produk = "";
                $scope.ListProdukFilter = [];
            }

            $scope.batal = function () {
                $scope.ma.idGridAkomodasi = null;
                $scope.popUpAkomodasi.close();
            };

            $scope.$watch('ma.ruangan', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    ManageSdmNew.getListData('akomodasi/get-akomodasi-ruangan-by-mapping-produk?idRuangan=' + newVal.id).then(res => {
                        $scope.ListProdukFilter = [];
                        res.data.data.forEach(function (e) {
                            $scope.ListProdukFilter.push({
                                id: e.id,
                                namaProduk: e.namaProduk
                            })
                        })
                    })
                }

            });

            $scope.$watch('item.ruangan', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("ruangan.id", newVal)
                }
            });

            function applyFilter(filterField, filterValue) {
                var dataGrid = $("#grid").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterField === "ruangan.id") {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });
            }

            $scope.resetFilter = function () {
                var gridData = $("#grid").data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = {};
            };

        }
    ]);
});
