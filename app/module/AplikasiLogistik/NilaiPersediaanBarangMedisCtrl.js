define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('NilaiPersediaanBarangMedisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state){
			$scope.title = "";
			$scope.dataVOloaded = true;

			if($state.current.name === "NilaiPersediaanBarangMedis"){
				$scope.columnPersediaanBarang = [
					{
						"field": "jenisBarang",
						"title": "Jenis Barang"
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
						"field": "stokAwal",
						"title": "Stok Awal"
					},
					{
						"field": "stokMasuk",
						"title": "Stok Masuk"
					},
					{
						"field": "stokKeluar",
						"title": "Stok Keluar"
					},
					{
						"field": "stokAkhir",
						"title": "Stok Akhir"
					},
					{
						"field": "stokSystem",
						"title": "Stok System"
					},
					{
						"field": "stokReal",
						"title": "Stok Real"
					},
					{
						"field": "hargaNetto",
						"title": "Harga Netto 1"
					},
					{
						"field": "total",
						"title": "Total"
					},
					{
						"field": "tglKadaluarsa",
						"title": "Tgl Kadaluarsa"
					}
				];
			}else{
				$scope.columnPersediaanBarang = [
					{
						"field": "jenisBarang",
						"title": "Jenis Barang"
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
						"field": "stokAwal",
						"title": "Stok Awal"
					},
					{
						"field": "stokMasuk",
						"title": "Stok Masuk"
					},
					{
						"field": "stokKeluar",
						"title": "Stok Keluar"
					},
					{
						"field": "stokAkhir",
						"title": "Stok Akhir"
					},
					{
						"field": "stokSystem",
						"title": "Stok System"
					},
					{
						"field": "stokReal",
						"title": "Stok Real"
					},
					{
						"field": "hargaNetto",
						"title": "Harga Netto 1"
					},
					{
						"field": "total",
						"title": "Total"
					},
					{
						"field": "noTerima",
						"title": "No Terima"
					},
					{
						"field": "noRegistrasi",
						"title": "No Registrasi"
					}
				];
			}

			$scope.zebra = function(index){
				if(index % 2 === 0) return "background-color:lightgrey"
			}

			$scope.tanggalClosing = [
				{	
					"id": "1",
					"tanggal": "12/12/12"
				},
				{	
					"id": "2",
					"tanggal": "13/13/13"
				},
				{	
					"id": "3",
					"tanggal": "14/14/14"
				}
			];

			$scope.tanggalClicked = function(data){
				console.log(JSON.stringify(data));
			}
	}])
})