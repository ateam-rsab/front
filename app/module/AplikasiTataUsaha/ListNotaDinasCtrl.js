define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ListNotaDinasCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window', '$q',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window, $q) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            initializeData();

            function initializeData() {
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                var idPegawai = ModelItem.getPegawai().id;
                $q.all([
                    ManageSarpras.getOrderList("nota-dinas/get-inbox-nota-dinas?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idPegawai=" + idPegawai, true),
                    ManageSarpras.getOrderList("nota-dinas/get-outbox-nota-dinas?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idPegawai=" + idPegawai, true),
                ]).then(function(data) {
                    $scope.notaMasuk = new kendo.data.DataSource({
                        data: data[0].data.data
                    });

                    $scope.notaKeluar = new kendo.data.DataSource({
                        data: data[1].data.data
                    });
                });
            }

            $scope.cari = function() {
                initializeData();
            }
            $scope.colNotaMasuk = [{
                "field": "pembuat",
                "title": "<h3 align=center>Pengirim.<h3>",
                "width": "30%"
            }, {

                "field": "perihal",
                "title": "<h3 align=center>Perihal<h3>",
                "width": "50%"
            }, {

                "field": "jenis",
                "title": "<h3 align=center>Jenis<h3>",
                "width": "10%"
            }, {

                "field": "tanggal",
                "title": "<h3 align=center>Tanggal<h3>",
                "width": "10%"
            }];

            $scope.colNotaKeluar = [{
                "field": "perihal",
                "title": "<h3 align=center>Perihal<h3>",
                "width": "50%"
            }, {

                "field": "jenis",
                "title": "<h3 align=center>Jenis<h3>",
                "width": "10%"
            }, {

                "field": "tanggal",
                "title": "<h3 align=center>Tanggal<h3>",
                "width": "10%"
            }];

            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.ruangans
                    }),
                    columns: [{
                        "field": "ruangan_namaRuangan",
                        "title": "Ruangan",
                        "width": "20%"
                    }, {

                        "field": "jabatanInternal_namaJabatan",
                        "title": "Jabatan",
                        "width": "30%"
                    }, {

                        "field": "namaLengkap",
                        "title": "Nama ",
                        "width": "40%"
                    }]
                };

            };


        }
    ])
})