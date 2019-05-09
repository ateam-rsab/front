define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengirimanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("CSSD/DaftarPengiriman").then(function(data) {
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
							field: "tanggal",
							title: "Tanggal",
							width: 100
						},
						{
							field: "ruangan",
							title: "Ruangan",
							width: 150
						},
						{
							field: "jumlahItem",
							title: "JumlahItem",
							width: 150
						},
						{
							field: "petugas",
							title: "Petugas",
							width: 150
						},
						{
							field: "status",
							title: "Status",
							width: 100
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});