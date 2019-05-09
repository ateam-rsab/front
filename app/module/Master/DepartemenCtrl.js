/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('DepartemenCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageDepartemen',
        function ($rootScope, $scope, ModelItem, manageDepartemen) {
            $scope.title = "Data Departemen";
            $scope.dataVOloaded = true;
            $scope.item = {};
            //$scope.showGridData=true;

            ModelItem.get("Sample/Departemen").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            // Combo box Jenis Perawatan
            ModelItem.getDataDummyGeneric("ListCheckBoxDepartemenJenisPerawatan", true).then(function (data) {
                $scope.listJenisPerawatan = data;
            })
            ModelItem.getDataDummyGeneric("StatusYaTidakMaster", false).then(function (data) {
                $scope.listYaTidak = data;
            })

            $scope.$watch('item.namaExternal', function (newValue, oldValue) {
                $scope.item.reportDisplay = newValue;
            });

            $scope.dataDepartemen = [];
            $scope.mainGridOptions = {
                dataBound: function() {}
            };

            $scope.$watch('id',function() {
                $scope.dataDepartemen = manageDepartemen.getData($scope.id);
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;

            });

            $scope.select = function(a, b, c, d, e) {}
            $scope.selectDepartemen = function(a, b, c, d, e) {

            };
            $scope.columnDepartemen = [{
                    field: "kodeExternal",
                    title: ModelItem.translate("kodeExternal", 1)
                }, {
                    field: "namaExternal",
                    title: ModelItem.translate("namaExternal", 1)
                }, {
                    field: "kdDepartemen",
                    title: ModelItem.translate("kdDepartemen", 1)
                }, {
                    field: "departemen",
                    title: ModelItem.translate("departemen", 1)
                }, {
                    field: "reportDisplay",
                    title: ModelItem.translate("reportDisplay", 1)
                }, {
                    title: "Action",
                    command: {text: "Hapus", click: $scope.deleteDepartemen},
                    width: "110px"
                }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            $scope.editDepartemen=function(DataVo){
                delete $scope.item.attributes;
                var DataVo = $scope.item;
                
                    manageDepartemen.updateData(DataVo).then(function(e) {
                                    
                                }, function errorCallBack(err) {
                                    
                                });
            }

            $scope.deleteDepartemen=function(e){
               e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                var id = selectedItem.id;
                
                manageDepartemen.deleteData(id).then(function(e) {
                                
                            }, function errorCallBack(err) {
                                
                            });
            }

            $scope.AddDepartemen = function () {

                
                if ($scope.item.id != "" && $scope.item.id != undefined && $scope.item.kodeExternal != "" &&
                        $scope.item.kodeExternal != undefined && $scope.item.namaExternal != "" &&
                        $scope.item.namaExternal != undefined && $scope.item.kdAgama != "" &&
                        $scope.item.kdDepartemen != undefined && $scope.item.kdDepartemen != "" &&
                        $scope.item.jenisPerawatan.id != undefined && $scope.item.jenisPerawatan.id != "" &&
                        $scope.item.reportDisplay != undefined) {
                    for (var i = 0; $scope.dataDepartemen._data.length; i++) {
                        if ($scope.dataDepartemen._data[i].id == $scope.item.id) {
                            return;
                        }
                    }
                }

                $scope.createGuid = function ()
                {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }
                var departemen = {
                    "id": "",
                    "statusEnabled": $scope.item.statusEnabled,
                    "noRec": $scope.createGuid(),
                    "kodeExternal": $scope.item.kodeExternal,
                    "namaExternal": $scope.item.namaExternal,
                    "kdDepartemen": $scope.item.kdDepartemen,
                    "jenisPerawatan": {
                        "kdProfile": $scope.item.jenisPerawatan.kdProfile,
                        "statusEnabled": $scope.item.jenisPerawatan.statusEnabled,
                        "id": $scope.item.jenisPerawatan.id,
                        "noRec": $scope.item.jenisPerawatan.noRec,
                        "reportDisplay": $scope.item.jenisPerawatan.reportDisplay,
                        "kodeExternal": $scope.item.jenisPerawatan.kodeExternal,
                        "namaExternal": $scope.item.jenisPerawatan.namaExternal,
                        "jenisPerawatan": $scope.item.jenisPerawatan.jenisPerawatan,
                        "kdJenisPerawatan": $scope.item.jenisPerawatan.kdJenisPerawatan,
                        "qJenisPerawatan": $scope.item.jenisPerawatan.qJenisPerawatan
                    },
                    "namaDepartemen": $scope.item.namaDepartemen,
                    "reportDisplay": $scope.item.reportDisplay,
                    "kdProfile": $scope.item.kdProfile,
                    "qDepartemen": 1
                }
                manageDepartemen.addData(departemen).then(function (e) {
                });
                $scope.item = {};
            }

            // $scope.editDepartemen = function (id) {
            // 	id=1;
            //     $scope.item = (manageDepartemen.getDataItem(id).then(function (e) {
            //         
            //     }, function errorCallBack(err) {
            //         
            //     }));
            // }

            $scope.dataItem = [];
            $scope.get = function (id) {
                $scope.i = 0;
                for ($scope.i in $scope.dataDepartemen) {
                    if ($scope.dataDepartemen[$scope.i].id == id) {
                        $scope.dataItem = $scope.dataDepartemen[$scope.i];
                        return $scope.dataItem;
                    }
                }
            }

            $scope.UpdateDepartemen = function (id) {
                $scope.item = angular.copy($scope.get(id));
            }


            // $scope.DeleteDepartemen = function (id) {
            //     $scope.i = 0;
            //     // 
            //     for ($scope.i in $scope.dataDepartemen) {
            //         if ($scope.dataDepartemen[$scope.i].id == id) {
            //             $scope.dataDepartemen.splice($scope.i, 1);
            //         }
            //     }
            // }

        }]);

});