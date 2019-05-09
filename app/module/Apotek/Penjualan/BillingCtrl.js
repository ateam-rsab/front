define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BilingCtrl', ['socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
        function(socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r) {

            $scope.dataVOloaded = true;
            $scope.item = {};
            $rootScope.isOpen = true;
            $scope.item.namaPasien = "";
            $scope.item.ruangan = "";

            $scope.notDetail = true;
            //define column untuk grid
            $scope.arrColumnGridResepElektronik = [{
                "field": "pasien.noCm",
                "title": "No MR",


            }, {
                "field": "pasien.namaPasien",
                "title": "Nama Pasien",

            }, {
                "field": "pasien.jenisKelamin.jenisKelamin",
                "title": "L/P",

            }, {
                "field": "strukOrder.ruangan.namaRuangan",
                "title": "Ruang Rawat",

            }, {
                template: "#= new moment(new Date(strukOrder.tglOrder)).format('DD-MM-YYYY hh:mm:ss') #",
                "field": "strukOrder.tglOrder",
                "title": "Tanggal/Jam Masuk",

            }, {
                "field": "penulisResep.namaLengkap",
                "title": "Dokter",

            }, {
                "field": "strukOrder.noRegistrasi.kelompokPasien.kelompokPasien",
                "title": "Tipe Pasien",

            }, {
                "field": "strukOrder.ruanganTujuan.namaRuangan",
                "title": "Depo",

            }];
            $scope.noCm = "";
            $scope.startDate = new Date();
            $scope.untilDate = new Date();
            $scope.ruanganId = "";
            // $scope.refresh = function() {
            //     findPasien.findAll($scope.noCm, $scope.ruanganId, $scope.startDate, $scope.untilDate).then(function(e) {
            //         $scope.patienGrids = new kendo.data.DataSource({
            //             data: ModelItem.beforePost(e.data.data, true),
            //             group: $scope.group
            //         });
            //     });
            // };
            $scope.refresh();
            $scope.group = {
                field: "strukOrder.ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };

            $scope.now = new Date();
            $scope.detailOrder = function() {
                $state.go('ResepElektronikDetail', { noOrder: $scope.item.strukOrder.noOrder });
            }



        }
    ]);
});