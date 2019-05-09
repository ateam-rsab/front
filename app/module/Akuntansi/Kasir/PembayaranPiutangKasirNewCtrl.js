define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembayaranPiutangKasirNewCtrl', ['$mdDialog','$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir', 
		function($mdDialog,$state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			// debugger;
			$scope.dataParams = JSON.parse($state.params.data);
			$scope.item = {};
			$scope.foc=true;
			$scope.$watch('item.jumlahBayar', function(newValue, oldValue) {
     		 	if (newValue != oldValue  ) {
     		 		$scope.jumlahBayar = 'Rp. ' +  parseFloat($scope.item.jumlahBayar).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
     		 	
	     		 	modelItemAkuntansi.getDataGlobal("valet/terbilang/"+newValue).then(
	                function(data){
	                	$scope.terbilang = data.terbilang;
	                })
     		 	}
     		})
			modelItemAkuntansi.getDataTableTransaksi("piutang/collected-piutang-layanan/" + $scope.dataParams.noPosting).then(function(data){
				$scope.dataSource = data;
				for (var i = 0; i < $scope.dataSource.length; i++) {
					$scope.dataSource[i].sisa =parseFloat($scope.dataSource[i].totalKlaim) - parseFloat($scope.dataSource[i].totalBayar);
				}
				if($scope.dataSource != undefined){
					$scope.item.noCollect = $scope.dataSource[0].noPosting;
					$scope.item.namaCollector = $scope.dataSource[0].collector;
					$scope.item.perusahaan = $scope.dataSource[0].namarekanan;
				};
				var ttlPasien = 0;
				var ttlKlaim = 0;
				var ttlSisa = 0;
				for(var i=0; i<$scope.dataSource.length; i++){
					ttlPasien = ttlPasien + 1;
					ttlKlaim = ttlKlaim + parseFloat($scope.dataSource[i].totalKlaim);
				};
				$scope.totalPasien = ttlPasien;

				// $scope.item.totalKlaim = ttlKlaim
				$scope.totalTagihan = 'Rp. ' +  parseFloat(ttlKlaim).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
				
				manageKasir.getItem("transaksi/kasir/detail-piutang-pasien-collect/"+$scope.item.noCollect, true).then(function(dat){
					$scope.listDetailPiutangpasien = dat.data.detailPembayaran;
					$scope.noRecSPP = dat.data.noRecSPP;
					var totalsbm = 0
					
					for(var i=0; i<$scope.listDetailPiutangpasien.length; i++){
						if ($scope.listDetailPiutangpasien.length == 0){
							var totaldibayar = 0
						}else{
							var totaldibayar = parseFloat($scope.listDetailPiutangpasien[i].jlhPembayaran);
						}	
						totalsbm = totalsbm + totaldibayar;
					};
					$scope.totalDeposit = "Rp. " + parseFloat(totalsbm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					$scope.jumlahBayarFix = "Rp. " + parseFloat(ttlKlaim-totalsbm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//dat.data.sisaPiutang;
					$scope.sisaTagihan = ttlKlaim-totalsbm;
					$scope.dataDaftarTagihan = new kendo.data.DataSource({
						data: $scope.listDetailPiutangpasien
					});
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
				if(parseFloat($scope.item.jumlahBayar) > $scope.sisaTagihan || parseFloat($scope.item.jumlahBayar) < $scope.sisaTagihan){
					var confirm = $mdDialog.confirm()
				          .title('Peringatan !!!')
				          .textContent('Apakah Anda Yakin Melanjutkan Pembayaran?')
				          .ariaLabel('Lucky day')
				          .ok('Ya')
				          .cancel('Tidak')

				    $mdDialog.show(confirm).then(function() {
				      	$scope.changePage("PenerimaanPembayaranKasirNew");
				    });
				}else if ($scope.item.jumlahBayar == "" || $scope.item.jumlahBayar == undefined || parseFloat($scope.item.jumlahBayar) == 0) {
					window.messageContainer.error("Jumlah Bayar Harus Di Isi !!!");
					return;
				}else{
					// var confirm = $mdDialog.confirm()
				 //          .title('Peringatan !!!')
				 //          .textContent('Apakah Anda Yakin Melanjutkan Pembayaran?')
				 //          .ariaLabel('Lucky day')
				 //          .ok('Ya')
				 //          .cancel('Tidak')

				 //    $mdDialog.show(confirm).then(function() {
				      	$scope.changePage("PenerimaanPembayaranKasirNew");
				    // });
				}					
			}

			$scope.changePage = function(stateName){
				debugger;
            	var obj = {
					pageFrom: "PembayaranPiutangKasirCollect",
            		noRegistrasi : $scope.noRecSPP,
            		jumlahBayar : $scope.item.jumlahBayar,
            		noposting : $scope.dataParams.noPosting
            	}
                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}


			$scope.Kembali = function(){
				$state.go('DaftarPiutangKasirNew', {});
			}

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//
			}

		}
		]);
});