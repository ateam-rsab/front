define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputEvaluasiNarasumberCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem, TipeKeanggotaan, TipeKoleksi, PeriodePinjaman, $state, ManageSdm, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;								
			$scope.isRouteLoading=false;
            $scope.item={};
            $scope.titlePengkajian = "Detail Penilaian Evaluasi Narasumber";
            var NorecEvaluasiNarasumber = "";
            var NorecPlanning = "";
            var noOrder = "";
            $scope.arrParameter = [];
            $scope.currentPenguasaanMateri=[];
            $scope.currentKetetapanWaktu=[];
            $scope.currentSistematikaPenyajian=[];
            $scope.currentMetode=[];
            $scope.currentEmpati=[];
            $scope.currentBahasa =[];
            $scope.currentMotivasi =[];
            $scope.currentIsiMateri=[];
            $scope.currentPenyajianMateri=[];
            $scope.currentDiterapkan=[];
            $scope.currentTanyaJawab=[];
            $scope.currentPembelajaran=[];
            $scope.currentFasilitator=[];
            $scope.currentKerjasama=[];
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
            // $scope.arrParameterRawatInap = [];
            loadDataCombo();
            LoadCache();          
           	
        function loadDataCombo(){
          	$scope.item.TglEvaluasi= moment($scope.now).format('YYYY-MM-DD HH:mm')			
            manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
              	$scope.ListJenisPelatihan=dat.data.jenispelatihan;
                $scope.listNarasumber=dat.data.narasumber;
            });
            $scope.item.PenguasaanMateri = 0;
            $scope.item.KetepatanWaktu = 0;
            $scope.item.SistematikaPenyajian = 0;
            $scope.item.PenggunaanMetode = 0;
            $scope.item.Empati = 0;
            $scope.item.PenggunaanBahasa = 0;
            $scope.item.PemberianMotivasi =0;
            $scope.item.IsiMateri=0;
            $scope.item.PenyajianMateri=0;
            $scope.item.Diterapkan =0;
            $scope.item.Kesempatan =0;
            $scope.item.Pembelajaran =0;
            $scope.item.Fasilitator =0;
            $scope.item.Kerjasama =0;
            $scope.item.Rekapitulasi=0;
		    }	

		    function LoadCache(){
               var chacePeriode = cacheHelper.get('InputEvaluasiNarasumberCtrl');
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
                    cacheHelper.set('InputEvaluasiNarasumberCtrl', chacePeriode);
               }else{               	
               	 init();
               }
            }

             function init(){				
				if (noOrder != '') {
			   		if (noOrder == 'EditEvaluasi') {
			   			manageServicePhp.getDataTableTransaksi("sdm-pelatihan-narasumber/get-detail-evaluasi-narasumber-kompetensi?norecOrder="+NorecEvaluasiNarasumber, true).then(function(data_ih){
                $scope.isRouteLoading=false;
                var data_head = data_ih.data.head[0];
                NorecEvaluasiNarasumber = data_head.norec;
  							$scope.item.TglEvaluasi = data_head.tglevaluasi;
  							$scope.item.NamaFasilitator = data_head.fasilitator;
  							$scope.item.Materi = data_head.materi;
  							$scope.item.MateriPelatihan = data_head.keteranganpelatihan;
  							$scope.item.FasilitatorPelatihan = data_head.manfaatfasilitator;
  							$scope.item.SaranPelatihan = data_head.saran;
  							$scope.item.ManfaatPelatihan = data_head.manfaatpelatihan;
                $scope.item.Narasumber = {id: data_head.narasumberfk, namalengkap: data_head.narasumber}
                $scope.item.PenguasaanMateri = data_head.penguasaanmateri;
                $scope.item.KetepatanWaktu = data_head.ketepatanwaktu;
                $scope.item.SistematikaPenyajian = data_head.sistematikapenyajian;
                $scope.item.PenggunaanMetode = data_head.penggunaanmetodedanalatbantu;
                $scope.item.Empati = data_head.empati ;
                $scope.item.PenggunaanBahasa = data_head.penggunaanbahasa ;
                $scope.item.PemberianMotivasi = data_head.pemberianmotivasi;
                $scope.item.IsiMateri=data_head.isimateri;
                $scope.item.PenyajianMateri=data_head.penyajianmateri;
                $scope.item.Diterapkan =data_head.dapatditerapkanklinik;
                $scope.item.Kesempatan =data_head.kesempatantanyajawab;
                $scope.item.Pembelajaran =data_head.pencapaiantujuanpembelajaran;
                $scope.item.Fasilitator =data_head.penampilanfasilitator;
                $scope.item.Kerjasama =data_head.kerjasamaantartimpengajar;


							// if (data_head.penguasaanmateri !='' || data_head.penguasaanmateri != null){
           //                           var penguasaanmateri= data_head.penguasaanmateri.split(',')
           //                           penguasaanmateri.forEach(function(data){
           //                              $scope.listPenguasaanMateri.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentPenguasaanMateri.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.ketepatanwaktu !='' || data_head.ketepatanwaktu != null){
           //                           var ketepatanwaktu= data_head.ketepatanwaktu.split(',')
           //                           ketepatanwaktu.forEach(function(data){
           //                              $scope.listKetetapanWaktu.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentKetetapanWaktu.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.sistematikapenyajian !='' || data_head.sistematikapenyajian != null){
           //                           var sistematikapenyajian= data_head.sistematikapenyajian.split(',')
           //                           sistematikapenyajian.forEach(function(data){
           //                              $scope.listSistematikaPenyajian.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentSistematikaPenyajian.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.penggunaanmetodedanalatbantu !='' || data_head.penggunaanmetodedanalatbantu != null){
           //                           var penggunaanmetodedanalatbantu= data_head.penggunaanmetodedanalatbantu.split(',')
           //                           penggunaanmetodedanalatbantu.forEach(function(data){
           //                              $scope.listMetode.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentMetode.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.empati !='' || data_head.empati != null){
           //                           var empati= data_head.empati.split(',')
           //                           empati.forEach(function(data){
           //                              $scope.listEmpati.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentEmpati.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.penggunaanbahasa !='' || data_head.penggunaanbahasa != null){
           //                           var penggunaanbahasa= data_head.penggunaanbahasa.split(',')
           //                           penggunaanbahasa.forEach(function(data){
           //                              $scope.listBahasa.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentBahasa.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.pemberianmotivasi !='' || data_head.pemberianmotivasi != null){
           //                           var pemberianmotivasi= data_head.pemberianmotivasi.split(',')
           //                           pemberianmotivasi.forEach(function(data){
           //                              $scope.listMotivasi.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentMotivasi.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.isimateri !='' || data_head.isimateri != null){
           //                           var isimateri= data_head.isimateri.split(',')
           //                           isimateri.forEach(function(data){
           //                              $scope.listIsiMateri.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentIsiMateri.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.penyajianmateri !='' || data_head.penyajianmateri != null){
           //                           var penyajianmateri= data_head.penyajianmateri.split(',')
           //                           penyajianmateri.forEach(function(data){
           //                              $scope.listPenyajianMateri.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentPenyajianMateri.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.dapatditerapkanklinik !='' || data_head.dapatditerapkanklinik != null){
           //                           var dapatditerapkanklinik= data_head.dapatditerapkanklinik.split(',')
           //                           dapatditerapkanklinik.forEach(function(data){
           //                              $scope.listDiterapkan.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentDiterapkan.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.kesempatantanyajawab !='' || data_head.kesempatantanyajawab != null){
           //                           var kesempatantanyajawab= data_head.kesempatantanyajawab.split(',')
           //                           kesempatantanyajawab.forEach(function(data){
           //                              $scope.listTanyaJawab.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentTanyaJawab.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.pencapaiantujuanpembelajaran !='' || data_head.pencapaiantujuanpembelajaran != null){
           //                           var pencapaiantujuanpembelajaran= data_head.pencapaiantujuanpembelajaran.split(',')
           //                           pencapaiantujuanpembelajaran.forEach(function(data){
           //                              $scope.listPembelajaran.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentPembelajaran.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.penampilanfasilitator !='' || data_head.penampilanfasilitator != null){
           //                           var penampilanfasilitator= data_head.penampilanfasilitator.split(',')
           //                           penampilanfasilitator.forEach(function(data){
           //                              $scope.listFasilitator.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentFasilitator.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };

           //                      if (data_head.kerjasamaantartimpengajar !='' || data_head.kerjasamaantartimpengajar != null){
           //                           var kerjasamaantartimpengajar= data_head.kerjasamaantartimpengajar.split(',')
           //                           kerjasamaantartimpengajar.forEach(function(data){
           //                              $scope.listKerjasama.forEach(function(e){                                        
           //                                  for (let i in e.detail){
           //                                      if(e.detail[i].id ==data){
           //                                           e.detail[i].isChecked = true
           //                                          var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
           //                                          "value": e.detail[i].id,
           //                                        }  
           //                                          $scope.currentKerjasama.push(dataid)
           //                                      }
           //                                  }
           //                              })
           //                          })
           //                      };


                });
			   		}else if (noOrder == 'EvaluasiNarasumber') {
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-detail-pengajuan-pelatihan?norecOrder="+NorecEvaluasiNarasumber, true).then(function(data_ih){
                    $scope.isRouteLoading=false;
                    var data_head = data_ih.data.head[0];
                    NorecPlanning = data_head.norec;
                    NorecEvaluasiNarasumber='';
                    $scope.item.Narasumber = {id: data_head.narasumberfk, namalengkap: data_head.narasumber}
                    $scope.item.NamaFasilitator = data_head.deskripsiplanning;
                    $scope.item.Materi = data_head.namaplanning;

                    // $scope.item.TglEvaluasi = data_head.tglevaluasi;                                        
                    // $scope.item.MateriPelatihan = data_head.keteranganpelatihan;
                    // $scope.item.FasilitatorPelatihan = data_head.manfaatfasilitator;
                    // $scope.item.SaranPelatihan = data_head.saran;
                    // $scope.item.ManfaatPelatihan = data_head.manfaatpelatihan;                    
                    // $scope.item.PenguasaanMateri = data_head.penguasaanmateri;
                    // $scope.item.KetepatanWaktu = data_head.ketepatanwaktu;
                    // $scope.item.SistematikaPenyajian = data_head.sistematikapenyajian;
                    // $scope.item.PenggunaanMetode = data_head.penggunaanmetodedanalatbantu;
                    // $scope.item.Empati = data_head.empati ;
                    // $scope.item.PenggunaanBahasa = data_head.penggunaanbahasa ;
                    // $scope.item.PemberianMotivasi = data_head.pemberianmotivasi;
                    // $scope.item.IsiMateri=data_head.isimateri;
                    // $scope.item.PenyajianMateri=data_head.penyajianmateri;
                    // $scope.item.Diterapkan =data_head.dapatditerapkanklinik;
                    // $scope.item.Kesempatan =data_head.kesempatantanyajawab;
                    // $scope.item.Pembelajaran =data_head.pencapaiantujuanpembelajaran;
                    // $scope.item.Fasilitator =data_head.penampilanfasilitator;
                    // $scope.item.Kerjasama =data_head.kerjasamaantartimpengajar;
                });
            }
				}        

			};

            // $scope.listPenguasaanMateri=[
            //     {
            //     	"id":1,
            //     	"nama":"Penguasaan Materi",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang"},
            //     		{"id":2,"nama":"Cukup"},
            //     		{"id":3,"nama":"Baik"},
            //     		{"id":4,"nama":"Sangat Baik"},
            //     	]
            //     }
            // ];

            // $scope.listKetetapanWaktu=[
            //     {
            //     	"id":2,
            //     	"nama":"Ketetapan Waktu",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang "},
            //     		{"id":2,"nama":"Cukup "},
            //     		{"id":3,"nama":"Baik "},
            //     		{"id":4,"nama":"Sangat Baik "},
            //     	]
            //     }
            // ];

            // $scope.listSistematikaPenyajian=[
            //     {
            //     	"id":3,
            //     	"nama":"Sistematika Penyajian",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang  "},
            //     		{"id":2,"nama":"Cukup  "},
            //     		{"id":3,"nama":"Baik  "},
            //     		{"id":4,"nama":"Sangat Baik  "},
            //     	]
            //     }
            // ]; 

            // $scope.listMetode=[
            //     {
            //     	"id":4,
            //     	"nama":"Penggunaan Metode dan Alat Bantu",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang   "},
            //     		{"id":2,"nama":"Cukup   "},
            //     		{"id":3,"nama":"Baik   "},
            //     		{"id":4,"nama":"Sangat Baik   "},
            //     	]
            //     }
            // ];

            // $scope.listEmpati=[
            //     {
            //     	"id":5,
            //     	"nama":"Empati, gaya dan sikap terhadap peserta",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang    "},
            //     		{"id":2,"nama":"Cukup    "},
            //     		{"id":3,"nama":"Baik    "},
            //     		{"id":4,"nama":"Sangat Baik    "},
            //     	]
            //     }
            // ];

            // $scope.listBahasa=[
            //     {
            //     	"id":6,
            //     	"nama":"Penggunaan Bahasa dan Volume Suara",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang     "},
            //     		{"id":2,"nama":"Cukup     "},
            //     		{"id":3,"nama":"Baik     "},
            //     		{"id":4,"nama":"Sangat Baik     "},
            //     	]
            //     }
            // ];

            // $scope.listMotivasi=[
            //     {
            //     	"id":7,
            //     	"nama":"Pemberian Motivasi belajar kepada peserta",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang      "},
            //     		{"id":2,"nama":"Cukup      "},
            //     		{"id":3,"nama":"Baik      "},
            //     		{"id":4,"nama":"Sangat Baik      "},
            //     	]
            //     }
            // ];                                   

            // $scope.listIsiMateri=[
            //     {
            //     	"id":8,
            //     	"nama":"Isi Materi",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang       "},
            //     		{"id":2,"nama":"Cukup       "},
            //     		{"id":3,"nama":"Baik       "},
            //     		{"id":4,"nama":"Sangat Baik       "},
            //     	]
            //     }
            // ];   

            // $scope.listPenyajianMateri=[
            //     {
            //     	"id":9,
            //     	"nama":"Penyajian Materi",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang        "},
            //     		{"id":2,"nama":"Cukup        "},
            //     		{"id":3,"nama":"Baik        "},
            //     		{"id":4,"nama":"Sangat Baik        "},
            //     	]
            //     }
            // ];    

            // $scope.listDiterapkan=[
            //     {
            //     	"id":10,
            //     	"nama":"Dapat Diterapkan di klinik",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang         "},
            //     		{"id":2,"nama":"Cukup         "},
            //     		{"id":3,"nama":"Baik         "},
            //     		{"id":4,"nama":"Sangat Baik         "},
            //     	]
            //     }
            // ];

            // $scope.listTanyaJawab=[
            //     {
            //     	"id":11,
            //     	"nama":"Kesempatan Tanya Jawab",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang          "},
            //     		{"id":2,"nama":"Cukup          "},
            //     		{"id":3,"nama":"Baik          "},
            //     		{"id":4,"nama":"Sangat Baik          "},
            //     	]
            //     }
            // ]; 

            // $scope.listPembelajaran=[
            //     {
            //     	"id":12,
            //     	"nama":"Pencapaian Tujuan Pembelajaran",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang           "},
            //     		{"id":2,"nama":"Cukup           "},
            //     		{"id":3,"nama":"Baik           "},
            //     		{"id":4,"nama":"Sangat Baik           "},
            //     	]
            //     }
            // ];

            // $scope.listFasilitator=[
            //     {
            //     	"id":13,
            //     	"nama":"Penampilan Fasilitator",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang             "},
            //     		{"id":2,"nama":"Cukup              "},
            //     		{"id":3,"nama":"Baik             "},
            //     		{"id":4,"nama":"Sangat Baik            "},
            //     	]
            //     }
            // ]; 

            // $scope.listKerjasama=[
            //     {
            //     	"id":14,
            //     	"nama":"Kerjasama Antar Tim Pengajar (jika tim)",
            //     	"detail":[
            //     		{"id":1,"nama":"Kurang               "},
            //     		{"id":2,"nama":"Cukup               "},
            //     		{"id":3,"nama":"Baik               "},
            //     		{"id":4,"nama":"Sangat Baik              "},
            //     	]
            //     }
            // ];                   
            
            // $scope.addListPenguasaanMateri = function(bool,data) {
            //     var index = $scope.currentPenguasaanMateri.indexOf(data);
            //     if (_.filter($scope.currentPenguasaanMateri, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentPenguasaanMateri.push(data);
            //     else {
            //         $scope.currentPenguasaanMateri.splice(index, 1);
            //     }
                
            // }

           
            // $scope.addListKetetapanWaktu = function(bool,data) {
            //     var index = $scope.currentKetetapanWaktu.indexOf(data);
            //     if (_.filter($scope.currentKetetapanWaktu, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentKetetapanWaktu.push(data);
            //     else {
            //         $scope.currentKetetapanWaktu.splice(index, 1);
            //     }
                
            // }

            // $scope.addListSistematikaPenyajian = function(bool,data) {
            //     var index = $scope.currentSistematikaPenyajian.indexOf(data);
            //     if (_.filter($scope.currentSistematikaPenyajian, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentSistematikaPenyajian.push(data);
            //     else {
            //         $scope.currentSistematikaPenyajian.splice(index, 1);
            //     }
                
            // }

            
            // $scope.addListMetode = function(bool,data) {
            //     var index = $scope.currentMetode.indexOf(data);
            //     if (_.filter($scope.currentMetode, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentMetode.push(data);
            //     else {
            //         $scope.currentMetode.splice(index, 1);
            //     }
                
            // }

            // $scope.addListEmpati = function(bool,data) {
            //     var index = $scope.currentEmpati.indexOf(data);
            //     if (_.filter($scope.currentEmpati, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentEmpati.push(data);
            //     else {
            //         $scope.currentEmpati.splice(index, 1);
            //     }
                
            // }

            // $scope.addListBahasa = function(bool,data) {
            //     var index = $scope.currentBahasa.indexOf(data);
            //     if (_.filter($scope.currentBahasa, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentBahasa.push(data);
            //     else {
            //         $scope.currentBahasa.splice(index, 1);
            //     }
                
            // }

            // $scope.addListMotivasi = function(bool,data) {
            //     var index = $scope.currentMotivasi.indexOf(data);
            //     if (_.filter($scope.currentMotivasi, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentMotivasi.push(data);
            //     else {
            //         $scope.currentMotivasi.splice(index, 1);
            //     }
                
            // }

            // $scope.addListIsiMateri = function(bool,data) {
            //     var index = $scope.currentIsiMateri.indexOf(data);
            //     if (_.filter($scope.currentIsiMateri, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentIsiMateri.push(data);
            //     else {
            //         $scope.currentIsiMateri.splice(index, 1);
            //     }
                
            // }

            // $scope.addListPenyajianMateri = function(bool,data) {
            //     var index = $scope.currentPenyajianMateri.indexOf(data);
            //     if (_.filter($scope.currentPenyajianMateri, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentPenyajianMateri.push(data);
            //     else {
            //         $scope.currentPenyajianMateri.splice(index, 1);
            //     }
                
            // }

            // $scope.addListPenyajianMateri = function(bool,data) {
            //     var index = $scope.currentPenyajianMateri.indexOf(data);
            //     if (_.filter($scope.currentPenyajianMateri, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentPenyajianMateri.push(data);
            //     else {
            //         $scope.currentPenyajianMateri.splice(index, 1);
            //     }
                
            // }

            // $scope.addListDiterapkan = function(bool,data) {
            //     var index = $scope.currentDiterapkan.indexOf(data);
            //     if (_.filter($scope.currentDiterapkan, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentDiterapkan.push(data);
            //     else {
            //         $scope.currentDiterapkan.splice(index, 1);
            //     }
                
            // }

            // $scope.addListTanyaJawab = function(bool,data) {
            //     var index = $scope.currentTanyaJawab.indexOf(data);
            //     if (_.filter($scope.currentTanyaJawab, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentTanyaJawab.push(data);
            //     else {
            //         $scope.currentTanyaJawab.splice(index, 1);
            //     }
                
            // }

            // $scope.addListPembelajaran = function(bool,data) {
            //     var index = $scope.currentPembelajaran.indexOf(data);
            //     if (_.filter($scope.currentPembelajaran, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentPembelajaran.push(data);
            //     else {
            //         $scope.currentPembelajaran.splice(index, 1);
            //     }
                
            // }
           	
           	// $scope.addListFasilitator = function(bool,data) {
            //     var index = $scope.currentFasilitator.indexOf(data);
            //     if (_.filter($scope.currentFasilitator, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentFasilitator.push(data);
            //     else {
            //         $scope.currentFasilitator.splice(index, 1);
            //     }
                
            // }

            // $scope.addListKerjasama = function(bool,data) {
            //     var index = $scope.currentKerjasama.indexOf(data);
            //     if (_.filter($scope.currentKerjasama, {
            //             id: data.id
            //         }).length === 0)
            //         $scope.currentKerjasama.push(data);
            //     else {
            //         $scope.currentKerjasama.splice(index, 1);
            //     }
                
            // }


            // $scope.item.PenguasaanMateri = 0;
            // $scope.item.KetepatanWaktu = 0;
            // $scope.item.SistematikaPenyajian = 0;
            // $scope.item.PenggunaanMetode = 0;
            // $scope.item.Empati = 0;
            // $scope.item.PenggunaanBahasa = 0;
            // $scope.item.PemberianMotivasi =0;
            // $scope.item.IsiMateri=0;
            // $scope.item.PenyajianMateri=0;
            // $scope.item.Diterapkan =0;
            // $scope.item.Kesempatan =0;
            // $scope.item.Pembelajaran =0;
            // $scope.item.Fasilitator =0;
            // $scope.item.Kerjasama =0;
            // $scope.item.Rekapitulasi=0;

            $scope.$watch('item.PenguasaanMateri', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.KetepatanWaktu', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.SistematikaPenyajian', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.PenggunaanMetode', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Empati', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.PenggunaanBahasa', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.PemberianMotivasi', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.IsiMateri', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.PenyajianMateri', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Diterapkan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Kesempatan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Pembelajaran', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap);
                }
            });

            $scope.$watch('item.Fasilitator', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    data1=parseFloat($scope.item.PenguasaanMateri);                    
                    data2=parseFloat($scope.item.KetepatanWaktu);
                    data3=parseFloat($scope.item.SistematikaPenyajian);
                    data4=parseFloat($scope.item.PenggunaanMetode);
                    data5=parseFloat($scope.item.Empati);
                    data6=parseFloat($scope.item.PenggunaanBahasa);
                    data7=parseFloat($scope.item.PemberianMotivasi);
                    data8=parseFloat($scope.item.IsiMateri);
                    data9=parseFloat($scope.item.PenyajianMateri);
                    data10=parseFloat($scope.item.Diterapkan);
                    data11=parseFloat($scope.item.Kesempatan);
                    data12=parseFloat($scope.item.Pembelajaran);
                    data13=parseFloat($scope.item.Fasilitator);
                    data14=parseFloat($scope.item.Kerjasama);
                    totalRekap= (data1+data2+data3+data4+data5+data6+data7+data8+data9+data10+data11+data12+data13+data14)/14;
                    $scope.item.Rekapitulasi= parseFloat(totalRekap).toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                }
            });

            $scope.$watch('item.Rekapitulasi', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
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
                $scope.item.Rekapitulasi=0;
	            // $scope.currentPenguasaanMateri=[];
	            // $scope.currentKetetapanWaktu=[];
	            // $scope.currentSistematikaPenyajian=[];
	            // $scope.currentMetode=[];
	            // $scope.currentEmpati=[];
	            // $scope.currentBahasa =[];
	            // $scope.currentMotivasi =[];
	            // $scope.currentIsiMateri=[];
	            // $scope.currentPenyajianMateri=[];
	            // $scope.currentDiterapkan=[];
	            // $scope.currentTanyaJawab=[];
	            // $scope.currentPembelajaran=[];
	            // $scope.currentFasilitator=[];
	            // $scope.currentKerjasama=[];
            };

            $scope.reset = function(){				 		
      				ClearAll();
      			};

      			$scope.Save = function() {	
      				var dataForm = [];  
              var tempData = [];
              var listPenguasaanMateri="";
              var listKetetapanWaktu="";
              var listSistematikaPenyajian="";
              var listMetode="";
              var listEmpati="";
              var listBahasa="";
              var listMotivasi="";
              var listIsiMateri="";
              var listPenyajianMateri="";
              var listDiterapkan="";
              var listTanyaJawab="";
              var listPembelajaran="";
              var listFasilitator="";
              var listKerjasama="";
              var a = "";
              var b = "";
              var c = "";
              var d = "";
              var e = "";
              var f = "";
              var g = "";
              var h = "";
              var i = "";
              var j = "";
              var k = "";
              var l = "";
              var m = "";
              var n = "";
              var o = "";
              var p = "";
              var q = "";
              var r = "";
              var s = "";
              var t = "";
              var u = "";
              var v = "";
              var w = "";
              var x = "";
              var y = "";
              var z = "";    

              if ($scope.item.TglEvaluasi == undefined) {
                  alert("Tgl Evaluasi Tidak Boleh Kosong!")
                  return;
              };

              if ($scope.item.NamaFasilitator == undefined) {
                  alert("Nama Fasilitator Tidak Boleh Kosong!")
                  return;
              };

              // if ($scope.item.Materi == undefined) {
              //     alert("Materi Tidak Boleh Kosong!")
              //     return;
              // };

              // if ($scope.item.MateriPelatihan == undefined) {
              //     alert("Materi yang paling menarik tidak boleh kosong!")
              //     return;
              // };

              // if ($scope.item.FasilitatorPelatihan == undefined) {
              //     alert("Fasilitator yang anda suka tidak boleh kosong!")
              //     return;
              // };

              // if ($scope.item.ManfaatPelatihan == undefined) {
              //     alert("Manfaat Pelatihan Tidak Boleh Kosong!")
              //     return;
              // };

              if ($scope.item.SaranPelatihan == undefined) {
                  alert("Saran Perbaikan Tidak Boleh Kosong!")
                  return;
              };

              if ($scope.item.Narasumber == undefined) {
                  alert("Narasumber Tidak Boleh Kosong!")
                  return;
              };

              // for (var i =  $scope.currentPenguasaanMateri.length - 1; i >= 0; i--) {
              //     var c = $scope.currentPenguasaanMateri[i].id
              //     b = ","+ c
              //     a = a + b
              // }
              // listPenguasaanMateri= a.slice(1, a.length)

              // if (listPenguasaanMateri.length == 0) {
              //     alert("Penguasaan Materi Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var i =  $scope.currentKetetapanWaktu.length - 1; i >= 0; i--) {
              //     var a = $scope.currentKetetapanWaktu[i].id
              //     e = ","+ a
              //     f = e + f
              // }
              // listKetetapanWaktu= e.slice(1, e.length)

              // if (listKetetapanWaktu.length == 0) {
              //     alert("Ketetapan Waktu Tidak Boleh Kosong!")
              //     return;
              //  }

              // for (var m =  $scope.currentSistematikaPenyajian.length - 1; m >= 0; m--) {
              //     var n = $scope.currentSistematikaPenyajian[m].id
              //     g = ","+ n
              //     h = g + h
              // }
              // listSistematikaPenyajian = g.slice(1, g.length)

              // if (listSistematikaPenyajian.length == undefined) {
              //     alert("Sistematika Penyajian Tidak Boleh Kosong!")
              //     return;
              //  }

              // for (var m =  $scope.currentMetode.length - 1; m >= 0; m--) {
              //     var p = $scope.currentMetode[m].id
              //     i = ","+ p
              //     j = i + j
              // }
              // listMetode = i.slice(1, i.length)

              // if (listMetode.length == 0) {
              //     alert("Penggunaan Metode dan Alat Bantu Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentEmpati.length - 1; m >= 0; m--) {
              //     var p = $scope.currentEmpati[m].id
              //     k = ","+ p
              //     l = k + l
              // }
              // listEmpati = k.slice(1, k.length)

              // if (listEmpati.length == 0) {
              //     alert("Empati, gaya dan sikap terhadap peserta Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentBahasa.length - 1; m >= 0; m--) {
              //     var p = $scope.currentBahasa[m].id
              //     a = ","+ p
              //     b = a + b
              // }
              // listBahasa = a.slice(1, a.length)

              // if (listBahasa.length == 0) {
              //     alert("Penggunaan Bahasa dan Volume Suara Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentMotivasi.length - 1; m >= 0; m--) {
              //     var p = $scope.currentMotivasi[m].id
              //     o = ","+ p
              //     p = o + p
              // }
              // listMotivasi = o.slice(1, o.length)

              // if (listMotivasi.length == 0) {
              //     alert("Pemberian Motivasi belajar kepada peserta Tidak Boleh Kosong!")
              //     return;
              // }               

              // for (var m =  $scope.currentIsiMateri.length - 1; m >= 0; m--) {
              //     var p = $scope.currentIsiMateri[m].id
              //     q = ","+ p
              //     r = q + r
              // }
              // listIsiMateri = q.slice(1,q.length)

              // if (listIsiMateri.length == 0) {
              //     alert("Isi Materi Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentPenyajianMateri.length - 1; m >= 0; m--) {
              //     var p = $scope.currentPenyajianMateri[m].id
              //     s = ","+ p
              //     t = s + t
              // }
              // listPenyajianMateri = s.slice(1, s.length)

              // if (listPenyajianMateri.length == 0) {
              //     alert("Penyajian Materi Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentDiterapkan.length - 1; m >= 0; m--) {
              //     var p = $scope.currentDiterapkan[m].id
              //     u = ","+ p
              //     v = u + v
              // }
              // listDiterapkan = u.slice(1,u.length)

              // if (listDiterapkan.length == 0) {
              //     alert("Dapat Diterapkan di klinik Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentTanyaJawab.length - 1; m >= 0; m--) {
              //     var p = $scope.currentTanyaJawab[m].id
              //     x = ","+ p
              //     y = x + y
              // }
              // listTanyaJawab = x.slice(1, x.length)

              // if (listTanyaJawab.length == 0) {
              //     alert("Kesempatan Tanya Jawab Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentPembelajaran.length - 1; m >= 0; m--) {
              //     var p = $scope.currentPembelajaran[m].id
              //     a = ","+ p
              //     b = a + b
              // }
              // listPembelajaran = a.slice(1, a.length)

              // if (listPembelajaran.length == 0) {
              //     alert("Pencapaian Tujuan Pembelajaran Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentFasilitator.length - 1; m >= 0; m--) {
              //     var p = $scope.currentFasilitator[m].id
              //     c = ","+ p
              //     d = c + d
              // }
              // listFasilitator = c.slice(1,c.length)

              // if (listFasilitator.length == 0) {
              //     alert("Penampilan Fasilitator Tidak Boleh Kosong!")
              //     return;
              // }

              // for (var m =  $scope.currentKerjasama.length - 1; m >= 0; m--) {
              //     var p = $scope.currentKerjasama[m].id
              //     e = ","+ p
              //     d = e + d
              // }
              // listKerjasama = e.slice(1, d.length)

              // if (listKerjasama.length == 0) {
              //     alert("Kerjasama Antar Tim Pengajar (jika tim) Tidak Boleh Kosong!")
              //     return;
              // }

                var listRawRequired = [
                    "item.PenguasaanMateri|k-ng-model|Penguasaan Materi",
                    "item.KetepatanWaktu|k-ng-model|Ketepatan Waktu",
                    "item.SistematikaPenyajian|k-ng-model|Sistematika Penyajian",
                    "item.PenggunaanMetode|k-ng-model|Penggunaan Metode dan Alat Bantu",
                    "item.Empati|k-ng-model|Empati, Gaya dan Sikap Terhadap Peserta",
                    "item.PenggunaanBahasa|k-ng-model|Penggunaan Bahasa dan Volume Suara", 
                    "item.PemberianMotivasi|k-ng-model|Pemberian Motivasi Belajar Kepada Peserta",
                    "item.IsiMateri|k-ng-model|Isi Materi",
                    "item.PenyajianMateri|k-ng-model|Penyajian Materi",
                    "item.Diterapkan|k-ng-model|Dapat Diterapkan Diklinik",
                    "item.Kesempatan|k-ng-model|Kesempatan Tanya Jawab",
                    "item.Pembelajaran|k-ng-model|Pencapaian Tujuan Pembelajaran",
                    "item.Fasilitator|k-ng-model|Penampilan Fasilitator",
                    "item.Kerjasama|k-ng-model|Kerjasama Antar Tim Pengajar (Jika Tim)"          
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                  var data = 
                  {
                    "norec":NorecEvaluasiNarasumber,
                    "norecplanning":NorecPlanning,
                    "tglevaluasi": moment($scope.item.TglEvaluasi).format('YYYY-MM-DD HH:mm'),
                    "fasilitator": $scope.item.NamaFasilitator,
                    // "materi": $scope.item.Materi,
                    // "keteranganpelatihan": $scope.item.MateriPelatihan,
                    // "manfaatpelatihan": $scope.item.ManfaatPelatihan,
                    // "manfaatfasilitator": $scope.item.FasilitatorPelatihan,
                    "saran": $scope.item.SaranPelatihan,
                    "narasumberfk": $scope.item.Narasumber.id,
                    "totalnilai": $scope.item.Rekapitulasi,

                    // nu diPake
                    "penguasaanmateri":$scope.item.PenguasaanMateri,
                    "ketepatanwaktu":$scope.item.KetepatanWaktu,
                    "sistematikapenyajian":$scope.item.SistematikaPenyajian,
                    "penggunaanmetodedanalatbantu":$scope.item.PenggunaanMetode,
                    "empati":$scope.item.Empati,
                    "penggunaanbahasa":$scope.item.PenggunaanBahasa,
                    "pemberianmotivasi":$scope.item.PemberianMotivasi,
                    "isimateri":$scope.item.IsiMateri,
                    "penyajianmateri":$scope.item.PenyajianMateri,
                    "dapatditerapkanklinik":$scope.item.Diterapkan,
                    "kesempatantanyajawab":$scope.item.Kesempatan,
                    "pencapaiantujuanpembelajaran":$scope.item.Pembelajaran,
                    "penampilanfasilitator":$scope.item.Fasilitator,
                    "kerjasamaantartimpengajar":$scope.item.Kerjasama
                    // End nu diPake

                    // Old
                      // "penguasaanmateri":listPenguasaanMateri,
                      // "ketepatanwaktu":listKetetapanWaktu,
                      // "sistematikapenyajian":listSistematikaPenyajian,
                      // "penggunaanmetodedanalatbantu":listMetode,
                      // "empati":listEmpati,
                      // "penggunaanbahasa":listBahasa,
                      // "pemberianmotivasi":listBahasa,
                      // "isimateri":listIsiMateri,
                      // "penyajianmateri":listPenyajianMateri,
                      // "dapatditerapkanklinik":listDiterapkan,
                      // "kesempatantanyajawab":listTanyaJawab,
                      // "pencapaiantujuanpembelajaran":listPembelajaran,
                      // "penampilanfasilitator":listFasilitator,
                      // "kerjasamaantartimpengajar":listKerjasama
                    // End Old
                  };

                  var objSave = {
                      data: data,
                  }

                  manageServicePhp.saveevaluasinarasumber(objSave).then(function (e) {
                      ClearAll();
                  });

                } else {
                    ModelItem.showMessages(isValid.messages);
                }
          };
    }
	]);
});