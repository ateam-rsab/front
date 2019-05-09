define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RevMasterAlatLaundryCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageLaundry', 'FindLaundry', '$state',
		function ($rootScope, $scope, ModelItem, ManageLaundry, FindLaundry, $state) {
			$scope.item = {};
			$scope.KodeSembunyi = true;
			ModelItem.get("Laundry/MasterMesin").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			//Unit Kerja
			ManageLaundry.getOrderList("alat/get-departemen-laundry", true).then(function (dat) {
				$scope.item.unitKerja = dat.data.data.namaDepartemen;
				$scope.item.unitKerjaid = dat.data.data.id;
			});

			//Get Asset Combo
			ManageLaundry.getOrderList("alat/get-asset-laundry", true).then(function (dat) {
				$scope.ListMesin = dat.data.data;
			});

			//Get Nama Mesin combo
			$scope.no = 1;
			$scope.init = function () {
				ManageLaundry.getOrderList("alat/get-mesin-laundry", true).then(function (dat) {
					$scope.sourceDataLaundry = dat.data.data;
					$scope.data = new kendo.data.DataSource({
						data:$scope.sourceDataLaundry,
						pageSize: 10
					})
					for (var i = 0; i < $scope.sourceDataLaundry.length; i++) {
						$scope.sourceDataLaundry[i].no = $scope.no++;
					}
				});
			}
			$scope.init();

			ManageLaundry.getOrderList("alat/get-satuan", true).then(function (dat) {
				$scope.listsatuan = dat.data.data;
			});

			$scope.ChangeRegisterAsset = function () {
				if ($scope.item.Mesin == $scope.item.Mesin) {
					$scope.item.noRegisterAsset = $scope.item.Mesin.noRegisterAset;
					$scope.item.produkId = $scope.item.Mesin.produkId;
					$scope.item.namaProduk = $scope.item.Mesin.namaProduk;
					$scope.item.noRecAsset = $scope.item.Mesin.noRec;
				}
			}



			$scope.tutup = function () {
				$state.go('home');
			}
			/* ga dipake
			FindLaundry.getLaundry("mesin/find-mesin/").then(function (dat) {
				$scope.sourceMasterMesin = dat.data.data;
			}); */

			$scope.mainGridOptions = {
				pageable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startsWith: "Pencarian"
						}
					}
				},
				sortable: true,
			}

			$scope.columndataMasterMesin =
				[
					{
						"field": "no",
						"title": "<h3 align=center>No.</h3>",
						"width": "20px",
						"headerAttributes": { style: "text-align : center" },
						"filterable": false

					},
					{
						"field": "noRegistrasiAset",
						"title": "<h3 align=center>Nomor Registrasi Asset</h3>",
						"width": "100px",
						"filterable": false
					},
					{
						"field": "namaMesin",
						"title": "<h3 align=center>Nama Mesin</h3>",
						"width": "100px",
						"filterable": true

					},
					{
						"field": "kapasitasMesin",
						"title": "<h3 align=center>Kapasitas</h3>",
						"width": "80px",
						"filterable": false,
						"headerAttributes": { style: "text-align : center" }
					},
					{
						"field": "namaSatuanStandar",
						"title": "<h3 align=center>Satuan</h3>",
						"width": "80px",
						"filterable": false
					},
					{
						"field": "namaDepartemen",
						"title": "<h3 align=center>Unit Kerja</h3>",
						"width": "90px",
						"filterable": false
					},
					{
						"field": "statusEnabled",
						"title": "<h3 align=center>Status Enabled</h3>",
						"width": "50px",
						"filterable": false
					}
				];



			$scope.klik = function (Isidata) {
				$scope.disableMesin = true;
				if (Isidata.statusEnabled === true) {
					$scope.vals = true;
				} else {
					$scope.vals = false;
				}
				$scope.item.Kapasitas = Isidata.kapasitasMesin,
					$scope.item.Mesin = { namaProduk: Isidata.namaMesin, produkId: Isidata.produkAsetId }
				$scope.item.namaProduk = Isidata.namaProdukAset,
					$scope.item.unitKerjaid = Isidata.departemenId;
				$scope.item.unitKerja = Isidata.namaDepartemen;
				$scope.item.namaEkternal = Isidata.namaEkternal;
				$scope.item.noRecAsset = Isidata.noRecRegistrasiAset;
				$scope.KlikalatId = Isidata.alatId;
				$scope.item.noRegisterAsset = Isidata.noRegistrasiAset;
				$scope.item.satuan = { id: Isidata.satuanStandarId, namaSatuanStandar: Isidata.namaSatuanStandar }
				$scope.item.kodeEkternal = Isidata.kodeEkternal,
					$scope.item.produkId = Isidata.produkAsetId;
			}

			$scope.baru = function () {
				$scope.disableMesin = false;
				$scope.vals = false;
				$scope.item.Kapasitas = "";
				$scope.item.Mesin = "";
				$scope.item.satuan = "";
				$scope.item.noRegisterAsset = "";
				$scope.KlikalatId = undefined;
			}

			$scope.Save = function () {
				if ($scope.item.dataAktif === undefined) {
					$scope.item.dataAktif = false;
				}
				var data = {
					"alatId": $scope.KlikalatId,
					"noMesin": $scope.KlikalatId,
					"namaMesin": $scope.item.Mesin.namaProduk,
					"noRecRegistrasiAset": $scope.item.noRecAsset,
					"noRegistrasiAset": $scope.item.noRegisterAsset,
					"kapasitasMesin": $scope.item.Kapasitas,
					"produkAsetId": $scope.item.produkId,
					"namaprodukAset": $scope.item.namaProduk,
					"satuanStandarId": $scope.item.satuan.id,
					"namaSatuanStandar": $scope.item.satuan.namaSatuanStandar,
					"departemenId": $scope.item.unitKerjaid,
					"namaDepartemen": $scope.item.unitKerja,
					"kodeEkternal": "",
					"namaEkternal": "",
					"statusEnabled": $scope.item.dataAktif
				}
				console.log(JSON.stringify(data));
				ManageLaundry.saveSarpras(data, "alat/save-mesin-cuci").then(function (e) {
					$scope.init();
				});
			};

			$scope.Batal = function () {
				$scope.item.idProduk = "",
					$scope.item.namaProduk = "",
					$scope.item.kapasitas = "",
					$scope.item.satuan = "",
					$scope.item.kodeEksternal = "",
					$scope.item.namaEksternal = "",
					$scope.item.statusEnabled = ""
			};
		}
	]);
});


