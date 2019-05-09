
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarSpjUYHDBendaharaPengeluaranBPCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			function showButton(){
				$scope.showBtnTutup = true;
				$scope.showBtnBayarSpj = true;
				$scope.showBtnVerifikasi = true;
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
				"field": "TglPengajuan",
				"title": "Tgl Pengajuan"
			},
			{
				"field": "Keperluan",
				"title": "Keperluan"
			},
			{
				"field": "TglSpj",
				"title": "Tgl Spj"
			},
			{
				"field": "JmlUyhd",
				"title": "Jml Uyhd"
			},
			{
				"field": "JmlSpj",
				"title": "Jml Spj"
			},
			{
				"field": "Status",
				"title": "Status"
			}
			];

		}
		]);
});

