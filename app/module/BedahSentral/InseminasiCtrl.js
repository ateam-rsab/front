
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InseminasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
        function($rootScope, $scope, ModelItem, DateHelper) {
        	$scope.title = "Laporan Perhitungan Kasa dan Alat Operasi";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.showGridData=true;
			$scope.now = new Date();
			
			ModelItem.get("Sample/Inseminasi").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("DataCaraPengeluaran", false).then(function(data) {
				$scope.listCaraPengeluaran_bak = data;
			});
			$scope.listCaraPengeluaran = [{"id":1,"name":"Masturbasi"},{"id":2,"name":"Milex"},{"id":3,"name":"Split"},{"id":4,"name":"ke medium"}]

			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listStatusYaTidak = data 
			});
			$scope.datamotilitas = {
				data: [{"value":''}]
			};

			$scope.addField = function(){
				var data = {
					value :""
				}
				$scope.datamotilitas.data.push(data);	
			};

			$scope.removeField = function(index){
				var last = _.findLastIndex($scope.datamotilitas.data);
				if(last >0)
				{
					$scope.datamotilitas.data.splice(last, 1);	
				}
								
			};
			
		}
	]);
});
  