define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InfusCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("LaporanPembedahanInstruksi/InstruksiPascaBedah").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("Infus", true).then(function(data) {
				$scope.listInfus = data;
			})
			$scope.dataInfus = new kendo.data.DataSource({
				data: []
			});
			$scope.columnInfus = [{
				"field": "no",
				"title": "No",
				width: "10%"
			},
			{
				"field": "macam",
				"title": "Macam",
				width: "40%"
			},
			{
				"field": "jumlah",
				"title": "Jumlah",
				width: "20%"
			},
			{
				"field": "tetesan",
				"title": "Tetesan",
				width: "20%"
			},
			{
				command: {text: "Delete", click:$scope.removeInfus},
				title : "&nbsp;",
				width: "10%"
			}
			];

			$scope.now = new Date();
			$scope.addDataInfus = function() {
                if($scope.item.Infus != "" && $scope.item.Infus != undefined)
                {
                    for(var i=0; i < $scope.dataInfus._data.length; i++)
                    {

                        if($scope.dataInfus._data[i] == $scope.item.Infus.name)
                        {
                            return;
                        }
                    }

                    var tempDataInfus = {
                    	"no" : $scope.dataInfus._data.length+1,
                        "macam" : $scope.item.Infus.name,
                        "jumlah" : $scope.item.Jumlah,
                        "tetesan" : $scope.item.Tetesan



                    }
                    $scope.dataInfus.add(tempDataInfus);
                    $scope.item.Infus = "";
                    $scope.item.Jumlah = "";
                    $scope.item.Tetesan = "";

                }
            }
            $scope.removeInfus = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataInfus = $scope.dataInfus
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };
		}
	]);
});