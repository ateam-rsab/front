define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengirimanBarangCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras', 'DateHelper',
		function($rootScope, $scope, ModelItem, ManageSarpras, FindSarpras, DateHelper) {
			ModelItem.get("CSSD/MasterAlat").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.item = {};
			$scope.now = new Date();
			
			FindSarpras.getMasterAlat("alat/find-all-alat/").then(function(dat){
				$scope.sourceMasterAlat = dat;
			});
			$scope.dataPengirimanBarang = new kendo.data.DataSource({
				data: []
			});
			$scope.columndataPengirimanBarang = [
				{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "50px"
				}, {
					"field": "jenisLinen",
					"title": "<h3 align=center>Jenis Linen<h3>",
					"width": "200px"
				}, {
					"field": "namaLinen",
					"title": "<h3 align=center>Nama Linen<h3>",
					"width": "200px"
				}, {
					"field": "jmlLinen",
					"title": "<h3 align=center>Jumlah Linen</br>Ruangan<h3>",
					"width": "100px"
				}, {
					"field": "jmlPemakaian",
					"title": "<h3 align=center>Jumlah</br>Pemakaian<h3>",
					"width": "100px"
				}, {
					"field": "jmlKirim",
					"title": "<h3 align=center>Jumlah</br>Kirim<h3>",
					"width": "100px"
				}
			];


			$scope.Save=function()
			{
				ManageSarpras.saveSarpras(ModelItem.beforePost($scope.item)).then(function(e) {
				});
			};
		}
	]);
});