define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PencucianLinenEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.item = {};
		 ModelItem.get("Laundry/PencucianLinenEksternal").then(function(data) {
			$scope.item = data;
			$scope.item.totalHarga = 0;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});

			$scope.columndaftarPencucianLinenEksternal = [{
				"field": "jenisLinen.jenisLinen",
				"title": "<h3 align=center>Jenis Linen</h3>",
				"width": "300px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			},{
				"field": "hargaSatuan",
				"title": "<h3 align=center>Harga Satuan</h3>",
				"width": "100px"
			}, {
				"field": "totalHarga",
				"title": "<h3 align=center>Total Harga</h3>",
				"width": "100px"
			}, {
				command: { text: "Hapus", click: $scope.removeDaftarPencucianLinenEksternal },
		        title: "<h3 align=center>Action</h3>",
		        width: "70px"
		    }];
		    $scope.satuan = function() {
				$scope.item.satuanKg = $scope.item.mesin.satuanStandarKapasitas;
				$scope.item.kapasitas = $scope.item.mesin.kapasitas;
			};
			$scope.perhitungan = function(){
				var a = $scope.item.jumlah;
				var b = $scope.item.hargaSatuan;
				var c = $scope.item.totalHarga;
				var d = a*b;
				$scope.item.totalHarga = c+d;
			}

		    $scope.addDaftarPencucianLinenEksternal = function() {

				// 
				var tempDaftarPencucianLinenEksternal = {
					"jenisLinen" : $scope.item.jenisLinen,
					"jumlah": $scope.item.jumlah,
					"hargaSatuan": $scope.item.hargaSatuan,
					"totalHarga": $scope.item.jumlah*$scope.item.hargaSatuan
				}

				$scope.daftarPencucianLinenEksternal.add(tempDaftarPencucianLinenEksternal);
				var a = $scope.item.jumlah;
				var b = $scope.item.hargaSatuan;
				var c = $scope.item.totalHarga;
				var d = a*b;
				$scope.item.totalHarga = c+d;
				debugger;
				$scope.item.mesin="",
				$scope.item.satuanKg="",
				$scope.item.kapasitas="",
				$scope.item.jenisLinen="",
				$scope.item.jumlah="",
				$scope.item.hargaSatuan=""
			}

			$scope.removeDaftarPencucianLinenEksternal = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempDaftarPencucianLinenEksternal== $scope.daftarPencucianLinenEksternal
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};


		$scope.daftarPerhitunganBahanKimia = new kendo.data.DataSource({
			data: [
					{ 
						"jenisLinen":"Warna",
						"jumlah":"1",
						"noMesin":"5",
						"kapasitas":"10",
						"namaBahan":"MD. Pine",
						"jumlah":"320",
						"satuan":"ML",
						"status":"Cuci Ulang"
					},
					{ 
						"jenisLinen":"Warna",
						"jumlah":"1",
						"noMesin":"5",
						"kapasitas":"10",
						"namaBahan":"MD. Pine",
						"jumlah":"320",
						"satuan":"ML",
						"status":"Cuci Ulang"
					}

				]
			});


			$scope.columndaftarPerhitunganBahanKimia = [{
				"field": "jenisLinen",
				"title": "<h3 align=center>Jenis Linen</h3>",
				"width": "100px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			},{
				"field": "noMesin",
				"title": "<h3 align=center>No. Mesin</h3>",
				"width": "100px"
			},{
				"field": "kapasitas",
				"title": "<h3 align=center>Kapasitas</h3>",
				"width": "100px"
			},{
				"field": "namaBahan",
				"title": "<h3 align=center>Nama Bahan</h3>",
				"width": "200px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			},{
				"field": "satuan",
				"title": "<h3 align=center>Satuan</h3>",
				"width": "100px"
			}, {
				"field": "status",
				"title": "<h3 align=center>Status</h3>",
				"width": "200px"
		    }];
		}
	]);
});