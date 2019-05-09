define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPerjanjianPasienCtrl', ['CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket',
        function(cacheHelper, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket) {

            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            var dateNow = new Date();
            dateNow.setDate(dateNow.getDate() + 1);
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = dateNow;


 
            $scope.listPasien = cacheHelper.get('listPerjanjian');
            // if (cacheHelper.get('tglAwalPerjanjian') !== undefined)
            //     $scope.from = cacheHelper.get('tglAwalPerjanjian');
            // if (cacheHelper.get('tglAkhirPerjanjian') !== undefined)
            //     $scope.until = cacheHelper.get('tglAkhirPerjanjian');


            $scope.kodeReservasi = '';
            $scope.Column = [{
                field: "noReservasi",
                title: "Kode Reservasi",
                width: 150
            }, {
                field: "noCm",
                title: "No Rekam Medis",
                width: 150
            }, {
                field: "tglReservasiNew",
                title: "Tanggal Reservasi",
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
                field: "dokter.namaLengkap",
                title: "Dokter",
                width: 200
            }, {
                field: "status",
                title: "Status",
                width: 200
            },
            {
                field: "dokter.noTlp",
                title: "Nomor Telepon",
                width: 200
            }

             ];


            $scope.Page = {
                refresh: true//,
                //pageSizes: true//,
                //buttonCount: 5
            }
            $scope.findData = function() {
                cacheHelper.set('tglAwalPerjanjian', $scope.from);
                cacheHelper.set('tglAkhirPerjanjian', $scope.until);
                findPasien.findPerjanjian($scope.from, $scope.until, $scope.kodeReservasi).then(function(e) {
                    $scope.listPasien = e.data.data;
                    cacheHelper.set('listPerjanjian', $scope.listPasien);
                    $scope.listPasien.forEach(function(data) {
                        var date = new Date(data.tglReservasi);
                        data.tglReservasiNew = dateHelper.getTanggalFormatted(date);
                    });
                });
            }
            $scope.findData();
            socket.on('DaftarAntrianPerjanjian', function(data) {
                $scope.findData();
            });

            $scope.reconfirm = function() {
                window.isPerjanjian = $scope.item.noReservasi;

                findPasien.CheckNoReconfirm($scope.item.noReservasi).then(function(e) {
                    if ($scope.item.noCm === undefined)
                        $state.go('registrasiPasienBaruOnline', {
                            noRec: $scope.item.noRec
                        });
                    else {
                        var param = $scope.item.noRec + "*" + $scope.item.noCm;

                        $state.go('registrasiPelayanan', {
                            noCm: param
                        });
                    }
                });
            }


        }
    ]);
});