define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DecontaminasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras','IPSRSService', 'DateHelper', '$state','$mdDialog',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.jamMulai = $scope.now;
			$scope.item.jamSelesai = $scope.now;
			$scope.dataVOloaded = true;
			var init = function () {
                IPSRSService.getItem("cssd-decontaminasi/detail-decontaminasi/?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
                    $scope.dataHeader = dat.data.header;
                    $scope.dataGrid = dat.data.detail;
                    $scope.dataSource = new kendo.data.DataSource({
                        pageSize: 5,
                        data: $scope.dataGrid,
                        autoSync: true
                    });
                    $scope.item.noOrder = $scope.dataHeader.noOrder;
                    $scope.item.ruangan = $scope.dataHeader.ruanganAsal;
                    $scope.item.petugas = $scope.dataHeader.petugas;
                    if($scope.dataHeader.tanggalPlanning == "-"){
                    	var tanggal = new Date();
                    }else{
                    	var tanggal = new Date($scope.dataHeader.tanggalPlanning);	
                    }	
                    if($scope.dataHeader.jamMulai == "-"){
                    	var jamMulai = new Date();
                    }else{
                    	var jamMulai = new Date($scope.dataHeader.jamMulai);
                    }

                    if($scope.dataHeader.jamAkhir == "-"){
                    	var jamSelesai = new Date();
                    }else{
                    	var jamSelesai = new Date($scope.dataHeader.jamAkhir)
                    }
					
					if ($scope.dataHeader.jamMulai == "" || $scope.dataHeader.jamMulai == "-") {
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

            $scope.batal = function(){
            	$state.go('DaftarPenerimaanSterilisasiAlat');
            }
			$scope.gridDecontaminasi = { 
				pageable: true,
				columns: [
				{ field:"namaProduk",title:"<center>Nama Barang"},
				{ field:"qtyProduk",title:"<center>Jumlah"},
				{ field:"satuanStandar",title:"<center>Satuan"}
				],
				editable: false
			};
			$scope.simpan = function () {
				var dataGridNew = [];
				for (var i=0;i<$scope.dataGrid.length;i++) {
					var dataTemp =
					{
						"produk":{
							"id":$scope.dataSource._data[i].produkId
						},
						"qtyProduk":$scope.dataSource._data[i].qtyProduk,
						"noRec":$scope.dataSource._data[i].noRec
					}
					dataGridNew.push(dataTemp);
					
				}
				var data = 
				{
					"strukPelayanan":{
						"noRec":$state.params.strukPelayananId
					},
					"noRec":$scope.dataHeader.noRec,
					"tanggal":$scope.item.tanggal,
					"jamMulai":$scope.item.jamMulai,
					"jamSelesai":$scope.item.jamSelesai,
					"cssdDecontaminasiDetail": dataGridNew
				}
				IPSRSService.saveDataSarPras(data, "cssd-decontaminasi/save-decontaminasi/").then(function(e) {
					init();
					 var konfirmasi = $mdDialog.confirm()
					.title("Peringatan!")
					.textContent("Kembali Ke Daftar Penerimaan Sterilisasi Alat?")
					.ariaLabel("Lucky Day")
					.ok("Ya")
					.cancel("Tidak")

					$mdDialog.show(konfirmasi).then(function(){
						$state.go("DaftarPenerimaanSterilisasiAlat");
					})
				});
			}
		}
		]);
});