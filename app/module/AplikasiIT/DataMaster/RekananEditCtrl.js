define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RekananEditCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$mdDialog','ManageLogistikPhp',
		function ($q, $rootScope, $scope, $state, ManageSarprasPhp, ModelItem, $mdDialog,manageLogistikPhp) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			// $scope.isRouteLoading = true;
			$scope.kembali = function () {
				$state.go('Rekanan2')
			}
			manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
		        $scope.listKelompokPasien = dat.data.kelompokpasien;
		     });
			load()

			$scope.isKonfirmasi = true;
			$scope.listKonfirmasi= {
				"data":[
					{
						"id":"true",
						"name":"Terbatas"
					},
					{
						"id":"false",
						"name":"Tak Terbatas"
					}
				]
			}
			$scope.cekKonfirmasi=function(){
				if($scope.item.cekTglAkhir.id=="true"){
					$scope.isKonfirmasi=false;
				}else{
					$scope.isKonfirmasi=true;
				}
			}
			function load() {
			
				if ($state.params.idx != "") {
					$scope.item.id = $state.params.idx;
					ManageSarprasPhp.getDataTableTransaksi("rekanan/get-rekananbyid/" + $scope.item.id, true).then(function (e) {
						var datax = e.data;
						// $scope.isRouteLoading = false;
					
						$scope.item.id = e.data[0].id;
						$scope.item.kdprofile = e.data[0].kdprofile;
						$scope.item.statusenabled = e.data[0].statusenabled;
						$scope.item.norec = e.data[0].norec;
						$scope.item.kdRekanan = e.data[0].kdrekanan;
						$scope.item.namaRekanan = e.data[0].namarekanan;
						$scope.item.jenisrekanan = { id: e.data[0].objectjenisrekananfk, jenisrekanan: e.data[0].jenisrekanan
						};
						$scope.item.pegawai = { id: e.data[0].objectpegawaifk, pegawai: "" };
						$scope.item.kdExternal = e.data[0].kodeexternal;
						$scope.item.namaExternal = e.data[0].namaexternal;
						$scope.item.reportDisplay = e.data[0].reportdisplay;
						$scope.item.alamatLengkap = e.data[0].alamatlengkap;
						$scope.item.rtrw = e.data[0].rtrw;
						$scope.item.desakelurahan = { id: e.data[0].objectdesakelurahanfk, desakelurahan: "" };
						$scope.item.kecamatan = { id: e.data[0].objectkecamatanfk, kecamatan: "" };
						$scope.item.propinsi = { id: e.data[0].objectpropinsifk, produsenProduk: "" };
						$scope.item.kotakabupaten = { id: e.data[0].objectkotakabupatenfk, kotakabupaten: "" };
						$scope.item.desaKelurahan = e.data[0].namadesakelurahan;
						$scope.item.kecamatanTx = e.data[0].namakecamatan;
						$scope.item.kodePos = e.data[0].kodepos;
						$scope.item.namaKotaKabupaten = e.data[0].namakotakabupaten;
						$scope.item.contactPerson = e.data[0].contactperson;
						$scope.item.email = e.data[0].email;
						$scope.item.faksimile = e.data[0].faksimile;
						$scope.item.telepon = e.data[0].telepon;
						$scope.item.website = e.data[0].kekuatan;
						$scope.item.bankRekeningAtasNama = e.data[0].bankrekeningatasnama;
						$scope.item.bankRekeningNama = e.data[0].bankrekeningnama;
						$scope.item.bankRekeningNomor = e.data[0].bankrekeningnomor
						$scope.item.noPkp = e.data[0].nopkp;
						$scope.item.npwp = e.data[0].npwp;
						$scope.item.perjanjianKerjasama = e.data[0].perjanjiankerjasama;
						$scope.item.idMap = e.data[0].idmap;
						$scope.item.kelompokPasien = { id: e.data[0].objectkelompokpasienfk, kelompokpasien: "" };
						$scope.item.tglAwal = e.data[0].tglawal;
						if(e.data[0].tglakhir=="Tak Terbatas"){
							$scope.isKonfirmasi = true;
							$scope.item.cekTglAkhir = {id:"false",name:"Tak Terbatas"}
						}else{
							$scope.isKonfirmasi = false;
							$scope.item.cekTglAkhir = {id:"true",name:"Terbatas"}
							$scope.item.tglAkhir = e.data[0].tglakhir;
						}

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
				if ($scope.item.namaRekanan == undefined) {
					alert("Nama Rekanan harus di isi!")
					return
				}

				// if ($scope.item.alamatLengkap == undefined) {
				// 	alert("Alamat harus di isi!")
				// 	return
				// }

				if ($scope.item.jenisrekanan == undefined) {
					alert("Jenis Rekanan harus di isi!")
					return
				}
				if ($scope.item.tglAwal == undefined) {
					alert("Tanggal awal harus di isi!")
					return
				}
				let tglAkhir = '';
				if($scope.item.cekTglAkhir.id=="true"){
					tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm');
				}else{
					tglAkhir = $scope.item.cekTglAkhir.name;
				}

				var alamatlengkap = "";
				if ($scope.item.alamatLengkap != undefined) {
					alamatlengkap = $scope.item.alamatLengkap
				} else alamatlengkap = "";

				var idRekanan = "";
				if ($scope.item.id != undefined) {
					idRekanan=$scope.item.id
				}

				var namaKotaKabupaten = "";
				if ($scope.item.id != undefined) {
					namaKotaKabupaten = $scope.item.namaKotaKabupaten
				}else namaKotaKabupaten = null;
					
				var desakelurahanid = "";
				if ($scope.item.desakelurahan != undefined) {
					desakelurahanid =$scope.item.desakelurahan.id
				} else desakelurahanid = null;
				
				var kecamatanid = "";
				if ($scope.item.kecamatan != undefined) {
					kecamatanid = $scope.item.kecamatan.id
				} else kecamatanid = null;
				
				var kotakabupatenid = "";
				if ($scope.item.kotakabupaten != undefined) {
					kotakabupatenid = $scope.item.kotakabupaten.id
				} else kotakabupatenid = null;
				
				var pegawaiid = "";
				if ($scope.item.pegawai != undefined) {
					pegawaiid = $scope.item.pegawai.id
				} else pegawaiid = null;
				
				var propinsiid = "";
				if ($scope.item.propinsi != undefined) {
					propinsiid =$scope.item.propinsi.id
				} else propinsiid = null;
				
				var bankRekeningNama = "";
				if ($scope.item.bankRekeningNama != undefined) {
					bankRekeningNama = $scope.item.bankRekeningNama
				} else bankRekeningNama = null;
				
				var bankRekeningNomor = "";
				if ($scope.item.bankRekeningNomor != undefined) {
					bankRekeningNomor = $scope.item.bankRekeningNomor
				} else bankRekeningNomor = null;
				
				var contactPerson = "";
				if ($scope.item.contactPerson != undefined) {
					contactPerson = $scope.item.contactPerson
				} else contactPerson = null;
				
				var desaKelurahan = "";
				if ($scope.item.desaKelurahan != undefined) {
					desaKelurahan = $scope.item.desaKelurahan
				} else desaKelurahan = null;
				
				var email = "";
				if ($scope.item.email != undefined) {
					email = $scope.item.email
				} else email = null;
				
				var faksimile = "";
				if ($scope.item.faksimile != undefined) {
					faksimile = $scope.item.faksimile
				} else faksimile = null;
				
				var kodePos = "";
				if ($scope.item.kodePos != undefined) {
					kodePos = $scope.item.kodePos
				} else kodePos = null;
				
				var kotaKabupaten = "";
				if ($scope.item.kotaKabupaten != undefined) {
					kotaKabupaten = $scope.item.kotaKabupaten
				} else kotaKabupaten = null;
				
				var noPkp = "";
				if ($scope.item.noPkp != undefined) {
					noPkp = $scope.item.noPkp
				} else noPkp = null;
				
				var npwp = "";
				if ($scope.item.npwp != undefined) {
					npwp = $scope.item.npwp
				} else npwp = null;
				
				var rtrw = "";
				if ($scope.item.rtrw != undefined) {
					rtrw = $scope.item.rtrw
				} else rtrw = null;
				
				var telepon = "";
				if ($scope.item.telepon != undefined) {
					telepon = $scope.item.telepon
				} else telepon = null;
				
				var website = "";
				if ($scope.item.website != undefined) {
					website = $scope.item.website
				} else website = null;
				
				var namaDesaKelurahan = "";
				if ($scope.item.namaDesaKelurahan != undefined) {
					namaDesaKelurahan = $scope.item.namaDesaKelurahan
				} else namaDesaKelurahan = null;
				
				var namaKecamatan = "";
				if ($scope.item.namaKecamatan != undefined) {
					namaKecamatan = $scope.item.namaKecamatan
				} else namaKecamatan = null;
				
				var namaKotaKabupaten = "";
				if ($scope.item.namaKotaKabupaten != undefined) {
					namaKotaKabupaten = $scope.item.namaKotaKabupaten
				} else namaKotaKabupaten = null;
				
				var rekananmoupksfk = "";
				if ($scope.item.rekananmoupksfk != undefined) {
					rekananmoupksfk = $scope.item.rekananmoupksfk
				} else rekananmoupksfk = null;
				
				var perjanjianKerjasama = "";
				if ($scope.item.perjanjianKerjasama != undefined) {
					perjanjianKerjasama = $scope.item.perjanjianKerjasama
				} else perjanjianKerjasama = null;
				var kelompokpasienId = "";
				if ($scope.item.kelompokPasien != undefined) {
					kelompokpasienId = $scope.item.kelompokPasien.id
				} else kelompokpasienId = null;
				var idmap = "";
				if ($scope.item.idMap != undefined) {
					idmap=$scope.item.idMap
				}
				var rekanan = {
					//  kdruangan: $scope.item.kdRuangan,
					idrekanan: idRekanan,
					namarekanan: $scope.item.namaRekanan,
					objectjenisrekananfk: $scope.item.jenisrekanan.id,
					alamatlengkap: alamatlengkap,
					namakotakabupaten: namaKotaKabupaten,
					//objectaccountfk: $scope.item.account.id,
					objectdesakelurahanfk: desakelurahanid,
					objectkecamatanfk: kecamatanid,
					objectkotakabupatenfk: kotakabupatenid,
					objectpegawaifk: pegawaiid,
					objectpropinsifk: propinsiid,
					// objectrekananheadfk: $scope.item.rekananhead.id,
					bankrekeningnama: bankRekeningNama,
					bankrekeningnomor: bankRekeningNomor,
					contactperson: contactPerson,
					desakelurahan: desaKelurahan,
					email: email,
					faksimile: faksimile,
					kodepos:kodePos,
					kotakabupaten:kotaKabupaten,
					nopkp: noPkp,
					npwp: npwp,
					rtrw:rtrw,
					telepon:telepon,
					website: website,
					namadesakelurahan: namaDesaKelurahan,
					namakecamatan: namaKecamatan,
					namakotakabupaten: namaKotaKabupaten,
					rekananmoupksfk: rekananmoupksfk,
					perjanjiankerjasama: perjanjianKerjasama,
					idMap: idmap,
					objectkelompokpasienfk: kelompokpasienId,
					tglawal:moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm'),
    				tglakhir:tglAkhir,
					kdprofile:"0"


						// //  kdruangan: $scope.item.kdRuangan,
						// idrekanan: idRekanan,
						// namarekanan: $scope.item.namaRekanan,
						// objectjenisrekananfk: $scope.item.jenisrekanan.id,
						// alamatlengkap: $scope.item.alamatLengkap,
						// namakotakabupaten: namaKotaKabupaten,
						// //objectaccountfk: $scope.item.account.id,
						// objectdesakelurahanfk: $scope.item.desakelurahan.id,
						// objectkecamatanfk: $scope.item.kecamatan.id,
						// objectkotakabupatenfk: $scope.item.kotakabupaten.id,
						// objectpegawaifk: $scope.item.pegawai.id,
						// objectpropinsifk: $scope.item.propinsi.id,
						// objectrekananheadfk: $scope.item.rekananhead.id,
						// bankrekeningnama: $scope.item.bankRekeningNama,
						// bankrekeningnomor: $scope.item.bankRekeningNomor,
						// contactperson: $scope.item.contactPerson,
						// desakelurahan: $scope.item.desaKelurahan,
						// email: $scope.item.email,
						// faksimile: $scope.item.faksimile,
						// kodepos: $scope.item.kodePos,
						// kotakabupaten: $scope.item.kotaKabupaten,
						// nopkp: $scope.item.noPkp,
						// npwp: $scope.item.npwp,
						// rtrw: $scope.item.rtrw,
						// telepon: $scope.item.telepon,
						// website: $scope.item.website,
						// namadesakelurahan: $scope.item.namaDesaKelurahan,
						// namakecamatan: $scope.item.namaKecamatan,
						// namakotakabupaten: $scope.item.namaKotaKabupaten,
						// rekananmoupksfk: $scope.item.rekananmoupksfk,
						// perjanjiankerjasama: $scope.item.perjanjianKerjasama,
				}

				var objSave =
					{
						rekanan: rekanan

					}
				console.log(objSave)
				ManageSarprasPhp.postDataRekanan(objSave).then(function (e) {

					window.history.back();
				})
				if ($scope.item.id != undefined) {
					ManageSarprasPhp.saveDataRekanan(objSave, "rekanan/update-rekanan/" + $scope.item.id).then(function (e) {
						//  console.log(JSON.stringify(e.data.rekanan));
						$scope.item = {};
						$state.go("Rekanan2")
					});
				} else if ($scope.item.id == undefined) {
					ManageSarprasPhp.saveDataRekanan(objSave, "rekanan/save-rekanan2").then(function (e) {
						//  console.log(JSON.stringify(e.rekanan));
						$scope.item = {};
						var confirm = $mdDialog.confirm()
							.title('Caution')
							.textContent('Apakah Anda Akan Menambah Data Lagi?')
							.ariaLabel('Lucky day')
							.cancel('Ya')
							.ok('Tidak')
						$mdDialog.show(confirm).then(function () {
							$state.go("Rekanan2");
						})
					});
				}
			}
			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}




		}
	]);
});