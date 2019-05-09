define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenyetoranDepositKasirCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			
			$scope.dataParams = JSON.parse($state.params.dataPasien);

			$scope.item = {};
			

			$q.all([
				modelItemAkuntansi.getDataTableTransaksi("kasir/detail-pasien-deposit/"+ $scope.dataParams.noRegistrasi )
				])
			.then(function(data) {

				if (data[0].statResponse){
					$scope.item = data[0];
					$scope.dataDaftarPenyetoranDeposit = new kendo.data.DataSource({
						data: data[0].detailDeposit,
						schema:  {
		                 model: {
		                    fields: {
			                        tglTransaksi: { type: "date" }
		                        }
	                        }
		                }  

					});
				}
			});


			function showButton(){
				//$scope.showBtnCetak = true;
				$scope.showBtnBatal = true;
				$scope.showBtnBayar = true;
				$scope.showBtnKembali = true;
				$scope.showBtnKembaliDeposit = true;
			}

			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.formatTanggal = function(tanggal)
			{
				return moment(tanggal).format('DD-MMM-YYYY');
			}

			$scope.formatRupiah = function(value, currency) {
			    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
			
			$scope.columnDaftarPenyetoranDeposit = [
			{
				"field": "tglTransaksi",
				"title": "Tanggal",
				"width":"150px",
				"template": "<span class='style-left'>{{formatTanggal('#: tglTransaksi #')}}</span>"
			},
			{
				"field": "jumlahDeposit",
				"title": "Jumlah",
				"width":"150px",
				"template": "<span class='style-right'>{{formatRupiah('#: jumlahDeposit #', 'Rp.')}}</span>"
			}
			];

			$scope.Cetak = function(){
				
			}

			$scope.Batal = function(){
				
			}

			$scope.Bayar = function(){
				if (parseFloat($scope.item.jumlah) < 0) {
					alert('Nilai tidak boleh negatif!')
					return
				}
				var listRawRequired = [
                    "item.jumlah|ng-model|Jumlah",
                ];
				var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
                
                if(isValid.status){
                	$scope.changePage("PenerimaanPembayaranKasir");
                }
                else
                {
                	modelItemAkuntansi.showMessages(isValid.messages);
                }
			}
			$scope.KembaliDeposit = function(){

				if (parseFloat($scope.item.jumlah) < 0) {
					alert('Nilai tidak boleh negatif!')
					return
				}

				var listRawRequired = [
                    "item.jumlah|ng-model|Jumlah",
                ];
				var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
                
				$scope.item.jumlah = parseFloat($scope.item.jumlah)*(-1)

                if(isValid.status){
                	$scope.changePage("PenerimaanPembayaranKasir");
                }
                else
                {
                	modelItemAkuntansi.showMessages(isValid.messages);
                }
			}

			$scope.Kembali = function(){
				$state.go('DaftarPasienAktif', {});
			}

			$scope.changePage = function(stateName){
				var obj = {
					pageFrom: "PenyetoranDepositKasir",
					jumlahBayar: $scope.item.jumlah,
            		noRegistrasi : $scope.dataParams.noRegistrasi
            	}

                $state.go(stateName, {
                   dataPasien: JSON.stringify(obj)
                });
			}

			
		}
		]);
});