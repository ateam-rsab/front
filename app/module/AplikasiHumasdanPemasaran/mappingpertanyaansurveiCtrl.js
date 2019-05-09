define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('mappingpertanyaansurveiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','TampilDataMasterSurveiPelanggan', 'ManageSarpras',
        function($rootScope, $scope, ModelItem, $state, TampilDataMasterSurveiPelanggan, ManageSarpras) {
		$scope.item = {};
		
		$scope.arrPeralatan = [];
            $scope.cekArrPeralatan= function (data) {

               var isExist = _.find($scope.arrPeralatan, function (dataExist) {
                   return dataExist == data;
                });

                if (isExist == undefined) {
					var dat = {
						pertanyaanSurvey:$scope.item.question,
				keteranganSurvey:data	
					}
                 $scope.arrPeralatan.push(dat);
          }
               else {
                   $scope.arrPeralatan = _.without($scope.arrPeralatan, data);
               }
			
				
            };
		 
		
		
		
		  
			
		 var init = function(){		
		TampilDataMasterSurveiPelanggan.getOrderList("service/list-generic/?view=PertanyaanSurvey&select=*", true).then(function(dat){
				$scope.Listpertanyaan = dat;
				debugger;
				});
			 };	
		 init();		
		TampilDataMasterSurveiPelanggan.getOrderList("service/list-generic/?view=KeteranganSurvey&select=*").then(function(dat){
		$scope.Listketerangan = dat.data;
		debugger;
			});
			
			
	//define column untuk grid
//MasterLinen.getOrderList("service/list-generic/?view=JenisLinen&select=*").then(function(dat){
	//			$scope.sourceOrder = dat;
	//		});
			// $scope.dataSasaranStrategis = new kendo.data.DataSource({
			// 	data: [
			// 	{
			// 		"kodeSasaranStrategis": "001",
			// 		"sasaranStrategis": "Terpenuhinya SDM yang kompeten"
			// 	}
			// 	]
			// });


		$scope.batal = function()
			{
			  $scope.item= {};
			}
		
		  $scope.Save = function() {
						
			 $scope.item=$scope.arrPeralatan;
		//	 console.log(JSON.stringify($scope.item.arrPeralatan))
debugger;			 
             ManageSarpras.saveSurvei(ModelItem.beforePost($scope.item)).then(function (e) {
				 $scope.item={};
                init();
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });


            };
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});