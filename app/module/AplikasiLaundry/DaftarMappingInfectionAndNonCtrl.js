define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarMappingInfectionAndNonCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'IPSRSService', 'ManageSarpras', '$mdDialog',
		function ($rootScope, $scope, ModelItem, $state, IPSRSService, ManageSarpras, $mdDialog ) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.awal = $scope.now;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			$scope.ListDataJenis = [{
				id: 1,
				name: "Infeksius"
			}, {
				id: 2,
				name: "Non Infeksius"
			}]

			ManageSarpras.getOrderList("jenis-linen/find-all-jenis-linen/").then(function (dat) {
				$scope.sourceJenisLinen = dat.data.data.data
			});

			ManageSarpras.getOrderList("mapping-jenis-linen-to-produk/get-all-master-bahanbaku-by-linen").then(function (dat) {
				$scope.nomor = 1
				$scope.SourceDataAll = dat.data.data;
				$scope.dataSourceMasterMapping = new kendo.data.DataSource({
					data: $scope.SourceDataAll,
					pageSize: 10
				})
				for (var i = 0; i < $scope.SourceDataAll.length; i++) {
					$scope.SourceDataAll[i].no = $scope.nomor++;
				}
			});

			$scope.ChangePencucian = function (value) {
				$scope.statPencucian = true;
				var q = value.namaExternal;
				var grid = $("#grid").data("kendoGrid");
				grid.dataSource.query({
					page: 1,
					pageSize: 20,
					filter: {
						logic: "and",
						filters: [{ field: "jenislinen", operator: "eq", value: q }]
					}
				});
			}

			$scope.$watch("item.pencarian", function (newValue) {
				debugger
				if (newValue != undefined) {
					var q = newValue; // Value Baru
					var grid = $("#grid").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [{ field: "mesin", operator: "contains", value: q },
							{ field: "produk", operator: "contains", value: q }]
						}
					});
				}
			});

			$scope.ClearCari = function (Pencarians) {
				$scope.item.pencarian = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}

			$scope.mainGridOptions = {
				pageable: true,
				selectable: "row",
				columns: $scope.columnDataAlat,
				filterable: {
					extra: false,
					operators: {
						string: {
							startsWith: "Cari Alat",
						}
					}
				},
				editable: false
			};


			$scope.columnDataAlat = [
				{
					"field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "10px",
					"filterable": false

				},
				{
					"field": "jenislinen",
					"title": "<h3 align=center>Jenis Linen</h3>",
					"width": "25px",
					"filterable": false
				},
				{
					"field": "produk",
					"title": "<h3 align=center>Nama Bahan Baku</h3>",
					"width": "60px"

				},
				{
					"field": "qty",
					"title": "<h3 align=center>Qty</h3>",
					"width": "30px"

				},
				{
					"field": "satuanstandar",
					"title": "<h3 align=center>Satuan</h3>",
					"width": "30px"

				},
				{
					"field": "mesin",
					"title": "<h3 align=center>Nama Mesin</h3>",
					"width": "50px",
					"filterable": false

				}

			];

			$scope.Input = function () {

				$state.go('MappingInfectionAndNon');
			}

			$scope.Edit = function (argument) {

				$state.go('MappingInfectionAndNon');
			}

			$scope.Cancel = function (argument) {

			}


			$scope.Clear = function () {
				$scope.item = {};
			}

			$scope.Save = function (argument) {

				debugger
			}

		}

	]);
});