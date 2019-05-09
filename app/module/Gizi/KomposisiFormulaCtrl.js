define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomposisiFormulaCtrl', ['$rootScope', '$state', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $state, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindPasienGizi.getKomposisiFormula($state.params.produkId).then(function(dat){
            	$scope.sourceKomposisiFormula = new kendo.data.DataSource({
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
					"field": "jenisMakananCair",
					"title": "<h3 align=center>Jenis Makanan Cair</h3>",
					"width": "200px"
				}, {
					"field": "frekuensi",
					"title": "<h3 align=center>Frekuensi<h3>",
					"width": "100px"
				},{
					"field": "jumlah",
					"title": "<h3 align=center>Jumlah<h3>",
					"width": "100px"
				},{
					"field": "per1000ml",
					"title": "<h3 align=center>Per 1000 ML<h3>",
					"width": "700px",
					"columns":[
					{
						"field": "energi",
						"title": "<h3 align=center>Energi<h3>",
						"width": "100px"
					}, {
						"field": "protein",
						"title": "<h3 align=center>Protein</h3>",
						"width": "100px"
					}, {
						"field": "laktosa",
						"title": "<h3 align=center>Laktosa<h3>",
						"width": "100px"
					},{
						"field": "kalium",
						"title": "<h3 align=center>Kalium<h3>",
						"width": "100px"
					}, {
						"field": "natrium",
						"title": "<h3 align=center>Natrium</h3>",
						"width": "100px"
					}, {
						"field": "magnesium",
						"title": "<h3 align=center>Magnesium<h3>",
						"width": "100px"
					},{
						"field": "seng",
						"title": "<h3 align=center>Seng<h3>",
						"width": "100px"
					}, {
						"field": "tembaga",
						"title": "<h3 align=center>Tembaga(cu)</h3>",
						"width": "100px"
					}, {
						"field": "energiprotein",
						"title": "<h3 align=center>% Energi Protein<h3>",
						"width": "100px"
					},{
						"field": "energiLemak",
						"title": "<h3 align=center>% Energi Lemak<h3>",
						"width": "100px"
					},{
						"field": "osmolantus",
						"title": "<h3 align=center>Osmolantus<h3>",
						"width": "100px"
					}]
				}]
			}
			$scope.back = function(){
				$state.go('DaftarPemesananPasien')
			};
		}
	]);
});