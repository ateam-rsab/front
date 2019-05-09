define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('CreateRujukanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'ModelItemAkuntansi','FindPasien','ManageServicePhp',
    function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien,modelItemAkuntansi, findPasien ,manageServicePhp) {
      $scope.isRouteLoading = true;
      $scope.model={};
            // $scope.showSEP=true;
            $scope.clear = function(){
              $scope.now = new Date();
              var tanggals = DateHelper.getDateTimeFormatted3($scope.now);
              $scope.item = {
                tglRujukan: $scope.now,
                    // tglRujukan: tanggals + " 00:00",


                  };
                 // $scope.item.tglRujukan  = tanggals + " 00:00";  
                 $scope.item.jenisPelayanan = $scope.jenisPelayanan[1]; 
                 $scope.item.tipeRujukan = $scope.listTipeRujukan[0]; 
                 $scope.isRouteLoading = false;
               };
          //    modelItemAkuntansi.getDataDummyPHP("bpjs/get-diagnosa-saeutik", true, true, 10).then(function(data) {
          //     $scope.listDiagnosa = data;

          // });
          modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosa-part", true, true, 10).then(function(data) {
           $scope.listDiagnosa=data;   

         });
          modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-diagnosatindakan-part", true, true, 10).then(function(data) {
           $scope.listTindakan=data;   

         });
          modelItemAkuntansi.getDataDummyPHP("bpjs/get-poli-part", true, true, 10).then(function(data) {
           $scope.listPoli=data;   

         });
          modelItemAkuntansi.getDataDummyPHP("bpjs/get-ref-faskes-part", true, true, 10).then(function(data) {
           $scope.listFaskess=data;   

         });
          $scope.$watch('item.jenisPelayanan', function(e){
            if (!e) return;
            if (e.jenispelayanan.indexOf('Inap') >= 0) {
              manageServicePhp.getDataTableTransaksi("bpjs/get-ruangan-ri").then(function(data){
                $scope.ruangans = data.data.data;
              })
            } else {
             manageServicePhp.getDataTableTransaksi("bpjs/get-ruangan-rj").then(function(data){
              $scope.ruangans = data.data.data;
            })
             $scope.item.kelasRawat = $scope.kelasRawat[2];
           }
         })
           //   $scope.checkKepesertaanByNoBpjs = function() {
           //      if(!$scope.model.cekNomorPeserta) return;
           //      if ($scope.item.noKepesertaan === '' || $scope.item.noKepesertaan === undefined) return;
           //      $scope.isLoadingNoKartu = true;
           //      manageServicePhp.checkPesertaByNoBpjs($scope.item.noKepesertaan).then(function(e) {
           //          if (e.data.metaData.code === "200") {
           //              var tglLahir = new Date(e.data.response.peserta.tglLahir);
           //              $scope.model.noKepesertaan = $scope.noKartu = e.data.response.peserta.noKartu;
           //              $scope.model.namaPeserta = e.data.response.peserta.nama;
           //              $scope.model.tglLahir = tglLahir;
           //              $scope.model.noIdentitas = e.data.response.peserta.nik;
           //              $scope.model.kelasBridg = {
           //                  id: parseInt(e.data.response.peserta.hakKelas.kode),
           //                  kdKelas: e.data.response.peserta.hakKelas.kode,
           //                  nmKelas: e.data.response.peserta.hakKelas.keterangan,
           //                  namakelas: e.data.response.peserta.hakKelas.keterangan,
           //              };

           //              $scope.item.kelasRawat={idkelas:  $scope.model.kelasBridg.id,namakelas:  $scope.model.kelasBridg.nmKelas}
           //              $scope.kodeProvider = e.data.response.peserta.provUmum.kdProvider;
           //              $scope.namaProvider = e.data.response.peserta.provUmum.nmProvider;
           //              $scope.item.ppkRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;

           //              toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
           //          } else {
           //              window.messageContainer.error(e.data.metaData.message);
           //          }
           //          $scope.isLoadingNoKartu = false;
           //      }, function(err) {
           //          $scope.isLoadingNoKartu = false;
           //      });

           //      var arrKdPpkRUjukan=$scope.model.namaAsalRujukan.split(' - ');
           //      if (arrKdPpkRUjukan!=undefined){
           //         var kdPpkRujukan= arrKdPpkRUjukan[0];
           //         var namaPpkRujukan=arrKdPpkRUjukan[1];
           //     }

           // }


           $scope.jenisPelayanan = [{
            "idjenispelayanan": 1, "jenispelayanan": "Rawat Inap"
          },{
            "idjenispelayanan": 2, "jenispelayanan": "Rawat Jalan"
          }];
          $scope.listTipeRujukan = [{
            "id": 3, "tiperujukan": "Penuh", "value":0
          },{
            "id": 4, "tiperujukan": "Partial", "value":1
          },{
            "id": 5, "tiperujukan": "Rujuk Balik", "value":2
          }];

             // "penjamin": "{penjamin lakalantas -> 1=Jasa raharja PT, 2=BPJS Ketenagakerjaan, 3=TASPEN PT, 4=ASABRI PT} jika lebih dari 1 isi -> 1,2 (pakai delimiter koma)",

             $scope.clear();

             $scope.Save = function(data){
              if($scope.item.noRujukan==undefined){
                $scope.SaveRujukan();
              }else
                 $scope.UpdateRujukan();

             }


             $scope.SaveRujukan=function(){
               var kdiagnosa="";
                if ( $scope.item.diagnosaRujukan!=undefined){
                   kdiagnosa=$scope.item.diagnosaRujukan.kode;
               }
               // var kdpoli="";
               // if ( data.poliTujuan!=undefined){
               //     kdpoli=data.poliTujuan.kdinternal;
               // }
               var kdPpkRujukan="";
               if ($scope.item.faskess!=undefined){
                kdPpkRujukan=$scope.item.faskess.kode
                            // var arrKdPpkRUjukanBrid=$scope.item.faskess.split(' - ');
                            // kdPpkRujukan=arrKdPpkRUjukanBrid[0];
               }
                var kdPolis="";
               if ($scope.item.poli!=undefined){
                kdPolis=$scope.item.poli.kode
                            // var arrKdPoli=$scope.item.poli.split(' - ');
                            // kdPolis=arrKdPoli[0];
               }
                  
               $scope.isRouteLoading = true;
                var dataGen = {
                        nosep:  $scope.item.noSep,
                        tglrujukan:  new moment($scope.item.tglRujukan).format('YYYY-MM-DD'),
                        jenispelayanan: $scope.item.jenisPelayanan.idjenispelayanan,
                        ppkdirujuk: kdPpkRujukan,
                        catatan: $scope.item.catatan,
                        diagnosarujukan: kdiagnosa,
                        polirujukan: kdPolis,//'ANA',//$scope.item.ruangan.kdinternal,
                        tiperujukan: $scope.item.tipeRujukan.value,

                    };
                    manageServicePhp.postRujukan(dataGen).then(function(e) {
                        if(e.data.metaData.code==200){
                          $scope.item.noRujukan=e.data.response.rujukan.noRujukan
                        }
                        document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    }).then(function(){
                        $scope.isRouteLoading = false;
                    })
             }

             $scope.UpdateRujukan=function(){
              var kdiagnosa="";
                if ( $scope.item.diagnosaRujukan!=undefined){
                   kdiagnosa=$scope.item.diagnosaRujukan.kode;
               }
               // var kdpoli="";
               // if ( data.poliTujuan!=undefined){
               //     kdpoli=data.poliTujuan.kdinternal;
               // }
               var kdPpkRujukan="";
               if ($scope.item.faskess!=undefined){
                kdPpkRujukan=$scope.item.faskess.kode
                            // var arrKdPpkRUjukanBrid=$scope.item.faskess.split(' - ');
                            // kdPpkRujukan=arrKdPpkRUjukanBrid[0];
               }
                var kdPolis="";
               if ($scope.item.poli!=undefined){
                kdPolis=$scope.item.poli.kode
                            // var arrKdPoli=$scope.item.poli.split(' - ');
                            // kdPolis=arrKdPoli[0];
               }
                  
               $scope.isRouteLoading = true;
                var dataGen = {
                        norujukan:  $scope.item.noRujukan,
                        tglrujukan:  new moment($scope.item.tglRujukan).format('YYYY-MM-DD'),
                        jenispelayanan: $scope.item.jenisPelayanan.idjenispelayanan,
                        ppkdirujuk: kdPpkRujukan,
                        catatan: $scope.item.catatan,
                        diagnosarujukan: kdiagnosa,
                        polirujukan: kdPolis,//'ANA',//$scope.item.ruangan.kdinternal,
                        tiperujukan: $scope.item.tipeRujukan.value,
                        tipe: $scope.item.tipeRujukan.value,


                    };
                 manageServicePhp.updateRujukan(dataGen).then(function(e) {
                        document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    }).then(function(){
                        $scope.isRouteLoading = false;
                 })
             }

             $scope.hideRujukan=function(){
              $scope.showSEP=false;
            }

            $scope.cariRujukan=function(){  
              $scope.isRouteLoading = true;
              manageServicePhp.cariSep( $scope.item.noSep).then(function(e) {
                if (e.data.metaData.code === "200") {                 
                  var tglLahir = new Date(e.data.response.peserta.tglLahir);
                  $scope.item.pelayanan =e.data.response.jnsPelayanan;
                  $scope.item.tglSep = e.data.response.tglSep;
                  $scope.item.tglLahir = e.data.response.peserta.tglLahir;
                  $scope.item.noKartu =  e.data.response.peserta.noKartu;
                  $scope.item.nama =e.data.response.peserta.nama;
                  $scope.item.hakKelas=e.data.response.peserta.hakKelas;
                  $scope.item.diagnosa=e.data.response.diagnosa;
                  $scope.item.jk= e.data.response.peserta.kelamin;
                  $scope.isRouteLoading=false;
                  $scope.showSEP=true;
                  toastr.info(e.data.metaData.message,'Information');    
                            // document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                          } else{
                            $scope.isRouteLoading=false;
                            toastr.warning(e.data.metaData.message,'Warning');
                          }

                        })
            }
            manageServicePhp.getDataTableTransaksi("bpjs/get-ref-ruangrawat"
             )         
            .then(function (e) {
              if(e.data.metaData.code==200){
               $scope.listRuang=e.data.response.list;   
             }
           })    
            manageServicePhp.getDataTableTransaksi("bpjs/get-ref-kelasrawat"
             )         
            .then(function (e) {
              if(e.data.metaData.code==200){
               $scope.listKelas=e.data.response.list;   
             }      

           })
            $scope.getFaskess=function(){
              if ($scope.item.faskess.length >=3){
                manageServicePhp.getDataTableTransaksi("bpjs/get-ref-faskes?kdNamaFaskes="
                  +$scope.item.faskess
                  +"&jenisFakses="
                  +"2"
                  )         
                .then(function (e) {
                  if(e.data.metaData.code==200){
                    var result=e.data.response.faskes;
                    for (var x=0 ;x< result.length;x++){
                     var element =result[x];
                     element.nama = element.kode + ' - ' + element.nama   
                   }
                   $scope.listFaskess=result;   
                 }

                 document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
               })
              }
            }
            $scope.getPoli=function(){
              if ($scope.item.poli.length >=3){
                manageServicePhp.getDataTableTransaksi("bpjs/get-poli?kodeNamaPoli="
                  +$scope.item.poli
                  )         
                .then(function (e) {
                  if(e.data.metaData.code==200){
                   var result=e.data.response.poli;
                   for (var x=0 ;x< result.length;x++){
                     var element =result[x];
                     element.nama = element.kode + ' - ' + element.nama   
                   }
                   $scope.listPoli=result;   
                 }      
                 document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
               })
              }       
            }

          }
          ]);
})