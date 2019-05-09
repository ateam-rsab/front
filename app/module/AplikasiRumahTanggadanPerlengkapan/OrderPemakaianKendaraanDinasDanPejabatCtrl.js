define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('OrderPemakaianKendaraanDinasDanPejabatCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras','$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.isReport = true;

			$scope.now = new Date();
			$scope.item = {};

			ManageSarpras.getListData("Ruangan&select=id,namaRuangan").then(function (data) {
				$scope.sourceUnit = data;
			});
			
			$scope.$watch('item.tglPelayananAwal', function () {
				var d1 = moment($scope.item.tglPelayanan);
				var d2 = moment($scope.item.tglPelayananAkhir);
				var days = moment.duration(d2.diff(d1)).asDays();
				$scope.item.lamaPemakaian = days + " Hari";
			});

			$scope.$watch('item.tglPelayananAkhir', function () {
				var d1 = moment($scope.item.tglPelayanan);
				var d2 = moment($scope.item.tglPelayananAkhir);
				var days = moment.duration(d2.diff(d1)).asDays();
				$scope.item.lamaPemakaian = days + " Hari";
			});

			// $scope.item.waktuKeberangkatan = new Date();

			$scope.Save = function () {
				debugger;
				// var HH = new Date();
				// HH.setHours($scope.item.jam, $scope.item.menit);

				var data = {
					"strukOrder": {
						"tglPelayananAwal": $scope.item.tglPelayananAwal,
						"tglPelayananAkhir": $scope.item.tglPelayananAkhir,
						"unitPemesan": {
							"id": $scope.item.unitPemesan.id
						},
						"mapPegawaiKendaraanDinas": $scope.arrPetugas,
						"alamatTempatTujuan": $scope.item.alamatTempatTujuan
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
						}
					}


				};
				// console.log(JSON.stringify(data));
				// $scope.item.tglKeberangkatan = DateHelper.getTanggalFormatted($scope.item.tglKeberangkatan);
				ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "order-kendaraan-dinas/save-order-kendaraan-dinas/").then(
					function (e) {
						console.log(JSON.stringify(e.data));
						$scope.item = {};
					});
			}

			// ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId").then(function (data) {
			// 	$scope.listPerawat = [];
			// 	var perawat = data.data;
			// 	perawat.forEach(function (dat) {
			// 		if (dat.jenisPegawaiId == 2) $scope.listPerawat.push(dat);
			// 	})
			// })

			ManageSarpras.getListData("Pegawai&select=id,namaLengkap,jenisPegawaiId").then(function (data) {
				$scope.sourcePetugas = [];
				for (var i = data.data.length - 1; i >= 0; i--) {
					if (data.data[i].jenisPegawaiId === 10) {
						$scope.sourcePetugas.push(data.data[i]);
					}
				}
			});

			$scope.Batal = function(){
				$state.go('DaftarOrderPemakaianKendaraanDinasDanPejabat');
			}

			$scope.remove = function (index) {
				$scope.arrPetugas.splice(index, 1);
			}

			$scope.arrPetugas = [
				{
					"petugas": {
						"id": "",
						"namaLengkap": "",
						"jenisPegawaiId": ""
					}
				}
			];

			$scope.addPetugas = function () {
				var newData = {
					"petugas":
					{
						"id": "",
						"namaLengkap": "",
						"jenisPegawaiId": ""
					}
				}
				$scope.arrPetugas.push(newData);
			}

			$scope.Back = function () {
				$scope.item = {};
			}
		}])
})