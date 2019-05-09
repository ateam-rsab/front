define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianScheduleCtrl', ['CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket',
        function(cacheHelper, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket) {

            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();

            $scope.listPasien = cacheHelper.get('listSchdule');
            // if (cacheHelper.get('tglAwalPerjanjian') !== undefined)
            //     $scope.from = cacheHelper.get('tglAwalPerjanjian');
            // if (cacheHelper.get('tglAkhirPerjanjian') !== undefined)
            //     $scope.until = cacheHelper.get('tglAkhirPerjanjian');


            $scope.kodeReservasi = '';
            $scope.Column = [{
                field: "pasien.noCm",
                title: "No Rekam Medis",
                width: 150
            }, {
                field: "tglRegistrasi",
                title: "Tanggal Reservasi",
                width: 150
            }, {
                field: "pasien.namaPasien",
                title: "Nama Pasien",
                width: 200
            }, {
                field: "ruanganNextSchedule.namaRuangan",
                title: "Ruangan Tujuan",
                width: 200
            }, {
                field: "statusSchedule",
                title: "Status",
                width: 200
            }, ];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.findData = function() {
                findPasien.findSchedulePerjanjian().then(function(e) {
                    $scope.listPasien = e.data.data;
                    cacheHelper.set('listSchdule', $scope.listPasien);
                    $scope.listPasien.forEach(function(data) {
                        var date = new Date(data.tglRegistrasi);
                        data.tglRegistrasi = dateHelper.getTanggalFormatted(date);
                    });
                });
            }
            $scope.findData();
            socket.on('DaftarSchedulePerjanjian', function(data) {
                $scope.findData();
            });

            $scope.reconfirm = function() {
                $state.go('DaftarSchedulePerjanjianSchedule', {
                    noSchedule: $scope.item.noRec,
                    idRuangan: $scope.item.ruanganNextSchedule.id,
                    noCM: $scope.item.pasien.noCm,
                    noRec: $scope.item.antrianPasienDiPeriksaSet[0].noRec
                });
            }


        }
    ]);
});