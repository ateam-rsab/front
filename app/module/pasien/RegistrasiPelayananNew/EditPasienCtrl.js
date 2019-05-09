define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('EditPasienCtrl', [ '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien','CacheHelper', 'ManageServicePhp', 'ModelItemAkuntansi',
        function( $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien,cacheHelper, manageServicePhp, modelItemAkuntansi) {
            // $scope.title = "ini page registrasi pasien baru ctrl";

            $scope.dataVOloaded = false;
            //ambil data Pasien VO
            $scope.item = {};          
            $scope.currentNoCm = $state.params.noCm;

            $scope.now = new Date();
       
            arrFieldSelectVoKecamatan = ['id', 'name'];
            ModelItem.getKendoSource("Kebangsaan", arrFieldSelectVoKecamatan, true).then(function(data) {
                $scope.listKebangsaan = data;
            });


            $scope.cariPasien = function(){
             
                if( $scope.currentNoCm != undefined){
                    // var arrBayi=cacheBayi.split('~');
                    var noCm= $scope.currentNoCm
                    // findPasien.getByNoCM(noCm).then(function(e) {
                       
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
                    //     $scope.item.kebangsaan={id:$scope.listKebangsaan._data[1].id,name:$scope.listKebangsaan._data[1].name}
                    //     // $scope.item.agama={id:e.data.data[0].objectagamafk,agama:e.data.data[0].agama}
                    //     // $scope.item.negara = e.data.data.negara;
                    //     $scope.item.kodePos= $scope.item.pasien.alamat.kodePos;
                    //     $scope.item.noIdentitas=$scope.item.pasien.noIdentitas;
                    //     $scope.item.noBpjs=$scope.item.pasien.noBpjs;
                    //     $scope.item.namaSuamiIstri=$scope.item.pasien.namaSuamiIstri;
                    //     $scope.item.namaKeluarga=$scope.item.pasien.namaKeluarga;
                    //     $scope.item.noHp=$scope.item.pasien.noHp;
                    //     // $scope.item.paien.paspor=$scope.item.pasien.noIdentitas;
                    //     // $scope.idIbu = e.data.data.id;
                        
                    //     // $scope.item.kecamatan= e.data.data.alamat.kecamatan;
                    //     // $scope.item.kotaKabupaten= e.data.data.alamat.kotaKabupaten;
                    //     // $scope.item.propinsi= e.data.data.alamat.propinsi;
                    //     // $scope.item.desaKelurahan= e.data.data.alamat.desaKelurahan;

                    //     $scope.item.noTelepon = $scope.item.pasien.noTelepon;
                    //     // $scope.item.noHp = e.data.data.noAditional;
                      
                    //     if($scope.item.kodePos!=undefined){
                    //         $scope.findKodePos();
                       
                    //     }
                    

                    // })
                   manageServicePhp.getDataTableTransaksi("registrasipasien/get-bynocm?noCm="+ noCm).then(function(e){
              
                        $scope.item.pasien = ModelItem.beforePost(e.data.data);
                        $scope.item.pasien.noCm= $scope.item.pasien.nocm;
                        $scope.item.idPasiens= $scope.item.pasien.nocmfk;
                     
                        $scope.item.pasien.namaPasien = $scope.item.pasien.namapasien
                        $scope.item.tglLahir = moment( $scope.item.pasien.tgllahir).format('YYYY-MM-DD');
                        $scope.item.jamLahir = moment( $scope.item.pasien.tgllahir).format('HH:mm:ss');
                        // $scope.item.jamLahir = new Date();
                          $scope.item.pasien.alamat=$scope.item.pasien.alamatlengkap;
                        $scope.item.pasien.tempatLahir= $scope.item.pasien.tempatlahir;
                        // $scope.item.tempatLahir = $scope.item.pasien.tempatlahir;
                        $scope.item.jenisKelamin = {id: $scope.item.pasien.objectjeniskelaminfk,jenisKelamin:$scope.item.pasien.jeniskelamin}
                        $scope.item.agama = {id: $scope.item.pasien.objectagamafk,agama:$scope.item.pasien.agama}
                        $scope.item.statusPerkawinan =  {id: $scope.item.pasien.objectstatusperkawinanfk,statusPerkawinan:$scope.item.pasien.statusperkawinan}
                        $scope.item.pendidikan =   {id: $scope.item.pasien.objectpendidikanfk,pendidikan:$scope.item.pasien.pendidikan}
                        $scope.item.pekerjaan =  {id: $scope.item.pasien.objectpekerjaanfk,pekerjaan:$scope.item.pasien.pekerjaan}
                        if ( $scope.item.pasien.objectkebangsaanfk == null )
                             $scope.item.kebangsaan={id:$scope.listKebangsaan._data[1].id,name:$scope.listKebangsaan._data[1].name}
                        else
                              $scope.item.kebangsaan={id: $scope.item.pasien.objectkebangsaanfk,name:$scope.item.pasien.kebangsaan}
              
                        $scope.item.kodePos= $scope.item.pasien.kodepos;
                        $scope.item.namaIbu =  $scope.item.pasien.namaibu;
                        $scope.item.namaAyah =  $scope.item.pasien.namaayah;
                        $scope.item.noIdentitas=$scope.item.pasien.noidentitas;
                        $scope.item.noAsuransiLain=$scope.item.pasien.noasuransilain;
                        $scope.item.noBpjs=$scope.item.pasien.nobpjs;
                        $scope.item.namaSuamiIstri=$scope.item.pasien.namasuamiistri;
                        $scope.item.namaKeluarga=$scope.item.pasien.namakeluarga;
                        $scope.item.noHp=$scope.item.pasien.nohp;
                        $scope.item.noTelepon = $scope.item.pasien.notelepon;
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
                        if (this._data.length !== 0){
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

            // list data status perkawinan
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
           
              
                var tglLahir = new moment($scope.item.tglLahir).format('YYYY-MM-DD');
                var jamLahir = new moment($scope.item.jamLahir).format('HH:mm:ss');
                if (jamLahir=="Invalid date")
                   jamLahir= $scope.item.jamLahir
                else
                    jamLahir=jamLahir

                if (tglLahir=="Invalid date")
                   tglLahir= $scope.item.tglLahir
                else
                    tglLahir=tglLahir

           
                var idAgama="";
                if ( $scope.item.agama!=undefined)
                    idAgama=$scope.item.agama.id
                var noBpjs="";
                if ($scope.item.noBpjs!=undefined)
                    noBpjs=$scope.item.noBpjs

                var noAsuransiLain="";
                if ($scope.item.noAsuransiLain!=undefined)
                    noAsuransiLain=$scope.item.noAsuransiLain

                var namaSuamiIstri="";
                if ( $scope.item.namaSuamiIstri!=undefined)
                    namaSuamiIstri= $scope.item.namaSuamiIstri

                var noHp="";
                if ( $scope.item.noHp!=undefined)
                    noHp= $scope.item.noHp

                var noTelepon="";
                if ( $scope.item.noTelepon!=undefined)
                    noTelepon= $scope.item.noTelepon

                var noIdentitas="";
                if ($scope.item.noIdentitas!=undefined)
                    noIdentitas=$scope.item.noIdentitas
                var namaAyah="";
                if( $scope.item.namaAyah!=undefined)
                    namaAyah= $scope.item.namaAyah

                var namaKeluargas=""
                if ($scope.item.namaKeluarga!=undefined)
                    namaKeluargas=$scope.item.namaKeluarga

                var tempatlahir=""
                if ($scope.item.pasien.tempatLahir!=undefined)
                    tempatlahir=$scope.item.pasien.tempatLahir
                
                // var idAlamat=""
                // if ($scope.item.resultIdAlamat!=undefined)
                //     idAlamat=$scope.item.resultIdAlamat

                // var idPasien=""
                // if ($scope.item.resultIdPasien!=undefined)
                //     idPasien=$scope.item.resultIdPasien

                var idNegara=null
                if ($scope.item.negara!=undefined)
                    idNegara=$scope.item.negara.id

                var idPekerjaan=null
                if ($scope.item.pekerjaan!=undefined)
                    idPekerjaan=$scope.item.pekerjaan.id

                var idPendidikan=null
                if ($scope.item.pendidikan!=undefined)
                    idPendidikan=$scope.item.pendidikan.id

                 var idPerkawainan=null
                if ($scope.item.statusPerkawinan!=undefined)
                    idPerkawainan=$scope.item.statusPerkawinan.id

                var namaibu=""
                if($scope.item.namaIbu!=undefined){
                    namaibu=$scope.item.namaIbu
                }
                var idKelurahan=null
                var namaDesaKelurahan=null
                if($scope.item.desaKelurahan!=undefined){
                    idKelurahan=$scope.item.desaKelurahan.id;
                    namaDesaKelurahan= $scope.item.desaKelurahan.namaDesaKelurahan;
                }

                var idKecamatan=null
                var namaKecamatan=null
                if($scope.item.kecamatan!=undefined){
                    idKecamatan=$scope.item.kecamatan.id;
                    namaKecamatan= $scope.item.kecamatan.namaKecamatan;
                }

                var idKabupaten=null
                var namaKotaKabupaten=null
                if($scope.item.kotaKabupaten!=undefined){
                    idKabupaten=$scope.item.kotaKabupaten.id;
                    namaKotaKabupaten=$scope.item.kotaKabupaten.namaKotaKabupaten;
                }

                var idPropinsi=null
                if($scope.item.propinsi!=undefined){
                    idPropinsi=$scope.item.propinsi.id;
                }

                var kodePos=null
                if($scope.item.kodePos!=undefined){
                    kodePos=$scope.item.kodePos
                }

                var pasien= {
                    "id":$scope.item.idPasiens,
                    "nocm":$scope.item.currentNoCm,
                    "objectagamafk":idAgama,
                    "objectjeniskelaminfk": $scope.item.jenisKelamin.id,
                    "namapasien": $scope.item.pasien.namaPasien,
                    "objectpekerjaanfk": idPekerjaan,
                    "objectpendidikanfk": idPendidikan,
                    "objectstatusperkawinanfk":idPerkawainan,
                    "namaibu": namaibu,
                    "notelepon":noTelepon,
                    "noidentitas":noIdentitas,
                    "objectkebangsaanfk":$scope.item.kebangsaan.id,
                    "objectnegarafk":idNegara,
                    "namaayah":namaAyah,
                    "nobpjs": noBpjs,
                    "noasuransilain": noAsuransiLain,
                    "namasuamiistri": namaSuamiIstri,
                    "tempatlahir": $scope.item.pasien.tempatLahir,  
                    // "noAditional": $scope.item.pasien.noHp,
                    "nohp": noHp,
                    "tgllahir": tglLahir + ' ' +jamLahir,
                    "jamlahir": tglLahir + ' ' +jamLahir,                  
                    "namakeluarga":namaKeluargas ,
                    
                    "objecttitlefk": 0
                }
                var alamat={
                    "alamatlengkap":$scope.item.pasien.alamat,
                    "objectdesakelurahanfk": idKelurahan,
                    "objectkecamatanfk": idKecamatan,
                    "kodepos":kodePos,
                    "objectkotakabupatenfk": idKabupaten,
                    "namadesakelurahan":namaDesaKelurahan,
                    "namakecamatan":  namaKecamatan,
                    "namakotakabupaten":  namaKotaKabupaten,   
                    "objectnegarafk":  idNegara,
                    "objectpropinsifk": idPropinsi,
                    }
                var jsonSave = {
                            pasien: pasien,
                            alamat: alamat
                }
                manageServicePhp.updatePasien(jsonSave).then(function(res) {
                    tempId = res.data.dataPasien.id;
                    // $scope.isReport = true;
                    $scope.isNext = true;
                  
                    $scope.noCm= res.data.dataPasien.nocm;
                    $scope.item.resultIdAlamat = res.data.dataAlamat.id;
                    var cacheBayi = undefined;
                        cacheHelper.set('CacheRegisBayi',cacheBayi);  
                    // $scope.item = {};
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
                $state.go('VerifikasiBayiRev');
            }

            $scope.Next = function() {
              var param =  $scope.currentNoCm;
               $state.go("RegistrasiPelayananRev",{
                            noCm:param
                        })
                          var cacheBayi = undefined;
                          cacheHelper.set('CacheRegisBayi',cacheBayi);  
                          var cacheSet = undefined;           
                           cacheHelper.set('CacheRegistrasiPasien', cacheSet);
               $scope.item = {};
            }

        }
    ]);
});