define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputNarasumberRevCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			var norecMateriKompetensi = '';
			loadDataCombo();
			init();


			function loadDataCombo(){			
	            manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	$scope.ListNarasumber=dat.data.narasumber;
	            });
		    }

		     function init() {
		       $scope.isRouteLoading=true;
               manageServicePhp.getDataTableTransaksi("sdm-pelatihan-narasumber/get-detail-narasumber-kompetensi?", true).then(function(data_ih){
	                $scope.isRouteLoading=false;
	                var data_head = data_ih.data.data;	               
	                $scope.dataGrid = new kendo.data.DataSource({
	                    data: data_head
	                });

	            });
            }

			$scope.batal = function(){
				ClearAll()
			}	

			$scope.klikGrid = function(dataSelected){
				if (dataSelected != undefined) {
					norecMateriKompetensi=dataSelected.norec
                    $scope.item.Narasumber={id:dataSelected.narasumberfk,namalengkap:dataSelected.namalengkap}
                    $scope.item.MateriDiajarkan = dataSelected.materi
                    $scope.item.DasarPendidikan = dataSelected.dasarpendidikan
                    $scope.item.TambahanMateri  = dataSelected.materitambahan                     
                    $scope.item.Pelatihan = dataSelected.pelatihan
                    $scope.item.PengalamanBekerja = dataSelected.pengalamanbekerja
				}
			}

			$scope.Hapus = function(current){

                var data = 
                {
                    norec: $scope.dataSelected.norec,               
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.hapusnarasumberkompetensi(objSave).then(function(e) {
                	init();
                    ClearAll();                   
            	});
            }

			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
					{
						"field": "namalengkap",
						"title": "Nama Narasumber",
						"width": "25%"
					},
					{
						"field": "materi",
						"title": "Materi Yang Diajarkan",
						"width": "20%"
					},
					{
						"field": "dasarpendidikan",
						"title": "Dasar Pendidikan Tambahan",
						"width": "20%"
					},
					{
						"field": "materitambahan",
						"title": "Nilai Tambahan Terkait dengan Materi",
						"width": "20%"
					},
					{
						"field": "pelatihan",
						"title": "Pelatihan tentang Diklat",
						"width": "20%"
					},
					{
						"field": "pengalamanbekerja",
						"title": "Pengalaman Bekerja",
						"width": "20%"
					}
				],
				editable: false
			};
			
			function ClearAll(){
                $scope.item = {}; 
                init();      
            }

			$scope.simpan = function() {									  
	            var listRawRequired = [
                    "item.Narasumber|k-ng-model|Narasumber",
                    "item.MateriDiajarkan|k-ng-model|Materi yang Diajarkan",
                    "item.TambahanMateri|k-ng-model|Tambahan Materi",
                    "item.Pelatihan|k-ng-model|Pelatihan",
                    "item.PengalamanBekerja|k-ng-model|Pengalaman Bekerja",
                    "item.DasarPendidikan|k-ng-model|Dasar Pendidikan"               
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var data = {
                        "norec": norecMateriKompetensi,
                        "narasumberfk": $scope.item.Narasumber.id,
                        "materi": $scope.item.MateriDiajarkan,
                        "dasarpendidikan": $scope.item.DasarPendidikan,
                        "materitambahan": $scope.item.TambahanMateri,                       
                        "pelatihan": $scope.item.Pelatihan,
                        "pengalamanbekerja": $scope.item.PengalamanBekerja,
                    }
                    manageServicePhp.savenarasumberkompetensi(data).then(function(e) {
                    	init();
                        ClearAll();                   
                	});
                    // manageServicePhp.savenarasumberkompetensi(data, "sdm-pelatihan-narasumber/save-narasumber-kompetensi").then(function (e) {
                    //     init();
                    //     ClearAll()
                    // });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
		}
	]);
});