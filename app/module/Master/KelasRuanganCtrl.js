/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function(initialize) {
	
	'use strict';
	initialize.controller('KelasRuanganCtrl', ['$rootScope', '$scope', 'ModelItem','ManageKelasRuangan',
		function($rootScope, $scope, ModelItem, manageKelasRuangan) {
			$scope.title = "Data Kelas Ruangan";
			$scope.dataVOloaded = true;
			$scope.item = {};
			//$scope.showGridData=true;
			
			ModelItem.get("Sample/KelasRuangan").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			// Combo box Jenis Perawatan
			ModelItem.getDataDummyGeneric("ListCheckBoxKelasRuangan", true).then(function(data) {
				$scope.listRuangan = data;
			})
			ModelItem.getDataDummyGeneric("ListCheckBoxKelasKelas", true).then(function(data) {
				$scope.listKelas = data;
			})
			 ModelItem.getDataDummyGeneric("StatusYaTidakMaster", false).then(function(data) {
                $scope.listYaTidak = data;
            })

			$scope.dataKelasRuangan=[];
			
			$scope.mainGridOptions = {
                dataBound: function() {}
            };

            $scope.$watch('id',function() {
                $scope.dataKelasRuangan = manageKelasRuangan.getData($scope.id);
                $rootScope.doneLoad = false;
                $scope.dataVOloaded = true;

            });

            $scope.select = function(a, b, c, d, e, f) {}
            $scope.selectKelasRuangan = function(a, b, c, d, e, f) {

            };
			 $scope.columnKelasRuangan=[{
                field:"kdProfile",
                title:ModelItem.translate("kdProfile", 1)
            },{
                field:"statusEnabled",
                title:ModelItem.translate("statusEnabled", 1)
            },{
                field:"ruangan.reportDisplay",
                title:ModelItem.translate("ruangan.reportDisplay", 1)
            },{
                field:"kelas.reportDisplay",
                title:ModelItem.translate("kelas.reportDisplay", 1)
            },{
                command:{text:"Hapus", click: $scope.deleteKelasRuangan},
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

            $scope.editKelasRuangan=function(DataVo){
	            delete $scope.item.attributes;

	            $scope.item.ruanganToKelas[0].kelas = $scope.item.kelas;
	            $scope.item.ruanganToKelas[0].ruangan = $scope.item.ruangan;
				var DataVo = $scope.item;
	            
				delete DataVo.kelas;
				delete DataVo.ruangan;
	            
	                manageKelasRuangan.updateData(DataVo).then(function(e) {
	                                
	                            }, function errorCallBack(err) {
	                                
	                            });
            }

			$scope.addKelasRuangan=function(){

                
                if($scope.item.id!="" && $scope.item.id!=undefined && 
                	$scope.item.kdProfile!="" && $scope.item.kdProfile!=undefined &&
                	 $scope.item.statusEnabled!="" && $scope.item.statusEnabled!=undefined){
                    for(var i=0;$scope.dataKelasRuangan._data.length;i++){ 
                        if($scope.dataKelasRuangan._data[i].id==$scope.item.id){
                            return;
                        }
                    }
                }

                
                var kelasRuangan={
					"kdProfile":$scope.item.kdProfile,
				   	"noRec":$scope.createGuid(),
				   	"statusEnabled":$scope.item.statusEnabled,
				   	"id":"",
				   	"ruanganToKelas": [ 
				      {  
				         "ruangan":$scope.item.ruangan,
				         "kelas":$scope.item.kelas
				      }]
				    }
   				
                manageKelasRuangan.addData(kelasRuangan).then(function(e) {
                });
                $scope.item={};
            }

		    

			$scope.dataItem=[];
            $scope.get=function(id){
            	$scope.i=0;	
                for ($scope.i in $scope.dataKelasRuangan) {
		            if ($scope.dataKelasRuangan[$scope.i].id == id) {
		            	$scope.dataKelasRuangan=$scope.dataKelasRuangan[$scope.i];
		                return $scope.dataItem;
		            }
                }
            }
                        
			$scope.UpdateKelasRuangan=function(id) {
                 $scope.item = angular.copy($scope.get(id));
			}


			$scope.deleteKelasRuangan=function(e){
               e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var selectedItem = grid.dataItem(row);
                var id = selectedItem.id;
                
                manageKelasRuangan.deleteData(id).then(function(e) {
                                
                            }, function errorCallBack(err) {
                                
                            });
            }
			
	}]);	
	
});