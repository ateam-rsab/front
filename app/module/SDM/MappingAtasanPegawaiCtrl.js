define(['initialize'], function(initialize) {'use strict';
    initialize.controller('MappingAtasanPegawaiCtrl', ['$q', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DaftarPegawaiService', 'DataHelper', 'FindSdm', '$timeout',
        function($q, cacheHelper, $rootScope, $scope, ModelItem, $state, ManageSdm, DaftarPegawaiService, dataHelper, FindSdm, $timeout) {
            $scope.isRouteLoading = true;
            $scope.gridMappingAtasan = {
                toolbar: [{name: "create", text: "Tambah"}],
                pageable: true,
                selectable: "row",
                columns:[
                    {field: "pegawai", title: "Pegawai", template: "#= pegawai.namaLengkap #"},
                    {field: "atasanLangsung", title: "Atasan Langsung", template: "#= atasanLangsung.namaLengkap #"},
                    {field: "atasanPejabatPenilai", title: "Pejabat Penilai", template: "#= atasanPejabatPenilai.namaLengkap #"},
                    {command: [{name: "edit", text: "Edit"},{text: "Hapus", click: deleteRow}], title: "&nbsp;", width: 160 }
                ],
                editable: { mode: "popup", window: { title: "Mapping Atasan", animation: false, width: 400, /* height: "100%" */}, template: kendo.template($("#kendo-popup-editor").html())},
				// edit: function(e){
				// 	e.sender.columns.forEach(function (element, index /*, array */) {
				// 		if (element.hideMe) {
				// 			e.container.find(".k-edit-label:eq(" + index + "), "
				// 				+ ".k-edit-field:eq( " + index + ")"
				// 			).hide();
				// 		}
				// 	});
				// },
				save: function(e){
					$scope.Save(e.model);
				}
            }
            function init(){
                $scope.item = {};
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
                    ManageSdm.getOrderList("sdm/get-mapping-pegawai")
                ]).then(function(res){
                    if(res[0].statResponse){
                        $scope.listPegawai = res[0].data;
                    }
                    if(res[1].statResponse){
                        var dataGrid = res[1].data.data;
                        var objGrid = [];
                        dataGrid.forEach(function(item, index){
                            objGrid.push({
                                pegawaiId: index,
                                namaPegawai: item.namaPegawai,
                                namaAtasanLangsung: item.namaAtasanLangsung,
                                namaAtasanPejabatPenilai: item.namaAtasanPejabatPenilai,
                                pegawai: {
                                    id: item.idPegawai,
                                    namaLengkap: item.namaPegawai
                                },
                                atasanLangsung: {
                                    id: item.idAtasanLangsung,
                                    namaLengkap: item.namaAtasanLangsung
                                },
                                atasanPejabatPenilai: {
                                    id: item.idAtasanPejabatPenilai,
                                    namaLengkap: item.namaAtasanPejabatPenilai
                                }
                            });
                        }) 
                        $scope.dataSource = new kendo.data.DataSource({
                            data: objGrid,
                            pageSize: 20,
                            schema: {
                                model: {
                                    id: "pegawaiId",
                                    fields: {
                                        pegawaiId: { editable: false },
                                        pegawai: { defaultValue: {}, editable: true, validation: { required: true } },
                                        atasanLangsung: { defaultValue: {}, editable: true, validation: { required: true } },
                                        atasanPejabatPenilai: { defaultValue: {}, editable: true }
                                    }
                                }
                            },
                            change: function(e){
                                if(e.action === "add" && $scope.item.pegawai){
                                    e.items[0].pegawai.id = $scope.item.pegawai ? $scope.item.pegawai.id : 0;
                                    e.items[0].atasanLangsung.id = $scope.item.atasanLangsung ? $scope.item.atasanLangsung.id : "";
                                    e.items[0].atasanPejabatPenilai.id = $scope.item.atasanPejabatPenilai ? $scope.item.atasanPejabatPenilai.id : "";
                                }
                                // if(e.items[0].pegawai && e.items[0].atasanLangsung && e.action === "remove"){
                                //     e.items[0].action = e.action;
                                //     $scope.Save(e.items[0]);
                                // }
                            }
                        });
                    }
                    
                    // show popup
                    var adaNotif = localStorage.getItem("notifChangeSdm");
                    if(adaNotif){
                        $scope.notif = adaNotif;
                        $scope.dialogPopup.center().open();
                    };
                    if($state.params.idPegawai){
                        ManageSdm.getOrderList("pegawai/find-pegawai-by-id-custom/"+$state.params.idPegawai).then(function(res){
                            var pegawai = res.data.data;
                            $scope.item.pegawai = {
                                id: pegawai.idPegawai,
                                namaLengkap: pegawai.namaLengkap ? pegawai.namaLengkap : pegawai.nama
                            }
                        },(error) => {
                            throw error;
                        });
                        // $scope.item.pegawai = {
                        //     id: $state.params.idPegawai,
                        //     namaLengkap: $state.params.namaLengkap
                        // }
                    };
                }, function(error){
                    $scope.isRouteLoading = false;
                    throw error;
                }).then(function(){
                }, function(error){
                    $scope.isRouteLoading = false;
                    throw error;
                })
            }
            $scope.clickedPopup = function(){
                localStorage.removeItem("notifChangeSdm");
                delete $scope.notif;
                $scope.dialogPopup.close();
            }
            $scope.addToGrid = function(item){
                var grid = $("#gridAtasan").data("kendoGrid"),
                    data = [];
                var listRawRequired = [
                    "item.pegawai|k-ng-model|pegawai",
                    "item.atasanLangsung|k-ng-model|Atasan",
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    if (!item.atasanPejabatPenilai || item.atasanPejabatPenilai.id === "") {
                        item.atasanPejabatPenilai = {
                            id: 0,
                            namaLengkap: "-"
                        }
                    }
                    data.push({
                        pegawai: {
                            id: item.pegawai
                        },
                        atasanLangsung: {
                            id: item.atasanLangsung
                        },
                        atasanPejabatPenilai:  item.atasanPejabatPenilai
                    });
                    
                    // ManageSdm.saveData(data, "sdm/save-mapping-pegawai-to-atasan").then(function(e){
                    //     grid.dataSource.add($scope.item);
                    //     init();
                    // })
                   
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }
            $scope.Save = function(data){
                var dataModel = [], itemSend;
                if(!data.atasanPejabatPenilai.id || data.atasanPejabatPenilai.id === ""){
                    itemSend = {
                        pegawai: data.pegawai,
                        atasanLangsung: data.atasanLangsung,
                        statusEnabled: data.action ? false : true
                    }
                } else {
                    itemSend = {
                        pegawai: data.pegawai,
                        atasanLangsung: data.atasanLangsung,
                        atasanPejabatPenilai: data.atasanPejabatPenilai,
                        statusEnabled: data.action ? false : true
                    }
                }
                dataModel.push(itemSend);
                ManageSdm.saveData(dataModel, "sdm/save-mapping-pegawai-to-atasan").then(function(e){
                    // grid.dataSource.add($scope.item);
                    init();
                });
            }
            $scope.$watch('item.pegawai', function(e){
                if (!e) return;
                ManageSdm.getItem("sdm/get-pegawai-atasan/" + e.id).then(function(data){
                    if (data.data.data[0]){
                        $scope.item.atasanLangsung = {
                            id: data.data.data[0].idAtasanLangsung,
                            namaLengkap: data.data.data[0].namaAtasanLangsung,
                        }
                        $scope.item.atasanPejabatPenilai = {
                            id: data.data.data[0].idAtasanPejabatPenilai,
                            namaLengkap: data.data.data[0].namaAtasanPejabatPenilai,
                        }
                    } else {
                        delete $scope.item.atasanLangsung;
                        delete $scope.item.atasanPejabatPenilai;
                    }
                })
            });
            var timeoutPromise;
            $scope.$watch('item.namaPegawai', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("namaPegawai", newVal)
                    }
                })
            });
            $scope.$watch('item.namaAtasanLangsung', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("namaAtasanLangsung", newVal)
                    }
                })
            });
            $scope.$watch('item.namaAtasanPejabatPenilai', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter("namaAtasanPejabatPenilai", newVal)
                    }
                })
            });
            function applyFilter(filterField, filterValue){
                var dataGrid = $("#gridAtasan").data("kendoGrid");
                var currFilterObject = dataGrid.dataSource.filter();
                var currentFilters = currFilterObject ? currFilterObject.filters : [];

                if(currentFilters && currentFilters.length > 0){
                    for(var i = 0; i < currentFilters.length; i++){
                        if(currentFilters[i].field === filterField)
                        currentFilters.splice(i, 1);
                        break;
                    }
                }

                if(filterValue.id){
                    currentFilters.push({
                        field: filterField,
                        operator: "eq",
                        value: filterValue
                    });
                } else {
                    currentFilters.push({
                        field: filterField,
                        operator: "contains",
                        value: filterValue
                    });
                }

                dataGrid.dataSource.filter({
                    logic: "and",
                    filters: currentFilters
                })
            };
            $scope.resetFilter = function(){
                var dataGrid = $("#gridAtasan").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.item = {};
            }
            function deleteRow(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                dataItem.action = "remove";

                $scope.Save(dataItem);
            }
            init();
        }   
    ])
})