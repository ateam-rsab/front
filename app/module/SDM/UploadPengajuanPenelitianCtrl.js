define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UploadPengajuanPenelitianCtrl', ['$rootScope', '$scope', 'ModelItem','$state','HonorTimService',
		function($rootScope, $scope, ModelItem,$state,HonorTimService) {
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
			 
			 
			 
			  $scope.ListJenisPenelitian = [{
					"id": 1,
					"kode": "1",
					"name": "Dasar"
				},{
					
					"id": 2,
					"kode": "2",
					"name": "Klinis"	
				
					
				},{
					
					"id": 4,
					"kode": "3",
					"name": "Epidemiologi Kesehatan Ibu dan Anak"	
					
				}
			];
			
			
			
			 $scope.ListJenisPelaksana = [{
					"id": 1,
					"kode": "1",
					"name": "Peneliti"
				
					
				},{
					
					"id": 2,
					"kode": "2",
					"name": "Teknisi"	
					
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
				"title": "Pelaksana",
				"width": "20%"
			},
			{
				"field": "nama",
				"title": "Jumlah Pelaksana",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Jumlah jam/minggu",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Honor/jam",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Biaya",
				"width": "20%"
			}
			];
			
			
			$scope.columnLaporanUjiNaker = [
			{
				"field": "no",
				"title": "Nama bahan",
				"width": "20%"
			},
			{
				"field": "nama",
				"title": "Volume",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Biaya Satuan",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Biaya",
				"width": "20%"
			}
			];
			
			
			$scope.columnLaporanUjiVolume = [
			{
				"field": "no",
				"title": "Uraian Kegiatan",
				"width": "20%"
			},
			{
				"field": "nama",
				"title": "Volume",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Biaya Satuan",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Biaya",
				"width": "20%"
			}
			];
			
			
			var aktif = false;
			$scope.check = function () {
				if (aktif)
					aktif = "false";

				else
					aktif = "true";				
			}
			
			$scope.Save = function () {
                // debugger;
				var data = {
					"nomorSurat": $scope.item.nomorSurat,
					"namaTim": $scope.item.namaTim,
					"jabatan": $scope.item.jabatan,
					"honorarium": $scope.item.honorarium,
					"statusEnabled": aktif
				};				
                HonorTimService.saveHonorTim(ModelItem.beforePost(data), "sdm/save-master-honor-tim").then(
					function (e) {
						$scope.item = {};
					});
            };
			

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});