define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarMasterCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Master";
			
			ModelItem.get("PerencanaanDanPemasaran/kamusIku").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.MasterPeran=function(){
				$state.go("MasterPeran")
			}
			$scope.MasterBobotIndikator=function(){
				$state.go("MasterBobotIndikator")
			}
			$scope.MasterPeriodePelaporan=function(){
				$state.go("MasterPeriodePelaporan")
			}
			$scope.MasterDampakRisiko=function(){
				$state.go("MasterDampakRisiko")
			}
			$scope.MasterRisiko=function(){
				$state.go("MasterRisiko")
			}
			$scope.MasterKemungkinanRisiko=function(){
				$state.go("MasterKemungkinanRisiko")
			}
			$scope.MasterTingkatRisiko=function(){
				$state.go("MasterTingkatRisiko")
			}
			$scope.MasterSatuanIndikator=function(){
				$state.go("MasterSatuanIndikator")
			}
			$scope.MasterDefinisi=function(){
				$state.go("MasterDefinisiOperasional")
			}
			$scope.MasterFormula=function(){
				$state.go("MasterFormulaRensar")
			}
			$scope.MasterIndikator=function(){
				$state.go("MasterIndikator")
			}
			$scope.MasterPerspektif=function(){
				$state.go("Perspektif")
			}
		}
	])
})