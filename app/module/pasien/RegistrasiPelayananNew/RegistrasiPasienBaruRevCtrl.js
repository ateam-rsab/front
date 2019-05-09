define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPasienBaruRevCtrl', ['$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'CacheHelper', 'ManageServicePhp',
        function ($scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, cacheHelper, manageServicePhp) {
            // $scope.title = "ini page registrasi pasien baru ctrl";

            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};

            init();

            function init() {
                if ($state.params.noRec != undefined) {
                    cariPasien();
                }
            }
            function cariPasien() {
                manageServicePhp.getDataTableTransaksi('registrasipasien/get-pasienonline-bynorec/' + $state.params.noRec)
                    .then(function (e) {
                        debugger
                        var result = e.data.data
                        // $scope.item.idPasiens = result.nocmfk;
                        $scope.item.namaIbu = result.namaibu;
                        $scope.item.namaAyah = result.namaayah;
                        $scope.item.pasien =result; 
                        $scope.item.pasien.namaPasien = result.namapasien
                        if (result.tgllahir != null){
                            $scope.item.tglLahir = moment(result.tgllahir).format('YYYY-MM-DD');
                            $scope.item.jamLahir = moment(result.tgllahir).format('HH:mm:ss');
                        } 
                        $scope.item.tempatLahir = result.tempatlahir;
                        $scope.item.pasien.tempatLahir= result.tempatlahir;
                        $scope.item.jenisKelamin = {id:result.objectjeniskelaminfk,jenisKelamin:result.jeniskelamin};
                        $scope.item.agama = {id:result.objectagamafk,agama:result.agama};
                        $scope.item.statusPerkawinan = {id:result.objectstatusperkawinanfk,statusPerkawinan:result.statusperkawinan};
                        $scope.item.pendidikan ={id:result.objectpendidikanfk,namaPendidikan:result.pendidikan};
                        $scope.item.pekerjaan = {id:result.objectpekerjaanfk,pekerjaan:result.pekerjaan};
                        $scope.item.noIdentitas = result.noidentitas;
                        $scope.item.noBpjs = result.nobpjs;
                        $scope.item.namaSuamiIstri = result.namasuamiistri;
                        $scope.item.alamatLengkap = result.alamatlengkap;
                        $scope.item.noTelepon = result.notelepon;
                        // $scope.item.kebangsaan = { id: 0, name:'WNI' }
                        // $scope.item.kodePos=result.kodePos;
                        $scope.item.noHp =result.noaditional;

                        // })
                        // findPasien.getReservasiPasienById($state.params.noRec).then(function(e) {

                        //     $scope.item.pasien = ModelItem.beforePost(e.data.data);
                        //     $scope.item.idPasiens= $scope.item.pasien.id;
                        //     $scope.item.namaIbu =  $scope.item.pasien.namaIbu;
                        //     $scope.item.namaAyah =  $scope.item.pasien.namaAyah;
                        //     $scope.item.pasien.namaPasien = $scope.item.pasien.namaPasien
                        //     $scope.item.tglLahir = moment( $scope.item.pasien.tglLahir).format('YYYY-MM-DD');
                        //     $scope.item.jamLahir = moment( $scope.item.pasien.tglLahir).format('HH:mm:ss');
                        //     // $scope.item.jamLahir = new Date();
                        //     $scope.item.tempatLahir = $scope.item.pasien.tempatLahir;
                        //     $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                        //     $scope.item.agama = $scope.item.pasien.agama;
                        //     $scope.item.statusPerkawinan = $scope.item.pasien.statusPerkawinan;
                        //     $scope.item.pendidikan = $scope.item.pasien.pendidikan;
                        //     $scope.item.pekerjaan = $scope.item.pasien.pekerjaan;
                        //     // $scope.item.kebangsaan = e.data.data.kebangsaan;

                        //     $scope.item.noIdentitas=$scope.item.pasien.noIdentitas;
                        //     $scope.item.noBpjs=$scope.item.pasien.noBpjs;
                        //     $scope.item.namaSuamiIstri=$scope.item.pasien.namaSuamiIstri;
                        //     $scope.item.namaKeluarga=$scope.item.pasien.namaKeluarga;
                        //     $scope.item.noHp=$scope.item.pasien.noTelepon;
                        //     // $scope.item.paien.paspor=$scope.item.pasien.noIdentitas;
                        //     // $scope.idIbu = e.data.data.id;

                        //     // $scope.item.kecamatan= e.data.data.alamat.kecamatan;
                        //     // $scope.item.kotaKabupaten= e.data.data.alamat.kotaKabupaten;
                        //     // $scope.item.propinsi= e.data.data.alamat.propinsi;
                        //     // $scope.item.desaKelurahan= e.data.data.alamat.desaKelurahan;
                        //     $scope.item.alamatLengkap=$scope.item.pasien.alamatLengkap;

                        //     $scope.item.noTelepon =  $scope.item.noHp;
                        //     $scope.item.kebangsaan={id:$scope.listKebangsaan._data[1].id,name:$scope.listKebangsaan._data[1].name}
                        //     // $scope.item.agama={id:e.data.data[0].objectagamafk,agama:e.data.data[0].agama}
                        //     // $scope.item.negara = e.data.data.negara;
                        //     // $scope.item.kodePos= $scope.item.pasien.alamat.kodePos;
                        //     // $scope.item.noHp = e.data.data.noAditional;

                        if ($scope.item.kodePos != undefined) {
                            $scope.findKodePos();

                        }
                    })
            }




            // ModelItem.get("RegistrasiPasienVO").then(function(data) {
            //     $scope.item = data;
            //     $scope.dataAlamat = {};
            //     $rootScope.doneLoad = false;
            //     $scope.dataVOloaded = true;
            //     if ($state.params.noRec !== undefined) {
            //         findPasien.getReservasiPasienById($state.params.noRec).then(function(e) {
            //             $scope.item = ModelItem.beforePost(e.data.data);
            //             $scope.item.pasien = {
            //                 namaPasien: $scope.item.namaPasien
            //             }
            //             $scope.item.pasien.desaKelurahan = $scope.item.desaKelurahan;
            //             $scope.item.pasien.tempatLahir = $scope.item.tempatLahir;
            //             $scope.item.namaAyah = $scope.item.namaAyah;
            //             $scope.item.pasien.tglLahir = $scope.item.tglLahir;
            //             $scope.item.kodePos = $scope.item.desaKelurahan.kodePos;
            //             //   $scope.findKodePos();

            //         });
            //     }
            // }, function errorCallBack() {
            //     $scope.dataVOloaded = true;
            // });
            var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
            $scope.listDataKelurahan = ModelItem
                .kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

            var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'kotaKabupaten'];
            ModelItem.getKendoSource("Kecamatan", arrFieldSelectVoKecamatan, true).then(function (data) {
                $scope.listDataKecamatan = data;
            });
            var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'propinsi'];
            ModelItem.getKendoSource("KotaKabupaten", arrFieldSelectVoKecamatan, true).then(function (data) {
                $scope.listDataKotaKabupaten = data;
            });

            arrFieldSelectVoKecamatan = ['id', 'name'];
            ModelItem.getKendoSource("Kebangsaan", arrFieldSelectVoKecamatan, true).then(function (data) {
                $scope.listKebangsaan = data;
            });
            arrFieldSelectVoKecamatan = ['id', 'namaNegara'];
            ModelItem.getKendoSource("Negara", arrFieldSelectVoKecamatan, true).then(function (data) {
                $scope.listNegara = data;
            });
            arrFieldSelectVoKecamatan = ['id', 'namaExternal'];
            ModelItem.getKendoSource("Propinsi", arrFieldSelectVoKecamatan, true).then(function (data) {
                $scope.listDataPropinsi = data;
            });


            $scope.$watch('item.kebangsaan', function (e) {
                if (e === undefined) return;
                if (e.name === 'WNI')
                    $scope.item.negara = { id: 0 };
                if (e.name === 'WNA')
                    $scope.item.negara = $scope.item.kebangsaan;
            });


            //waktu saat ini
            $scope.now = new Date();
            $scope.$watch('item.kecamatan', function (e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: e.kotaKabupaten ? "kdKotaKabupaten" : "id",
                        operator: "equal",
                        value: e.propinsi ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
                    }
                }, '*').then(function (e) {
                    e.fetch(function () {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kotaKabupaten = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });
            $scope.$watch('item.kotaKabupaten', function (e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                    filter: {
                        field: e.propinsi ? "kdPropinsi" : "id",
                        operator: "equal",
                        value: e.propinsi ? e.propinsi.kdPropinsi : e.propinsiId
                    }
                }, '*').then(function (e) {
                    e.fetch(function () {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.propinsi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });
            ModelItem.getDataDummyGeneric("KelompokPasien", false, true, undefined, '*').then(function (e) {
                $scope.isBusy = false;
                if (e.length !== 0)
                    $scope.asuransiPasiens = _.filter(e, function (e) {
                        return e.id != 1;
                    });
            });
            $scope.$watch('item.desaKelurahan', function (e) {
                if (e === undefined) return;
                $scope.item.kodePos = e.kodePos;
                ModelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                    filter: {
                        field: e.kecamatan ? "kdKecamatan" : "id",
                        operator: "equal",
                        value: e.kecamatan ? e.kecamatan.kdKecamatan : e.kecamatanId
                    }
                }, '*').then(function (e) {
                    e.fetch(function () {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kecamatan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            })
            $scope.findKodePos = function (kdPos) {
                if (!kdPos) return;
                $scope.isBusy = true;
                ModelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
                    filter: {
                        field: "kodePos",
                        operator: "equal",
                        value: $scope.item.kodePos
                    }
                }, '*').then(function (e) {
                    e.fetch(function () {
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
            ModelItem.getKendoSource("JenisKelamin", arrFieldSelectVoJenisKelamin, false).then(function (data) {
                $scope.listDataJenisKelamin = data;
            })

            //list data pekerjaan
            var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
            ModelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan, false).then(function (data) {
                $scope.listDataPekerjaan = data;
            })

            //list data agama
            var arrFieldSelectVoAgama = ['id', 'agama'];
            ModelItem.getKendoSource("Agama", arrFieldSelectVoAgama, true).then(function (data) {
                $scope.listDataAgama = data;
            })

            //list data pendidikan
            var arrFieldSelectVoPendidikan = ['id', 'namaPendidikan'];
            ModelItem.getKendoSource("Pendidikan", arrFieldSelectVoPendidikan, false).then(function (data) {
                $scope.listDataPendidikan = data;
            })

            //list data status perkawinan
            var arrFieldSelectVoStatusPerkawinan = ['id', 'statusPerkawinan'];
            ModelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoStatusPerkawinan, false).then(function (data) {
                $scope.listDataStatusPerkawinan = data;
            })

            //list data kecamatan

            $scope.showHIdeAlamatDetail = function () {
                if ($scope.alamatDetailIsShow) {
                    $scope.alamatDetailIsShow = false;
                } else {
                    $scope.alamatDetailIsShow = true;
                }
            }
            //kirim data
            var tempId = 0;
            $scope.cetak = function () {

                var url = configuration.urlPrinting + "registrasi-pelayanan/kartuPasien?id=" + tempId + "&X-AUTH-TOKEN=" + ModelItem.getAuthorize();
                window.open(url);
            }

            $scope.Save = function () {
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

                // var nik=""
                if (item.pasien.noIdentitas == undefined)
                    item.pasien.noIdentitas = ""

                if (item.pasien.noBpjs == undefined)
                    item.pasien.noBpjs = ""

                if (item.pasien.noAsuransiLain == undefined)
                    item.pasien.noAsuransiLain = ""

                if (item.noTelepon == undefined)
                    item.noTelepon = ""

                if (item.noAditional == undefined)
                    item.noAditional = ""

                if (item.namaAyah == undefined)
                    item.namaAyah = ""

                if (item.namaIbu == undefined)
                    item.namaIbu = ""

                if (item.pasien.namaKeluarga == undefined)
                    item.pasien.namaKeluarga = ""

                if (item.pasien.namaSuamiIstri == undefined)
                    item.pasien.namaSuamiIstri = ""

                item.noTelepon = item.noTelepon;
                item.pasien.noHp = item.noAditional;
                item.alamats = [];
                if (item.alamatLengkap !== undefined)
                    item.alamats.push({
                        "alamatLengkap": item.alamatLengkap,
                        "kelurahan": item.desaKelurahan,
                        "kecamatan": item.kecamatan,
                        "kodePos": $scope.item.kodePos,
                    });
                manageServicePhp.savePasien(item)
                    // RegistrasiPasienBaru.SendData(item, "registrasi-pasien/save-registrasi-pasien")
                    .then(
                        function (res) {
                            tempId = res.data.data.id;

                            $scope.isNext = true;
                            $scope.noCm = res.data.data.nocm;
                            $scope.noRec = res.data.data.id;

                        },
                        function (err) { })

            }


            $scope.Next = function () {
                var param = $scope.noCm;
                var cacheSet = undefined;
                var cacheSetss = undefined;
                var cache = {
                    0: 'Online',
                    1: '',
                    2: '',
                    3: '',
                    4: '',
                    5: '',
                    6: ''
                };
                cacheHelper.set('CacheRegisOnline', cacheSetss);
                cacheHelper.set('CacheRegisOnlineBaru', cache);
                cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                // $state.go('registrasiPelayanan', {
                $state.go('RegistrasiPelayananRev', {
                    noCm: param
                });

            }

        }
    ]);
});