define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KirimBarangCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state',
		function($rootScope, $scope, ModelItem, DateHelper, $state){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.columnBarang = [
				{
					"field": "kdProduk",
					"title": "Kode Barang"
				},
				{
					"field": "namaProduk",
					"title": "Nama Barang"
				},
				{
					"field": "sumberDana",
					"title": "Sumber Dana"
				},
				{
					"field": "stok",
					"title": "Stok",
					width: "70px"
				},
				{
					"field": "order",
					"title": "Order",
					width: "70px"
				},
				{
					"field": "hargaSatuan",
					"title": "Harga Satuan"
				},
				{
					"field": "kirim",
					"title": "Kirim"
				},
				{
					"field": "hargaTotal",
					"title": "Harga Total"
				}
			];

			$scope.sourceRuangan = [
				{
					"id": "1",
					"ruanganPenerimaan": "ANNEX"
				}
			]
			$scope.isNoOrderChecked = true;
			$scope.cekNoOrder = function(){
				if($scope.isNoOrderChecked){
					$scope.isNoOrderChecked = false;
				}
				else{
					$scope.isNoOrderChecked = true;
				}
			};

			$scope.saveData = function(){
				var data = {
					"noOrder": $scope.item.noOrder,
					"tanggalOrder": DateHelper.getTanggalFormatted($scope.item.tanggalOrder),
					"ruanganPemesanan": $scope.item.ruanganPemesanan,
					"namaPemesan": $scope.item.namaPemesan,
					"tanggalKirim": DateHelper.getTanggalFormatted($scope.item.tanggalKirim),
					"idRuanganPenerimaan": $scope.item.ruanganPenerimaan.id
				}
				console.log(JSON.stringify(data));
			}
	}])
})