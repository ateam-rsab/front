define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MonitoringStokBarangMedisCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.item = {};

			$scope.columnStokBarang = [
				{
					"field": "namaBarang",
					"title": "<div class='center'>Nama Barang</div>",
					width: "40%"
				},
				{
					"field": "asalBarang",
					"title": "<div class='center'>Asal Barang</div>",
					width: "10%"
				},
				{
					"field": "jmlMinimum",
					"title": "<div class='center'>Jumlah Minimum</div>",
					width: "15%"
				},
				{
					"field": "jmlStok",
					"title": "<div class='center'>Jumlah Stok</div>",
					width: "10%"
				},
				{
					"field": "satuan",
					"title": "<div class='center'>Satuan</div>",
					width: "25%"
				}
			];

			$scope.checked = false;
			$scope.cekMonitoringStokRuangan = function(){
				if($scope.checked){
					$scope.checked = false;
				}
				else{
					$scope.checked = true;
				}
			}
	}])
})