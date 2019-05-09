define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanUYHDUnitKerjaBPCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			function showButton(){
				$scope.showBtnTutup = true;
				$scope.showBtnCetak = true;
				$scope.showBtnSpj = true;
			}
			showButton();

			$scope.dataDaftarPengajuanUYHD = new kendo.data.DataSource({
				data: []
			});
			$scope.columnDaftarPengajuanUYHD = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "Tanggal",
				"title": "Tanggal"
			},
			{
				"field": "Keperluan",
				"title": "Keperluan"
			},
			{
				"field": "Ruangan",
				"title": "Ruangan"
			},
			{
				"field": "YangMengajukan",
				"title": "Yang Mengajukan"
			},
			{
				"field": "Jumlah",
				"title": "Jumlah"
			},
			{
				"field": "Status",
				"title": "Status"
			}
			];

		}
		]);
});