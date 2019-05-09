define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ProsesSterilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("CSSD/ProsesSterilisasiAlat").then(function(data) {
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
							field: "namaSet",
							title: "Nama Set",
							width: 150
						},
						{
							field: "namaBarang",
							title: "Nama Barang",
							width: 150
						},
						{
							field: "jumlah",
							title: "Jumlah",
							width: 100
						},
						{
							field: "satuan",
							title: "Satuan",
							width: 100
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});