define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PembayaranTagihanNonLayananKasirCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir','CacheHelper',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir,cacheHelper) {
			debugger;
			//$scope.dataParams = JSON.parse($state.params.dataPasien);
			var data = cacheHelper.get('PembayaranTagihanNonLayananKasir');
            if (data !== undefined) {
                var splitResultData = data.split("#");
                var noRegistrasi2 = splitResultData[0]
                var cmdBayar = splitResultData[1]
                var dariSini = splitResultData[2]
                // $scope.item.periodeAwal = new Date(splitResultData[0]);
                // $scope.item.periodeAkhir = new Date(splitResultData[1]);
            }
			$scope.item = {};

			$q.all([
				modelItemAkuntansi.getDataTableTransaksi("kasir/detail-tagihan-non-layanan/"+ noRegistrasi2 )
				])
			.then(function(data) {

				if (data[0].statResponse){
					$scope.item = data[0];
					// $scope.item.totalTagihan = $scope.item.jumlahBayar;
					// $scope.item.jumlahBayarFix = $scope.item.jumlahBayar - $scope.item.totalDeposit;
					$scope.dataDaftarTagihan = new kendo.data.DataSource({
						data: data[0].detailTagihan
					});
				}

			});

			function showButton(){
				//$scope.showBtnCetak = true;
				debugger;
				$scope.showBtnBack = true;
				if (cmdBayar == "0"){
					$scope.showBtnBayar = true;
				}
				if (cmdBayar == "1"){
					$scope.showBtnBayar = false;
				}
				
				//$scope.showBtnTutup = true;
			}

			showButton();

			$scope.Back = function(){
				switch (dariSini) {
				    case "PembayaranTagihanLayananKasir":
				        if($scope.showBtnSimpan){
		            		$scope.changePage("PembayaranTagihanLayananKasir");
		            	}
		            	else
		            	{
		            		$state.go("DaftarPasienPulangKasir", {});	
		            	}
				        break;
				    case "PembayaranTagihanNonLayananKasir":
				        $scope.changePage("PembayaranTagihanNonLayananKasir");
				        break;
				    case "DaftarNonLayananKasir":
				        $scope.changePage("DaftarNonLayananKasir");
				        break;
				    case "DaftarPenjualanApotekKasir/terimaUmum":
				        $state.go("DaftarPenjualanApotekKasir",{dataFilter: "terimaUmum"});
				        break;
				    case "DaftarPenjualanApotekKasir/obatBebas":
				        $state.go("DaftarPenjualanApotekKasir",{dataFilter: "obatBebas"});
				        break;
				    case "DaftarPenjualanApotekKasir/keluarUmum":
				        $state.go("DaftarPenjualanApotekKasir",{dataFilter: "keluarUmum"});
				        break;
				    case "PenyetoranDepositKasir":
				        $scope.changePage("PenyetoranDepositKasir");
				        break;
				    case "PembayaranPiutangKasir":
				        if($scope.showBtnSimpan){
		            		$scope.changePage("PembayaranPiutangKasir");
		            	}
		            	else
		            	{
		            		$state.go("DaftarPiutangKasir", {});	
		            	}
				        break;
				}

				//$state.go(dariSini)
			};

			$scope.dataVOloaded = true;
			$scope.now = new Date();


			// $scope.dataDaftarTagihan = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.columnDaftarTagihan = [
			{
				"field": "namaLayanan",
				"title": "Tagihan",
				"width":"300px"
			},
			{
				"field": "jumlah",
				"title": "Qty",
				"width":"50px"
			},
			{
				"field": "harga",
				"title": "Harga",
				"width":"100px"
			},
			{
				"field": "total",
				"title": "Total",
				"width":"100px"
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
					pageFrom: dariSini,//"PembayaranTagihanNonLayananKasir",
            		noRegistrasi : noRegistrasi2
            	}

                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}

			$scope.Tutup = function(){
				
			}

		}
		]);
});