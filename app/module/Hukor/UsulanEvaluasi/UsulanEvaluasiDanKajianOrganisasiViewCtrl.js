define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('UsulanEvaluasiDanKajianOrganisasiViewCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
        '$document', 'R', '$state', 'ManageSarpras','$q',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras,$q) {
            $scope.item = {};

            if($state.params.noUsulan !== undefined){
                $q.all([
                    ManageSarpras.getOrderList("usulan-evaluasi/get-usulan-evaluasi-by-nousulan/?noUsulan="+$state.params.noUsulan, true)
                ]).then(function (data) {

                    $scope.dataUsulan = new kendo.data.DataSource({
                        data: []
                    });
                    $scope.gridInputPeserta = new kendo.data.DataSource({
                        data: []
                    });
                });


            }

            $scope.colDaftarPenerima = [{
                "field": "ruangan_namaRuangan",
                "title": "Ruangan", "width": "30%"
            }, {
                "field": "namaLengkap",
                "title": "Pegawai", "width": "30%"
            } ];

            $scope.colDataUsulan = {
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
                } ]
            };

            $scope.redirect = function () {
                window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
            }

        }
    ]);
});