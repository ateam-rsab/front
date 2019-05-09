define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemakaiandanPemanasanMesinGensetatauBoilerCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			ModelItem.get("Kesling/PemakaiandanPemanasanMesinGensetatauBoiler").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("NamaMesin", true).then(function(data) {
				$scope.listMesin = data;
			})
			$scope.dataPemanasanGenset = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPemanasanGenset = [
			{
				"field": "tanggal",
				"title": "Tanggal",
				"width": "15%"
			},
			{
				"field": "namaMesin",
				"title": "Nama Mesin",
				"width": "15%"
			},
			{
				"field": "lamaPemakaian",
				"title": "<center>Lama Pemakaian<br>/Pemanasan Genset</center>" ,
				"width": "20%"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				"width": "40%"
			},
			{
				command: {text: "Hapus", click:$scope.hapusDataPemakaianGenset},
				title : "&nbsp;",
				"width": "10%"
			}];
			$scope.tambah = function() {

                    // 
                    var tanggalBaru = DateHelper.getTanggalFormatted($scope.item.tanggal);

                    var tempDataPemanasanGenset = {
                    	"tanggal" : tanggalBaru,
                    	"namaMesin" : $scope.item.namaMesin.name,
                    	"lamaPemakaian" : $scope.item.lamaPemakaian,
                    	"keterangan" : $scope.item.keterangan



                    }
                    $scope.dataPemanasanGenset.add(tempDataPemanasanGenset);


            };
            $scope.hapusDataPemakaianGenset = function(e) {

            	e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataPemanasanGenset = $scope.dataPemanasanGenset
                    .filter(function (el) {
                        return el.name !== grid._data[0].name;
                    });

                grid.removeRow(row);

            };
		}
	]);
});