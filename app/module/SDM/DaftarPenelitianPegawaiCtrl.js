define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenelitianPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem','$state',
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
				"title": "Nama Peneliti",
				"width": "20%"
			},
			{
				"field": "nama",
				"title": "NIP",
				"width": "20%"
			},
			{
				"field": "satuan",
				"title": "Unit Kerja",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Judul Penelitian",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Tanggal Mulai",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Tanggal Selesai",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Biaya Penelitian",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Bantuan Biaya RSABHK",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Publikasi Jurnal",
				"width": "20%"
			},
			{
				"field": "hasilUji",
				"title": "Tanggal Publikasi",
				"width": "20%"
			}
			];
		 
		}
	]);
});