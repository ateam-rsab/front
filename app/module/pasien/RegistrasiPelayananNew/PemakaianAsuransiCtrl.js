define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
     initialize.controller('PemakaianAsuransiCtrl', ['ManagePasien', '$scope', 'ModelItem', '$state', '$timeout', '$window','CacheHelper', 'DateHelper', 'CetakHelper', 'ModelItem', 'ManageServicePhp','ModelItemAkuntansi','FindPasien',
        function(managePasien, $scope, modelItem, $state, $timeout, $window, cacheHelper, dateHelper, cetakHelper, ModelItem, manageServicePhp,modelItemAkuntansi,findPasien) {
            $scope.now = new Date();
            
            $scope.currentNorecPD = $state.params.norecPD;
            $scope.currentNorecAPD = $state.params.norecAPD;
            loadPertama();
            $scope.item = {};
            $scope.model = {};  
            $scope.model.tglSEP = $scope.now;
            var tanggals = dateHelper.getDateTimeFormatted3($scope.now);
            $scope.model.tglRujukan  = tanggals + " 00:00";  
            $scope.model.tglPelayanan = $scope.now;
            $scope.bpjs=true;
            $scope.isNext=true;
            $scope.isHapusSep=true;
            $scope.isBatal=true;
            $scope.isKembali=true;

            // var $scope.cacheIdAP='';
            // var $scope.cacheNorecPA='';
            var cacheNoreg='';
            var responData="";
            $scope.listPenjaminLaka = [{
                    "id": 12, "name": "Jasa Raharja PT", "value":1
                },{
                    "id": 13, "name": "BPJS Ketenagakerjaan", "value":2
                },{
                    "id": 14, "name": "TASPEN PT", "value":3
                },{
                    "id": 15, "name": "ASABRI PT", "value":4
                }
             ];

            $scope.ListAsuransi = [
                {"id": "1", "name": "No. SEP Otomatis"}
            ];
            $scope.isCheckSEP = true;

            function loadCombo (){
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-data-combo",true)         
                      .then(function (dat) {
                        $scope.listAsalRujukan = dat.data.asalrujukan;
                        $scope.listKelompokPasien = dat.data.kelompokpasien;
                        $scope.sourceHubunganPasien= dat.data.hubunganpeserta;
                        $scope.sourceKelompokPasien= dat.data.kelompokpasien;
                        // $scope.sourceRekanan= dat.data.rekanan;
                        $scope.sourceKelasDitanggung=dat.data.kelas;
                        $scope.sourceAsalRujukan=dat.data.asalrujukan;
                        // $scope.item.kelompokPasien={id:dat.data.kelompokpasien[1].id,kelompokpasien:dat.data.kelompokpasien[1].kelompokpasien}
                        // $scope.model.institusiAsalPasien={id:dat.data.rekanan[689].id,namarekanan:dat.data.rekanan[689].namarekanan}
                        $scope.model.hubunganPeserta={id:dat.data.hubunganpeserta[2].id,hubunganpeserta:dat.data.hubunganpeserta[2].hubunganpeserta}
                        $scope.model.asalRujukan={id:dat.data.asalrujukan[5].id,asalrujukan:dat.data.asalrujukan[5].asalrujukan}
                        $scope.model.kelasDitanggung={id:dat.data.kelas[9].id,namakelas:dat.data.kelas[9].namakelas}

                    });
              }
    

    
           function loadPertama(){
               loadCombo();
           		$scope.isRouteLoading=true;
                manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
                	+$scope.currentNorecPD
                	+"/"
                	+$scope.currentNorecAPD)         
                  .then(function (e) {
                     $scope.isRouteLoading = false;
                     $scope.item.pasien=e.data[0];
                     $scope.model.noTelpons=e.data[0].notelepon;
                     $scope.listKelompokPasien =([{id:e.data[0].objectkelompokpasienlastfk,kelompokpasien:e.data[0].kelompokpasien}]);
                     $scope.item.kelompokPasien={id:e.data[0].objectkelompokpasienlastfk,kelompokpasien:e.data[0].kelompokpasien};     
                     $scope.sourceRekanan=([{id:e.data[0].objectrekananfk,namarekanan:e.data[0].namarekanan}])    
                     $scope.model.institusiAsalPasien={id:e.data[0].objectrekananfk,namarekanan:e.data[0].namarekanan}     
                     $scope.item.jenispelayanan=e.data[0].jenispelayanan;
                     if(e.data[0].israwatinap=="true"){
                           $scope.model.rawatInap=true;
                     }else{
                           $scope.model.rawatInap=false;   
                     }

                   //       manageServicePhp.getDataTableTransaksi("registrasipasien/get-asuransipasienbynocm?nocm="
		                	// +$scope.item.pasien.nocm)         
		                 //  .then(function (f) {
		                 //     $scope.cekTableAsuransiPas=f.data.data[0];      
		                 //  });

			           var cachePasienDaftar = cacheHelper.get('CachePemakaianAsuransi');
                      
			               	 if(cachePasienDaftar != undefined){
			                    var arrPasienDaftar = cachePasienDaftar.split('~');
			                    $scope.cacheIdAP = arrPasienDaftar[0];
			                    $scope.cacheNorecPA= arrPasienDaftar[1]; 
                                cacheNoreg= arrPasienDaftar[2]; 
                                 if ($scope.item.pasien.noregistrasi!=cacheNoreg)
                                 $scope.cacheNorecPA=undefined;
			                   
			                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-history-pemakaianasuransi?noregistrasi="
			                		// +$scope.item.pasien.noregistrasi
			                		+$scope.cacheNorecPA
			                		)         
			                 		 .then(function (x) {
					                   
					                     $scope.model.noKepesertaan =x.data.data[0].nokepesertaan
					                     $scope.model.namaPeserta =x.data.data[0].namapeserta
					                     $scope.model.noIdentitas =x.data.data[0].noidentitas
					                     // $scope.model.alamatPeserta ={id:x.data.data[0].objectkelompokpasienlastfk,kelompokpasien:x.data.data[0].kelompokpasien}
					                     $scope.model.jenisPeserta =x.data.data[0].jenisPeserta
					                     // $scope.model.noTelpons ={id:x.data.data[0].objectkelompokpasienlastfk,kelompokpasien:x.data.data[0].kelompokpasien}
					                     $scope.model.hubunganPeserta ={id:x.data.data[0].objecthubunganpesertafk,hubunganpeserta:x.data.data[0].hubunganpeserta}
					                     $scope.model.noSep =x.data.data[0].nosep
					                     $scope.model.tglSEP =x.data.data[0].tanggalsep
					                     $scope.model.kelasDitanggung ={id:x.data.data[0].objectkelasdijaminfk,namakelas:x.data.data[0].namakelas}
					                     $scope.model.catatan =x.data.data[0].catatan
					                     $scope.model.noRujukan =x.data.data[0].norujukan
					                     // $scope.model.asalRujukan ={id:x.data.data[0].objectkelompokpasienlastfk,kelompokpasien:x.data.data[0].kelompokpasien}
					                     $scope.model.namaAsalRujukan =x.data.data[0].kdprovider + " - " +x.data.data[0].nmprovider
					                     $scope.model.tglRujukan =x.data.data[0].tglrujukan
					                     $scope.model.diagnosa ={id:x.data.data[0].objectdiagnosafk,kddiagnosa:x.data.data[0].kddiagnosa}
					                     $scope.model.tglLahir=x.data.data[0].tgllahir
                                         $scope.item.kelompokPasien={id:x.data.data[0].objectkelompokpasienlastfk,kelompokpasien:x.data.data[0].kelompokpasien}     
                                         // $scope.model.institusiAsalPasien ={id:x.data.data[0].kdpenjaminpasien,namarekanan:x.data.data[0].namarekanan}
                                         $scope.model.institusiAsalPasien ={id:x.data.data[0].objectrekananfk,namarekanan:x.data.data[0].namarekananpd}
					                     $scope.model.lokasiLakaLantas =x.data.data[0].lokasilakalantas
                                         $scope.model.jenisPeserta =x.data.data[0].jenispeserta
                                         
                                         if (x.data.data[0].lakalantas==1)
                                            $scope.model.lakalantas=true
                                         
                                         if ( x.data.data[0].penjaminlaka!=''|| x.data.data[0].penjaminlaka!=null){
                                             var penjaminsLaka= x.data.data[0].penjaminlaka.split(',')
                                             penjaminsLaka.forEach(function(data){
                                                 $scope.listPenjaminLaka.forEach(function(e){
                                                     if (e.value == data){
                                                            e.isChecked = true
                                                            var dataid = {"id":e.id,
                                                                         "name":e.name,
                                                                         "value":data}  
                                                             $scope.currentListPenjaminLaka.push(dataid)
                                                        }
                                                      })
                                                 })
                                         }

			                  }); 
			                }
                  });
              }

             modelItemAkuntansi.getDataDummyPHP("registrasipasien/get-diagnosa-saeutik", true, true, 10).then(function(data) {
                      $scope.sourceDiagnosa = data;
                    
             });
           
          

         	 $scope.$watch('item.kelompokPasien', function(e) {
                if (e === undefined) return;
                    manageServicePhp.getDataTableTransaksi("registrasipasien/get-penjaminbykelompokpasien?kdKelompokPasien="+e.id)   
                      .then(function (z) {
                        $scope.sourceRekanan=z.data.rekanan;
                        if (e.kelompokpasien=='BPJS'){
                             $scope.model.institusiAsalPasien={id:$scope.sourceRekanan[0].id,namarekanan:$scope.sourceRekanan[0].namarekanan};
                             $scope.isCheckSEP = true;
                             $scope.noBPJS=true;
                             $scope.asuransilain=false;
                       	     $scope.bpjs=true;
                        }else if (e.kelompokpasien=='Umum/Pribadi')
                        {
                            $scope.model.institusiAsalPasien={id:$scope.sourceRekanan[0].id,namarekanan:$scope.sourceRekanan[0].namarekanan};
                             $scope.asuransilain=true;
                             $scope.bpjs=false;
                             $scope.isCheckSEP = false;
                             kosongkan()
                        }
                        else{
                       	     // $scope.model.institusiAsalPasien='';
                             $scope.model.sendiri = true;
                             $scope.Sendiri($scope.model.sendiri);
                       	     $scope.asuransilain=true;
                       	     $scope.bpjs=false;
                             $scope.isCheckSEP = false;
                             // kosongkan()
                        }
                            
                    }) 
            });
             function kosongkan(){
                $scope.model.noKepesertaan='';
                $scope.model.namaPeserta='';
                $scope.model.noIdentitas='';
                $scope.model.alamatPeserta='';
                $scope.model.jenisPeserta='';
                $scope.model.noTelpons='';
                $scope.model.noSep='';
                // $scope.model.tglsep='';
                // $scope.model.kelasDitanggung='';
                $scope.model.catatan='';
                $scope.model.noRujukan='';
                $scope.model.namaAsalRujukan='';
                // $scope.model.tglRujukan='';
                // $scope.model.diagnosa='';
                $scope.model.lokasiLakaLantas='';
             }

            $scope.Sendiri = function(data){
                if (data === true) {
                    $scope.model.namaPeserta = $scope.item.pasien.namapasien;
                    $scope.model.tglLahir =  $scope.item.pasien.tgllahir;
                    $scope.model.noIdentitas =  $scope.item.pasien.noidentitas;
                    $scope.model.alamatPeserta = $scope.item.pasien.alamatlengkap;
                    $scope.model.noKepesertaan = $scope.item.pasien.nobpjs;
                    $scope.model.noTelpons = $scope.item.pasien.notelepon;
                    $scope.model.noIdentitas = $scope.item.pasien.noidentitas;
                
                    $scope.kelasBpjs = false;
                    $scope.kelasPenjamin = true;
                }else{
                    $scope.model.noKepesertaan="";
                    $scope.model.namaPeserta = "";
                    $scope.model.tglLahir =  "";
                    $scope.model.noIdentitas =  "";
                    $scope.model.alamatPeserta = "";
                    $scope.model.noTelpons="";
                    $scope.model.noKepesertaan ="";
                    $scope.model.noIdentitas ="";
            

                    $scope.kelasBpjs = true;
                    $scope.kelasPenjamin = false;
                }
                $scope.disableSEP = data;
            };


			 $scope.checkKepesertaanByNoBpjs = function() {
                if(!$scope.model.cekNomorPeserta) return;
                if ($scope.model.noKepesertaan === '' || $scope.model.noKepesertaan === undefined) return;
                if ($scope.model.sendiri === true) return;
                $scope.isLoadingNoKartu = true;
		              manageServicePhp.checkPesertaByNoBpjs($scope.model.noKepesertaan).then(function(e) {
		                    if (e.data.metaData.code === "200") {
		                        var tglLahir = new Date(e.data.response.peserta.tglLahir);
		                        $scope.model.noKepesertaan = $scope.noKartu = e.data.response.peserta.noKartu;
		                        $scope.model.namaPeserta = e.data.response.peserta.nama;
		                        $scope.model.tglLahir = tglLahir;
		                        $scope.model.noIdentitas = e.data.response.peserta.nik;
		                        $scope.model.kelasBridg = {
		                            id: parseInt(e.data.response.peserta.hakKelas.kode),
		                            kdKelas: e.data.response.peserta.hakKelas.kode,
		                            nmKelas: e.data.response.peserta.hakKelas.keterangan,
		                            namakelas: e.data.response.peserta.hakKelas.keterangan,
		                        };
                                if ($scope.model.kelasBridg.id==1){
                                     $scope.model.kelasDitanggung={id:3,namakelas:'Kelas I'}
                                }else if($scope.model.kelasBridg.id==2){
                                     $scope.model.kelasDitanggung={id:2,namakelas:'Kelas II'}
                                }else if($scope.model.kelasBridg.id==3){
                                     $scope.model.kelasDitanggung={id:1,namakelas:'Kelas III'}
                                }
		                        // $scope.model.kelasDitanggung =  $scope.model.kelasDitanggung;
		                        // $scope.reformatKelas($scope.model.kelasDitanggung);
		                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
		                        $scope.kodeProvider = e.data.response.peserta.provUmum.kdProvider;
		                        $scope.namaProvider = e.data.response.peserta.provUmum.nmProvider;
                                $scope.model.faskesRujukan=false;
		                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
		                        $scope.model.jenisPeserta = e.data.response.peserta.jenisPeserta.keterangan;
                               toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
		                    } else {
		                        window.messageContainer.error(e.data.metaData.message);
		                    }
		                    $scope.isLoadingNoKartu = false;
		                }, function(err) {
		                    $scope.isLoadingNoKartu = false;
		                });

                     
                      manageServicePhp.getDataTableTransaksi("bpjs/get-rujukan-rs-nokartu?nokartu="+ $scope.model.noKepesertaan).then(function(e) {
                            if (e.data.metaData.code === "200") {
                                 $scope.model.noRujukan=e.data.response.rujukan.noKunjungan;
                              var tglLahir = new Date(e.data.response.rujukan.peserta.tglLahir);
                                $scope.model.noKepesertaan = e.data.response.rujukan.peserta.noKartu;
                                $scope.model.namaPeserta = e.data.response.rujukan.peserta.nama;
                                $scope.model.tglLahir = tglLahir;
                                $scope.model.noIdentitas = e.data.response.rujukan.peserta.nik;
                                $scope.model.kelasBridg = {
                                    id: parseInt(e.data.response.rujukan.peserta.hakKelas.kode),
                                    kdKelas: e.data.response.rujukan.peserta.hakKelas.kode,
                                    nmKelas: e.data.response.rujukan.peserta.hakKelas.keterangan,
                                    namakelas: e.data.response.rujukan.peserta.hakKelas.keterangan,
                                };
                                if ($scope.model.kelasBridg.id==1){
                                     $scope.model.kelasDitanggung={id:3,namakelas:'Kelas I'}
                                }else if($scope.model.kelasBridg.id==2){
                                     $scope.model.kelasDitanggung={id:2,namakelas:'Kelas II'}
                                }else if($scope.model.kelasBridg.id==3){
                                     $scope.model.kelasDitanggung={id:1,namakelas:'Kelas III'}
                                }
                                // $scope.model.kelasDitanggung =  $scope.model.kelasDitanggung;
                                // $scope.reformatKelas($scope.model.kelasDitanggung);
                                // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                                $scope.kodeProvider = e.data.response.rujukan.provPerujuk.kode;
                                $scope.namaProvider = e.data.response.rujukan.provPerujuk.nama;
                                $scope.model.faskesRujukan=false;
                                $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                                $scope.model.jenisPeserta = e.data.response.rujukan.peserta.jenisPeserta.keterangan;
                                modelItemAkuntansi.getDataTableTransaksi("bpjs/get-diagnosa-saeutik?kdDiagnosa="+e.data.response.rujukan.diagnosa.kode, true, true, 10)
                                    .then(function(data) {
                                    $scope.sourceDiagnosa.add(data[0])
                                    $scope.model.diagnosa = {id:data[0].id,kddiagnosa:data[0].kddiagnosa};

                                })

                                toastr.info(e.data.response.rujukan.noKunjungan,'No Rujukan');
                               // toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
                            } else {
                                 toastr.error(e.data.metaData.message,'Info');
                            }
                        })
      		}


            // check kepesertaan berdasarkan NIK
            $scope.checkKepesertaanByNik = function() {
                if (!$scope.model.cekNikPeserta) return;
                if (!$scope.model.noIdentitas) return;
                if ($scope.model.sendiri) return;
                if ($scope.model.noIdentitas.length>16) { 
                    window.messageContainer.error("NIK Lebih Dari 16 Digit");
                    return;
                  }
                if($scope.model.noIdentitas.length<16) {
                     window.messageContainer.error("NIK Kurang Dari 16 Digit");
                     return;
                }
                  
                $scope.isLoadingNIK = true;

                manageServicePhp.checkPesertaByNik($scope.model.noIdentitas).then(function(e) {
                    // debugger;
                    if (e.data.metaData.code === "200") {
                        var tglLahir = new Date(e.data.response.peserta.tglLahir);
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.response.peserta.nik;
                        $scope.model.kelasBridg = {
                            id: parseInt(e.data.response.peserta.hakKelas.kode),
                            kdKelas: e.data.response.peserta.hakKelas.kode,
                            nmKelas: e.data.response.peserta.hakKelas.keterangan,
                            namakelas: e.data.response.peserta.hakKelas.keterangan,
                        };

                         if ($scope.model.kelasBridg.id==1){
                                     $scope.model.kelasDitanggung={id:3,namakelas:'Kelas I'}
                                }else if($scope.model.kelasDitanggung.id==2){
                                     $scope.model.kelasDitanggung={id:2,namakelas:'Kelas II'}
                                }else{
                                     $scope.model.kelasDitanggung={id:1,namakelas:'Kelas III'}
                                }
                        // $scope.model.kelasDitanggung =  $scope.model.kelasDitanggung;
                        // $scope.reformatKelas($scope.model.kelasDitanggung);
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        $scope.kodeProvider = e.data.response.peserta.provUmum.kdProvider;
                        $scope.namaProvider = e.data.response.peserta.provUmum.nmProvider;
                        $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.model.jenisPeserta = e.data.response.peserta.jenisPeserta.nmJenisPeserta;
                        toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
                    } else {
                        window.messageContainer.error(e.data.metaData.message);
                    }
                    $scope.isLoadingNIK = false;
                }, function(err) {
                    $scope.isLoadingNIK = false;
                });
            };

             $scope.checkDataRujukan = function() {
                if (!$scope.model.cekNomorRujukan) return;
                if (!$scope.model.noRujukan) return;
                if ($scope.model.sendiri) return;
               
                  
                $scope.isLoadingRujukan = true;

                manageServicePhp.checkPesertaByNoRujukanRs($scope.model.noRujukan).then(function(e) {
                    // debugger;
                     if (e.data.metaData.code === "200") {
                                 $scope.model.noRujukan=e.data.response.rujukan.noKunjungan;
                              var tglLahir = new Date(e.data.response.rujukan.peserta.tglLahir);
                                $scope.model.noKepesertaan = e.data.response.rujukan.peserta.noKartu;
                                $scope.model.namaPeserta = e.data.response.rujukan.peserta.nama;
                                $scope.model.tglLahir = tglLahir;
                                $scope.model.noIdentitas = e.data.response.rujukan.peserta.nik;
                                $scope.model.kelasBridg = {
                                    id: parseInt(e.data.response.rujukan.peserta.hakKelas.kode),
                                    kdKelas: e.data.response.rujukan.peserta.hakKelas.kode,
                                    nmKelas: e.data.response.rujukan.peserta.hakKelas.keterangan,
                                    namakelas: e.data.response.rujukan.peserta.hakKelas.keterangan,
                                };
                                if ($scope.model.kelasBridg.id==1){
                                     $scope.model.kelasDitanggung={id:3,namakelas:'Kelas I'}
                                }else if($scope.model.kelasBridg.id==2){
                                     $scope.model.kelasDitanggung={id:2,namakelas:'Kelas II'}
                                }else if($scope.model.kelasBridg.id==3){
                                     $scope.model.kelasDitanggung={id:1,namakelas:'Kelas III'}
                                }
                                // $scope.model.kelasDitanggung =  $scope.model.kelasDitanggung;
                                // $scope.reformatKelas($scope.model.kelasDitanggung);
                                // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                                $scope.kodeProvider = e.data.response.rujukan.provPerujuk.kode;
                                $scope.namaProvider = e.data.response.rujukan.provPerujuk.nama;
                                $scope.model.faskesRujukan=false;
                                $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                                $scope.model.jenisPeserta = e.data.response.rujukan.peserta.jenisPeserta.keterangan;
                                modelItemAkuntansi.getDataTableTransaksi("bpjs/get-diagnosa-saeutik?kdDiagnosa="+e.data.response.rujukan.diagnosa.kode, true, true, 10)
                                    .then(function(data) {
                                    $scope.sourceDiagnosa.add(data[0])
                                    $scope.model.diagnosa = {id:data[0].id,kddiagnosa:data[0].kddiagnosa};

                                })

                                toastr.info(e.data.response.rujukan.noKunjungan,'No Rujukan');
                               // toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
                            } else {
                                 toastr.error(e.data.metaData.message,'Info');
                            }
                    $scope.isLoadingRujukan = false;
                }, function(err) {
                    $scope.isLoadingRujukan = false;
                });
            };

            //delete sep
            $scope.DeleteSep=function(){
                 hapusSep()
            }
            function hapusSep(){
             var passcode='egie';
                if (passcode=='egie')
                {
                    manageServicePhp.deleteSep($scope.model.noSep).then(function(e) {
                        if (e.data.metaData.code === "200") {
                            window.messageContainer.log("Success Delete SEP");
                             $scope.model.generateNoSEP = false;
                             $scope.disableSEP = false;
                             $scope.model.noSep='';
                        }
                        else{
                            window.messageContainer.error(e.data.metaData.message);
                        }
                    })
                }else
                {
                    window.messageContainer.error("Tidak Bisa Delete SEP, Passcode Salah");
                }
            }

             // check kepesertaan berdasarkan SEP
            $scope.checkKepesertaanBySep = function() {
                // if (!$scope.model.generateNoSEP) return;
                // if (!$scope.model.noSep) return;
                if ($scope.model.sendiri) return;
                if ($scope.model.isCheckSEP) return;
                // if ($scope.model.noSep.length>16) { 
                //     window.messageContainer.error("No SEP Lebih dari 16 Digit");
                //     return;
                // }
                // if($scope.model.noSep.length<16) {
                //      window.messageContainer.error("No SEP kurang dari 16 Digit");
                //      return;
                // }
                $scope.isLoadingSEP = true;
                if ($scope.model.noSep===""||$scope.model.noSep===undefined)
                {
                	 window.messageContainer.error("No SEP Tidak Ada");
                	 return;
                }
                manageServicePhp.cariSep($scope.model.noSep).then(function(e) {
                    if (e.data.metaData.code === "200") {
                        $scope.disableSEP = true;
                        var tglLahir = new Date(e.data.response.peserta.tglLahir);
                        $scope.model.noKepesertaan = $scope.noKartu = e.data.response.peserta.noKartu;
                        $scope.model.namaPeserta = e.data.response.peserta.nama;
                        $scope.model.tglLahir = tglLahir;
                        $scope.model.noIdentitas = e.data.response.peserta.nik;
                        $scope.model.kelasBridg = {
                            id: parseInt(e.data.response.peserta.hakKelas.kode),
                            kdKelas: e.data.response.peserta.hakKelas.kode,
                            nmKelas: e.data.response.peserta.hakKelas.keterangan,
                            namakelas: e.data.response.peserta.hakKelas.keterangan,
                        };
                          if ($scope.model.kelasBridg.id==1){
                                     $scope.model.kelasDitanggung={id:3,namakelas:'Kelas I'}
                                }else if($scope.model.kelasDitanggung.id==2){
                                     $scope.model.kelasDitanggung={id:2,namakelas:'Kelas II'}
                                }else{
                                     $scope.model.kelasDitanggung={id:1,namakelas:'Kelas III'}
                                }
                        // $scope.model.kelasDitanggung =  $scope.model.kelasDitanggung;
                        // $scope.kelas = e.data.data.response.peserta.kelasTanggungan.kdKelas;
                        // $scope.kodeProvider = e.data.response.peserta.provUmum.kdProvider;
                        // $scope.namaProvider = e.data.response.peserta.provUmum.nmProvider;
                        // $scope.model.namaAsalRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                        $scope.model.jenisPeserta = e.data.response.peserta.jenisPeserta.jnsPeserta;
                        // $scope.model.diagnosa = {
                        //     kdDiagnosa : e.data.data.response.diagAwal.kdDiag,
                        //     namaDiagnosa: e.data.data.response.diagAwal.nmDiag
                        // };
                        // $scope.model.diagnosa = e.data.response.diagnosa.kdDiag;
                        if (e.data.response.lakaLantas.status === "0") {
                            // magics will appear
                        } else {
                            $scope.model.lakalantas = true;
                            $scope.model.lokasiLakaLantas = e.data.response.lakaLantasketerangan;
                        }
                    } else {
                        window.messageContainer.error(e.data.metaData.message);
                    }
                    $scope.isLoadingSEP = false;
                }, function(err) {
                    $scope.isLoadingSEP = false;
                });
            };

            $scope.generateSEP = function() {
             if (!$scope.model.generateNoSEP) return;
                var listRawRequired = [
                    "item.pasien.namaruangan|k-ng-model|Ruangan",
                    // "item.asalRujukan|ng-model|Asal Rujukan",
                    "item.kelompokPasien|ng-model|Kelompok Pasien",
                    // "item.pegawai|ng-model|Dokter Tidak ada jadwal hari ini",
                    // "model.namaPenjamin|k-ng-model|Nama Penjamin",
                    "model.institusiAsalPasien|ng-model|Institusi Asal Pasien",
                    "model.noKepesertaan|ng-model|No Kepesertaan",
                    "model.asalRujukan|k-ng-model|Asal Rujukan",
                    // "model.noRujukan|ng-model|No Rujukan",
                    "model.tglRujukan|ng-model|Tgl Rujukan",
                    "model.diagnosa|k-ng-model|Diagnosa",
                    "model.kelasDitanggung|k-ng-model|Kelas ditanggung"
                ];
           
                // if ($scope.model.rawatInap) {
                //     listRawRequired.push("item.kelas|k-ng-model|Kelas Ditanggung");
                //     switch($scope.item.kelas.namakelas) {
                //         case 'Kelas I':
                //             kelasJaminan = "1";
                //             break;
                //         case 'Kelas II':
                //             kelasJaminan = "2";
                //             break;
                //         case 'Kelas III':
                //             kelasJaminan = "3";
                //             break;
                //         default:
                //             kelasJaminan = $scope.item.kelas.id;
                //             break;
                //     }
                // } else {
       
                    // if ($scope.model.kelasDitanggung) {
                    //     switch($scope.model.kelasDitanggung.namakelas) {
                    //         case 'Kelas I':
                    //             kelasJaminan = "1";
                    //             break;
                    //         case 'Kelas II':
                    //             kelasJaminan = "2";
                    //             break;
                    //         case 'Kelas III':
                    //             kelasJaminan = "3";
                    //             break;
                    //         default:
                    //             kelasJaminan = $scope.model.kelasDitanggung.kdKelas;
                    //             break;
                    //     }
                    // }
                // }
                var isValid = modelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var kelasJaminan;
                    if ($scope.model.rawatInap==false){
                        //  "klsRawat": "{kelas rawat 1. kelas 1, 2. kelas 2 3.kelas 3}",
                       kelasJaminan="3";    
                    }else
                    {
                        if ($scope.model.kelasBridg!=undefined){
                             kelasJaminan= $scope.model.kelasBridg.id;
                        }else{
                            kelasJaminan="3";
                        }

                    }
                    var noKartu="";
                    if($scope.model.noKepesertaan !=undefined){
                        var noKartu = $scope.model.noKepesertaan;
                    }else{
                        var noKartu = '';
                    }

                    var kdJenisPelayanan="";
                    if ($scope.model.rawatInap === true)
                        kdJenisPelayanan="1";
                    else
                        kdJenisPelayanan="2";

                    var kddiagnosaawal="";
                    if ($scope.model.diagnosa!=undefined)
                        kddiagnosaawal=$scope.model.diagnosa.kddiagnosa;
                    else
                        kddiagnosaawal="";

                    var catatan="";
                    if ($scope.model.catatan!=undefined)
                        catatan=$scope.model.catatan;
                    else
                        catatan="";

                   var polisEksekutif="";
                    if ($scope.item.jenispelayanan=="EKSEKUTIF")
                        polisEksekutif="1";
                    else
                        polisEksekutif="0";


                    var lokasiLakaLantas="";
                    if ($scope.model.lokasiLakaLantas!=undefined)
                        lokasiLakaLantas=$scope.model.lokasiLakaLantas;
                    else
                        lokasiLakaLantas="";


                    var noTelp="";
                    // if ($scope.item.pasien.notelepon!=undefined)
                    //     noTelp=$scope.item.pasien.notelepon;
                    // else 
                    if ($scope.model.noTelpons!=undefined)
                        noTelp=$scope.model.noTelpons;
                    else
                    	noTelp="";

                    var KdAsalRujukan="";
                    if (  $scope.model.asalRujukan!=undefined){
                        if ( $scope.model.asalRujukan.asalrujukan==="Rumah sakit"){
                                KdAsalRujukan="2"
                            }
                        else{
                                KdAsalRujukan="1"
                        }                    
                   }

                    var kdPpkRujukan="";
                    if($scope.model.faskesRujukan==true){
                        if ($scope.model.namaAsalRujukanBrid!=undefined){
                            // var arrKdPpkRUjukanBrid=$scope.model.namaAsalRujukanBrid.split(' - ');
                            kdPpkRujukan=$scope.model.namaAsalRujukanBrid.kode;
                        }
                    }else{
                        if ($scope.model.namaAsalRujukan!=undefined){
                            var arrKdPpkRUjukan=$scope.model.namaAsalRujukan.split(' - ');
                            kdPpkRujukan=arrKdPpkRUjukan[0];
                         }
                    }

                 
                    // 0904R004
                    var poliTujuans="";
                    if ( $scope.item.pasien.kdinternal!=null)
                      poliTujuans=$scope.item.pasien.kdinternal;
                    else
                      poliTujuans="";
                     
                    // var penjaminBridging=""
                    // if ( $scope.model.institusiAsalPasien.namarekanan.indexOf('BPJS') >= 0) {
                    //      penjaminBridging="2";
                    // }else if ( $scope.model.institusiAsalPasien.namarekanan.indexOf('Jasa Raharja') >= 0){
                    //      penjaminBridging="1";
                    // }else if ( $scope.model.institusiAsalPasien.namarekanan.indexOf('TASPEN') >= 0){
                    //      penjaminBridging="3";
                    // }else if ( $scope.model.institusiAsalPasien.namarekanan.indexOf('ASABRI ') >= 0){
                    //      penjaminBridging="4";
                    // }
                    var listPenjaminLakas=""
                    if ($scope.model.lakalantas){
                        var a = ""
                        var b = ""
                        for (var i =  $scope.currentListPenjaminLaka.length - 1; i >= 0; i--) {
                            var c = $scope.currentListPenjaminLaka[i].value
                            b = ","+ c
                            a = a + b
                        }
                       listPenjaminLakas= a.slice(1, a.length)
                    } 

                      var datazz = {
                         nosep:  $scope.model.noSep===undefined ? "" :$scope.model.noSep,
                        tglsep:  new moment($scope.model.tglSEP).format('YYYY-MM-DD'),
                        jenispelayanan:kdJenisPelayanan ,
                        // kelasrawat: $scope.model.rawatInap === true ? kelasJaminan : "3":,
                        kelasrawat:kelasJaminan,
                        nomr: $scope.item.pasien.nocm,
                        asalrujukan: KdAsalRujukan,
                        tglrujukan:  new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
                        norujukan: $scope.model.noRujukan === undefined ? 0 : $scope.model.noRujukan,
                        ppkrujukan: kdPpkRujukan,//$scope.item.kdPpkRujukan===undefined ? 0 : $scope.item.kdPpkRujukan,
                        catatan: catatan,
                        kddiagnosaawal: kddiagnosaawal,
                        politujuan: poliTujuans,//'ANA',//$scope.item.ruangan.kdinternal,
                        eksekutif:polisEksekutif,
                        cob: $scope.model.cob == true ? "1" : "0",
                        lakalantas: $scope.model.lakalantas === true ? "1" : "0",
                        penjamin:  listPenjaminLakas ,
                        lokasilaka: lokasiLakaLantas,
                        notelp:noTelp,
                    
                    };

                    var data = {
                        nokartu:  noKartu,
                        tglsep:  new moment($scope.model.tglSEP).format('YYYY-MM-DD'),
                        jenispelayanan: kdJenisPelayanan,
                        // kelasrawat: $scope.model.rawatInap === true ? kelasJaminan : "3":,
                        kelasrawat: kelasJaminan,
                        nomr: $scope.item.pasien.nocm,
                        asalrujukan: KdAsalRujukan,
                        tglrujukan:  new moment($scope.model.tglRujukan).format('YYYY-MM-DD'),
                        norujukan: $scope.model.noRujukan === undefined ? 0 : $scope.model.noRujukan,
                        ppkrujukan: kdPpkRujukan,
                        catatan: catatan,
                        diagnosaawal: kddiagnosaawal,
                        politujuan: poliTujuans,//'ANA',//$scope.item.ruangan.kdinternal,
                        // "GIG",
                        eksekutif: polisEksekutif,
                        cob: "0",
                        lakalantas:  $scope.model.lakalantas === true ? "1" : "0",
                        penjamin: listPenjaminLakas,
                        lokasilaka: lokasiLakaLantas,
                        notelp: noTelp,
                    
                    };
                     $scope.isSimpan=true;
                    //##Generate SEP
                    if($scope.model.noSep==''||$scope.model.noSep==undefined){
                             manageServicePhp.generateSEP(data).then(function(e) {
                                            if (e.data.response){
                                              
                                                $scope.successGenerateSep=e.data.metaData.code;
                                                $scope.model.noSep = e.data.response.sep.noSep;
                                                $scope.model.generateNoSEP = false;
                                                $scope.disableSEP = true;
                                                $scope.isHapusSep=true;
                                                toastr.success('Generate SEP Success','Status');
                                                $scope.SimpanNonGenerate();
                                                $scope.isSimpan=false;
                                            }else {
                                                $scope.isSimpan=false;
                                                // $scope.isNext = false;
                                                window.messageContainer.error(e.data.metaData.message)
                                            }
                                            $scope.isLoadingRujukan = false;
                                        }, function(err) {
                                            $scope.isLoadingRujukan = false;
                                });
                        }
                          //## Update SEP
                    else if($scope.model.noSep!=undefined ){
                            if($scope.model.noSep.length>10){
                                manageServicePhp.updateSEP(datazz).then(function(e) {
                                        if (e.data.response){

                                            $scope.successGenerateSep=e.data.metaData.code;
                                            $scope.model.noSep = e.data.response;
                                            $scope.model.generateNoSEP = false;
                                            $scope.disableSEP = true;
                                            $scope.isHapusSep=true;
                                            toastr.success('Update SEP Success','Status');
                                            $scope.SimpanNonGenerate();
                                            $scope.isSimpan=false;
                                        }else {
                                            // $scope.isNext = false;
                                            window.messageContainer.error(e.data.metaData.message)
                                        }
                                        $scope.isLoadingRujukan = false;
                                    }, function(err) {
                                        $scope.isLoadingRujukan = false;
                                    });
                        }
                        //## End Update SEP
                    }
                }
            };

            $scope.SimpanNonGenerate=function(){
                        var noasuransi = "";
                         if ($scope.model.noKepesertaan == undefined) {
                            noasuransi = '';
                         } else
                            noasuransi = $scope.model.noKepesertaan;

                        var noidentitas = "";
                         if ($scope.model.noIdentitas == undefined) {
                            noidentitas = '';
                         } else
                            noidentitas = $scope.model.noIdentitas;

                        var diagnosisfk = null;
                         if ($scope.model.diagnosa == undefined) {
                            diagnosisfk = null;
                         } else
                            diagnosisfk = $scope.model.diagnosa.id;

                        var norujukan = "";
                         if ($scope.model.noRujukan == undefined) {
                            norujukan = '';
                         } else
                            norujukan = $scope.model.noRujukan;

                       var noKepesertaans = "";
                         if ($scope.model.noKepesertaan == undefined) {
                            noKepesertaans = '';
                         } else
                            noKepesertaans = $scope.model.noKepesertaan;

                        var nosep = "";
                         if ($scope.model.noSep == undefined) {
                            nosep = '';
                         } else
                            nosep = $scope.model.noSep;

                        var tanggalsep = "";
                         if (  $scope.model.tglSEP == undefined) {
                            tanggalsep = null;
                         } else
                            tanggalsep =    new moment($scope.model.tglSEP).format('YYYY-MM-DD HH:mm:ss');
                          
                        var tglRujukan = "";
                         if (  $scope.model.tglRujukan == undefined) {
                            tglRujukan = '';
                         } else
                            tglRujukan =  new moment($scope.model.tglRujukan).format('YYYY-MM-DD HH:mm:ss');
                          

                        var noCM="";
                        if ($scope.item.pasien.nocm==undefined)
                         noCM=''
                        else
                         noCM= $scope.item.pasien.nocm

                        var catatans = "";
                         if ($scope.model.catatan == undefined) {
                            catatans = '';
                         } else
                            catatans =   $scope.model.catatan;
                   
                         var kdProviders = "-";
                         var namaProviders = "-";
                        if($scope.model.faskesRujukan==true){
                            if ($scope.model.namaAsalRujukanBrid!=undefined){
                                // var arrKdPpkRUjukanBrid=$scope.model.namaAsalRujukanBrid.split(' - ');
                                // kdProviders=arrKdPpkRUjukanBrid[0];
                                // namaProviders=arrKdPpkRUjukanBrid[1];
                                 kdProviders=$scope.model.namaAsalRujukanBrid.kode
                                namaProviders=$scope.model.namaAsalRujukanBrid.nama
                            }
                        }else{
                            if ($scope.model.namaAsalRujukan!=undefined){
                                    var arrKdPpkRUjukan=$scope.model.namaAsalRujukan.split(' - ');
                                    kdProviders=arrKdPpkRUjukan[0];
                                    namaProviders=arrKdPpkRUjukan[1];
                             }
                         }
              
                        if (namaProviders==undefined){
                          namaProviders = "-";
                        }                       

                        manageServicePhp.getDataTableTransaksi("registrasipasien/get-asuransipasienbynocm?nocm="
                            +$scope.item.pasien.nocm)         
                            .then(function (f) {
                               $scope.cekTableAsuransiPas=f.data.data[0];      
                        });

                        debugger    
                        var id_AsPasien= "";
                        // if ($scope.resultPA != undefined) {
                        //     id_AsPasien = $scope.resultPA.objectasuransipasienfk
                        // } else 
                        if($scope.cacheIdAP!=undefined){
                          id_AsPasien=$scope.cacheIdAP;
                        } 
                        if (id_AsPasien=="null"){
                            id_AsPasien=""
                        }

                        var norec_PA= "";
                        // if ( responData.PA != undefined) {
                        //     norec_PA = responData.PA.norec;
                        // } else 
                        if($scope.cacheNorecPA!=undefined){
                             norec_PA=$scope.cacheNorecPA;
                        }
                        if(norec_PA=="null")
                        {
                         norec_PA=""   
                        }

                         // var id_AsPasien="";
                         // if ($scope.cekTableAsuransiPas!=undefined)
                         //  id_AsPasien=$scope.cekTableAsuransiPas.id_ap;
                         // else if($scope.resultPA!=undefined){
                         //  id_AsPasien=$scope.resultPA.objectasuransipasienfk
                         // }else
                         //  id_AsPasien="";


                         // var norec_PA="";
                         // if (responData.PA!=undefined)
                         // 	norec_PA=$scope.resultPA.norec;
                         // else
                         // 	norec_PA="";

                         var alamatPesertas="";
                         if ($scope.model.alamatPeserta!=undefined)
                         	alamatPesertas=$scope.model.alamatPeserta;

                          var kelasDitanggungs="";
                         if ($scope.model.kelasDitanggung!=undefined)
                         	kelasDitanggungs=$scope.model.kelasDitanggung.id;

 				
                         if ($scope.model.institusiAsalPasien==undefined)
                         	{
                         		window.messageContainer.error("Institusi Asal Pasien harus di isi")
                         		return
                         	}

                          var namaPesertas="";
                         if ($scope.model.namaPeserta!=undefined)
                         	namaPesertas=$scope.model.namaPeserta;

                         var jenisPesertas="";
                         if ($scope.model.jenisPeserta!=undefined)
                         	jenisPesertas=$scope.model.jenisPeserta;
                         var lokasiLakaLantas="";
                            if ($scope.model.lokasiLakaLantas!=undefined)
                                lokasiLakaLantas=$scope.model.lokasiLakaLantas;
                            else
                             lokasiLakaLantas="";

                        var listPenjaminLakas=""
                        if ($scope.model.lakalantas){
                            var a = ""
                            var b = ""
                            for (var i =  $scope.currentListPenjaminLaka.length - 1; i >= 0; i--) {
                                var c = $scope.currentListPenjaminLaka[i].value
                                b = ","+ c
                                a = a + b
                            }
                           listPenjaminLakas= a.slice(1, a.length)
                        } 

                        var noTelp="";
                        if ($scope.model.noTelpons!=undefined)
                            noTelp=$scope.model.noTelpons;
                        var jenisPeserta=""
                        if($scope.model.jenisPeserta!=undefined)
                            jenisPeserta=$scope.model.jenisPeserta

                        var asuransipasien = {
                        	id_ap: id_AsPasien,
                        	noregistrasi:  $scope.item.pasien.noregistrasi,
                            nocm:  noCM,
                            alamatlengkap: alamatPesertas,
                            objecthubunganpesertafk: $scope.model.hubunganPeserta.id,
                            objectjeniskelaminfk: $scope.item.pasien.objectjeniskelaminfk,
                            kdinstitusiasal: $scope.model.institusiAsalPasien.id,
                            kdpenjaminpasien: $scope.model.institusiAsalPasien.id,
                            objectkelasdijaminfk:  kelasDitanggungs,
                            namapeserta: namaPesertas,
                            nikinstitusiasal: $scope.model.institusiAsalPasien.id,
                            noasuransi: noasuransi,
                            alamat: $scope.item.pasien.alamatlengkap,
                            nocmfkpasien:$scope.item.pasien.nocmfk,
                            noidentitas: noidentitas,
                            qasuransi: $scope.item.kelompokPasien.id,
                            kelompokpasien: $scope.item.kelompokPasien.id,
                            tgllahir: $scope.item.pasien.tgllahir,
                            jenispeserta: jenisPesertas,
                            kdprovider: kdProviders,
                            nmprovider: namaProviders,
                            notelpmobile:noTelp,
                            jenispeserta:jenisPeserta,
                        }

                        var pemakaianasuransi = {
                        	norec_pa:norec_PA,
                            noregistrasifk: $scope.currentNorecPD,
                            tglregistrasi:$scope.item.pasien.tglregistrasi,
                            diagnosisfk: diagnosisfk,
                            lakalantas: $scope.model.lakalantas === true ? 1 : 0,
                            nokepesertaan: noKepesertaans,
                            norujukan: norujukan,
                            nosep: nosep,
                            tglrujukan: tglRujukan,
                            // objectasuransipasienfk: $scope.model.noKepesertaan,
                            objectdiagnosafk: diagnosisfk,
                            tanggalsep:tanggalsep,
                            catatan: catatans,  
                            lokasilaka:lokasiLakaLantas,
                            penjaminlaka: listPenjaminLakas     
                        }
                        var objSave = {
                            asuransipasien: asuransipasien,
                            pemakaianasuransi: pemakaianasuransi
                        }
                        // $scope.isSimpan=true;
                        manageServicePhp.saveAsuransiPasien(objSave).then(function (e) {
                            // $scope.isSimpan=false;
                            responData=e.data;
                            $scope.resultPA=e.data.PA;
                            $scope.isBatal=true;
                            $scope.isKembali=true;

                                                   
                             var cachePasienDaftar = $scope.resultPA.objectasuransipasienfk
                                                     + "~" + $scope.resultPA.norec
                                                     + "~" + $scope.item.pasien.noregistrasi;
                             cacheHelper.set('CachePemakaianAsuransi', cachePasienDaftar);

                            if (e.data.status==201){
                                $scope.Back();
                            }
                                        
                        })
            }
      
      		$scope.Save=function(){
      			if ($scope.model.generateNoSEP) {
						$scope.generateSEP();
      			}else
      			{
      				  $scope.SimpanNonGenerate();
      			}
      			
      		}
      		$scope.Back=function(){
                window.history.back();
      			 // $state.go('RegistrasiPelayananRev');
      		}

            modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-faskes", true, true, 10).then(function(data) {
                      $scope.listFaskesRujukan = data;
                    
             });
            // $scope.getFaskes= function(){
                 // Jenis Faskes (1. Faskes 1, 2. Faskes 2/RS)
             //    var jenisFaskes;
             //    if ($scope.model.asalRujukan!=undefined){
             //        if ($scope.model.asalRujukan.id==2){
             //            jenisFaskes="2";
             //        }else{
             //             jenisFaskes="1";
             //        }
             //    }

             //     manageServicePhp.getDataTableTransaksi("bpjs/get-ref-faskes?kdNamaFaskes="
             //                +$scope.model.namaFaskesRujukan.nama
             //                +"&jenisFakses="
             //                +jenisFaskes)         
             //                .then(function (c) {
             //                   $scope.listFaskesRujukan=c.response.faskes;      
             // });
            // }
        //      $scope.getPpkRujukan=function(){
        //     if ($scope.model.namaAsalRujukanBrid.length >=3){
        //           manageServicePhp.getDataTableTransaksi("bpjs/get-ref-faskes?kdNamaFaskes="
        //             +$scope.model.namaAsalRujukanBrid
        //             +"&jenisFakses="
        //             +"2"

        //            )         
        //           .then(function (e) {
        //             if(e.statResponse){
        //                if(e.data.metaData.code==200){
        //                     var result=e.data.response.faskes;
        //                     for (var x=0 ;x< result.length;x++){
        //                         var element =result[x];
        //                         element.nama = element.kode + ' - ' + element.nama   
        //                     }
        //                  $scope.listPpkRujukan=result;   
        //                 }
        //             }
                    
        //           })
        //     }
        // }
        modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-faskes-part", true, true, 10).then(function(data) {
           $scope.listPpkRujukan=data;   

         });
         $scope.currentListPenjaminLaka=[];
           $scope.addListPenjamin = function(data) {
                var index = $scope.currentListPenjaminLaka.indexOf(data);
                if (_.filter($scope.currentListPenjaminLaka, {
                        id: data.id
                    }).length === 0)
                    $scope.currentListPenjaminLaka.push(data);
                else {
                    $scope.currentListPenjaminLaka.splice(index, 1);
                }
                
            }
           


           
        }
    ]);
});