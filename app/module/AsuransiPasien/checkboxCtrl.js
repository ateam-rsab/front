define(['initialize'], function(initialize) {
   'use strict';
   initialize.controller('checkboxCtrl', ['$rootScope', '$scope', 'ModelItem',	
   	function($rootScope, $scope, ModelItem) {

    $scope.myAppObjects = [
        {
        id: 1,
		caption: "tes1",
        cb1: true,
        cb2: false,
        cb3: true,
        cb4: true,
        cb5: false
        },
        {
        id: 2,
		caption:"tes2",
        cb1: false,
        cb2: false,
        cb3: true,
        cb4: false,
        cb5: true
        },
		{
        id: 2,
		caption:"tes2",
        cb1: false,
        cb2: false,
        cb3: true,
        cb4: false,
        cb5: true
        },
		{
        id: 2,
		caption:"tes2",
        cb1: false,
        cb2: false,
        cb3: true,
        cb4: false,
        cb5: true
        }];
		
		
	$scope.cekCaption = function(caption)
	{
		alert(caption);
	}
		
	
			var arrFieldSelectVoPekerjaan = ['id', 'pekerjaan'];
			ModelItem.getKendoSource("Pekerjaan", arrFieldSelectVoPekerjaan).then(function(data){
				$scope.myAppObjects = data;
			})
			
			var arrFieldSelectVoJenisKelamin = ['id', 'jenisKelamin'];
			ModelItem.getDataSource("JenisKelamin", arrFieldSelectVoJenisKelamin).then(function(data){
				$scope.myAppObjects = data;
				
			})
		
		
    $scope.checkedItems = function() {
        var checkedItems = [];
        angular.forEach($scope.myAppObjects, function(appObj, arrayIndex){
            angular.forEach(appObj, function(cb, key) {
                if(key.substring(0, 2) == "cb" && cb) {
                    checkedItems.push(appObj.id + '-' + key)
                }
            })
        })
        return checkedItems
    }

}])
})