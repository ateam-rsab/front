define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('OrderAmbulanceCtrl', ['$rootScope', '$scope', '$q', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state',
		function ($rootScope, $scope, $q, ModelItem, DateHelper, ManageSarpras, $state) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.now = new Date();
			$q.all([
				ModelItem.get("AplikasiRumahTanggadanPerlengkapan/OrderAmbulance"),
				ManageSarpras.getOrderList("order-ambulance/find-asset-ambulance/"),
				ManageSarpras.getOrderList("order-ambulance/find-produk-ambulance/"),
				ManageSarpras.getOrderList("order-ambulance/get-supir-ambulance/"),
				ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId")
			]).then(function(res){
				if(res[0].statResponse){
					$scope.item = res[0];
					$scope.dataVOloaded = true;
				}
				$scope.ListKendaraan = res[1].data.data;
				$scope.ListPelayanan = res[2].data.data;
				if(res[3].statResponse){
					var supir = res[3].data.data.data;
					$scope.listSupir = res[3].data.data;
				}
				if(res[4].statResponse){
					var filteredPegawai =  _.filter(res[4].data, (items) => {
						return items.jenisPegawaiId == 2;
					});
					$scope.listPerawat = new kendo.data.DataSource({
						data: filteredPegawai
					});
				}
				$scope.enableNoOrder = true;
				$scope.arrPerawat = [];
				$scope.GetDaftarOrder();
			});
			$scope.pilihPelayanan = function () {
				$scope.item.biaya = $scope.item.namaPelayanan.hargaSatuan;
				if ($scope.item.namaPelayanan.id == 13451) {
					$scope.tampil = true;
				} else {
					$scope.tampil = false;
				};
			};
			$scope.tambahJarak = function () {
				$scope.item.biaya = $scope.item.namaPelayanan.hargaSatuan + ($scope.item.jarak * 10000);
			};
			$scope.GetDaftarOrder = function(){
				ManageSarpras.getOrderList("daftar-order-ambulance/find-by-no-rec/?noRec=" + $state.params.noOrder).then(function (dat) {
					$scope.item = dat.data.data.data[0];
					for(var key in $scope.item){
						if($scope.item.hasOwnProperty(key)){
							if(key.indexOf('tgl') == 0){
								$scope.item[key] = new Date($scope.item[key])
							} else if(key.indexOf('pJawabKeluarga') == 0){
								$scope.item['namaPJawabKeluarga'] = $scope.item[key];
							}
							$scope.item.namaPelayanan = {
								id: $scope.item.idProduk,
								namaProduk:  $scope.item.namaProduk
							}
							$scope.item.kendaraan = {
								id: $scope.item.produkAsetId,
								namaProduk:  $scope.item.namaAset
							}
						}
					}
					console.log(JSON.stringify($scope.item));
				});
			};

			$scope.Save = function () {
				var arrPgAmbulance = [];
				var mapPegawaiAmbulance = ModelItem.beforePost($scope.arrPerawat);
				for(var i = 0; i < mapPegawaiAmbulance.length; i++){
					arrPgAmbulance.push({
						perawat: {
							id: mapPegawaiAmbulance[i].id
						}
					})
				}
				// console.log(JSON.stringify(arrPgAmbulance));
				var data = {
					"strukOrder": {
						"namaPJawabKeluarga" : $scope.item.namaPJawabKeluarga,
						"alamatTempatTujuan" : $scope.item.alamatTempatTujuan,
						"produk" : $scope.item.namaPelayanan,
						"produkAset" : $scope.item.kendaraan,
						"keteranganLainnya" : $scope.item.keteranganLainnya,
						"namaTempatTujuan" : $scope.item.namaTempatTujuan,
						"petugas": {
							"id" : $scope.item.supir.idPegawai
						},
						"totalHargaSatuan":$scope.item.biaya,
						"totalHarusDibayar" : $scope.item.biaya,
						"mapPegawaiAmbulance": arrPgAmbulance
					},
					"orderPelayanan": {
						"produk": {
							"id": $scope.item.namaPelayanan.id
						},
						"produkAset": {
							"id": $scope.item.kendaraan.idProduk
						}
					}
				}
				ManageSarpras.saveDataSarPras(data, "order-ambulance/save-order-ambulance/?noRec=" + $state.params.noOrder).then(function (e) {
					$scope.Back();
				});
			};

			$scope.Back = function () {
				$state.go("DaftarOrderAmbulance");
			};

			$scope.$watch('item.namaPelayanan', function(newVal, oldVal){
				if(!newVal) return;
				if(newVal.id !== oldVal.id){
					// get harga produk layanan yang di pilih
					alert("Please wait, we are collects product's price on our database");
					$scope.item.biaya = 500000;
				}
			})
		}
	]);
});

/*==========================================SOURCE DATA OLD===================================*/

// ModelItem.getDataDummyGeneric("ModelPelayanan", false).then(function(data) {
// 	$scope.ListPelayanan= data;
// })
// ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
// $scope.ListPegawai = data;
// })

// ManageSarpras.getOrderList("daftar-pesan-ambulance/find-by-no-order/?noOrder=" + $state.params.noOrder).then(function(data){
// 	    $scope.orderAmbulance = data.data.data.data[0];
// 	    $scope.strukOrder = $scope.orderAmbulance.strukOrder;
// 	    $scope.strukOrder.tglOrder = new Date($scope.strukOrder.tglOrder);
// 		// debugger;
// 	});


// ManageSarpras.getOrderList("order-ambulance/find-produk-ambulance/").then(function(data){
// 	$scope.ListProduk = data.data.data;
// })
// ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + $scope.now.getMonth() +"/" + $scope.now.getFullYear()).then(function(data){
// 	var supir = data.data.data.data;
// 	// $scope.listPerawat = [];
// 	debugger;
// 	$scope.listSupir = [];
// 	// data = data.data;
// 	supir.forEach(function(dat){
// 		$scope.listSupir.push(dat.pegawai);
// 	})
// 	// for (var i = 0; i < data.length; i++) {
// 	// 	if(data[i].jenisPegawaiId == 2) $scope.listPerawat.push(data[i]);
// 	// 	else if(data[i].jenisPegawaiId == 10) $scope.listSupir.push(data[i]);
// 	// }
// 	// debugger;
// })
// $scope.listPerawat = [];
// data = data.data;
// supir.forEach(function (dat) {
// 	$scope.listSupir.push(dat.pegawai);
// })
// var data = {
// 		"asset":{
// 	       "noRec" : $scope.item.kendaraan.noRec
// 	    },
// 	    "orderPelayanan":{
// 	       "noRec" : $scope.orderAmbulance.noRec
// 	    },
// 	    // "produk": {
// 	    // 	"id": $scope.orderAmbulance.produk.id
// 	    // },
// 	    "supir": $scope.item.supir,
// 	    "mapPegawaiAmbulance": ModelItem.beforePost($scope.arrPerawat),
// 	    "namaAsset": $scope.item.barang
// }