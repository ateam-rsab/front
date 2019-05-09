define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiPasienPenunjangCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru) {
            $scope.title = "ini page registrasi pasien baru ctrl";
            $scope.isDisabled = false;
            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};
            ModelItem.get("RegistrasiPasienVO").then(function(data) {
                $scope.item = data;
                $scope.dataAlamat = {};
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;
            }, function errorCallBack() {
                $scope.dataVOloaded = true;
            });
            ModelItem.getKendoSource("Rekanan", arrFieldSelectVoJenisKelamin, false).then(function(data) {
                $scope.rekanans = data;
            });
            //waktu saat ini
            $scope.now = new Date();

            $scope.asalrujukans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-asal-rujukan');
            /*$scope.ruangans = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-penunjang');*/
            /*add_hanafi*/
            $scope.ruangans =  [{"id":276,"namaRuangan":"Laboratorium"},
                                {"id":41,"namaRuangan":"Bank Darah"},
                                {"id":35,"namaRuangan":"Radiologi"}
                                ] 
            //
            ModelItem.getDataDummyGeneric("AsalRujukan", true, undefined, 10).then(function(data) {
                $scope.asalrujukans = data;
            });
            //list data jenis kelamin
            var arrFieldSelectVoJenisKelamin = ['id', 'jenisKelamin'];
            ModelItem.getKendoSource("JenisKelamin", arrFieldSelectVoJenisKelamin, false).then(function(data) {
                $scope.listDataJenisKelamin = data;
            });

            //list data pekerjaan
            var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
            ModelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan, false).then(function(data) {
                $scope.listDataPekerjaan = data;
            })
            arrFieldSelectVoKecamatan = ['id', 'name'];
            ModelItem.getKendoSource("Kebangsaan", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listKebangsaan = data;
            });
            arrFieldSelectVoKecamatan = ['id', 'namaNegara'];
            ModelItem.getKendoSource("Negara", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listNegara = data;
            });
            //list data agama
            var arrFieldSelectVoAgama = ['id', 'agama'];
            ModelItem.getKendoSource("Agama", arrFieldSelectVoAgama, true).then(function(data) {
                $scope.listDataAgama = data;
            })

            //list data pendidikan
            var arrFieldSelectVoPendidikan = ['id', 'namaPendidikan'];
            ModelItem.getKendoSource("Pendidikan", arrFieldSelectVoPendidikan, false).then(function(data) {
                $scope.listDataPendidikan = data;
            })

            //list data status perkawinan
            var arrFieldSelectVoStatusPerkawinan = ['id', 'statusPerkawinan'];
            ModelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoStatusPerkawinan, false).then(function(data) {
                $scope.listDataStatusPerkawinan = data;
            })

            //list data kecamatan
            
            var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
            $scope.listDataKelurahan = ModelItem
                .kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

            var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'kotaKabupaten'];
            ModelItem.getKendoSource("Kecamatan", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listDataKecamatan = data;
            });
            var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'propinsi'];
            ModelItem.getKendoSource("KotaKabupaten", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listDataKotaKabupaten = data;
            });

            arrFieldSelectVoKecamatan = ['id', 'namaExternal'];
            ModelItem.getKendoSource("Propinsi", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listDataPropinsi = data;
            });

            $scope.$watch('item.kebangsaan', function(e) {
                if (e === undefined) return;
                if (e.name === 'WNI')
                    $scope.item.negara = { id: 0 };
                if (e.name === 'WNA')
                    $scope.item.negara =null;
            });
            //waktu saat ini
            $scope.now = new Date();
            $scope.$watch('item.kecamatan', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: "kdKotaKabupaten",
                        operator: "equal",
                        value: e.propinsi ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
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
                ModelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                    filter: {
                        field: "kdPropinsi",
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
            ModelItem.getDataDummyGeneric("KelompokPasien", false, true, undefined, '*').then(function(e) {
                $scope.isBusy = false;
                if (e.length !== 0)
                    $scope.asuransiPasiens = _.filter(e, function(e) {
                        return e.id != 1;
                    });
            });
            $scope.$watch('item.desaKelurahan', function(e) {
                if (e === undefined) return;
                $scope.item.kodePos = e.kodePos;
                ModelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                    filter: {
                        field: "kdKecamatan",
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
                if ($scope.item.kodePos === '' || $scope.item.kodePos === undefined) return;
                ModelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
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

            //list data Kelurhan
            /*var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan'];
            $scope.listDataKelurahan = ModelItem.kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);*/
            //toggle alamat detail
            $scope.showHIdeAlamatDetail = function() {
                if ($scope.alamatDetailIsShow) {
                    $scope.alamatDetailIsShow = false;
                } else {
                    $scope.alamatDetailIsShow = true;
                }
            }
            $scope.Next = function() {
                $state.go('registrasiPenunjang.Order.Laboratorium', {

                });
            };
            //kirim data
            $scope.Save = function() {
                debugger;
                var atributeIsdeleted = delete $scope.item.attributes;

                $scope.dataAlamat.alamatLengkap = $scope.item.alamatLengkap;
                var arrDataAlamat = [$scope.dataAlamat];
                $scope.item.alamats = arrDataAlamat;
                $scope.item.pasien.alamatLengkap = $scope.item.alamatLengkap;
                $scope.item.pasien.ruangan = $scope.item.ruangan;

                //setDefault
                var kelompokUmur = {
                    "id": 1
                }
                $scope.item.kelompokUmur = kelompokUmur;

                var negara = {
                    "id": 1
                }
                $scope.item.negara = negara;

                var titlePasien = {
                    "id": 1
                }
                $scope.item.titlePasien = Date.parse($scope.item.titlePasien);
                if ($state.current.name === 'registrasiPasienPenunjang')
                    RegistrasiPasienBaru.SendData($scope.item, "registrasi-pasien/save-registrasi-pasien-penunjang")
                    .then(
                        function(res) {
                            $scope.isDisabled = true;
                            //  $scope.isHide = true;
                            if ($scope.item.ruangan.id === 41) {
                                $state.go('registrasiPasienPenunjang.Darah', {
                                noRec: res.data.data.noRec
                            });
                            }
                            else if ($scope.item.ruangan.id === 276) {
                            $state.go('registrasiPasienPenunjang.Laboratorium', {
                                noRec: res.data.data.noRec
                            });
                            }

                            else if ($scope.item.ruangan.id === 35) {
                            $state.go('registrasiPasienPenunjang.Radiologi', {
                                noRec: res.data.data.noRec
                            });
                            }

                        },
                        function(err) {})
                else {

                }


            }

        }
    ]);
});