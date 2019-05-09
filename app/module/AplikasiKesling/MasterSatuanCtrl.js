define(['initialize'], function (initialize) {
	'use strict';

	initialize.controller('MasterSatuanCtrl', ['$rootScope', '$scope', 'ModelItem','TampilDataMasterParameter','ManageSarpras',
		function($rootScope, $scope, ModelItem,TampilDataMasterParameter,ManageSarpras) {		
            ModelItem.get("Kesling/MasterSatuan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.dataVOloaded = true;
			$scope.item = {};

		//	$scope.dataMasterSatuan = new kendo.data.DataSource({
		//		data: [
		//		{ 
		//			"kodeSatuan" : "001",
		//			"satuan":"mg/L"
		//		},
		//		{ 
		//			"kodeSatuan" : "002",
		//			"satuan":"NTU"
		//		},
		//		{ 
		//			"kodeSatuan" : "003",
		//			"satuan":"Jml/100 mL"
		//		}
		//		]
		//	});
			
			
			var init = function(){		

				TampilDataMasterParameter.getOrderList("service/list-generic/?view=SatuanStandar&select=*").then(function(dat){
					$scope.sourceOrder = dat.data;
					// debugger;
	           	});
			
			};
			
			init();

			$scope.columndataMasterSatuan = [
				{
					//define column untuk grid
					// var arrColumnGridResepElektronik = [{
					"field": "id",
					"title": "ID Satuan",
					"width": "100px"
				},
				{
					"field": "satuanStandar",
					"title": "Satuan",
					"width": "300px"
				}
			];

		//	$scope.now = new Date();
		//	ModelItem.get("Kesling/MasterSatuan").then(function(data) {
		//		$scope.item = data;
		//		scope.dataVOloaded = true;
		//	}, function errorCallBack(err) {});

		//	ModelItem.getDataDummyGeneric("Kesling/MasterParameter/checkboxDataAktif", false).then(function(data) {
		//	$scope.ListDataAktif = data;
		//	})

			$scope.kl = function(current){
				$scope.current = current;
				$scope.item.id=current.id;
				$scope.item.satuanStandar=current.satuanStandar;
			}
		
  			$scope.Save = function() {
             	console.log(JSON.stringify($scope.item));
             	// debugger;
  				
             	ManageSarpras.saveSatuan(ModelItem.beforePost($scope.item)).then(function (e) {
					$scope.item= {};
               		init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             	});
				//debugger;

            };

		}
	]);
});