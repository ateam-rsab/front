define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanBarangMedisAtauNonMedisDariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			ModelItem.get("Farmasi/PermintaanBarangMedisAtauNonMedisDariRuangan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("StatusProduk", true).then(function(data) {
				$scope.listStatusBarang = data;
			})
			$scope.daftarPermintaanBarang = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPermintaanBarang = [{
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "40%"
			}, {
				"field": "stok",
				"title": "Stok",
				"width": "10%"
			}, {
				"field": "qty",
				"title": "Qty",
				"width": "10%"
			}, {
				"field": "satuan",
				"title": "Satuan",
				"width": "20%"
			}, {
		        command: { text: "Hapus", click: $scope.removePermintaanBarang },
		        title: "Hapus",
		        "width": "20%"
		    }];
		    $scope.addPermintaanBarang = function() {
				
				

				// 
				var tempPermintaanBarang = {
					"namaBarang": $scope.item.namaBarang,
					"stok" : $scope.item.stok,
					"qty" : $scope.item.qty,
					"satuan" : $scope.item.satuan
				}

				$scope.daftarPermintaanBarang.add(tempPermintaanBarang);
			}

			$scope.removePermintaanBarang = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempPermintaanBarang== $scope.daftarPermintaanBarang
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			    // var selectedItem = grid.dataItem(row);

			    // $scope.DaftarPenyakit.remove(selectedItem);
			};
			$scope.Save = function() {
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
		}
	]);
});