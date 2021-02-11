define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiTagihanCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening) {
			
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.nowFormated = moment($scope.now).format('DD-MM-YYYY');
			$scope.pageCetak = false;
			$scope.showKelengkapanDokumen = false;
			$scope.item = {};
			$scope.tombolSaveIlang =true;
			$scope.isDiskonRSAB = false;

			$scope.dataParams = JSON.parse($state.params.dataPasien);

			$q.all([
				modelItemAkuntansi.getDataTableTransaksi("tatarekening/verifikasi-tagihan2/"+ $scope.dataParams.noRegistrasi )
				])
			.then(function(data) {

				if (data[0].statResponse){
					$scope.isDiskonRSAB = (data[0].kelompokPasienID === 3 || data[0].kelompokPasienID === 5) && data[0].rekananID === 2905;

					$scope.item = data[0];
					if(data[0].needDokument)
					{
						$scope.showKelengkapanDokumen = true;
						$scope.dataKelengkapanDokumen = new kendo.data.DataSource({
							data: data[0].dokuments
						});
					}
					if ($scope.item.jenisPasien == 'BPJS') {
						// $scope.item.totalKlaim = $scope.item.jumlahBayar //Old
						$scope.item.totalKlaim = $scope.item.jumlahBayarNew //New
					}
					$scope.showTtlKlaim = true
					$scope.showTtlKlaim2 = false
					if (data[0].isRawatInap == false) {
						if (data[0].jenisPasien == 'Umum/Pribadi') {
							$scope.showTtlKlaim = false
							$scope.showTtlKlaim2 = true
						}
					}
				}

			});

			// function showButton(){
			// 	$scope.showBtnSimpan = true;
			// 	$scope.showBtnKembali = true;
			// 	// $scope.showBtnCetak = true;
			// }
			// showButton();

			$scope.Cetak = function(){
				$scope.pageCetak = true;
				$scope.showBtnCetak = false;
				$scope.showBtnSimpan = false;

				$scope.totalBayarFormated = formatRupiah($scope.item.jumlahBayar,"Rp.");
			}
			$scope.DetailTagihan = function(){
		   		var obj = {
		    		noRegistrasi : $scope.dataParams.noRegistrasi
		  		}

				$state.go("RincianTagihanTataRekening", {
			    	dataPasien: JSON.stringify(obj)
			  	});
			}

			$scope.Save = function(){
				$scope.tombolSaveIlang =false;
				var listRawRequired = [
			    	"item.totalKlaim|ng-model|Total klaim",
			    ];
			    
			    
			    var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);
			    
			    if(isValid.status){
			    	manageTataRekening.saveVerifikasiTagihan($scope.item)
					.then(function(e) {
						$scope.SaveLogUser();
	                	window.history.back();
	                	$scope.tombolSaveIlang = true;
	                }, function(){
	 
	                });
			    }
			    else
			    {
			    	modelItemAkuntansi.showMessages(isValid.messages);
			    }
			}
			$scope.SaveLogUser=function(){
			   manageTataRekening.getDataTableTransaksi("logging/save-log-verifikasi-tarek?noregistrasi="
			    + $scope.item.noRegistrasi).then(function(data) {
			 
	                })
			}
			$scope.Back = function(){
				if($scope.pageCetak){
					$scope.pageCetak = false;
					// $scope.showBtnCetak = true;
					$scope.showBtnSimpan = true;
				}
				else
				{
					window.history.back()
				}
			}

			$scope.dataKelengkapanDokumen = new kendo.data.DataSource({
				data: []
			});
			$scope.columnKelengkapanDokumen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "Check",
				"title": "Check"
			},
			{
				"field": "Nama",
				"title": "Nama"
			},
			{
				"field": "Dokumen",
				"title": "Dokumen"
			}
			];

			//create pdf kwintans pembayaran
			$scope.getPDF = function(selector) {
				kendo.drawing.drawDOM($(selector)).then(function(group){
					kendo.drawing.pdf.saveAs(group, "Kwintansi-Pembayaran-"+$scope.nowFormated+".pdf");
				});
			}

			function formatRupiah(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.$watch('item.totalKlaim', function(newValue, oldValue) {
                $scope.item.jumlahBayar = $scope.item.billing - newValue - $scope.item.deposit;
            });
		}
		]);
});