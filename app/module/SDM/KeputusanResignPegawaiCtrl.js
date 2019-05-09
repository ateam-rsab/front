define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeputusanResignPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm', '$state', 'DateHelper',
		function($q, $rootScope, $scope, ManageSdm, $state, DateHelper) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			ManageSdm.getItem("sdm/get-login-user-musare", true).then(function(dat){
				$scope.ruanganId = dat.data.data.idRuangan;
				load();
			});
			var load = function () {
				ManageSdm.getItem("sdm/get-load-pengajuan-resign?ruanganId="+$state.params.ruanganId , true).then(function(dat){
					$scope.listnamaPengusul = dat.data.data.listNamaPegusul;
					$scope.listnamaPegawai = dat.data.data.listPegawai;
					$scope.item.noUsulan = dat.data.data.noUsulan;
					$scope.listJenisSk = dat.data.data.listJenisSk;
				});
			}
			//debugger;
			$scope.item.jabatanFungsional=$state.params.jabatanFungsionalPlan;
			$scope.item.ruanganBekerja=$state.params.ruanganMutasi;
			$scope.item.jabatanInternal =$state.params.jabatanInternalPlan;
			$scope.item.deskripsiUsulan =$state.params.deskripsiUsulan;
			$scope.item.noRec =$state.params.noRec;
			$scope.item.noUsulan =$state.params.noUsulan;
			$scope.item.namaPegawai =$state.params.namaPegawai;
			$scope.item.pegawaiId =$state.params.pegawaiId;
			$scope.item.keterangan =$state.params.keterangan;
			
			var tanggal = new Date($state.params.tanggalUsulan)
			var tanggalRencanaKeluar = DateHelper.getTanggalFormatted(tanggal)
			$scope.item.tanggalUsulan = tanggalRencanaKeluar;
			$scope.item.eselon=$state.params.eselonPlan;
			$scope.item.pangkat=$state.params.pangkatPlan;
			$scope.item.namaPengusul=$state.params.namaPengusul;
			
			$scope.Save = function () {
				//debugger;
				var tglTmtSpmt = DateHelper.getTanggalFormattedNew($scope.item.tanggalTmt);
				var tglKeputusan = DateHelper.getTanggalFormattedNew($scope.item.tanggalRekam);
				var tglSkSpmt = DateHelper.getTanggalFormattedNew($scope.item.tanggalSk);

				var data = {
					"noPlanning" : $scope.item.noUsulan,
					"noRec":$scope.item.noRec,
					"deskripsiMutasiSanksiResignExec": $scope.item.deskripsiUsulan, 
					"tglKeputusan": tglKeputusan, 
					"jenisKeputusan": { 
						"id": $scope.item.jenisSk.id
					},
					"tglSkSpmt": tglSkSpmt, 
					"noSkTemp": $scope.item.noSk,
					"Uraian": $scope.item.uraian,
					"skDari": $scope.item.skDari,
					"tglTmtSpmt": tglTmtSpmt,
				}
				ManageSdm.saveData(data,"sdm/verifikasi-pengajuan-musare").then(function(e) {
					// console.log(JSON.stringify(e.data));
					$scope.isNext = true;
				});
			}
		}

		]);
});