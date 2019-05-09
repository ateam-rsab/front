define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailAsuransiCtrl', ['$scope', 'ModelItem', '$state', function($scope, modelItem, $state) {
    	$scope.click_dataasuransi = function()
    	{
    		$state.go("detailAsuransi.dataAsuransi");
    	}
    	$scope.click_pakaiasuransi = function()
    	{
    		$state.go("detailAsuransi.pakaiAsuransi");
    	}
        $scope.click_rujukluar = function()
        {
            $state.go("detailAsuransi.rujukLuar");
        }

    }]);
});