define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianGawatDaruratPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket',
        function($rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket) {
            // $scope.$watch('from', function(e) {
            //     if (e === undefined) return;
            //     $scope.findData();
            // });
            // $scope.$watch('until', function(e) {
            //     if (e === undefined) return;
            //     $scope.findData();
            // });
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.Column = [{
                field: "namaPasien",
                title: "Nama Pasien",
                width: 200
            }, {
                field: "Kategori",
                title: "Kategori",
                width: 200
            }, {
                field: "tanggalMasuk",
                title: "Tanggal Masuk",
                template: "#= new moment(new Date(tanggalMasuk)).format('DD-MMM-YYYY HH:mm') #",
                width: 200
            }, {
                field: "tanggalMasuk",
                title: "Jam",
                template: "#= new moment(new Date(tanggalMasuk)).format('HH:mm') #",
                width: 200
            }, {
                field: "statusPasien",
                title: "Status Pasien",
                width: 200
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            };
            $scope.group = {
                field: "kategori",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.findData = function() {
                findPasien.findGawatDarurat($scope.from, $scope.until).then(function(e) {
                    debugger;
                    $scope.noRecGawatDarurat = e.data.data.noRec;
                    $scope.listPasien = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data, true),
                        group: $scope.group
                    });
                });
            }



            findPasien.findGawatDarurat($scope.from, $scope.until).then(function(e) {
                debugger;
                $scope.noRecGawatDarurat = e.data.data.noRec;
                $scope.listPasien = new kendo.data.DataSource({
                    data: ModelItem.beforePost(e.data.data, true),
                    group: $scope.group
                });
            });
            $scope.findData();
            socket.on('DaftarAntrianPerjanjian', function(data) {
                $scope.findData();
            });

            $scope.reconfirm = function() {
                debugger;
                if ($state.current.name === 'DaftarAntrianGawatDaruratInputPasienCtrl') {
                    $state.go('GawatDaruratDetailNext', {
                        noRec: $scope.select.noRec,
                        noRecIGD: $scope.select.noRec,
                        noCm: ''
                    });
                } else {
                    if ($scope.select.statusPasien === '' || $scope.select.statusPasien === undefined)
                        $state.go('GawatDaruratDetail', {
                            noRec: $scope.select.noRec,
                            noRecIGD: $scope.select.noRec,
                            noCm: ''
                        });
                    else
                        window.messageContainer.log('Pasien sudah di registrasi');
                }
            }


        }
    ]);
});