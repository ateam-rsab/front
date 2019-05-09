define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('AturanPeminjamanRevCtrl', ['$rootScope', '$scope', 'ModelItem', 'ModelItemAkuntansi', 'ManageServicePhp', '$window', '$timeout',
		function ($rootScope, $scope, ModelItem, ModelItemAkuntansi, manageServicePhp, $window, $timeout) {
			$scope.item = {};

			$scope.isRouteLoading = false;
			$scope.item.tahunTerbit = new Date();

			$scope.yearSelected = {
				start: "year",
				depth: "year",
				format: "yyyy"
			};
			loadCombo();
			loadData();
			$scope.Search = function () {
				loadData()
			}
			$scope.Clear = function () {
				$scope.item = {}


			}
			function loadCombo() {

				manageServicePhp.getDataTableTransaksi("perpustakaan/get-combo").then(function (e) {
					$scope.listTipeKoleksi = e.data.tipekoleksi
					$scope.listTipeKeanggotaan = e.data.tipekeanggotaan
					$scope.listPeriodePinjaman = e.data.periodepinjaman
				})
			}



			function loadData() {
				$scope.isRouteLoading = true;

				var tipeKeanggotaans = ""
				if ($scope.item.tipeKeanggotaans != undefined) {
					tipeKeanggotaans = "&tipeKeanggotaans=" + $scope.item.tipeKeanggotaans
				}
				var tipeKoleksis = ""
				if ($scope.item.tipeKoleksis != undefined) {
					tipeKoleksis = "&tipeKoleksis=" + $scope.item.tipeKoleksis
				}


				manageServicePhp.getDataTableTransaksi("perpustakaan/get-aturan-peminjaman?"
					+ tipeKeanggotaans
					+ tipeKoleksis

					).then(function (data) {
						$scope.isRouteLoading = false;
						for (var i = 0; i < data.data.data.length; i++) {
							data.data.data[i].no = i + 1
						}
						$scope.dataSource = new kendo.data.DataSource({
							data: data.data.data,
							pageSize: 10,
							serverPaging: true,


						});



					})
				}
				$scope.columnGrid = {
					toolbar: [
					{
						name: "add", text: "Tambah",
						template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
					},
					],
					pageable: true,
					scrollable: true,
					columns: [
					{ field: "tipekeanggotaan", title: "Tipe Keanggotaan", width: 120, "attributes": { align: "left" } },
					{ field: "tipekoleksi", title: "Tipe Koleksi", width: 120, "attributes": { align: "left" } },
					{ field: "jumlahpinjaman", title: "Jumlah Pinjaman", width: 80, "attributes": { align: "left" } },
					{ field: "periodepinjaman", title: "Periode Pinjaman", width: 80, "attributes": { align: "left" } },
					{ field: "dendaharian", title: "Denda Harian", width: 120, "attributes": { align: "left" } },
					{
						"command": [{
							text: "Hapus",
							click: hapusData,
							imageClass: "k-icon k-delete"
						}, {
							text: "Edit",
							click: editData,
							imageClass: "k-icon k-i-pencil"
						}],
						title: "",
						width: 90,
					}

					]
				};

				$scope.Tambah = function () {
					$scope.norecAP =undefined;
					$scope.Clear()
					$scope.popUps.center().open();
					$scope.popUps.center().open();
					var actions = $scope.popUps.options.actions;
					
					actions.splice(actions.indexOf("Close"), 1);
					
					$scope.popUps.setOptions({ actions : actions });
				}
				$scope.save = function () {
					var norec_ap = ""
					if ($scope.norecAP != undefined)
						norec_ap = $scope.norecAP

					var listRawRequired = [
					"item.tipeKeanggotaan|k-ng-model|Tipe Keanggotaan",
					"item.tipeKoleksi|k-ng-model|Tipe Koleksi",
					"item.jumlahPinjaman|ng-model|Jumlah Pinjaman",
					"item.periodePinjaman|k-ng-model|Periode Pinjaman",
					"item.dendaHarian|ng-model|Denda Harian"
					]
					var isValid = ModelItem.setValidation($scope, listRawRequired);

					if (isValid.status) {

						var objSave = {
							"norec_ap": norec_ap,
							"dendaharian": $scope.item.dendaHarian,
							"jumlahpinjaman": $scope.item.jumlahPinjaman,
							"periodepinjamanfk": $scope.item.periodePinjaman.id,
							"tipekeanggotaanfk": $scope.item.tipeKeanggotaan.id,
							"tipekoleksifk": $scope.item.tipeKoleksi.id,

						}
						manageServicePhp.saveDataTransaksi("perpustakaan/save-aturan-peminjaman", objSave).then(function (res) {
							loadData();
							$scope.Clear();
							$scope.norecAP =undefined
						})
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				}



				function hapusData(e) {
					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if (!dataItem) {
						toastr.error("Data Tidak Ditemukan");
						return;
					}
					var itemDelete = {
						"norec_ap": dataItem.norec
					}

					manageServicePhp.saveDataTransaksi("perpustakaan/delete-aturan-peminjaman", itemDelete).then(function (e) {
						if (e.status === 201) {
							loadData();

						}
					})

				}
				function editData(e) {
					$scope.Clear ();
					e.preventDefault();
					var grid = this;
					var row = $(e.currentTarget).closest("tr");
					var tr = $(e.target).closest("tr");
					var dataItem = this.dataItem(tr);
				// e.preventDefault();
				// var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return;
				} else {
					$scope.norecAP = dataItem.norec
					$scope.item.dendaHarian = dataItem.dendaharian
					$scope.item.jumlahPinjaman = dataItem.jumlahpinjaman
					$scope.item.periodePinjaman = { id: dataItem.periodepinjamanfk, periodepinjaman: dataItem.periodepinjaman }
					$scope.item.tipeKeanggotaan = { id: dataItem.tipekeanggotaanfk, tipekeanggotaan: dataItem.tipekeanggotaan }
					$scope.item.tipeKoleksi = { id: dataItem.tipekoleksifk, tipekoleksi: dataItem.tipekoleksi }

					$scope.popUps.center().open();
					var actions = $scope.popUps.options.actions;

					actions.splice(actions.indexOf("Close"), 1);

					$scope.popUps.setOptions({ actions : actions });

				}



			}

			$scope.tutup = function () {
				$scope.popUps.close();
				$scope.norecAP =undefined

			}

			var timeoutPromise;
			$scope.$watch('item.tipeKeanggotaans', function (newVal, oldVal) {
				if (newVal  && newVal !== oldVal) {
					applyFilter("tipekeanggotaan", newVal)
				}
			})
			$scope.$watch('item.tipeKoleksis', function (newVal, oldVal) {
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						applyFilter("tipekoleksi", newVal)
					}
				}, 500)
			})
			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#kGrids").data("kendoGrid");
				var currFilterObject = dataGrid.dataSource.filter();
				var currentFilters = currFilterObject ? currFilterObject.filters : [];

				if (currentFilters && currentFilters.length > 0) {
					for (var i = 0; i < currentFilters.length; i++) {
						if (currentFilters[i].field == filterField) {
							currentFilters.splice(i, 1);
							break;
						}
					}
				}

				if (filterValue.id) {
					currentFilters.push({
						field: filterField,
						operator: "eq",
						value: filterValue.id
					});
				} else {
					currentFilters.push({
						field: filterField,
						operator: "contains",
						value: filterValue
					})
				}

				dataGrid.dataSource.filter({
					logic: "and",
					filters: currentFilters
				})
			}
			$scope.resetFilter = function () {
				var dataGrid = $("#kGrids").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.item = {};
			}

		}
		]);
});

