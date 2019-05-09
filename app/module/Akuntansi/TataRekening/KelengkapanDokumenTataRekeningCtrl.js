define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelengkapanDokumenTataRekeningCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening) {
			$scope.item = JSON.parse($state.params.dataPasien);

			console.log(JSON.stringify($scope.item));

			function showButton(){
				$scope.showBtnKembali = true;
				$scope.showBtnSimpan = true;
			}
			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();

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

			$scope.Save = function(){
				window.messageContainer.log("Sukses");
				$scope.showBtnSimpan = false;
			}

			$scope.Back = function(){
				$state.go('DaftarPasienPulang', {});
			}

		}
		]);
});