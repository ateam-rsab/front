define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('registrasiPasienBaruBayiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien) {
            $scope.title = "ini page registrasi pasien baru ctrl";

            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.namaSuamiIstri = "-";

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
            

            $scope.cariPasien = function(){
                if($state.params.noCm!==undefined){
                    var noCm = $state.params.noCm;
                    findPasien.getByNoCM(noCm).then(function(e) {
                        debugger;
                        $scope.item.pasien = ModelItem.beforePost(e.data.data);

                        $scope.item.pasien.namaIbu = $scope.item.pasien.namaPasien;
                        $scope.item.pasien.namaPasien = $scope.item.pasien.namaPasien+" By Ny";
                        $scope.item.tglLahir = new Date();
                        $scope.item.jamLahir = new Date();
                        $scope.item.tempatLahir = $scope.item.pasien.tempatLahir;
                        $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                        $scope.item.agama = $scope.item.pasien.agama;
                        $scope.item.kebangsaan = e.data.data.kebangsaan;
                        $scope.item.negara = e.data.data.negara;
                        $scope.item.kodePos= e.data.data.alamat.kodePos;
                        $scope.idIbu = e.data.data.id;
                        
                        $scope.item.kecamatan= e.data.data.alamat.kecamatan;
                        $scope.item.kotaKabupaten= e.data.data.alamat.kotaKabupaten;
                        $scope.item.propinsi= e.data.data.alamat.propinsi;
                        $scope.item.desaKelurahan= e.data.data.alamat.desaKelurahan;

                        $scope.item.noTelepon = e.data.data.noTelepon;
                        $scope.item.noAditional = e.data.data.noAditional;
                        if($scope.item.kodePos!=undefined){
                            $scope.findKodePos();
                        }
                    })
                }
            }
            $scope.cariPasien();

            $scope.$watch('item.kebangsaan', function(e) {
                if (!e) return;
                if (e.name === 'WNI')
                    $scope.item.negara = { id: 0 };
                if (e.name === 'WNA')
                    $scope.item.negara =$scope.item.kebangsaan;
            });


            //waktu saat ini
            $scope.now = new Date();
            // $scope.item.namaSuamiIstri = "fsdfhjsdf";
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
            // $scope.getAlamat();
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
            // var arrFieldSelectVoStatusPerkawinan = ['id', 'statusPerkawinan'];
            // ModelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoStatusPerkawinan, false).then(function(data) {
            //     $scope.listDataStatusPerkawinan = data;
            // })

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
                // var atributeIsdeleted = delete $scope.item.attributes;

                // var arrDataAlamat = [$scope.dataAlamat];
                // $scope.item.alamats = arrDataAlamat;

                // //setDefault
                // var kelompokUmur = {
                //     "id": 1
                // }
                // $scope.item.kelompokUmur = kelompokUmur;

                // var negara = {
                //     "id": $scope.item.negara.id
                // }

                // var titlePasien = {
                //     "id": 1
                // }
                // $scope.item.titlePasien = titlePasien;
                var tglLahir = $scope.item.tglLahir, jamLahir = $scope.item.jamLahir;
                var statusPerkawinan = {
                    "id": 0
                }
                $scope.item.statusPerkawinan = statusPerkawinan;

                var pendidikan = {
                    "id": 0
                }
                $scope.item.pendidikan = pendidikan;

                // var pekerjaan = {
                //     "id": 0
                // }
                // $scope.item.pekerjaan = pekerjaan;
                
                var data= {
                    "agama":$scope.item.agama,
                    "noBpjs": $scope.item.pasien.noBpjs,
                    "noAsuransiLain": $scope.item.pasien.noAsuransiLain,
                    "namaIbu": $scope.item.pasien.namaIbu,
                    "namaSuamiIstri": $scope.item.pasien.namaSuamiIstri,
                    "jenisKelamin": $scope.item.jenisKelamin,
                    "noAditional": $scope.item.pasien.noAditional,
                    "noHp": $scope.item.pasien.noHp,
                    "pendidikan": $scope.item.pendidikan,
                    "statusPerkawinan": $scope.item.statusPerkawinan,
                    "tglLahir": tglLahir.getTime(),
                    "namaAyah": $scope.item.pasien.namaAyah,
                    "negara": $scope.item.negara,
                    "noTelepon": $scope.item.pasien.noTelepon,
                    "alamats": [
                        {
                            "kotaKabupaten": $scope.item.kotaKabupaten,
                            "negara": $scope.item.negara,
                            "desaKelurahan": $scope.item.desaKelurahan,
                            "propinsi":  $scope.item.propinsi,
                            "alamatLengkap": $scope.item.pasien.alamat.alamatLengkap,
                            "kecamatan":  $scope.item.kecamatan,
                            "kodePos":  $scope.item.kodePos,
                            "namaKotaKabupaten":  $scope.item.kotaKabupaten.namaKotaKabupaten,
                            "namaKecamatan":  $scope.item.kecamatan.namaKecamatan
                        }
                    ],
                    "noIdentitas": $scope.item.pasien.noIdentitas,
                    "tempatLahir": $scope.item.pasien.tempatLahir,
                    "jamLahir": jamLahir.getTime(),
                    "tglDaftar" : new Date().getTime(),
                    "kebangsaan": $scope.item.kebangsaan,
                    "namaPasien": $scope.item.pasien.namaPasien,
                    "namaKeluarga": $scope.item.pasien.namaKeluarga,
                    "pasienIbu":{
                        "id": $scope.idIbu
                    },
                    "title": {
                        "id": 0
                    }
                }

                debugger;
                RegistrasiPasienBaru.SendDataBayi(data, "registrasi-pasien/save-registrasi-pasien-bayi").then(function(res) {
                    tempId = res.data.data.id;
                    // if ($state.params.noRec !== undefined)
                    //     $state.go('registrasiPelayanan', {
                    //         noCm: $state.params.noRec + "*" + res.data.data.noCm
                    //     })
                    $scope.isReport = true;
                    $scope.isNext = true;
                    $scope.noCm = res.data.data.noCm;
                    $scope.noRec = res.data.data.id;

                },
                function(err) {})

                /*var dataVO = $scope.dataPasienBaru;
                dataVO.noCM.namaPasien = "Dicky Jaya Umbara";
                ModelItem.post("save-pasien-daftar", dataVO)
                .then(function(res){
                	alert("sukses kiri data");
                })*/
            }
            $scope.goVerifikasiBayi = function() {
                $state.go('VerifikasiBayi');
            }

            $scope.Next = function() {

                var param =  $scope.noCm;
                
                $state.go('registrasiPelayanan', {
                    noCm: param
                });
                $scope.item = {};
            }

        }
    ]);
});