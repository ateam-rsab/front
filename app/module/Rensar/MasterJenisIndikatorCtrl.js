define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJenisIndikatorCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManagePhp', '$timeout',
		function ($q, $rootScope, $scope, ModelItem, $state, managePhp, $timeout) {
			$scope.isRouteLoading = true;
			$scope.daftarMasterOpt = {
				toolbar: [{
					name: "create", text: "Input Baru"
				}],
				pageable: true,
				scrollable: true,
				columns: [
					{ field: "kodeexternal", title: "Kode", width: 120 },
					{ field: "jenisindikator", title: "Jenis Indikator" },
					{ command: [{ name: "destroy", text: "Hapus" }, { name: "edit", text: "Edit" }], title: "&nbsp;", width: 160 }
				],
				editable: "popup",
				save: function (e) {
					$scope.Save(e.model);
				},
				edit: function (e) {
					e.sender.columns.forEach(function (element, index /*, array */) {
						if (element.hideMe) {
							e.container.find(".k-edit-label:eq(" + index + "), "
								+ ".k-edit-field:eq( " + index + ")"
							).hide();
						}
					});
				}
			};
			init();

			function init() {
				$scope.item = {}; // set defined object
				$q.all([
					managePhp.getData("rensar/get-jenis-indikator", true),
				]).then(function (res) {
					if (res[0].statResponse) {
						$scope.dataSource = new kendo.data.DataSource({
							data: res[0].data.data,
							sort: {
								field: "jenisindikator",
								dir: "asc"
							},
							pageSize: 20,
							schema: {
								model: {
									id: "id",
									fields: {
										id: { editable: false },
										jenisindikator: {
											editable: true, validation: {
												validasijenisindikator: function (input) {
													if (input.is("[name='jenisindikator']") && input.val() === "") {
														return false;
													}
													return true;
												}
											}
										},

									}
								}
							},
							change: function (e) {

								// if (e.field == "jenisJabatanId" && e.action == "itemchange") {
								// 	e.items[0].jenisJabatanId = e.items[0].jenisJabatanId.id ? e.items[0].jenisJabatanId.id : e.items[0].jenisJabatanId;
								// }
								if (e.action === "remove") {
									var item = e.items[0];
									if (item.jenisindikator !== "" && item.id !== "") {
										item.action = e.action;
										$scope.Save(item);
									} else {
										$scope.dataSource.sync(); // call sync function to auto update row number w/o click on grid
									}
								}
							}
						});
					}

					$scope.isRouteLoading = false;
				}, (error) => {
					$scope.isRouteLoading = false;
					throw error;
				})
			};
		
			$scope.Save = function (data) {
				var item = {
					id: data.id,
					statusenabled: true,
					kodeexternal: data.kodeexternal,
					jenisindikator: data.jenisindikator,
				}
				if (data.action && data.action === "remove") item.statusenabled = false
				managePhp.postData(item,'rensar/save-jenis-indikator').then(function (e) {
					// delete $scope.item;
					// $scope.item = {};
					// init();
				});
			};
			
			var timeoutPromise;
			$scope.$watch('item.jenisIndikator', function (newVal, oldVal) {
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal != oldVal) {
						applyFilter("jenisindikator", newVal)
					}
				}, 500)
			})
			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#gridMaster").data("kendoGrid");
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
				var dataGrid = $("#gridMaster").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.item = {};
			}
		}
	]);
});