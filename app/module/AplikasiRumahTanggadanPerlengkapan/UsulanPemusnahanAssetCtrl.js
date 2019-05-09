define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('UsulanPemusnahanAssetCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};

			$scope.columnBarang = [
				{
					"field": "asalBarang",
					"title": "Asal Barang",
					editable: true
				},
				{
					"field": "ruangan",
					"title": "Ruangan"
				},
				{
					"field": "kodeBarang",
					"title": "Kode Barang",
					width: "12%"
				},
				{
					"field": "namaBarang",
					"title": "Nama Barang"
				},
				{
					"field": "jmlStok",
					"title": "Jumlah Stok",
					width: "10%"
				},
				{
					"field": "jmlPemusnahan",
					"title": "Jumlah Pemusnahan"
				},
				{
					"field": "noRegistrasiAsset",
					"title": "No Registrasi Asset"
				}
			];

			$scope.dataBarang = new kendo.data.DataSource({
				data: [],
				editable: true
			});
			$scope.kode = 1;
			$scope.Save = function(){
				var data = $scope.dataBarang;
				console.log(JSON.stringify($scope.dataBarang.data()));
			}		

			// $scope.dataEdit = {};
			// $scope.canEdit = false;
			$scope.klik = function(data, index){
				if($scope.dataEdit === data) $scope.canEdit = true;
				else {
					$scope.dataEdit = data;
					$scope.canEdit = false;
				}
				console.log(JSON.stringify(index));
			};

			$scope.tambah = function(){
				var dataBaru = {
					"id": $scope.kode,
					"asalBarang": "Belum Diisi",
					"ruangan": "Belum Diisi",
					"namaBarang": "Belum Diisi",
					"jmlPemusnahan": "Belum Diisi"
				};
				$scope.kode += 1;
				$scope.canEdit = false;
				$scope.dataEdit = {};
				$scope.dataBarang.add(dataBaru);
			}
	}])
})