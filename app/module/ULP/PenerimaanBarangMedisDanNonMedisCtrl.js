define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PenerimaanBarangMedisDanNonMedisCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'PhpModelItem',
		function($rootScope, $scope, ModelItem, DateHelper, PhpModelItem){
			$scope.title = "Order";
			$scope.dataVOloaded = true;

			$scope.item = {};
			$scope.isNoOrderChecked = true;
			$scope.isNoTerimaChecked = true;
			$scope.isNoDiskonChecked = true;
			$scope.isNoPPNChecked = true;
			$scope.now = new Date();
			$scope.cekNoOrder = function(){
				if ($scope.isNoOrderChecked) {
					$scope.isNoOrderChecked = false;
				}
				else{
					$scope.isNoOrderChecked = true;
				}
			};

			$scope.cekNoTerima = function(){
				if ($scope.isNoTerimaChecked) {
					$scope.isNoTerimaChecked = false;
				}
				else{
					$scope.isNoTerimaChecked = true;
				}
			};

			$scope.cekBoxDiskon = function(){
				if ($scope.isNoDiskonChecked) {
					$scope.isNoDiskonChecked = false;
				}
				else{
					$scope.isNoDiskonChecked = true;
				}
			};

			$scope.cekPPN = function(){
				if ($scope.isNoPPNChecked) {
					$scope.isNoPPNChecked = false;
				}
				else{
					$scope.isNoPPNChecked = true;
				}
			};

			$scope.diskon = [
				{
					"id": "1",
					"name": "Persen (%)"
				},
				{
					"id": "2",
					"name": "Rupiah (Rp)"
				}
			]

			// ModelItem.getDataDummyGeneric('UPL/ValueDiskon', false).then(function(data){
			// 	$scope.diskon = data;
			// })

			//(nameGeneric, kendoSource, isServerFiltering, top, filter, select)

			// var strSelect = "id,namaProduk";
			PhpModelItem.phpGetDataGeneric('detailJenisProduk', true, false, false, 10).then(function(data){
				$scope.listNamaSuplier = data;
			})

			$scope.columnBarang = [
				{
					"field": "kodeBarang",
					"title": "Kode Barang"
				},
				{
					"field": "namaBarang",
					"title": "Nama Barang"
				},
				{
					"field": "asalBarang",
					"title": "Asal Barang"
				},
				{
					"field": "stok",
					"title": "Stok"
				},
				{
					"field": "order",
					"title": "Order"
				},
				{
					"field": "jmlTerima",
					"title": "Jml Terima"
				},
				{
					"field": "terimaKemasan",
					"title": "Terima Kemasan"
				},
				{
					"field": "hargaKemasan",
					"title": "Harga Kemasan"
				},
				{
					"field": "hargaSatuan",
					"title": "Harga Satuan"
				},
				{
					"field": "disc",
					"title": "Disc"
				},
				{
					"field": "total",
					"title": "Total"
				},
				{
					"field": "kondisiBarang",
					"title": "Kondisi Barang"
				},
				{
					"field": "jmlBarangDitolak",
					"title": "Jml Barang Ditolak"
				},
				{
					"field": "tolakKemasan",
					"title": "Tolak Kemasan"
				},
				{
					"field": "catatan",
					"title": "Catatan"
				}
			];

			$scope.deleteData = function(){
				$scope.item = {};
			}

			$scope.saveData = function(){
				$scope.item.tanggalOrder = DateHelper.getTanggalFormatted($scope.item.tanggalOrder);
				$scope.item.tanggalTerima = DateHelper.getTanggalFormatted($scope.item.tanggalTerima);
				$scope.item.tanggalFaktur = DateHelper.getTanggalFormatted($scope.item.tanggalFaktur);
				$scope.item.tanggalJatuhTempo = DateHelper.getTanggalFormatted($scope.item.tanggalJatuhTempo);
				console.log(JSON.stringify($scope.item));
			}

		}])
})