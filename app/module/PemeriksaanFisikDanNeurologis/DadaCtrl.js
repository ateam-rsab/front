define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('DadaCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Dada";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/Dada").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("StatusBentukDada", false).then(function (data) {
                $scope.statusBentukDada = data;
            })

           ModelItem.getDataDummyGeneric("StatusJantung", false).then(function(data) {
                $scope.statusJantung = data;
            })

            ModelItem.getDataDummyGeneric("StatusParu", false).then(function (data) {
                $scope.statusParu = data;
            })

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});