define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeputusanMutasiPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm', '$state', 'DateHelper', '$window',
		function($q, $rootScope, $scope, ManageSdm, $state, DateHelper, $window) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			var jabatanFungsional = {
				"namaJabatan" : $state.params.jabatanFungsionalPlan
			}
			var jabatanInternal = {
				"namaJabatan" : $state.params.jabatanInternalPlan
			}
			var ruanganMutasi = {
				"namaRuangan" : $state.params.ruanganMutasi
			}
			var eselon = {
				"eselon" : $state.params.eselonPlan
			}
			var pangkat = {
				"namaPangkat" : $state.params.pangkatPlan
			}
			ManageSdm.getItem("sdm/get-login-user-musare", true).then(function(dat){
				$scope.ruanganId = dat.data.data.idRuangan;
				loadData();				
			});

			$scope.item.jabatanFungsionalPlan=jabatanFungsional;
			$scope.item.ruanganMutasi=ruanganMutasi;
			$scope.item.jabatanInternalPlan =jabatanInternal;
			$scope.item.deskripsiUsulan =$state.params.deskripsiUsulan;
			$scope.item.noRec =$state.params.noRec;
			$scope.item.noUsulan =$state.params.noUsulan;
			$scope.item.namaPegawai =$state.params.namaPegawai;
			$scope.item.pegawaiId =$state.params.pegawaiId;
			
			var tanggal = new Date($state.params.tanggalUsulan)
			$scope.item.tanggalUsulan = tanggal;
			$scope.item.eselonPlan=eselon;
			$scope.item.pangkatPlan=pangkat;
			$scope.item.namaPengusul=$state.params.namaPengusul;
			//debugger;
			$scope.item.jabatanFungsionalPlanId=$state.params.jabatanFungsionalPlanId;
			$scope.item.jabatanInternalPlanId=$state.params.jabatanInternalPlanId;
			$scope.item.ruanganMutasiId=$state.params.ruanganMutasiId;
			$scope.item.eselonPlanId=$state.params.eselonPlanId;
			$scope.item.pangkatPlanId=$state.params.pangkatPlanId;

			$scope.disJabatanFungsional = false;
			$scope.disJabatanInternal = false;
			$scope.disRuanganMutasi = false;
			$scope.disEselon = false;
			$scope.disPangkat = false;

			if ($state.params.jabatanFungsionalPlan == "") {
				$scope.disJabatanFungsional = true;
			} else {
				$scope.disJabatanFungsional = false;
			}

			if ($state.params.jabatanInternalPlan == "") {
				$scope.disJabatanInternal = true;
			} else {
				$scope.disJabatanInternal = false;
			}

			if ($state.params.ruanganMutasi == "") {
				$scope.disRuanganMutasi = true;
			} else {
				$scope.disRuanganMutasi = false;
			}

			if ($state.params.eselonPlan == "") {
				$scope.disEselon = true;
			} else {
				$scope.disEselon = false;
			}

			if ($state.params.pangkatPlan == "") {
				$scope.disPangkat = true;
			} else {
				$scope.disPangkat = false;
			}

			

			var loadData = function () {
				var asdasdasd = $scope.ruanganId;
				ManageSdm.getItem("sdm/get-load-pengajuan-mutasi?ruanganId="+asdasdasd , true).then(function(dat){
					$scope.listjabatanFungsionalPlan = dat.data.data.listJabatanFungsional;
					$scope.listjabatanInternalPlan = dat.data.data.listJabatanInternal;
					$scope.listruanganMutasi = dat.data.data.listRuanganMutasi;
					$scope.listeselonPlan = dat.data.data.listEselon;
					$scope.listnamaPengusul = dat.data.data.listNamaPegusul;
					$scope.listpangkatPlan = dat.data.data.listPangkat;
					$scope.listnamaPegawai = dat.data.data.listPegawai;
					$scope.listJenisSk = dat.data.data.listJenisSk;
					//debugger;listJabatanInternal
				});
			}
			$scope.getDataPegawai = function () {
				var idPegawai = $scope.item.namaPegawai.id;
				ManageSdm.getItem("sdm/get-data-by-pegawai?id="+idPegawai, true).then(function(dat){
					$scope.dataPegawai = dat.data.data;
					$scope.item.jabatanFungsional = $scope.dataPegawai.jabatanFungsional;
					$scope.item.jabatanFungsionalId = $scope.dataPegawai.jabatanFungsionalId;
					$scope.item.jabatanInternal = $scope.dataPegawai.jabatanInternal;
					$scope.item.jabatanInternalId = $scope.dataPegawai.jabatanInternalId;
					$scope.item.ruanganBekerja = $scope.dataPegawai.namaRuangan;
					$scope.item.runganBekerjaId = $scope.dataPegawai.ruanganId;
					$scope.item.eselon = $scope.dataPegawai.eselon;
					$scope.item.eselonId = $scope.dataPegawai.eselonId;
					$scope.item.pangkat = $scope.dataPegawai.namaPangkat;
					$scope.item.pangkatId = $scope.dataPegawai.pangkatId;
					
				});
			}
			


			var fungsiRuangan = function (ruanganId) {
				//debugger;
				if ($scope.item.ruanganMutasiId == ""){
					ruanganId = 0
				} else {
					ruanganId = parseInt($scope.item.ruanganMutasiId)
				}
				return ruanganId;
			}
			var fungsiJabatanFungsional = function (jabatanFungsionalId) {
				//debugger;
				if ($scope.item.jabatanFungsionalPlanId == ""){
					jabatanFungsionalId = 0
				} else {
					jabatanFungsionalId = parseInt($scope.item.jabatanFungsionalPlanId)
				}
				return jabatanFungsionalId;
			}
			var fungsiJabatanInternal = function (jabatanInternalId) {
				if ($scope.item.jabatanInternalPlanId == ""){
					jabatanInternalId = 0
				} else {
					jabatanInternalId = parseInt($scope.item.jabatanInternalPlanId)
				}
				return jabatanInternalId;
			}
			var fungsiEselon = function (eselonId) {
				if ($scope.item.eselonPlanId == ""){
					eselonId = 0
				} else {
					eselonId = parseInt($scope.item.eselonPlanId)
				}
				return eselonId;
			}
			var fungsiPangkat = function (pangkatId) {
				if ($scope.item.pangkatPlanId == ""){
					pangkatId = 0
				} else {
					pangkatId = parseInt($scope.item.pangkatPlanId)
				}
				return pangkatId;
			}

			$scope.Save = function () {
				//debugger;
				var tglSkSpmt = DateHelper.getTanggalFormattedNew($scope.item.tanggalSk);
				var tglTmtSpmt = DateHelper.getTanggalFormattedNew($scope.item.tanggalTmt);
				var tglKeputusan = DateHelper.getTanggalFormattedNew($scope.item.tanggalRekam);
				var data = {
					"noPlanning" : $scope.item.noUsulan,
					"noRec":$scope.item.noRec,
					"deskripsiMutasiSanksiResignExec": $scope.item.deskripsiUsulan, 
					"jabatanFungsionalExec": { 
						"id": fungsiJabatanFungsional()
					},
					"jabatanInternalExec": {
						"id": fungsiJabatanInternal()
					},
					"pegawai": {
						"id": $scope.item.pegawaiId
					},  
					"ruanganExec": { 
						"id": fungsiRuangan()
					},
					"eselonExec": { 
						"id": fungsiEselon()
					},
					"pangkatExec": { 
						"id": fungsiPangkat()
					},
					"jenisKeputusan": {
						"id": $scope.item.jenisSk.id
					},
					"tglSkSpmt": tglSkSpmt, 
					"noSkTemp": $scope.item.noSk,
					"uraian": $scope.item.uraian,
					"skDari": $scope.item.skDari,
					"tglTmtSpmt": tglTmtSpmt,
					"tglKeputusan": tglKeputusan, 
				}
				ManageSdm.saveData(data,"sdm/verifikasi-pengajuan-musare").then(function(e) {
					// console.log(JSON.stringify(e.data));
					$scope.isNext = true;
				});
			}
			$scope.Back = function () {
				$window.history.back();
			}
		}

		]);
});