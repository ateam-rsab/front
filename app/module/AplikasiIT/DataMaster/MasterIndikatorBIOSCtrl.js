define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MasterIndikatorBIOSCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'ReportService', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, ReportService, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.enableBtnSimpanIndikatorBIOS = true;
            $scope.item = {};
            $scope.ma = {};

            var initIndikatorBIOS = function () {
                $scope.gridIndikatorBIOS = {
                    toolbar: [{
                        name: "create",
                        text: "Buat Master Baru",
                        template: '<button ng-click="createNewMaster()" id="btnCreateNewMaster" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah Indikator</button>'
                    }],
                    pageable: true,
                    columns: [
                        {
                            field: "indikator",
                            title: "<h3 class='small-font'>Kode Indikator</h3>", width: "100px"
                        },
                        {
                            field: "uraian",
                            title: "<h3 class='small-font'>Nama Indikator</h3>", width: "200px"
                        },
                        {
                            command: [{
                                text: "Edit",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataIndikatorBIOS,
                                imageClass: "k-icon k-i-pencil"
                            }, {
                                text: "Hapus",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: hapusIndikatorBIOS,
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

            $scope.loadDataGrid = function () {
                $scope.isRouteLoading = true;

                ReportService.getListData("reporting/bios-data-master-indikator").then(function (data) {
                    $scope.dataSourceIndikatorBIOS = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10
                    });

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.init = function () {
                $scope.loadDataGrid();
                initIndikatorBIOS();
            };

            $scope.init();

            $scope.createNewMaster = function () {
                clearPop();
                $scope.idGridIndikatorBIOS = null;
                $scope.popUpIndikatorBIOS.center().open();
                var actions = $scope.popUpIndikatorBIOS.options.actions;
                actions.splice(actions.indexOf("Close"), 1);
                $scope.popUpIndikatorBIOS.setOptions({
                    actions: actions
                });
            };

            function hapusIndikatorBIOS(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                var newModel = dataItem;
                for (var key in newModel) {
                    if (newModel[key] === null || newModel[key] === undefined) {
                        delete newModel[key];
                    }
                }
                newModel.statusEnabled = false;

                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus data Master Indikator BIOS?')
                    .textContent(`Anda akan menghapus data Master Indikator BIOS`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    ManageSdmNew.saveData(newModel, "pelayanan/save-master-indikator-bios").then(function (res) {
                        $scope.isRouteLoading = true;
                        $scope.idGridIndikatorBIOS = null;
                        e.preventDefault();
                        $scope.loadDataGrid();
                    });
                }, function () {
                    e.preventDefault();
                });
            }

            $scope.simpanIndikatorBIOS = function () {
                var listRawRequired = [
                    "ma.indikator|k-ng-model|Kode Indikator",
                    "ma.uraian|k-ng-model|Nama Indikator"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.enableBtnSimpanIndikatorBIOS = false;

                    var newModel = $scope.ma;
                    newModel.id = $scope.ma.idGridIndikatorBIOS;
                    newModel.statusEnabled = true;
                    newModel.kdProfile = 0;
                    newModel.nmrumpun = "Kesehatan";
                    for (var key in newModel) {
                        if (newModel[key] === null || newModel[key] === undefined) {
                            delete newModel[key];
                        }
                    }

                    ManageSdmNew.saveData(newModel, "pelayanan/save-master-indikator-bios").then(function (res) {
                        $scope.isRouteLoading = true;
                        $scope.idGridIndikatorBIOS = null;
                        $scope.popUpIndikatorBIOS.close();
                        $scope.loadDataGrid();
                        $scope.enableBtnSimpanIndikatorBIOS = true;
                    }, (error) => {
                        $scope.enableBtnSimpanIndikatorBIOS = true;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            function editDataIndikatorBIOS(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                clearPop();

                $scope.ma.idGridIndikatorBIOS = dataItem.id;
                $scope.ma.indikator = dataItem.indikator;
                $scope.ma.uraian = dataItem.uraian;
                $scope.popUpIndikatorBIOS.center().open();
            }

            function clearPop() {
                $scope.id = "";
                $scope.ma.indikator = "";
                $scope.ma.uraian = "";
            }

            $scope.batal = function () {
                $scope.ma.idGridIndikatorBIOS = null;
                $scope.popUpIndikatorBIOS.close();
            };

            $scope.$watch('item.indikator', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("indikator", newVal)
                }
            });

            $scope.$watch('item.uraian', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("uraian", newVal)
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

                if (filterField === "indikator") {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                if (filterField === "uraian") {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
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
