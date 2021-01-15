define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterUnitKerjaSDMCtrl', ['$rootScope','$scope','$timeout','ModelItem','$state','ManageSdm','ManageSdmNew','FindSdm',
		function($rootScope, $scope, $timeout, ModelItem, $state, ManageSdm, ManageSdmNew, FindSdm) {
            var pegawai = JSON.parse(localStorage.getItem('pegawai'));
			$scope.namaPegawai = pegawai.namaLengkap;
            $scope.loadUnitKerja = function(){
                $scope.item = {};
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("sdm/get-all-unit-kerja").then(function(el){
                    $scope.listUnitKerja = el.data.data;
                    $scope.daftarUnitKerja = new kendo.data.DataSource({
                        data: el.data.data,
                        pageSize: 10,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {editable: false},
									name: {editable: true, validation: {
										validateName: function (input) {
										if (input.is("[name='name']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}}
                                }
                            }
                        },
                        change: function(e){
                            if (e.action === "remove"){
								var item = e.items[0];
								if(item.id !== "" && item.name !== ""){
									item.action = e.action;
									$scope.SaveUnitKerja(item);
								} else {
									$scope.daftarUnitKerja.sync(); // call sync function to auto update row number w/o click on grid
								}
							}
                        }
                    });
                    var dataGrid = $("#gridUnitKerja").data("kendoGrid");
                    if ($scope.namaPegawai == "Administrator") {
                        dataGrid.hideColumn(dataGrid.columns[3]);	
                    } else {
                        dataGrid.hideColumn(dataGrid.columns[2]);
                    }
                    $scope.isRouteLoading = false;
                }, (err) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'unitKerja';
                // $scope.Back();
            };
            $scope.loadSubUnitKerja = function(){
                $scope.item = {};
                $scope.isRouteLoading = true;
                ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja").then(function(subEl){
                    $scope.daftarSubUnitKerja = new kendo.data.DataSource({
                        data: subEl.data.data,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {editable: false},
                                    unitKerja: {editable: true},
                                    unitKerjaId: {editable: true, validation: { 
										validasiUnitKerja: function (input) {
										if (input.is("[name='unitKerjaId']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}},
                                    kodeExternal: {editable: true},
									name: {editable: true, validation: { 
										validasiKomponen: function (input) {
                                            required: { message: "Nama sub unit kerja tidak boleh kosong"}
										if (input.is("[name='name']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}}
                                }
                            }
                        },
                        // group: {
                        //     field: "unitKerja.name",
                        //     aggregates: [{
                        //         field: "unitKerja.name",
                        //         aggregate: "count"
                        //     }]
                        // },
                        pageSize: 10,
                        change: function(e){
                            if (e.action === "remove"){
								var item = e.items[0];
								if(item.id !== "" && item.name !== ""){
									item.action = e.action;
									$scope.SaveSubUnitKerja(item);
								} else {
									$scope.daftarSubUnitKerja.sync(); // call sync function to auto update row number w/o click on grid
								}
							}
                        }
                    });
                    var dataGrid = $("#gridSubUnitKerja").data("kendoGrid");
                    if ($scope.namaPegawai == "Administrator") {
                        dataGrid.hideColumn(dataGrid.columns[4]);	
                    } else {
                        dataGrid.hideColumn(dataGrid.columns[3]);
                    }
                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                });
                $scope.tabActive = 'subUnitKerja';
                // $scope.Back();
            };
            $scope.kl = function(current, state){
                switch (state){
                    case 'unitKerja':
                        $scope.item = current;
                        break;
                    case 'subUnitKerja':
                        $scope.item = current;
                        break;
                }
            };
            $scope.onTabChanges = function(value){
                if (value === 1){
                    if(!$scope.daftarUnitKerja){
                        $scope.loadUnitKerja();
                    }
                } else if (value === 2){
                    if(!$scope.daftarSubUnitKerja){
                        $scope.loadSubUnitKerja();
                    }
                }
            };
            $scope.gridOptions = {
                toolbar: [{name: "create", text: "Tambah"}],
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
                    { field: "kodeExternal", title: "Kode ", "width": 180}, 
                    { field: "name", title: "Nama Unit Kerja", editor: textareaNameEditor },
                    {command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 },
                    {command: [{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
                ],
                editable: "popup",
				save: function(e){
					$scope.SaveUnitKerja(e.model);
				}
            };
            $scope.gridSubUnitOptions = {
                toolbar: [{name: "create", text: "Tambah"}],
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [
                    // { "field": "unitKerja.name", "title": "Unit Kerja", groupHeaderTemplate: "Unit Kerja #= value # (Sub-Unit Kerja: #= count#)", hideMe: true },
                    { field: "unitKerjaId", title: "Unit Kerja", hidden: true, editor: categoryDropDownEditor},
                    { field: "unitKerja", title: "Unit Kerja", template: "#= unitKerja.name #", hideMe: true},
                    { title: "Sub Unit Kerja",
                    columns: [
                        { "field": "kodeExternal", "title": "Kode", "width": 180 }, 
                        { "field": "name", "title": "Nama", editor: textareaNameEditor }
                    ]},
                    {command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 },
                    {command: [{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
                ],
                editable: "popup",
				edit: function(e){
					e.sender.columns.forEach(function (element, index /*, array */) {
						if (element.hideMe) {
							e.container.find(".k-edit-label:eq(" + index + "), "
								+ ".k-edit-field:eq( " + index + ")"
							).hide();
						}
					});
				},
				save: function(e){
					$scope.SaveSubUnitKerja(e.model);
				}
            };
            $scope.SaveUnitKerja = function(items){
                var item = {
                    "id": items.id,
                    "kodeExternal": items.kodeExternal,
                    "statusEnabled": items.action ? false : true,
                    "namaExternal":items.name,
                    "serialVersionUID": "",
                    "kdProfile": 0,
                    "name": items.name,
                    "reportDisplay":  items.name,
                    "subUnitKerja" : {
                        "statusEnabled": true,
                        "namaExternal": items.name,
                        "kdProfile": 0,
                        "name":  items.name,
                        "reportDisplay":  items.name,
                        "unitKerja":{
                            "id":items.id
                        }
                    }
                }
                $scope.reloadGrid = item.statusEnabled;
                ManageSdmNew.saveData(item,"sdm/save-unit-kerja").then(function(e){
                    if($scope.reloadGrid) $scope.loadUnitKerja();
                }, function(error){
                    throw error;
                })
            };
            $scope.SaveSubUnitKerja = function(items){
                var item = {
                    "id": items.id,
                    "kodeExternal": items.kodeExternal,
                    "statusEnabled": items.action ? false : true,
                    "namaExternal": items.name,
                    "serialVersionUID": "",
                    "kdProfile": 0,
                    "name":  items.name,
                    "reportDisplay":  items.name,
                    "unitKerja":{
                        "id":items.unitKerjaId
                    }
                }
                $scope.reloadGridSub = item.statusEnabled;
                ManageSdmNew.saveData(item,"sdm/save-sub-unit-kerja").then(function(e){
                    if ($scope.reloadGridSub) $scope.loadSubUnitKerja();
                })
            };
            var timeoutPromise;
            $scope.$watch('item.namaUnitKerja', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilter("#gridUnitKerja", "name", newVal)
                    }
                }, 1000);
                
            });
            $scope.$watch('item.kodeUnitKerja', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilter("#gridUnitKerja", "kodeExternal", newVal)
                    }
                }, 1000);
                
            });
            $scope.$watch('item.idUnitKerja', function(newVal, oldVal){
                if (!newVal) return;
                if (newVal === oldVal) return;
                if (newVal.id){
                    applyFilter("#gridSubUnitKerja", "unitKerjaId", newVal)
                }
            });
            $scope.$watch('item.namaSubunit', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if (newVal && newVal !== oldVal){
                        applyFilter("#gridSubUnitKerja", "name", newVal)
                    }
                }, 1000);
                
            });
            function applyFilter(gridId, filterField, filterValue){
                var gridData = $(gridId).data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];
                
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
                    });
                }

                gridData.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                });

            };
            $scope.resetDatasource = function(gridId){
                var gridData = $(gridId).data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = {};
            };
            function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '" data-filter="contains" style="width:100%"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.listUnitKerja
                    });
            };
            function textareaNameEditor(container, options) {
                $('<textarea required name="'+ options.field + '" cols="20" row="4" style="line-height: 1.4em;"></textarea>')
                .appendTo(container)
            }
		}
	]);
});