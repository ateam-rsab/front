define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CatatanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper',
    	function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper) {
	        $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Catatan";
			$rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenu = true;
            $scope.pasien = {};

			$scope.item = {};
			ModelItem.get("PemeriksaanFisikCatatan").then(function(data) {
				$scope.item = data;

				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});
			
			$scope.isAdaGangguansatu = false;
			$scope.$watch('item.Rujukan', function(newValue, oldValue) {
			  if(newValue == "Lain-lain")
			  {
			  	$scope.isAdaGangguansatu = true;
			  }
			  else
			  {
			  	$scope.isAdaGangguansatu = false;
			  }
			});
			
			ModelItem.getDataDummyGeneric("rujukan", false).then(function(data) {
				$scope.listStatusrujukan = data;
			})

			$scope.arrStatRujukan = [];
			$scope.cekArrStatRujukan = function(data) {
				data.AntrianPasienDiperiksa = { "noRec": $state.params.noRec}
				var isExist = _.find($scope.arrStatRujukan, function(dataExist){ return dataExist == data; });

				if(isExist == undefined)
				{
					$scope.arrStatRujukan.push(data);
				}
				else
				{
					$scope.arrStatRujukan = _.without($scope.arrStatRujukan, data);
				}
			
				console.log('list statRujukan : ' + JSON.stringify($scope.arrStatRujukan));
			};

			$scope.Save	 = function() {
				debugger;
				
				var _dataRujukan = _.filter($scope.arrStatRujukan, function(data){ 
					delete data.$$hashKey;
					return data; 
				});

				$scope.item.DataRujukan = _dataRujukan;

				delete $scope.item.attributes;

				var DataVo = $scope.item;

				console.log(JSON.stringify(_dataRujukan));
				ManagePasien.saveCatatan(ModelItem.beforePost(_dataRujukan)).then(function() {
                   
                }, function(err) {

                });
				//url PengkajianAwalPasien/Catatan
			};

    }]);
});
