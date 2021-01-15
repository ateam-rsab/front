define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MappingUraianTugasCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', '$timeout',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, $timeout) {
            $scope.isRouteLoading = false;
            $scope.model = {};

            $scope.init = function () {
                $scope.isRouteLoading = true;

                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=PelaksanaanTugas&select=id,pelaksanaanTugas&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan&values=3&criteria=statusEnabled&values=true", true)
                ]).then(function (e) {
                    $scope.listPelaksana = e[0];
                    $scope.listJabatan = e[1];

                    ManageSdm.getOrderList("service/list-generic/?view=RincianKegiatan&select=*&criteria=statusEnabled&values=true").then(function (res) {
                        $scope.gridUraianTugas = new kendo.data.DataSource({
                            data: res.data,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: { editable: false },
                                        uraianTugas: {
                                            editable: true, validation: {
                                                validasiUraian: function (textarea) {
                                                    if (textarea.is("[name='uraianTugas']") && textarea.val() === "") {
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            }
                                        },
                                        satuan: {
                                            validation: {
                                                validasiSatuan: function (input) {
                                                    return true;
                                                }
                                            }
                                        },
                                    }
                                }
                            },
                            pageSize: 20
                        })

                        $scope.isRouteLoading = false;
                    }, function (error) {
                        messageContainer.error(error);
                        $scope.isRouteLoading = false;
                    })
                }, function (error) {
                    $scope.isRouteLoading = true;
                })
            }

            $scope.init();

            $scope.dataGridUraiantugas = {
                autoSync: false,
                toolbar: [{
                    name: "create", text: "Input Rincian Kegiatan"
                },
                {
                    text: "Daftar Mapping Rincian Kegiatan",
                    template: '<a ng-click="keDaftarMapping($event)" class="k-button k-button-icontext k-grid-edit" href="\\#">Daftar Mapping Rincian Kegiatan</a>'
                }],
                editable: { mode: "popup", window: { title: "Input Rincian Kegiatan", animation: false, width: "29.7%", /* height: "100%" */ }, template: kendo.template($("#kendo-popup-editor").html()) },
                columns: [
                    {
                        field: "id",
                        title: "id",
                        hidden: true
                    },
                    {
                        field: "rincianKegiatan",
                        title: "Rincian Kegiatan",
                        width: "63%",
                        filterable: {
                            mode: "cell"
                        }
                    },
                    {
                        field: "satuan",
                        title: "Satuan",
                        width: "10%",
                        filterable: false
                    },
                    { command: [{ name: "edit", text: "Edit" }, { text: "Mapping", click: showDetails }, { text: "Hapus", click: hapusData }], title: "&nbsp;", width: "17%" }
                ],
                pageable: true,
                scrollable: false,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai Dengan:",
                            contains: "Mengandung:"
                        }
                    }
                },
                save: function (e) {
                    $scope.Save(e.model);
                }
            }

            function showDetails(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item = dataItem;
                $scope.mappingTugas.center().open();

                $timeout(function () {
                    angular.element(document.getElementById('btn')).trigger('click')
                });
            }

            function hapusData(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var datasend = {
                    "satuan": dataItem.satuan,
                    "rincianKegiatan": dataItem.rincianKegiatan,
                    "id": dataItem.id,
                    "statusEnabled": false
                };

                ManageSdmNew.saveData(datasend, "sdm/save-rincian-kegiatan").then(function (res) {
                    if (res.status === 201) {
                        $scope.init();
                    }
                }, function (error) {
                    messageContainer.error(error);
                })
            }

            $scope.click = function () {
                console.log('click');
            }

            $scope.Save = function (data) {
                if (data.rincianKegiatan) {
                    var datasend = {
                        "satuan": data.satuan,
                        "rincianKegiatan": data.rincianKegiatan,
                        "id": data.id,
                        "statusEnabled": true
                    };
                    ManageSdmNew.saveData(datasend, "sdm/save-rincian-kegiatan").then(function (res) {
                        if (res.status === 201) {
                            $scope.init();
                        }
                    }, function (error) {
                        messageContainer.error(error);
                    })
                } else {
                    messageContainer.error('Rincian kegiatan tidak boleh kosong')
                }
            }

            $scope.simpanMappingTugas = function (data) {
                var listRawRequired = [
                    "item.pelaksanaanTugas|k-ng-model|Pelaksaan tugas",
                    "item.rincianKegiatan|ng-model|Uraian tugas",
                    "item.jabatan|k-ng-model|Jabatan",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var sendData = {
                        "pelaksanaanTugas": {
                            "id": data.pelaksanaanTugas.id
                        },
                        "jabatan": {
                            "id": data.jabatan.id
                        },
                        "rincianKegiatan": {
                            "id": data.id,
                            "rincianKegiatan": data.rincianKegiatan,
                        },
                        "dokumen": {
                            "id": 11488
                        },
                        "periode": "",
                        "statusEnabled": true
                    }

                    ManageSdmNew.saveData(sendData, "sdm/save-map-rincian-kegiatan-to-uraian-tugas").then(function (res) {
                        if (res.status === 201) {
                            delete $scope.item;
                            $scope.mappingTugas.close();
                        }
                    }, function (error) {
                        messageContainer.error(error);
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.masterUraian = function (e) {
                e.preventDefault();
                $state.go('MasterUraianTugas')
            }

            $scope.keDaftarMapping = function (e) {
                e.preventDefault();
                $state.go('DaftarMappingUraianTugas')
            }

            $scope.lihatDaftarMapping = function () {
                $state.go('DaftarMappingUraianTugas')
            }

            $scope.closeMappingTugas = function () {
                delete $scope.item;
                // remove if there is input validation error before close window
                $("input").removeClass("validation-error");
                $scope.mappingTugas.close();
            }

            var timeoutPromise;
            $scope.$watch('model.kegiatan', function (newVal, oldVal) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("rincianKegiatan", newVal)
                    }
                }, 1000)
            })

            function applyFilter(filterField, filterValue) {
                var gridData = $("#gridUraianTugas").data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if (currentFilters && currentFilters.length > 0) {
                    for (var i = 0; i < currentFilters.length; i++) {
                        if (currentFilters[i].field == filterField) {
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if (filterValue) {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });

                $scope.resetDatasource = function () {
                    var gridData = $("#gridUraianTugas").data("kendoGrid");
                    gridData.dataSource.filter({});
                    $scope.model = {};
                }
            }
        }
    ]);
});