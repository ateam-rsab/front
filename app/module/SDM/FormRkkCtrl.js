define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormRkkCtrl', ['$rootScope', '$scope', 'ModelItem','TipeKeanggotaan','TipeKoleksi','PeriodePinjaman','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,TipeKeanggotaan,TipeKoleksi,PeriodePinjaman,$state,ManageSdm) {
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
			 
			 
			  $scope.pindah1 = function(){
				 
				$state.go("DataKeluarga");
				 
			 }
			  TipeKeanggotaan.getOrderList("service/list-generic/?view=TipeKeanggotaan&select=*", true).then(function(dat){
				$scope.ListTipeKeanggotaan = dat.data;
					debugger;
				});	
				
				
			TipeKoleksi.getOrderList("service/list-generic/?view=TipeKoleksi&select=*", true).then(function(dat){
				$scope.ListTipeKoleksi = dat.data;
	            
				});

			PeriodePinjaman.getOrderList("service/list-generic/?view=PeriodePinjaman&select=*", true).then(function(dat){
				$scope.ListPeriodePinjaman = dat.data;
	
				});	
				
			 
			 
			 $scope.ListKeterangan = [{
					"id": 1,
					"kode": "A",
					"name": "laki",
					"pertanyaan":"apakah"
				},
				{
					"id": 2,
					"kode": "B",
					"name": "perempuan",
					
				}

			];
			
			
			$scope.ListPertanyaan = [{
					"id": 1,
					
					"pertanyaan": "Apakah?"
				},
				{
					"id": 2,
					
					"name": "Siapakah?"
				}

			];
			
			
			$scope.daftarJenisBahan = new kendo.data.DataSource({
			data: [
					{ 
						"kodeJenis":"BHN001",
						"JenisBahan":"Aldet"
					},
					{ 
						"kodeJenis":"BHN002",
						"JenisBahan":"Laudet"
					},
					{ 
						"kodeJenis":"BHN003",
						"JenisBahan":"MC. Bleach"
					},
					{ 
						"kodeJenis":"BHN004",
						"JenisBahan":"OXO. Bleach"
					},
					{ 
						"kodeJenis":"BHN005",
						"JenisBahan":"E. 951"
					},
					{ 
						"kodeJenis":"BHN006",
						"JenisBahan":"M. Saur"
					},
					{ 
						"kodeJenis":"BHN007",
						"JenisBahan":"M. Soft"
					}

				]
			});
			
			
			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data:[
					{ 
						"no":"1",
						"unsur":""
					},
					{ 
						"no":"2",
						"unsur":""
					},
					{ 
						"no":"3",
						"unsur":""
					},
					{ 
						"no":"4",
						"unsur":""
					},
					{ 
						"no":"5",
						"unsur":""
					}

				]
			});
			
			$scope.columnLaporanUjiHasil = [
			
			{
				"field": "unsur",
				"title": "Kompetensi",
				"width": "70%"
			},
			{
				"field": "nama",
				"title": "Disetujui Berwenang Penuh",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "satuan",
				"title": "Disetujui di bawah supervisi",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
			},
			{
				"field": "hasilUji",
				"title": "Belum Kompeten",
				"width": "20%",
				"template": "<div class='center'><input type=\"radio\" ng-model='val' value='0' ng-click='klik(dataItem,val)'></div>",
				
			}
			];
		
			

			 $scope.Save = function() {
						
			  
             ManageSdm.saveAturanPeminjaman(ModelItem.beforePost($scope.item)).then(function (e) {
				 debugger;
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