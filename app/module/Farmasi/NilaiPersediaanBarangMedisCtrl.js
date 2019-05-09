define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('NilaiPersediaanBarangMedisCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Farmasi/NilaiPersediaanBarangMedis").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.daftarTanggalPenutupan = new kendo.data.DataSource({
				data: [
				{
					"tanggalPenutupan" : "13-07-2016"
				},
				{
					"tanggalPenutupan" : "14-07-2016"
				},
				{
					"tanggalPenutupan" : "15-07-2016"
				},
				{
					"tanggalPenutupan" : "16-07-2016"
				},
				{
					"tanggalPenutupan" : "17-07-2016"
				},
				{
					"tanggalPenutupan" : "18-07-2016"
				}
				]
			});
			$scope.columnTanggalPenutupan = [{
				"field": "tanggalPenutupan",
				"title": "Tanggal Penutupan"
			}];
			$scope.daftarPersediaanBarangMedis = new kendo.data.DataSource({
				data: [{
					"jenisBarang":"Alkes",
					"namaBarang":"Silkam 2/0",
					"asalBarang":"BLUD",
					"stokAwal":"40",
					"stokMasuk":"5",
					"stokKeluar":"35",
					"stokAkhir":"10",
					"stokSystem":"10",
					"stokReal":"10",
					"hargaNetto1":"50.000",
					"total":"500.000",
					"tglKadaluarsa":"10-10-2016"
				}]
			});
			$scope.columnPersediaanBarangMedis = [
			{
				"field": "jenisBarang",
				"title": "Jenis Barang",
				"width": "100px"
			},
			{
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "150px"
			},
			{
				"field": "asalBarang",
				"title": "Asal Barang",
				"width": "150px"
			},
			{
				"field": "stokAwal",
				"title": "Stok Awal",
				"width": "100px"
			},
			{
				"field": "stokMasuk",
				"title": "Stok Masuk",
				"width": "100px"
			},
			{
				"field": "stokKeluar",
				"title": "Stok Keluar",
				"width": "100px"
			},
			{
				"field": "stokAkhir",
				"title": "Stok Akhir",
				"width": "100px"
			},
			{
				"field": "stokSystem",
				"title": "Stok System",
				"width": "100px"
			},
			{
				"field": "stokReal",
				"title": "Stok Real",
				"width": "100px"
			},
			
			{
				"field": "hargaNetto1",
				"title": "Harga Netto 1",
				"width": "150px"
			},
			{
				"field": "total",
				"title": "Total",
				"width": "100px"
			},
			{
				"field": "tglKadaluarsa",
				"title": "Tgl Kadaluarsa",
				"width": "150px"
			}
			];
			
		}
	]);
});