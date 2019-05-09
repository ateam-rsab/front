define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('UsulanEvaluasiDanKajianOrganisasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
        '$document', 'R', '$state', 'ManageSarpras','$q',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras,$q) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.userId = ModelItem.getPegawai().namaLengkap;
            $scope.item.tanggalPengajuan = $scope.now;

            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                ManageSarpras.getOrderList("service/list-generic/?view=KelompokEvaluasi&select=id,kelompokEvaluasi", true),
                ManageSarpras.getOrderList("usulan-evaluasi/get-no-usulan/", true)
            ]).then(function (data) {
                $scope.ListRuangan = data[0].data;
                $scope.listKelompoks = data[1].data;
                $scope.item.noUsulan = data[2].data.data.noSurat;
            });

            $scope.dataPenerima = new kendo.data.DataSource({
                data: []
            });
            $scope.dataUsulan = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });
            $scope.$watch('item.ruangan', function (e) {
                $scope.listPegawai = [];
                $scope.item.pegawai = '';
                if (e === undefined) return;
                if (e.id === undefined) return;
                ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap,jabatanInternal.id,jabatanInternal.namaJabatan,ruangan.id,ruangan.namaRuangan&criteria=ruangan.id&values=" + e.id, true).then(function (dat) {
                    $scope.listPegawai = dat.data;
                });
            });

            $scope.$watch('item.pegawai', function (e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                var stat = true;
                if ($scope.dataPenerima !== undefined) {
                    angular.forEach($scope.dataPenerima._data, function (item) {
                        if (e.id === item.id) {
                            stat = false;
                        }
                    });
                }
                if (stat === true) {
                    $scope.dataPenerima.add(e);
                    // toastr.info(e.jabatanInternal_namaJabatan + " telah di tambahkan");
                }
                e = '';
                $scope.item.pegawai = '';
            });

            $scope.removeData = function (e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                $scope.dataPenerima.remove(selectedItem);
            };

            $scope.removeData2 = function (e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                $scope.dataUsulan.remove(selectedItem);
            };

            $scope.colDaftarPenerima = [{
                "field": "ruangan_namaRuangan",
                "title": "Ruangan", "width": "30%"
            }, {
                "field": "namaLengkap",
                "title": "Pegawai", "width": "30%"
            }, {
                "command": {
                    text: "Hapus",
                    click: $scope.removeData
                },
                "title": "&nbsp;",
                "width": "10%"
            }];

            $scope.colDataUsulan = {
                toolbar: [{name: "create", text: "Tambah"}],
                columns: [{
                    "field": "noKelompok",
                    "title": "No. Kelompok", "width": "20%"
                }, {

                    "field": "komponen",
                    "title": "Komponen", "width": "20%"
                }, {

                    "field": "kajian",
                    "title": "Kajian", "width": "20%"
                }, {

                    "field": "usulan",
                    "title": "Usulan", "width": "20%"
                }, {
                    "command": {
                        "text": "Hapus",
                        "click": $scope.removeData2
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
                window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
            }

            $scope.kirim = function () {
                var dataGrid = [];
                var dataGrid2 = [];
                angular.forEach($scope.dataPenerima._data, function(item) {
                    dataGrid.push({                         
                            id: item.id                         
                    });
                });
                angular.forEach($scope.dataUsulan._data, function (item) {
                        dataGrid2.push({
                            "kelompokEvaluasi": {"id": item.noKelompokId},
                            "komponenEvaluasi": {"id": item.komponenId},
                            "kajian": item.kajian,
                            "usulan": item.usulan
                        })
                })
                var data = {
                        "pegawaiPembuatId": ModelItem.getPegawai().id,
                        //"ruanganPembuat":  ModelItem.getPegawai().ruangan,
                        "noUsulan": $scope.item.noUsulan,
                        //"pegawaiPembuat": ModelItem.getPegawai(),
                        "pegawai": dataGrid,
                        "usulanEvaluasiKomponenVO": dataGrid2,
                        "tglUsulan": $scope.now
                }

                ManageSarpras.saveDataSarPras(data, "usulan-evaluasi/save-rencana-penyuluhan").then(function (e) {
                    window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
                });
            }

        }
    ]);
});