define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataKonsulCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper',
		function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper) {
			//waktu saat ini
			$scope.now = new Date();

			$scope.item = {};
			ModelItem.get("DataKonsul").then(function(data) {
				$scope.item = data;
			
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});


			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listJenisKelamin = data;
			})

			ModelItem.getDataDummyGeneric("DataPenyakitMayor", false).then(function(data) {
				$scope.listInstalasiTujuanKonsul = data;
			})

			ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
				$scope.listInstalasiTujuanKonsul = data;
			})

            
            $scope.value = "";
            $scope.item = {};
            $scope.$watch('noCm', function(e) {

            })

            $scope.$watch('currentPasien', function(e) {
            	
                if (e === undefined) return;
                if (e === $scope.item) return;
                if (e[0] === undefined) return;
                if (e[0].npCm === $scope.noCm) return;
                //$scope.noCm = e[0].noCm;
                findPasien.getByNoCM(e[0].noCm).then(function(data) {
                    // $state.go('dashboardpasien.pasien', {
                    //     noCM: $scope.item.noCM
                    // });

                    if ($state.params.noCm === '-') {
                        window.location = "#/Dashboard/Pasien/Main/" + e[0].noCm;
                    } else if (e[0] !== undefined && e[0].noCm !== undefined) {
                        window.location = "#/Dashboard/Pasien/Main/" + e[0].noCm;
                    }
                    $scope.noCM = e[0].noCm;
                    $rootScope.currentPasien = data.data;
                    $scope.item = data.data;
                    //$scope.$apply();
                });
            });
            
            $scope.onSelect = function(a) {
            	
                $rootScope.currentPasien = a.sender._old;
            };

            $rootScope.isOpen = true;
            $scope.headerTemplate = '<table><tr><th width="100px">No. RM</th><th width="200px">Nama Pasien</th></tr></table>';
            $scope.template = '<table><tr><td width="100px">#: data.noRegistrasi #</td><td width="200px">#: data.namaPasien #</td></tr></table>';

            
            //
            $scope.pasiens = findPasien.findByNoRegistrasi('0');

		}
	]);
});