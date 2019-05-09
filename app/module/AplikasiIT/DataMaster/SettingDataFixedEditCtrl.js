define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SettingDataFixedEditCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$mdDialog','ManageLogistikPhp',
		function ($q, $rootScope, $scope, $state, ManageSarprasPhp, ModelItem, $mdDialog,manageLogistikPhp) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			// $scope.isRouteLoading = true;
			$scope.kembali = function () {
				$state.go('SettingDataFixed2')
			}
			manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
		        $scope.listKelompokPasien = dat.data.kelompokpasien;
		     });
			load()

			function load() {
			
				if ($state.params.idx != "") {
					$scope.item.id = $state.params.idx;
					ManageSarprasPhp.getDataTableTransaksi("settingdatafixed/get-settingdatafixedbyid/" + $scope.item.id, true).then(function (e) {
						var datax = e.data;
						// $scope.isRouteLoading = false;
					
						$scope.item.id = e.data[0].id;
						$scope.item.kodeExternal = e.data[0].kodeexternal;
						$scope.item.namaExternal = e.data[0].namaexternal;
						$scope.item.riportDisplay = e.data[0].reportdisplay;
						$scope.item.keytabelRelasi = e.data[0].fieldkeytabelrelasi;

						$scope.item.reportDisplay = e.data[0].reportdisplay;
						$scope.item.ketFungsi = e.data[0].keteranganfungsi;
						$scope.item.namaField = e.data[0].namafield;
						$scope.item.nilai = e.data[0].nilaifield;
						$scope.item.tabelRelasi = e.data[0].tabelrelasi;
						$scope.item.typeField = e.data[0].typefield;

						// $scope.item.riportDisplay = { id: e.data[0].objectjenisrekananfk, jenisrekanan: "" };
						// $scope.item.pegawai = { id: e.data[0].objectpegawaifk, pegawai: "" };
						// $scope.item.kdExternal = e.data[0].kodeexternal;
						// $scope.item.namaExternal = e.data[0].namaexternal;
						// $scope.item.reportDisplay = e.data[0].reportdisplay;
						// $scope.item.alamatLengkap = e.data[0].alamatlengkap;
						// $scope.item.rtrw = e.data[0].rtrw;
						// $scope.item.desakelurahan = { id: e.data[0].objectdesakelurahanfk, desakelurahan: "" };
						// $scope.item.kecamatan = { id: e.data[0].objectkecamatanfk, kecamatan: "" };
						// $scope.item.propinsi = { id: e.data[0].objectpropinsifk, produsenProduk: "" };
						// $scope.item.kotakabupaten = { id: e.data[0].objectkotakabupatenfk, kotakabupaten: "" };
						// $scope.item.desaKelurahan = e.data[0].namadesakelurahan;
						// $scope.item.kecamatanTx = e.data[0].namakecamatan;
						// $scope.item.kodePos = e.data[0].kodepos;
						// $scope.item.namaKotaKabupaten = e.data[0].namakotakabupaten;
						// $scope.item.contactPerson = e.data[0].contactperson;
						// $scope.item.email = e.data[0].email;
						// $scope.item.faksimile = e.data[0].faksimile;
						// $scope.item.telepon = e.data[0].telepon;
						// $scope.item.website = e.data[0].kekuatan;
						// $scope.item.bankRekeningAtasNama = e.data[0].bankrekeningatasnama;
						// $scope.item.bankRekeningNama = e.data[0].bankrekeningnama;
						// $scope.item.bankRekeningNomor = e.data[0].bankrekeningnomor
						// $scope.item.noPkp = e.data[0].nopkp;
						// $scope.item.npwp = e.data[0].npwp;
						// $scope.item.perjanjianKerjasama = e.data[0].perjanjiankerjasama;
						// $scope.item.idMap = e.data[0].idmap;
						// $scope.item.kelompokPasien = { id: e.data[0].objectkelompokpasienfk, kelompokpasien: "" };

					})
				}
				//$scope.load();
			}


			//scope action grid
			// $scope.disableData = function () {
			// 	ManageSarprasPhp.getDataTableTransaksi("delete-master-table?className=Produk&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
			// 		init();
			// 	});
			// };
			// $scope.enableData = function () {
			// 	ManageSarprasPhp.getDataTableTransaksi("delete-master-table?className=Produk&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
			// 		init();

			// 	});
			// };


			ManageSarprasPhp.getDataTableTransaksi("master/get-data-combo-rekanan", false).then(function (data) {
				$scope.listPegawai = data.data.pegawai;
				$scope.listjenisrekanan = data.data.jenisrekanan;
				$scope.listDesaKelurahan = data.data.desakelurahan;
				$scope.listKecamatan = data.data.kecamatan;
				$scope.listKota = data.data.kotakabupaten;
				$scope.listPropinsi = data.data.propinsi;
			})




			$scope.simpan = function () {
				if ($scope.item.namaField == undefined) {
					toastr.error("Nama Field harus di isi!")
					return
				}
				if ($scope.item.nilai == undefined) {
					toastr.error("Nilai Field harus di isi!")
					return
				}
				if ($scope.item.tabelRelasi == undefined) {
					toastr.error("Tabel Relasi harus di isi!")
					return
				}

				var id="";
				if ($scope.item.id != undefined) {
					id = $scope.item.id
				}
				var kodeExternal="";
				if ($scope.item.kodeExternal != undefined) {
					kodeExternal = $scope.item.kodeExternal
				}
				var namaExternal="";
				if ($scope.item.namaExternal != undefined) {
					namaExternal = $scope.item.namaExternal
				}
				var riportDisplay="";
				if ($scope.item.riportDisplay != undefined) {
					riportDisplay = $scope.item.riportDisplay
				}
				var keytabelRelasi="";
				if ($scope.item.keytabelRelasi != undefined) {
					keytabelRelasi = $scope.item.keytabelRelasi
				}
				var fieldreportdisplaytabelrelasi="";
				if ($scope.item.fieldreportdisplaytabelrelasi != undefined) {
					fieldreportdisplaytabelrelasi = $scope.item.fieldreportdisplaytabelrelasi
				}
				var ketFungsi="";
				if ($scope.item.ketFungsi != undefined) {
					ketFungsi = $scope.item.ketFungsi
				}

				var namaField = "";
				if ($scope.item.namaField != undefined) 
					namaField = $scope.item.namaField

				var tabelRelasi = "";
				if ($scope.item.tabelRelasi != undefined) 
					tabelRelasi = $scope.item.tabelRelasi

				var typeField="";
				if ($scope.item.typeField != undefined) {
					typeField = $scope.item.typeField
				}
				
				var data = {
					"iddatafixed": id,
					"namafield": $scope.item.namaField,
					"nilai": $scope.item.nilai,
					"tabelrelasi":tabelRelasi,
					"kodeexternal": kodeExternal,
					"namaexternal": namaExternal,
					"reportdisplay": riportDisplay,
					"fieldkeytabelrelasi" : keytabelRelasi,
					"fieldreportdisplaytabelrelasi" : fieldreportdisplaytabelrelasi,
					"keteranganfungsi" : ketFungsi,
					"namafield" : namaField,
					"typefield" : typeField,
				}

				var objSave =
					{
						datafixed: data
					}
			
					ManageSarprasPhp.postSaveDataFixed(objSave).then(function (e) {
						//  console.log(JSON.stringify(e.rekanan));
						$scope.item = {};
						var confirm = $mdDialog.confirm()
							.title('Caution')
							.textContent('Apakah Anda Akan Menambah Data Lagi?')
							.ariaLabel('Lucky day')
							.cancel('Ya')
							.ok('Tidak')
						$mdDialog.show(confirm).then(function () {
							$state.go("SettingDataFixed2");
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