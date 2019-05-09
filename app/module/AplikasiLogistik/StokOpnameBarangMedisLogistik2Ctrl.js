define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StokOpnameBarangMedisLogistik2Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataStokOpnameBarangMedis = new kendo.data.DataSource({
				data: [
				{ 
					"jenisBarang" : "",
					"namaBarang":"",
					"asalBarang":"",
					"stokSistem":"",
					"stokReal" : "",
					"tglKadaluarsa":"",
					"hargaNetto1":"",
					"hargaNetto2" : "",
					"discount":"",
					"jmlMinimum":"",
					"selisih":"1"
				}
				]
			});

			$scope.columndataStokOpnameBarangMedis= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "jenisBarang",
				"title": "<h3 align=center>Jenis Barang</h3>",
				"width": "200px"
			}, {
				"field": "namaBarang",
				"title": "<h3 align=center>Nama Barang</h3>",
				"width": "200px"
			}, {
				"field": "asalBarang",
				"title": "<h3 align=center>Asal Barang</h3>",
				"width": "200px"
			}, {
				"field": "stokSistem",
				"title": "<h3 align=center>Stok Sistem</h3>",
				"width": "100px"
			}, {
				"field": "stokReal",
				"title": "<h3 align=center>Stok Real</h3>",
				"width": "100px"
			}, {
				"field": "tglKadaluarsa",
				"title": "<h3 align=center>Tgl Kadaluarsa</h3>",
				"width": "200px"
			}, {
				"field": "hargaNetto1",
				"title": "<h3 align=center>Harga Netto 1</h3>",
				"width": "200px"
			}, {
				"field": "hargaNetto2",
				"title": "<h3 align=center>Harga Netto 2</h3>",
				"width": "200px"
			}, {
				"field": "discount",
				"title": "<h3 align=center>Discout</h3>",
				"width": "200px"
			}, {
				"field": "jmlMinimum",
				"title": "<h3 align=center>Jml Minimum</h3>",
				"width": "200px"
			}, {
				"field": "selisih",
				"title": "<h3 align=center>Selisih</h3>",
				"width": "200px"
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("Logistik/StokOpnameBarangMedisLogistik").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Logistik/StokOpnameBarangMedis/radioGroupBy", false).then(function(data) {
			$scope.Listradio = data;
			})
			ModelItem.getDataDummyGeneric("JenisBarang", true).then(function(data) {
			$scope.ListJenisBarang = data;
			})
		}
	]);
});