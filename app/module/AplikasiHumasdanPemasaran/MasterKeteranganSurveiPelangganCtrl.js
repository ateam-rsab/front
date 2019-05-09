define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('MasterKeteranganSurveiPelangganCtrl', ['$rootScope', '$scope', 'ModelItem','TampilDataMasterSurveiPelanggan','ManageSarpras', '$state',
        function($rootScope, $scope, ModelItem,TampilDataMasterSurveiPelanggan,ManageSarpras, $state) {
		$scope.item = {};
		
		
		
		
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

			$scope.columndataMasterDataPerusahaan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
			"field": "nomor",
			"title": "No",
			"width": "300px"
		}, {
			"field": "keterangan",
			"title": "Keterangan",
			"width": "300px"
				
		
				
				
			
            
				
			
		    }];
			
				
		var init = function(){		
		TampilDataMasterSurveiPelanggan.getOrderList("service/list-generic/?view=KeteranganSurvey&select=*").then(function(dat){
		$scope.sourceOrder = dat.data;

//		for (var i=0; i<$scope.sourceOrder.length;i++)
//				{					
	//				$scope.sourceOrder[i].ok= i ;
	//			}
		debugger;
			});
	};
	init();
			debugger;	
			

		 $scope.batal = function() {
			  $scope.item= {};
		 }
		 
		 $scope.kl = function(current){
				$scope.current = current;
				$scope.item.namaPeserta=current.nomor;
				$scope.item.keterangan=current.keterangan;
				$scope.item.id=current.id;
			}
			debugger;
			
		$scope.hapus = function()
			{
			TampilDataMasterSurveiPelanggan.getOrderList("keteranganSurvey/delete-keterangan/"+$scope.item.id ).then(function(dat){
		init();
			});	
			}	
			debugger;


$scope.batal = function()
			{
			  $scope.item= {};
			}



			
		  $scope.Save = function() {
						
			  
             ManageSarpras.saveMasterSurveiPelanggan(ModelItem.beforePost($scope.item)).then(function (e) {
				  $scope.item= {};
               init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
             });
debugger;

            };
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});