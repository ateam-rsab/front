define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisKelainanBawaanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.now = new Date();
		$scope.item = {};
		$scope.dataJenisKelainanBawaan = new kendo.data.DataSource({
				data: []
			});

			$scope.columnJenisKelainanBawaan= [{
				"field": "No",
				"title": "No",
				"width": "50px"
			}, {
				"field": "Diagnosis",
				"title": "Diagnosa Kelainan Bawaan Lahir",
				"width": "200px"
			}, {
				"field": "Diagnosis_2",
				"title": "Kode Diagnosis",
				"width": "100px"
			}, {
				"field": "ComboBox_1",
				"title": "Nama Diagnosis",
				"width": "100px"
			}, {
				"field": "PastiBanding",
				"title": "Pasti/Banding",
				"width": "100px"
			}, {
		        command: { text: "Hapus", click: $scope.removeDataKomponenLengkap },
		        title: "Action",
		        width: "110px"
		    }];

		ModelItem.get("JenisKelainanBawaan").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});

		ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/JenisKelainanBawaan/Radio1", false).then(function(data) {
			$scope.ListDiagnosis = data;
        })
        ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/JenisKelainanBawaan/Radio2", false).then(function(data) {
			$scope.ListPastiBanding = data;
        })
        ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/JenisKelainanBawaan/Combo1", true).then(function(data) {
			$scope.ListCombo1 = data;
        })
        ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/JenisKelainanBawaan/Combo2", true).then(function(data) {
			$scope.ListCombo2= data;
        })
		ModelItem.getDataDummyGeneric("ContohPelayanan/RadioPenyakit", false).then(function(data) {
			$scope.ListRadioPenyakit = data;
		})
		ModelItem.getDataDummyGeneric("Diagnosis", true).then(function(data) {
			$scope.ListDiagnosisKelainanBawaan = data;
		})
		$scope.addJenisKelainanBawaan = function() {
				// 
				var tempDataJenisKelainanBawaan = {
					"No" : $scope.dataJenisKelainanBawaan._data.length+1,
					"Diagnosis" : $scope.item.Diagnosis.name,
					"Diagnosis_2" : $scope.item.Diagnosis_2,
					"ComboBox_1" : $scope.item.ComboBox_1.name,
					"PastiBanding" : $scope.item.PastiBanding
					
					
				}

				$scope.dataJenisKelainanBawaan.add(tempDataJenisKelainanBawaan);
				$scope.item.Diagnosis="";
				$scope.item.Diagnosis_2="";
				$scope.item.ComboBox_1="";
				$scope.item.PastiBanding=""
			}

			$scope.removeDataKomponenLengkap = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataJenisKelainanBawaan = $scope.dataJenisKelainanBawaan
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);

			    // var selectedItem = grid.dataItem(row);

			    // $scope.dataKomponenLengkap.remove(selectedItem);

			};

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});