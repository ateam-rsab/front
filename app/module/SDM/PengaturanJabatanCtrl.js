define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengaturanJabatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {

            $scope.isDirut = false;
            $scope.isNotDirut = true;
            $scope.isDireksi = false;
            $scope.isStaff = true;
            $scope.isEdit = false;
            $scope.dataVOloaded = true;
            $scope.enableBtnSimpanJabatanInternal = true;
            $scope.item = {};
            $scope.ji = {};

            var initPengaturanJabatan = function () {
                $scope.gridJabatanInternal = {
                    pageable: true,
                    columns: [
                        {
                            field: "unitKerjaPegawai",
                            title: "<h3 class='small-font'>Unit Kerja</h3>", width: "150px",
                            template: "#if(unitKerjaPegawai) { # #= unitKerjaPegawai.name # #} else { #-# } #",
                        },
                        {
                            field: "subUnitKerjaPegawai",
                            title: "<h3 class='small-font'>Sub<br>Unit Kerja</h3>", width: "150px",
                            template: "#if(subUnitKerjaPegawai) { # #= subUnitKerjaPegawai.name # #} else { #-# } #",
                        },
                        {
                            field: "pegawai",
                            title: "<h3 class='small-font'>Pegawai</h3>", width: "155px",
                            template: "#if(pegawai) { # #= pegawai.namaLengkap # #} else { #-# } #",
                        },
                        {
                            field: "jenisJabatan",
                            title: "<h3 class='small-font'>Jenis<br>Jabatan</h3>", width: "100px",
                            template: "#if(jenisJabatan) { # #= jenisJabatan.jenisJabatan # #} else { #-# } #",
                            hidden: true
                        },
                        {
                            field: "kategoryPegawai",
                            title: "<h3 class='small-font'>Kategori<br>Pegawai</h3>", width: "100px",
                            template: "#if(kategoryPegawai) { # #= kategoryPegawai.kategoryPegawai # #} else { #-# } #",
                        },
                        {
                            field: "jabatan",
                            title: "<h3 class='small-font'>Jabatan</h3>", width: "150px",
                            template: "#if(jabatan) { # #= jabatan.namaJabatan # #} else { #-# } #",
                        },
                        {
                            field: "atasanLangsung",
                            title: "<h3 class='small-font'>Atasan<br>Langsung</h3>", width: "155px",
                            template: "#if(!atasanLangsungDireksi) { # #= atasanLangsung.namaLengkap # #} else { # #=atasanLangsungDireksi# # } #"
                        },
                        {
                            field: "pejabatPenilai",
                            title: "<h3 class='small-font'>Atasan<br>Pejabat Penilai</h3>", width: "155px",
                            template: "#if(!pejabatPenilaiDireksi) { # #= pejabatPenilai.namaLengkap # #} else { # #=pejabatPenilaiDireksi# # } #"
                        },
                        {
                            field: "atasanLangsungDireksi",
                            title: "<h3 class='small-font'>Atasan<br>Langsung</h3>", width: "155px",
                            hidden: true
                        },
                        {
                            field: "pejabatPenilaiDireksi",
                            title: "<h3 class='small-font'>Pejabat<br>Penilai</h3>", width: "155px",
                            hidden: true
                        },
                        {
                            command: [{
                                text: "Edit",
                                align: "center",
                                attributes: {
                                    align: "center"
                                },
                                click: editDataJabatanInternal,
                                imageClass: "k-icon k-i-pencil"
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

            $scope.init = function () {
                $q.all([
                    ManageSdmNew.getListData("sdm/get-all-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                    ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true&order=namaLengkap:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true&order=namaJabatan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled&values=true&order=jenisJabatan:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KategoryPegawai&select=id,kategoryPegawai&criteria=statusEnabled&values=true&order=kategoryPegawai:asc", true),
                    ManageSdm.getOrderList("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled&values=true&order=name:asc", true),
                ]).then(function (res) {
                    $scope.ListUnitKerja = res[0].data.data;
                    $scope.ListUnitKerjaPop = res[0].data.data;
                    $scope.ListSubUnitKerja = res[1].data.data;
                    $scope.ListSubUnitKerjaPop = res[1].data.data;
                    var tempDataPegawai = res[2].data;
                    $scope.listPegawai = [];
                    tempDataPegawai.forEach(function (el) {
                        if (el.id !== 320272) {
                            var dataTemp = {
                                namaLengkap: el.namaLengkap,
                                id: el.id
                            }
                            $scope.listPegawai.push(dataTemp);
                        }
                    })
                    $scope.ListJabatan = res[3].data;
                    $scope.listJenisJabatan = res[4].data;
                    $scope.listKategoryPegawai = res[4].data;
                    $scope.listUnitKerja = res[6].data;

                    $scope.loadDataGridJabatan();
                    initPengaturanJabatan();
                });
                $scope.monthSelectorOptions = {
                    start: "year",
                    depth: "year"
                };
            };

            $scope.init();

            $scope.loadDataGridJabatan = function () {
                $scope.isRouteLoading = true;

                ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-undefined-bawahan").then(function (data) {
                    $scope.dataSourceJabatanInternal = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        sort: [
                            { field: "unitKerjaPegawai.name", dir: "asc" },
                            { field: "subUnitKerjaPegawai.name", dir: "asc" },
                            { field: "pegawai.namaLengkap", dir: "asc" }
                        ]
                    });
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
            };

            $scope.simpanJabatanInternal = function () {
                $scope.enableBtnSimpanJabatanInternal = false;

                var newModel = [];
                newModel.push(getDataChanged($scope.ji));
                newModel[0]['id'] = $scope.ji.idGridInternalJabatan;
                newModel[0]['statusEnabled'] = true;

                for (var key in newModel[0]) {
                    if (newModel[0].hasOwnProperty(key)) {
                        if (key.indexOf('pegawai') >= 0) {
                            if (newModel[0][key] === null) {
                                delete newModel[0][key];
                            }
                        }
                        if (key.indexOf('subUnitKerjaPegawai') >= 0) {
                            if (newModel[0][key] === null) {
                                delete newModel[0][key];
                            }
                        }
                        if (key.indexOf('atasanLangsung') == 0) {
                            if (newModel[0]['atasanLangsung'] === null || newModel[0]['atasanLangsung'] === '') {
                                delete newModel[0]['atasanLangsung'];
                            }
                        }
                        if (key.indexOf('pejabatPenilai') == 0) {
                            if (newModel[0]['pejabatPenilai'] === null || newModel[0]['pejabatPenilai'] === '') {
                                delete newModel[0]['pejabatPenilai'];
                            }
                        }
                        if (key.indexOf('pejabatPenilaiDireksi') >= 0) {
                            if (newModel[0][key] === null || newModel[0][key] === '') {
                                delete newModel[0][key];
                            }
                        }
                        if (key.indexOf('atasanLangsungDireksi') >= 0) {
                            if (newModel[0][key] === null) {
                                delete newModel[0][key];
                            }
                        }
                    }
                }

                ManageSdmNew.saveData(newModel, "map-pegawai-jabatan-unitkerja/save-map").then(function (res) {
                    $scope.isRouteLoading = true;
                    $scope.idGridInternalJabatan = null;
                    $scope.popUpJabatan.close();
                    $scope.loadDataGridJabatan();
                    $scope.enableBtnSimpanJabatanInternal = true;
                }, (error) => {
                    $scope.enableBtnSimpanJabatanInternal = true;
                });
            }

            $scope.getDataSubUnitKerjaById = function (id, data) {
                $('#idComboSubUnitKerja').data('kendoComboBox').value('');

                if (data.name === 'Direksi') {
                    $scope.isDireksi = true;
                    $scope.isStaff = false;
                } else {
                    $scope.isDireksi = false;
                    $scope.isStaff = true;
                }

                ManageSdmNew.getListData('sdm/get-sub-unit-kerja-by-unit-kerja?idUnitKerjaPegawai=' + id).then(res => {
                    $scope.ListSubUnitKerjaById = [];
                    res.data.data.forEach(function (e) {
                        $scope.ListSubUnitKerjaById.push({
                            id: e.id,
                            name: e.namaSubunitKerja
                        })
                    })
                })
            }

            function editDataJabatanInternal(e) {
                e.preventDefault();
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);

                $scope.getDataJabatan(dataItem.jenisJabatan.id);
                clearPop();

                if ($scope.item.detailKelompokJabatan) {
                    if ($scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIREKTUR UTAMA (DIRUT)' ||
                        $scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIREKTUR UTAMA' ||
                        $scope.item.detailKelompokJabatan.detailKelompokJabatan.toUpperCase() === 'DIRUT') {
                        $scope.isDirut = true;
                        $scope.isNotDirut = false;
                    } else {
                        $scope.isDirut = false;
                        $scope.isNotDirut = true;
                    }
                }
                if ($scope.item.unitKerjaPegawai) {
                    if ($scope.item.unitKerjaPegawai.name = 'Direksi') {
                        $scope.isDireksi = true;
                        $scope.isStaff = false;
                    } else {
                        $scope.isDireksi = false;
                        $scope.isStaff = true;
                    }
                }

                $scope.getDataSubUnitKerjaById(dataItem.unitKerjaPegawai.id, dataItem.unitKerjaPegawai);

                $scope.ji.idGridInternalJabatan = dataItem.id;
                $scope.ji.pegawai = {
                    namaLengkap: dataItem.pegawai ? dataItem.pegawai.namaLengkap : '',
                    id: dataItem.pegawai ? dataItem.pegawai.id : ''
                }
                $scope.ji.kategoryPegawai = {
                    kategoryPegawai: dataItem.kategoryPegawai.kategoryPegawai,
                    id: dataItem.kategoryPegawai.id
                }
                $scope.ji.jenisJabatan = {
                    jenisJabatan: dataItem.jenisJabatan.jenisJabatan,
                    id: dataItem.jenisJabatan.id
                }
                $scope.ji.jabatan = {
                    namaJabatan: dataItem.jabatan.namaJabatan,
                    id: dataItem.jabatan.id
                }
                $scope.ji.unitKerjaPegawai = {
                    id: dataItem.unitKerjaPegawai.id,
                    name: dataItem.unitKerjaPegawai.name
                };
                $scope.ji.subUnitKerjaPegawai = {
                    id: dataItem.subUnitKerjaPegawai.id,
                    name: dataItem.subUnitKerjaPegawai.name
                };
                $scope.ji.atasanLangsung = {
                    namaLengkap: dataItem.atasanLangsung ? dataItem.atasanLangsung.namaLengkap : '',
                    id: dataItem.atasanLangsung ? dataItem.atasanLangsung.id : ''
                }
                $scope.ji.pejabatPenilai = {
                    namaLengkap: dataItem.pejabatPenilai ? dataItem.pejabatPenilai.namaLengkap : '',
                    id: dataItem.pejabatPenilai ? dataItem.pejabatPenilai.id : ''
                }
                $scope.ji.atasanLangsungDireksi = dataItem.atasanLangsungDireksi;
                $scope.ji.pejabatPenilaiDireksi = dataItem.pejabatPenilaiDireksi;
                $scope.ji.isPrimary = dataItem.isPrimary;
                $scope.ji.isMonitoring = dataItem.isMonitoring;
                $scope.ji.isCanCreateJadwal = dataItem.isCanCreateJadwal;
                $scope.popUpJabatan.center().open();
            }

            function clearPop() {
                $scope.id = "";
                $scope.isDirut = false;
                $scope.isNotDirut = true;
                $scope.isDireksi = false;
                $scope.isStaff = true;
                $scope.ji.jabatan = "";
                $scope.ji.kategeryPegawai = '';
                $scope.ji.jenisJabatan = '';
                $scope.ji.pejabatPenilai = '';
                $scope.ji.pejabatPenilaiDireksi = "";
                $scope.ji.atasanLangsung = '';
                $scope.ji.unitKerjaPegawai = "";
                $scope.ji.subUnitKerjaPegawai = null;
                $scope.ji.isPrimary = false;
                $scope.ji.isMonitoring = false;
                $scope.ji.isCanCreateJadwal = false;
            }

            $scope.batal = function () {
                $scope.ji.idGridInternalJabatan = null;
                $scope.popUpJabatan.close();
            };

            $scope.getJabatan = function (data) {
                if (data.namaJabatan.match('Direktur Utama')) {
                    $scope.isDirut = true;
                    $scope.isNotDirut = false;
                } else {
                    $scope.isDirut = false;
                    $scope.isNotDirut = true;
                }
            }

            $scope.getDataJabatan = function (id) {
                $("#idComboDataJabatan").data("kendoComboBox").value("");
                ManageSdmNew.getListData("sdm/get-all-jabatan-by-jenis-jabatan?idJenisJabatan=" + id, true).then(function (res) {
                    $scope.listJabatanByJenisJabatan = res.data;
                    $scope.listJabatanByJenisJabatanInternal = [];
                    res.data.data.forEach(function (e) {
                        $scope.listJabatanByJenisJabatanInternal.push({
                            id: e.idJabatan,
                            namaJabatan: e.namaJabatan
                        })
                    })
                });
            }

            function convertTanggal(tgl) {
                let tglConvert, day;
                if (typeof tgl === 'object') {
                    tgl = dateHelper.formatDate(tgl, 'DD-MM-YYYY');
                }
                let tempTgl = tgl.split('-');
                if (parseInt(tempTgl[0]) < 10) {
                    day = '0' + tempTgl[0];
                }
                tglConvert = `${tempTgl[0]}-${tempTgl[1]}-${tempTgl[2]}`;

                return tglConvert
            }

            function getDataChanged(newData) {
                var dataChanged = {},
                    oldData = $scope.oldData;
                if (oldData) {
                    for (var key in newData) {
                        if (oldData.hasOwnProperty(key)) {
                            if (key.indexOf("tgl") >= 0 && newData[key] != null) {
                                if (convertTanggal(oldData.tglLahir) === dateHelper.formatDate(newData[key], 'DD-MM-YYYY')) {
                                    delete newData[key];
                                } else {
                                    newData[key] = dateHelper.formatDate(newData[key], 'DD-MM-YYYY')
                                }
                            };
                            if (newData[key] === "") {
                            }
                            if (newData[key] !== oldData[key]) {
                                dataChanged[key] = newData[key];
                            }
                        } else if (newData.hasOwnProperty(key)) {
                            dataChanged[key] = newData[key];
                        }
                    }
                } else {
                    for (var key in newData) {
                        if (newData.hasOwnProperty(key)) {
                            dataChanged[key] = newData[key]
                        }
                    }
                }
                return dataChanged;
            }

            var timeoutPromise;
            $scope.$watch('item.namaLengkap', function (newVal, oldVal) {
                if (!newVal) return;
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    if (newVal && newVal !== oldVal) {
                        applyFilter("pegawai.namaLengkap", newVal);
                    }
                }, 500)
            });

            $scope.$watch('item.unitKerja', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("unitKerjaPegawai.id", newVal)
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

                if (filterField === "pegawai.namaLengkap") {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                if (filterField === "unitKerjaPegawai.id") {
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
