/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('SistemSkoringPasienGawatIGDCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Sistem Skoring Pasien Gawat IGD";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showJam=false;

            
            $scope.$watch('item.jenisKategori.id', function(newValue, oldValue) {
                if(newValue==1){
                    $scope.showJam=true;
                }else
                    $scope.showJam=false;
                    
            });

            ModelItem.get("SistemSkoringPasienGawatIGD").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("ListCheckBoxJenisKategori", true).then(function (data) {
                $scope.listJenisKategori = data;
            })

           ModelItem.getDataDummyGeneric("SistemSkoringPasienGawatIGD", false).then(function(data) {
                $scope.listSistemSkoring = data;
            })

           $scope.Save=function(){
              
               var dataSkor = [];
               var data = [];
               var subdata=[];
               var subsubdata=[];
               debugger
               $scope.item.scores=[];

               for (data in $scope.listSistemSkoring){
                    for (subdata in $scope.listSistemSkoring[data]){
                        var element =  $scope.listSistemSkoring[data];
                       for(subsubdata in element.children){
                            var subElement =  element.children[subsubdata];
                            $scope.item.scores.push({id:subElement.id,score:subElement.score});
                            //$scope.item.scores=_.map([subElement], subElement.id,subElement.score);
                       }
                    }    
               }

                 manageSkoring.addData($scope.item).then(function(e) {
                                
                            }, function errorCallBack(err) {
                                
                            });
            }
                //console.log(JSON.stringify($scope.item));
            

        }]);

});