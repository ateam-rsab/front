define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringEvaluasiPerundanganCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tgl = $scope.now;

            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                ManageSarpras.getOrderList("service/list-generic/?view=KelompokEvaluasi&select=id,kelompokEvaluasi", true)
            ]).then(function (data) {
                $scope.ListRuangan = data[0].data;
                $scope.listKelompoks = data[1].data;
                $scope.dataVOloaded = true;
            });

            $scope.dataPenerima = new kendo.data.DataSource({
                data: []
            });

            $scope.dataEvaluasi = new kendo.data.DataSource({
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
                $scope.dataEvaluasi.remove(selectedItem);
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


            $scope.colDataEvaluasi = {
                toolbar: [{name: "create", text: "Tambah"}],
                columns: [{
                    "field": "kelompokEv",
                    "title": "Kelompok Evaluasi", "width": "30%"
                },{

                    "field": "komponen",
                    "title": "Komponen", "width": "20%"
                }, {

                    "field": "evPeraturan",
                    "title": "Evaluasi Peraturan", "width": "50%"
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
                $scope.dataItem.kelompokEv = $scope.dataItem.kelompokEvs.kelompokEvaluasi;
                $scope.dataItem.objKelompokEv = $scope.dataItem.kelompokEvs;
                ManageSarpras.getOrderList("service/list-generic/?view=KomponenEvaluasi&select=id,komponenEvaluasi&criteria=kelompokEvaluasi.id&values=" + $scope.dataItem.kelompokEvs.id, true).then(function (dat) {
                    $scope.listKomponens = dat.data;
                });
            }
           /* $scope.getKelompok = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.komponens = '';
                $scope.dataItem.kelompokEv = $scope.dataItem.kelompokEvs.kelompokEvaluasi;
                $scope.dataItem.objKelompokEv = $scope.dataItem.kelompokEvs;

            }*/
            $scope.getKomponen = function (data, dataItem, columns) {
                $scope.dataItem = dataItem;
                $scope.dataItem.komponen = $scope.dataItem.komponens.komponenEvaluasi;
                $scope.dataItem.Objkomponen = $scope.dataItem.komponens;
            }
            $scope.redirect = function () {
                window.location = "#/DaftarEvaluasiPekerjaan";
            }

            $scope.save = function () {
                var dataGrid = [];
                var dataGrid2 = []; 
                angular.forEach($scope.dataPenerima._data, function (item) {
                    dataGrid.push({
                         id: item.id                         
                    });
                });
                angular.forEach($scope.dataEvaluasi._data, function (item) {
                    dataGrid2.push({
                        "kelompokEvaluasi": item.objKelompokEv,
                        "komponenEvaluasi": item.Objkomponen,
                        "kajian": item.evPeraturan

                    })
                })

                var data = {
                    "tglUsulan": $scope.item.tgl,
                    "namaUsulan": $scope.item.peraturan,
                    "pegawai":dataGrid ,
                    "usulanEvaluasiKomponenVO":dataGrid2
                } 
                  ManageSarpras.saveDataSarPras(data, "monitoring-evaluasi-perundangan/save").then(function (e) {
                 window.location = "#/DaftarMonitoringEvaluasiPerundangan";
                 });
            }

        }
    ]);
});