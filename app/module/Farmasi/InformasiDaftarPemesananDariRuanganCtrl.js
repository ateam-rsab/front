define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InformasiDaftarPemesananDariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Farmasi/InformasiDaftarPemesananDariRuangan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.daftarPemesananBarang = new kendo.data.DataSource({
				data: [
				{
					"noOrder" : "0001",
					"tglOrder" : "13-07-2016",
					"ruanganPemesanan" : "Aster",
					"userPemesan" : "Rahman",
					"ruanganTujuan" : "Aster",
					"noKirim" : "A00001"
				},
				{
					"noOrder" : "0002",
					"tglOrder" : "13-07-2016",
					"ruanganPemesanan" : "Aster",
					"userPemesan" : "Rahman",
					"ruanganTujuan" : "Aster",
					"noKirim" : "A00002"
				}
				]
			});
			$scope.columnPemesananBarang = [{
				"field": "noOrder",
				"title": "No Order",
			}, {
				"field": "tglOrder",
				"title": "Tgl Order",
			}, {
				"field": "ruanganPemesanan",
				"title": "Ruangan Pemesan",
			}, {
				"field": "userPemesan",
				"title": "User Pemesan",
			}, {
				"field": "ruanganTujuan",
				"title": "Ruangan Tujuan",
			}, {
				"field": "noKirim",
		        "title": "No Kirim",
		    }];
		}
	]);
});