define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PremiKetenagakerjaanCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
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
			
			$scope.columnLaporanUjiHasil = [
			{
				"field": "no",
				"title": "No ",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Nama",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Tanggal Lahir",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "No Kartu BPJS",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "THP Pegawai",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Premi dibayar Pegawai",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Jumlah Premi yang dibayarkan",
				"width": "20%"
			}
			];
		
			

			
			
			
			
			
			$scope.Save = function() {
						
			  
             ManageSdm.savePremiKetenagakerjaan(ModelItem.beforePost($scope.item)).then(function (e) {
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