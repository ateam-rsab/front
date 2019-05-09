define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CetakDokumenKasirCtrl', ['$sce', '$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageKasir',
		function($sce, $state, $q, $rootScope, $scope, modelItemAkuntansi, manageKasir) {
			debugger;
			$scope.dataParams = JSON.parse($state.params.dataPasien);

			//$scope.item = {};
			$scope.listItem = [];

			var arrRequestData = []
			// for(var i=0; i<$scope.dataParams.noRegistrasi.length; i++){
			// 	var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansi($scope.dataParams.noRegistrasi[i]));
			// 	$scope.listItem.push(urlKwintansi);
			// }
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
			if ($scope.dataParams.noRegistrasi.length > 1) {
				var client = new HttpClient();
				client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansi=1&noregistrasi='+$scope.dataParams.noREG+'&view=false', function(response) {
				    // do something with response
				});
				// var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansiTagihanByRegistrasi($scope.dataParams.noREG));
				// $scope.listItem.push(urlKwintansi);
			}else{
				var urlKwintansi = $sce.trustAsResourceUrl(manageKasir.openPageKwitansi($scope.dataParams.noRegistrasi[0]));
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