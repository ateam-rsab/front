define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanUYHDBPKAngsuranDirekturBPCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};

			//isi combobox
			// ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=kdRuangan,namaRuangan").then(function(data){
			// 	$scope.listRuangan=data.data;
			// });

			function showButton(){
				$scope.showBtnTutup = true;
				$scope.showBtnVerifikasi = true;
			}
			showButton();

			// $scope.listStatus = new kendo.data.DataSource({
			// 	data: [{"namaStatus"="Pengajuan"}]
			// });
			
			// $scope.dataListTahun=new kendo.data.DataSource({
			// 	data:[{"FieldTahun":"2015"},{"FieldTahun":"2016"},{"FieldTahun":"2017"},{"FieldTahun":"2018"},{"FieldTahun":"2019"},{"FieldTahun":"2020"}]
			// });

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