define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekomendasiEvaluasiPerundanganCtrl', ['$q','$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q,$rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            
            $scope.item = {};
            $scope.item.userId = ModelItem.getPegawai().namaLengkap;
            $scope.item.tglEvaluasi = $scope.now;

            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                ManageSarpras.getOrderList("service/list-generic/?view=KelompokEvaluasi&select=id,kelompokEvaluasi", true),
                ManageSarpras.getOrderList("service/list-generic/?view=Rekanan&select=id,namaRekanan", true) 
                
                ]).then(function(data) {
                    $scope.ListRuangan = data[0].data;
                    $scope.listKelompoks = data[1].data;
                    $scope.listRekanans= data[2].data;
                    $scope.item.noEvaluasi = data[3].data.data.noSurat;
                });

                $scope.dataUsulan = new kendo.data.DataSource({
                    data: [],
                    schema: {
                        model: {
                            id: "id"
                        }
                    }
                });
    

            $scope.colDataUsulan = {
                columns: [{
                    "field": "noKelompok",
                    "title": "No. Kelompok", "width": "20%"
                }, {

                    "field": "komponen",
                    "title": "Komponen", "width": "20%"
                }, {

                    "field": "hasilEvaluasi",
                    "title": "Hasil Evaluasi", "width": "20%"
                },
                {

                    "field": "rekomendasi",
                    "title": "Rekomendasi", "width": "20%"
                } 
                ],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Edit Data"
                    },
                    template: kendo.template($("#popup-editor").html())
                }
            };

            $scope.getKelompok = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.komponens = '';
                $scope.listKomponens = [];
                $scope.dataItem.noKelompok = $scope.dataItem.kelompoks.kelompokEvaluasi;
                $scope.dataItem.noKelompokId = $scope.dataItem.kelompoks.id;
                ManageSarpras.getOrderList("service/list-generic/?view=KomponenEvaluasi&select=id,komponenEvaluasi&criteria=kelompokEvaluasi.id&values=" + $scope.dataItem.kelompoks.id, true).then(function (dat) {
                    $scope.listKomponens = dat.data;
                });
            }
            $scope.getKomponen = function (data, dataItem, columns){
                $scope.dataItem = dataItem;
                $scope.dataItem.komponen = $scope.dataItem.komponens.komponenEvaluasi;
                $scope.dataItem.komponenId = $scope.dataItem.komponens.id;
            }

            $scope.redirect = function () {
                window.location = "#/DaftarEvaluasiPekerjaan";
            }

            $scope.kirim = function () {
                var dataGrid = [];
                var dataGrid2 = [];
                debugger;
                angular.forEach($scope.dataPenerima._data, function(item) {
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
              /*  ManageSarpras.saveDataSarPras(ModelItem.beforePost(tempData), "kajian-evaluasi/save/").then(function (e) {
                    console.log(JSON.stringify(e.data));
                    window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
                });*/
            }

        }
        ]);
});