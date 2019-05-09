define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenyusunanEPlanningCtrl', ['$q', '$rootScope', '$scope','ManageSarpras','DateHelper',
		function($q, $rootScope, $scope,manageSarpras,DateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item={};
			$scope.item.comboStatus = {};

			$scope.dataStatus=new kendo.data.DataSource({
				data:[{"Status":"PENGAJUAN"},{"Status":"VERIFIKASI"}]
			});

			$scope.dataListTahun=new kendo.data.DataSource({
				data:[{"Tahun":"2016"},{"Tahun":"2017"},{"Tahun":"2018"},{"Tahun":"2019"},{"Tahun":"2020"}]
			});

			manageSarpras.getOrderList("penyusunan-eplanning/get-penyusunan-eplanning/?isVerifikasi=PENGAJUAN").then(function(data){
				$scope.dataPenyusunanEPlanning=data.data.result;
			})
			$scope.columnPenyusunanEPlanning = [
			{
				"field": "no",
				"title": "No",
				"width":"150px"
			},
			{
				"field": "produkId	",
				"title": "produkId"
			},
			{
				"field": "namaProduk",
				"title": "namaProduk"
			},
			{
				"field": "volumeBarang",
				"title": "volumeBarang"
			},
			{
				"field": "hargaSatuan",
				"title": "hargaSatuan"
			},
			{
				"field": "totalHarga",
				"title": "totalHarga"
			}
			];


			$scope.Cari=function(){
				debugger;
				var status=$scope.item.comboStatus;
				manageSarpras.getOrderList("penyusunan-eplanning/get-penyusunan-eplanning/?isVerifikasi=" + status.Status).then(function(data){
					$scope.dataPenyusunanEPlanning=data.data.result;
				})
			}

		}
		]);
});