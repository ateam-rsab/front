define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKedudukanPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManagePegawai', 'FindPegawai', '$timeout',
		function($rootScope, $scope, ModelItem, ManagePegawai, FindPegawai, $timeout) {
			$scope.title = "Master Kedudukan Pegawai";
			$scope.opsiGrid = {
				toolbar: [{name: "create", text: "Tambah"}],
				pageable: true,
				selectable: "row",
				columns: [
					{field: "id", hidden: "true"},
					{field: "rowNumber", title: "#", width: 40},
					{field: "name", title: "Kedudukan"},
					{command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
				],
				editable: { mode: "popup", window: { title: "Kedudukan Pegawai" }, template: kendo.template($("#popup-editor").html())},
				dataBound: function(e) {
					e.sender._data.forEach(function(elemen, index){
						elemen.rowNumber = ++index;
					})
				},
				save: function(e){
					$scope.Save(e.model);
				}
			};
			function init(){
				$scope.isRouteLoading = true;
				FindPegawai.getListData("sdm/get-all-kedudukan").then(function(res){
					var result = res.data.data;
					result.forEach(function(item, index){
						item.rowNumber = ++index;
					})
					$scope.dataGrid = new kendo.data.DataSource({
						data: res.data.data,
						schema: {
							model: {
								id: "id",
								fields: {
									id: {editable: false},
									rowNumber: { editable: false},
									name: {editable: true, validation: { 
										validasiKomponen: function (input) {
										if (input.is("[name='kedudukan']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}},
								}
							}
						},
						pageSize: 20,
						change: function(e){
							if(e.action === "itemchange"){
								if(e.items[0].id){
									e.items.state = "edit"
								} else {
									e.items.state = "add"
								}
							} else if (e.action === "remove"){
								var item = e.items[0];
								if(item.name !== ""){
									item.action = e.action;
									$scope.Save(item);
								} else {
									$scope.dataGrid.sync(); // call sync function to auto update row number w/o click on grid
								}
							}
						}
					});
					$scope.isRouteLoading = false;
				}, (error) => {
					$scope.isRouteLoading = false;
					throw error;
				})
			}
			init();
			$scope.Save = function(data){
				var item = {
					"id": data.id,
					"statusEnabled": true,
					"namaExternal": data.name,
					"name": data.name,
					"reportDisplay": data.name,
				}
				if(data.action && data.action === "remove"){
					item.statusEnabled = false;
				}
				ManagePegawai.saveMasterData("sdm/save-kedudukan", item).then(function(res){
					debugger;
				}, (error) => {
					throw error;
				})
			}
			var timeoutPromise;
			$scope.$watch('item.namaKedudukan', function(newVal, oldVal){
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function(){
					if(newVal && newVal !== oldVal){
						applyFilter("name", newVal);
					}
				}, 500)
			})
			function applyFilter(filterField, filterValue){
				var gridData = $("#gridKedudukan").data("kendoGrid");
				var currFilterObj = gridData.dataSource.filter();
				var currentFilters = currFilterObj ? currFilterObj.filters : [];

				if(currentFilters && currentFilters.length > 0){
					for(var i = 0; i < currentFilters.length; i++){
						if(currentFilters[i].field == filterField){
							currentFilters.splice(i, 1);
							break;
						}
					}
				}

				if(filterValue !== ""){
					currentFilters.push({
						field: filterField,
						operator: "contains",
						value: filterValue
					})
				}

				gridData.dataSource.filter({
					logic: "and",
					filters: currentFilters
				})
			}
			$scope.resetFilter = function(){
				var dataGrid = $("#gridKedudukan").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.item = {};
			}
		}
	]);
});