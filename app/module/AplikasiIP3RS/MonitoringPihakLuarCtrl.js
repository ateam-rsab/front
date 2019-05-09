define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringPihakLuarCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', 
		function($rootScope, $scope, ModelItem, IPSRSService, $state) {
			ModelItem.get("IPSRS/MonitoringPihakLuar").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				
				var init = function () {
					$scope.dataPTMonevContoh = [
					{"bulan":"januari", "target":50, "realisasi":40},
					{"bulan":"februari", "target":30, "realisasi":25},
					{"bulan":"maret", "target":60, "realisasi":40},
					{"bulan":"april", "target":70, "realisasi":50},
					{"bulan":"mei", "target":40, "realisasi":30},
					{"bulan":"juni", "target":30, "realisasi":30},
					{"bulan":"juli", "target":50, "realisasi":40},
					{"bulan":"agustus", "target":60, "realisasi":50},
					{"bulan":"september", "target":10, "realisasi":5},
					{"bulan":"oktober", "target":20, "realisasi":15},
					{"bulan":"november", "target":30, "realisasi":20},
					{"bulan":"desember", "target":50, "realisasi":40}
					
					]
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataPTMonevContoh,
						autoSync: true
					});
					$scope.dataPihakLuar = new kendo.data.DataSource({
						data : $scope.dataPTMonevContoh,
						sort: {
							field: "bulan",
							dir: "asc"
						}
					});
				}
				init();
				$scope.mainChart = {
					theme : "black",
					categoryAxis : {
						categories: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
					},
	                seriesDefaults: {
	                    type: "line",
	                    style: "smooth"
	                }
					
				}
				$scope.mainGridMonevPihakLuar = { 
					pageable: true,
					columns: [
					{field: "bulan",title: "Bulan",width: 100},
					{field: "target",title: "Target",width: 150},
					{field: "realisasi",title: "Realisasi",width: 150}
						/*{field: "maret",title: "Maret",width: 150},
						{field: "april",title: "April",width: 150},
						{field: "mei",title: "Mei",width: 150},
						{field: "juni",title: "Juni",width: 150},
						{field: "juli",title: "Juli",width: 150},
						{field: "agustus",title: "Agustus",width: 150},
						{field: "september",title: "September",width: 150},
						{field: "oktober",title: "Oktober",width: 150},
						{field: "november",title: "November",width: 150},
						{field: "desember",title: "Desember",width: 150}*/
						],
					};


				}, function errorCallBack(err) {});
		}
		]);
});