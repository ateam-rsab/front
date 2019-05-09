define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('VerifikasiCtrl', ['ManagePasien', '$scope', 'ModelItem', '$rootScope', '$state', 'FindPasien', 'FindPegawai',

        function(managePasien, $scope, modelItem, $rootScope, $state, findPasien, findPegawai) {
            // if ($state.current.name === 'touchscreenreBpjs')
            //     $scope.state = 'BPJS';
            // else
            $scope.state = window.state;
            if ($state.params !== undefined) {

                if ($state.params.id !== undefined) {
                    $scope.state = $state.params.id.toUpperCase();
                }
            }
            $scope.showDokter = window.tipe;
            $scope.item = {};
            $scope.VerificationNoCm = function() {
                findPasien.getByNoCM($scope.item.NoCM).then(function(e) {
                        $scope.item.pasien = modelItem.beforePost(e.data.data);
                        $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                        $scope.item.pendidikan = $scope.item.pasien.pendidikan;
                        $scope.item.pekerjaan = $scope.item.pasien.pekerjaan;

                        if (!$scope.$$phase)
                            $scope.$apply();
                    }),
                    function(e) {
                        $scope.isBusyNoCm = false;
                        window.messageContainer.error("Data tidak ditemukan");
                    }
            }
            $scope.Verification = function() {
                $scope.isBusyNoBpjs = true;
                findPasien.getByNoBpjs($scope.item.NoIdentitasDetail).then(function(e) {
                    if (e.data.messages) {
                        if (e.data.messages.StatusCode === '404') {
                            window.messageContainer.error(e.data.messages.INFO_MESSAGE);
                            $scope.item.type = "BARU";
                            setTimeout(function() {
                                window.location = "#/TouchScreen/JenisPasien";
                            }, 2000)
                            return;
                        }

                    }

                    if (e.data.data != null) {
                        $scope.item.pasien = modelItem.beforePost(e.data.data);
                        $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                        $scope.item.pendidikan = $scope.item.pasien.pendidikan;
                        $scope.item.pekerjaan = $scope.item.pasien.pekerjaan;
                        $scope.isBusyNoCm = false;
                        if (!$scope.$$phase)
                            $scope.$apply();
                    }
                });
            }
            $scope.$watch('state', function(e) {
                if (e === undefined) return;
                window.state = e;
            })
            $scope.NavJenisPasien = function(model) {
                $scope.item.state = model;
                modelItem.set('StateReservation', model);
                $rootScope.AddMenuReservation = {
                    name: model,
                    url: '/ReservasiOnline/JenisPasien',
                    id: 1
                };
                modelItem.set("ReservasiPasien", $scope.item);
            };
            $scope.NavTipePasien = function(model) {
                window.tipe = model;
                $scope.item.Tipe = model;
                modelItem.set("ReservasiPasien", $scope.item);
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
                modelItem.set("ReservasiPasien", $scope.item);

            };
            $scope.Selanjutnya = function() {
                modelItem.set("ReservasiPasien", $scope.item);
                $state.go('touchscreenreRuangan');
            };
            $scope.$watch('item.poliTujuan', function(e) {
                if (e === undefined) return;

                findPegawai.getDokterRawatJalan($scope.item.tglReservasi, $scope.item.poliTujuan).fetch(function(e) {
                    if (this._data.length === 0) {
                        $scope.dokters = [];
                    } else {
                        $scope.dokters = this._data;
                    }
                    $scope.$apply();
                });;
            })
            modelItem.get("ReservasiPasien").then(function(data) {
                $scope.item = data;
                $scope.item.tglPendaftaran = new Date();
                $scope.item.tglReservasi = new Date();
                $scope.showDokter = $scope.item.Tipe;
                console.log($scope.showDokter);
            });
            modelItem.getDataDummyGeneric("JenisKelamin", true, undefined, 10).then(function(data) {
                $scope.jenisKelaminsLocal = data;
            });
            modelItem.getDataDummyGeneric("KelompokPasien", false, undefined, 10).then(function(data) {
                $scope.asuransiPasiens = _.filter(data, function(item) {
                    return item.kelompokPasien !== 'UMUM';
                });;
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
                $state.go('touchscreenreRuangan');
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
            // modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan').fetch(function() {
            //     $scope.ruangansLocal = this._data;
            // });

            $scope.ruangans = modelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan');
            $scope.ruangans.fetch(function() {
                var data = [];
                for (var key in this._data) {
                    if (this._data.hasOwnProperty(key)) {
                        var element = this._data[key];
                        if (element.departemenId !== undefined) {
                            if (element.departemenId === 18)
                                element.group = "Poliklinik";
                            else
                                element.group = "Penunjang";
                            data.push(element);
                        }
                    }
                }
                var temp = [];
                for (var key in _.groupBy(data, 'group')) {
                    if (_.groupBy(data, 'group').hasOwnProperty(key)) {
                        var element = _.groupBy(data, 'group')[key];
                        temp.push({ key: key, items: element });
                    }
                }
                $scope.ruangansLocal = temp;

                $scope.$apply();
            });

            $scope.Done = function() {
                var item = modelItem.beforePost($scope.item);
                item.ruangan = item.poliTujuan;
                item.pegawai = item.dokter;
                item.tipePasien = "Lama";
                item.type = window.tipe;
                item.jenisPasien = $scope.item.JenisPasien;
                managePasien.saveAntrianTouchScreen(item).then(function(e) {
                    window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + e.data.data.noRecAntrian + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
                });
            }
            modelItem.getDataDummyGeneric("KelompokPasien", false, true, undefined, '*').then(function(e) {
                $scope.isBusy = false;
                if (e.length !== 0)
                    $scope.asuransiPasiens = _.filter(e, function(e) {
                        return e.id != 1;
                    });
            });
            $scope.back = function() { 
                window.history.back();  
            }

        }
    ]);
});