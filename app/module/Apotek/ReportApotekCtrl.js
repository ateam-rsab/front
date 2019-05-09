define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReportApotekCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$window',
		function($rootScope, $scope, ModelItem, DateHelper, $window) {
			ModelItem.get("Apotek/ReportApotek").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.laporan = [
				{id:1, name:"Laporan Obat Generik", nameInternal:"lapObatGenerik"},
				{id:1, name:"Laporan Obat Psikotropika", nameInternal:"lapObatPsikotropika"},
				{id:1, name:"Laporan Obat Narkotika", nameInternal:"lapObatNarkotika"},
				]

				$scope.report = function(){
					var awal = DateHelper.getTanggalFormattedNew($scope.item.awal);
					var akhir = DateHelper.getTanggalFormattedNew($scope.item.akhir);
					var jenisLaporan = $scope.item.report.nameInternal;
		            $window.open('http://172.16.16.32:8080/jasamedika-web/reporting/'+jenisLaporan+'?startDate='+awal+'&endDate='+akhir+'&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A', '_blank');
		        };
			}, function errorCallBack(err) {});
		}
	]);
});