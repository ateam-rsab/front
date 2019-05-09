define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PermintaanPerbaikandariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'IPSRSService', '$state', '$location', '$mdDialog', 'DateHelper',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, IPSRSService, $state, $location, $mdDialog, DateHelper) {
			ModelItem.get("IP3RS/PermintaanPerbaikandariRuangan").then(function (data) {
				$scope.item = data;
				$scope.item.tanggalPesan = new Date();
				$scope.dataVOloaded = true;
				$scope.Nongedung = true;
				$scope.noOrderr = function () {
					IPSRSService.getItem("psrsPermintaanPerbaikan/get-no-order-perbaikan", true).then(function (dat) {
						$scope.item.noOrder = dat.data.noOrderPerbaikan;
					});
				}
				$scope.noOrderr();
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-user-login", true).then(function (dat) {
					$scope.item.userPelapor = dat.data.namaPegawai;
				});
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
					$scope.item.ruangan = dat.data.namaRuangan;
					$scope.item.idRuangan = dat.data.id;
				});
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-tujuan", true).then(function (dat) {
					$scope.item.ruanganTujuan = dat.data.namaRuangan;
					$scope.item.idRuanganTujuan = dat.data.id;
				});

				$scope.KategoriPerbaikan = function () {
					debugger
					var idJenis = $scope.item.KategoriPerbaikan.id;
					if (idJenis == 79) {
						// Khusus Gedung
						$scope.Jenis = idJenis;
						$scope.gedung = false;
						$scope.Nongedung = true;
						ManageIPSRS.getItemIPSRS("psrsPermintaanPerbaikan/get-asset-gedung-by-jenis-asset/?idJenis=" + idJenis, true).then(function (dataBarang) {
							debugger
							$scope.listNamaBarang = dataBarang.data.data
							$scope.item.KategoriPerbaikan.id;
							$scope.item.KategoriPerbaikan.jenisProduk;
						})
					} else {
						//  Khusus Non Gedung
						debugger
						$scope.Jenis = undefined;
						$scope.gedung = true;
						$scope.Nongedung = false;
						ManageIPSRS.getItemIPSRS("psrsPermintaanPerbaikan/get-asset-non-gedung-by-jenis-asset/?id=" + $scope.item.idRuanganTujuan + "&idJenis=" + idJenis, true).then(function (dataBarang) {
							$scope.listNamaBarang = dataBarang.data.data
						})
					}
				}

				$scope.getDung = function () {
					if ($scope.Jenis == 79) {
						$scope.NorecGedung = $scope.item.namaBarang.noRec;
					}
				}

				ManageIPSRS.getItemIPSRS("ipsrs-data-alat/get-jenis-produk", true).then(function (dat) {
					$scope.listKategoriPerbaikan = dat.data.data.listData;
				});

				$scope.showConfirm = function (ev) {
					// Appending dialog to document.body to cover sidenav in docs app
					var confirm = $mdDialog.confirm()
						.title('Permintaan Perbaikan')
						.textContent('Ada Perminaan \n Perbaikan' + 'Data')
						.ariaLabel('Lucky day')
						.ok('Oke')

					$mdDialog.show(confirm).then(function () {
						$state.go("RespondPerbaikan");
					});
				};
				$scope.keteranganAsset = [
					{ "nama": "Asset" },
					{ "nama": "Non Asset" }]


				$scope.mainGridOptions = {
					pageable: true,
					columns: [
						{ field: "noRegisterAset", title: "Nomor Asset" },
						{ field: "namaProduk", title: "Nama Barang" },
						{ field: "merkProduk", title: "Merk Barang" },
						{ field: "noSeri", title: "No Seri" },
						{ field: "typeProduk", title: "Type" }],
					editable: false
				};

				$scope.klik = function (current) {
					$scope.current = current;
					$scope.ModeClick = true;
					$scope.item.nomorAsset = current.noRegisterAset;
					$scope.item.barang = current.namaProduk;
					$scope.item.barangMerk = current.merkProduk;
					$scope.item.noSeri = current.noSeri;
					$scope.item.tipeBarang = current.typeProduk;
					$scope.item.noRec = current.noRec;
					$scope.item.idProduk = current.idProduk;
				};

				$scope.autoComplite = function () {
					$scope.item.namaBarang = $scope.item.noSeri.namaProduk;
					$scope.item.kodeBarang = $scope.item.noSeri.kdProduk;
					$scope.item.merk = $scope.item.noSeri.merkProduk;
					$scope.item.type = $scope.item.noSeri.typeProduk;
				};

				$scope.simpan = function () {
					var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tanggalPesan);
					if ($scope.Jenis != 79) {
						var data = {
							"tglOrder": tanggal,
							"ruanganAsal": {
								"id": $scope.item.idRuangan
							},
							"ruanganTujuan": {
								"id": $scope.item.idRuanganTujuan
							},
							"registrasiAset": {
								// "noRec": $scope.item.noRec
								"noRec": "ff8081815bad81e8015bb26f08840070"
							},
							"keteranganOrder": $scope.item.kerusakan
						}
					} else {
						var data = {
							"tglOrder": tanggal,
							"ruanganAsal": {
								"id": $scope.item.idRuangan
							},
							"ruanganTujuan": {
								"id": $scope.item.idRuanganTujuan
							},
							"registrasiAset": {
								"noRec": $scope.NorecGedung
							},
							"keteranganOrder": $scope.item.kerusakan
						}
					}
					ManageIPSRS.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-permintaan-perbaikan/").then(function (e) {
						$scope.item.noSeri = "";
						$scope.item.barang = "";
						$scope.item.barangMerk = "";
						$scope.item.nomorAsset = "";
						$scope.item.tipeBarang = "";
						$scope.item.noRec = "";
						$scope.item.idProduk = "";
						$scope.item.kerusakan = "";
						$scope.noOrderr();
					});
				};

				$scope.batal = function () {
					// body...
					$scope.item.ruangan = "";
					$scope.item.noSeri = "";
					$scope.item.namaBarang = "";
					$scope.item.kodeBarang = "";
					$scope.item.merk = "";
					$scope.item.type = "";
					$scope.item.kerusakan = "";
					$scope.item.user = "";
				}

			}, function errorCallBack(err) { });
		}
	]);
});



