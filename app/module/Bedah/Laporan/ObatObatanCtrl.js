define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ObatObatanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("LaporanPembedahanInstruksi/InstruksiPascaBedah").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("JenisObat", true).then(function(data) {
				$scope.listJenisObat = data;
			})
			$scope.dataObat = new kendo.data.DataSource({
				data: []
			});
			$scope.columnObat = [{
				"field": "no",
				"title": "No",
				width: "10%"
			},
			{
				"field": "jenisObat",
				"title": "Jenis Obat",
				width: "20%"
			},
			{
				"field": "namaObat",
				"title": "Nama Obat",
				width: "20%"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				width: "40%"
			},
			{
				command: {text: "Delete", click:$scope.removeObat},
				title : "&nbsp;",
				width: "10%"
			}
			];

			$scope.now = new Date();
			$scope.addDataObat = function() {
                if($scope.item.NamaObat != "" && $scope.item.NamaObat != undefined)
                {
                    for(var i=0; i < $scope.dataObat._data.length; i++)
                    {

                        if($scope.dataObat._data[i] == $scope.item.NamaObat)
                        {
                            return;
                        }
                    }

                    var tempDataObat = {
                    	"no" : $scope.dataObat._data.length+1,
                        "jenisObat" : $scope.item.JenisObat.name,
                        "namaObat" : $scope.item.NamaObat,
                        "keterangan" : $scope.item.KeteranganObat



                    }
                    $scope.dataObat.add(tempDataObat);
                    $scope.item.JenisObat = "";
                    $scope.item.NamaObat = "";
                    $scope.item.KeteranganObat = "";

                }
            }
            $scope.removeObat = function(e) {

                /*e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.dataMinum.remove(selectedItem);*/

                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataObat = $scope.dataObat
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);
            };
		}
	]);
});