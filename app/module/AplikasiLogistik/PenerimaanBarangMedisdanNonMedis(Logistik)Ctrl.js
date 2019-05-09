define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenerimaanBarangMedisdanNonMedis(Logistik)Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataPermintaanBahanMakanandariRuangan = new kendo.data.DataSource({
				data: [
				{ 
					"kodeBarang" : "",
					"namaBarang":"",
					"asalBarang":"",
					"stok":"",
					"order" : "",
					"JmlTerima":"",
					"terimaKemasan":"",
					"hargaKemasan":"",
					"hargaSatuan" : "",
					"disc":"",
					"total":"",
					"kondisiBarang":"",
					"rakLokasiBarang" : "",
					"tglKadaluarsa":"",
					"batch":""
				}
				]
			});

			$scope.columnPermintaanBahanMakanandariRuangan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "kodeBarang",
				"title": "<h3 align=center>Kode Barang</h3>",
				"width": "150px"
			}, {
				"field": "namaBarang",
				"title": "<h3 align=center>Nama Barang</h3>",
				"width": "200px"
			}, {
				"field": "asalBarang",
				"title": "<h3 align=center>Asal Barang</h3>",
				"width": "300px"
			}, {
				"field": "stok",
				"title": "<h3 align=center>Stok</h3>",
				"width": "100px"
			}, {
				"field": "order",
				"title": "<h3 align=center>Order</h3>",
				"width": "100px"
			}, {
				"field": "JmlTerima",
				"title": "<h3 align=center>Jml Terima</h3>",
				"width": "100px"
			}, {
				"field": "terimaKemasan",
				"title": "<h3 align=center>Terima Kemasan</h3>",
				"width": "200px"
			}, {
				"field": "hargaKemasan",
				"title": "<h3 align=center>Harga Kemasan</h3>",
				"width": "200px"
			}, {
				"field": "hargaSatuan",
				"title": "<h3 align=center>Harga Satuan</h3>",
				"width": "200px"
			}, {
				"field": "disc",
				"title": "<h3 align=center>Disc</h3>",
				"width": "200px"
			}, {
				"field": "total",
				"title": "<h3 align=center>Total</h3>",
				"width": "200px"
			}, {
				"field": "kondisiBarang",
				"title": "<h3 align=center>Kondisi Barang</h3>",
				"width": "200px"
			}, {
				"field": "rakLokasiBarang",
				"title": "<h3 align=center>Rak Lokasi Barang</h3>",
				"width": "200px"
			}, {
				"field": "tglKadaluarsa",
				"title": "<h3 align=center>Tanggal Kadaluarsa</h3>",
				"width": "200px"
			}, {
				"field": "batch",
				"title": "<h3 align=center>Batch</h3>",
				"width": "200px"
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("Logistik/PenerimaanBarangMedisdanNonMedis(Logistik)").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Logistik/PenerimaanBarangMedisdanNonMedis(Logistik)/checkboxNoFaktur", false).then(function(data) {
			$scope.ListNoFaktur = data;
			})
			ModelItem.getDataDummyGeneric("Logistik/PenerimaanBarangMedisdanNonMedis(Logistik)/Supplier", true).then(function(data) {
			$scope.ListSupplier = data;
			})
		}
	]);
});