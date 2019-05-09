/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function(initialize) {
	
	'use strict';
	initialize.controller('AgamaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Data Agama";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.showGridData=true;
			
			ModelItem.get("Sample/Agama").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.dataAgama=[];
			var uid=1;

			$scope.AddAgama=function(id){
				$scope.showGridData=true;
				$scope.i=0;
				
				var agama = {
					"id" : uid,
					"kodeAgama" : $scope.item.kodeAgama,
					"namaAgama" : $scope.item.namaAgama,
					"detailAgama" : $scope.item.detailAgama
				}

		        if($scope.item.id==null){
		        	uid++;
			        $scope.dataAgama.push(agama);
					console.log(JSON.stringify($scope.dataAgama));
				}
				else {
					
		            for(var i=0; i < $scope.dataAgama.length; i++)
		            {
		            	if ($scope.dataAgama[i].id == $scope.item.id) {
		                	
		                    $scope.dataAgama[i].kodeAgama = agama.kodeAgama;
		                    $scope.dataAgama[i].namaAgama = agama.namaAgama;
		                    $scope.dataAgama[i].detailAgama= agama.detailAgama;
		                }
		            };
/*
		            for each(var i in $scope.dataAgama) {
		                if (i.id == id) {
		                	
		                    i.kodeAgama = agama.kodeAgama;
		                    i.namaAgama = agama.namaAgama;
		                    i.detailAgama= agama.detailAgama;
		                }
		            }*/
		        }
		        $scope.item={};
			}

			$scope.dataItem=[];

            $scope.get=function(id){
            	$scope.i=0;	
                for ($scope.i in $scope.dataAgama) {
		            if ($scope.dataAgama[$scope.i].id == id) {
		            	$scope.dataItem=$scope.dataAgama[$scope.i];
		                return $scope.dataItem;
		            }
                }
            }
                        
			$scope.UpdateAgama=function(id) {
                 $scope.item = angular.copy($scope.get(id));
			}


			$scope.DeleteAgama=function(id){
				$scope.i=0;
				// 
		        for ($scope.i in $scope.dataAgama) {
		            if ($scope.dataAgama[$scope.i].id == id) {
		                $scope.dataAgama.splice($scope.i, 1);
		            }
		        }
		    }
			
	}]);	
	
});