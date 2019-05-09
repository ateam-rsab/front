define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekomendasiUsulanEvaluasiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.item = {};

            if ($state.params.noUsulan !== undefined) {
                $q.all([
                    ManageSarpras.getOrderList("usulan-evaluasi//get-usulan-evaluasi-by-nousulan/?noUsulan=" + $state.params.noUsulan, true)
                ]).then(function (data) {
                    console.log(JSON.stringify(data[0].data));
                    $scope.item.noUsulan = data[0].data.data.noUsulan;
                    $scope.item.tglUsulan = new Date(data[0].data.data.tglUsulan);
                    $scope.item.noRec = data[0].data.data.noRec;
                    $scope.item.rekanan = data[0].data.data.rekanan;
                    $scope.item.ruangan = data[0].data.data.ruangan;
                    $scope.item.rekanan = '';
                    $scope.item.ruangan = '';
                    $scope.dataUsulan = new kendo.data.DataSource({
                        data: data[0].data.data.list,
                        schema: {
                            model: {
                                fields: {
                                    "komponenEvaluasi": {editable: false},
                                    "kajian": {editable: false},
                                    "usulan": {editable: false},
                                    "rekomendasi": {validation: {required: true}, editable: true}
                                }
                            }
                        }
                    });
                });
            }

            $scope.colDataUsulan = {
                editable : true,
                columns: [/*{
                 "field": "noKelompok",
                 "title": "No. Kelompok", "width": "20%"
                 },*/ {
                    "field": "komponenEvaluasi",
                    "title": "Komponen", "width": "20%"
                }, {
                    "field": "kajian",
                    "title": "Kajian", "width": "20%"
                }, {
                    "field": "usulan",
                    "title": "Usulan ", "width": "20%"
                },
                    {
                        "field": "rekomendasi",
                        "title": "Rekomendasi", "width": "20%"
                    }
                ]
            };

            $scope.redirect = function () {
                window.location = "#/DaftarEvaluasiPekerjaan";
            }

            $scope.kirim = function () {
                var dataGrid = [];
                var dataGrid2 = [];
                debugger;
                angular.forEach($scope.dataPenerima._data, function (item) {
                    dataGrid.push({
                        pegawai: {
                            id: item.id
                        },
                        ruangan: {
                            id: item.ruangan_id
                        }

                    });
                });
                angular.forEach($scope.dataUsulan._data, function (item) {
                    dataGrid2.push({
                        "kelompok": {"id": item.noKelompokId},
                        "komponen": {"id": item.komponenId},
                        "hasilEvaluasi": item.kajian,
                        "rekomendasi": item.rekomendasi
                    })
                })
                console.log(JSON.stringify(dataGrid));
                console.log(JSON.stringify(dataGrid2));
                /*  ManageSarpras.saveDataSarPras(ModelItem.beforePost(tempData), "usulan-evaluasi/save-rekomendasi").then(function (e) {
                 console.log(JSON.stringify(e.data));
                 window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
                 });*/
            }

        }
    ]);
});