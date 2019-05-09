define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('ReactionOfMotorBehaviourCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "ReactionOfMotorBehaviour";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/ReactionOfMotorBehaviour").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("Status", false).then(function(data) {
                $scope.status= data;
            })

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});