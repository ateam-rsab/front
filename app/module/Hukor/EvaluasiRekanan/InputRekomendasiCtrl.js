define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InputRekomendasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.dataVOloaded = true;
            if ($state.params.noEvaluasi !== "") {
                $q.all([
                    ManageSarpras.getOrderList("evaluasi-rekanan/get-by-nousulan/?noUsulan=" + $state.params.noEvaluasi, true)
                ]).then(function (data) {
                    debugger;
                    $scope.item.noEvaluasi = data[0].data.data.noUsulan;
                    $scope.item.ruangan = data[0].data.data.ruanganTujuan;
                    $scope.item.namaRekanan = data[0].data.data.namaRekanan;
                    $scope.item.ruanganTujuan = "";
                    $scope.item.tglEvaluasi = new Date(data[0].data.data.tglUsulan);
                    $scope.item.rekanan = data[0].data.data.rekanan;
                    $scope.dataRekomendasi = new kendo.data.DataSource({
                        data: data[0].data.data.list,
                        schema: {
                            model: {
                                fields: {
                                    "komponenEvaluasi": {editable: false},
                                    "hasilEvaluasi": {editable: false},
                                    "rekomendasi": {validation: {required: true}, editable: true}
                                }
                            }
                        }
                    });
                });
            }


            $scope.colDataRekomendasi = {
                editable: true,
                columns: [
                    {
                        "field": "komponenEvaluasi",
                        "title": "Komponen Evaluasi",
                        "width": "30%"
                    }, {

                        "field": "kajian",
                        "title": "Hasil Evaluasi",
                        "width": "30%"
                    }, {
                        "field": "rekomendasi",
                        "title": "Rekomendasi",
                        "width": "30%"
                    }
                ]
            };


            $scope.simpan = function () {
                var dataGrid = [];
                angular.forEach($scope.dataRekomendasi._data, function (item) {
                    dataGrid.push({
                        "noRec": item.noRec,
                        "rekomendasi": item.rekomendasi
                    })
                })
                var data = {
                    "noRec": "",
                    "usulanEvaluasiKomponenVO": dataGrid,
                }
                ManageSarpras.saveDataSarPras(data, "usulan-evaluasi/save-rekomendasi/").then(function (e) {
                    window.location = "#/DaftarEvaluasiPekerjaan";
                });
            }

        }
    ]);
});