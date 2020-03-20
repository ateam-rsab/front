define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DataFormasiJabatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {

            $scope.dataVOloaded = true;
            $scope.item = {};

            var initFormasiJabatan = function () {
                $scope.gridDataFormasi = {
                    pageable: true,
                    columns: [
                        {
                            field: "jabatan.namaJabatan",
                            title: "Jabatan", width: "150px",
                            hidden: true
                        },
                        {
                            field: "unitKerjaPegawai.name",
                            title: "<h3 class='small-font'>Unit Kerja</h3>", width: "150px"
                        },
                        {
                            field: "subUnitKerjaPegawai.name",
                            title: "<h3 class='small-font'>Sub<br>Unit Kerja</h3>", width: "150px"
                        },
                        {
                            field: "pegawai.nipPns",
                            title: "<h3 class='small-font'>NIP</h3>", width: "150px"
                        },
                        {
                            field: "pegawai.namaLengkap",
                            title: "<h3 class='small-font'>Pegawai</h3>", width: "150px"
                        },
                        {
                            field: "kategoryPegawai.kategoryPegawai",
                            title: "<h3 class='small-font'>Kategori</h3>", width: "150px"
                        },
                        {
                            command: [{
                                text: "Lihat",
                                width: "40px",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataPegawai,
                                imageClass: "k-i-arrow-60-right"
                            }],
                            title: "",
                            width: "120px",
                            attributes: {
                                style: "text-align:center;valign=middle"
                            },
                        }
                    ]
                };
            };

            function editDataPegawai(e) {
                $scope.isRouteLoading = true;
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                $scope.dataItem = dataItem;
                if ($scope.dataItem) {
                    $state.go("RekamDataPegawai", { idPegawai: $scope.dataItem.pegawai.id });
                } else {
                    messageContainer.error('Pegawai belum di pilih')
                }
            }

            $scope.init = function () {
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true&order=namaJabatan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled&values=true&order=name:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true&order=namaLengkap:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KategoryPegawai&select=id,kategoryPegawai&criteria=statusEnabled&values=true&order=kategoryPegawai:asc", true)

                ]).then(function (res) {
                    var tempDataJabatan = res[0].data;
                    $scope.ListJabatan = []
                    tempDataJabatan.forEach(function (el) {
                        if (el.id !== 0) {
                            var dataTemp = {
                                namaJabatan: el.namaJabatan,
                                id: el.id
                            }
                            $scope.ListJabatan.push(dataTemp);
                        }
                    })

                    var tempDataUnitKerja = res[1].data;
                    $scope.ListUnitKerja = [];
                    tempDataUnitKerja.forEach(function (el) {
                        if (el.id !== 0) {
                            var dataTemp = {
                                name: el.name,
                                id: el.id
                            }
                            $scope.ListUnitKerja.push(dataTemp);
                        }
                    })

                    var tempDataPegawai = res[2].data;
                    $scope.ListPegawai = [];
                    tempDataPegawai.forEach(function (el) {
                        if (el.id !== 0) {
                            if (el.id !== 320263) {
                                if (el.id !== 320264) {
                                    if (el.id !== 320272) {
                                        var dataTemp = {
                                            namaLengkap: el.namaLengkap,
                                            id: el.id
                                        }
                                        $scope.ListPegawai.push(dataTemp);
                                    }
                                }
                            }
                        }
                    })

                    var tempDataKategori = res[3].data;
                    $scope.ListKategoryPegawai = [];
                    tempDataKategori.forEach(function (el) {
                        if (el.id !== 0) {
                            if (el.id !== 16) { // mitra tidak boleh muncul
                                if (el.id !== 17) { // peserta didik tidak boleh muncul
                                    var dataTemp = {
                                        kategoryPegawai: el.kategoryPegawai,
                                        id: el.id
                                    }
                                    $scope.ListKategoryPegawai.push(dataTemp);
                                }
                            }
                        }
                    })

                    $scope.loadDataFormasi();
                    initFormasiJabatan();
                });
            };

            $scope.init();

            $scope.loadDataFormasi = function () {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-formasi-jabatan").then(function (data) {
                    $scope.dataSourceFormasi = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        group: {
                            field: "jabatan.namaJabatan"
                        },
                        sort: [
                            { field: "jabatan.namaJabatan", dir: "asc" },
                            { field: "unitKerjaPegawai.name", dir: "asc" },
                            { field: "subUnitKerjaPegawai.name", dir: "asc" },
                            { field: "kategoryPegawai.kategoryPegawai", dir: "asc" },
                            { field: "pegawai.namaLengkap", dir: "asc" }
                        ]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.$watch('item.jabatan', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("jabatan.id", newVal)
                }
            });

            $scope.$watch('item.unitKerja', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("unitKerjaPegawai.id", newVal)
                }
            });

            $scope.$watch('item.kategoriPegawai', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("kategoryPegawai.id", newVal)
                }
            });

            $scope.$watch('item.pegawai', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("pegawai.id", newVal)
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

                if (filterField === "jabatan.id") {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                }

                if (filterField === "unitKerjaPegawai.id") {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                }

                if (filterField === "kategoryPegawai.id") {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                }

                if (filterField === "pegawai.id") {
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
