define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarMakananCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("LaporanPembedahanInstruksi/InstruksiPascaBedah").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.dataMakanan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnMakanan = [{
				"field": "no",
				"title": "No",
				width: "10%"
			},
			{
				"field": "makanan",
				"title": "Makanan",
				width: "40%"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				width: "40%"
			},
			{
				command: {text: "Delete", click:$scope.removeMakanan},
				title : "&nbsp;",
				width: "10%"
			}];

			$scope.now = new Date();
			$scope.addDataMakanan = function() {
                if($scope.item.Makanan != "" && $scope.item.Makanan != undefined)
                {
                    for(var i=0; i < $scope.dataMakanan._data.length; i++)
                    {

                        if($scope.dataMakanan._data[i] == $scope.item.Makanan)
                        {
                            return;
                        }
                    }

                    var tempDataMakanan = {
                    	"no" : $scope.dataMakanan._data.length+1,
                        "makanan" : $scope.item.Makanan,
                        "keterangan" : $scope.item.KeteranganMakanan



                    }
                    $scope.dataMakanan.add(tempDataMakanan);
                    $scope.item.Makanan = "";
                    $scope.item.KeteranganMakanan = "";

                }
            }
            $scope.removeMakanan = function(e) {

                /*e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.dataMinum.remove(selectedItem);*/

                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataMakanan = $scope.dataMakanan
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };
		}
	]);
});