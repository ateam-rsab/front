define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanObatAntibiotikCtrl', ['ReportHelper', '$state', '$q', '$scope',
		function(reportHelper, $state, $q, $scope) {
			
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = $scope.now;
			$scope.item.periodeAkhir = $scope.now;
			$scope.isLoadingData = false;


			$scope.ShowLaporan = function(){
				var periodeAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
				var periodeAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');;
				$scope.urlLaporan = reportHelper.open("reporting/lapObatAntibiotika?startDate="+periodeAwal+"&endDate="+periodeAkhir);
			
				$scope.isLoadingData = true;
				reportHelper.get($scope.urlLaporan).then(function(data){
	  				$scope.isLoadingData = false;
				}, function(reason) {
					$scope.isLoadingData = false;
				    window.messageContainer.error("Gagal menampilkan laporan");
				});
			}

			$scope.ShowLaporan();
		}
	]);
});