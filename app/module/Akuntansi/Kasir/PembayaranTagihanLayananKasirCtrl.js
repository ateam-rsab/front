define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembayaranTagihanLayananKasirCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			
			$scope.dataParams = JSON.parse($state.params.dataPasien);

			$scope.item = {};

			$q.all([
				modelItemAkuntansi.getDataTableTransaksi("kasir/detail-tagihan-pasien/"+ $scope.dataParams.noRegistrasi )
				])
			.then(function(data) {

				if (data[0].statResponse){
					$scope.item = data[0];
					$scope.item.totalTagihan = $scope.item.jumlahBayar;
					$scope.item.jumlahBayarFix = $scope.item.jumlahBayar - $scope.item.totalDeposit;
					$scope.dataDaftarTagihan = new kendo.data.DataSource({
						data: data[0].detailTagihan
					});
				}

			});

			function showButton(){
				//$scope.showBtnCetak = true;
				//$scope.showBtnBatal = true;
				$scope.showBtnBayar = true;
				$scope.showBtnKembali = true;
			}

			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();


			
			$scope.columnDaftarTagihan = [
			{
				"field": "namaLayanan",
				"title": "Layanan",
				"width":"200px",
				"template": "<span class='style-left'>#: namaLayanan #</span>"
			},
			{
				"field": "jumlah",
				"title": "Jumlah",
				"width":"50px",
				"template": "<span class='style-right'>#: jumlah #</span>"
			},
			{
				"field": "harga",
				"title": "Harga",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>"
			},
			{
				"field": "diskon",
				"title": "Harga Diskon",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: diskon #', 'Rp.')}}</span>"
			},
			{
				"field": "total",
				"title": "Total",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
			}
			];

			$scope.Cetak = function(){
				
			}

			$scope.Batal = function(){
				
			}

			$scope.Bayar = function(){
				$scope.changePage("PenerimaanPembayaranKasir");
			}

			$scope.changePage = function(stateName){
				debugger;
				var obj = {
					pageFrom: "PembayaranTagihanLayananKasir",
            		noRegistrasi : $scope.dataParams.noRegistrasi 
            	}

                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}


			$scope.Kembali = function(){
				$state.go('DaftarPasienPulangKasir', {});
			}

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

		}
		]);
});