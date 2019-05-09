define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiBayiCtrl', ['$q', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'DateHelper', 'CacheHelper', 'FindPasien', 'ManageServicePhp', 'ModelItemAkuntansi',
        function ($q, $scope, ModelItem, $state, RegistrasiPasienBaru, DateHelper, cacheHelper, findPasien, manageServicePhp, modelItemAkuntansi) {
            // $scope.title = "ini page registrasi pasien baru ctrl";

            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.namaSuamiIstri = "-";

            $scope.cariPasien = function () {
                var cacheBayi = cacheHelper.get('CacheRegisBayi');
                if (cacheBayi != undefined) {
                    var noCm = cacheBayi
                    // findPasien.getByNoCM(noCm).then(function(e) {
                    //     $scope.item.pasien = ModelItem.beforePost(e.data.data);
                    //     $scope.item.pasien.namaIbu = $scope.item.pasien.namaPasien;
                    //     $scope.item.pasien.namaPasien = $scope.item.pasien.namaPasien+" By Ny";
                    //     $scope.item.tglLahir = new Date();
                    //     $scope.item.jamLahir = new Date();
                    //     $scope.item.tempatLahir = $scope.item.pasien.tempatLahir;
                    //     $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                    //     $scope.item.agama = $scope.item.pasien.agama;
                    //     // $scope.item.kebangsaan = e.data.data.kebangsaan;
                    //     $scope.item.kebangsaan={id:$scope.listKebangsaan._data[1].id,name:$scope.listKebangsaan._data[1].name}
                    //     // $scope.item.agama={id:e.data.data[0].objectagamafk,agama:e.data.data[0].agama}
                    //     $scope.item.negara = e.data.data.negara;
                    //     $scope.item.kodePos= e.data.data.alamat.kodePos;
                    //     $scope.idIbu = e.data.data.id;

                    //     $scope.item.kecamatan= e.data.data.alamat.kecamatan;
                    //     $scope.item.kotaKabupaten= e.data.data.alamat.kotaKabupaten;
                    //     $scope.item.propinsi= e.data.data.alamat.propinsi;

                    //     $scope.item.desaKelurahan= e.data.data.alamat.desaKelurahan;
                    //     $scope.item.pasien.namaAyah=e.data.data.namaSuamiIstri;
                    //     $scope.item.pasien.namaKeluarga=e.data.data.namaSuamiIstri;

                    //     $scope.item.noTelepon = e.data.data.noTelepon;
                    //     $scope.item.noHp = e.data.data.noAditional;
                    //     // $scope.cekNoCm();
                    //     if($scope.item.kodePos!=undefined){
                    //         $scope.findKodePos();

                    //     }


                    // })
                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-bynocm?noCm=" + noCm).then(function (e) {
                        $scope.item.pasien = ModelItem.beforePost(e.data.data);
                        $scope.item.pasien.noCm = $scope.item.pasien.nocm;
                        $scope.item.pasien.namaIbu = $scope.item.pasien.namapasien
                        $scope.item.pasien.namaPasien = $scope.item.pasien.namapasien + " By Ny";
                        $scope.item.pasien.alamat = {}
                        $scope.item.pasien.alamat.alamatLengkap = $scope.item.pasien.alamatlengkap
                        $scope.item.tglLahir = new Date();
                        $scope.item.jamLahir = new Date();
                        $scope.item.tempatLahir = $scope.item.pasien.tempatlahir;
                        $scope.item.jenisKelamin = { id: $scope.item.pasien.objectjeniskelaminfk, jenisKelamin: $scope.item.pasien.jeniskelamin }
                        $scope.item.agama = { id: $scope.item.pasien.objectagamafk, agama: $scope.item.pasien.agama }
                        // $scope.item.kebangsaan = e.data.data.kebangsaan;
                        $scope.item.kebangsaan = { id: $scope.listKebangsaan._data[1].id, name: $scope.listKebangsaan._data[1].name }
                        // $scope.item.agama={id:e.data.data[0].objectagamafk,agama:e.data.data[0].agama}
                        // $scope.item.negara = e.data.data.negara;
                        $scope.item.kodePos = $scope.item.pasien.kodepos;
                        $scope.idIbu = $scope.item.pasien.nocmfk;
                        $scope.item.pasien.namaAyah = $scope.item.pasien.namasuamiistri;
                        $scope.item.pasien.namaKeluarga = $scope.item.pasien.namasuamiistri;
                        $scope.item.noTelepon = $scope.item.pasien.notelepon;
                        $scope.item.noHp = $scope.item.pasien.nohp;
                        if ($scope.item.pasien.objectdesakelurahanfk) {
                            $scope.listDataKelurahan.add({
                                id: $scope.item.pasien.objectdesakelurahanfk,
                                value: $scope.item.pasien.objectdesakelurahanfk,
                                namaDesaKelurahan: $scope.item.pasien.namadesakelurahan
                            })

                            $scope.item.desaKelurahan ={
                                id: $scope.item.pasien.objectdesakelurahanfk,
                                value: $scope.item.pasien.objectdesakelurahanfk,
                                namaDesaKelurahan: $scope.item.pasien.namadesakelurahan
                            }
                        }

                        if ($scope.item.pasien.objectkecamatanfk)
                            $scope.item.kecamatan = { id: $scope.item.pasien.objectkecamatanfk, namaExternal: $scope.item.pasien.namakecamatan,namaKecamatan: $scope.item.pasien.namakecamatan  }
                        if ($scope.item.pasien.objectkotakabupatenfk)
                            $scope.item.kotaKabupaten = { id: $scope.item.pasien.objectkotakabupatenfk, namaExternal: $scope.item.pasien.namakotakabupaten ,namaKotaKabupaten:$scope.item.pasien.namakotakabupaten}
                        if ($scope.item.pasien.objectpropinsifk)
                            $scope.item.propinsi = { id: $scope.item.pasien.objectpropinsifk, namaExternal: $scope.item.pasien.namapropinsi }

                        // $scope.cekNoCm();
                        if ($scope.item.kodePos != undefined && $scope.item.kodePos != null) {
                            $scope.findKodePos();
                        } else {

                        }

                    })
                }
            }
            $scope.cariPasien();

            /*
            * No CM Muncul duluan
            */

            // $scope.cekNoCm=function(){
            //      manageServicePhp.getDataTableTransaksi("registrasipasienbayi/cek-table-generate-nocm")         
            //       .then(function (dat) {

            //         if (dat.data.data.length>0){
            //              $scope.dataNoCM=dat.data.data[0]
            //              /* function get range nocm belum dipake, jika lebih dari 2 jam get nocm yg status == 0 */
            //             if(parseInt($scope.dataNoCM.hour_range) > 2){ 
            //                  $scope.item.resultNoCm =  $scope.dataNoCM.nocmgenerate 
            //             }else{
            //              /* function generate lagi*/
            //                 $scope.saveGenerateNoCm();
            //             }
            //         }else
            //           $scope.saveGenerateNoCm();

            //       })

            // }

            // $scope.saveGenerateNoCm=function(){

            //     var objSave={
            //         tglsekarang:moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
            //         tglsekarangdate:moment($scope.now).format('YYYY-MM-DD'),

            //     }
            //     manageServicePhp.saveGenerateNoCM(objSave).then(function(result){
            //           $scope.item.resultNoCm = result.data.data
            //     })

            // }

            /*
           * End No CM Muncul duluan
           */

            $scope.$watch('item.kebangsaan', function (e) {
                if (!e) return;
                if (e.name === 'WNI')
                    $scope.item.negara = { id: 0 };
                if (e.name === 'WNA')
                    $scope.item.negara = $scope.item.kebangsaan;
            });


            //waktu saat ini
            $scope.now = new Date();
            // $scope.item.namaSuamiIstri = "fsdfhjsdf";
            var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
            $scope.listDataKelurahan = ModelItem
                .kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

            // $q.all([
            // 	modelItemAkuntansi.getDataGeneric("desaKelurahan",false),
            // 	modelItemAkuntansi.getDataGeneric("caraBayar", false),
            // 	])
            // .then(function(data) {
            // 	if (data[0].statResponse){
            // 	}
            // });

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
            $scope.$watch('item.kecamatan', function (e) {
                if (e === undefined) return;
                if (e.kotaKabupatenId == undefined) return
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
                if (e.propinsiId == undefined) return
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

            $scope.$watch('item.desaKelurahan', function (e) {
                if (e === undefined) return;
                if (e.kecamatanId == undefined) return
                $scope.item.kodePos = e.kodePos;
                // if (e.id != undefined){
                //     manageServicePhp.getDataTableTransaksi('bayi/get-kecamatanbydesa/'+e.id).then(function(res){
                //         if (res.statResponse ){
                //         $scope.item.kecamatan = res[0]
                //         } 
                //     })
                // }

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





            $scope.findKodePos = function () {
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
                        if (this._data.length !== 0) {
                            $scope.item.desaKelurahan = this._data[0];

                        }

                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })

            }
            // $scope.getAlamat();
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

            // list data status perkawinan
            // var arrFieldSelectVoStatusPerkawinan = ['id', 'statusPerkawinan'];
            // ModelItem.getKendoSource("StatusPerkawinan", arrFieldSelectVoStatusPerkawinan, false).then(function(data) {
            //     $scope.listDataStatusPerkawinan = data;
            // })

            //list data kecamatan


            // $scope.showHIdeAlamatDetail = function () {
            //     if ($scope.alamatDetailIsShow) {
            //         $scope.alamatDetailIsShow = false;
            //     } else {
            //         $scope.alamatDetailIsShow = true;
            //     }
            // }
            // //kirim data
            var tempId = 0;
            $scope.cetak = function () {
                //##save identifikasi kartu pasien
                // manageTataRekening.getDataTableTransaksi("operator/identifikasi-kartu-pasien?norec_pd="
                //     + $scope.dataPasienSelected.norec
                //      ).then(function(data) {
                //         var datas=data.data;
                // })
                //##end 

                var url = configuration.urlPrinting + "registrasi-pelayanan/kartuPasien?id=" + tempId + "&X-AUTH-TOKEN=" + ModelItem.getAuthorize();
                window.open(url);
            }


            $scope.Save = function () {

                var tglLahir = moment($scope.item.tglLahir).format('YYYY-MM-DD'),
                    jamLahir = moment($scope.item.jamLahir).format('HH:mm:ss');

                if ($scope.item.pasien.alamat.alamatLengkap == undefined) {
                    toastr.error('Alamat Lengkap harus di isi')
                    return
                }
                if ($scope.item.pasien.tempatLahir == undefined) {
                    toastr.error('Tempat Lahir harus di isi')
                    return
                }

                var idAgama = "";
                if ($scope.item.agama != undefined)
                    idAgama = $scope.item.agama.id
                var noBpjs = "";
                if ($scope.item.pasien.noBpjs != undefined)
                    noBpjs = $scope.item.pasien.noBpjs

                var noAsuransiLain = "";
                if ($scope.item.pasien.noAsuransiLain != undefined)
                    noAsuransiLain = $scope.item.pasien.noAsuransiLain

                var namaSuamiIstri = "";
                if ($scope.item.pasien.namaSuamiIstri != undefined)
                    namaSuamiIstri = $scope.item.pasien.namaSuamiIstri

                var noHp = "";
                if ($scope.item.noHp != undefined)
                    noHp = $scope.item.noHp

                var noTelepon = "";
                if ($scope.item.pasien.noTelepon != undefined)
                    noTelepon = $scope.item.pasien.noTelepon

                var noIdentitas = "";
                if ($scope.item.pasien.noIdentitas != undefined)
                    noIdentitas = $scope.item.pasien.noIdentitas
                var namaAyah = "";
                if ($scope.item.pasien.namaAyah != undefined)
                    namaAyah = $scope.item.pasien.namaAyah

                var namaKeluarga = ""
                if ($scope.item.pasien.namaKeluarga != undefined)
                    namaKeluarga = $scope.item.pasien.namaKeluarga

                var tempatlahir = ""
                if ($scope.item.pasien.tempatLahir != undefined)
                    tempatlahir = $scope.item.pasien.tempatLahir

                var idAlamat = ""
                if ($scope.item.resultIdAlamat != undefined)
                    idAlamat = $scope.item.resultIdAlamat

                var idPasien = ""
                if ($scope.item.resultIdPasien != undefined)
                    idPasien = $scope.item.resultIdPasien

                var idNegara = ""
                if ($scope.item.negara != undefined)
                    idNegara = $scope.item.negara.id

                var kodePos = ""
                if ($scope.item.kodePos != undefined)
                    kodePos = $scope.item.kodePos

                var desaKelurahanId = null
                var namaDesaKelurahan = null
                if ($scope.item.desaKelurahan != undefined) {
                    desaKelurahanId = $scope.item.desaKelurahan.id
                    namaDesaKelurahan = $scope.item.desaKelurahan.namaDesaKelurahan
                }

                var kecamatanId = null
                var namaKecamatan = null
                if ($scope.item.kecamatan != undefined) {
                    kecamatanId = $scope.item.kecamatan.id
                    namaKecamatan = $scope.item.kecamatan.namaKecamatan
                }

                var kotaKabupatenId = null
                var namaKotaKab = null
                if ($scope.item.kotaKabupaten != undefined) {
                    kotaKabupatenId = $scope.item.kotaKabupaten.id
                    namaKotaKab = $scope.item.kotaKabupaten.namaKotaKabupaten
                }

                var propinsiId = null
                if ($scope.item.propinsi != undefined)
                    propinsiId = $scope.item.propinsi.id


                var pasien = {
                    // "nocm":$scope.item.resultNoCm,
                    "objectagamafk": idAgama,
                    "objectjeniskelaminfk": $scope.item.jenisKelamin.id,
                    "namapasien": $scope.item.pasien.namaPasien,
                    "objectpekerjaanfk": 0,
                    "objectpendidikanfk": 0,
                    "objectstatusperkawinanfk": 0,
                    "namaibu": $scope.item.pasien.namaIbu,
                    "notelepon": noTelepon,
                    "noidentitas": noIdentitas,
                    "objectkebangsaanfk": $scope.item.kebangsaan.id,
                    "objectnegarafk": idNegara,
                    "namaayah": namaAyah,
                    "nobpjs": noBpjs,
                    "noasuransilain": noAsuransiLain,
                    "namasuamiistri": namaSuamiIstri,
                    "tempatlahir": $scope.item.pasien.tempatLahir,
                    // "noAditional": $scope.item.pasien.noHp,
                    "nohp": noHp,
                    "tgllahir": tglLahir + ' ' + jamLahir,
                    "jamlahir": tglLahir + ' ' + jamLahir,
                    "namakeluarga": namaKeluarga,
                    "tgldaftar": new Date().getTime(),
                    "pasienIbu": {
                        "id": $scope.idIbu
                    },
                    "objecttitlefk": 0
                }
                var alamat = {
                    "alamatlengkap": $scope.item.pasien.alamat.alamatLengkap,
                    "objectdesakelurahanfk": desaKelurahanId,
                    "objectkecamatanfk": kecamatanId,
                    "kodepos": kodePos,
                    "objectkotakabupatenfk": kotaKabupatenId,
                    "namadesakelurahan": namaDesaKelurahan,
                    "namakecamatan": namaKecamatan,
                    "namakotakabupaten": namaKotaKab,
                    "objectnegarafk": idNegara,
                    "objectpropinsifk": propinsiId,
                }
                var jsonSave = {
                    pasien: pasien,
                    alamat: alamat
                }
                manageServicePhp.savePasienBayis(jsonSave).then(function (res) {
                    tempId = res.data.dataPasien.id;
                    $scope.isReport = true;
                    $scope.isNext = true;
                    $scope.item.resultNoCm = res.data.dataPasien.nocm;
                    $scope.noCm = res.data.dataPasien.nocm;
                    $scope.item.resultIdAlamat = res.data.dataAlamat.id;
                    var cacheBayi = undefined;
                    cacheHelper.set('CacheRegisBayi', cacheBayi);
                    // $scope.item = {};
                },
                    function (err) { })

                /*var dataVO = $scope.dataPasienBaru;
                dataVO.noCM.namaPasien = "Dicky Jaya Umbara";
                ModelItem.post("save-pasien-daftar", dataVO)
                .then(function(res){
                    alert("sukses kiri data");
                })*/
            }
            $scope.goVerifikasiBayi = function () {
                $state.go('VerifikasiBayiRev');
            }

            $scope.Next = function () {
                var param = $scope.noCm;
                $state.go("RegistrasiPelayananRev", {
                    noCm: param
                })
                var cacheBayi = undefined;
                cacheHelper.set('CacheRegisBayi', cacheBayi);
                var cacheSet = undefined;
                cacheHelper.set('CacheRegistrasiPasien', cacheSet);
                $scope.item = {};
            }

        }
    ]);
});