define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('VerifikasiPiutangPasienCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening',
		function($state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening) {

			$scope.item = JSON.parse($state.params.dataPasien);

			debugger;

			function showButton(){
				$scope.showBtnKembali = true;
				$scope.showBtnSimpan = true;
			}
			showButton();

			$scope.dataVOloaded = true;
			$scope.now = new Date();

			$scope.Save = function(){
				window.messageContainer.log("Sukses");
				$scope.showBtnSimpan = false;
			}

			$scope.Back = function(){
				$state.go('DaftarPiutangPasien', {
                   /*noCM: $scope.noCM,
                    tanggal: $state.params.TglRegistrasi*/
                });
			}
		}
	]);
});