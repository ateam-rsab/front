define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPasienBaruPenunjangRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien','ManageTataRekening','DateHelper','CacheHelper',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien,manageTataRekening,dateHelper,cacheHelper) {
            $scope.title = "ini page registrasi pasien baru ctrl";

            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};
            $scope.dataParams = JSON.parse($state.params.dp);

            ModelItem.get("RegistrasiPasienVO").then(function(data) {
                $scope.item = data;
                $scope.dataAlamat = {};
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;
                if ($state.params.noRec !== undefined) {
                    findPasien.getReservasiPasienById($state.params.noRec).then(function(e) {
                        $scope.item = ModelItem.beforePost(e.data.data);
                        $scope.item.pasien = {
                            namaPasien: $scope.item.namaPasien
                        }
                        $scope.item.pasien.desaKelurahan = $scope.item.desaKelurahan;
                        $scope.item.pasien.tempatLahir = $scope.item.tempatLahir;
                        $scope.item.namaAyah = $scope.item.namaAyah;
                        $scope.item.pasien.tglLahir = $scope.item.tglLahir;
                        $scope.item.kodePos = $scope.item.desaKelurahan.kodePos;
                        //   $scope.findKodePos();

                    });
                }
            }, function errorCallBack() {
                $scope.dataVOloaded = true;
            });
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

            arrFieldSelectVoKecamatan = ['id', 'name'];
            ModelItem.getKendoSource("Kebangsaan", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listKebangsaan = data;
            });
            arrFieldSelectVoKecamatan = ['id', 'namaNegara'];
            ModelItem.getKendoSource("Negara", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listNegara = data;
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
                    $scope.item.negara =$scope.item.kebangsaan;
            });

            
            //waktu saat ini
            $scope.now = new Date();
            $scope.$watch('item.kecamatan', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: e.kotaKabupaten ? "kdKotaKabupaten" : "id",
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

            //list data jenis kelamin
            var arrFieldSelectVoJenisKelamin = ['id', 'jenisKelamin'];
            ModelItem.getKendoSource("JenisKelamin", arrFieldSelectVoJenisKelamin, false).then(function(data) {
                $scope.listDataJenisKelamin = data;
            })

            //list data pekerjaan
            var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
            ModelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan, false).then(function(data) {
                $scope.listDataPekerjaan = data;
            })

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

            $scope.showHIdeAlamatDetail = function() {
                    if ($scope.alamatDetailIsShow) {
                        $scope.alamatDetailIsShow = false;
                    } else {
                        $scope.alamatDetailIsShow = true;
                    }
                }
                //kirim data
            var tempId = 0;
            $scope.cetak = function() {

                var url = configuration.urlPrinting + "registrasi-pelayanan/kartuPasien?id=" + tempId + "&X-AUTH-TOKEN=" + ModelItem.getAuthorize();
                window.open(url);
            }

            $scope.Save = function() {
                var atributeIsdeleted = delete $scope.item.attributes;

                var arrDataAlamat = [$scope.dataAlamat];
                $scope.item.alamats = arrDataAlamat;

                //setDefault
                var kelompokUmur = {
                    "id": 1
                }
                $scope.item.kelompokUmur = kelompokUmur;

                var negara = {
                    "id": $scope.item.negara.id
                }

                var titlePasien = {
                    "id": 1
                }
                $scope.item.titlePasien = Date.parse($scope.item.titlePasien);

                var item = $scope.item;
                item.noTelepon = $scope.item.noTelepon;
                item.departemenfk =$scope.dataParams;
                item.alamats = [];
                if (item.alamat !== undefined)
                    item.alamats.push({
                        "alamatLengkap": item.alamat.alamatLengkap,
                        "kelurahan": item.alamat.kelurahan,
                        "kecamatan": item.alamat.kecamatan
                    });
                console.log(item)
                manageTataRekening.savePasienPenunjang(item).then(function(e) {
                    var tanggal = $scope.now;
                    var tanggalLahir = new Date(e.data.data.tgllahir);
                    var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                    var umurStr =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'

                    var jk =''
                    if (e.data.data.objectjeniskelaminfk == 1) {
                        jk="L"
                    }else{
                        jk="P"
                    }
                    var chacePeriode ={ 0 : e.data.data.nocm,
                        1 : e.data.data.namapasien,
                        2 : jk,
                        3 : umurStr,
                        4 : e.data.data.id
                    }
                    cacheHelper.set('RegistrasiPenunjangCtrl', chacePeriode);
                    // $state.go('RegistrasiPenunjangRev')

                    $state.go("RegistrasiPelayananPenunjang",{
                        noCm: e.data.data.nocm
                    })
                   var cacheSet = undefined;           
                   cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                   var cacheSetss  =undefined;          
                   cacheHelper.set('CacheRegisOnline', cacheSetss);
      
                  
                })


                // RegistrasiPasienBaru.SendData(item, "registrasi-pasien/save-registrasi-pasien")
                //     .then(
                //         function(res) {
                //             tempId = res.data.data.id;
                //             // if ($state.params.noRec !== undefined)
                //             //     $state.go('registrasiPelayanan', {
                //             //         noCm: $state.params.noRec + "*" + res.data.data.noCm
                //             //     })
                //             // $scope.isReport = true;
                //             $scope.isNext = true;
                //             $scope.noCm = res.data.data.noCm;
                //             $scope.noRec = res.data.data.id;

                //         },
                //         function(err) {})

            }

            $scope.Next = function() {
                var param = $scope.noCm;
                
                $state.go('registrasiPelayanan', {
                    noCm: param
                });
            }

        }
    ]);
});