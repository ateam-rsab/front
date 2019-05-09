define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ResepObatCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("ResepObat").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("DataJenisObat", false).then(function(data) {
				$scope.listJenisObat = data;
			})

			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listJenisKelamin = data;
			})

			ModelItem.getDataDummyGeneric("DataNamaObat", false).then(function(data) {
				$scope.listNamaBarang = data;
			})

			ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
				$scope.listRuanganTujuan = data;
			})

			//waktu saat ini
			$scope.now = new Date();

			$scope.tempItem = {
				"JenisObat" : "",
				"NamaBarang" : "",
				"Stock" : "50",
				"Jumlah" : "",
				"AturanPakai" : "",
				"KeteranganPakai" : "",
				"KeteranganPakai2" : "",
				"KeteranganLain" : ""		
			};
			$scope.addDataResepObat = function() {

				var tempDatariwayat = {
					"id": "1",
					"jenisObat" : $scope.tempItem.JenisObat.name,
					"namaBarang" : $scope.tempItem.NamaBarang,
					"stock" : $scope.tempItem.Stock,
					"jumlah" : $scope.tempItem.Jumlah,
					"aturanPakai" : $scope.tempItem.AturanPakai,
					"keteranganPakai" : $scope.tempItem.KeteranganPakai,
					"keteranganPakai2" : $scope.tempItem.KeteranganPakai2,
					"keteranganLain" : $scope.tempItem.KeteranganLain,
				}

				$scope.dataResepObat.add(tempDatariwayat);
			}

			$scope.removeDataResepObat = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.dataResepObat.remove(selectedItem);
			};

			//-----keperluan grid RiwayatPenyakitOrObat
			$scope.dataResepObat = new kendo.data.DataSource({
				data: []
			});

			$scope.columnDataResepObat = [{
				"field": "jenisObat",
				"title": "Jenis Obat"
			}, 
			{
				"field": "namaBarang.name",
				"title": "Nama Barang"
			}, 
			{
				"field": "stock",
				"title": "Stock",
				"width": "80px"
			}, 
			{
				"field": "jumlah",
				"title": "Jumlah",
				"width": "80px"
			}, 
			{
				"field": "aturanPakai",
				"title": "Aturan Pakai"
			}, 
			{
				"field": "keteranganPakai",
				"title": "Keterangan Pakai"
			}, 
			{
				"field": "keteranganPakai2",
				"title": "Keterangan Pakai 2"
			}, 
			{
				"field": "keteranganLain",
				"title": "Keterangan Lainnya"
			}, 
			{
		        command: { text: "Hapus", click: $scope.removeDataResepObat },
		        title: "&nbsp;",
		        width: "100px"
		    }];
		}
	]);
});