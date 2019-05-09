define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CariBukuCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKoleksi','TampilDataBuku','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,TipeKoleksi,TampilDataBuku,$state,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});
			
			 $scope.pindah = function(){
				 
				$state.go("RekamDataPegawai");
				 
			 }
			 
			   $scope.ListStatusPerkawinan = [{
					"id": 1,
					"kode": "1",
					"name": "laki"
				}

			];
			
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			
              $scope.$on("kendoWidgetCreated", function(event, widget) {
				  debugger	
                    if (widget === $scope.grid) {
                        $scope.grid.element.on('dblclick', function(e) {
							
                            if ($state.current.name === 'CariBuku') {
								
								var param = $state.params;
								param.judulBuku= $scope.item.judulBuku;
								param.kodeEksemplar=$scope.item.kodeEksemplar;
								param.noReg= $scope.item.noRec;
									
                                $state.go('Reservasi', param);
							}
						});
					}
			  });	
			 
			 
			 
			TipeKoleksi.getOrderList("service/list-generic/?view=TipeKoleksi&select=*", true).then(function(dat){
				$scope.ListTipeKoleksi = dat.data;
			
				});		
				
						
		TampilDataBuku.getOrderList("sdm/get-bibliography/-").then(function(dat){
		$scope.sourceOrder = dat.data.data.items;
		
			});
		
			
			
		
			
			$scope.columnLaporanUjiHasil = [
			
			{
				"field": "judulBuku",
				"title": "Judul Buku",
				"width": "20%"
			},
			{
				"field": "kodeEksemplar",
				"title": "Kode Eksemplar",
				"width": "20%"
			},
			{
				"field": "namaPengarang",
				"title": "Nama Pengarang",
				"width": "20%"
			},
			{
				"field": "tipeKoleksi.name",
				"title": "Tipe Koleksi",
				"width": "20%"
			},
			{
				"field": "edisi",
				"title": "Edisi",
				"width": "20%"
			},
			{
				"field": "ISSN",
				"title": "ISSN",
				"width": "20%"
			},
			{
				"field": "tahunTerbit",
				"title": "Tahun Terbit",
				"width": "20%"
			},
			{
				"field": "jumlahHalaman",
				"title": "Jumlah Halaman",
				"width": "20%"
			}
			];
		
			
             $scope.cari = function()
			{
			TampilDataBuku.getOrderList("sdm/get-bibliography/"+$scope.item.JudulBuku).then(function(dat){
		$scope.sourceOrder = dat.data.data.items;
		debugger;
			});	
			}
			
			
			   $scope.Save = function() {
						
			  
             ManageSdm.saveBuku(ModelItem.beforePost($scope.item)).then(function (e) {
                  $scope.item= {};
                   init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});