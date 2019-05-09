define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterSetAlatCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("CSSD/MasterSetAlat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataSourceAlat = new kendo.data.DataSource({
			        pageSize: 2,
			        data: [],
			        autoSync: true
			    });

				$scope.mainGridOptionsAlat = {
			        dataSource: $scope.dataSourceAlat,
			        pageable: false,
			        columns: [
			          	{
							field: "no",
							title: "<center>No",
							width: 40
						},
						{
							field: "namaAlat",
							title: "<center>Nama Alat",
							width: 150
						},
						{
							field: "jumlah",
							title: "<center>Jumlah",
							width: 100
						},
						{
							field: "satuan",
							title: "<center>Satuan",
							width: 100
						}],
			    	editable: false

		      	};$scope.dataSourceBarang = new kendo.data.DataSource({
			        pageSize: 2,
			        data: [],
			        autoSync: true
			    });

				$scope.mainGridOptionsBarang = {
			        dataSource: $scope.dataSourceBarang,
			        pageable: false,
			        columns: [
			          	{
							field: "no",
							title: "<center>No",
							width: 40
						},
						{
							field: "namaBarang",
							title: "<center>Nama Barang",
							width: 150
						},
						{
							field: "jumlah",
							title: "<center>Jumlah",
							width: 100
						},
						{
							field: "satuan",
							title: "<center>Satuan",
							width: 100
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});