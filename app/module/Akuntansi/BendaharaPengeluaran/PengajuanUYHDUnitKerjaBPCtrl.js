define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengajuanUYHDUnitKerjaBPCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};

			//isi combobox
			// ManageSarpras.getOrderList("service/list-generic/?view=MataAnggaran&select=*").then(function(data){
			// 	$scope.listKodeMataAnggaran=data.data;
			// });

			// //isi combobox
			// ManageSarpras.getOrderList("service/list-generic/?view=MataAnggaran&select=*").then(function(data){
			// 	$scope.listMataAnggaran=data.data;
			// });

			//select di grid isi ke textbox
			$scope.selectedData=function(selectedRuangan){
				$scope.item.mataAnggaran=selectedMataAnggaran.keterangan
			}

			function showButton(){
				$scope.showBtnTutup = true;
				$scope.showBtnSimpan = true;
			}
			showButton();
		}
		]);
});