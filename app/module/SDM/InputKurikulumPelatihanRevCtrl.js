define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputKurikulumPelatihanRevCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem,$state, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.dataVOloaded = true;
		var norecKurikulumKompetensi = '';	
		var noOrder = '';
		loadDataCombo();
		LoadCache();
		// init();


			function loadDataCombo(){			
	            manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	$scope.ListJenisPelatihan=dat.data.jenispelatihan;
	            });
		    }	

		    function LoadCache(){
               var chacePeriode = cacheHelper.get('InputKurikulumPelatihanRevCtrl');
                if(chacePeriode != undefined){

                   norecKurikulumKompetensi = chacePeriode[0]
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
                    cacheHelper.set('InputKurikulumPelatihanRevCtrl', chacePeriode);
               }else{
               	
               		init();
               
               }
            }

             function init(){				
				if (noOrder != '') {
			   		if (noOrder == 'EditKurikulum') {
			   			manageServicePhp.getDataTableTransaksi("sdm-pelatihan-kurikulum/get-detail-kurikulum-kompetensi?norecOrder="+norecKurikulumKompetensi, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            var data_head = data_ih.data.daftar[0];
                            norecKurikulumKompetensi = data_head.norec;
                            $scope.item.JenisPelatihan = {id:data_head.jenispelatihanfk,jenispelatihan:data_head.jenispelatihan};
                            $scope.item.judulKurikulum = data_head.judulkurikulum;
                            $scope.item.LatarBelakang = data_head.latarbelangkang;
                            $scope.item.FilosofiPelatihan = data_head.filosofipelatihan;
                            $scope.item.Peran = data_head.peran;
                            $scope.item.Fungsi = data_head.fungsi;                    
                            $scope.item.Kompetensi = data_head.kompetensi;
                            $scope.item.TujuanUmum = data_head.tujuanumum;
                            $scope.item.TujuanKhusus = data_head.tujuankhusus;
                            $scope.item.StrukturProgram = data_head.strukturprogram;
                            $scope.item.ProgramPembelajaran = data_head.programpembejalaran;
                            $scope.item.DiagramPembelajaran = data_head.prosespembelajaran;
                            $scope.item.Peserta = data_head.peserta;
                            $scope.item.Pelatih = data_head.pelatih;
                            $scope.item.Penyelenggaraan = data_head.penyelenggaraan;                      
                            $scope.item.Evaluasi = data_head.evaluasi;
                            $scope.item.Sertifikat = data_head.Sertifikat;                            
                        });
			   		}
				}        

			};

            function ClearAll(){
                $scope.item = {}; 
            };

			$scope.Simpan = function(){
				 var listRawRequired = [
                    "item.JenisPelatihan|k-ng-model|Jenis Pelatihan",
                    "item.judulKurikulum|k-ng-model|Judul Kurikulum",
                    "item.LatarBelakang|k-ng-model|Latar Belakang",
                    "item.FilosofiPelatihan|k-ng-model|Filosofi Pelatihan",
                    "item.Peran|k-ng-model|Peran",
                    "item.Fungsi|k-ng-model|Fungsi",
                    "item.Kompetensi|k-ng-model|Kompetensi",
                    "item.TujuanUmum|k-ng-model|Tujuan Umum",
                    "item.TujuanKhusus|k-ng-model|Tujuan Khusus",
                    "item.StrukturProgram|k-ng-model|Struktur Program",
                    "item.ProgramPembelajaran|k-ng-model|Garis-Garis Besar Program Pembelajaran",                    
                    "item.DiagramPembelajaran|k-ng-model|Diagram Proses Pembelajaran",  
                    "item.Peserta|k-ng-model|Peserta",
                    "item.Pelatih|k-ng-model|Pelatih/Fasilitator/Instruktur",
                    "item.Penyelenggaraan|k-ng-model|Tujuan Khusus",                   
                    "item.Evaluasi|k-ng-model|Evaluasi",
                    "item.Sertifikat|k-ng-model|Sertifikat",          
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var data = {
                        "norec": norecKurikulumKompetensi,
                        "jenispelatihanfk":$scope.item.JenisPelatihan.id,
						"judulkurikulum":$scope.item.judulKurikulum,
						"latarbelangkang":$scope.item.LatarBelakang,
						"filosofipelatihan":$scope.item.FilosofiPelatihan,
						"peran":$scope.item.Peran,
						"fungsi":$scope.item.Fungsi,
						"kompetensi":$scope.item.Kompetensi,
						"tujuanumum":$scope.item.TujuanUmum,
						"tujuankhusus":$scope.item.TujuanKhusus,
						"strukturprogram":$scope.item.StrukturProgram,
						"programpembejalaran":$scope.item.ProgramPembelajaran,
						"prosespembelajaran":$scope.item.DiagramPembelajaran,
						"peserta":$scope.item.Peserta,
						"pelatih":$scope.item.Pelatih,
						"penyelenggaraan":$scope.item.Penyelenggaraan,
						"evaluasi":$scope.item.Evaluasi,
						"Sertifikat":$scope.item.Sertifikat,

                    }
                    manageServicePhp.savekurikulumkompetensi(data).then(function(e) {
                    	init();
                        ClearAll();                   
                	});
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
			};
			 			 
			$scope.reset = function(){				 		
				 ClearAll();
			};
						
		}
	]);
});