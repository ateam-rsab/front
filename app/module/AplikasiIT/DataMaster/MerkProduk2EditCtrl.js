define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MerkProduk2EditCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$mdDialog','ManageLogistikPhp',
		function ($q, $rootScope, $scope, $state, ManageSarprasPhp, ModelItem, $mdDialog,manageLogistikPhp) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			LoadCombo();
			// $scope.isRouteLoading = true;
			$scope.kembali = function () {
				$state.go('MerkProduk2')
			}
			
			load()

			function load() {
			
				if ($state.params.idx != "") {
					$scope.item.id = $state.params.idx;
															//berdasarkan router
					ManageSarprasPhp.getDataTableTransaksi("merkproduk/get-merkprodukbyid/" + $scope.item.id, true).then(function (e) {
						var datax = e.data;
						// $scope.isRouteLoading = false;
					
						$scope.item.id = e.data[0].id;    
			// untuk menampilkan nilai combox  berdasarkan nilai yang dilerasikan, nilai yang akn ditampilkan fild.nilai akan ditampilakn dari html
						$scope.item.listnamaDepartemen = {id:e.data[0].objectdepartemenfk , namadepartemen:e.data[0].namadepartemen};
						$scope.item.merkProduk = e.data[0].merkproduk;
						$scope.item.kodeMerk = e.data[0].kdmerkproduk;
						$scope.item.reportDisplay = e.data[0].reportdisplay;

						$scope.item.objectdepartemenfk = e.data[0].objectdepartemenfk;
						$scope.item.qMerkProduk = e.data[0].qmerkproduk;
						$scope.item.namaExternal = e.data[0].namaexternal;
						$scope.item.kodeExternal = e.data[0].kodeexternal;
					
					})
				}
		
			}


	



			function LoadCombo() {
				ManageSarprasPhp.getDataTableTransaksi("merkproduk/get-datacombo").then(function (data) {
				
				//buat variabel buat dihtml == data.data.jeniskeperawaratan dari departemencontroller.php
						$scope.listnamaDepartemen =  data.data.namadepartemen
							
					})
			}


			$scope.simpan = function () {
				// if ($scope.item.namaField == undefined) {
				// 	toastr.error("Nama Field harus di isi!")
				// 	return
				// }
				// if ($scope.item.nilai == undefined) {
				// 	toastr.error("Nilai Field harus di isi!")
				// 	return
				// }
				// if ($scope.item.tabelRelasi == undefined) {
				// 	toastr.error("Tabel Relasi harus di isi!")
				// 	return
				// }

				var id="";
				if ($scope.item.id != undefined) {
					id = $scope.item.id
				}
				var listnamaDepartemen="";
				if ($scope.item.listnamaDepartemen != undefined) {
					listnamaDepartemen = $scope.item.listnamaDepartemen
				}
				var merkProduk="";
				if ($scope.item.merkProduk != undefined) {
					merkProduk = $scope.item.merkProduk
				}
				var kodeMerk="";
				if ($scope.item.kodeMerk != undefined) {
					kodeMerk = $scope.item.kodeMerk
				}
				var reportDisplay="";
				if ($scope.item.reportDisplay != undefined) {
					reportDisplay = $scope.item.reportDisplay
				}
				// var objectdepartemenfk="";
				// if ($scope.item.objectdepartemenfk != undefined) {
				// 	objectdepartemenfk = $scope.item.objectdepartemenfk
				// }
				var qmerkProduk="";
				if ($scope.item.qmerkProduk != undefined) {
					qmerkProduk = $scope.item.qmerkProduk
				}
				var namaExternal="";
				if ($scope.item.namaExternal != undefined) {
					namaExternal = $scope.item.namaExternal
				}
				var kodeExternal = "";
				if ($scope.item.kodeExternal != undefined) { 
					kodeExternal = $scope.item.kodeExternal
				}
				
				var data = {
					"idmerkproduk": id,
					"departemen": $scope.item.listnamaDepartemen.id,
					"kodeexternal" : kodeExternal,
					"namaexternal": $scope.item.namaExternal,
					"reportdisplay": $scope.item.reportDisplay,
					// "objectdepartemenfk": $scope.item.objectdepartemenfk,
					"kodemerk": $scope.item.kodeMerk,
					"merkproduk": $scope.item.merkProduk,
					"qmerkProduk": $scope.item.qmerkProduk,
					
					
					
				}

				var objSave =
					{
						merkproduk: data
					}
			
					ManageSarprasPhp.postSaveMerkProduk(objSave).then(function (e) {
						//  console.log(JSON.stringify(e.rekanan));
						$scope.item = {};
						var confirm = $mdDialog.confirm()
							.title('Caution')
							.textContent('Apakah Anda Akan Menambah Data Lagi?')
							.ariaLabel('Lucky day')
							.cancel('Ya')
							.ok('Tidak')
						$mdDialog.show(confirm).then(function () {
							$state.go("MerkProduk2");
						})
					});
				// }
			}
			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

			


		}
	]);
});