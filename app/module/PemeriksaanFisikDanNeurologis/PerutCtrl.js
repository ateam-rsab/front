define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PerutCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Perut";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/Perut").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("StatusPerut", false).then(function (data) {
                $scope.statusPerut = data;
            })

           ModelItem.getDataDummyGeneric("StatusBisingUsus", false).then(function(data) {
                $scope.statusBisingUsus = data;
            })

            ModelItem.getDataDummyGeneric("StatusHati", false).then(function (data) {
                $scope.statusHati = data;
            })

            ModelItem.getDataDummyGeneric("StatusLimpa", false).then(function (data) {
                $scope.statusLimpa = data;
            })

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});