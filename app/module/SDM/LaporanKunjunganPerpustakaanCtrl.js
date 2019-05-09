define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanKunjunganPerpustakaanCtrl', ['$rootScope', '$scope', 'ModelItem','$state',
		function($rootScope, $scope, ModelItem,$state) {
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
				"title": "Tahun",
				"width": "20%"
			},
			{
				"field": "nama",
				"title": "Jan",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Feb",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Mar",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Apr",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Mei",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Juni",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Juli",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Agustus",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Sept",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Okt",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Nov",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Des",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Jumlah",
				"width": "20%"
			}
			];
		
			

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});