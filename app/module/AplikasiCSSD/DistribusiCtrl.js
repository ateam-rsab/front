define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DistribusiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper', '$state','$mdDialog',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.dataPost = [];
			var init = function () {
				IPSRSService.getItem("cssd-distribusi/get-no-kirim").then(function(dat){
					$scope.item.nomorKirim = dat.data.noKirim;
				});
				IPSRSService.getItem("cssd-distribusi/detail-distribusi?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
					$scope.dataHeader = dat.data.header;
					$scope.dataGrid = dat.data.detail;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						autoSync: true
					});
					$scope.item.jumlahCycle = $scope.dataHeader.siklus;
					$scope.item.jenisHarga = $scope.dataHeader.jenisHarga;
					$scope.item.noOrder = $scope.dataHeader.noOrder;
					$scope.item.noBundle = $scope.dataHeader.noBundel;
					$scope.item.ruangan = $scope.dataHeader.ruanganAsal;
					$scope.item.operator = $scope.dataHeader.petugas;
					$scope.item.status = {"name": $scope.dataHeader.status};
					var tanggal = new Date($scope.dataHeader.tanggalPlanning);
					if ($scope.dataHeader.tanggalPlanning == "" || $scope.dataHeader.tanggalPlanning == "-") {
						$scope.item.tanggal = new Date();
					} else {
						$scope.item.tanggal = tanggal;
					}
					

				});
			};
			init();
			$scope.listStatus = [
			{"id":1,"name":"Dikirim"},
			{"id":2,"name":"Belum Dikirim"}]
			$scope.gridDistribusiInternal = { 
				pageable: true,
				columns: [
				{ field:"produkId", title:"<center>Produk ID"},
				{ field:"namaProduk",title:"<center>Nama Barang"},
				{ field:"satuanStandar",title:"<center>Satuan"},
				{ field:"qtyProduk",title:"<center>Jumlah"}
				],
				editable: false
			};
			$scope.batal = function(){
				$state.go('DaftarPenerimaanSterilisasiAlat')
			}
			$scope.simpanInternal = function () {
				var dataDistribusi = []
				for (var i=0;i<$scope.dataSource._data.length;i++){
					var dataTemp =
					{
						"produk": {
					    	"id": $scope.dataSource._data[i].produkId
					    },
					    "qtyProduk": $scope.dataSource._data[i].qtyProduk,
					    "noRec": $scope.dataSource._data[i].noRec
					}
					dataDistribusi.push(dataTemp);
				}
				var data = 
				{
				  "strukPelayanan": {
				    "noRec": $state.params.strukPelayananId
				  },
				  "noRec": $scope.dataHeader.noRec,
				  "tanggal": $scope.item.tanggal,
				  "status": $scope.item.status.name,
				  "noKirim": $scope.item.nomorKirim,
				  "cssdDistribusiDetailVO": dataDistribusi
				}
				ManageSarpras.saveDataSarPras(data, "cssd-distribusi/save-distribusi/").then(function (e) {
					var konfirmasi = $mdDialog.confirm()
					.title('Peringatan !')
					.textContent('Kembali ke Daftar Penerimaan Sterilisasi Alat?')
					.ariaLabel('Lucky Day')
					.ok('ya')
					.cancel('Tidak')
					$mdDialog.show(konfirmasi).then(function(){
						$state.go("DaftarPenerimaanSterilisasiAlat");
					})
				});
			}

			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 5,
				data: $scope.dataDitribusiEksternal,
				autoSync: true
			});
			$scope.gridDistribusiEksternal = { 
				pageable: true,
				columns: [
				{ field:"namaPaket", title:"<center>Nama Paket"},
				{ field:"namaBarang",title:"<center>Nama Barang"},
				{ field:"jumlah",title:"<center>Jumlah"},
				{ field:"satuan",title:"<center>Satuan"}
				],
				editable: false
			};
		}
		]);
});