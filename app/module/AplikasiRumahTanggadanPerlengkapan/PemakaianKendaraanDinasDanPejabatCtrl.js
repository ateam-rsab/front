define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaianKendaraanDinasDanPejabatCtrl', ['$rootScope', '$scope', '$q', 'ModelItem', '$state', 'ManageSarpras',
		function ($rootScope, $scope, $q, ModelItem, $state, ManageSarpras) {
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.arrPetugas = [];

			$q.all([
				ManageSarpras.getOrderList("pemakaian-kendaraan-dinas/find-asset-kendaraan-dinas/"),
				ManageSarpras.getOrderList("order-ambulance/find-produk-ambulance/"),
				ManageSarpras.getOrderList("pemakaian-kendaraan-dinas/get-supir-kendaraan-dinas/"),
				ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId")
			]).then(function(res){
				$scope.sourceNoKendaraan = new kendo.data.DataSource({
					data: res[0].data.data
				});
				$scope.ListPelayanan = new kendo.data.DataSource({
					data: res[1].data.data
				});
				if(res[2].statResponse){
					$scope.sourceSupir = new kendo.data.DataSource({
						data: res[2].data.data
					});
				}
				if(res[3].statResponse){
					$scope.listPerawat = new kendo.data.DataSource({
						data: res[3].data
					});
				}
				loadDataOrder();
			});
			// $scope.item.noOrder = $state.params.noOrder;
			function loadDataOrder() {
				$scope.isRouteLoading = true;
				ManageSarpras.getOrderList("daftar-kendaraan-dinas/find-penggunaan-kendaraan-dinas-by-no-rec/?noRec=" + $state.params.noOrder).then(function (dat) {
					$scope.order = dat.data.data.data[0];
					for(var key in $scope.order){
						if($scope.order.hasOwnProperty(key)){
							if(key.indexOf('tgl') == 0){
								$scope.order[key] = new Date($scope.order[key]);
							}
						}
					}
					if($scope.order.pegawai.length > 0){
						for(var i=0; i < $scope.order.pegawai.length; i++){
							$scope.arrPetugas.push({
								id: $scope.order.pegawai[i].petugasBerangkatId,
								namaLengkap: $scope.order.pegawai[i].petugasBerangkat
							});
						}
					}
					debugger;
					$scope.isRouteLoading = false;
					// debugger;
					// $scope.strukOrder = $scope.order.strukOrder;
					// $scope.order.tglPelayananAwal = new Date($scope.order.tglPelayananAwal);
					// console.log(JSON.stringify($scope.order));
				}, (err) => {
					$scope.isRouteLoading = false;
					throw err;
				});
			};
			// ManageSarpras.getOrderList("pemakaian-kendaraan-dinas/find-nama-asset-kendaraan-dinas/").then(function(data){
			// 	$scope.sourceProduk = data.data.data;
			// })

			// ManageSarpras.getOrderList("jadwalDokter/get-jadwal-supir-ambulance/" + $scope.now.getMonth() +"/" + $scope.now.getFullYear()).then(function(data){
			// 	var supir = data.data.data.data;
			// 	// $scope.listPerawat = [];
			// 	debugger;
			// 	$scope.sourceSupir = [];
			// 	// data = data.data;
			// 	supir.forEach(function(dat){
			// 		$scope.sourceSupir.push(dat.pegawai);
			// 	})
			// 	// for (var i = 0; i < data.length; i++) {
			// 	// 	if(data[i].jenisPegawaiId == 2) $scope.listPerawat.push(data[i]);
			// 	// 	else if(data[i].jenisPegawaiId == 10) $scope.sourceSupir.push(data[i]);
			// 	// }
			// 	// debugger;
			// })
			// $scope.listPetugas = new kendo.data.DataSource({
			// 	data: []
			// });

			// $scope.columnPetugas = [
			// 	{
			// 		"field": "nama",

			// 		width: "130px"
			// 	}
			// ];

			// ManageSarpras.getOrderList("pemakaian-kendaraan-dinas/get-supir-kendaraan-dinas/").then(function (data) {
			// 	// var supir = data.data.data.data;

			// 	// debugger;
			// 	$scope.sourceSupir = data.data.data;


			// })

			// ManageSarpras.getOrderList("pemakaian-kendaraan-dinas/find-asset-kendaraan-dinas/").then(function (data) {
			// 	// debugger;
			// 	$scope.sourceNoKendaraan = data.data.data;
			// })

			$scope.noPolSelected = function () {
				$scope.item.namaBarang = $scope.item.noPolisi.namaProduk;

			}

			$scope.Save = function () {
				var data = {
					"strukOrder": {
						"tglPelayananAwal": $scope.order.tglKeberangkatanAwal,
						"tglPelayananAkhir": $scope.order.tglKeberangkatanAkhir,
						"unitPemesan": {
							"id": $scope.order.unitPemesanId
						},
						"mapPegawaiKendaraanDinas": $scope.order.listPegawai,
						"alamatTempatTujuan": $scope.order.alamatTempatTujuan
					},
					"orderPelayanan": {
						"ruangan": {
							"id": 113
						},
						"ruanganTujuan": {
							"id": 139
						},
						"produk": {
							"id": 402661
						},
						"produkAset": {
							"id": $scope.item.noPolisi.idProduk
						},
						"noRec": $scope.order.noRec
					},
					"asset": {
						"noRec": $scope.item.noPolisi.noRecAset
					},
					"supir": {
						"id": $scope.item.supir.idPegawai
					}

				}
				// console.log(JSON.stringify(data));
				ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "pemakaian-kendaraan-dinas/save-pemakaian-kendaraan-dinas/?noRec=" + $scope.order.noRec).then(
					function (e) {
						$scope.Back();
					});
			}

			$scope.Back = function () {
				$state.go("DaftarOrderPemakaianKendaraanDinasDanPejabat");
			}
		}])
})