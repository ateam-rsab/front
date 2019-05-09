define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CatatanPerkembanganPsikologiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.now = new Date();
		$scope.item = {};
		$scope.dataTesPsikologi = new kendo.data.DataSource({
				data: []
			});

			$scope.columnTesPsikologi= [{
				"field": "No",
				"title": "No",
				"width": "30px"
			}, {	
				"field": "TangalTes",
				"title": "Tanggal",
				"width": "100px"
			}, {
				"field": "JenisTes",
				"title": "Jenis Tes",
				"width": "100px"
			}, {
				"field": "Tujuan",
				"title": "Tujuan",
				"width": "200px"
			}, {
		        command: { text: "Hapus", click: $scope.removeDataTesPsikologi },
		        title: "Action",
		        width: "50px"
		    }];

		ModelItem.get("CatatanPerkembanganPsikologi").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});

        ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/JenisKelainanBawaan/Combo1", true).then(function(data) {
			$scope.ListCombo1 = data;
        })

		$scope.addDataTesPsikologi = function() {
				var tanggaltes = DateHelper.getTanggalFormatted($scope.item.Tanggal);
				var tempDataTesPsikologi= {
					"No" : $scope.dataTesPsikologi._data.length+1,
					"TangalTes" : tanggaltes,
					"JenisTes" : $scope.item.Diagnosis.name,
					"Tujuan" : $scope.item.Tujuan
				}

				$scope.dataTesPsikologi.add(tempDataTesPsikologi);
				$scope.item.Tanggal= new Date();
				$scope.item.Diagnosis="";
				$scope.item.JenisTes="";
				$scope.item.Tujuan=""
			}

			$scope.removeDataTesPsikologi = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataTesPsikologi = $scope.dataTesPsikologi
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);


			};

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});