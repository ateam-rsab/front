define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CutiPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','JenisCuti','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,JenisCuti,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: []
			});
			
			 $scope.ListStatusPerkawinan = [{
					"id": 1,
					"kode": "1",
					"name": "laki"
				}

			];
			
			
			JenisCuti.getOrderList("service/list-generic/?view=JenisCuti&select=*", true).then(function(dat){
				$scope.ListJenisCuti = dat.data;
				debugger;
				});		
			
		
			

			 $scope.Save = function() {
						
			  
             ManageSdm.saveDataPermohonanCutiPegawai(ModelItem.beforePost($scope.item)).then(function (e) {
                  $scope.item= {};
                   init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});