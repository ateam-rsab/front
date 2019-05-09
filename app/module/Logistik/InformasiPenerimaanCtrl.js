define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('InformasiPenerimaanCtrl', ['$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem','ManageSarpras',
        function($state, findSarpras, $rootScope, $scope, ModelItem, ManageSarpras) {
            $scope.now = new Date();
            $scope.until = $scope.now;
            $scope.from = $scope.now;
            $scope.dataOrder = new kendo.data.DataSource({
                data: []
            });
            $scope.find = function() {
                findSarpras.getTerimaBarangdiKirim('ruanganTujuan', '', '', '').then(function(e) {
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data)
                    });

                });
            }
            $scope.find();
            $scope.findData = function() {

                if ($scope.from !== undefined && $scope.until !== undefined) {
                    // findSarpras.getTerimaBarangdiKirim('ruanganTujuan', moment($scope.from).format('YYYY-MM-DD'), moment($scope.until).format('YYYY-MM-DD'), '').then(function(e) {
                    findSarpras.getTerimaBarangdiKirim(moment($scope.from).format('YYYY-MM-DD'), moment($scope.until).format('YYYY-MM-DD'), '').then(function(e) {
                        $scope.dataOrder = new kendo.data.DataSource({
                            data: ModelItem.beforePost(e.data.data)
                        });

                    });
                } else {
                    // findSarpras.getTerimaBarangdiKirim('', '', '').then(function(e) {
                    findSarpras.getTerimaBarangdiKirim('', '').then(function(e) {
                        $scope.dataOrder = new kendo.data.DataSource({
                            data: ModelItem.beforePost(e.data.data)
                        });

                    });
                }
            }
            $scope.clear = function(){
                $scope.until = new Date();
                $scope.from = new Date();
            }
            $scope.showDetailOrder = function() {
                $state.go('logistikOrder', {
                    noRec: $scope.item.noRec
                })
            }
            $scope.columnOrder = [{
                    "field": "noOrder",
                    "title": "No. Order",
                    "width": "150px"
                }, {
                    "field": "tanggalOrder",
                    "title": "Tgl. Order",
                    template: "#= new moment(tanggalOrder).format('DD-MM-YYYY hh-mm-ss') #",
                    "width": "150px"
                },
                {
                    "field": "ruanganPemesan",
                    "title": "Ruangan Pemesan",
                    "width": "150px"
                },
                {
                    "field": "userPemesan",
                    "title": "User Pemesan",
                    "width": "200px"
                },
                {
                    "field": "ruanganTujuan",
                    "title": "Ruangan Tujuan",
                    "width": "150px"
                },
                {
                    "field": "noKirim",
                    "title": "No. Kirim",
                    "width": "100px"
                },
                {
                    "field": "jenisPermintaan",
                    "title": "Jenis Permintaan",
                    "width": "150px"
                }, {
                    "field": "noKonfirmasi",
                    "title": "No. Terima",
                    "width": "100px"
                },
            ];
        }
    ]);
});