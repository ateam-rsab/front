define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ApresiasiLayananCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','$state',
		function($rootScope, $scope, ModelItem,ManageSarpras, $state) {		
			$scope.title = "Resep elektronik";			

			$scope.dataVOloaded = true;
			
            $scope.item={};

            $scope.Cancel = function(){
            	$scope.item.gambarMukaKepuasan = undefined;
            }
			
		     $scope.batal = function(){
			  $scope.item= {};
	        }
	        $scope.JmlApresiasi = function(){
	        	$state.go('JumlahApresiasiLayanan')
	        }

			$scope.Save=function(){
				debugger
				if($scope.item.gambarMukaKepuasan != undefined){
					ManageSarpras.saveGambarMuka(ModelItem.beforePost($scope.item)).then(function(e) {
	                });
                }else{
                	window.messageContainer.error('Pilih Apresiasi Terlebih Dahulu');
                }
			};
		}
	]);
});