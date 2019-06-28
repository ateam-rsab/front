define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ShiftKerjaCtrl', ['$q', '$rootScope', '$scope', '$state', '$timeout', 'FindSdm', 'ModelItem', 'ManageSdm', 
        function($q, $rootScope, $scope, $state, $timeout, FindSdm, modelItem, manageSdm) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.mainGridOptions = {
                dataSource: {
                    data: []
                },
                toolbar: [
                    {name: "create", text: "Tambah"}
                ],
                pageable: true,
                columns: [
                    {"field": "kodeExternal","title": "Kode Shift", width: 80},
                    {"field": "namaShift","title": "Nama Shift"},
                    {"field": "kelompokShift","title": "Kelompok Shift", editor: dropDownKelompokShift, "template": "#= kelompokShift.kelompokShiftKerja #"},
                    {"title": "Jadwal", columns: [
                        {"field": "jamMasuk","title":  "Jam Masuk", width: 80},
                        {"field": "jamPulang","title": "Jam Keluar", width: 80},
                        {"field": "waktuIstirahat","title": "Istirahat<br/>(menit)", width: 80},
                    ]},
                    {"field": "operatorFactorRate","title": "Operator FR"},
                    {"command": [{name: "edit",text: "Edit"},{text: "Hapus", click:deleteRow}], width: 160}
                ],
                selectable: "row",
                editable: "popup",
                save: function(e){
                    $scope.Save(e.model);
                }
            };
            $q.all([
                modelItem.getDataDummyGeneric('KelompokShift')
            ]).then(function(res){
                $scope.listKelompokShift = res[0];
                $scope.refresh();
            });
            $scope.refresh = function() {
                $scope.items = {};
                var grid = $("#gridDaftarShift").data("kendoGrid"), listData = [];
                manageSdm.getItem("sdm/get-list-shift-kerja", true).then(function(dat){
                    // var filteredData = _.filter(dat.data.data, function(o) { 
                    //     return o.statusEnabled == true; 
                    // });
                    for(var i = 0; i < dat.data.data.length; i++){
                        listData.push({
                            "id" : dat.data.data[i].idShiftKerja,
                            "kodeExternal" : dat.data.data[i].kodeExternal,
                            "namaShift" : dat.data.data[i].namaShift,
                            "kelompokShift": {
                                "id": dat.data.data[i].idkelompokShift,
                                "kelompokShiftKerja": dat.data.data[i].namaKelompokShift,
                            },
                            "idKelompokShift": dat.data.data[i].idkelompokShift,
                            "operatorFactorRate" : dat.data.data[i].operatorFactorRate,
                            "jamMasuk" : dat.data.data[i].jamMasuk,
                            "jamPulang" : dat.data.data[i].jamPulang,
                            "waktuIstirahat" : dat.data.data[i].waktuIstirahat,
                        })
                    }
                    
                    var dataSource = new kendo.data.DataSource({
                        pageSize: 20,
                        data: listData,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {editable: false},
                                    kodeExternal: {editable: true},
                                    namaShift: {editable: true},
                                    kelompokShift: {editable: true, defaultValue: { id: 0, name: "Pilih--"}},
                                    operatorFactorRate: {editable: true},
                                    jamMasuk: {editable: true},
                                    jamPulang: {editable: true},
                                    waktuIstirahat: {editable: true, type: "number"},
                                }
                            }
                        }
                    });

                    // reload and bind to grid dataSource
                    grid.setDataSource(dataSource);
                    grid.dataSource.read();
                });
                
            }
            $scope.addZeroBefore = function (n) {
                return (n < 10 ? '0' : '') + n;
            };
            function dropDownKelompokShift(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "kelompokShiftKerja",
                        dataValueField: "id",
                        dataSource: $scope.listKelompokShift
                    });
			}
            $scope.Save = function(data) {
                var data = {
                    "id": data.id ? data.id : "",
                    "kodeExternal":  data.kodeExternal,
                    "reportDisplay": data.kodeExternal,
                    "namaShift": data.namaShift,
                    "namaExternal": data.namaShift,
                    "kelompokShift": data.kelompokShift,
                    "kdShift": "0",
                    "operatorFactorRate": data.operatorFactorRate,
                    "statusEnabled": true,
                    "jamMasuk": data.jamMasuk,
                    "jamPulang":data.jamPulang,
                    "waktuIstirahat": data.waktuIstirahat
                }
                manageSdm.saveData(data,"sdm/save-shift-kerja").then(function(e) {
                    $scope.refresh();
                });
            }
            $scope.Batal = function() {
                $scope.item = undefined;
            }
            var timeoutPromise;
			$scope.$watch('items.namaShift', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter('namaShift', newVal)
                    }
                },800)
            });
			$scope.$watch('items.kelompokShift', function(newVal, oldVal){
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function(){
                    if(newVal && newVal !== oldVal){
                        applyFilter('idKelompokShift', newVal)
                    }
                })
            });
            function applyFilter(filterField, filterValue){
                var gridData = $("#gridDaftarShift").data("kendoGrid");
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
            $scope.resetFilters = function(){
                var gridData = $("#gridDaftarShift").data("kendoGrid");
                gridData.dataSource.filter({});
                $scope.items = {};
            }
            function deleteRow(e){
				e.preventDefault();

				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				var datasend = {
					"statusEnabled": false,
					"satuan":dataItem.satuan,
					"rincianKegiatan":dataItem.rincianKegiatan,	
					"id":dataItem.id
				};
				manageSdm.hapusShiftKerja(dataItem.id).then(function(res){
					if(res.status === 201){
						$scope.refresh();
					}
				}, function(error){
					messageContainer.error(error);
				});
			}
        }
    ])
});