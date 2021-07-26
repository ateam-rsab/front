define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('TargetPelayananLuarJamKerjaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', '$mdDialog',
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
                    field: "namaLengkap",
                    title: "Dokter",
                    width: "60px",
                }, {
                    field: "namaJabatan",
                    title: "Jabatan",
                    width: "60px",
                }]
            };

            $scope.cari = function () {
                $scope.isGridShowed = false;
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("iki-remunerasi/get-all-target-dan-capaian-layanan-luar-jam-kerja?periode=" + dateHelper.getFormatMonthPicker($scope.item.periode)).then(function (data) {

                    for (let i = 0; i < data.data.data.length; i++) {
                        data.data.data[i].detailIndikator = data.data.data[i].indikator.detailIndikator;
                        data.data.data[i].namaLengkap = data.data.data[i].pegawai.namaLengkap;
                        data.data.data[i].namaJabatan = data.data.data[i].jabatan.namaJabatan;
                    }

                    $scope.dataSourceTargetLayanan = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 20,
                        group: [{
                            field: "namaLengkap"
                        }, {
                            field: "namaJabatan"
                        }],
                    });
                    $scope.isRouteLoading = false;
                    $scope.isGridShowed = true;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
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
        }
    ]);
});