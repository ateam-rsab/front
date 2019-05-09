define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MappingHariLiburCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'FindSdm', 'DateHelper',
		function($rootScope, $scope, ModelItem, ManageSdm, FindSdm, DateHelper) {
            $scope.isRouteLoading = true;
            $scope.title = "Master Hari Libur";
            $scope.opsiGrid = {
                toolbar: [{name: "create", text: "Tambah"}],
                pageable: true,
                selectable: "row",
                columns: [
                    {field: "id", hidden: "true"},
                    {field: "rowNumber", title: "#", width: 40},
                    {field: "dates", title: "Tanggal", width: 120, format:"{0: dd-MM-yyyy}", editor: dateTimeEditor},
                    {field: "name", title: "Keterangan"},
                    {command: [{name: "destroy", text: "Hapus"},{name: "edit", text: "Edit"}], title: "&nbsp;", width: 160 }
                ],
                editable: { mode: "popup", window: { title: "Mapping Hari Libur" }, template: kendo.template($("#popup-editor").html())},
                dataBound: function(e) {
                    e.sender._data.forEach(function(elemen, index){
                        elemen.rowNumber = ++index;
                    })
                },
                save: function(e){
                    $scope.Save(e.model);
                }
            };
            FindSdm.getListData("sdm/get-all-hari-libur").then(function(res){
                var result = res.data.data;
                result.forEach(function(item, index){
                    debugger;
                    item.rowNumber = ++index;
                    item.dates = new Date(item.tanggal);
                });
                var dataGrid = new kendo.data.DataSource({
                    data: res.data.data,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { editable: false },
                                rowNumber: { editable: false },
                                name: { editable: true, validation: { 
                                    validasiKeterangan: function (textarea) {
                                        if (textarea.is("[name='name']") && textarea.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                    }
                                }},
                                dates: { type:"date", validation: { 
                                    validasiTanggal: function (input) {
                                        if (input.is("[name='tanggal']") && input.val() === "") {                        
                                            return false;
                                        }
                                        return true;
                                    }
                                }}
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
                var grid = $("#gridHariLibur").data("kendoGrid");
                grid.setDataSource(dataGrid);
                $scope.isRouteLoading = false;
            },(error) => {
                $scope.isRouteLoading = false;
                throw error;
            })
			$scope.Save = function(data){
				var item = {
                    "statusEnabled": true,
                    "namaExternal": data.name,
                    "reportDisplay": data.name,
                    "tanggal": {
                        "tanggal":new Date(data.dates).getTime()
                    },
                    "id":data.id,
                    "kodeExternal": "001",
                    "hariLibur":{}
                }
				if(data.action && data.action === "remove"){
					item.statusEnabled = false;
				}
				ManageSdm.saveDataList("sdm/save-hari-libur", item).then(function(res){
					// debugger;
				}, (error) => {
					throw error;
				})
            }
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDatePicker({
                        autoBind: true,
                    });
            }
		}
	]);
});