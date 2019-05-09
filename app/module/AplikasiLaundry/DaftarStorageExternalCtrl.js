define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarStorageExternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});

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
				$scope.sourceOrder = dat.data.data;
				var beurat = 700;
				var number = 1;
				var datharga = 0;
				for (var i = 0; i < $scope.sourceOrder.length; i++) {
					$scope.sourceOrder[i].berat = beurat;
					$scope.sourceOrder[i].no = number++;
					//$scope.sourceOrder[i].harga = datharga * beurat; 
				}
			});


			var onDataBound = function () {
				debugger
				$('td').each(function () {
					if ($(this).text() == "Sudah Diambil") { $(this).addClass('green') }
				});
				$('td').each(function () {
					if ($(this).text() == "Belum Diambil") { $(this).addClass('red') }
				})
			};


			$scope.mainGridOptions = {
				editable: "popup",
				pageable: true,
				pageSize: 10,
				selectable: 'row',
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
						"title": "No.",
						"width": "20px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						}

					},
					{
						"field": "namaExternal",
						"title": "Nama Linen",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "satuanStandar",
						"title": "Satuan",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "qtyProduk",
						"title": "Stok",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "berat",
						"title": "Berat Linen ",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "harga",
						"title": "Harga",
						"width": "70px",
						"filterable": false

					}
				]
			};

		}
	]);
});