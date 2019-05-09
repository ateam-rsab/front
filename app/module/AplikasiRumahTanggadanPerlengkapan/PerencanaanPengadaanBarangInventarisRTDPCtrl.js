define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PerencanaanPengadaanBarangInventarisRTDPCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};

			$scope.columnBarang = [
				{
					"template": "<input type='checkbox'>",
					width: "3%"
				},
				{
					"field": "kodeBarang",
					"title": "Kode Barang"
				},
				{
					"field": "namaBarang",
					"title": "Nama Barang",
					width: "15%"
				},
				{
					"field": "merk",
					"title": "Merk",
					width: "15%"
				},
				{
					"field": "type",
					"title": "Type",
					width: "15%"
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
					"field": "perencanaan",
					"title": "Perencanaan",
					width: "15%"
				},
				{
					"field": "total",
					"title": "Total"
				}
			];

			$scope.Save = function(){
				$scope.item.tglPerencanaan = DateHelper.getTanggalFormatted($scope.item.tglPerencanaan)
				console.log(JSON.stringify($scope.item));
			}
	}])
})