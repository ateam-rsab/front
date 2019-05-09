define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PunggungCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Punggung";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/Punggung").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("StatusPunggung", false).then(function(data) {
                $scope.statusPunggung = data;
            })

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});