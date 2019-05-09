define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapitulasiKodeEtikCtrl', ['$rootScope', '$scope', 'ModelItem','$state','DateHelper',
		function($rootScope, $scope, ModelItem,$state,DateHelper) {
			$scope.item = {};
			ModelItem.get("PerencanaanDanPemasaran/analisaSwot").then(function(data) {
				$scope.item = data;
				$scope.item.total = 0;
				$scope.no = 1;
				$scope.now = new Date();
				$scope.item.awal= new Date($scope.now).getFullYear();
				$scope.item.akhir= new Date($scope.now).getFullYear();
				
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
          		$scope.JenisAnalisa = false;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
		
			$scope.no=1;
			
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
				"title": "Bulan",
				"width": "10%"
			},
			{
				"field": "nama",
				"title": "Kejadian",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Nama Ruang",
				"width": "20%"
			}
			];
		
			

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});