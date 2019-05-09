/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('AnamnesisThtCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state',
        function ($rootScope, $scope, ModelItem, DateHelper,$state) {
            $scope.title = "Anamnesis THT";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.now = new Date();

            ModelItem.get("AnamnesisTHT").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded=true;
            },function errorCallBack(err) {});

            ModelItem.getDataDummyGeneric("StatusNormalTidakNormal", false).then(function(data) {
				$scope.listNormalTidakNormal = data;
			})

        }]);

});