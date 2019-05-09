define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StokOpnameBarangNonMedisLogistik2Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataStokOpnameBarangNonMedisLogistik2 = new kendo.data.DataSource({
				data: [
				{ 
					"jenisBarang" : "",
					"namaBarang":"",
					"asalBarang":"",
					"jmlMinimum":"",
					"stokSistem":"",
					"stokReal" : "",
					"hargaNetto":"",
					"discount":"",
					"selisih":"",
					"noRegistrasiAsset" : "1"
				}
				]
			});

			$scope.columndataStokOpnameBarangNonMedisLogistik2= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "jenisBarang",
				"title": "Jenis Barang",
				"width": "200px"
			}, {
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "200px"
			}, {
				"field": "asalBarang",
				"title": "Asal Barang",
				"width": "200px"
			}, {
				"field": "jmlMinimum",
				"title": "Jml Minimum",
				"width": "200px"
			}, {
				"field": "stokSistem",
				"title": "Stok Sistem",
				"width": "100px"
			}, {
				"field": "stokReal",
				"title": "Stok Real",
				"width": "100px"
			}, {
				"field": "hargaNetto",
				"title": "Harga Netto",
				"width": "200px"
			}, {
				"field": "discount",
				"title": "Discout",
				"width": "200px"
			}, {
				"field": "selisih",
				"title": "Selisih",
				"width": "200px"
			}, {
				"field": "noRegistrasiAsset",
				"title": "No Registrasi Asset",
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