define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DiagnosisPasienCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.cek = "DiagnosisPasien";
			$scope.dataVOloaded = true;

			var arrColumnDiagnosisPasien = [{
				"field": "kodeDiagnosis",
				"title": "Kode Diagnosis",
                "width": 200
			}, {
				"field": "diagnosis",
				"title": "Diagnosis",
                "width": 200
			}, {
				"field": "jenisDiagnosis",
				"title": "Jenis Diagnosis",
                "width": 200
			}];
			
			ModelItem.getGridOption("Apotek/Penjualan/DataEntryResep", arrColumnDiagnosisPasien).then(function(data) {
				$scope.mainGridOptions = data;
			})


		}
	]);
});