define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarMasterProduksiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("CSSD/DaftarMasterProduksi").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataSource = new kendo.data.DataSource({
 					pageSize: 2,
			        data: [],
			        autoSync: true
			    });

				$scope.mainGridOptions = {
			        dataSource: $scope.dataSource,
			        pageable: false,
			        columns: [
			          	{
							field: "no",
							title: "No",
							width: 40
						},
						{
							field: "nama",
							title: "Tanggal",
							width: 100
						},
						{
							field: "bmhp",
							title: "BMHP",
							width: 100
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