define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarMappingUraianTugasCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', '$timeout', 'FindSdm',
		function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, $timeout, FindSdm) {
			$scope.isRouteLoading = false;
            $scope.item = {};
            $scope.statusEnabled = [{
                name: "true", value: true
            }, {
                name: "false", value: false
            }]
			$scope.init = function(){
				$scope.isRouteLoading = true;
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=PelaksanaanTugas&select=id,pelaksanaanTugas&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=statusEnabled&values=true", true),
                    // nameGeneric, kendoSource, isServerFiltering, top, filter, select
                    // ModelItem.getDataDummyGeneric('RincianKegiatan', true, true), // uncomment this line if datasource RincianKegiatan is needed
                    // FindSdm.getMappingUraianTugas()
                    ManageSdmNew.getListData("sdm/get-all-uraian-tugas")
                ]).then(function(res){
                    $scope.listPelaksana = res[0];
                    $scope.listJabatan = res[1];
                    // $scope.listKegiatan = res[2]; // uncomment this line if datasource RincianKegiatan is needed
                    if(res[2].statResponse){
                        $scope.gridUraianTugas = new kendo.data.DataSource({
                            data: res[2].data.data,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: {editable: false},
                                        periode: {editable: true},
                                        pelaksanaanTugas: {editable: true, defaultValue: { id: 0, pelaksanaanTugas: "-"}, validation: { 
                                            validasiPelaksanaan: function (input) {
                                                if (input.is("[name='pelaksanaanTugas']") && input.val() === "") {                        
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }},
                                        jabatan: {editable: true, defaultValue: { id: 0, namaJabatan: "-"}, validation: { 
                                            validasiJabatan: function (input) {
                                                if (input.is("[name='jabatan']") && input.val() === "") {                        
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }},
                                        rincianKegiatan: {editable: true, defaultValue: { id: 0, rincianKegiatan: "-"}, validation: { 
                                            validasiKegiatan: function (input) {
                                                if (input.is("[name='rincianKegiatan']") && input.val() === "") {                        
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }},
                                        // uraianTugas: {editable: true, validation: { 
                                        //     validasiUraian: function (textarea) {
                                        //         if (textarea.is("[name='uraianTugas']") && textarea.val() === "") {                        
                                        //             return false;
                                        //         }
                                        //         return true;
                                        //     }
                                        // }},
                                        satuan: {editable: true}
                                    }
                                }
                            },
                            change: function(e){
                                if(e.action === "add") {
                                    e.items[0].statusEnabled = true;
                                }
                                if(e.field === "rincianKegiatan" && e.action === "itemchange"){
                                    $scope.isRouteLoading = true;
                                    ManageSdm.getOrderList("service/list-generic/?view=RincianKegiatan&select=*&criteria=id&take=1&values=" + e.items[0].rincianKegiatan.id, true).then(function(res){
                                        e.items[0].satuan = res.data[0].satuan;
                                        $scope.isRouteLoading = false;
                                    }, (error) => {
                                        $scope.isRouteLoading = false;
                                        throw error;
                                    });
                                }
                                if(e.action === "remove") {
                                    if(e.items[0].id) {
                                        if(e.items[0].id !== $scope.currentData.id){
                                            var items = e.items[0];
                                            hapusData(items);
                                        }
                                    }
                                }
                            },
                            // create: function(e){
                            // },
                            pageSize: 12
                        })
                    }
                    $scope.isRouteLoading = false;
                }, function(error){
                    $scope.isRouteLoading = false;
                    messagesContainer.error("error");
                })
			}
			$scope.init();
            $scope.findData = function(){
				$scope.isRouteLoading = true;
                if (!$scope.item.jabatan) {
                    ManageSdmNew.getListData("sdm/get-all-uraian-tugas").then(function(res){
                        $scope.gridUraianTugas = new kendo.data.DataSource({
                            data: res.data.data,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: {editable: false},
                                        periode: {editable: true},
                                        pelaksanaanTugas: {editable: true},
                                        jabatan: {editable: true},
                                        rincianKegiatan: {editable: true},
                                        // uraianTugas: {editable: true, validation: { 
                                        //     validasiUraian: function (textarea) {
                                        //         if (textarea.is("[name='uraianTugas']") && textarea.val() === "") {                        
                                        //             return false;
                                        //         }
                                        //         return true;
                                        //     }
                                        // }},
                                        // satuan: {validation: {required: true,
                                        //     validasiSatuan: function (input) {
                                        //         if (input.is("[name='satuan']") && input.val() === "") {                        
                                        //             return false;
                                        //         }
                                        //         return true;
                                        //     }
                                        // }},
                                    }
                                }
                            },
                            // change: function(e){
                            // },
                            // create: function(e){
                            // },
                            pageSize: 12
                        })
                        $scope.isRouteLoading = false;
                    }, function(error){
                        $scope.isRouteLoading = false;
                    })
                } else if ($scope.item.jabatan.id) {
                    // FindSdm.getUraianTugasByJabatan($scope.item.jabatan.id).then(function(res){
                    ManageSdmNew.getListData("sdm/get-uraian-kerja-by-jabatan/" + $scope.item.jabatan.id).then(function(res){
                        $scope.gridUraianTugas = new kendo.data.DataSource({
                            data: res.data.data,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: {editable: false},
                                        periode: {editable: true},
                                        pelaksanaanTugas: {editable: true},
                                        jabatan: {editable: true},
                                        rincianKegiatan: {editable: true},
                                        // uraianTugas: {editable: true, validation: { 
                                        //     validasiUraian: function (textarea) {
                                        //         if (textarea.is("[name='uraianTugas']") && textarea.val() === "") {                        
                                        //             return false;
                                        //         }
                                        //         return true;
                                        //     }
                                        // }},
                                        // satuan: {validation: {required: true,
                                        //     validasiSatuan: function (input) {
                                        //         if (input.is("[name='satuan']") && input.val() === "") {                        
                                        //             return false;
                                        //         }
                                        //         return true;
                                        //     }
                                        // }},
                                    }
                                }
                            },
                            // change: function(e){
                            // },
                            // create: function(e){
                            // },
                            pageSize: 12
                        })
                        $scope.isRouteLoading = false;
                    }, function(error){
                        $scope.isRouteLoading = false;
                    })
                }
            }
            // opsi grid get all uraian tugas
			$scope.dataGridUraiantugas = {
				// autoSync: false,
				toolbar: [
                    {name: "create", text: "Tambah"},
                    {text: "Master Uraian Tugas",template: '<a ng-click="mappingUraian($event)" class="k-button k-button-icontext k-grid-edit" href="\\#">Master Uraian Tugas</a>'},
                    // {text: "Mapping Uraian Tugas",template: '<a ng-click="mappingUraian($event)" class="k-button k-button-icontext k-grid-edit" href="\\#">Mapping Uraian Tugas</a>'}
                ],
                // editable: { mode: "popup", window: { title: "Master Uraian Tugas", animation: false, width: "29.7%", /* height: "100%" */}, template: kendo.template($("#kendo-popup-editor").html())},
                editable: {
                    mode: "popup",
                    window: { title: "Master Uraian Tugas", animation: false, width: 550 }
                },
				edit: function(e){
                    var editWindow = this.editable.element.data("kendoWindow");
                    editWindow.wrapper.css({ width: 600 });

					e.sender.columns.forEach(function (element, index /*, array */) {
						if (element.hideMe) {
							e.container.find(".k-edit-label:eq(" + index + "), "
								+ ".k-edit-field:eq( " + index + ")"
							).hide();
						}
					});
				},
				columns: [
					{
						field: "id",
						title: "id",
						hidden: true,
                        width: 20, hideMe: true
					},  
					{
						field: "periode",
						title: "Periode",
						hidden: true,
                        width: 60, hideMe: true
					},
					{
						field: "rincianKegiatan",
						title: "Rincian Kegiatan",
						width: 400,
                        template: "#= rincianKegiatan.rincianKegiatan #",
						filterable: {
							mode: "cell"
                        },
                        editor: dropDownKegiatan
					},
					{
						field: "jabatan",
						title: "Jabatan",
						width: 200,
                        template: "#if(jabatan !== undefined){# #= jabatan.namaJabatan # #}else{# #: \"\" # #}#",
						filterable: {
							mode: "cell"
						},
                        editor: dropDownJabatan
					},
					{
						field: "pelaksanaanTugas",
						title: "Pelaksanaan Tugas",
						width: 120,
                        template: "#= pelaksanaanTugas.pelaksanaanTugas #",
						filterable: {
							mode: "cell"
						},
                        editor: dropDownPelaksanaan
					},
					{
						field: "satuan",
						title: "Satuan",
						width: "10%",
						filterable: false
					},
					// {command: [{text: "Edit", click: showDetails},{text: "Hapus", click: hapusData}], title: "&nbsp;", width: 120,}
					{command: [{name: "edit", text: "Edit"},{name: "destroy", text: "Hapus"}], title: "&nbsp;", width: 120,}
				],
				pageable: true,
				scrollable: false,
				// // sortable: true,
				// filterable: {
				// 	extra: false,
				// 	operators: {
				// 		string: {
				// 			//eq: "Equal:",
				// 			startswith: "Dimulai Dengan:",
				// 			contains: "Mengandung:"
				// 		}
				// 	}
				// },
				save: function(e){
                    var data = e.model;
                    var sendData = {
                        "id": data.id,
                        "pelaksanaanTugas": data.pelaksanaanTugas,
                        "jabatan": data.jabatan,
                        "rincianKegiatan": data.rincianKegiatan,
                        "dokumen":{
                            "id":11488
                        },
                        "periode":"",
                        "statusEnabled": data.statusEnabled
                    }
                    $scope.currentData = sendData;
                    ManageSdmNew.saveData(sendData, "sdm/save-map-rincian-kegiatan-to-uraian-tugas").then(function(res){
                        if(res.status === 201){
                            if($scope.currentData.id === ""){
                                var dataGrid = $("#gridMappingTugas").data("kendoGrid").dataSource;
                                var row = dataGrid._data;
                                for(var i =0; i < row.length; i++){
                                    if(row[i].id === ""){
                                        dataGrid.remove(row[i]);
                                        break;
                                    }
                                }
                                $scope.currentData.id = res.data.data.id;
                                dataGrid.add($scope.currentData);
                                dataGrid.fetch();
                            }
                            $scope.item = {};
                            $scope.mappingTugas.close();
                        }
                    }, function(error){
                        messageContainer.error(error);
                    })
				}
			}
            function hapusData(dataItem){
                // e.preventDefault();
                // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var sendData = {
                    "id": dataItem.id,
                    "pelaksanaanTugas": {
                        "id":dataItem.pelaksanaanTugas.id
                    },
                    "jabatan": {
                        "id":dataItem.jabatan.id
                    },
                    "rincianKegiatan": {
                        "id":dataItem.rincianKegiatan.id
                    },
                    "dokumen":{
                        "id":11488
                    },
                    "periode":"",
                    "statusEnabled": false
                }
                ManageSdmNew.saveData(sendData, "sdm/save-map-rincian-kegiatan-to-uraian-tugas").then(function(res){
                    if(res.status === 201){
                        $scope.item = {};
                        $scope.mappingTugas.close();
                    }
                }, function(error){
                    messageContainer.error(error);
                })
            }
            function showDetails(e){
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.item = dataItem;
                // $scope.mappingTugas.content($scope.detailsTemplate($scope.currentdataItem));
                $scope.mappingTugas.center().open();

                // this is a function simulate button click to bind $scope to kendo window element
                // do to bug in custom popup window from grid
                $timeout(function() {
                    angular.element(document.getElementById('btn')).trigger('click')
                });
            }
            // $scope.click = function() {
            //     console.log('click');
            // }
			// $scope.Save = function(data){
			// 	if(data.rincianKegiatan){
			// 		var datasend = {
			// 			"satuan":data.satuan,
			// 			"rincianKegiatan":data.rincianKegiatan,	
            //             "id":data.id,
            //             "statusEnabled": true
			// 		};
			// 		ManageSdm.saveData(datasend, "sdm/save-rincian-kegiatan").then(function(res){
			// 			if(res.status === 201){
			// 				$scope.init();
			// 			}
			// 		}, function(error){
			// 			messageContainer.error(error);
			// 		})
			// 	} else {
			// 		messageContainer.error('Rincian kegiatan tidak boleh kosong')
			// 	}
			// }
            $scope.simpanMappingTugas = function(data){
                var sendData = {
                    "id": data.id,
                    "pelaksanaanTugas": {
                        "id":data.pelaksanaanTugas.id
                    },
                    "jabatan": {
                        "id":data.jabatan.id
                    },
                    "rincianKegiatan": {
                        "id":data.rincianKegiatan.id
                    },
                    "dokumen":{
                        "id":11488
                    },
                    "periode":"",
                    "statusEnabled": data.statusEnabled
                }
                ManageSdmNew.saveData(sendData, "sdm/save-map-rincian-kegiatan-to-uraian-tugas").then(function(res){
                    if(res.status === 201){
                        $scope.item = {};
                        $scope.mappingTugas.close();
                    }
                }, function(error){
                    messageContainer.error(error);
                })
            }
            $scope.mappingUraian = function(e){
                e.preventDefault();
				$state.go('MappingUraianTugas');
            }
            $scope.closeMappingTugas = function(){
                $scope.item = {};
                // remove if there is input validation error before close window
                $("input").removeClass("validation-error");
                $scope.mappingTugas.close();
            }
            $scope.masterUraian = function(e){
				e.preventDefault();
				$state.go('MasterUraianTugas');
			}
            $scope.clearData = function(){
                if ($scope.item.jabatan) {
                    delete $scope.item.jabatan;
                } else {
                    return;
                }
            }
            var timeoutPromise;
            $scope.$watch('item.pilihJabatan', function(newVal, oldVal){
                if(newVal && newVal !== oldVal){
                    applyFilter('jabatanId', newVal)
                }
            })
            $scope.$watch('item.pilihPelaksanaan', function(newVal, oldVal){
                if(newVal && newVal !== oldVal){
                    applyFilter('pelaksanaanTugasId', newVal)
                }
            })
            $scope.$watch('item.pilihKegiatan', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter('rincianKegiatan.rincianKegiatan', newVal)
                    }
                })
            })
            function applyFilter(filterField, filterValue){
                var gridData = $("#gridMappingTugas").data("kendoGrid");
                var currFilterObj = gridData.dataSource.filter();
                var currentFilters = currFilterObj ? currFilterObj.filters : [];

                if (currentFilters && currentFilters.length > 0){
                    for(var i = 0; i < currentFilters.length; i++){
                        if(currentFilters[i].field == filterField){
                            currentFilters.splice(i, 1);
                            break;
                        }
                    }
                }

                if(filterValue.id){
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
                })
            }
            $scope.resetDatasource = function(){
                var gridData = $("#gridMappingTugas").data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.item = {};
            }
            function dropDownKegiatan(container, options) {
                $('<input name="' + options.field + '"style="width:100%" data-validasiKegiatan-msg="kegiatan tidak boleh kosong"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "rincianKegiatan",
                        dataValueField: "id",
                        dataSource: $scope.listKegiatan
                    });
			}
            function dropDownJabatan(container, options) {
                $('<input name="' + options.field + '"style="width:100%"/> data-validasiJabatan-msg="kegiatan tidak boleh kosong"')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "namaJabatan",
                        dataValueField: "id",
                        dataSource: $scope.listJabatan
                    });
			}
            function dropDownPelaksanaan(container, options) {
                $('<input name="' + options.field + '" style="width:100%" data-validasiPelaksanaan-msg="kegiatan tidak boleh kosong"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "pelaksanaanTugas",
                        dataValueField: "id",
                        dataSource: $scope.listPelaksana
                    });
			}
		}
	]);
});