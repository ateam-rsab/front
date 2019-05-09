define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeputusanSanksiPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm', '$state', 'DateHelper',
		function($q, $rootScope, $scope, ManageSdm, $state, DateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			ManageSdm.getItem("sdm/get-login-user-musare", true).then(function(dat){
				$scope.ruanganId = dat.data.data.idRuangan;
				load();				
			});
			var jenisHukuman = {
				"id": $state.params.jenisHukumanId,
				"jenisHukuman" : $state.params.jenisHukuman
			}
			$scope.item.jabatanFungsional=$state.params.jabatanFungsionalPlan;

			$scope.item.ruanganMutasi=$state.params.ruanganMutasi;
			$scope.item.jabatanInternal =$state.params.jabatanInternalPlan;
			$scope.item.deskripsiUsulan =$state.params.deskripsiUsulan;
			$scope.item.noRec =$state.params.noRec;
			$scope.item.noUsulan =$state.params.noUsulan;
			$scope.item.namaPegawai =$state.params.namaPegawai;
			$scope.item.pegawaiId =$state.params.pegawaiId;
			$scope.item.jenisHukuman =jenisHukuman;
			$scope.item.keterangan = $state.params.keterangan;
			var tanggalUsulan = new Date($state.params.tanggalUsulan);
			$scope.item.tanggalUsulan = tanggalUsulan;
			$scope.item.eselon=$state.params.eselonPlan;
			$scope.item.pangkat=$state.params.pangkatPlan;
			$scope.item.namaPengusul=$state.params.namaPengusul;

			$scope.disJabatanFungsional = false;
			$scope.disJabatanInternal = false;
			$scope.disRuanganMutasi = false;
			$scope.disEselon = false;
			$scope.disPangkat = false;
	

			var load = function () {
				ManageSdm.getItem("sdm/get-load-pengajuan-sanksi?ruanganId="+$state.params.ruanganId , true).then(function(dat){
					$scope.listnamaPengusul = dat.data.data.listNamaPegusul;
					$scope.listnamaPegawai = dat.data.data.listPegawai;
					$scope.item.noUsulan = dat.data.data.noUsulan;
					$scope.listjenisHukuman = dat.data.data.jenisHukuman;
					$scope.listJenisSk = dat.data.data.listJenisSk;
				});
			}
			
			$scope.Save = function () {
				debugger;
				var tglSkSpmt = DateHelper.getTanggalFormattedNew($scope.item.tanggalSk);
				var tglTmtSpmt = DateHelper.getTanggalFormattedNew($scope.item.tanggalTmt);
				var tglKeputusan = DateHelper.getTanggalFormattedNew($scope.item.tanggalUsulan);
				var tglBerlakuAkhir = DateHelper.getTanggalFormattedNew($scope.item.tanggalBerlakuAkhir);;

				var data = {
					"noRec":$scope.item.noRec,
					"noPlanning": $scope.item.noUsulan,
					"deskripsiMutasiSanksiResignExec": $scope.item.deskripsiUsulan, 
					"jenisHukumanExec": {
						"id": $scope.item.jenisHukuman.id
					},
					"tglKeputusan": tglKeputusan, 
					"jenisKeputusan": { 
						"id": $scope.item.jenisSk.id
					},
					"tglSkSpmt": tglSkSpmt, 
					"noSkTemp": $scope.item.noSk,
					"uraian": $scope.item.uraian,
					"skDari": $scope.item.skDari,
					"tglTmtSpmt": tglTmtSpmt,
					"tglBerlakuAkhir": tglBerlakuAkhir
				}
				ManageSdm.saveData(data,"sdm/verifikasi-pengajuan-musare").then(function(e) {
					// console.log(JSON.stringify(e.data));
					$scope.isNext = true;
				});
			}
		}

		]);
});