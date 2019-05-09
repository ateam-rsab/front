define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('UpdateSepRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien','ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien ,manageServicePhp) {
            $scope.isRouteLoading = true;
              $scope.model={}; 
              var isRawatInap='';
              $scope.clear = function(){
                $scope.now = new Date();
                var tanggals = DateHelper.getDateTimeFormatted3($scope.now);
                $scope.item = {
                    tglSep: $scope.now,
                    // tglRujukan: tanggals + " 00:00",
                         
                  
                };
                 $scope.item.tglRujukan  = tanggals + " 00:00";  
                $scope.item.asalRujukan = $scope.asalRujukan[1];
                $scope.item.jenisPelayanan = $scope.jenisPelayanan[0];
                $scope.item.kelasRawat = $scope.kelasRawat[0];
                $scope.item.lakaLantas = $scope.lakaLantas[1];
                $scope.item.poliEksekutif = $scope.poliEksekutif[1];
                $scope.model.cekNomorPeserta=true;    
                $scope.isRouteLoading = false;
            };

             $scope.checkKepesertaanByNoSep = function() {
                if(!$scope.model.cekNomorSep) return;
                if ($scope.item.noSep === '' || $scope.item.noSep === undefined) return;
                $scope.isLoadingNoKartu = true;
                      manageServicePhp.cariSep($scope.item.noSep).then(function(e) {
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
                                
                             $scope.item.kelasRawat={idkelas:  $scope.model.kelasBridg.id,namakelas:  $scope.model.kelasBridg.nmKelas}
                                $scope.kodeProvider = e.data.response.peserta.provUmum.kdProvider;
                                $scope.namaProvider = e.data.response.peserta.provUmum.nmProvider;
                                $scope.item.ppkRujukan = $scope.kodeProvider + " - " + $scope.namaProvider;
                            
                               toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
                            } else {
                                window.messageContainer.error(e.data.metaData.message);
                            }
                            $scope.isLoadingNoKartu = false;
                        }, function(err) {
                            $scope.isLoadingNoKartu = false;
                        });

             var arrKdPpkRUjukan=$scope.model.namaAsalRujukan.split(' - ');
                if (arrKdPpkRUjukan!=undefined){
                     var kdPpkRujukan= arrKdPpkRUjukan[0];
                     var namaPpkRujukan=arrKdPpkRUjukan[1];
                }

            }
            $scope.checkKepesertaanByNoReg = function() {
                if(!$scope.model.cekNoRegistrasi) return;
                if ($scope.item.noRegistrasi === '' || $scope.item.noRegistrasi === undefined) return;
                $scope.isLoadingNoReg = true;
                      manageServicePhp.getDataTableTransaksi("bpjs/get-sep-bynoregistrasi?noRegistrasi="
                        + $scope.item.noRegistrasi)         
                            .then(function (dat) {
                                $scope.item.noSep = dat.data.data[0].nosep;
                                $scope.item.noRujukan= dat.data.data[0].norujukan;
                                var tglRujukan=new Date(dat.data.data[0].tglrujukan)
                                $scope.item.tglRujukan= tglRujukan;
                                $scope.item.noCm= dat.data.data[0].nocm;
                                $scope.item.ppkRujukan = dat.data.data[0].kdprovider+ " - " +dat.data.data[0].nmprovider;
                                // $scope.item.ppkRujukan=dat.data.data[0].nmprovider;
                                $scope.item.kdPpkRujukan=dat.data.data[0].kdprovider;
                             
                                if (dat.data.data[0].israwatinap=='true'){
                                     isRawatInap='true';
                                     $scope.item.jenisPelayanan = $scope.jenisPelayanan[0];
                                }else{
                                    isRawatInap='false';
                                     $scope.item.jenisPelayanan = $scope.jenisPelayanan[1];
                                }
                               
                                $scope.ruangans=([{id:dat.data.data[0].objectruanganlastfk,namaruangan:dat.data.data[0].namaruangan}])
                                $scope.item.poliTujuan={id:dat.data.data[0].objectruanganlastfk,
                                    namaruangan:dat.data.data[0].namaruangan,
                                    kdinternal:dat.data.data[0].kdinternal};
                                if (dat.data.data[0].jenispelayanan=="REGULER"){
                                    $scope.item.poliEksekutif=$scope.poliEksekutif[1]
                                }else{
                                      $scope.item.poliEksekutif=$scope.poliEksekutif[0]
                                }   
                                // $scope.item.poliEksekutif={value:parseInt(dat.data.data[0].objectjenispelayananfk),eks:dat.data.data[0].jenispelayanan}
                             
                               if(dat.data.data[0].namakelas=='Kelas I'){
                                  $scope.item.kelasRawat=$scope.kelasRawat[0];
                               }else if(dat.data.data[0].namakelas=='Kelas II'){
                                  $scope.item.kelasRawat=$scope.kelasRawat[1];
                               }else if(dat.data.data[0].namakelas=='Kelas III'){
                                  $scope.item.kelasRawat=$scope.kelasRawat[2];
                               }else{
                                 $scope.item.kelasRawat=$scope.kelasRawat[2];
                               }
                              
                                $scope.item.diagnosa=dat.data.data[0].kddiagnosa;
                                $scope.item.noTelp=dat.data.data[0].notelepon
                                // $scope.item.lakaLantas={id:dat.data.kelas[9].id,namakelas:dat.data.kelas[9].namakelas}
                                // toastr.info(e.data.response.peserta.statusPeserta.keterangan,'Status Peserta');
                            // } else {
                            //     window.messageContainer.error(e.data.metaData.message);
                            // }
                            $scope.isLoadingNoReg = false;
                        }, function(err) {
                            $scope.isLoadingNoReg = false;
                        });

            }

            $scope.jenisPelayanan = [{
                "idjenispelayanan": 1, "jenispelayanan": "Rawat Inap"
            },{
                "idjenispelayanan": 2, "jenispelayanan": "Rawat Jalan"
            }];
            $scope.kelasRawat = [{
                "idkelas": 3, "namakelas": "Kelas I", "value":1
            },{
                "idkelas": 4, "namakelas": "Kelas II", "value":2
            },{
                "idkelas": 5, "namakelas": "Kelas III", "value":3
            }];
            $scope.lakaLantas = [{
                "idlakalantas": 6, "lakalantas": "Ya", "value":1
            },{
                "idlakalantas": 7, "lakalantas": "Tidak", "value":0
            }];
            $scope.asalRujukan = [{
                "idasalrujukan": 8, "asalrujukan": "Faskes 1", "value":1
            },{
                "idasalrujukan": 9, "asalrujukan": "Faskes 2 (RS)", "value":2
            }];
            $scope.poliEksekutif = [{
                "id": 10, "eks": "EKSEKUTIF", "value":0
            },{
                "id": 11, "eks": "REGULER", "value":1
            }];

             // "penjamin": "{penjamin lakalantas -> 1=Jasa raharja PT, 2=BPJS Ketenagakerjaan, 3=TASPEN PT, 4=ASABRI PT} jika lebih dari 1 isi -> 1,2 (pakai delimiter koma)",
     
            $scope.penjamin = [{
                "id": 12, "name": "Jasa Raharja PT", "value":1
            },{
                "id": 13, "name": "BPJS Ketenagakerjaan", "value":2
            },{
                "id": 14, "name": "TASPEN PT", "value":3
            },{
                "id": 15, "name": "ASABRI PT", "value":4
            }];

            $scope.currentListPenjamin=[];
           $scope.addListPenjamin = function(data) {
                var index = $scope.currentListPenjamin.indexOf(data);
                if (_.filter($scope.currentListPenjamin, {
                        id: data.id
                    }).length === 0)
                    $scope.currentListPenjamin.push(data);
                else {
                    $scope.currentListPenjamin.splice(index, 1);
                }
                
            }
            $scope.clear();
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
            $scope.$watch('item.lakaLantas', function(e){
                if (!e) return;
                if (e.lakalantas.indexOf('Ya') >= 0) {
                    $scope.LakaYa=true;
                    $scope.disableLokasi = false;
                    $scope.item.lokasiLaka = undefined;
                } else {
                    $scope.LakaYa=false;
                    $scope.disableLokasi = true;
                }
            })
      
                
            $scope.generateSep = function(data){
                var listRawRequired = [
                    "item.noCm|ng-model|Nomor CM",
                    // "item.noKartu|ng-model|Nomor kartu",
                    "item.tglSep|k-ng-model|Tanggal Sep",
                    // "item.noRujukan|ng-model|Nomor Rujukan",
                    "item.tglRujukan|k-ng-model|Tanggal Rujukan",
                    // "item.jenisPelayanan|ng-model|Jenis Pelayanan",
                    "item.poliTujuan|k-ng-model|Poli Tujuan",
                    "item.diagnosa|ng-model|Diagnosa Awal",
                    // "item.kelasRawat|ng-model|Kelas Rawat",
                    // "item.lakaLantas|ng-model|Laka Lantas",
                ];
                var kdPoli="";
                // if (isRawatInap=='false'){
                    if ($scope.item.poliTujuan!=undefined){
                        if($scope.item.poliTujuan.kdinternal!=null){

                         kdPoli=$scope.item.poliTujuan.kdinternal;
                        }else
                        kdPoli=""

                    }
                // }else{
                //     kdPoli="";
                // }
               
                if ($scope.item.lakaLantas.value == 1){
                    var a = ""
                    var b = ""
                    for (var i =  $scope.currentListPenjamin.length - 1; i >= 0; i--) {
                        var c = $scope.currentListPenjamin[i].value
                        b = ","+ c
                        a = a + b
                    }
                    var listPenjamin = a.slice(1, a.length)
                    
                }
                 var kdPpkRujukan="";
                    if($scope.model.faskesRujukan==true){
                        if ($scope.model.namaAsalRujukanBrid!=undefined){
                            var arrKdPpkRUjukanBrid=$scope.model.namaAsalRujukanBrid.split(' - ');
                            kdPpkRujukan=arrKdPpkRUjukanBrid[0];
                        }
                    }else{
                        if ($scope.model.namaAsalRujukan!=undefined){
                            var arrKdPpkRUjukan=$scope.model.namaAsalRujukan.split(' - ');
                            kdPpkRujukan=arrKdPpkRUjukan[0];
                         }
                    }
              
               
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true;
                      var datazz = {
                        nosep:  $scope.item.noSep===undefined ? "" :$scope.item.noSep,
                        tglsep:  new moment($scope.item.tglSEP).format('YYYY-MM-DD'),
                        jenispelayanan: $scope.item.jenisPelayanan.idjenispelayanan ,
                        // kelasrawat: $scope.model.rawatInap === true ? kelasJaminan : "3":,
                        kelasrawat: $scope.item.kelasRawat.value,
                        nomr: $scope.item.noCm,
                        asalrujukan: $scope.item.asalRujukan.value,
                        tglrujukan:  new moment($scope.item.tglRujukan).format('YYYY-MM-DD'),
                        norujukan: $scope.item.noRujukan === undefined ? 0 : $scope.item.noRujukan,
                        ppkrujukan: kdPpkRujukan,//$scope.item.kdPpkRujukan===undefined ? 0 : $scope.item.kdPpkRujukan,
                        catatan: $scope.item.catatan ==undefined ? "" : $scope.item.catatan,
                        kddiagnosaawal: $scope.item.diagnosa,
                        politujuan: kdPoli,//'ANA',//$scope.item.ruangan.kdinternal,
                        eksekutif: $scope.item.poliEksekutif.value,
                        cob: "0",
                        lakalantas:  $scope.model.lakalantas === true ? "1" : "0",
                        penjamin:  listPenjamin ,
                        lokasilaka: $scope.item.lokasiLaka===undefined ? "" : $scope.item.lokasiLaka,
                        notelp: $scope.item.noTelp===undefined ? "" : $scope.item.noTelp,
                    
                    };
                
                    manageServicePhp.updateSEP(datazz).then(function(e) {
                        document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    }).then(function(){
                        $scope.isRouteLoading = false;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }


   $scope.getPpkRujukan=function(){
            if ($scope.model.namaAsalRujukanBrid.length >=3){
                  manageServicePhp.getDataTableTransaksi("bpjs/get-ref-faskes?kdNamaFaskes="
                    +$scope.model.namaAsalRujukanBrid
                    +"&jenisFakses="
                    +"2"

                   )         
                  .then(function (e) {
                    if(e.statResponse){
                       if(e.data.metaData.code==200){
                            var result=e.data.response.faskes;
                            for (var x=0 ;x< result.length;x++){
                                var element =result[x];
                                element.nama = element.kode + ' - ' + element.nama   
                            }
                         $scope.listPpkRujukan=result;   
                        }
                    }
                    
                  })
            }
        }

        }
    ]);
});