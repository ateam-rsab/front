define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PindahPasienCtrl', ['$q', '$rootScope', '$scope', '$mdDialog', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasien', 'ManagePasien', 'ManageServicePhp',
        function($q, $rootScope, $scope,  $mdDialog, ModelItem, $state, cacheHelper, dateHelper, FindPasien, ManagePasien, manageServicePhp) {
            $scope.item = {};
            $scope.isNext=true;
            var responData='';
            var norecOrder='';
            var norecRpp=''
            $scope.cacheruanganLast={};
            $scope.now = new Date();
            $scope.currentNorecPD = $state.params.norecPD;
            $scope.currentNorecAPD = $state.params.norecAPD;
            $scope.currentNorecSO = $state.params.norecSO;
            // $scope.item.pasien.norec_apd = $state.params.norecAPD;
            $scope.doneLoad = $rootScope.doneLoad;
            $rootScope.isOpen = true;
            $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm", //set date format
                timeFormat: "HH:mm",    //set drop down time format to 24 hours
            };
            $scope.item.tglKeluar=$scope.now;
            $scope.item.tglRencanaKeluar=$scope.now;
            $scope.item.tglMeninggal=$scope.now;
            $scope.listKamar = []
            $scope.listNoBed = []
            getdataCombo();
            firstLoad();            
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            
            function getdataCombo(){
               
                manageServicePhp.getDataTableTransaksi("pindahpasien/get-combo-pindahpasien")         
                .then(function (e) {
                   $scope.listStatusKeluar=e.data.statuskeluar; 
                   $scope.listKondisiPasien=e.data.kondisipasien; 
                   $scope.listStatusPulang=e.data.statuspulang; 
                   $scope.listRuangan=e.data.ruanganinap; 
                   $scope.listHubunganKel=e.data.hubungankeluarga; 
                   $scope.listPenyebabKematian=e.data.penyebabkematian; 

                })
            }
            function firstLoad(){
                $scope.isRouteLoading = true;               
                manageServicePhp.getDataTableTransaksi("pindahpasien/get-pasien-bynorec/"+$state.params.norecPD+"/"+ $state.params.norecAPD )         
                .then(function (e) {
                    $scope.isRouteLoading = false;
                    $scope.item.pasien=e.data[0]; 
                });

                manageServicePhp.getDataTableTransaksi("registrasi/get-data-pasien-pindah?norec_pd="+$state.params.norecPD+"&norec_so="+ $state.params.norecSO)         
                .then(function (dat) {
                       getdataCombo()
                       var dataAwal = dat.data.dataawal[0];
                       $scope.item.ruanganAwal = dataAwal.namaruangan;
                       $scope.item.KamarAwal = dataAwal.namakamar;
                       $scope.item.kelasAwal = dataAwal.namakelas;
                       $scope.item.noBedAwal = dataAwal.nomorbed;
                       
                       var datarencana = dat.data.datarencana[0];
                       $scope.item.statusKeluar = {id:datarencana.objectstatuskeluarrencanafk,statuskeluar:datarencana.statuskeluar}
                       if (datarencana.israwatgabung == 1) {
                           $scope.item.rawatGabung = true;
                       }else if (datarencana.israwatgabung == 0) {}{
                           $scope.item.rawatGabung = false;
                       }
                       $scope.item.tglRencanaKeluar = moment(datarencana.tglrencana).format('YYYY-MM-DD HH:mm:ss'),
                       $scope.item.ruangan = {id:datarencana.objectruangantujuanfk,namaruangan:datarencana.namaruangan}
                       $scope.item.kelas = {id:datarencana.objectkelaskamarrencanafk,namakelas:datarencana.namakelas}
                       $scope.item.kamar = {namakamar:datarencana.namakamar,id:datarencana.objectkamarrencanafk}
                       $scope.item.nomorTempatTidur = {reportdisplay:datarencana.nomorbed,id:datarencana.nobedrencana}
                       $scope.item.keteranganLainnya = datarencana.keteranganorder
                });

            }
          
            $scope.pilihRuangan = function(id) {
                var ruanganId = id;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-kelasbyruangan?idRuangan="+ruanganId)         
                .then(function (dat) {
                    $scope.listKelas = dat.data.kelas;
                });
            }

            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = "idKelas=" + $scope.item.kelas.id;
                var ruanganId ="&idRuangan=" + $scope.item.ruangan.id;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-kamarbyruangankelas?"+kelasId+ruanganId)         
                .then(function (b) {
                    $scope.listKamar = _.filter(b.data.kamar, function(v) {
                        return v.qtybed > v.jumlakamarisi;
                    })
                });
            });
            $scope.$watch('item.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-nobedbykamar?idKamar="+kamarId)         
                .then(function (a) {
                    $scope.listNoBed = _.filter(a.data.bed, function(v) {
                        return v.statusbed === "KOSONG";
                    })
                })
            });

            $scope.Save=function(){
                    if(!$scope.item.statusKeluar){
                        messageContainer.error('Status keluar belum di pilih');
                        return;
                    } else if($scope.item.statusKeluar.id===2) {
                        $scope.SavePindah()
                    } 
            }
            $scope.SavePindah=function(){
                var statusKeluarId = "";
                if ( $scope.item.statusKeluar != undefined) {
                   statusKeluarId = $scope.item.statusKeluar.id;
                } 
                
                var ruanganId = "";
                if ( $scope.item.ruangan != undefined) {
                    ruanganId = $scope.item.ruangan.id;
                }
                var kelasId = "";
                if ( $scope.item.kelas != undefined) {
                   kelasId = $scope.item.kelas.id;
                } 
                var kamarIds= null;
                if ( $scope.item.kamar !=  undefined) {
                    kamarIds =  $scope.item.kamar.id;
                }

                var nomorTempatTidurs= null;
                if ( $scope.item.nomorTempatTidur!=  undefined) {
                    nomorTempatTidurs =  $scope.item.nomorTempatTidur.id;    
                }

                var dokterId= "";
                if ( $scope.item.dokter !=  undefined) {
                    dokterId =  $scope.item.dokter.id;
                }

                var keterangans="";
                if ($scope.item.keteranganLainnya!=undefined){
                    keterangans=$scope.item.keteranganLainnya;
                }
                var hubungankeluargaId= "";
                if ( $scope.item.hubunganKeluarga!= undefined) {
                    hubungankeluargaId =  $scope.item.hubunganKeluarga.id;
                }
                var kondisiKeluarId= "";
                if ( $scope.item.kondisipasien !=  undefined) {
                    kondisiKeluarId =  $scope.item.kondisipasien.id;
                }
                var penyebabkematianId= "";
                if ( $scope.item.penyebabKematian!=  undefined) {
                    penyebabkematianId =  $scope.item.penyebabKematian.id;
                }

                var statusPulangId= "";
                if ( $scope.item.statusPulang!=  undefined) {
                    statusPulangId =  $scope.item.statusPulang.id;
                }

                var strukorder = {
                    norecorder : $state.params.norecSO,
                    norecrpp : norecRpp,
                    tglorder : moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
                }
                                    
                var pasiendaftar = {
                    tglregistrasi: moment($scope.item.pasien.tglregistrasi).format('YYYY-MM-DD HH:mm:ss'),
                    tglregistrasidate: moment($scope.item.pasien.tglregistrasi).format('YYYY-MM-DD'),
                    noregistrasi:  $scope.item.pasien.noregistrasi, 
                    objectruanganasalfk:  $scope.item.pasien.objectruanganlastfk,
                    objectruanganlastfk:  ruanganId,
                    objectkelasfk: kelasId,
                    objecthubungankeluargaambilpasienfk: hubungankeluargaId,
                    objectkondisipasienfk: kondisiKeluarId,
                    objectpenyebabkematianfk: penyebabkematianId,
                    objectstatuskeluarfk: statusKeluarId,
                    objectstatuspulangfk:statusPulangId,
                    norec_pd:$scope.currentNorecPD,
                    objectkelompokpasienlastfk:$scope.item.pasien.objectkelompokpasienlastfk,
                    nocmfk:$scope.item.pasien.nocmfk,
                    objectstatuskeluarrencanafk:statusKeluarId,
                    statuspasien:$scope.item.pasien.statuspasien,
                  

                }
                var antrianpasiendiperiksa = {
                    tglregistrasi: moment($scope.item.pasien.tglregistrasi).format('YYYY-MM-DD HH:mm:ss'),
                    objectruanganasalfk:  $scope.item.pasien.objectruanganlastfk,
                    objectruanganlastfk:  ruanganId,
                    objectkelasfk: kelasId,
                    objectkamarfk: kamarIds,
                    nobed: nomorTempatTidurs,
                    tglmasuk:moment($scope.item.tglRencanaKeluar).format('YYYY-MM-DD HH:mm:ss'),
                    // israwatgabung:  $scope.model.rawatGabung === true ? 1 : 0,
                    objectasalrujukanfk:$scope.item.pasien.objectasalrujukanfk,
                    norec_apd:$scope.item.pasien.norec_apd,
                    keteranganpindah:keterangans,
                    israwatgabung:  $scope.item.rawatGabung === true ? 1 : 0,
                }

                var objSave = {
                    strukorder:strukorder,
                    pasiendaftar: pasiendaftar,
                    antrianpasiendiperiksa: antrianpasiendiperiksa
                }

                // manageServicePhp.saveOrderPindahPasien(objSave).then(function (e) {
                //     $scope.resultAPD=e.data.dataAPD;
                //     responData=e.data;
                //     $scope.isSimpan = true;
                //     $scope.isBatal = true;
                //     $scope.isNext=false;                                             
                // })
              
                manageServicePhp.savePindahPasien(objSave).then(function (e) {
                    $scope.resultAPD=e.data.dataAPD;
                    responData=e.data;
                    $scope.isSimpan = true;
                    $scope.isBatal = true;
                    $scope.isNext=false;                                             
                })
                 //##save Logging user
                manageServicePhp.getDataTableTransaksi("logging/save-log-pindah-ruangan?norec_apd="
                    + $scope.resultAPD.norec
                     ).then(function(data) {
                }) 
                //##end 
              }
                  
              $scope.cekRawatGabung = function (bool) {
                if (bool === true) {
                    if( $scope.item.pasien.id_ibu != undefined){
                        manageServicePhp.getDataTableTransaksi("pindahpasien/get-kamar-ruangan-ibu?id_ibu="+ $scope.item.pasien.id_ibu
                        +"&nocm=" +$scope.item.pasien.nocm)
                        .then(function (dat) {
                            if( dat.data.length > 0){
                                $scope.listKamar = []
                                $scope.listNoBed = []
                                $scope.ruanganIbu = dat.data[0];
                                $scope.listKamar.push({ id:dat.data[0].objectkamarfk,namakamar:dat.data[0].namakamar})
                                $scope.listNoBed.push({ id:dat.data[0].nobed,reportdisplay:dat.data[0].tempattidur})
                                $scope.item.ruangan = { id:dat.data[0].objectruanganlastfk,namaruangan:dat.data[0].namaruangan}
                                $scope.item.kelas = { id:dat.data[0].kelasfk,namakelas:dat.data[0].namakelas}
                                $scope.item.kamar = { id:dat.data[0].objectkamarfk,namakamar:dat.data[0].namakamar}
                                $scope.item.nomorTempatTidur = { id:dat.data[0].nobed,reportdisplay:dat.data[0].tempattidur}
                            
                            }

                         })
                    
                    }
                }
            }        
            //End
        }
        ]);
});