define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarStokLinenLaundryCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.isShowPopUp = false;
			$scope.kl = function (current) {
				$scope.current = current;
				$scope.noRec = current.noRec;
				$scope.noRecstrukPelayanan = current.noRecstrukPelayanan;
				$scope.no = current.no;
			}

			$scope.Distribusi = function () {
				$state.go("Distribusibaranglaundry");
			}

			$scope.Cari = function (Pencarians) {
				var q = Pencarians;
				var grid = $("#grid").data("kendoGrid");
				grid.dataSource.query({
					page: 1,
					pageSize: 20,
					filter: {
						logic: "or",
						filters: [
							{ field: "namaExternal", operator: "contains", value: q }
						]
					}
				});
			}

			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}

			ManageLaundry.getOrderList("laundry/get-laundry-linen-bersih").then(function (dat) {
				debugger;
				$scope.sourceOrder = dat.data.data;
				// var beurat = 700;
				var number = 1;
				$scope.daftarStokLinenLaundry = new kendo.data.DataSource({
					data: $scope.sourceOrder ,
					pageSize: 10
				});
				for (var i = 0; i < $scope.sourceOrder.length; i++) {
					// $scope.sourceOrder[i].berat = beurat;
					$scope.sourceOrder[i].no = number++;
				}
			});

			$scope.mainGridOptions = {
				editable: "popup",
				pageable: true,
				selectable: 'row',
				toolbar: ["excel", "pdf"],
				scrollable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				columns: [
					{
						"field": "no",
						"title": "<h3 align=center>No.<h3>",
						"width": "20px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						}

					},
					{
						"field": "namaExternal",
						"title": "<h3 align=center>Nama Linen<h3>",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "satuanStandar",
						"title": "<h3 align=center>Satuan<h3>",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "qtyProduk",
						"title": "<h3 align=center>Stok<h3>",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "beratLinen",
						"title": "<h3 align=center>Berat Linen<h3>",
						"width": "70px",
						"filterable": false

					}
				]
			};
		}
	]);
});