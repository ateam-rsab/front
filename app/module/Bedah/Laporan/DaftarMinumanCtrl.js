define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarMinumanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("LaporanPembedahanInstruksi/InstruksiPascaBedah").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.dataMinuman = new kendo.data.DataSource({
				data: []
			});
			$scope.columnMinuman = [{
				"field": "no",
				"title": "No",
				width: "10%"
			},
			{
				"field": "minuman",
				"title": "Minuman",
				width: "40%"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				width: "40%"
			},
			{
				command: {text: "Delete", click:$scope.removeMinuman},
				title : "&nbsp;",
				width: "10%"
			}];

			$scope.now = new Date();
			$scope.addDataMinuman = function() {
                if($scope.item.Minuman != "" && $scope.item.Minuman != undefined)
                {
                    for(var i=0; i < $scope.dataMinuman._data.length; i++)
                    {

                        if($scope.dataMinuman._data[i] == $scope.item.Minuman)
                        {
                            return;
                        }
                    }

                    var tempDataMinuman = {
                    	"no" : $scope.dataMinuman._data.length+1,
                        "minuman" : $scope.item.Minuman,
                        "keterangan" : $scope.item.KeteranganMinuman



                    }
                    $scope.dataMinuman.add(tempDataMinuman);
                    $scope.item.Minuman = "";
                    $scope.item.KeteranganMinuman = "";

                }
            }
            $scope.removeMinuman = function(e) {

                /*e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.dataMinum.remove(selectedItem);*/

                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataMinuman = $scope.dataMinuman
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };
		}
	]);
});