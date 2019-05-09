define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormEkstensionCtrl', ['$rootScope', '$scope', 'ModelItem', 'masterExtensionService',
		function($rootScope, $scope, ModelItem, masterExtensionService) {
			ModelItem.get("Humas/FormEkstension").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

				masterExtensionService.getEkstension("ekstension-no-telepon/find-all-ekstension/", true).then(function(dat){
					$scope.dataEkstension = dat.data.data.data;
				});
				$scope.mainGridOptions = {
			        pageable: true,
			        columns: [
			          	{
							field: "counterNumber",
							title: "Nomor",
							width: 40
						},
						{
							field: "ruangan.namaRuangan",
							title: "Ruangan",
							width: 100
						},
						{
							field: "noEkstension",
							title: "No Ekstenison",
							width: 150
						}],
			    	editable: false
		      	};
			}, function errorCallBack(err) {});
		}
	]);
});