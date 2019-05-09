/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('RuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageRuangan',
        function ($rootScope, $scope, ModelItem, manageRuangan) {
            $scope.title = "Data Ruangan";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showGridData = true;

            ModelItem.get("Sample/Ruangan").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            ModelItem.getDataDummyGeneric("StatusYaTidakMaster", false).then(function(data) {
                $scope.listYaTidak = data;
            })

            ModelItem.getDataDummyGeneric("ListCheckBoxRuanganDepartemen", false).then(function(data) {
                $scope.listDepartemen = data;
            })

            $scope.$watch('item.namaExternal', function(newValue, oldValue) {
                $scope.item.reportDisplay=newValue;
            });

            $scope.dataRuangan = [];
            
            $scope.mainGridOptions = {
                dataBound: function() {}
            };

            $scope.$watch('id',function() {
                $scope.dataRuangan = manageRuangan.getData($scope.id);
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;

            });

            $scope.select = function(a, b, c, d, e, f) {}
            $scope.selectRuangan = function(a, b, c, d, e, f) {

            };

            $scope.columnRuangan=[{
                field:"kdProfile",
                title:ModelItem.translate("kdProfile", 1)
            },{
                field:"statusEnabled",
                title:ModelItem.translate("statusEnabled", 1)
            },{
                field:"reportDisplay",
                title:ModelItem.translate("reportDisplay", 1)
            },{
                field:"departemen",
                title:ModelItem.translate("departemen", 1)
            },{
                command:{text:"Hapus", click: $scope.deleteRuangan},
                title:"&nbsp;",
                width:"110px"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

            $scope.addRuangan=function(){

                
                if($scope.item.id!="" && $scope.item.id!=undefined && $scope.item.kodeExternal!="" && $scope.item.kodeExternal!=undefined && 
                    $scope.item.namaExternal!="" && $scope.item.namaExternal!=undefined && 
                    $scope.item.kelasHeadId!="" && $scope.item.kelasHeadId!=undefined && 
                    $scope.item.namaRuangan!="" && $scope.item.namaRuangan!=undefined && 
                    $scope.item.reportDisplay!="" && $scope.item.reportDisplay!=undefined){
                    for(var i=0;$scope.dataRuangan._data.length;i++){ 
                        if($scope.dataRuangan._data[i].id==$scope.item.id){
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
                var ruangan={
                    "jamTutup": $scope.item.jamTutup,
                    "kdRuangan": $scope.item.kdRuangan,
                    "departemenId": $scope.item.departemen.id,
                    "kodeExternal": $scope.item.kodeExternal,
                    "departemen": $scope.item.departemen,
                    "lokasiRuangan": $scope.item.lokasiRuangan,
                    "alamatEmail": $scope.item.alamatEmail,
                    "id": "",
                    "qRuangan": 8,
                    "prefixNoAntrian":$scope.item.prefixNoAntrian,
                    "faksimile": $scope.item.faksimile,
                    "namaExternal": $scope.item.namaExternal,
                    "pegawaiKepalaId": $scope.item.pegawaiKepalaId,
                    "noRec": $scope.item.createGuid,
                    "fixedPhone": $scope.item.fixedPhone,
                    "namaRuangan": $scope.item.namaRuangan,
                    "modulAplikasiId": $scope.item.modulAplikasiId,
                    "website": $scope.item.website,
                    "noRuangan": $scope.item.noRuangan,
                    "kdProfile": $scope.item.kdProfile,
                    "mobilePhone": $scope.item.mobilePhone,
                    "statusEnabled": $scope.item.statusEnabled,
                    "jamBuka": $scope.item.jamBuka,
                    "kelasHeadId": $scope.item.kelasHeadId,
                    "reportDisplay": $scope.item.reportDisplay,
                    "noCounter": $scope.item.noCounter
                }
                manageRuangan.addData(ruangan).then(function(e) {
                });
                $scope.item={};
            }

             $scope.editRuangan=function(DataVo){
            
                delete $scope.item.attributes;
                var DataVo = $scope.item;
                
                    manageRuangan.updateData(DataVo).then(function(e) {
                                    
                                }, function errorCallBack(err) {
                                    
                                });
            }

            $scope.dataItem = [];

            $scope.get = function () {
                $scope.i = 0;
                for ($scope.i in $scope.dataRuangan) {
                    if ($scope.dataRuangan[$scope.i].id == id) {
                        $scope.dataItem = $scope.dataRuangan[$scope.i];
                        return $scope.dataItem;
                    }
                }
            }

            $scope.UpdateRuangan = function (id) {
                $scope.item = angular.copy($scope.get(id));
            }


            $scope.deleteRuangan=function(e){
               e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                var id = selectedItem.id;
                
                manageRuangan.deleteData(id).then(function(e) {
                                
                            }, function errorCallBack(err) {
                                
                            });
            }

        }]);

});