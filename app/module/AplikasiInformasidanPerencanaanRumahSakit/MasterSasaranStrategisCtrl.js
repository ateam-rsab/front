define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterSasaranStrategisCtrl', ['$rootScope', '$scope', 'ModelItem', 'dataSasaranStrategis' , 'ManagePasien', '$state',
		function($rootScope, $scope, ModelItem, dataSasaranStrategis, ManagePasien, $state) {		
			// ModelItem.get("InformasidanPerencanaanRumahSakit/MasterSasaranStrategis").then(function(data) {
			// 	$scope.item = data;
			// 	$scope.dataVOloaded = true;
			// }, function errorCallBack(err) {});
			// $scope.item = {};
			// dataSasaranStrategis.getOrderList("service/list-generic/?view=SasaranStrategis&select=*").then(function(dat){
			// 	$scope.sourceOrder = dat;
			// });
			// dataSasaranStrategis.getOrderList("service/list-generic/?view=SasaranStrategis&select=*").then(function(dat){
			// 	$scope.sourceOrder = dat({
			// 	data: [
			// 	{
			// 	}
			// 	]
			// });

			dataSasaranStrategis.getOrderList("sasaran-strategis/find-all-sasaran-strategis/").then(function(dat){
				$scope.sourceOrder = dat.data.data;
			});
			

			$scope.columndataSasaranStrategis= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "kode",
				"title": "<h3 align = center>kode Sasaran Strategis</h3>",
				"width": "100px"
			}, {
				"field": "sasaranStrategis",
				"title": "<h3 align = center>Sasaran Strategis</h3>",
				"width": "300px"
			
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })


		$scope.Save=function()
			{
				ManagePasien.saveSasaranStrategis(ModelItem.beforePost($scope.item)).then(function(e) {
                });
			};
		}
	]);
});