define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJabatanCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', '$timeout',
		function ($q, $rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, $timeout) {
			$scope.isRouteLoading = true;
			$scope.daftarJabatanOpt = {
				toolbar: [{
					name: "create", text: "Input Baru"
				}],
				pageable: true,
				scrollable: true,
				columns: [
					// { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
					{ field: "id", title: "Kode", width: 120 },
					{ field: "jenisJabatanId", title: "Jenis Jabatan ", editor: categoryDropDownEditor, "template": "# if (jenisJabatanId === 1) {# #= 'Fungsional' # #} else if (jenisJabatanId === 3){# #= 'Internal' # #} else if (jenisJabatanId === 5){# #= 'Struktural' # #} else {# #= '-' # #}#" },
					{ field: "namaJabatan", title: "Nama Jabatan" },
					{ field: "eselonId", title: "Eselon ", editor: categoryDropDownEditorEselon, "template": "# if (eselonId === 3) {# #= 'II.a' # #} else if (eselonId === 4){# #= 'II.b' # #} else if (eselonId === 5){# #= 'III.a' # #} else if (eselonId === 7){# #= 'IV.a' # #} else {# #= '-' # #}#" },
					{ field: "levelJabatan", title: "Level Jabatan" },
					{ field: "usiaPensiun", title: "Usia Pensiun", width: 120, attributes: { style: "text-align:right; padding-right: 15px;" } },
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
			// $scope.Cancel = function(){
			// 	delete $scope.item;
			// 	$scope.item = {};
			// }
			// $scope.Delete = function(){
			// 	ManageSdm.getOrderList("/jabatan/delete-jabatan/?id=" + $scope.item.id, true).then(function (dat) {        
			// 		init();
			// 	});
			// };
			function init() {
				$scope.item = {}; // set defined object
				$q.all([
					ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan,kdJabatan,usiaPensiun,jenisJabatanId,levelJabatan,eselonId&criteria=statusEnabled&values=true&order=namaJabatan:asc", true),
					ManageSdm.getOrderList("service/list-generic/?view=JenisJabatan&select=id,jenisJabatan&criteria=statusEnabled&values=true&order=jenisJabatan:asc", true),
					ManageSdm.getOrderList("service/list-generic/?view=Eselon&select=id,eselon&criteria=statusEnabled&values=true&order=eselon:asc", true),
				]).then(function (res) {
					if (res[0].statResponse) {
						$scope.daftarJabatan = new kendo.data.DataSource({
							data: res[0].data,
							// sort: {
							// 	field: "namaJabatan", 
							// 	dir: "asc"
							// },
							pageSize: 20,
							schema: {
								model: {
									id: "id",
									fields: {
										id: { editable: false },
										namaJabatan: {
											editable: true, validation: {
												validasiNamaJabatan: function (input) {
													if (input.is("[name='namaJabatan']") && input.val() === "") {
														return false;
													}
													return true;
												}
											}
										},
										kdJabatan: { editable: true },
										usiaPensiun: { editable: true },
										jenisJabatanId: {
											editable: true, validation: {
												validasiJenisJabatan: function (input) {
													if (input.is("[name='jenisJabatan']") && input.val() === "") {
														return false;
													}
													return true;
												}
											}
										},
										eselonId: {
											editable: true, validation: {
												validasiEselon: function (input) {
													if (input.is("[name='eselon']") && input.val() === "") {
														return false;
													}
													return true;
												}
											}
										}
									}
								}
							},
							change: function (e) {
								// if(!e.action || e.action == "sync"){
								// 	// set row number on detail grid
								// 	e.items.forEach(function(lis, index){
								// 		lis.rowNumber = ++index;
								// 	})
								// } else 
								if (e.field == "jenisJabatanId" && e.action == "itemchange") {
									e.items[0].jenisJabatanId = e.items[0].jenisJabatanId.id ? e.items[0].jenisJabatanId.id : e.items[0].jenisJabatanId;
								}
								if (e.field == "eselonId" && e.action == "itemchange") {
									e.items[0].eselonId = e.items[0].eselonId.id ? e.items[0].eselonId.id : e.items[0].eselonId;
								}
								if (e.action === "remove") {
									var item = e.items[0];
									if (item.jenisJabatanId !== "" && item.namaJabatan !== "") {
										item.action = e.action;
										$scope.Save(item);
										//$scope.Disabling(e.items[0]);
									} else if (item.eselonId !== "" && item.eselon !== "") {
										item.action = e.action;
										$scope.Save(item);
									} else {
										$scope.daftarJabatan.sync(); // call sync function to auto update row number w/o click on grid
									}
								}
							},
							sort: [
								{ field: "namaJabatan", dir: "asc" },
								{ field: "jenisJabatanId", dir: "asc" }
							]
						});
					}
					if (res[1].statResponse) {
						$scope.listJenisJabatan = res[1].data;
					}
					if (res[2].statResponse) {
						$scope.listEselon = res[2].data;
					}
					$scope.isRouteLoading = false;
				}, (error) => {
					$scope.isRouteLoading = false;
					throw error;
				})
				// ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,jenisJabatan&criteria=jenisJabatan&values=3", true).then(function (dat) {        
				// 	$scope.daftarJabatan = new kendo.data.DataSource({ 
				// 		data: dat.data,
				// 		pagesize: 25
				// 	});
				// });

			};
			$scope.Disabling = function (data) {
				var item = {
					id: data.id,
					statusEnabled: true,
					jenisJabatan: {
						id: data.jenisJabatanId
					},
					namaJabatan: data.namaJabatan,
					eselon: {
						id: data.eselonId
					},
					reportDisplay: data.namaJabatan,
					namaExternal: data.namaJabatan,
					usiaPensiun: parseInt(data.usiaPensiun),
					kdJabatan: data.kdJabatan,
					kodeExternal: data.kdJabatan,
					levelJabatan: data.levelJabatan
				}
				if (data.action && data.action === "remove") item.statusEnabled = false;
				// console.log(JSON.stringify(item));
				// $scope.item.jenisJabatan={"id":3};	
				// $scope.item.usiaPensiun = parseInt($scope.item.usiaPensiun);
				ManageSdm.saveMasterJabatan(item).then(function (e) {
					// delete $scope.item;
					// $scope.item = {};
					// init();
				});
			};

			$scope.Save = function (data) {
				var item = {
					id: data.id,
					statusEnabled: true,
					jenisJabatan: {
						id: data.jenisJabatanId
					},
					namaJabatan: data.namaJabatan,
					eselon: {
						id: data.eselonId
					},
					reportDisplay: data.namaJabatan,
					namaExternal: data.namaJabatan,
					usiaPensiun: parseInt(data.usiaPensiun),
					kdJabatan: data.kdJabatan,
					kodeExternal: data.kdJabatan,
					levelJabatan: data.levelJabatan
				}

				//validasi nama jabatan
				ManageSdmNew.getListData("jabatan/validate-nama-jabatan/?namaJabatan=" + data.namaJabatan + "&idJenisJabatan=" + data.jenisJabatanId, true).then(function (dat) {
					if (dat.data.data.msg) {
						toastr.warning(dat.data.data.msg);
						init();
						return;
					} else {
						if (data.action && data.action === "remove") item.statusEnabled = false;
						// console.log(JSON.stringify(item));
						// $scope.item.jenisJabatan={"id":3};	
						// $scope.item.usiaPensiun = parseInt($scope.item.usiaPensiun);
						ManageSdm.saveMasterJabatan(item).then(function (e) {
							// delete $scope.item;
							// $scope.item = {};
							// init();
						}, (error) => {

						});
					}
				});
			};
			function categoryDropDownEditor(container, options) {
				$('<input required name="' + options.field + '"/>')
					.appendTo(container)
					.kendoDropDownList({
						dataTextField: "jenisJabatan",
						dataValueField: "id",
						dataSource: $scope.listJenisJabatan
					});
			}
			function categoryDropDownEditorEselon(container, options) {
				$('<input required name="' + options.field + '"/>')
					.appendTo(container)
					.kendoDropDownList({
						dataTextField: "eselon",
						dataValueField: "id",
						dataSource: $scope.listEselon
					});
			}
			var timeoutPromise;
			$scope.$watch('item.jenisJabatan', function (newVal, oldVal) {
				if (newVal && newVal.id && newVal !== oldVal) {
					applyFilter("jenisJabatanId", newVal)
				}
			})
			$scope.$watch('item.eselon', function (newVal, oldVal) {
				if (newVal && newVal.id && newVal !== oldVal) {
					applyFilter("eselonId", newVal)
				}
			})
			$scope.$watch('item.namaJabatan', function (newVal, oldVal) {
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						applyFilter("namaJabatan", newVal)
					}
				}, 500)
			})
			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#gridJabatan").data("kendoGrid");
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
				var dataGrid = $("#gridJabatan").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.item = {};
			}
		}
	]);
});