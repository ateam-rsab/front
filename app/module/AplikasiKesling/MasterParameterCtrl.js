define(['initialize'], function(initialize) {
	'use strict';

	initialize.controller('MasterParameterCtrl', ['$rootScope', '$scope', 'ModelItem','TampilDataMasterParameter','$state','ManageSarpras',
		function($rootScope, $scope, ModelItem,TampilDataMasterParameter,$state,ManageSarpras) {		
 			ModelItem.get("Kesling/MasterParameter").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.statusEnabled = false;
			
/*			$scope.dataMasterParameter = new kendo.data.DataSource({
				data: []
			});*/
			
			$scope.dataMasterParameter= [{
				"field": "id",
				"title": "ID Parameter"
			}, {
				"field": "kode",
				"title": "Kode Parameter"
			}, {
				"field": "nama",
				"title": "Nama Parameter"
			}, {
				"field": "statusEnabled",
				"title": "",
				hidden: true
			}];

			var init = function(){

				TampilDataMasterParameter.getOrderList("service/list-generic/?view=Parameter&select=*").then(function(dat){
					$scope.sourceOrder = dat.data;
					// debugger;
				});
			
			};

			init();

		 	$scope.batal = function() {
				$scope.item= {};
		 	}
		 
		 	$scope.kl = function(current){
				$scope.current = current;

				$scope.item.id=current.id;
				$scope.item.kodeParameter=current.kode;
				$scope.item.statusEnabled=current.statusEnabled;
				$scope.item.parameter=current.nama;
			}
			//debugger;
			
			$scope.Save = function() {

				if ($scope.item.id !== undefined) {

					// console.log(JSON.stringify("update :",$scope.item));
					// debugger;

					ManageSarpras.updateMasterParameter(ModelItem.beforePost($scope.item)).then(function (e) {
						$scope.item= {};
	               		init();  
	                    /*$state.go('dashboardpasien.TandaVital', {
	                     noCM: $scope.noCM
	                     });*/
	             	});
	             	
				} else {
					// console.log(JSON.stringify("save :",$scope.item));
					// debugger;

					ManageSarpras.saveMasterParameter(ModelItem.beforePost($scope.item)).then(function (e) {
						// console.log(JSON.stringify($scope.item));
						// debugger;

						$scope.item= {};
	               		init();  
	                    /*$state.go('dashboardpasien.TandaVital', {
	                     noCM: $scope.noCM
	                     });*/
             		});
				}
				
				//debugger;

            };
		

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;

			// })

		//	$scope.now = new Date();
		//	ModelItem.get("Logistik/PenerimaanBarangMedisdanNonMedis(Logistik)").then(function(data) {
		//		$scope.item = data;
		//		scope.dataVOloaded = true;
		//	}, function errorCallBack(err) {});

			
		//	ModelItem.getDataDummyGeneric("Kesling/MasterParameter/checkboxDataAktif", false).then(function(data) {
		//	$scope.ListDataAktif = data;
		//	})

		//	$scope.enableKodeParameter=true;
			

			// })	

		}
		]);
});