define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('JadwalDpjpRawatInapCtrl', ['ManagePasien', 'ManagePegawai', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'FindPegawai', 'DataHelper', 'FindPegawai',
		function(ManagePasien, ManagePegawai, $rootScope, $scope, ModelItem, $state, FindPasien, FindPegawai, DataHelper, findPegawai){
			$scope.now = new Date();
            $scope.item = {};
            $scope.item.tglAwal = $scope.now;
            $scope.item.tglAhir = $scope.now;
			FindPasien.getNamaDokter().then(function(data){
				debugger;
				$scope.dokters = data.data.dokter;
				$scope.ruangans = data.data.ruangan;
			});
			$scope.$watch('item.namaRuangan', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
			$scope.refresh = function(){
				if ($scope.item.namaRuangan === undefined) return;
				findPegawai.findDokterDPJP($scope.item.namaRuangan.ruanganId).then(function(data){
					debugger;
					$scope.listData = data.data;
				})

				// var data = findPegawai.findDokterDPJP($scope.item.namaRuangan.ruanganId);
                //     data.fetch(function() {
                //         $scope.listData = this._data;
                //         $scope.$apply();
                //     });
			};
			// ModelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data){
			// 	$scope.ruangans = data;
			// });
			// ModelItem.getDataDummyGeneric("Dokter", true, true, 500).then(function(data){
			// 	$scope.dokters = data;
			// });
			$scope.Save = function(e) {
				debugger;
				var data = {
					id : "",
					ruangan: {
						id: $scope.item.namaRuangan.ruanganId
					},
					dokter: {
						id: $scope.item.namaDokter.dokterId
					},
						tglAwal: $scope.item.tglAwal,
						tglAhir: $scope.item.tglAhir
				}
				ManagePegawai.saveJadwalDpjp(data).then(function(e){
					$scope.refresh();
				});
			};
			$scope.hapus = function(data) {
				debugger;
				ManagePegawai.hapusDokterDPJP(data.noRec).then(function(e){
					$scope.refresh();
				})
			}
		}
		]);
});