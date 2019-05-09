define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterSiklusGiziCtrl', ['$rootScope', '$scope', 'ModelItem','ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.SourceHariKe = new kendo.data.DataSource({
				data:[
				{
					"hariKe": 1
				},
				{
					"hariKe": 2
				},
				{
					"hariKe": 3
				},
				{
					"hariKe": 4
				},
				{
					"hariKe": 5
				},
				{
					"hariKe": 6
				},
				{
					"hariKe": 7
				},
				{
					"hariKe": 8
				},
				{
					"hariKe": 9
				},
				{
					"hariKe": 10
				},
				{
					"hariKe": 31
				}
				]
			})
			$scope.gridDetailMenu = {
				dataSource: $scope.dataSource,
				pageable: false,
				columns: [
					{
						field: "no",
						title: "No",
						width: 40
					},
					{
						field: "menuMakanan",
						title: "Menu Makanan/Minuman",
						width: 100
					}],
				editable: false
			};
			$scope.gridSiklusMenu = {
				dataSource: $scope.dataSource,
				pageable: false,
				columns: [
					{
						field: "siklusMenu",
						title: "Siklus Menu Makanan/Minuman",
						width: 60
					},
					{
						field: "hariKe",
						title: "Hari Ke",
						width: 20
					},
					{
						field: "waktuMakan",
						title: "Waktu Makan",
						width: 20
					}],
				editable: false
			};
		}
	]);
});