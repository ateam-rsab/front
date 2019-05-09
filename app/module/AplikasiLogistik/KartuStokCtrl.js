define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KartuStokCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();

			

			$scope.columnStok = [
				{
					"field": "noBukti",
					"title": "<div class='center'>No Bukti</div>",
					width: "10%"
				},
				{
					"field": "tglTransaksi",
					"title": "<div class='center'>Tgl Transaksi</div>",
					width: "10%"
				},
				{
					"field": "asalTujuanBarang",
					"title": "<div class='center'>Asal Tujuan Barang</div>",
					width: "15%"
				},
				{
					"field": "namaBarang",
					"title": "<div class='center'>Nama Barang</div>",
					width: "25%"
				},
				{
					"field": "stokAwal",
					"title": "<div class='center'>Stok Awal</div>",
					width: "10%"
				},
				{
					"field": "stokMasuk",
					"title": "<div class='center'>Stok Masuk</div>",
					width: "10%"
				},
				{
					"field": "stokKeluar",
					"title": "<div class='center'>Stok Keluar</div>",
					width: "10%"
				},
				{
					"field": "stokAkhir",
					"title": "<div class='center'>Stok Akhir</div>",
					width: "10%"
				}
			];

			$scope.barangChecked = false;
			$scope.cekNamaBarang = function(){
				if($scope.barangChecked){
					$scope.barangChecked = false;
				}
				else{
					$scope.barangChecked = true;
				}
			}
	}])
})