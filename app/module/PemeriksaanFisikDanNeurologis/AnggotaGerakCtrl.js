define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('AnggotaGerakCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Anggota Gerak";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Sample/AnggotaGerak").then(function(data) {
				$scope.item = data;		
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

            ModelItem.getDataDummyGeneric("PilihanAnggotaGerak", false).then(function (data) {
                $scope.listAnggotaGerak = data;
            })

           ModelItem.getDataDummyGeneric("StatusDeformitas", false).then(function(data) {
                $scope.statusDeformitas = data;
            })

            ModelItem.getDataDummyGeneric("StatusKoordinasi", false).then(function (data) {
                $scope.statusKoordinasi = data;
            })

            $scope.arrList = [];
            $scope.cekArrList = function(listId) {
				var idx = $scope.arrList.indexOf(listId);
				// is currently selected
				if (idx > -1) {
					$scope.arrList.splice(idx, 1);
				}
				// is newly selected
				else {
					$scope.arrList.push(listId);
				}
				//console.log('list arrKarateristikNyeri : ' + $scope.arrKarateristikNyeri);
			};

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }

        }]);

});