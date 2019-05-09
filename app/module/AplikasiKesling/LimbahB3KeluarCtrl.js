define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LimbahB3KeluarCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'MasterLimbah', 'MasterRekanan', 'TampilDataLimbahKeluar', 'ManageSarpras',
		function ($q, $rootScope, $scope, ModelItem, DateHelper, MasterLimbah, MasterRekanan, TampilDataLimbahKeluar, ManageSarpras) {
			$scope.dataVOloaded = true;
			function initPage() {
				$scope.showDropdownrekanan = false; // hide dropdown rekanan by default
				$scope.item = {
					periodeAwal: new Date(),
					periodeAkhir: new Date(),
					tanggal: new Date()
				};
			}
			$q.all([
				MasterRekanan.getOrderList("limbah-b3-keluar/get-rekanan/"),
				MasterLimbah.getOrderList("service/list-generic/?view=JenisLimbahB3Masuk&select=id,jenisLimbahB3masuk"),
				MasterLimbah.getOrderList("perlakuan/get-all-perlakuan/")
			]).then(function (res) {
				$scope.ListRekanan = res[0].data.data;
				$scope.ListLimbah = res[1].data;
				$scope.ListPerlakuan = res[2].data.data;
			});
			$scope.enableKodeParameter = true;
			$scope.validateJml = function () {
				if ($scope.item.jumlah > $scope.item.sampah.qtySisa) {
					toastr.warning('Jumlah Limbah B3 Keluar Tidak Boleh Lebih dari Berat Sampah Medis')
					$scope.item.jumlah = $scope.item.sampah.qtySisa;
				}
			}
			$scope.$watchGroup(["item.jumlah", "item.sampah.qtySisa"], function (newVal, oldVal) {
				if (!newVal[0] || !newVal[1]) return;
				$scope.item.sisaLimbah = newVal[1] - newVal[0];
			});
			$scope.$watch('item.jenisLimbah', function (newVal) {
				if (!newVal) return;
				else
					(newVal && newVal.id)
				TampilDataLimbahKeluar.getOrderList("limbah-b3-keluar/get-sisa-limbah-di-tps-by-jenis-limbah?jenisLimbah=" + newVal.id).then(function (dat) {
					$scope.item.sampah = dat.data.data[0];
					// for(var key in $scope.item.sampah){
					// 	if($scope.item.sampah.hasOwnProperty(key)){
					// 		if(key.indexOf('qtySisa')){
					// 			$scope.item.sampah['total'] = $scope.item.sampah[key];
					// 		}
					// 	}
					// }
				});
			});
			$scope.Save = function () {
				$scope.item.periodeAwal = $scope.item.periodeAwal.getTime();
				$scope.item.periodeAkhir = $scope.item.periodeAkhir.getTime();
				if ($scope.item.jumlah <= 0) {
					toastr.warning('Jumlah B3 Keluar ' + $scope.item.jumlah + ', Tidak bisa melanjutkan transaksi')
				} else {
					ManageSarpras.saveKeluar(ModelItem.beforePost($scope.item)).then(function (e) {
						initPage();
						// $scope.item = {};
						// $scope.item.periodeAwal = "";
						// $scope.item.periodeAkhir = "";
						// $scope.item= {};
						// init();  
						/*$state.go('dashboardpasien.TandaVital', {
						 noCM: $scope.noCM
						 });*/
					});
				}
			};
			$scope.selectedPrelakuan = function (perlakuan) {
				if (perlakuan.id == 5)
					$scope.showDropdownrekanan = true;
				else
					$scope.showDropdownrekanan = false;
			}
			initPage();
		}
	]);
});