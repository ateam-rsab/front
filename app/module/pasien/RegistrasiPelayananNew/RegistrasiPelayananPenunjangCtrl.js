define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('RegistrasiPelayananPenunjangCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$mdDialog', '$rootScope', '$timeout', '$window','CacheHelper', 'DateHelper', 'CetakHelper', 'ModelItem', 'ManageServicePhp','ModelItemAkuntansi','FindPasien',
        function(managePasien, $scope, modelItem, $state, $mdDialog, $rootScope, $timeout, $window, cacheHelper, dateHelper, cetakHelper, ModelItem, manageServicePhp,modelItemAkuntansi,findPasien) {
            $scope.now = new Date();
            $scope.currentNoCm = $state.params.noCm;
            $scope.currentNorec= $state.params.noRec;
            var responData='';
            var norecPD='';
            var noRegistrasis='';
            var norecAPD='';
            var noCM='';

            $scope.isSimpanAsuransi=true;
            $scope.isNext=true;
            $scope.item = {};
            $scope.item.tglRegistrasi = $scope.now;
            $scope.model = {};
            $scope.model.tglSEP = $scope.now;
            $scope.model.tglRujukan = $scope.now;
            $scope.model.tglPelayanan = $scope.now;

            loadPertama();
            manageServicePhp.getDataTableTransaksi("lab-radiologi/get-data-combo?objectkelasfk="+ 6,true).then(function(dat){
                $scope.listRuangan = dat.data.ruangantujuan;
            
            })


            manageServicePhp.getDataTableTransaksi("registrasipasien/get-data-combo",true)         
                  .then(function (dat) {
                       $scope.listJenisPelayanan=dat.data.jenispelayanan;
                    // $scope.listKelas = dat.data.kelas;
                   
                    $scope.listAsalRujukan = dat.data.asalrujukan;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                    $scope.listDokter = dat.data.dokter;
                    // $scope.listRuangan = dat.data.ruanganrajal;
                 
                    $scope.sourceHubunganPasien= dat.data.hubunganpeserta;
                    $scope.sourceKelompokPasien= dat.data.kelompokpasien;
                    // $scope.sourceRekanan= dat.data.rekanan;
                    $scope.sourceKelasDitanggung=dat.data.kelas;
                    $scope.sourceAsalRujukan=dat.data.asalrujukan;
                    $scope.model.namaPenjamin={id:dat.data.kelompokpasien[1].id,kelompokpasien:dat.data.kelompokpasien[1].kelompokpasien}
                    // $scope.model.institusiAsalPasien={id:dat.data.rekanan[689].id,namarekanan:dat.data.rekanan[689].namarekanan}
                    $scope.model.hubunganPeserta={id:dat.data.hubunganpeserta[2].id,hubunganpeserta:dat.data.hubunganpeserta[2].hubunganpeserta}
                    $scope.model.asalRujukan={id:dat.data.asalrujukan[3].id,asalrujukan:dat.data.asalrujukan[3].asalrujukan}
             });
             function loadPertama(){
                var cacheRegisOnline = cacheHelper.get('CacheRegisOnline');
                if (cacheRegisOnline!=undefined){
                    var arrOnline=cacheRegisOnline[0];
                      $scope.item.tglRegistrasi = arrOnline.tanggalreservasi,
                      $scope.item.ruangan = {id:arrOnline.objectruanganfk,
                                            namaruangan:arrOnline.namaruangan}                                   
                      $scope.item.dokter = {id:arrOnline.objectpegawaifk,namalengkap:arrOnline.dokter}

                }
                norecPD=''
                var cachePasienDaftar = cacheHelper.get('CacheRegistrasiPasien');
                if(cachePasienDaftar != undefined){
                    var arrPasienDaftar = cachePasienDaftar.split('~');
                    norecPD = arrPasienDaftar[0];
                    noRegistrasis= arrPasienDaftar[1];
                    norecAPD= arrPasienDaftar[2];    
                    $scope.cacheNorecPD=norecPD;
                    $scope.cacheNorecAPD=norecAPD;
                    $scope.cacheNoRegistrasi=noRegistrasis;
                    //jika cache ada get riwayat pasien
                     getPasienByNorecPD();

                }
                $scope.isRouteLoading = true;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasienbynocm?noCm="+$scope.currentNoCm)         
                  .then(function (e) {
                     $scope.isRouteLoading = false;
                     $scope.item.pasien=e.data.data[0]; 
                     $scope.item.nocmfk=e.data.data[0].nocmfk;
                 

                  });
                  var tglReg= moment($scope.item.tglRegistrasi).format('YYYY-MM-DD') ;
                 manageServicePhp.getDataTableTransaksi("registrasipasien/cek-pasien-daftar-duakali?nocm="
                        + $scope.currentNoCm
                        + "&tglregistrasi="
                        + tglReg)        
                  .then(function (res) {
                     $scope.CekPasienDaftar=res.data.data; 
                  })


            };
            function getPasienByNorecPD(){
               manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasienbynorec-pd?norecPD="+norecPD+"&norecAPD="+norecAPD)         
                                  .then(function (his) {     

                                      // if ( his.data.data[0].israwatinap=='true')
                                      // {
                                      //   $scope.model.rawatInap=true;
                                      //   $scope.cekRawatInap($scope.model.rawatInap);
                                      //   $scope.pasienBayi=true;
                                      // }
                                       $scope.item.tglRegistrasi = his.data.data[0].tglregistrasi,
                                       $scope.item.ruangan = {id:his.data.data[0].objectruanganlastfk,
                                                             namaruangan:his.data.data[0].namaruangan,
                                                            objectdepartemenfk:his.data.data[0].objectdepartemenfk}
                                       $scope.item.kelas = {id:his.data.data[0].objectkelasfk,namakelas:his.data.data[0].namakelas}  
                                       $scope.listKamar = ([{id:his.data.data[0].objectkamarfk,namakamar:his.data.data[0].namakamar}])  
                                       $scope.item.kamar = {id:his.data.data[0].objectkamarfk,namakamar:his.data.data[0].namakamar}      
                                       $scope.item.nomorTempatTidur = {id:his.data.data[0].objecttempattidurfk,id:his.data.data[0].objecttempattidurfk}      
                                       $scope.item.asalRujukan = {id:his.data.data[0].objectasalrujukanfk,asalrujukan:his.data.data[0].asalrujukan}
                                       $scope.item.kelompokPasien = {id:his.data.data[0].objectkelompokpasienlastfk,kelompokpasien:his.data.data[0].kelompokpasien} 
                                       $scope.item.rekanan = {id:his.data.data[0].objectrekananfk,namarekanan:his.data.data[0].namarekanan}
                                       $scope.listJenisPelayanan =([ {id:parseInt(his.data.data[0].objectjenispelayananfk),jenispelayanan:his.data.data[0].jenispelayanan}])
                                       $scope.item.jenisPasien = {id:parseInt(his.data.data[0].objectjenispelayananfk),jenispelayanan:his.data.data[0].jenispelayanan}      
                                       $scope.item.dokter = {id:his.data.data[0].objectpegawaifk,namalengkap:his.data.data[0].dokter}
                                       
                                       $scope.isPenunjang=true;
                                       $scope.isInputAsuransi=false; 
                                       $scope.isNext = false;
                                       $scope.isBatal=true;
                                       $scope.isReport = false;
                                       $scope.isReportPendaftaran = false;
                                       if ($scope.model.rawatInap==true)
                                       {
                                           $scope.isReportRawatInap=true;
                                       }
                                      // $scope.isInputAsuransi=true;
                                       $scope.isAsuransi = false;
                              });
            }
   


             $scope.$watch('item.kelompokPasien', function(e) {
                if (e === undefined) return;
                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-penjaminbykelompokpasien?kdKelompokPasien="+e.id)   
                      .then(function (z) {
                        $scope.listRekanan=z.data.rekanan;
                        if (e.kelompokpasien=='Umum/Pribadi')
                        {
                             $scope.item.rekanan='';
                             $scope.nonUmum=false;
                              $scope.item.jenisPasien = {id:$scope.listJenisPelayanan[0].id,jenispelayanan:$scope.listJenisPelayanan[0].jenispelayanan} 
                        }
                        else if (e.kelompokpasien=='BPJS'){
                             $scope.item.rekanan={id:$scope.listRekanan[0].id,namarekanan:$scope.listRekanan[0].namarekanan};
                             $scope.nonUmum=true;
                             $scope.item.jenisPasien = {id:$scope.listJenisPelayanan[1].id,jenispelayanan:$scope.listJenisPelayanan[1].jenispelayanan} 
                            
                        }
                        else{
                             $scope.nonUmum=true;
                             $scope.item.jenisPasien = {id:$scope.listJenisPelayanan[0].id,jenispelayanan:$scope.listJenisPelayanan[0].jenispelayanan} 
                             // $scope.item.rekanan='';
                           
                        }
                         
                    }) 
            });
           
            $scope.noCm = $state.params.noCm;
            $scope.cekRawatGabung = function(data){
                // opsi untuk pasien bayi
                // apakah pasien bayi satu ruangan dengan ibunya (true/false) ?
                $scope.model.rawatGabung = data;
            }
            $scope.formatJam24 = {
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            };
            // $scope.jenisPasiens = [{
            //     id: 1, name: "Reguler"
            // }, {
            //     id: 2, name: "Eksekutif"
            // }]
            $scope.pegawai = modelItem.getPegawai();
            
            $scope.listPasien = [];
            $scope.doneLoad = $rootScope.doneLoad;
            $scope.showFind = true;
            $scope.showTindakan = false;
 
         
            $scope.Save = function(){
                if (norecPD==''){
                       if($scope.CekPasienDaftar.length >0 && $scope.CekPasienDaftar[0].objectruanganlastfk== $scope.item.ruangan.id){
                            var confirm = $mdDialog.confirm()
                                    .title('Peringatan')
                                    .textContent('Pasien Sudah Daftar Dipoli yang sama ! Lanjut Simpan? ')
                                    .ariaLabel('Lucky day')
                                    .cancel('Tidak')
                                    .ok('Ya')
                                $mdDialog.show(confirm).then(function () {
                                    $scope.SimpanRegistrasi();
                                })

                    }else
                     $scope.SimpanRegistrasi();
                 }else
                   $scope.SimpanRegistrasi();
               
            }

            $scope.SimpanRegistrasi= function () {
                        if ($scope.model.rawatInap && !$scope.item.kelas) {
                            toastr.warning("Harap pilih Kelas")
                            return
                        }
                        
                        var kelasId = "";
                        if ( $scope.item.kelas == undefined||$scope.item.kelas == "") {
                            kelasId = null;
                        } else
                            kelasId = $scope.item.kelas.id;

                        var rekananId = "";
                        if ( $scope.item.rekanan == undefined|| $scope.item.rekanan == "") {
                            rekananId = null;
                        } else
                            rekananId = $scope.item.rekanan.id;

                        var dokterId= "";
                        if ( $scope.item.dokter == undefined|| $scope.item.dokter=="") {
                            dokterId = null;
                        } else
                            dokterId =  $scope.item.dokter.id;
             
                        var kamarIds= "";
                        if ( $scope.item.kamar == undefined||$scope.item.kamar =="") {
                            kamarIds = null;
                        } else
                            kamarIds =  $scope.item.kamar.id;


                        var nomorTempatTidurs= "";
                        if ( $scope.item.nomorTempatTidur == undefined||$scope.item.nomorTempatTidur=="") {
                            nomorTempatTidurs = null;
                        } else
                            nomorTempatTidurs =  $scope.item.nomorTempatTidur.id;    


                        var noRegistrasi= "";
                        if ( $scope.model.noRegistrasi == undefined||$scope.model.noRegistrasi =="") {
                            noRegistrasi = "";
                        } else
                            noRegistrasi =  $scope.model.noRegistrasi;   


                        var norec_PasienDaftar= "";
                        if ( $scope.model.norec_pd != undefined) {
                            norec_PasienDaftar = $scope.model.norec_pd;
                        } else if($scope.cacheNorecPD!=undefined){
                          norec_PasienDaftar=$scope.cacheNorecPD;
                        }else
                            norec_PasienDaftar ="" ;    


                        var norec_Antrian= "";
                        if($scope.cacheNorecAPD!=undefined){
                            norec_Antrian=$scope.cacheNorecAPD;
                        }else if($scope.resultAPD!=undefined){                           
                            norec_Antrian =$scope.resultAPD.norec ;    
                        }else norec_Antrian="";
               
                      var jenisPel="";
                      if ( $scope.item.jenisPasien!=undefined)
                          jenisPel= $scope.item.jenisPasien.id
                      else
                      {
                          messageContainer.error("Jenis Pelayanan Harus Di isi")
                          return
                      }
                        var isRawatInap=""
                        if( $scope.model.rawatInap==undefined)
                            isRawatInap="false"
                        else if($scope.model.rawatInap)
                            isRawatInap="true"
                        else 
                             isRawatInap="false"
                         var noRegistrasizz=""
                         if ($scope.cacheNoRegistrasi!=undefined){
                            noRegistrasizz=$scope.cacheNoRegistrasi
                         }
                                            
                        var pasiendaftar = {
                            tglregistrasi: moment($scope.item.tglRegistrasi).format('YYYY-MM-DD HH:mm:ss'),
                            tglregistrasidate: moment($scope.item.tglRegistrasi).format('YYYY-MM-DD'),
                            nocmfk:  $scope.item.nocmfk, 
                            objectruanganfk:  $scope.item.ruangan.id,
                            objectdepartemenfk:  $scope.item.ruangan.objectdepartemenfk,
                            objectkelasfk: kelasId,
                            objectkelompokpasienlastfk: $scope.item.kelompokPasien.id,
                            objectrekananfk: rekananId,
                            tipelayanan: jenisPel,
                            objectpegawaifk: dokterId,
                            noregistrasi:noRegistrasizz,
                            norec_pd:norec_PasienDaftar,
                            israwatinap:isRawatInap

                        }
                        var antrianpasiendiperiksa = {
                            norec_apd:norec_Antrian,
                            tglregistrasi: moment($scope.item.tglRegistrasi).format('YYYY-MM-DD HH:mm:ss'),
                            objectruanganfk:  $scope.item.ruangan.id,
                            objectkelasfk: kelasId,
                            objectpegawaifk: dokterId,
                            objectkamarfk: kamarIds,
                            nobed: nomorTempatTidurs,
                            objectdepartemenfk:  $scope.item.ruangan.objectdepartemenfk,
                            objectasalrujukanfk: $scope.item.asalRujukan.id,
                            israwatgabung:  $scope.model.rawatGabung === true ? 1 : 0,
                        }
                        var objSave = {
                            pasiendaftar: pasiendaftar,
                            antrianpasiendiperiksa: antrianpasiendiperiksa
                        }
                        $scope.isSimpan=true;
                      
                        manageServicePhp.saveRegitrasiPasien(objSave).then(function (e) {
                            $scope.isSimpan=false;
                            $scope.resultAPD=e.data.dataAPD;
                            responData=e.data;
                            $scope.resultPD=e.data.dataPD;
                            $scope.model.noRegistrasi=e.data.dataPD.noregistrasi;
                            $scope.model.norec_pd=e.data.dataPD.norec;
                            //##log Pasien Daftar
                            manageServicePhp.getDataTableTransaksi("logging/save-log-pendaftaran-pasien?norec_pd="
                                +$scope.model.norec_pd).then(function(x){
                                })
                            //## end log    
                            
                            var cachePasienDaftar = $scope.model.norec_pd 
                                                   + "~" + $scope.model.noRegistrasi
                                                   + "~" + $scope.resultAPD.norec;
                                                   // + "~" + $scope.currentNoCm;
                                cacheHelper.set('CacheRegistrasiPasien', cachePasienDaftar);

                            if (e.data.status==201){
                                    $scope.isPenunjang=true;
                                    $scope.isNext = false;
                                    $scope.isBatal=true;
                                    $scope.isReport = false;
                                    $scope.isReportPendaftaran = false;
                                    if ($scope.model.rawatInap==true)
                                    {
                                         $scope.isReportRawatInap=false;
                                    }
                                    $scope.isInputAsuransi=false;
                                    $scope.isAsuransi = false;
                                    $scope.model.generateNoSEP = false;
                            }
                                           
                        }, function(error) {
                        // throw error;
                        $scope.isSimpan = false;
                        $scope.isBatal = false;
                })
            }
            // end Save Function
            // $scope.updateNoreg=function(){
            //      manageServicePhp.getDataTableTransaksi("registrasipasien/update-noregistrasi?norec_pd="
            //                     +$scope.model.norec_pd).then(function(x){
            //                         debugger
            //         })
            // }
 

        

              $scope.inputTindakanNew = function(){
              if ($scope.resultPD!=undefined)
              {
                    $state.go('InputTindakanPelayananRev',{
                        norecPD:$scope.resultPD.norec,
                        norecAPD: $scope.resultAPD.norec
                       
                    });
              }
              else
              {
                    $state.go('InputTindakanPelayananRev',{
                        norecPD:$scope.cacheNorecPD,
                        norecAPD: $scope.cacheNorecAPD
                       
                    });
              }
            }
            
            $scope.find = function() {
                $state.go('RegistrasiPasienLamaRev');
            }
            $scope.Next = function() {
                $state.go('RegistrasiPasienBaruRev');
            }
            $scope.transaksiPelayanan = function(){
              var noreg="";
              var norecPD="";
              var norecAPD="";
              if ($scope.resultPD!=undefined){
                    norecPD=$scope.resultPD.norec
                    norecAPD= $scope.resultAPD.norec
                    noreg=$scope.resultPD.noregistrasi
              }else{
                   norecPD=$scope.cacheNorecPD
                   norecAPD= $scope.cacheNorecAPD
                   noreg=$scope.cacheNoRegistrasi
              }

              var tanggal = $scope.now;
              var tanggalLahir = new Date($scope.item.pasien.tgllahir);
              var umur = dateHelper.CountAge(tanggalLahir, tanggal);
              var hasilumur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'

              var dokterId="";
              if ($scope.item.dokter!=undefined){
                dokterId=$scope.item.dokter.id
              }
                       
              var arrStr ={  0 : $scope.item.pasien.nocm,
                    1 : $scope.item.pasien.namapasien,
                    2 : $scope.item.pasien.jeniskelamin,
                    3 : noreg, 
                    4 : hasilumur,
                    5 : 6,//kelas
                    6 : "Non Kelas",
                    7 : $scope.item.tglRegistrasi,
                    8 : norecAPD,//NOREC ANTRIAN
                    9 : $scope.item.ruangan.namaruangan,
                    10 : $scope.item.ruangan.id,
                    11 : norecPD,
                    12 : "",//nor
                    13 : $scope.item.kelompokPasien.kelompokpasien,
                    14 : dokterId,
                    15 : $scope.item.ruangan.id
                }
                cacheHelper.set('RincianPelayananLabRadCtrl', arrStr);
                $state.go('RincianPelayananLabRad')
            }

 
            
        }
    ]);
});