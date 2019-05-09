define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HistoPatologiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "Tanda Vital";
			
			
			
			ModelItem.getDataDummyGeneric("StatusJaringanTubuh", false).then(function(data) {
				$scope.listStatusJaringanTubuh = data;
			})
			
			
			ModelItem.getDataDummyGeneric("StatusFikasasi", false).then(function(data) {
				$scope.listStatusFikasasi = data;
			})
			
			
				$rootScope.showMenu = true;
			$scope.noCM = $state.params.noCM;
			$scope.isCodeDiagnosisKlinik = true;
			$scope.item = {};
			$scope.item.diagnosisKlinik = {
				"id": 1,
				"kode": "1",
				"name": "diagnosis 1"
			};
			$scope.item.riwayatPenyakitOrObat = {
				"id": 1,
				"kode": "1",
				"name": "diagnosis 1"
			};
			$scope.item.typeDiagnosisKlinik = "kode";


			//-----keperluan grid RiwayatPenyakitOrObat
			$scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
				data: []
			});

			$scope.columnRiwayatPenyakitOrObat = [{
				"field": "id",
				"title": "no"
			}, {
				"field": "kode",
				"title": "Kode"
			}, {
				"field": "name",
				"title": "Name"
			}];

			$scope.addDataRiwayatPenyakitOrObat = function() {
				$scope.dataRiwayatPenyakitOrObat.add($scope.item.riwayatPenyakitOrObat);
			}

			$scope.removeRiwayatPenyakitOrObat = function() {

				$scope.dataRiwayatPenyakitOrObat.data([]);
			};

			$scope.sourceRiwayatPenyakitOrObat = [{
					"id": 1,
					"kode": "1",
					"name": "penyakit 1"
				}, {
					"id": 2,
					"kode": "2",
					"name": "obat 2"
				}, {
					"id": 3,
					"kode": "3",
					"name": "penyakit 3"
				}, {
					"id": 4,
					"kode": "4",
					"name": "obat 4"
				}, {
					"id": 5,
					"kode": "5",
					"name": "obat 5"
				}

			];

			$scope.listRiwayatPenyakitOrObat = new kendo.data.DataSource({
				data: $scope.sourceRiwayatPenyakitOrObat
			});
			
			
			$scope.dataDiagnosisKlinik = new kendo.data.DataSource({
				data: []
			});

			$scope.columnDiagnosisKlinik = 
			[{
				"field": "id",
				"title": "no"
			}, {
				"field": "kode",
				"title": "Kode Diagnosis Klinik"
			}, {
				"field": "name",
				"title": "Diagnosis Klinik"
			}];
			
			$scope.now = new Date();
			
			$scope.$watch('item.typeDiagnosisKlinik', function(newValue, oldValue) {
				if (newValue == "name") {
					$scope.isCodeDiagnosisKlinik = false;
				} else {
					$scope.isCodeDiagnosisKlinik = true;
				}
			});

			$scope.addDataDiagnosisKlinik = function() {
				$scope.dataDiagnosisKlinik.add($scope.item.diagnosisKlinik);
			}

			$scope.removeDataDiagnosisKlinik = function() {

				$scope.dataDiagnosisKlinik.data([]);
			};

			$scope.sourceDiagnosisKlinik = [{
					"id": 1,
					"kode": "1",
					"name": "diagnosis 1"
				}, {
					"id": 2,
					"kode": "2",
					"name": "diagnosis 2"
				}, {
					"id": 3,
					"kode": "3",
					"name": "diagnosis 3"
				}, {
					"id": 4,
					"kode": "4",
					"name": "diagnosis 4"
				}, {
					"id": 5,
					"kode": "5",
					"name": "diagnosis 5"
				}

			];

			$scope.listDiagnosisKlinik = new kendo.data.DataSource({
				data: $scope.sourceDiagnosisKlinik
			});
			
			

		}
	]);
});