define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('ReservasiOnlineNewCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$rootScope', 'FindPegawai', 'FindPasien', 'DateHelper', function(managePasien, $scope, modelItem, $state, $rootScope, findPegawai, findPasien, DateHelper) {
        setTimeout(function() {
            $rootScope.doneSlide = true;
            $scope.$apply();
        }, 9000);
        if ($state.params !== undefined) {

            if ($state.params.id !== undefined) {
                $scope.state = $state.params.id.toUpperCase();
            }
        }
        $scope.now=new Date();
        $scope.item.tglReservasi=$scope.now;
        $scope.item = {};
        // ModelItem.get("Pasien/InputPasien").then(function(data) {
        //     $scope.item = data;
        //     $scope.dataVOloaded = true;
        // }, function errorCallBack(err) {});
        var arrFieldSelectVoKecamatan = ['id', 'name'];
        modelItem.getKendoSource("Kebangsaan", arrFieldSelectVoKecamatan, true).then(function(data) {
            $scope.listKebangsaan = data;
        });
        arrFieldSelectVoKecamatan = ['id', 'namaNegara'];
        modelItem.getKendoSource("Negara", arrFieldSelectVoKecamatan, true).then(function(data) {
            $scope.listNegara = data;
        });
        $scope.NavJenisPasien = function(model) {
            //$scope.item.pasien = {};
            $scope.item.jenisKelamin = {};
            $scope.item.pendidikan = {};
            $scope.item.pekerjaan = {};
            $scope.item.state = model;
            $scope.item.jenisPasien = model;
            modelItem.set('ReservasiPasien', $scope.item);
            $rootScope.AddMenuReservation = {
                name: model,
                url: '/ReservasiOnline/JenisPasien',
                id: 1
            };
        };
        $scope.$watch('item.kebangsaan', function(e) {
            if (e === undefined) return;
            if (e.name === 'WNI')
                $scope.item.negara = { id: 0 };
            if (e.name === 'WNA'){
                $scope.item.negara = $scope.item.kebangsaan;
            }
        });
        $scope.NavTipePasien = function(model) {
            $scope.item.type = model;
            $rootScope.AddMenuReservation = {
                name: model,
                url: '/ReservasiOnline/Main',
                id: 2
            };
            modelItem.set('ReservasiPasien', $scope.item);
            var state = modelItem.get('ReservasiPasien');
            $state.go('ReservasiOnline.ruangan');
        };
        $scope.NavStatusPasien = function(model) {
            if (model === 'BARU') {
                $rootScope.AddMenuReservation = {
                    name: model,
                    url: '/ReservasiOnline/Baru',
                    id: 3
                };
                $scope.item.tipePasien = 'Baru';
                modelItem.set('ReservasiPasien', $scope.item);
                $state.go('ReservasiOnline.input');
            } else {
                var state = modelItem.get('ReservasiPasien');
                $rootScope.AddMenuReservation = {
                    name: model,
                    url: '/ReservasiOnline/Baru',
                    id: 3
                };
                $scope.item.tipePasien = 'Lama';
                modelItem.set('ReservasiPasien', $scope.item);
                $state.go('ReservasiOnline.verifikasi', {
                    id: 'UMUM'
                });
            }

        };

        $scope.VerificationNoCm = function() {
            $scope.isBusyNoCm = true;
            findPasien.getByNoCM($scope.item.NoCM).then(function(e) {
                $scope.item.pasien = modelItem.beforePost(e.data.data);
                $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                $scope.item.pendidikan = $scope.item.pasien.pendidikan;
                $scope.item.pekerjaan = $scope.item.pasien.pekerjaan;
                $scope.isBusyNoCm = false;
                if (!$scope.$$phase)
                    $scope.$apply();
            }, function(e) {
                $scope.isBusyNoCm = false;
                window.messageContainer.error("Data tidak ditemukan");
            });
        }

        $scope.Verification = function() {
            $scope.isBusyNoBpjs = true;
            findPasien.getByNoBpjs($scope.item.NoIdentitasDetail).then(function(e) {
                if (e.data.messages) {
                    if (e.data.messages.StatusCode === '404') {
                        window.messageContainer.error(e.data.messages.INFO_MESSAGE);
                        $scope.item.type = "BARU";
                        setTimeout(function() {
                            window.location = "#/ReservasiOnline/Main";
                        }, 2000)
                        return;
                    }

                }

                if (e.data.data != null) {
                    debugger;
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
        $scope.dokters = [];
        $scope.$watch('item.poliTujuan', function(e) {
                if (e === undefined) return;
                findPegawai.getDokterRawatJalan($scope.item.tglReservasi, $scope.item.poliTujuan).fetch(function(e) {
                    if (this._data.length === 0) {
                        $scope.dokters = [];
                    } else {
                        $scope.dokters = _.filter(this._data, function(d) {
                            return d.dokterId !== undefined
                        });
                    }
                    $scope.$apply();
                });;
            })
            // modelItem.get("ReservasiPasien").then(function(data) {
            //     $scope.item = data;
            //     $scope.showDokter = $scope.item.type;
            //     console.log($scope.showDokter);
            // });
        modelItem.get("Pasien/InputPasien").then(function(data) {
            $scope.item = data;
            $scope.showDokter = $scope.item.type;
            console.log($scope.showDokter);
        });
        //list data jenis kelamin
        var arrFieldSelectVoJenisKelamin = ['id', 'jenisKelamin'];
        modelItem.getKendoSource("JenisKelamin", arrFieldSelectVoJenisKelamin, false).then(function(data) {
            $scope.listDataJenisKelamin = data;
        })

        //list data pekerjaan
        var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
        modelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan, false).then(function(data) {
            $scope.listDataPekerjaan = data;
        })

        //list data agama
        var arrFieldSelectVoAgama = ['id', 'agama'];
        modelItem.getKendoSource("Agama", arrFieldSelectVoAgama, true).then(function(data) {
            $scope.listDataAgama = data;
        })

        //list data pendidikan
        var arrFieldSelectVoPendidikan = ['id', 'namaPendidikan'];
        modelItem.getKendoSource("Pendidikan", arrFieldSelectVoPendidikan, false).then(function(data) {
            $scope.listDataPendidikan = data;
        })

        //list data status perkawinan
        var arrFieldSelectVoStatusPerkawinan = ['id', 'statusPerkawinan'];
        modelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoStatusPerkawinan, false).then(function(data) {
            $scope.listDataStatusPerkawinan = data;
        })
        $scope.showHIdeAlamatDetail = function() {
            if ($scope.alamatDetailIsShow) {
                $scope.alamatDetailIsShow = false;
            } else {
                $scope.alamatDetailIsShow = true;
            }
        };
        var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
        $scope.listDataKelurahan = modelItem.kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

        var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'kotaKabupaten'];
        modelItem.getKendoSource("Kecamatan", arrFieldSelectVoKecamatan, true).then(function(data) {
            $scope.listDataKecamatan = data;
        });
        $scope.$watch('item.kecamatan', function(e) {
            if (e === undefined) return;
            modelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                filter: {
                    field: e.kotaKabupaten ? "kdKotaKabupaten" : "id",
                    operator: "equal",
                    value: e.kotaKabupaten ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
                }
            }, '*').then(function(e) {
                e.fetch(function() {
                    $scope.isBusy = false;
                    if (this._data.length !== 0)
                        $scope.item.kotaKabupaten = this._data[0];
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })
            })
        });
        $scope.$watch('item.kotaKabupaten', function(e) {
            if (e === undefined) return;

            modelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                filter: {
                    field: e.propinsi ? "kdPropinsi" : "id",
                    operator: "equal",
                    value: e.propinsi ? e.propinsi.kdPropinsi : e.propinsiId
                }
            }, '*').then(function(e) {
                e.fetch(function() {
                    $scope.isBusy = false;
                    if (this._data.length !== 0)
                        $scope.item.propinsi = this._data[0];
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })
            })
        });
        modelItem.getDataDummyGeneric("KelompokPasien", false, true, undefined, '*').then(function(e) {
            $scope.isBusy = false;
            if (e.length !== 0)
                $scope.asuransiPasiens = e;
        });
        $scope.$watch('item.desaKelurahan', function(e) {
            if (e === undefined) return;
            if ($scope.item.kodePos === e.kodePos) return;
            $scope.item.kodePos = e.kodePos;

            modelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                filter: {
                    field: e.kecamatan ? "kdKecamatan" : "id",
                    operator: "equal",
                    value: e.kecamatan ? e.kecamatan.kdKecamatan : e.kecamatanId
                }
            }, '*').then(function(e) {
                e.fetch(function() {
                    $scope.isBusy = false;
                    if (this._data.length !== 0)
                        $scope.item.kecamatan = this._data[0];
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })
            })
        })
        $scope.findKodePos = function() {
            $scope.isBusy = true;
            modelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
                filter: {
                    field: "kodePos",
                    operator: "equal",
                    value: $scope.item.kodePos
                }
            }, '*').then(function(e) {
                e.fetch(function() {
                    $scope.isBusy = false;
                    if (this._data.length !== 0)
                        $scope.item.desaKelurahan = this._data[0];
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                })
            })
        }
        var arrFieldSelectVoStatusPerkawinan = ['id', 'pekerjaan'];
        modelItem.getKendoSource("Pekerjaan", arrFieldSelectVoStatusPerkawinan, false).then(function(data) {
                $scope.listDataPekerjaan = data;
            })
            //list data kecamatan
        var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'propinsi'];
        modelItem.getKendoSource("KotaKabupaten", arrFieldSelectVoKecamatan, true).then(function(data) {
            $scope.listDataKotaKabupaten = data;
        });

        $scope.liststat = [{
                "id": "1",
                "name": "UMUM"
            },
            {
                "id": "2",
                "name": "BPJS"
            },
            {
                "id": "3",
                "name": "Asuransi"
            }
        ]
        $scope.listkelas = [{
                "id": "1",
                "name": "Executive"
            },
            {
                "id": "2",
                "name": "Reguler"
            }
        ]
        $scope.listbarulama = [{
                "id": "1",
                "name": "Pasien Baru"
            },
            {
                "id": "2",
                "name": "Pasien Lama"
            }
        ]
        arrFieldSelectVoKecamatan = ['id', 'namaExternal'];
        modelItem.getKendoSource("Propinsi", arrFieldSelectVoKecamatan, true).then(function(data) {
            $scope.listDataPropinsi = data;
        });
        $scope.now = new Date();
        $scope.Save = function() {
            modelItem.set("ReservasiPasien", $scope.item);
            $state.go('ReservasiOnline.main');
        };

        $scope.Selanjutnya = function() {
            modelItem.set("ReservasiPasien", $scope.item);
            $state.go('ReservasiOnline.main');
        };
        $scope.Back = function() {
                history.back();
            }
            // $scope.Save = function() {

        //     modelItem.set("ReservasiPasien", $scope.item);
        //     $state.go('ReservasiOnline.ruangan');
        // };
        $scope.Prosses = function() {
            $state.go('ReservasiOnline.ruangan');
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
        // modelItem.getDataDummyGeneric("RuanganRawatJalanPenunjang", false, undefined, 25).then(function(data) {
        //     $scope.ruangansLocal = data;
        // });
        // $scope.ruangansLocal = genericService.query({
        //     table: 'DIS_RuanganReservation',
        //     select: "KdRuangan,NamaRuangan"
        // });

        // $scope.Prosses = function() {
        //     $state.go('ReservasiOnline.done');
        // }

        $scope.Done = function() {
            var item = modelItem.beforePost($scope.item);
            if (item.poliTujuan === undefined) {
                window.messageContainer.log("Ruangan belum di pilih");
                return;
            }
            item.ruangan = item.poliTujuan;
            item.pegawai = item.dokter;
            item.tglReservasi = DateHelper.getDateTimeFormattedNew($scope.item.tglReservasi);
            item.jenisPasien = $scope.item.jenisPasien;
            managePasien.saveReservasiOnline(item).then(function(e) {
                window.location = configuration.urlPrinting + "registrasi-pelayanan/reportReservasi?noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
            });
        }

    }]);
});