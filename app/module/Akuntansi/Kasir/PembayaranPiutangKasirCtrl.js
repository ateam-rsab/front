define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembayaranPiutangKasirCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir', 
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			// debugger;
			$scope.dataParams = JSON.parse($state.params.dataPasien);
			$scope.item = {};
			debugger;
			manageKasir.getItem("transaksi/kasir/detail-piutang-pasien/"+$scope.dataParams.noRegistrasi, true).then(function(dat){
				$scope.listDetailPiutangpasien = dat.data;
				$scope.item.noRegistrasi = dat.data.noRegistrasi;
				$scope.item.noCm = dat.data.noCM;
				$scope.item.namaPasien = dat.data.namaPasien;
				$scope.item.jenisKelamin = dat.data.jenisKelamin;
				$scope.item.jenisPenjamin = dat.data.jenisPenjamin;
				$scope.item.umur = dat.data.umurPiutang;
				$scope.item.totalTagihan =  "Rp. " + parseFloat(dat.data.totalTagihan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//dat.data.totalTagihan;
				$scope.item.totalDeposit = "Rp. " + parseFloat(dat.data.sudahDibayar).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//dat.data.sudahDibayar;
				$scope.item.jumlahBayarFix = "Rp. " + parseFloat(dat.data.totalTagihan-dat.data.sudahDibayar).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//dat.data.sisaPiutang;
				$scope.dataDaftarTagihan = new kendo.data.DataSource({
					data: $scope.listDetailPiutangpasien.detailPembayaran
				});
			});
			

			function showButton(){
				//$scope.showBtnCetak = true;
				$scope.showBtnBatal = true;
				$scope.showBtnBayar = true;
				$scope.showBtnKembali = true;
			}

			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();


			
			$scope.columnDaftarTagihan = [
			{
				"field": "noSbm",
				"title": "Nomor SBM",
				"width":"200px"
			},
			{
				"field": "tglPembayaran",
				"title": "Tgl Pembayaran",
				"width":"50px"
			},
			{
				"field": "jlhPembayaran",
				"title": "Jumlah Pembayaran",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: jlhPembayaran #', 'Rp.')}}</span>"
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
					pageFrom: "PembayaranPiutangKasir",
            		noRegistrasi : $scope.dataParams.noRegistrasi,
            		jumlahBayar : $scope.item.jumlahBayar 
            	}

                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}


			$scope.Kembali = function(){
				$state.go('DaftarPiutangKasir', {});
			}

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//
			}

		}
		]);
});