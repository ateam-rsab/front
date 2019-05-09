define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KartuStokCtrl', ['$rootScope', '$scope', 'ModelItem', 'PengajuanUsulanAnggaranService',
		function($rootScope, $scope, ModelItem, PengajuanUsulanAnggaranService){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });

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
					"title": "<div class='center'>Saldo Awal</div>",
					width: "10%"
				},
				{
					"field": "stokMasuk",
					"title": "<div class='center'>Saldo Masuk</div>",
					width: "10%"
				},
				{
					"field": "stokKeluar",
					"title": "<div class='center'>Saldo Keluar</div>",
					width: "10%"
				},
				{
					"field": "stokAkhir",
					"title": "<div class='center'>Saldo Akhir</div>",
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