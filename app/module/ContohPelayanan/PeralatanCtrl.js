define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('PeralatanCtrl', ['$q','$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($q,$rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, ManagePasien, findPasien) {
            
            $scope.item = {};
            
           
			
			$scope.arrPeralatan = [];
            $scope.cekArrPeralatan= function (data) {

                var isExist = _.find($scope.arrPeralatan, function (dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrPeralatan.push(data);
                }
                else {
                    $scope.arrPeralatan = _.without($scope.arrPeralatan, data);
                }
			
				
            };
			
			
			
			
			
			
            
            
            ModelItem.getDataDummyGeneric("Peralatan", false).then(function(data) {
                $scope.listPeralatan = data;
            })

          

            $scope.Save = function() {
				
			
				
			//var oke=[];	
			//$scope.item.arrPeralatan=oke;
		
	//	 	

		//	var dataPeralatan = [];
		//		for(var i=0; i<$scope.arrPeralatan.length; i++){
		//		var obj = {
		//				"isNilai" : false,
		//				"peralatan" : $scope.arrPeralatan[i]
		//			}
					
	//			dataPeralatan.push(obj);
		//		}
				
				
			//	$scope.item.arrPeralatan =  {"sdasdasdas"};
			//	
			//var dataall =[];
			//$scope.listPeralatan = data;
			//for (var i=0; i<scope.listPeralatan.length;i++){
				
			//	dataall.push();
				
				
			//}
			//$scope.item.listperalatan=dataall;
			//

     
		
 //console.log(JSON.stringify(scope.listPeralatan));
				
				
				
					
				
				

		//		var dataPeralatan = [];
		//		for(var i=0; i<$scope.arrPeralatan.length; i++){
		//		var obj = {
		//				"isNilai" : false,
		//				"peralatan" : $scope.arrPeralatan[i]
		//		}		
	//		dataPeralatan.push(obj);
		//		}
		//	$scope.item.arrPeralatan=dataPeralatan;
				
				
				
	
				
				
				
				
				
			$scope.item.transferPasienInternal={
				"noRec":"2c9090ad562b818501562b8326980000"
			};
				$scope.item.arrPeralatan=$scope.arrPeralatan;
			
			
			
			var data1=[];
			
			
		for (var i=0; i<$scope.listPeralatan.length;i++)
			{
			$scope.listPeralatan[i].isNilai = "false"  ;
			
			for (var j=0; j<$scope.arrPeralatan.length;j++)
				{			
			
				if($scope.listPeralatan[i] == $scope.arrPeralatan[j]) 
				
					{
						
					$scope.listPeralatan[i].isNilai= "true"  ;
				
					}
				
			
		
				
				
				
			//	var obj = {
				//	"isNilai" :$scope.listPeralatan[i].a,
				
					
			//		"peralatan" : $scope.listPeralatan[i]
				
				
				}				
		
			  
			 // data1.push(obj);
			}

			
			/*for (var i=0; i<$scope.listPeralatan.length;i++)
			{
			   document.writeln($scope.listPeralatan[i].name + " : " + $scope.listPeralatan[i].isNilai);	
			}*/


			
						
			//}
			
				
				
				
				$scope.item.listPeralatan = $scope.listPeralatan;
				
				
			   cacheHelper.set("kajianAwal", $scope.kajianAwal);
               ManagePasien.savePeralatan(ModelItem.beforePost($scope.item)).then(function (e) {
                  $scope.kajianAwal.riwayatpsikososial = $scope.item;
                   cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
               });


            };
        }
    ]);
});