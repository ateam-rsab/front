define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PengembalianKendaraanDinasDanPejabatCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSarpras', 'DateHelper',
		function ($q, $rootScope, $scope, ModelItem, $state, ManageSarpras, DateHelper) {
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.arrPetugas = [];

			$q.all([
				ManageSarpras.getOrderList("service/list-generic/?view=KondisiKendaraan&select=id,name"),
				ManageSarpras.getOrderList("daftar-kendaraan-dinas/find-pengembalian-kendaraan-dinas-by-no-rec/?noRec=" + $state.params.noOrder),
				// ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId")
			]).then(function(res){
				$scope.kondisi = res[0].data;
				if(res[1].statResponse){
					debugger;
					$scope.item = res[1].data.data.data[0];
					// for(var i=0; i < $scope.item.pegawai.length; i++){
					// 	$scope.arrPetugas.push({
					// 		id: $scope.item.pegawai[i].petugasBerangkatId,
					// 		namaLengkap: $scope.item.pegawai[i].petugasBerangkat
					// 	})
					// }
					$scope.item.tglKeberangkatan = new Date($scope.item.tglKeberangkatan);
				}
				// if(res[2].statResponse){
				// 	var filteredPegawai =  _.filter(res[2].data, (items) => {
				// 		return items.jenisPegawaiId == 2;
				// 	});
				// 	$scope.listPerawat = new kendo.data.DataSource({
				// 		data: filteredPegawai
				// 	});
				// }
			})

			/*
			ManageSarpras.getOrderList("service/list-generic/?view=KondisiKendaraan&select=id,name").then(function (data) {
				$scope.kondisi = data.data;
			});	
			$scope.rusak = function () {
				if ($scope.item.kondisi === "2") return false;
				else {
					$scope.item.keterangan = "";
					return true;
				}
			}
			$scope.columnPetugas = [
				{
					"field": "nama",
					width: "130px"
				}
			];
			*/
			/*
			$scope.item.noOrder = $state.params.noOrder;
			ManageSarpras.getOrderList("daftar-kendaraan-dinas/find-pengembalian-kendaraan-dinas-by-no-rec/?noRec=" + $scope.item.noOrder).then(function (dat) {
				$scope.order = dat.data.data.data;
				$scope.order.tglPelayananAwal = new Date($scope.order.tglPelayananAwal);
				$scope.listPetugas = $scope.order.listPetugas;
				// debugger;


				// console.log(JSON.stringify($scope.order));
			});
			// ManageSarpras.getOrderList("daftar-kendaraan-dinas/find-pengembalian-kendaraan-dinas-by-no-order/?noOrder=" + $scope.item.noOrder).then(function(dat){
			// 	$scope.order = dat.data.data.data[0];
			// 	$scope.order.tglPelayananAwal = new Date($scope.order.tglPelayananAwal);
			// 	// debugger;
			// });
			*/
			$scope.Save = function () {
				var data = {
					"strukOrder": {
						"noRec": $scope.item.noRec,
						"waktuPengembalian": new Date($scope.item.waktuPengembalian).getTime()
					},					
					"kmTerakhir": $scope.item.KMAkhir,
					"kmAwal": $scope.item.KMAwal,
					"kondisiKendaraan": {
						"id": $scope.item.kondisi
					},
					"keterangan": $scope.item.keterangan
				};

				// console.log(JSON.stringify($scope.item.kondisi));

				ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "pengembalian-kendaraan-dinas/save-pengembalian-kendaraan-dinas/?noRec=" + $scope.item.noRec).then(function (e) {
					console.log(JSON.stringify(e.data));
					$scope.Back();
				})
			}

			$scope.Back = function () {
				$state.go("DaftarOrderPemakaianKendaraanDinasDanPejabat");
			}
		}])
})