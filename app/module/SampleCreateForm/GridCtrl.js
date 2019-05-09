define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('GridCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Page Grid";
			$scope.dataVOloaded = true;

			$scope.tempItem = {};
			$scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
				data: []
			});

			$scope.columnRiwayatPenyakitOrObat = [{
				"field": "name.name",
				"title": "dari combo box"
			}, {
				"field": "tanggal",
				"title": "dari date picker"
			}, {
				"field": "textbox",
				"title": "dari text box"
			}, {
				"field": "radio",
				"title": "dari radio btn"
			}, {
				"field": "checkbox",
				"title": "dari checkbox"
			}, {
		        command: { text: "Hapus", click: $scope.removeRiwayatPenyakitOrObat },
		        title: "&nbsp;",
		        width: "110px"
		    }];

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("DataPenyakitMayor", false).then(function(data) {
				$scope.listDataPenyakitMayor = data;
			})

			$scope.addDataRiwayatPenyakitOrObat = function() {

				var tanggalBaru = DateHelper.getTanggalFormatted($scope.tempItem.tanggalRiwayat);

				var tempDatariwayat = {
					"id": $scope.tempItem.riwayatPenyakitOrObat.id,
					"name" : $scope.tempItem.riwayatPenyakitOrObat,
					"tanggal" : tanggalBaru
				}

				$scope.dataRiwayatPenyakitOrObat.add(tempDatariwayat);
			}

			$scope.removeRiwayatPenyakitOrObat = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.dataRiwayatPenyakitOrObat.remove(selectedItem);
			};


			


		}
	]);
});