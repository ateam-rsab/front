define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('registrasiPasienEditCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien','DateHelper', 'ManagePasien',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper, managePasien) {
            $scope.asalmodul = $state.params.asalModul === "daftarpasienruangan";
            $scope.item = {};
            $scope.timeFormat = {
                format: "dd-MM-yyyy HH:mm",
                timeFormat:"HH:mm" 
            };
            findPasien.getPasienEdit($state.params.noCm).then(function(e) {
                $scope.item = e.data.data;
                // $scope.item.agama = e.data.data.agama;
                $scope.item.namaPasien = e.data.data.nama;
                // $scope.item.tempatLahir = e.data.data.tempatLahir;
                // $scope.item.tglLahir = dateHelper.formatDate(e.data.data.tglLahir, "DD-MM-YYYY HH:mm:ss");
                // $scope.item.tglLahirs = dateHelper.formatDate(e.data.data.tglLahir, "DD-MM-YYYY HH:mm:ss");
                $scope.item.tglLahir = new Date(e.data.data.tglLahir);
                $scope.item.tglLahirs = new Date(e.data.data.tglLahir);
                // $scope.item.jenisKelamin = e.data.data.jenisKelamin;
                // $scope.item.statusPerkawinan = e.data.data.statusPerkawinan;
                // $scope.item.pendidikan = e.data.data.pendidikan;
                // $scope.item.pekerjaan = e.data.data.pekerjaan;
                // $scope.item.kebangsaan = e.data.data.kebangsaan;
                // $scope.item.negara = e.data.data.negara;
                // $scope.item.paspor = e.data.data.paspor;
                // $scope.item.noBpjs = e.data.data.noBpjs;
                // $scope.item.noAsuransiLain = e.data.data.noAsuransiLain;
                // $scope.item.namaAyah = e.data.data.namaAyah;
                // $scope.item.namaIbu = e.data.data.namaIbu;
                // $scope.item.namaSuamiIstri = e.data.data.namaSuamiIstri;
                $scope.item.alamatLengkap = e.data.data.alamat;
                // $scope.item.desaKelurahan = e.data.data.alamatLengkap.desaKelurahan;
                // $scope.item.noTelepon = e.data.data.noTelepon;
                // $scope.item.noHp = e.data.data.noHp;
                $scope.item.noIdentitas = e.data.data.nik;
                // $scope.item.tglDaftar = e.data.data.tglDaftar;
                $scope.item.id = e.data.data.id;
                $scope.item.kodePos = e.data.data.kodepos;
                $scope.item.noCm = $state.params.noCm;

            })
            
            $scope.title = "ini page registrasi pasien baru ctrl";

            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};

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
            if(!$scope.item.kodePos){
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
            }


            $scope.$watch('item.kebangsaan', function(e) {
                if (e === undefined) return;
                if (e.name === 'WNI')
                    $scope.item.negara = { id: 0 };
                if (e.name === 'WNA')
                    $scope.item.negara =null;
            });
            $scope.$watch('item.kodePos', function(e) {
                if (e !== undefined && e.length >= 5) 
                    $scope.findKodePos();
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
                        if (this._data.length !== 0 && $scope.item.kotaKabupaten === undefined)
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
                        if (this._data.length !== 0 && $scope.item.propinsi === undefined)
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
            $scope.backDaftar = function() {
                $state.go('daftarAntrianPasienSemua')
            }
            $scope.Save = function() {
                    // $state.go('pencarianPasien')
                var listRawRequired = [
                    "item.kodePos|ng-model|Kodepos"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
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
                        $scope.item.negara = negara;
                        var titlePasien = {
                            "id": 1
                        }
                        $scope.item.titlePasien = Date.parse($scope.item.titlePasien);
                        var item = $scope.item;
                        item.noTelepon = $scope.item.noTelepon;
                        item.alamats = [];
                        if (item.alamat !== undefined)
                            item.alamats.push({
                                "alamatLengkap": item.alamatLengkap,
                                "kelurahan": item.desaKelurahan,
                                "kecamatan": item.kecamatan,
                                "kodePos": item.kodePos
                            });
                        // item.tglLahir = dateHelper.formatDate(item.tglLahir, "YYYY-MM-DD HH:mm:ss");
                        item.tglLahir = kendo.parseDate(item.tglLahir, "yyyy-MM-ddTHH:mm:sszzz");
                        // console.log(JSON.stringify(item));
                        // service update data pasien yang lama
                        // RegistrasiPasienBaru.SendData(item, "registrasi-pasien/update-pasien-data").then(function(res) {
                        //     tempId = res.data.data.id;
                        //     // if ($state.params.noRec !== undefined)
                        //     //     $state.go('registrasiPelayanan', {
                        //     //         noCm: $state.params.noRec + "*" + res.data.data.noCm
                        //     //     })
                        //     $scope.isReport = true;
                        //     $scope.isNext = true;
                        //     $scope.noCm = res.data.data.noCm;
                        //     $scope.noRec = res.data.data.id;
                        // }, function(err) {})
                        item.title = {
                            id: 1
                        }
                        managePasien.updatePasienDaftar(item).then(function(res){
                            // $scope.item.tglLahir = $scope.item.tglLahirs;
                        })
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                /*var dataVO = $scope.dataPasienBaru;
                dataVO.noCM.namaPasien = "Dicky Jaya Umbara";
                ModelItem.post("save-pasien-daftar", dataVO)
                .then(function(res){
                	alert("sukses kiri data");
                })*/
            }

            $scope.Next = function() {
                var param = $scope.item.noRec + "*" + $scope.noCm;
                
                $state.go('#/PencarianPasien')
            }

        }
    ]);
});