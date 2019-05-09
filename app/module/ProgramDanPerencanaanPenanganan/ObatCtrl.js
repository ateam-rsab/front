/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('ObatCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Data Obat";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showGridData=true;
            $scope.no=1;

            ModelItem.get("Sample/Obat").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            // Combo box Jenis Perawatan
            ModelItem.getDataDummyGeneric("ListJenisObat", true).then(function (data) {
                $scope.listJenisObat = data;
            })
            ModelItem.getDataDummyGeneric("ListNamaObat", false).then(function (data) {
                $scope.listNamaObat = data;
            })

            $scope.dataRow= new kendo.data.DataSource({
				data: []
			});
			
			$scope.columnData = [{
				"field":"no",
				"title": "No",
				"width" : "50px"
			},{
				"field": "namaObat",
				"title": "Nama Obat",
				
			},{
				"field": "jenisObat",
				"title": "Jenis Obat",
				
			},{
				"field": "keterangan",
				"title": "Keterangan",
				"width" : "150px"

			}];

            $scope.addDataToRow = function() {
				var tempData = {
					"no":$scope.no++,
					"namaObat" :$scope.item.namaObat.name,
					"jenisObat" :$scope.item.jenisObat.name,
					"keterangan":$scope.item.keterangan
				}
				$scope.dataRow.add(tempData);				
			};

			$scope.reset = function(){
				$scope.item.namaObat = null,
				$scope.item.jenisObat = null,
				$scope.item.keterangan = null
			}

    }]);
});