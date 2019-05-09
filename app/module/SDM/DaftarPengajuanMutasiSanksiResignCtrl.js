define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPengajuanMutasiSanksiResignCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm', 'DateHelper', '$state', '$mdDialog',
		function($q, $rootScope, $scope, ManageSdm, DateHelper, $state, $mdDialog) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};

			var load = function () {
				ManageSdm.getItem("sdm/get-list-pengajuan-musare?namaPegawai=", true).then(function(dat){
					$scope.listDataMusare = dat.data.data.listData;
					$scope.listDataMusare.forEach(function(data){
						if (data.tglUsulan == null) {
							data.tglUsulan = "-"
						} else {
							var date = new Date(data.tglUsulan);
							data.tglUsulan = DateHelper.getTanggalFormatted(date);
						};
						// if (data.approvalStatus == 0) {
						// 	data.approvalStatus = "Belum Diputuskan"
						// } else if(data.approvalStatus == 1) {
						// 	data.approvalStatus = "Disetujui"
						// } else {
						// 	data.approvalStatus = "Tidak Disetujui"
						// }
					});
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMusare	
					});
					//debugger;
				});
			}
			load();
			$scope.cari = function () {
				//debugger;
				var namePegawai = $scope.item.pencarianNamaPegawai;
				ManageSdm.getItem("sdm/get-list-pengajuan-musare?namaPegawai="+namePegawai, true).then(function(dat){
					$scope.listDataMusare = dat.data.data.listData;
					$scope.listDataMusare.forEach(function(data){
						if (data.tglUsulan == null) {
							data.tglUsulan = "-"
						} else {
							var date = new Date(data.tglUsulan);
							data.tglUsulan = DateHelper.getTanggalFormatted(date);
						};
						// if (data.approvalStatus == 0) {
						// 	data.approvalStatus = "Belum Diputuskan"
						// } else if(data.approvalStatus == 1) {
						// 	data.approvalStatus = "Disetujui"
						// } else {
						// 	data.approvalStatus = "Tidak Disetujui"
						// }
					});
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMusare	
					});
					//debugger;
				});
			}
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnDaftarPengajuanMutasiSanksiResign
			};
			$scope.columnDaftarPengajuanMutasiSanksiResign = [
			{
				"field": "noUsulan",
				"title": "No Usulan"
			},
			{
				"field": "namaPegawai",
				"title": "Nama Pegawai"
			},
			{
				"field": "namaJabatanFungsionalBefore",
				"title": "Jabatan Fungsional"
			},
			{
				"field": "namaJabatanInternalBefore",
				"title": "Jabatan Internal"
			},
			{
				"field": "namaRuanganBefore",
				"title": "Ruangan Bekerja"
			},
			{
				"field": "deskripsiUsulan",
				"title": "Deskripsi Usulan"
			},
			{
				"field": "tglUsulan",
				"title": "Tanggal Usulan"
			},
			{
				"field": "namaPengusul",
				"title": "Nama Pengusul"
			},
			{
				"field": "approvalStatus",
				"title": "Status Keputusan",
				"template": "#if(approvalStatus===0){# Belum diputuskan #} else if(approvalStatus===1) {# Disetujui #} else if(approvalStatus===2) {# Ditolak #} else {# Ditangguhkan #}#"
			}

			];

			$scope.showPrompt = function(ev) {
				var confirm = $mdDialog.prompt()
				.title('Detail Pengajuan')
				.placeholder('Dog name')
				.ariaLabel('Nomor Usulan')
				.initialValue($scope.item.noUsulan)
				.ariaLabel('Nama Pegawai')
				.initialValue($scope.item.namaPegawai)
				.targetEvent(ev)
				.ok('Okay!')

				$mdDialog.show(confirm).then(function(result) {
					$scope.status = 'You decided to name your dog ' + result + '.';
				}, function() {
					$scope.status = 'You didn\'t name your dog.';
				});
			};
			$scope.click = function(current){
				$scope.current = current;
				$scope.item.jabatanFungsionalPlanId = current.jabatanFungsionalPlanId;
				$scope.item.namaPengusul = current.namaPengusul;
				$scope.item.ruanganPlanId = current.ruanganPlanId;
				$scope.item.namaJabatanInternalBefore = current.namaJabatanInternalBefore;
				$scope.item.eselonBefore = current.eselonBefore;
				$scope.item.pangkatPlan = current.pangkatPlan;
				$scope.item.pangkatBefore = current.pangkatBefore;
				$scope.item.eselonBeforeId = current.eselonBeforeId;
				$scope.item.pengusulId = current.pengusulId;
				$scope.item.namaJabatanFungsionalBefore = current.namaJabatanFungsionalBefore;
				$scope.item.jenisHukumanId = current.jenisHukumanId;
				$scope.item.jabatanInternalPlanId = current.jabatanInternalPlanId;
				$scope.item.namaJabatanInternalPlan = current.namaJabatanInternalPlan;
				$scope.item.keterangan = current.keterangan;
				$scope.item.approvalStatus = current.approvalStatus;
				$scope.item.jabatanFungsionalBeforeId = current.jabatanFungsionalBeforeId;
				$scope.item.eselonPlanId = current.eselonPlanId;
				$scope.item.namaRuanganPlan = current.namaRuanganPlan;
				$scope.item.statusMusare = current.statusMusare;
				$scope.item.jabatanStrukturalPlanId = current.jabatanStrukturalPlanId;
				$scope.item.pangkatPlanId = current.pangkatPlanId;
				$scope.item.namaJabatanFungsionalPlan = current.namaJabatanFungsionalPlan;
				$scope.item.jabatanInternalBeforeId = current.jabatanInternalBeforeId;
				$scope.item.pegawaiId = current.pegawaiId;
				$scope.item.ruanganBeforeId = current.ruanganBeforeId;
				$scope.item.namaPegawai = current.namaPegawai;
				$scope.item.jabatanStrukturalBeforeId = current.jabatanStrukturalBeforeId;
				$scope.item.noUsulan = current.noUsulan;
				$scope.item.tglRekam = current.tglRekam;
				$scope.item.eselonPlan = current.eselonPlan;
				$scope.item.namaJabatanStrukturalBefore = current.namaJabatanStrukturalBefore;
				$scope.item.deskripsiUsulan = current.deskripsiUsulan;
				$scope.item.namaRuanganBefore = current.namaRuanganBefore;
				$scope.item.jenisHukuman = current.jenisHukuman;
				$scope.item.tglUsulan = current.tglUsulan;
				$scope.item.pangkatBeforeId = current.pangkatBeforeId;
				$scope.item.namaJabatanStrukturalPlan = current.namaJabatanStrukturalPlan;
				$scope.item.noRec = current.noRec;
				$scope.item.noOrder = current.noOrder;
				$scope.item.kdBarang = current.kdProduk;
				if ($scope.item.approvalStatus == "Tidak Disetujui") {
					$scope.disKeputusan = true;
					$scope.disUnverif = true;
				} else if ($scope.item.approvalStatus == "Disetujui") {
					$scope.disKeputusan = true;
					$scope.disUnverif = true;
				} else {
					$scope.disKeputusan = false;
					$scope.disUnverif = false;
				}

			};
			$scope.disKeputusan = false;
			$scope.disUnverif = false;
			$scope.keputusan = function(current){
				if ($scope.item.statusMusare == 1) {
					$state.go("KeputusanMutasiPegawai",
					{
						noRec:$scope.item.noRec,
						pegawaiId:$scope.item.pegawaiId,
						deskripsiUsulan:$scope.item.deskripsiUsulan,
						noUsulan:$scope.item.noUsulan,
						namaPegawai:$scope.item.namaPegawai,
						tanggalUsulan:$scope.item.tglUsulan,
						jabatanFungsionalPlan:$scope.item.namaJabatanFungsionalPlan,
						jabatanFungsionalPlanId:$scope.item.jabatanFungsionalPlanId,
						jabatanInternalPlan:$scope.item.namaJabatanInternalPlan,
						jabatanInternalPlanId:$scope.item.jabatanInternalPlanId,
						ruanganMutasi:$scope.item.namaRuanganPlan,
						ruanganMutasiId:$scope.item.ruanganPlanId,
						eselonPlan:$scope.item.eselonPlan,
						eselonPlanId:$scope.item.eselonPlanId,
						pangkatPlan:$scope.item.pangkatPlan,
						pangkatPlanId:$scope.item.pangkatPlanId,
						namaPengusul:$scope.item.namaPengusul

					})
				} else if ($scope.item.statusMusare == 2){
					//debugger;
					$state.go("KeputusanSanksiPegawai",
					{
						noRec:$scope.item.noRec,
						pegawaiId:$scope.item.pegawaiId,
						deskripsiUsulan:$scope.item.deskripsiUsulan,
						noUsulan:$scope.item.noUsulan,
						namaPegawai:$scope.item.namaPegawai,
						tanggalUsulan:$scope.item.tglUsulan,
						jabatanFungsionalPlan:$scope.item.namaJabatanFungsionalBefore,
						jabatanInternalPlan:$scope.item.namaJabatanInternalBefore,
						ruanganMutasi:$scope.item.namaRuanganBefore,
						eselonPlan:$scope.item.eselonBefore,
						pangkatPlan:$scope.item.pangkatBefore,
						namaPengusul:$scope.item.namaPengusul,
						tanggalUsulan:$scope.item.tglUsulan,
						ruanganId:$scope.item.ruanganBeforeId,
						jenisHukuman:$scope.item.jenisHukuman,
						keterangan:$scope.item.keterangan,
						jenisHukumanId:$scope.item.jenisHukumanId
					})
				} else {
					//debugger;
					$state.go("KeputusanResignPegawai",
					{
						noRec:$scope.item.noRec,
						pegawaiId:$scope.item.pegawaiId,
						deskripsiUsulan:$scope.item.deskripsiUsulan,
						noUsulan:$scope.item.noUsulan,
						namaPegawai:$scope.item.namaPegawai,
						tanggalUsulan:$scope.item.tglUsulan,
						jabatanFungsionalPlan:$scope.item.namaJabatanFungsionalBefore,
						jabatanInternalPlan:$scope.item.namaJabatanInternalBefore,
						ruanganMutasi:$scope.item.namaRuanganBefore,
						eselonPlan:$scope.item.eselonBefore,
						pangkatPlan:$scope.item.pangkatBefore,
						namaPengusul:$scope.item.namaPengusul,
						tanggalUsulan:$scope.item.tglUsulan,
						keterangan:$scope.item.keterangan,
						ruanganId:$scope.item.ruanganBeforeId
					})
				}
			}
			$scope.unverifikasi = function () {
				var data = {
					"noPlanning": $scope.item.noUsulan,
					"noRec": $scope.item.noRec
				}
				ManageSdm.saveData(data,"sdm/unverif-pengajuan-musare").then(function(e) {
					console.log(JSON.stringify(e.data));
					load();
				});
			}

		}
		]);
});