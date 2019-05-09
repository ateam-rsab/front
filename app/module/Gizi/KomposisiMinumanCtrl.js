define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomposisiMinumanCtrl', ['$rootScope', '$state', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $state, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindPasienGizi.getKomposisiMinuman($state.params.produkId).then(function(dat){
            	$scope.sourceKomposisiMinuman = new kendo.data.DataSource({
					pageSize: 10,
					data: dat.data.data.list
				})
			});
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [
				{
					"field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "50px"
				}, {
					"field": "menu",
					"title": "<h3 align=center>Menu</h3>",
					"width": "200px"
				}, {
					"field": "bahan",
					"title": "<h3 align=center>Bahan<h3>",
					"width": "100px"
				},{
					"field": "jumlah",
					"title": "<h3 align=center>Jumlah<h3>",
					"width": "100px"
				},{
					"field": "satuan",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "100px"
				}]
			};

			$scope.back = function(){
				$state.go('DaftarPemesananPasien')
			};
		}
	]);
});