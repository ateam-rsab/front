define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringDanEvaluasiKapitalisasiBangunanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IPSRS/MonitoringDanEvaluasiKapitalisasiBangunan").then(function(data) {
				debugger
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataSource = new kendo.data.DataSource({
 					pageSize: 10,
			        data: [],
			        autoSync: true
			    });

				$scope.gridDaftarKegiatan = {
			        dataSource: $scope.dataSource,
			        pageable: false,
			        columns: [
			          	{
							field: "tglInput",
							title: "Tgl Input",
							width: 100
						},
						{
							field: "namaKegiatan",
							title: "Nama Kegiatan",
							width: 150
						},
						{
							field: "status",
							title: "Status",
							width: 75
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});