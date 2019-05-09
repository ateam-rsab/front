define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailTagihanKasirCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
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
				$scope.showBtnKembali = true;
			}

			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();


			
			$scope.columnDaftarTagihan = [
			{
				"field": "ruangan",
				"title": "Ruangan",
				"width":"200px",
				"template": "<span class='style-left'>#: ruangan #</span>"
			},
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
				"field": "total",
				"title": "Total",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"
			}
			];

			$scope.Kembali = function(){
				$state.go('DaftarPasienPulangKasir', {});
			}

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

		}
		]);
});