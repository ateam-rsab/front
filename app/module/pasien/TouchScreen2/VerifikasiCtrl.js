define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('VerifikasiCtrl', ['$scope', 'ModelItem', '$rootScope', '$state', 'FindPasien', 'FindPegawai',

        function($scope, modelItem, $rootScope, $state, findPasien, findPegawai) {
            if ($state.current.name === 'touchscreenreBpjs')
                $scope.state = 'BPJS';
            else
                $scope.state = 'UMUM';
            if ($state.params !== undefined) {

                if ($state.params.id !== undefined) {
                    $scope.state = $state.params.id.toUpperCase();
                }
            }
            $scope.showDokter = window.tipe;
            $scope.item = {};
            $scope.VerificationNoCm = function() {
                findPasien.getByNoCM($scope.noCm).then(function(e) {
                    $scope.item = e.data;
                })
            }
            $scope.NavJenisPasien = function(model) {
                modelItem.set('StateReservation', model);
                $rootScope.AddMenuReservation = {
                    name: model,
                    url: '/ReservasiOnline/JenisPasien',
                    id: 1
                };
            };
            $scope.NavTipePasien = function(model) {
                window.tipe = model;
                $scope.item.Tipe = model;
                $rootScope.AddMenuReservation = {
                    name: model,
                    url: '/TouchScreen/Main',
                    id: 2
                };
                var state = modelItem.get('StateReservation');
                // if 
                $state.go('touchscreenreVerifikasi', {
                    state: 'UMUM'
                });
            };
            $scope.NavStatusPasien = function(model) {
                if (model === 'BARU') {
                    $rootScope.AddMenuReservation = {
                        name: model,
                        url: '/ReservasiOnline/Baru',
                        id: 3
                    };
                    $state.go('ReservasiOnline.input', {

                    });
                } else {
                    var state = modelItem.get('StateReservation');
                    $rootScope.AddMenuReservation = {
                        name: model,
                        url: '/ReservasiOnline/Baru',
                        id: 3
                    };
                    $state.go('ReservasiOnline.verifikasi', {
                        id: state.$$state.value
                    });
                }

            };

            $scope.$watch('item.PoliTujuan', function(e) {
                if (e === undefined) return;
                
                findPegawai.getDokterRawatJalan($scope.item.tglReservasi, $scope.item.PoliTujuan).fetch(function(e) {
                    if (this._data.length === 0) {
                        $scope.dokters = [];
                    } else {
                        $scope.dokters = this._data;
                    }
                    $scope.$apply();
                });
            })
            modelItem.get("ReservasiPasien").then(function(data) {
                $scope.item = data;
                $scope.item.tglPendaftaran = new Date();
                $scope.showDokter = $scope.item.Tipe;
                console.log($scope.showDokter);
            });
            modelItem.getDataDummyGeneric("JenisKelamin", true, undefined, 10).then(function(data) {
                $scope.jenisKelaminsLocal = data;
            });
            modelItem.getDataDummyGeneric("KelompokPasien", false, undefined, 10).then(function(data) {
                $scope.asuransiPasiens = _.filter(data, function(item) {
                    return item.kelompokPasien !== 'UMUM';
                });
            });
            modelItem.getDataDummyGeneric("JenisKelamin", false, undefined, 10).then(function(data) {
                $scope.jenisKelamins = data;
            });
            modelItem.getDataDummyGeneric("DesaKelurahan", true, undefined, 10).then(function(data) {
                $scope.desaKelurahans = data;
            });
            $scope.now = new Date();
            $scope.Lanjutkan = function() {
                modelItem.set("ReservasiPasien", $scope.item);
                $state.go('ReservasiOnline.ruangan');
            };
            $scope.Prosses = function() {
                $state.go('touchscreenreRuangan');
            };

            var tglTemp = [];
            var date = new Date();
            for (var i = 0; i < 8; i++) {
                date = new Date();
                date.setDate(date.getDate() + i);
                tglTemp.push({
                    date: date
                });
            }
            $scope.tanggalReservasi = tglTemp;
            modelItem.getDataDummyGeneric("RuanganRawatJalanPenunjang", false, undefined, 25).then(function(data) {
                $scope.ruangansLocal = data;
            });
            // $scope.ruangansLocal = genericService.query({
            //     table: 'DIS_RuanganReservation',
            //     select: "KdRuangan,NamaRuangan"
            // });

            // $scope.Prosses = function() {
            //     $state.go('ReservasiOnline.done');
            // }

            $scope.Done = function() {
                $scope.isLoading = true;
                window.open("/app/Reservasi/Cetak?namaRuangan=" + $scope.item.PoliTujuan.namaRuangan + "&tanggal=" + moment($scope.item.tglReservasi).format('DD-MM-YYYY'), '_blank');
            }

        }
    ]);
});  