define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RuanganEditCtrl', ['$q', '$rootScope', '$scope', '$state', 'ManageSarprasPhp', 'ModelItem', '$mdDialog', 'CacheHelper',
		function ($q, $rootScope, $scope, $state, ManageSarprasPhp, ModelItem, $mdDialog, cacheHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item.tglakhir = new Date();


			$scope.kembali = function () {
				$state.go('Ruangan2')
			}
			$scope.item.tanggal = $scope.now;

			var tglAwal = moment($scope.item.tanggal).format('YYYY-MM-DD');

			load()

			debugger
			function load() {
				debugger
				if ($state.params.idx != "") {
					$scope.item.id = $state.params.idx;
					ManageSarprasPhp.getDataTableTransaksi("ruangan/get-ruanganbyid/" + $scope.item.id, true).then(function (e) {
						var datax = e.data;
						// $scope.isRouteLoading = false;
						$scope.item.id = e.data[0].id;
						$scope.item.kdprofile = e.data[0].kdprofile;
						$scope.item.statusenabled = e.data[0].statusenabled;
						$scope.item.norec = e.data[0].norec;
						$scope.item.kdRuangan = e.data[0].kdruangan;
						$scope.item.namaRuangan = e.data[0].namaruangan;
						$scope.item.departemen = { id: e.data[0].objectdepartemenfk, departemen: "" };
						$scope.item.modulaplikasi = { id: e.data[0].objectmodulaplikasifk, modulaplikasi: "" };

						$scope.item.pegawai = { id: e.data[0].objectpegawaikepalafk, namalengkap: "" };
						$scope.item.kdExternal = e.data[0].kodeexternal;
						$scope.item.namaExternal = e.data[0].namaexternal;
						$scope.item.reportDisplay = e.data[0].reportdisplay;
						$scope.item.lokasiRuangan = e.data[0].lokasiruangan;
						$scope.item.email = e.data[0].email;
						$scope.item.faksimile = e.data[0].faksimile;
						$scope.item.fixedPhone = e.data[0].fixedphone;
						$scope.item.jamBuka = e.data[0].jambuka;
						$scope.item.jamTutup = e.data[0].jamtutup;
						$scope.item.tanggal = e.data[0].tanggal;
						$scope.item.mobilePhone = e.data[0].mobilephone;
						$scope.item.website = e.data[0].website;
						$scope.item.noCounter = e.data[0].nocounter;
						$scope.item.noRuangan = e.data[0].noruangan;
						$scope.item.prefixNoAntrian = e.data[0].prefixnoantrian;


					})
				}
				//$scope.load();
			}


			//scope action grid
			$scope.disableData = function () {
				ManageSarprasPhp.getDataTableTransaksi("delete-master-table?className=Produk&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					init();
				});
			};
			$scope.enableData = function () {
				ManageSarprasPhp.getDataTableTransaksi("delete-master-table?className=Produk&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					init();

				});
			};


			ManageSarprasPhp.getDataTableTransaksi("ruangan/get-data-combo", false).then(function (data) {
				$scope.listPegawai = data.data.pegawai;
				$scope.listModulAplikasi = data.data.modulaplikasi;
				$scope.listDepartemen = data.data.departemen;
			})
			$scope.listverifikasiAnggaran = [
				{ "id": 1, "namaExternal": "f", "namaAlias": "True" },
				{ "id": 2, "namaExternal": "t", "namaAlias": "False" }
			];


			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}
		
			$scope.simpan = function () {
				if ($scope.item.namaRuangan == undefined) {
					alert("Nama Ruangan harus di isi!")
					return
				}
				var idRuangan = "";
				if ($scope.item.id != undefined) {
					idRuangan=$scope.item.id
				}
				var objectdepartemenfk = "";
				if ($scope.item.departemen != undefined) {
					objectdepartemenfk = $scope.item.departemen.id
				}
				else objectdepartemenfk = null;

				var objectmodulaplikasifk = "";
				if ($scope.item.modulaplikasi != undefined) {
					objectmodulaplikasifk = $scope.item.modulaplikasi.id
				} else objectmodulaplikasifk = null;
				
				var objectpegawaikepalafk = "";
				if ($scope.item.pegawai != undefined) {
					objectpegawaikepalafk = $scope.item.pegawai.id
				} else objectpegawaikepalafk = 0;
				
				var kdexternal = "";
				if ($scope.item.kdExternal != undefined) {
					kdexternal = $scope.item.kdExternal
				} else kdexternal = null;
			
				// var namaexternal = "";
				// if ($scope.item.namaExternal != undefined) {
				// 	namaexternal = $scope.item.namaExternal
				// } else namaexternal = null;
			
				// var reportdisplay = "";
				// if ($scope.item.reportDisplay != undefined) {
				// 	reportdisplay = $scope.item.reportDisplay
				// } else reportdisplay = null;

				var lokasiruangan = "";
				if ($scope.item.lokasiRuangan != undefined) {
					lokasiruangan = $scope.item.lokasiRuangan
				} else lokasiruangan = null;

				var email = "";
				if ($scope.item.email != undefined) {
					email = $scope.item.email
				} else email = null;

				var faksimile = "";
				if ($scope.item.faksimile != undefined) {
					faksimile = $scope.item.faksimile
				} else faksimile = null;

				var fixedphone = "";
				if ($scope.item.fixedPhone != undefined) {
					fixedphone = $scope.item.fixedPhone
				} else fixedphone = null;

				var jambuka = "";
				if ($scope.item.jamBuka != undefined) {
					jambuka = $scope.item.jamBuka
				} else jambuka = null;

				var jamtutup = "";
				if ($scope.item.jamTutup != undefined) {
					jamtutup = $scope.item.jamTutup
				} else jamtutup = null;

				var tanggal = "";
				if ($scope.item.tanggal != undefined) {
					tanggal = $scope.item.tanggal
				} else tanggal = null;

				var mobilephone = "";
				if ($scope.item.mobilePhone != undefined) {
					mobilephone = $scope.item.mobilePhone
				} else mobilephone = null;

				var website = "";
				if ($scope.item.website != undefined) {
					website = $scope.item.website
				} else website = null;

				var nocounter = "";
				if ($scope.item.noCounter != undefined) {
					nocounter = $scope.item.noCounter
				} else nocounter = 0;

				var noruangan = "";
				if ($scope.item.noRuangan != undefined) {
					noruangan = $scope.item.noRuangan
				} else noruangan = null;

				var prefixnoantrian = "";
				if ($scope.item.prefixNoAntrian != undefined) {
					prefixnoantrian = $scope.item.prefixNoAntrian
				} else prefixnoantrian = null;

				var ruangan = {
					idruangan:idRuangan,
					// kdruangan: $scope.item.kdRuangan,
					namaruangan: $scope.item.namaRuangan ,
					objectdepartemenfk: objectdepartemenfk,
					objectmodulaplikasifk: objectmodulaplikasifk,
					objectpegawaikepalafk: objectpegawaikepalafk,
					kdexternal: kdexternal,
					// namaexternal: namaexternal,
					// reportdisplay: reportdisplay,
					lokasiruangan: lokasiruangan,
					email: email,
					faksimile: faksimile,
					fixedphone: fixedphone,
					jambuka: jambuka,
					jamtutup: jamtutup,
					tanggal: tanggal,
					mobilephone: mobilephone,
					website: website,
					nocounter: nocounter,
					noruangan: noruangan,
					prefixnoantrian: prefixnoantrian,

				}
				var objSave =
					{
						ruangan: ruangan

					}
				
					ManageSarprasPhp.saveDataRekanan(objSave, "ruangan/save-ruangan").then(function (e) {

						$scope.item = {};
						load();
						
					});
				

			}


		}
	]);
});
