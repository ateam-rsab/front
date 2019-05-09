define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SterilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','IPSRSService', 'DateHelper', '$state','$mdDialog',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.jamMulai = $scope.now;
			$scope.item.jamSelesai = $scope.now;
			$scope.dataVOloaded = true;
			$scope.dataPost = [];

			$scope.batal = function(){
				$state.go('DaftarPenerimaanSterilisasiAlat');
			}
			var init = function () {
				debugger
				IPSRSService.getItem("cssd-steril/detail-steril?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
					debugger
					$scope.dataHeader = dat.data.header;
					$scope.dataGrid = dat.data.detail;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						autoSync: true
					});
					$scope.item.jumlahCycle = $scope.dataHeader.siklus;
					if($scope.dataHeader.jenisHarga == ""){
						$scope.item.jenisHarga = "Per Item";
					}else{
						$scope.item.jenisHarga = $scope.dataHeader.jenisHarga;	
					}
					$scope.item.noOrder = $scope.dataHeader.noOrder;
					$scope.item.noBundle = $scope.dataHeader.noBundel;
					$scope.item.ruangan = $scope.dataHeader.ruanganAsal;
					$scope.item.operator = $scope.dataHeader.petugas;
					$scope.item.jenisSterilisasi = {"name": $scope.dataHeader.jenisSterilisasi}
					if($scope.dataHeader.tanggalPlanning ==  "-"){
						var tanggal = new Date();
					}else{
						var tanggal = new Date($scope.dataHeader.tanggalPlanning);
					}
					//var tanggal = new Date($scope.dataHeader.tanggalPlanning);
					if($scope.dataHeader.jamMulai == "-"){
						var jamMulai = new Date();
					}else{
						var jamMulai = new Date($scope.dataHeader.jamMulai);
					}
					/*var jamMulai = new Date($scope.dataHeader.jamMulai)*/;
					if($scope.dataHeader.jamAkhir == "-"){
						var jamSelesai = new Date();
					}else{
						var jamSelesai = new Date($scope.dataHeader.jamAkhir);
					}
					//var jamSelesai = new Date($scope.dataHeader.jamAkhir);
					if ($scope.dataHeader.jamMulai == "" || $scope.dataHeader.jamMulai == "-") {
						debugger
						//$scope.item.jamMulai = $scope.dataHeader.jamMulai;
						//$scope.item.jamSelesai = $scope.dataHeader.jamAkhir;
						$scope.item.jamMulai = new Date();
						$scope.item.jamSelesai = new Date();
					} else {
						$scope.item.jamMulai = jamMulai;
						$scope.item.jamSelesai = jamSelesai;
					}

					if ($scope.dataHeader.tanggalPlanning == "" || $scope.dataHeader.tanggalPlanning == "-") {
						$scope.item.tanggal = new Date();
					} else {
						$scope.item.tanggal = tanggal;
					}
					

				});
			};
			init();
			$scope.gridSterilisasi = { 
				pageable: true,
				columns: [
				{ field:"namaProduk",title:"<center>Nama Barang"},
				{ field:"qtyProduk",title:"<center>Jumlah"},
				{ field:"satuanStandar",title:"<center>Satuan"}
				],
				editable: false
			};
			$scope.listJenisSterilisasi = [
			{"id":1,"name":"Sterilisasi Suhu Tinggi"},
			{"id":2,"name":"Sterilisasi Suhu Rendah"}]
			$scope.jenisHarga = [
			{"id":1,"name":"Per Item"},
			{"id":2,"name":"Per Cycle"}]

			$scope.simpan = function () {
				var dataProduk = []
				for (var i=0;i<$scope.dataSource._data.length;i++){
					var dataTemp =
					{
						"produk":{
							"id":$scope.dataSource._data[i].produkId
						},
						"qtyProduk":$scope.dataSource._data[i].qtyProduk,
						"noRec":$scope.dataSource._data[i].noRec
					}
					dataProduk.push(dataTemp);
				}
				var data = 
				{
					"strukPelayanan":{
						"noRec":$state.params.strukPelayananId
					},
					"jenisSterilisasi":$scope.item.jenisSterilisasi.name,
					"noRec": $scope.dataHeader.noRec,
					"tanggal":$scope.item.tanggal,
					"jamMulai":$scope.item.jamMulai,
					"jamSelesai":$scope.item.jamSelesai,
					"siklus":$scope.item.jumlahCycle,
					"jenisHarga":$scope.item.jenisHarga,
					"cssdSterilDetail":dataProduk
				}
				ManageSarpras.saveDataSarPras(data, "cssd-steril/save-steril/").then(function (e) {
					init();
					var konfirmasi = $mdDialog.confirm()
					.title("Peringatan!")
					.textContent("Kembali Ke Daftar Penerimaan Sterilisasi Alat?")
					.ariaLabel("Lucky Day")
					.ok("Ya")
					.cancel("Tidak")
					$mdDialog.show(konfirmasi).then(function(){
						$state.go("DaftarPenerimaanSterilisasiAlat")
					})

				});
			}
		}
		]);
});
