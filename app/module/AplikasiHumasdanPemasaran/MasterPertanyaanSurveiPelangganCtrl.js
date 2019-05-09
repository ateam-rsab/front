define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterPertanyaanSurveiPelangganCtrl', ['$rootScope', '$scope', 'ModelItem', 'masterPertanyaanSurveiPelangganService',
		function($rootScope, $scope, ModelItem, masterPertanyaanSurveiPelangganService) {
			ModelItem.get("Humas/MasterPertanyaanSurveiPelanggan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;

				

				var init = function(){
					masterPertanyaanSurveiPelangganService.getPertanyaan("service/list-generic/?view=PertanyaanSurvey&select=*", true).then(function(dat){
						$scope.dataPertanyaan = dat.data;
						for (var i=1; i<$scope.dataPertanyaan.length+1;i++)
						{			


							$scope.dataPertanyaan[i].ok= i ;
							
							
						}
					});
				};
				init();

				$scope.mainGridOptions = {
			        pageable: false,
			        columns: [
			          	{
							field: "counterNomer",
							title: "Nomor",
							width: 50
						},
						{
							field: "pertanyaan",
							title: "Pertanyaan",
							width: 200
						}],
			    	editable: false
		      	};

		      	$scope.tambah=function()
				{
					masterPertanyaanSurveiPelangganService.savePertanyaan(ModelItem.beforePost($scope.item)).then(function(e) {
						init();
						// debugger;
	                });
				};

				$scope.batal=function()
				{
					
					$scope.item.pertanyaan = "";
				};


				$scope.kl = function(current){
					$scope.current = current;
					$scope.hapus=function()
					{
						masterPertanyaanSurveiPelangganService.getPertanyaan("pertanyaanSurvey/delete-pertanyaan/"+current.id+"/").then(function(dat){
							init();

						});
					};				
				};
			}, function errorCallBack(err) {});
		}
	]);
});