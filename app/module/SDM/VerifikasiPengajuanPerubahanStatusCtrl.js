define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('VerifikasiPengajuanPerubahanStatusCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$mdDialog', '$state',
		function ($rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $mdDialog, $state) {
			$scope.isRouteLoading = false;
			$scope.now = new Date();
			var listTgl = [];
			var dataCuti = JSON.parse(localStorage.getItem('permohonanCutiPegawai'));
			if (dataCuti && dataCuti.noPlanning === $state.params.noPlanning) {
				// bind localStorage data to $scope.item
				$scope.item = dataCuti;

				$scope.item.tglPengajuan = new Date($scope.item.tglPengajuan);
				$scope.item.tglAwalPlan = new Date($scope.item.tglAwalPlan);
				$scope.item.tglAkhirPlan = new Date($scope.item.tglAkhirPlan);
				$scope.item.tanggalSk = $scope.now;
				$scope.item.tanggalTmt = $scope.now;
				$scope.item.tanggalRekam = $scope.now;
				$scope.item.lisTanggal.forEach(function (tanggal) {
					for (var key in tanggal) {
						if (tanggal.hasOwnProperty(key)) {
							if (key === "tgl") {
								tanggal[key] = DateHelper.getTanggalFormattedNew(new Date(tanggal[key]));
							}
						}
					}
				})
				if ($scope.item.statusPegawaiId == 25 || $scope.item.statusPegawaiId == 24) {
					for (let index = 0; index < $scope.item.lisTanggal.length; index++) {
						listTgl.push({
							tgl: $scope.item.lisTanggal[index].tgl,
							noRec: $scope.item.lisTanggal[index].noRec,
							tanggalDefault: $scope.item.lisTanggal[index].tgl
						})

					}
				}
			}
			$scope.datePickerOptions = {
				format: 'yyyy-MM-dd',
				change: onChangeDate
				// min: twoDaysAfter($scope.now)
			}
			function onChangeDate(e) {
				// if (listTgl.length > 0) {
				// 	if (new Date(listTgl[0].tanggalDefault) >  new Date(this.value())){
				// 		toastr.error('Tanggal Awal tidak boleh kurang dari tgl yg diajukan')
				// 	}
				// 	var lastDate = listTgl.length - 1;
				// 	if (new Date(listTgl[lastDate].tanggalDefault) <  new Date(this.value())){
				// 		toastr.error('Tanggal Akhir tidak boleh lebih dari tgl yg diajukan')
				// 	}
				// }
			}
			$scope.dataVOloaded = true;
			ManageSdmNew.getListData("sdm/get-login-user-musare", true).then(function (dat) {
				$scope.ruanganId = dat.data.data.idRuangan;
			}, function (Error) {
				console.log(Error)
			}).then(function () {
				// var ruanganId = $scope.ruanganId;
				// ManageSdmNew.getListData("sdm/get-load-pengajuan-mutasi?ruanganId="+ruanganId , true).then(function(dat){
				// 	$scope.listJenisSk = dat.data.data.listJenisSk;
				// });
				ManageSdm.getOrderList("service/list-generic/?view=JenisKeputusan&select=id,jenisKeputusan&criteria=statusEnabled&values=true&order=id:asc", true).then(function (dat) {
					$scope.listJenisSk = dat.data;
				});
			});
			$scope.Save = function () {
				if ($scope.item.statusPegawaiId == 24 || $scope.item.statusPegawaiId == 25) {
					$scope.item.tglPermohonan = $scope.item.lisTanggal
				}
				if ($scope.item.tglPermohonan.length == 0) {
					messageContainer.error("Tanggal permohonan belum di pilih");
					return;
				}
				var listRawRequired = [
					"item.tglPermohonan|ng-model|Tanggal disetujui",
					"item.jenisSk|k-ng-model|Jenis sk",
					"item.tanggalSk|k-ng-model|Tanggal SK",
					"item.noSk|ng-model|Nomor SK",
					"item.skDari|ng-model|Penandatangan SK",
					"item.tanggalTmt|k-ng-model|Tanggal TMT/SPMT",
					"item.tanggalRekam|k-ng-model|Tanggal berlaku akhir"
				]
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					// $scope.item.tglPermohonan.forEach(function(items){
					// 	for(var key in items){
					// 		if(items.hasOwnProperty(key)){
					// 			if(key === "$$hashKey" || key == "verif"){
					// 				delete items[key];
					// 			}
					// 		}
					// 	}
					// });
					var data = {
						"noRec": $scope.item.noRec,
						"jenisKeputusan": {
							"id": $scope.item.jenisSk.id
						},
						"tglSkSpmt": DateHelper.getTanggalFormattedNew($scope.item.tanggalSk),
						"noSkTemp": $scope.item.noSk,
						"uraian": $scope.item.uraian,
						"skDari": $scope.item.skDari,
						"tglTmtSpmt": DateHelper.getTanggalFormattedNew($scope.item.tanggalTmt),
						"tglBerlakuAkhir": DateHelper.getTanggalFormattedNew($scope.item.tanggalRekam),
						"tglKeputusan": DateHelper.getTanggalFormattedNew(new Date()),
						"statusPegawaiExec": {
							"id": $scope.item.statusPegawaiId
						},
						"pegawai": {
							"id": $scope.item.pegwaiId
						},
						"listTanggal": $scope.item.tglPermohonan,
						"deskripsiStatusPegawaiExec": $scope.item.deskripsiStatusPegawaiPlan,
						"keteranganLainyaExec": $scope.item.keteranganLainyaPlan
					}
					$scope.isRouteLoading = true;
					ManageSdmNew.saveData(data, "sdm/approval-permohonan-status").then(function (e) {
						// console.log(JSON.stringify(e.data));
						$scope.isNext = true;
						$scope.isRouteLoading = false;
					});
				} else {
					ModelItem.showMessages(isValid.messages);
					$scope.isRouteLoading = false;
				}
			}

			$scope.Back = function () {
				// e.preventDefault();
				// var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				// localStorage.setItem('isBack', 'Y');
				$state.go("DaftarPengajuanPerubahanStatus");
			}

			$scope.item.tglPermohonan = [];
			$scope.toogleCheckVerifikasi = function (current) {
				if (current.verif) {
					$scope.item.tglPermohonan.push(current);
				} else {
					for (var i = 0; i < $scope.item.tglPermohonan.length; i++) {
						if ($scope.item.tglPermohonan[i].noRec == current.noRec) {
							$scope.item.tglPermohonan.splice(i, 1);
						}
					}
				}
			}
		}
	]);
});