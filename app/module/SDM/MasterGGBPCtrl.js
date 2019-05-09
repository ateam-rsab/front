define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterGGBPCtrl', ['$rootScope', '$scope', 'ModelItem','$state','NamaAsuransi','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,NamaAsuransi,ManageSdm) {
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
			 NamaAsuransi.getOrderList("service/list-generic/?view=NamaAsuransi&select=*", true).then(function(dat){
				$scope.ListNamaAsuransi = dat.data;
		
				});		
			 
			  $scope.Listketerangan = [{
					"id": 1,
					"kode": "1",
					"name": "2016"
				}];
				
				
				$scope.ganti = function() {
				
				if ($scope.item.tahunUMR.name=="2016")
				{
					$scope.item.jumlahUMR="2300000";
					
				}
				else
				{
					$scope.item.jumlahUMR="";
					
				}
				
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
				"title": "Nomor ",
				"width": "5%"
			},
			{
				"field": "nama",
				"title": "Materi",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Waktu",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Tujuan Pembelajaran Umum (TPU)",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Tujuan Pembelajaran Khusus (TPK)",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Pokok Bahasan",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Sub Pokok Bahasan",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Metode",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Media dan Alat Bantu",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Referensi",
				"width": "20%"
			}
			];
		
			

			
			
			$scope.Save = function() {
						
			  
             ManageSdm.saveDaftarPaketPelatihan(ModelItem.beforePost($scope.item)).then(function (e) {
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