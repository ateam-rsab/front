define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekapitulasiPenilaianKinerjaIndividuCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope', '$mdDialog',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope, $mdDialog) {
            $scope.item = {};

            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.optGrid = {
                pageable: true,
                scrollable: true,
                columns: [{
                    field: "unitKerja",
                    title: "<h3>Unit Kerja</h3>",
                    width: 200,
                }, {
                    field: "subunitKerja",
                    title: "<h3>Sub Unit Kerja</h3>",
                    width: 200
                }, {
                    field: "namaLengkap",
                    title: "<h3>Nama Pegawai</h3>",
                    width: 200,
                }, {
                    title: "<h3>Kuantitas</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotKuantitas",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilKuantitas",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    title: "<h3>Kualitas</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotKualitas",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilKualitas",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    title: "<h3>Perilaku</h3>",
                    width: 100,
                    columns: [{
                        field: "bobotPerilaku",
                        title: "<h3>Bobot<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }, {
                        field: "hasilPerilaku",
                        title: "<h3>Hasil<br>(%)</h3>",
                        width: 70,
                        attributes: {
                            class: "table-cell",
                            style: "text-align: right;"
                        }
                    }]
                }, {
                    field: "iki",
                    title: "<h3>IKI</h3>",
                    width: 50,
                }, {
                    field: "kriteria",
                    title: "<h3>Kriteria</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: center;"
                    }
                }, {
                    field: "rpP1",
                    title: "<h3>P1</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                }, {
                    field: "rpP2",
                    title: "<h3>P2</h3>",
                    width: 200,
                    attributes: {
                        class: "table-cell",
                        style: "text-align: right;"
                    }
                },]
            }

            $scope.getData = () => {
                $scope.isRouteLoading = true;

                if (!$scope.item.bulan) {
                    toastr.warning("Silakan pilih bulan terlebih dahulu", "Peringatan")

                    $scope.isRouteLoading = false;
                    return
                }

                let bulan = dateHelper.toTimeStamp($scope.item.bulan)

                ManageSdmNew.getListData(`iki-remunerasi/get-rekap-penilaian-kinerja-individu?bulan=${bulan}&unitKerjaId=${$scope.item.unitKerja ? $scope.item.unitKerja.id : ""}&subunitKerjaId=${$scope.item.subUnitKerja ? $scope.item.subUnitKerja.id : ""}&pegawaiId=${$scope.item.pegawai ? $scope.item.pegawai.id : ""}`).then((res) => {
                    $scope.dataSource = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    });

                    $scope.isRouteLoading = false;
                })
            }

            let init = () => {
                ManageSdmNew.getListData("service/list-generic/?view=UnitKerjaPegawai&select=id,name&criteria=statusEnabled,id&values=true,!0&order=name:asc").then((res) => {
                    $scope.listOfUnitKerja = res.data;
                })

                ManageSdmNew.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,kategoryPegawaiId&values=true,(1;10;14)&order=namaLengkap:asc").then((res) => {
                    $scope.listOfPegawai = res.data;
                })
            }

            init();

            $scope.getSubUnitKerja = (id) => {
                ManageSdmNew.getListData("service/list-generic/?view=SubUnitKerjaPegawai&select=id,name&criteria=statusEnabled,id,unitKerjaId&values=true,!0," + id + "&order=name:asc").then((res) => {
                    $scope.listOfSubUnitKerja = res.data;
                })
            }
        }
    ])
});