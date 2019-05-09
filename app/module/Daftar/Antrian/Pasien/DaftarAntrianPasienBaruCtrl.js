define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPasienBaruCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien) {

            $scope.title = "ini page pencarian pasien";
            $scope.kodeRuangan = $state.params.kodeRuangan;
            $scope.namaPasien = '';
            $scope.$watch('ruangan', function(e) {
                if (e === undefined) return;
                $scope.kodeRuangan = e.id;
                $scope.findData();
            });
            $scope.$watch('from', function(e) {
                if (e === undefined) return;
                $scope.findData();
            });
            $scope.$watch('until', function(e) {
                if (e === undefined) return;
                $scope.findData();
            });
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.Column = [{
                field: "noAntrian",
                title: "No Antrian",
                width: 150
            }, {
                field: "namaPasien",
                title: "Nama Pasien",
                width: 200
            }, {
                field: "ruangan.namaRuangan",
                title: "Ruangan Tujuan",
                width: 200
            }, {
                field: "statusAntrian",
                title: "Status",
                width: 200
            }, ];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.findData = function() {
                if ($scope.namaPasien === undefined)
                    $scope.namaPasien = '';
                if ($scope.ruangan === undefined) {
                    if ($scope.kodeRuangan !== undefined)
                        $scope.ruangan = {
                            id: $scope.kodeRuangan
                        };
                    else
                        $scope.ruangan = '';
                }
                findPasien.findAntrianPasienBaru($scope.from, $scope.until, $scope.ruangan, $scope.namaPasien).then(function(e) {
                    $scope.listPasien = e.data.data;
                    $scope.listDone = _.filter(_.sortBy(_.filter(e.data.data, {
                        "statusAntrian": "DIPANGGIL_DOKTER"
                    }), function(num) {
                        return num.noAntrian * -1;
                    }), function(e, f, g, h) {
                        if (f > 4) return undefined;
                        return e;
                    });

                })
            }
            $scope.findData();
            socket.on('DaftarAntrian', function(data) {
                $scope.findData();
            });
            $scope.pasienBaru = function() {
                $state.go('registrasiPasienBaruOnline', {
                    noRec: $scope.item.noRec
                })
            }


        }
    ]);
});