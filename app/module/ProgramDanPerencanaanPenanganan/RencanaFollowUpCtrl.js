define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('RencanaFollowUpCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Rencana Follow-up ";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/Kelamin").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});