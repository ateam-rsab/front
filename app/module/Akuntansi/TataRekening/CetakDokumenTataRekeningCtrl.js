define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CetakDokumenTataRekeningCtrl', ['$sce','$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening',
		function($sce, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening) {
			debugger;
			$scope.dataParams = JSON.parse($state.params.dataPasien);

			$scope.item = {};

			$scope.urlKartuPasien = $sce.trustAsResourceUrl(manageTataRekening.openPageKartuPasien($scope.dataParams.noRegistrasi));



			/*$q.all([
				modelItemAkuntansi.getDataTableTransaksi("tatarekening/cetak-pasien-pulang/"+ $scope.dataParams.noRegistrasi )
				])
			.then(function(data) {
				debugger;
				if (data[0].statResponse){
					$scope.item = data[0];
				}

			});*/

			function showButton(){
				$scope.showBtnKembali = true;
			}
			showButton();

			$scope.pageKartuPulangPasien = true;

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.nowFormated = moment($scope.now).format('DD MMMM YYYY'),
			
			$scope.Back = function(){
				$state.go('DaftarPasienPulang', {});
			}

			hideAllPageCetak();

			function hideAllPageCetak(){
				$scope.pageRekapBiayaPelayanan = false; // 0
				$scope.pageKartuPulangPasien = false;
			}

			$scope.showHidePageCetak = function(index){

				hideAllPageCetak();
				switch(index) {
				    case 0:
				        $scope.pageRekapBiayaPelayanan = true;
				        break;
				    case 1:
				        $scope.pageKartuPulangPasien = true;
				        break;
				}

			}

			//create pdf kwintansi pembayaran
			$scope.getPDF = function(selector) {
				kendo.drawing.drawDOM($(selector)).then(function(group){
					kendo.drawing.pdf.saveAs(group, "Kwintansi-Pembayaran-"+$scope.nowFormated+".pdf");
				});
			}



		}
		]);
});