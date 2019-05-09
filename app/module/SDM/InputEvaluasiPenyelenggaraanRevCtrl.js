define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputEvaluasiPenyelenggaraanRevCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem, TipeKeanggotaan, TipeKoleksi, PeriodePinjaman, $state, ManageSdm, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;								
			$scope.isRouteLoading=false;
            $scope.item={};
            $scope.titlePengkajian = "Detail Penilaian Evaluasi Narasumber";
            var NorecEvaluasiNarasumber = "";
            var NorecPlanning = "";
            var noOrder = "";
            var data1=0;
            var data2=0;
            var data3=0;
            var data4=0;
            var data5=0;
            var data6=0;
            var data7=0;
            var data8=0;
            var data9=0;
            var data10=0;
            var data11=0;
            var data12=0;
            var data13=0;
            var data14=0;
            var totalRekap=0;
            loadDataCombo();
            LoadCache();          
           	
        function loadDataCombo(){
          	$scope.item.TglEvaluasi= moment($scope.now).format('YYYY-MM-DD HH:mm')			
            manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
              	$scope.ListJenisPelatihan=dat.data.jenispelatihan;
                $scope.listNarasumber=dat.data.narasumber;
            });
                $scope.item.EfektifitasPenyelenggaraan = 0;
                $scope.item.Persiapan = 0;
                $scope.item.HubunganPeserta = 0;
                $scope.item.HubunganAntarPeserta = 0;
                $scope.item.Kebersihan = 0;
                $scope.item.KebersihanToilet = 0;
                $scope.item.Diterapkan =0;           
		}	

		    function LoadCache(){
               var chacePeriode = cacheHelper.get('InputEvaluasiPenyelenggaraanRevCtrl');
                if(chacePeriode != undefined){

                   NorecEvaluasiNarasumber = chacePeriode[0]
                   noOrder = chacePeriode[1]

                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('InputEvaluasiPenyelenggaraanRevCtrl', chacePeriode);
               }else{               	
               	 init();
               }
            }

             function init(){				
				if (noOrder != '') {
			   		if (noOrder == 'EditEvaluasi') {
  			   			manageServicePhp.getDataTableTransaksi("sdm-pelatihan-penyelenggara/get--data-detail-evaluasi-penyelenggara?norecOrder="+NorecEvaluasiNarasumber, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            var data_head = data_ih.data.head[0];
                            NorecEvaluasiNarasumber = data_head.norec;
              							$scope.item.TglEvaluasi = data_head.tglevaluasi;
              							$scope.item.NamaFasilitator = data_head.fasilitator;
              							$scope.item.Materi = data_head.materi;
              							// $scope.item.MateriPelatihan = data_head.keteranganpelatihan;
              							// $scope.item.FasilitatorPelatihan = data_head.manfaatfasilitator;
              							$scope.item.Saran = data_head.saran;
              							// $scope.item.ManfaatPelatihan = data_head.manfaatpelatihan;
                                        $scope.item.NamaPenyelenggara = data_head.penyelenggara;
                            $scope.item.Narasumber = {id: data_head.narasumberfk, namalengkap: data_head.narasumber}
                            
                            $scope.item.EfektifitasPenyelenggaraan = data_head.efektivitaspenyelenggaraan;
                            $scope.item.Persiapan = data_head.persiapan;
                            $scope.item.HubunganPeserta = data_head.hubunganpeserta;
                            $scope.item.HubunganAntarPeserta = data_head.hubunganantarpeserta;
                            $scope.item.Kebersihan = data_head.kebersihan;
                            $scope.item.KebersihanToilet = data_head.kebersihantoilet;
                            $scope.item.Diterapkan = data_head.dapatditerapkanklinik; 
                        });
			   		}else if (noOrder == 'EvaluasiPenyelenggara') {
                        manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-detail-pengajuan-pelatihan?norecOrder="+NorecEvaluasiNarasumber, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            var data_head = data_ih.data.head[0];
                            NorecPlanning = data_head.norec;
                            NorecEvaluasiNarasumber='';
                            $scope.item.Narasumber = {id: data_head.narasumberfk, namalengkap: data_head.narasumber}
                            $scope.item.NamaFasilitator = data_head.deskripsiplanning;
                            $scope.item.Materi = data_head.namaplanning;
                        });
                    }
				}        

			};
                   

            $scope.$watch('item.EfektifitasPenyelenggaraan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {                                    
                    data1=parseFloat($scope.item.EfektifitasPenyelenggaraan);                    
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Persiapan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.EfektifitasPenyelenggaraan);                    
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.HubunganPeserta', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                     data1=parseFloat($scope.item.EfektifitasPenyelenggaraan);                    
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.HubunganAntarPeserta', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.EfektifitasPenyelenggaraan);                    
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Kebersihan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.KebersihanToilet', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.EfektifitasPenyelenggaraan);                    
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Diterapkan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.EfektifitasPenyelenggaraan);                    
                    data2=parseFloat($scope.item.Persiapan);
                    data3=parseFloat($scope.item.HubunganPeserta);
                    data4=parseFloat($scope.item.HubunganAntarPeserta);
                    data5=parseFloat($scope.item.Kebersihan);
                    data6=parseFloat($scope.item.KebersihanToilet);
                    data7=parseFloat($scope.item.Diterapkan);                    
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7)/7;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });
            

            $scope.$watch('item.Rekapitulasi', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    var KeteranganRekapitulasi =  $scope.item.Rekapitulasi
                    if ($scope.item.Rekapitulasi <= 55) {
                      $scope.item.KeteranganRekapitulasi= "Kurang"
                    }else if ($scope.item.Rekapitulasi <= 75) {
                      $scope.item.KeteranganRekapitulasi= "Sedang"
                    }else if ($scope.item.Rekapitulasi <= 86) {
                      $scope.item.KeteranganRekapitulasi= "Baik"
                    }else if ($scope.item.Rekapitulasi > 86) {
                      $scope.item.KeteranganRekapitulasi= "Sangat Baik"
                    }
                }
            });


            function ClearAll(){
                $scope.item = {};
                $scope.arrParameter = [];
                scope.item.EfektifitasPenyelenggaraan = 0;
                $scope.item.Persiapan = 0;
                $scope.item.HubunganPeserta = 0;
                $scope.item.HubunganAntarPeserta = 0;
                $scope.item.Kebersihan = 0;
                $scope.item.KebersihanToilet = 0;
                $scope.item.Diterapkan = 0; 
            };

            $scope.reset = function(){				 		
      				ClearAll();
      			};

      			$scope.Save = function() {	      				
              if ($scope.item.TglEvaluasi == undefined) {
                  alert("Tgl Evaluasi Tidak Boleh Kosong!")
                  return;
              };

              if ($scope.item.NamaFasilitator == undefined) {
                  alert("Nama Fasilitator Tidak Boleh Kosong!")
                  return;
              };

              if ($scope.item.Materi == undefined) {
                  alert("Materi Tidak Boleh Kosong!")
                  return;
              };
             
              if ($scope.item.NamaPenyelenggara == undefined) {
                  alert("Penyelenggara tidak boleh kosong!")
                  return;
              };
              

              if ($scope.item.Saran == undefined) {
                  alert("Saran Tidak Boleh Kosong!")
                  return;
              };

              if ($scope.item.Narasumber == undefined) {
                  alert("Narasumber Tidak Boleh Kosong!")
                  return;
              };

                var listRawRequired = [
                    "item.EfektifitasPenyelenggaraan|k-ng-model|Efektifitas Penyelenggaraan",
                    "item.Diterapkan|k-ng-model|Dapat Diterapkan Diklinik/ Tempat Tugas",
                    "item.Persiapan|k-ng-model|Persiapan dan Ketersediaan Sarana Kegiatan",
                    "item.HubunganPeserta|k-ng-model|Hubungan Peserta dengan Penyelenggara Kegiatan",
                    "item.HubunganAntarPeserta|k-ng-model|Hubungan Antar Peserta",
                    "item.Kebersihan|k-ng-model|Kebersihan dan Kenyamanan Ruang Kelas", 
                    "item.KebersihanToilet|k-ng-model|Kebersihan Toilet",                         
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                  var data = 
                  {
                    "norec":NorecEvaluasiNarasumber,
                    "norecplanning":NorecPlanning,
                    "tglevaluasi": moment($scope.item.TglEvaluasi).format('YYYY-MM-DD HH:mm'),
                    "fasilitator": $scope.item.NamaFasilitator,
                    "materi": $scope.item.Materi,                    
                    "saran": $scope.item.Saran,
                    "narasumberfk": $scope.item.Narasumber.id,
                    "penyelenggara": $scope.item.NamaPenyelenggara,
                    "totalnilai": $scope.item.Rekapitulasi,

                    // nu diPake
                    "efektivitaspenyelenggaraan":$scope.item.EfektifitasPenyelenggaraan,
                    "dapatditerapkanklinik":$scope.item.Diterapkan,
                    "persiapan":$scope.item.Persiapan,
                    "hubunganpeserta":$scope.item.HubunganPeserta,
                    "hubunganantarpeserta":$scope.item.HubunganAntarPeserta,
                    "kebersihan":$scope.item.Kebersihan,
                    "kebersihantoilet":$scope.item.KebersihanToilet,                   
                    // End nu diPake
                  };

                  var objSave = {
                      data: data,
                  }

                  manageServicePhp.saveevaluasipenyelenggara(objSave).then(function (e) {
                      ClearAll();
                  });

                } else {
                    ModelItem.showMessages(isValid.messages);
                }
          };
    }
	]);
});