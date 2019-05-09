define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KaloriCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, $state, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("perencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindPasienGizi.getKalori($state.params.produkId).then(function(e){
				debugger;
				$scope.dataKalori = e.data.data.list;

				$scope.sourceDataKalori = new kendo.data.DataSource({
					pageSize: 10,
					data:$scope.dataKalori
				});
			});


			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "50px"
				}, {
					"field": "menu",
					"title": "<h3 align=center>Nama Menu</h3>",
					"width": "200px"
				}, {
					"field": "kalori",
					"title": "<h3 align=center>Berat (gr)<h3>",
					"width": "100px"
				}, {
					"field": "jumlahPorsi",
					"title": "<h3 align=center>Qty<h3>",
					"width": "70px"
				}, {
					"field": "satuanStandar",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "100px"
					// footerTemplate: "Jumlah:"
				}, {
					"field": "energi",
					"title": "<h3 align=center>Energi (Kkal)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "protein",
					"title": "<h3 align=center>Protein (gr)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "lemak",
					"title": "<h3 align=center>Lemak (gr)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "karbohidrat",
					"title": "<h3 align=center>Karbohidrat (gr)<h3>",
					"width": "150px"
					// footerTemplate: "<center>#= sum #</center> "
				}, {
					"field": "keterangan",
					"title": "<h3 align=center>Keterangan<h3>",
					"width": "200px"
				}]
			}

			$scope.navToPemesananPasien = function(){
            	$state.go("DaftarPemesananPasien")
            }
		}
	]);
});