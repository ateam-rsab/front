define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TindakanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.item = {};
		$scope.dataTindakan = new kendo.data.DataSource({
				data: []
			});

			$scope.columnTindakan= [{
				"field": "No",
				"title": "No",
				"width": "50px"
			}, {
				"field": "Kode",
				"title": "Kode Tindakan",
				"width": "200px"
			}, {
				"field": "Tindakan",
				"title": "Nama Tindakan",
				"width": "100px"
			}, {
				"field": "Keterangan",
				"title": "Keterangan",
				"width": "100px"
			}, {
		        command: { text: "Hapus", click: $scope.removeDataKomponenLengkap },
		        title: "Action",
		        width: "110px"
		    }];
		ModelItem.get("Tindakan").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});

		ModelItem.getDataDummyGeneric("RegistrasiBidicPDTKBL/Tindakan/Radio", false).then(function(data) {
			$scope.ListTindakan = data;
        })
		ModelItem.getDataDummyGeneric("TindakanMedis", true).then(function(data) {
			$scope.ListTindakanMedis = data;
		})
		$scope.addTindakan = function() {
				// 
				var tempDataTindakan = {
					"No" : $scope.dataTindakan._data.length+1,
					"Kode" : $scope.item.Tindakan,
					"Tindakan" : $scope.item.Tindakan_1.tindakanMedis,
					"Keterangan" : $scope.item.Keterangan	
				}

				$scope.dataTindakan.add(tempDataTindakan);
				$scope.item.Tindakan="";
				$scope.item.Tindakan_1="";
				$scope.item.Keterangan=""
			}

			$scope.removeDataKomponenLengkap = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataTindakan = $scope.dataTindakan
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