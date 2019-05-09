define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SurveiKepuasanPelangganCtrl', ['$rootScope', '$scope', 'ModelItem','TampilDataMasterSurveiPelanggan','DateHelper', '$document', 'R','$state',
		function($rootScope, $scope, ModelItem,TampilDataMasterSurveiPelanggan,DateHelper, $document, r,$state) {		
					

			$scope.dataVOloaded = true;
			
            $scope.item={};
			
          
				TampilDataMasterSurveiPelanggan.getOrderList("pertanyaanSurvey/find-all/" ).then(function(dat){
				    $scope.Listpertanyaan = dat.data.data.data;
				  debugger;
					
				});
				
				$scope.people = [{
				"name": "Sangat Baik"
				}, {
				"name": "Baik"
				}, {
				"name": "Cukup"
				}, {
				"name": "Buruk"
				}, {
				"name": "Sangat Buruk"
    }];
			
		}
	]);
});