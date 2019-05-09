define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('RefleksFisiologisCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Refleks Fisiologis";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/RefleksFisiologis").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

            ModelItem.getDataDummyGeneric("StatusAdaTidakAda", false).then(function(data) {
                $scope.listAdaTidakAda = data;
            });

        }]);

});