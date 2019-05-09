/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('IbuCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Ibu";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/Ibu").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("ListAgama", true).then(function (data) {
                $scope.listAgama = data;
            })

           ModelItem.getDataDummyGeneric("ListPekerjaan", false).then(function(data) {
                $scope.listPekerjaan = data;
            })

            ModelItem.getDataDummyGeneric("ListPendidikan", true).then(function (data) {
                $scope.listPendidikan = data;
            })

           ModelItem.getDataDummyGeneric("ListSukuBangsa", false).then(function(data) {
                $scope.listSukuBangsa= data;
            })

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});