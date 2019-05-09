define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanBarang(LinenBersih)dariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataPermintaanBahanMakanandariRuangan = new kendo.data.DataSource({
				data: []
			});

			$scope.columnPermintaanBahanMakanandariRuangan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "namaBarang",
				"title": "<h3 align=center>Nama Barang</h3>",
				"width": "300px"
			}, {
				"field": "stok",
				"title": "<h3 align=center>Stok</h3>",
				"width": "100px"
			}, {
				"field": "qty",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			}, {
				"field": "satuan",
				"title": "<h3 align=center>Satuan</h3>",
				"width": "200px"
			}, {
		        command: { text: "Hapus", click: $scope.removeDataPermintaanBahanMakanandariRuangan },
		        title: "<h3 align=center>Action</h3>",
		        width: "50px"
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("Laundry/PermintaanBarangdariRuangan").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Gizi/PermintaanBahanMakanandariRuangan/statusBarang", true).then(function(data) {
			$scope.ListstatusBarang = data;
			})

			$scope.item = {};
			$scope.addDataPermintaanBahanMakanandariRuangan = function() {

				var tempDataBarang = {
					"namaBarang": $scope.item.namaBarang,
					"stok" : $scope.item.stok,
					"qty" : $scope.item.qty,
					"satuan" : $scope.item.satuan
				}

				$scope.dataPermintaanBahanMakanandariRuangan.add(tempDataBarang);
				$scope.item.namaBarang = "";
				$scope.item.stok = "";
				$scope.item.qty = "";
				$scope.item.satuan = ""

			}

			$scope.removeDataPermintaanBahanMakanandariRuangan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataBarang = $scope.dataPermintaanBahanMakanandariRuangan
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);
			};
		}
	]);
});