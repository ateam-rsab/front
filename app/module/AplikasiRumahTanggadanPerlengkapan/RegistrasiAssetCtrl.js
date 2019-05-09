define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('RegistrasiAssetCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};

			$scope.sourceKondisi = [
				{
					"id": "1",
					"name": "Baik"
				},
				{
					"id": "2",
					"name": "Rusak Berat"
				},
				{
					"id": "3",
					"name": "Rusak Ringan"
				}
			];

			$scope.columnAsset = [
				{
					"field": "noRegistrasiAsset",
					"title": "No Registrasi Asset"
				},
				{
					"field": "noInventarisInternal",
					"title": "No Inventaris Internal"
				},
				{
					"field": "jenisAsset",
					"title": "Jenis Asset"
				},
				{
					"field": "namaBarang",
					"title": "Nama Barang"
				},
				{
					"field": "qty",
					"title": "Qty",
					width: "50px"
				},
				{
					"field": "satuan",
					"title": "Satuan"
				},
				{
					"field": "harga",
					"title": "Harga"
				},
				{
					"field": "asalBarang",
					"title": "Asal Barang"
				},
				{
					"field": "merk",
					"title": "Merk"
				},
				{
					"field": "noSeri",
					"title": "No. Seri"
				},
				{
					"field": "type",
					"title": "Type"
				},
				{
					"field": "tahunPerolehan",
					"title": "Tahun Perolehan"
				},
				{
					"field": "kondisiAsset",
					"title": "Kondisi Asset"
				},
				{
					"field": "lokasiAsset",
					"title": "Lokasi Asset"
				}
			];

			$scope.sourceAsset = new kendo.data.DataSource({
				data: []
			});

			$scope.Save = function(){
				var data = {
					"noRegistrasiAsset": $scope.item.noRegistrasiAsset,
					"noInventarisInternal": $scope.item.noInventarisInternal,
					"jenisAsset": $scope.item.jenisAsset,
					"namaBarang": $scope.item.namaBarang,
					"qty": $scope.item.quantity,
					"satuan": $scope.item.satuan,
					"harga": $scope.item.harga,
					"asalBarang": $scope.item.asalBarang,
					"merk": $scope.item.merk,
					"noSeri": $scope.item.noSeri,
					"type": $scope.item.type,
					"tahunPerolehan": $scope.item.tahunPerolehan,
					"kondisiAsset": $scope.item.kondisiAsset,
					"lokasiAsset": $scope.item.lokasiAsset
				}
			}
	}])
})