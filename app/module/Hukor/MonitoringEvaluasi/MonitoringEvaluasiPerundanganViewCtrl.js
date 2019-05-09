define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('MonitoringEvaluasiPerundanganViewCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
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

            $scope.colDaftarPenerima = [{
                "field": "ruangan_namaRuangan",
                "title": "Ruangan", "width": "30%"
            }, {
                "field": "namaLengkap",
                "title": "Pegawai", "width": "30%"
            } ];


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
                }] 
            };
            
            $scope.redirect = function () {
                window.location = "#/DaftarEvaluasiPekerjaan";
            }

        }
    ]);
});