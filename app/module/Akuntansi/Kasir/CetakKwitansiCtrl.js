define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CetakKwitansiCtrl', ['$sce', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
		function($sce, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			debugger;
			$scope.dataParams = JSON.parse($state.params.dataPasien);

			//$scope.item = {};
			$scope.listItem = [];

			var arrRequestData = []
			var HttpClient = function() {
			    this.get = function(aUrl, aCallback) {
			        var anHttpRequest = new XMLHttpRequest();
			        anHttpRequest.onreadystatechange = function() { 
			            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
			                aCallback(anHttpRequest.responseText);
			        }

			        anHttpRequest.open( "GET", aUrl, true );            
			        anHttpRequest.send( null );
			    }
			}
			for(var i=0; i<$scope.dataParams.noRegistrasi.length; i++){
				if ($scope.dataParams.jenis == "PenyetoranDepositKasir") {
					var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiDeposit($scope.dataParams.noRegistrasi[i]));
				}
				if ($scope.dataParams.jenis == "PembayaranPiutangKasir") {
					var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiCicilanPiutang($scope.dataParams.noRegistrasi[i]));
				}
				if ($scope.dataParams.jenis == "PembayaranTagihanNonLayananKasir") {
					var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiNonLayanan($scope.dataParams.noRegistrasi[i]));
				}
				if ($scope.dataParams.jenis == "DaftarNonLayananKasir") {
					var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiNonLayanan($scope.dataParams.noRegistrasi[i]));
				}
				if ($scope.dataParams.jenis == "DaftarPenjualanApotekKasir/terimaUmum") {
					var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiNonLayanan($scope.dataParams.noRegistrasi[i]));
				}
				if ($scope.dataParams.jenis == "DaftarPenjualanApotekKasir/obatBebas") {
					var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiNonLayanan($scope.dataParams.noRegistrasi[i]));
				}
				if ($scope.dataParams.jenis == "PembayaranTagihanPasienByNoRegistrasi") {
					var client = new HttpClient();
					client.get('http://127.0.0.1:1237/printvb/kasir?cetak-billing=1&noregistrasi='+$scope.dataParams.noRegistrasi[i]+'&view=false', function(response) {
					    // do something with response
					});
					//var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiTagihanByRegistrasi($scope.dataParams.noRegistrasi[i]));
				}
				
				$scope.listItem.push(urlKwintansi);
			}

			function showButton(){
				$scope.showBtnKembali = true;
			}
			showButton();

			$scope.pageKartuPulangPasien = true;

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.nowFormated = moment($scope.now).format('DD MMMM YYYY'),
			
			$scope.Kembali = function(){
				debugger;
				$state.go($scope.dataParams.backPage, {});
			}

			//create pdf kwintansi pembayaran
			$scope.getPDF = function(selector) {
				kendo.drawing.drawDOM($(selector)).then(function(group){
					kendo.drawing.pdf.saveAs(group, "Kwintansi-"+$scope.nowFormated+".pdf");
				});
			}

		}
		]);
});