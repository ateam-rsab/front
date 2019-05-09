define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KirimBarangCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Farmasi/KirimBarang").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("Ruangan", true).then(function(data) {
				$scope.listRuangan = data;
			});
			$scope.dataBarang = new kendo.data.DataSource({
				data: [
				{
					"kodeBarang" : "0001",
					"namaBarang" : "Infus",
					"asalBarang" : "IGM",
					"stok" : "100",
					"order" : "10",
				},
				{
					"kodeBarang" : "0002",
					"namaBarang" : "Kasur",
					"asalBarang" : "IGM",
					"stok" : "100",
					"order" : "10",
				}
				]
			});
			$scope.tempDataBarang = [];
			$scope.columnDataBarang = [{
				"field": "kodeBarang",
				"title": "Kode Barang",
				"width": "15%"
			}, {
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "30%"
			}, {
				"field": "asalBarang",
				"title": "Asal Barang",
				"width": "20%"
			}, {
				"field": "stok",
				"title": "Stok",
				"width": "10%"
			}, {
				"field": "order",
				"title": "Order",
				"width": "10%"
			}, {
		        "command": { text: "Input", click: $scope.inputDataBarang },
		        "title": "Kirim",
		        "width": "15%"
		    }];
		    $scope.Save = function() {
				$scope.item.dataBarang = $scope.tempDataBarang;
				console.log(JSON.stringify($scope.item));

				// alert("Alert Berhasil"); ngecek button savenya berhasil
               
                /*cacheHelper.set("kajianAwal", $scope.kajianAwal); 
                ManagePengkajianAwal.saveTandaVital(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.tandaVital = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $state.go('dashboardpasien.SkriningNyeri', {
                        noCM: $scope.noCM
                    });
                }); */

            };
            $scope.inputDataBarang = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.tempDataBarang.push(selectedItem);
			};
			$scope.enableNoOrder = true;
			
		}
	]);
});