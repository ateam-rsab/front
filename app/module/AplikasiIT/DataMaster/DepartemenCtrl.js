define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DepartemenCtrl', ['$q', '$rootScope', '$scope', '$state', 'IPSRSService',
		function ($q, $rootScope, $scope, $state, IPSRSService) {
			$scope.item = {};

			$scope.init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Departemen", true).then(function (dat) {
					for(let i = 0; i < dat.data.data.Departemen.length; i++) {
						dat.data.data.Departemen[i].no = i + 1;
					}
					$scope.listDataMaster = dat.data.data.Departemen;
					

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster
					});
				});
			}

			$scope.init();

			$scope.mainGridOptions = {
				pageable: true,
				scrollable: true,
				columns: $scope.columnGrid
			};

			$scope.columnGrid = [{
					"field": "no",
					"title": "<h3>No</h3>",
					"width": "50px"
				},
				{
					"field": "kdDepartemen",
					"title": "<h3>Kode Departemen</h3>",
					"width": "200px"
				},
				{
					"field": "kodeExternal",
					"title": "<h3>Kode External</h3>",
					"width": "200px"
				},
				{
					"field": "namaDepartemen",
					"title": "<h3>Nama Departemen</h3>",
					"width": "200px"
				},
				{
					"field": "namaExternal",
					"title": "<h3>Nama External</h3>",
					"width": "200px"
				},
				{
					"field": "reportDisplay",
					"title": "<h3>Report Display</h3>",
					"width": "200px"
				},
				{
					"field": "statusEnabled",
					"title": "<h3>Status Enabled</h3>",
					"width": "100px"
				}
			]
		}
	]);
});