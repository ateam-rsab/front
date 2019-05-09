/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('KelasCtrl', ['$rootScope', '$scope', 'ModelItem','ManageKelas',
        function ($rootScope, $scope, ModelItem, manageKelas) {
            $scope.title = "Data Kelas";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showGridData = true;

            ModelItem.get("Sample/Kelas").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            // Combo box Kelas
            ModelItem.getDataDummyGeneric("ListCheckBoxKelasKelas", true).then(function(data) {
                $scope.listKelas = data;
            })
             ModelItem.getDataDummyGeneric("StatusYaTidakMaster", false).then(function(data) {
                $scope.listYaTidak = data;
            })

             $scope.mainGridOptions = {
                dataBound: function() {}
            };

            $scope.$watch('id',function() {
                $scope.dataKelas = manageKelas.getData($scope.id);
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;

            });

            $scope.select = function(a, b, c, d, e) {}
            $scope.selectKelas = function(a, b, c, d, e) {

            };

             $scope.columnKelas=[{
                field:"kodeExternal",
                title:ModelItem.translate("kodeExternal", 1)
            },{
                field:"namaExternal",
                title:ModelItem.translate("namaExternal", 1)
            },{
                field:"namaKelas",
                title:ModelItem.translate("namaKelas", 1)
            },{
                field:"kelas",
                title:ModelItem.translate("kelas.namaKelas", 1)
            },{
                field:"reportDisplay",
                title:ModelItem.translate("reportDisplay", 1)
            },{
                command:{text:"Hapus", click: $scope.deleteKelas},
                title:"&nbsp;",
                width:"110px"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

             $scope.createGuid=function()
                {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                }
            $scope.$watch('item.namaExternal', function(newValue, oldValue) {
                $scope.item.reportDisplay=newValue;
            });

            $scope.dataKelas = [];

            $scope.editKelas=function(DataVo){
            
                delete $scope.item.attributes;
                var DataVo = $scope.item;
                
                    manageKelas.updateData(DataVo).then(function(e) {
                                    
                                }, function errorCallBack(err) {
                                    
                                });
            }
                
            $scope.addKelas=function(){

                
                if($scope.item.id!="" && $scope.item.id!=undefined && $scope.item.kodeExternal!="" && 
                    $scope.item.kodeExternal!=undefined && $scope.item.namaExternal!="" && 
                    scope.item.namaExternal!=undefined && $scope.item.noUrut!="" && 
                    $scope.item.noUrut!=undefined && $scope.item.namaKelas!="" && 
                    $scope.item.namaKelas!=undefined && $scope.item.reportDisplay!="" && 
                    $scope.item.reportDisplay!=undefined){
                    for(var i=0;$scope.dataKelas._data.length;i++){ 
                        if($scope.dataKelas._data[i].id==$scope.item.id){
                            return;
                        }
                    }
                }

                $scope.createGuid=function()
                {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                }
                var kelas={
                    "id": "",
                    "kdProfile": $scope.item.kdProfile,
                    "statusEnabled": $scope.item.statusEnabled,
                    "noRec": $scope.createGuid(),
                    "reportDisplay": $scope.item.reportDisplay,
                    "kodeExternal": $scope.item.kodeExternal,
                    "namaExternal": $scope.item.namaExternal,
                    "namaKelas": $scope.item.namaKelas,
                    "noUrut": $scope.item.noUrut,
                    "qKelas":3,
                    "kelas": {
                        "kdProfile": $scope.item.kelas.kdProfile,
                        "statusEnabled": $scope.item.kelas.statusEnabled,
                        "id": $scope.item.kelas.id,
                        "noRec": $scope.item.kelas.noRec,
                        "reportDisplay": $scope.item.kelas.reportDisplay,
                        "kodeExternal": $scope.item.kelas.kodeExternal,
                        "namaExternal": $scope.item.kelas.namaExternal,
                        "namaKelas": $scope.item.kelas.namaKelas,
                        "noUrut": $scope.item.kelas.noUrut,
                        "qKelas": $scope.item.kelas.qKelas
                        }
                }
                manageKelas.addData(kelas).then(function(e) {
                });
                $scope.item={};
            }
            

            $scope.dataItem = [];

            $scope.get = function (id) {
                $scope.i = 0;
                for ($scope.i in $scope.dataKelas) {
                    if ($scope.dataKelas[$scope.i].id == id) {
                        $scope.dataKelas = $scope.dataKelas[$scope.i];
                        return $scope.dataItem;
                    }
                }
            }

            $scope.UpdateKelas = function (id) {
                $scope.item = angular.copy($scope.get(id));
            }


            $scope.deleteKelas=function(e){
               e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                var id = selectedItem.id;
                
                manageKelas.deleteData(id).then(function(e) {
                                
                            }, function errorCallBack(err) {
                                
                            });
            }

        }]);

});