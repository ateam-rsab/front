define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('EvaluasiRekananCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.userId = ModelItem.getPegawai().namaLengkap;
            $scope.item.tglEvaluasi = $scope.now;
            $scope.item.ruanganTujuan = [];

            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                ManageSarpras.getOrderList("service/list-generic/?view=KelompokEvaluasi&select=id,kelompokEvaluasi", true),
                ManageSarpras.getOrderList("service/list-generic/?view=Rekanan&select=id,namaRekanan", true),
                ManageSarpras.getOrderList("evaluasi-rekanan/get-no-evaluasi", true)
            ]).then(function (data) {
                $scope.ListRuangan = data[0].data;
                $scope.listKelompoks = data[1].data;
                $scope.listRekanans = data[2].data;
                $scope.item.noEvaluasi = data[3].data.data.noSurat;
                $scope.dataVOloaded = true;
            });

            $scope.dataUsulan = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            $scope.redirect = function (e) {
                window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
            }

            $scope.removeData = function (e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                $scope.dataUsulan.remove(selectedItem);
            };

            $scope.colDataUsulan = {
                toolbar: [{name: "create", text: "Tambah"}],
                columns: [{
                    "field": "noKelompok",
                    "title": "No. Kelompok", "width": "20%"
                }, {

                    "field": "komponen",
                    "title": "Komponen", "width": "20%"
                }, {

                    "field": "hasilEvaluasi",
                    "title": "Hasil Evaluasi", "width": "20%"
                }, {
                    "command": {
                        "text": "Hapus",
                        "click": $scope.removeData
                    },
                    "title": "&nbsp;",
                    "width": "10%"
                }],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Input Data"
                    },
                    template: kendo.template($("#popup-editor").html())
                }
            };
            $scope.getKelompok = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.komponens = '';
                $scope.listKomponens = [];
                $scope.dataItem.noKelompok = $scope.dataItem.kelompoks.kelompokEvaluasi;
                $scope.dataItem.ObjKelompok = $scope.dataItem.kelompoks;
                ManageSarpras.getOrderList("service/list-generic/?view=KomponenEvaluasi&select=id,komponenEvaluasi&criteria=kelompokEvaluasi.id&values=" + $scope.dataItem.kelompoks.id, true).then(function (dat) {
                    $scope.listKomponens = dat.data;
                });
            }
            $scope.getKomponen = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.komponen = $scope.dataItem.komponens.komponenEvaluasi;
                $scope.dataItem.Objkomponen = $scope.dataItem.komponens;
            }

            $scope.kirim = function () {
                var dataGrid = [];
                debugger;
                angular.forEach($scope.dataUsulan._data, function (item) {
                    dataGrid.push({
                        "kelompokEvaluasi": item.ObjKelompok,
                        "komponenEvaluasi": item.Objkomponen,
                        "kajian": item.hasilEvaluasi
                    })
                })
                var data = {
                    "tglUsulan": $scope.now,
                    "noUsulan": $scope.item.noEvaluasi,
                    "rekanan": $scope.item.rekanan,
                    "ruanganTujuan": $scope.item.ruanganTujuan,
                    "usulanEvaluasiKomponenVO": dataGrid
                }

                console.log(JSON.stringify(data));
                ManageSarpras.saveDataSarPras(data, "evaluasi-rekanan/save/").then(function (e) {
                   // window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
                });
            }

        }
    ]);
});