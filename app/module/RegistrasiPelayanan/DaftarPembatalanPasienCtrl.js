
define(['initialize'], function(initialize) {

    'use strict';
    initialize.controller('DaftarPembatalanPasienCtrl', ['$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
        function($state, findPasien, $rootScope, $scope, ModelItem, dateHelper) {
            $scope.title = "Daftar Pembatalan Pasien";
            $scope.dataVOloaded = false;
            $scope.now = new Date();
            $scope.item = {
                from: $scope.now,
                until: $scope.now
            };
            $scope.findData = function() {
                findPasien.findBatalPeriksa(dateHelper.formatDate(new Date($scope.item.from), 'DD-MM-YYYY'), dateHelper.formatDate(new Date($scope.item.until), 'DD-MM-YYYY')).then(function(data){
                    $scope.dataPasienBatal = new kendo.data.DataSource({
                        data: data.data.data,
                        group: {
                            field: "tanggalPembatalan",
                            aggregates: [{
                                field: "pembatal",
                                aggregate: "count"
                            }, {
                                field: "pegawai",
                                aggregate: "count"
                            }]
                        }
                    });
                })
            }
            $scope.findData();
            $scope.mainGridOptions = {
                columns: [{
                    field: "noRecPasienDaftar",
                    title: " ",
                    hidden: true
                }, {
                    field: "tanggalPembatalan",
                    title: "Tanggal"
                }, {
                    field: "idPembatal",
                    title: " ",
                    hidden: true
                }, {
                    field: "pembatal",
                    title: "Pembatal"
                }, {
                    field: "idPegawai",
                    title: " ",
                    hidden: true
                }, {
                    field: "pegawai",
                    title: "Pegawai"
                }, {
                    field: "alasan",
                    title: "Alasan Pembatalan"
                }],
                selectable: "row",
                sortable: true
            }
        }
    ]);

});