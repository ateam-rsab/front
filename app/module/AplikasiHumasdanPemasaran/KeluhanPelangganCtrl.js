define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeluhanPelangganCtrl', ['$rootScope', '$scope', 'ModelItem','LokasiKeluhan','Pekerjaan', 'ManageSarpras',
		function($rootScope, $scope, ModelItem,LokasiKeluhan,Pekerjaan,ManageSarpras) {		
			$scope.title = "Resep elektronik";			

			$scope.dataVOloaded = true;
			debugger;
            $scope.item={};

				LokasiKeluhan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
				$scope.LokasiKeluhan = dat;
			});
			
			Pekerjaan.getOrderList("service/list-generic/?view=Pekerjaan&select=*", true).then(function(dat){
				$scope.Pekerjaan = dat;
			});
		
$scope.batal = function()
			{
			  $scope.item= {};
			}
			

			$scope.Save=function()
			{
				debugger;
				ManageSarpras.saveKeluhanPelanggan(ModelItem.beforePost($scope.item)).then(function(e) {
                });
			};
		}
	]);
});