define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CapaianTargetPelayananCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, $mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.isGridShowed = false;
            $scope.isRouteLoading = false;
            $scope.now = new Date();
            $scope.item.periode = new Date();
            $scope.yearSelected = {
                start: "year",
                depth: "year",
                format: "MMMM yyyy"
            };

            $scope.gridTargetLayanan = {
                pageable: true,
                columns: [{
                    field: "detailIndikator",
                    title: "Indikator",
                    width: "60px",
                }, {
                    field: "namaKelompokKerja",
                    title: "Kelompok Kerja",
                    width: "60px",
                }]
            };

            $scope.cari = function () {
                $scope.isGridShowed = false;
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-all-target-dan-capaian-layanan?periode=" + dateHelper.getFormatMonthPicker($scope.item.periode)).then(function (data) {

                    for (let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].detailIndikator = data.data.data[i].indikator.detailIndikator;
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
            };

            $scope.data2 = function (dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.detail
                    }),
                    columns: [{
                        field: "bulan",
                        title: "Bulan",
                        width: 70,
                        template: '<span style="float:right">#= bulan #</span>'
                    },
                    {
                        field: "target",
                        title: "Target (Skor)",
                        width: 50,
                        template: '<span style="float:right">#= target #</span>'
                    }, {
                        field: "capaian",
                        title: "Capaian (Skor)",
                        width: 50,
                        template: '<span style="float:right">#= capaian #</span>'
                    }, {
                        field: "tglHitung",
                        title: "Tanggal Hitung",
                        width: 100
                    }]
                }
            };

            $scope.Save = function () {
                var tglBatasSimpan = new Date($scope.item.periode);
                tglBatasSimpan.setDate(4);
                tglBatasSimpan.setHours(23, 59, 59, 999);
                if (dateHelper.toTimeStamp(new Date()) > tglBatasSimpan) {
                    toastr.warning("Batas masa simpan hasil hitung target layanan sudah lewat", "Peringatan")
                    return
                }

                $scope.now = new Date();
                var data = $scope.dataSourceTargetLayanan._data;
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

                        for (let ii = 0; ii < data[i].detail.length; ii++) {
                            datas[i].detail.push({
                                date: data[i].detail[ii].date,
                                capaian: data[i].detail[ii].capaian,
                                bulan: data[i].detail[ii].bulan,
                                target: data[i].detail[ii].target,
                            })
                        }
                    }
                }

                ManageSdmNew.saveData(datas, "sdm/save-target-layanan/").then(function (e) {
                    $scope.isRouteLoading = false;
                }, function (err) {
                    $scope.isRouteLoading = true;
                    throw err;
                });
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
        }
    ]);
});