//==========================================SOURCE OLD DATA ==========================================//

	// var aktif = false;
	// $scope.checkbox = function () {
	// 	if (aktif)
	// 		aktif = false;
	// 	else
	// 		aktif = true;

	// 	console.log(aktif);
	// }
	// console.log($scope.checkbox);

	// FindSarpras.getSarpras("mesin/find-satuan-standar-kg/").then(function(dat){
	// 	$scope.sourceSatuan= dat.data.data;
	// });

	/*	   $scope.disableData = function(){
	if($scope.idSelected != undefined){
	var data = {
	"id" : $scope.idSelected,
	"mesin": 
	{
	"id": $scope.item.namaProduk.idProduk
	},
	"kapasitas": $scope.item.kapasitas,
	"satuan": 
	{
	"id": $scope.item.satuan.id
	},
	"kodeExternal": $scope.item.kodeEksternal,
	"namaExternal": $scope.item.namaEksternal,
	"statusEnabled": false
	};
	console.log(JSON.stringify(data));
	ManageLaundry.saveSarpras(ModelItem.beforePost(data), "mesin/save-mesin/").then(function(e) {
	FindSarpras.getSarpras("mesin/find-all-mesin/").then(function(dat){
	$scope.sourceMasterMesin= dat.data.data;
	});
	$scope.item = {};
	$scope.KodeSembunyi = true;
	$scope.idSelected = undefined;
	$scope.init();

	});
	}else{
	window.messageContainer.error('Pilih 1 Data Terlebih Dahulu')
	}
	}*/