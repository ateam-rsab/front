define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterExtensionCtrl', ['$rootScope', '$scope', 'ModelItem', 'masterExtensionService',
		function($rootScope, $scope, ModelItem, masterExtensionService) {
			ModelItem.get("Humas/MasterExtension").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

				masterExtensionService.getYaTidak("service/list-generic/?view=StatusYaTidak&select=*", false).then(function(dat){
					$scope.listYaTidak = dat.data;
				});
				masterExtensionService.getRuangan("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
					$scope.listRuangan = dat.data;
					//debugger;
				});
				var init = function(){
					masterExtensionService.getEkstension("ekstension-no-telepon/find-all-ekstension/", true).then(function(dat){
						$scope.dataEkstension = dat.data.data.data;
						if($scope.dataEkstension == undefined)
						{
							$scope.item.nomor = 1;
						}else{
							$scope.item.nomor = $scope.dataEkstension.length + 1;
						}
						for (var i=1; i<$scope.dataEkstension.length+1;i++)
						{			


							$scope.dataEkstension[i].ok= i ;
							
							
						}
					});
				};
				init();

				$scope.mainGridOptions = {
					pageable: false,
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
					},
					{
						field: "statusSemuaRuangan.name",
						title: "Semua Ruangan",
						width: 100
					},
					{
						field: "statusPelanggan.name",
						title: "Pelanggan",
						width: 100
					}],
					editable: false
				};

				$scope.Save=function()
				{
					masterExtensionService.saveEkstension(ModelItem.beforePost($scope.item)).then(function(e) {
						init();
						batal();
					});
				};

				$scope.kl = function(current){

					$scope.current = current;
					$scope.item.nomor = current.id;
					$scope.hapus=function()
					{
						masterExtensionService.getEkstension("ekstension-no-telepon//delete-ekstension/"+current.id+"/").then(function(dat){
							init();

						});
					};				
				};

				

				$scope.batal = function() {
					$scope.item.ruangan= "";
					$scope.item.noExtension= "";
					$scope.item.statusSemuaRuangan= {};
					$scope.item.statusPelanggan= {};
				};
				// $scope.hapus = function()
				// {
				// 	HapusDataSurvei.getOrderList("keteranganSurvey/delete-keterangan/"+$scope.item.id ).then(function(dat){
				// 		init();
				// 	});	
				// }	
				// debugger;

			}, function errorCallBack(err) {});

		}
		]);
});