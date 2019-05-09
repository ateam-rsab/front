define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InformasiDaftarPermintaanLinenBersihdariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Laundry/InformasiDaftarPermintaanLinenBersihdariRuangan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.InformasiDaftarPermintaanLinenBersihdariRuangan = new kendo.data.DataSource({
				data: [
					{ 
						"noOrder":"101010",
						"tglOrder":"26-07-2016",
						"ruangPemesan":"Klinik Dahlia",
						"userPemesan":"abdi",
						"ruangTujuan":"Laundry",
						"noKirim":"121212"
					},
					{ 
						"noOrder":"201020",
						"tglOrder":"26-07-2016",
						"ruangPemesan":"Klinik Mawar",
						"userPemesan":"abdi",
						"ruangTujuan":"Laundry",
						"noKirim":"212121"
					}
				]
			});
			$scope.columnInformasiDaftarPermintaanLinenBersihdariRuangan = [
			{
				"field": "noOrder",
				"title": "<h3 align=center>No Order</h3>",
				"width": "100px"
			},
			{
				"field": "tglOrder",
				"title": "<h3 align=center>Tgl Order</h3>",
				"width": "100px"
			},
			{
				"field": "ruangPemesan",
				"title": "<h3 align=center>Ruang Pemesan</h3>",
				"width": "200px"
			},
			{
				"field": "userPemesan",
				"title": "<h3 align=center>User Pemesan</h3>",
				"width": "200px"
			},
			{
				"field": "ruangTujuan",
				"title": "<h3 align=center>Ruang Tujuan</h3>",
				"width": "200px"
			},
			{
				"field": "noKirim",
				"title": "<h3 align=center>No Kirim</h3>",
				"width": "100px"
			},
			{
				command: { text: "Hapus", click: $scope.removeBahanMakanan },
		        title: "<h3 align=center>Action</h3>",
		        width: "10%"
			}

			];

			$scope.addBahanMakanan = function() {

				// 
				var tempBahanMakanan = {
					"namaBahanDiet" : $scope.item.namaBahanDiet,
					"spesifikasiBahanDiet": $scope.item.spesifikasiBahanDiet,
					"jenisBahanDiet": $scope.item.jenisBahanDiet.jenisDiet,
					"satuan": $scope.item.satuan.satuanHasil,
					"jmlKemasan": $scope.item.jmlKemasan,
					"jmlTerkecil": $scope.item.jmlTerkecil
				}

				$scope.daftarBahanMakanan.add(tempBahanMakanan);
			}

			$scope.removeBahanMakanan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempBahanMakanan== $scope.daftarBahanMakanan
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};
		}
	]);
});