define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CapaianTargetPelayananCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.isGridShowed = false;
            $scope.now = new Date();
            $scope.item.periode = new Date();
            $scope.yearSelected = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };

            var listBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            // var columnGrid = [
            //     {
            //         field: "unitKerjaPegawai",
            //         title: "<h3 class='small-font'>Unit Kerja</h3>", width: "150px",
            //         template: "#if(unitKerjaPegawai) { # #= unitKerjaPegawai.name # #} else { #-# } #",
            //         sortable: true
            //     },
            //     {
            //         field: "subUnitKerjaPegawai",
            //         title: "<h3 class='small-font'>Sub<br>Unit Kerja</h3>", width: "150px",
            //         template: "#if(subUnitKerjaPegawai) { # #= subUnitKerjaPegawai.name # #} else { #-# } #",
            //         sortable: true
            //     },
            //     {
            //         title: "<h3 align='center'>{{labelBulan1}}</h3>",
            //         columns: [
            //             {
            //                 title: "<h3 align='center'>Target</h3>",
            //                 columns: [
            //                     {
            //                         field: "targetOperasiBulan3",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetNonoperasiBulan3",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetVisitBulan3",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetKonsulBulan3",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             },
            //             {
            //                 title: "<h3 align='center'>Capaian</h3>",
            //                 columns: [
            //                     {
            //                         field: "capaianOperasiBulan3",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianNonoperasiBulan3",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianVisitBulan3",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianKonsulBulan3",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         title: "<h3 align='center'>{{labelBulan2}}</h3>",
            //         columns: [
            //             {
            //                 title: "<h3 align='center'>Target</h3>",
            //                 columns: [
            //                     {
            //                         field: "targetOperasiBulan2",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetNonoperasiBulan2",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetVisitBulan2",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetKonsulBulan2",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             },
            //             {
            //                 title: "<h3 align='center'>Capaian</h3>",
            //                 columns: [
            //                     {
            //                         field: "capaianOperasiBulan2",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianNonoperasiBulan2",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianVisitBulan2",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianKonsulBulan2",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         title: "<h3 align='center'>{{labelBulan3}}</h3>",
            //         columns: [
            //             {
            //                 title: "<h3 align='center'>Target</h3>",
            //                 columns: [
            //                     {
            //                         field: "targetOperasiBulan1",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetNonoperasiBulan1",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetVisitBulan1",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetKonsulBulan1",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             },
            //             {
            //                 title: "<h3 align='center'>Capaian</h3>",
            //                 columns: [
            //                     {
            //                         field: "capaianOperasiBulan1",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianNonoperasiBulan1",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianVisitBulan1",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianKonsulBulan1",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         title: "<h3 align='center'>{{labelBulan4}}</h3>",
            //         columns: [
            //             {
            //                 title: "<h3 align='center'>Target</h3>",
            //                 columns: [
            //                     {
            //                         field: "targetOperasiBulan",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetNonoperasiBulan",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetVisitBulan",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "targetKonsulBulan",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             },
            //             {
            //                 title: "<h3 align='center'>Capaian</h3>",
            //                 columns: [
            //                     {
            //                         field: "capaianOperasiBulan",
            //                         title: "<h3 class='small-font'>O</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianNonoperasiBulan",
            //                         title: "<h3 class='small-font'>N</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianVisitBulan",
            //                         title: "<h3 class='small-font'>V</h3>", width: "60px",
            //                     },
            //                     {
            //                         field: "capaianKonsulBulan",
            //                         title: "<h3 class='small-font'>K</h3>", width: "60px",
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            // ]

            // $scope.dataSourceTargetLayanan = new kendo.data.DataSource({
            //     data: [],
            //     pageSize: 10
            // });

            $scope.gridTargetLayanan = {
                pageable: true,
                columns: [{
                    field: "namaIndikator",
                    title: "Indikator",
                    width: "60px",
                }, {
                    field: "namaKelompokKerja",
                    title: "Kelompok Kerja",
                    width: "60px",
                }]
            };

            $scope.getBulanCapaian = function () {
                var tahun1 = ($scope.item.periode.getMonth() - 3) < 0 ? $scope.item.periode.getFullYear() - 1 : $scope.item.periode.getFullYear();
                var tahun2 = ($scope.item.periode.getMonth() - 2) < 0 ? $scope.item.periode.getFullYear() - 1 : $scope.item.periode.getFullYear();
                var tahun3 = ($scope.item.periode.getMonth() - 1) < 0 ? $scope.item.periode.getFullYear() - 1 : $scope.item.periode.getFullYear();
                var tahun4 = $scope.item.periode.getFullYear();
                var bulan1 = ($scope.item.periode.getMonth() - 3) < 0 ? ($scope.item.periode.getMonth() - 3) + 12 : $scope.item.periode.getMonth() - 3;
                var bulan2 = ($scope.item.periode.getMonth() - 2) < 0 ? ($scope.item.periode.getMonth() - 2) + 12 : $scope.item.periode.getMonth() - 2;
                var bulan3 = ($scope.item.periode.getMonth() - 1) < 0 ? ($scope.item.periode.getMonth() - 1) + 12 : $scope.item.periode.getMonth() - 1;
                var bulan4 = $scope.item.periode.getMonth();

                $scope.labelBulan1 = `${listBulan[bulan1]} ${tahun1}`;
                $scope.labelBulan2 = `${listBulan[bulan2]} ${tahun2}`;
                $scope.labelBulan3 = `${listBulan[bulan3]} ${tahun3}`;
                $scope.labelBulan4 = `${listBulan[bulan4]} ${tahun4}`;
            };

            $scope.hitungTarget = function () {
                $scope.isGridShowed = false;
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-all-target-dan-capaian-layanan?periode=" + dateHelper.getFormatMonthPicker($scope.item.periode) + "&jumlahBulan=" + ($scope.item.lamaBulan ? $scope.item.lamaBulan : 3)).then(function (data) {

                    for (let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].namaIndikator = data.data.data[i].indikator.namaIndikator;
                        data.data.data[i].namaKelompokKerja = data.data.data[i].kelompokKerja.name;
                    }

                    $scope.dataSourceTargetLayanan = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 20,
                        group: [{
                            field: "namaKelompokKerja"
                        }],
                    });
                    $scope.isRouteLoading = false;
                    $scope.isGridShowed = true;
                })
                // ManageSdmNew.getListData("iki-remunerasi/get-all-target-dan-capaian-layanan?periode=" + dateHelper.getFormatMonthPicker($scope.item.periode)).then(function (data) {
                //     $scope.dataSourceTargetLayanan = new kendo.data.DataSource({
                //         data: data.data.data,
                //         pageSize: 10,
                //         columns: columnGrid
                //     });

                //     var listIdUnitKerja = [];
                //     var tempListUnitKerja = $scope.ListUnitKerja;
                //     tempListUnitKerja.forEach(function (el) {
                //         data.data.data.forEach(function (dat) {
                //             if (el.id == dat.unitKerjaPegawai.id && !listIdUnitKerja.includes(dat.unitKerjaPegawai.id)) {
                //                 var dataTemp = {
                //                     name: dat.unitKerjaPegawai.name,
                //                     id: dat.unitKerjaPegawai.id
                //                 };
                //                 listIdUnitKerja.push(dat.unitKerjaPegawai.id);
                //                 $scope.ListUnitKerjaFilter.push(dataTemp);
                //             };
                //         })
                //     })

                //     $scope.isRouteLoading = false;
                // }, (error) => {
                //     $scope.isRouteLoading = false;
                // });


                // $scope.isGridShowed = true;
            };

            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.detail
                    }),
                    columns: [{
                        field: "bulan",
                        title: "Bulan",
                        width: 100
                    },
                    {
                        field: "target",
                        title: "Target",
                        width: 100,
                    }, {
                        field: "capaian",
                        title: "Capaian",
                        width: 100,
                    }
                    ]
                }
            };
            $scope.init = function () {
                $q.all([
                    ManageSdmNew.getListData("sdm/get-all-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                ]).then(function (res) {
                    $scope.ListUnitKerja = res[0].data.data;
                    $scope.ListUnitKerjaPop = res[0].data.data;
                    $scope.ListUnitKerjaFilter = [];
                    $scope.ListSubUnitKerja = res[1].data.data;
                    $scope.ListSubUnitKerjaPop = res[1].data.data;

                    $scope.getBulanCapaian();
                    $scope.isRouteLoading = false;
                });
            };

            $scope.init();

            $scope.Save = function () {
                $scope.now = new Date();

                var data = $scope.dataSourceTargetLayanan._data;
                console.log(data);
                var datas = [];
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        datas.push({
                            indikator: {
                                id: data[i].indikator.id,
                                namaIndikator: data[i].indikator.namaIndikator
                            },
                            detail: [],
                            kelompokKerja: {
                                name: data[i].kelompokKerja.name,
                                unitKerjaId: data[i].kelompokKerja.unitKerjaId,
                                id: data[i].kelompokKerja.id,
                            }
                        })

                        console.log(data[i].detail.length)

                        for (let ii = 0; ii < data[i].detail.length; ii++) {
                            console.log(ii);
                            datas[i].detail.push({
                                date: data[i].detail[ii].date,
                                capaian: data[i].detail[ii].capaian,
                                bulan: data[i].detail[ii].bulan,
                                target: data[i].detail[ii].target,
                            })
                        }
                    }
                }

                console.log(datas);
                ManageSdmNew.saveData(datas, "sdm/save-target-layanan/").then(function (e) {
                    $scope.isRouteLoading = false;
                }, function (err) {
                    $scope.isRouteLoading = true;
                    throw err;
                });
                // if (data.length > 0) {
                //     $scope.isRouteLoading = true;
                //     for (var x = 0; x < data.length; x++) {
                //         datas.push({
                //             "unitKerjaPegawai": {
                //                 "id": data[x].unitKerjaPegawai.id
                //             },
                //             "subUnitKerjaPegawai": {
                //                 "id": data[x].subUnitKerjaPegawai.id
                //             },
                //             "tglHitung": $scope.now,
                //             "periode": $scope.item.periode,
                //             "statusEnabled": true,
                //             "kdProfile": 0, // it's like a Hospital Profile Id for this SIMRS project
                //             "capaianOperasi3bulanlalu": data[x].capaianOperasiBulan3,
                //             "capaianNonoperasi3bulanlalu": data[x].capaianNonoperasiBulan3,
                //             "capaianVisit3bulanlalu": data[x].capaianVisitBulan3,
                //             "capaianKonsultasi3bulanlalu": data[x].capaianKonsulBulan3,
                //             "capaianOperasi2bulanlalu": data[x].capaianOperasiBulan2,
                //             "capaianNonoperasi2bulanlalu": data[x].capaianNonoperasiBulan2,
                //             "capaianVisit2bulanlalu": data[x].capaianVisitBulan2,
                //             "capaianKonsultasi2bulanlalu": data[x].capaianKonsulBulan2,
                //             "capaianOperasi1bulanlalu": data[x].capaianOperasiBulan1,
                //             "capaianNonoperasi1bulanlalu": data[x].capaianNonoperasiBulan1,
                //             "capaianVisit1bulanlalu": data[x].capaianVisitBulan1,
                //             "capaianKonsultasi1bulanlalu": data[x].capaianKonsulBulan1,
                //             "targetOperasi": data[x].targetOperasiBulan,
                //             "targetNonoperasi": data[x].targetNonoperasiBulan,
                //             "targetVisite": data[x].targetVisitBulan,
                //             "targetKonsultasi": data[x].targetKonsulBulan
                //         });
                //     };



                //     // ManageSdmNew.saveData(datas, "sdm/save-target-layanan/").then(function (e) {
                //     //     $scope.isRouteLoading = false;
                //     // }, function (err) {
                //     //     $scope.isRouteLoading = true;
                //     //     throw err;
                //     // });
                // }

            }

            $scope.getDataSubUnitKerjaById = function (id) {
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

            $scope.$watch('item.unitKerja', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("unitKerjaPegawai.id", newVal)
                }

                $scope.getDataSubUnitKerjaById($scope.item.unitKerja.id);
            });

            $scope.$watch('item.subunitKerja', function (newVal, oldVal) {
                if (!newVal) return;
                if (newVal && newVal !== oldVal) {
                    applyFilter("subUnitKerjaPegawai.id", newVal)
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

                if (filterField === "unitKerjaPegawai.id") {
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue.id
                    });
                }

                if (filterField === "subUnitKerjaPegawai.id") {
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
                $scope.ListSubUnitKerjaById = {};

                $scope.item = {};
                $scope.item = {
                    periode: $scope.now
                };
            };
        }
    ]);
});