// @ Source Code Old / Lama======================================================
	//toastr.success("SUKSES");
					// var listRawRequired = [
					// "item.ruangan|k-ng-model|Ruangan",
					// "item.noSeri|ng-model|Nomor Seri",
					// "item.kerusakan|ng-model|Kerusakan"
					// // "userPelapor|ng-model|User"
					// ];

					// var isValid = ModelItem.setValidation($scope, listRawRequired);

// Fungsi Data  Save =======================================================
					// var listRawRequired = [
					// "item.ruangan|k-ng-model|Ruangan",
					// "item.noSeri|ng-model|Nomor Seri",
					// "item.kerusakan|ng-model|Kerusakan"
					// // "userPelapor|ng-model|User"
					// ];

					//var isValid = ModelItem.setValidation($scope, listRawRequired);

//get asset ====================================================================

	// $scope.getAsset = function () {
				// 	var idProduk = $scope.item.namaBarang.idProduk;
				// 	ManageIPSRS.getItemIPSRS("psrsPermintaanPerbaikan/get-aset-by-produk?produkId="+idProduk, true).then(function(dat){
				// 		$scope.dataMaster = dat.data.aset;
				// 		$scope.dataSource = new kendo.data.DataSource({
				// 			pageSize: 10,
				// 			data: $scope.dataMaster
				// 		});
				// 	});
				// }

			 //    $scope.ambilsemuadata = [{id : 1, kode : "A-001", namakode: "Mandiri"},
				// 					     {id : 2, kode : "A-002", namakode: "BNI"},
				// 					     {id : 3, kode : "A-003", namakode: "BCA"}]

				// var temps = [];
			 //      for(var i=0; i<$scope.ambilsemuadata.length; i++){
			 //      	debugger
				// 	var idx = $scope.ambilsemuadata[i].kode;
				// 	var idz = $scope.ambilsemuadata[i].namakode;
				// 	var gabung = {id: $scope.ambilsemuadata[i].id,
				// 				 namakode : idx+" - "+idz};
				// 	temps.push(gabung);
			 //     }
			 //     $scope.datagabung = temps;
			     // $scope.singleClick = function() {
				 //      alert('Single Click');
				 //    }
				 //    $scope.doubleClick = function() {
				 //      alert('Double Click');
				 //    }

//=========================================================================

	// if(isValid.status){
					// 	ManageIPSRS.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-permintaan-perbaikan/").then(function(e) {
					// 		$scope.item.noSeri  = "";
					// 		$scope.item.barang = "";
					// 		$scope.item.barangMerk = "";
					// 		$scope.item.nomorAsset = "";
					// 		$scope.item.tipeBarang = "";
					// 		$scope.item.noRec = "";
					// 		$scope.item.idProduk = "";
					// 		$scope.item.kerusakan = "";
					// 	});
					//   }else{
					// 	ModelItem.showMessages(isValid.messages);
					// 	if($scope.ModeClick == undefined){
					// 	window.messageContainer.error("Pilih 1 Data Barang terlebi dahulu !")
					// 	}
					//   }

//===========================================================================

				// $scope.listNamaBarang = [
				// 		{id : 1, namaProduk : "Atap"},
				// 		{id : 2, namaProduk : "Talang"},
				// 		{id : 3, namaProduk : "Plafon"},
				// 		{id : 4, namaProduk : "Dinding"},
				// 		{id : 5, namaProduk : "Pintu"},
				// 		{id : 6, namaProduk : "Jendela"},
				// 		{id : 7, namaProduk : "Lantai"}
				// ]

				// ManageIPSRS.getItemIPSRS("psrsPermintaanPerbaikan/get-aset-by-ruangan", true).then(function(dat){
				// $scope.listNamaBarang = dat.data.produk;
				// });
	//===========================================================================

					// $scope.listKategoriPerbaikan = [
	   //           {
	   //           "id":1, "name":"Alat Medik "
	   //           },
	   //           {
	   //            "id":2, "name":"Non Medik"
	   //           },
	   //           {
	   //            "id":3, "name":"Bangunan"
	   //           },
	   //           {
	   //            "id":4, "name":"Air"
	   //           },
	   //           {
	   //            "id":5, "name":"Listrik"
	   //           }
				//  ]


