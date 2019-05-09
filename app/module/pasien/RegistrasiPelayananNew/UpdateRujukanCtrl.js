define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('UpdateRujukanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'ModelItemAkuntansi','FindPasien','ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien,modelItemAkuntansi, findPasien ,manageServicePhp) {
            $scope.isRouteLoading = true;
              $scope.model={};
            $scope.clear = function(){
                $scope.now = new Date();
                var tanggals = DateHelper.getDateTimeFormatted3($scope.now);
                $scope.item = {
                    tglSep: $scope.now,
                    // tglRujukan: tanggals + " 00:00",
                         
                  
                };
                 $scope.item.tglRujukan  = tanggals + " 00:00";  
                $scope.item.jenisPelayanan = $scope.jenisPelayanan[0]; 
                $scope.isRouteLoading = false;
            };
             modelItemAkuntansi.getDataDummyPHP("bpjs/get-diagnosa-saeutik", true, true, 10).then(function(data) {
                      $scope.listDiagnosa = data;
                    
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
             $scope.checkNoRujukanPeserta = function() {
                if(!$scope.model.cekNoRujukan) return;
                if ($scope.item.noRujukan === '' || $scope.item.noRujukan === undefined) return;
                $scope.isLoadingNoKartu = true;
                      manageServicePhp.checkPesertaByNoRujukanRs($scope.item.noRujukan).then(function(e) {
                            if (e.data.metaData.code === "200") {
                                var tglLahir = new Date(e.data.response.peserta.tglLahir);
                                $scope.model.noRujukan = $scope.noKartu = e.data.response.peserta.noKartu;
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
           
      
                
            $scope.generateSep = function(data){
                    var kdiagnosa="";
                    if ( data.diagnosaRujukan!=undefined){
                     kdiagnosa=data.diagnosaRujukan.kddiagnosa;
                    }
                    var kdpoli="";
                    if ( data.poliTujuan!=undefined){
                     kdpoli=data.poliTujuan.internal;
                    }
            
            
                    $scope.isRouteLoading = true;
                      var dataGen = {
                        nosep:  data.noSep,
                        tglrujukan:  new moment(data.tglRujukan).format('YYYY-MM-DD'),
                        jenispelayanan: data.jenisPelayanan.idjenispelayanan,
                        ppkdirujuk: data.ppkDirujuk,
                        catatan: data.catatan,
                        diagnosarujukan: kdiagnosa,
                        polirujukan: kdpoli,//'ANA',//$scope.item.ruangan.kdinternal,
                        tiperujukan: data.tipeRujukan.value,
                    
                    };
                    manageServicePhp.postRujukan(dataGen).then(function(e) {
                        document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                    }).then(function(){
                        $scope.isRouteLoading = false;
                    })
             
                
            }
        }
    ]);
})