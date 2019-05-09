define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PengkajianKlinikHemodialisaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'ManagePhp',
		function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, ManagePhp) {
			$scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Status Fungsional";
			$scope.item = {};
			$scope.noRecPap = cacheHelper.get('noRecPap');
			$scope.title = "Pemeriksaan Fisik";
			$scope.titlePengkajian = "Rencana Keperawatan ";
			$scope.form = false;
			// get noRecPap dari local storage yg di ush di halaman dashboard PAP
			$scope.noRecPap = cacheHelper.get('noRecPap');

			$scope.listPolaNapas = [
				{
					"id": 1, "nama": "Pola nafas tidak efektif", "tujuan": "Pola nafas efektif", "intervensi": "Managemen pola napas",
					"implementasi": [{ "id": 1, "nama": "Posisikan pasien untuk memaksimalkan ventilasi" },
					{ "id": 2, "nama": "Identifikasi pasien perlunya pemasangan alat jalan napas buatan" },
					{ "id": 3, "nama": "Pasang oroparingeal airway bila perlu" },
					{ "id": 4, "nama": "Monitor respirasi dan status O2" },
					{ "id": 5, "nama": "Monitor suara paru kanan dan kiri" },
					{ "id": 6, "nama": "Kolaborasi pemberian bronkodilator" },
					{ "id": 7, "nama": "Kolaborasi pemberian oksigen" },
					],
					"evaluasi": [{ "id": 1, "nama": "Frekuensi napas dalam batas normal sesuai usia" },
					{ "id": 2, "nama": "Tidak sesak" },
					{ "id": 3, "nama": "Tidak ada retraksi" },]
				}
			]

			$scope.listHipervolemia = [
				{
					"id": 2, "nama": "Hipervolemia", "tujuan": "Hidrasi klien cukup", "intervensi": "Managemen cairan",
					"implementasi": [{ "id": 1, "nama": "Kaji adanya edema" },
					{ "id": 2, "nama": "Monitor intake-output" },
					{ "id": 3, "nama": "Kolaborasi tindakan hemodialisa" },
					],
					"evaluasi": [{ "id": 1, "nama": "Adanya penurunan BB" },
					{ "id": 2, "nama": "Edema Berkurang" },
					{ "id": 3, "nama": "Diuresis 1-2 mm/kg/bb/jam" },]
				}
			]

			$scope.listRisikoInfeksi = [
				{
					"id": 3, "nama": "Risiko infeksi", "tujuan": "Klien terhindar dari infeksi", "intervensi": "Managemen pencegahan infeksi",
					"implementasi": [{ "id": 1, "nama": "Mengkaji adanya tanda-tanda infeksi" },
					{ "id": 2, "nama": "Mencuci tangan dengan five moment" },
					{ "id": 3, "nama": "Menggunakan APD sesuai indikasi" },
					{ "id": 4, "nama": "Meningkatkan intake nutrisi" },
					{ "id": 5, "nama": "Melakukan prosHMDr sesuai SPO" },
					{ "id": 6, "nama": "Mempertahankan teknik isolasi" },
					{ "id": 7, "nama": "Membatasi pengunjung" },
					],
					"evaluasi": [{ "id": 1, "nama": "Tidak ada tanda-tanda infeksi" },
					{ "id": 2, "nama": "Pasien menunjukan perilaku sehat" },
					{ "id": 3, "nama": "Jumlah lekosit normal" },
					{ "id": 4, "nama": "CRP normal" },
					{ "id": 5, "nama": "Kultur darah steril" },]
				}
			]


			$scope.listKeadaanUmum = [
				{
					"id": 17, "nama": "Keadaan Umum", "detail": [{ "id": 1, "nama": "Baik" }, { "id": 2, "nama": "Sedang" }, { "id": 3, "nama": "Buruk" },
					]
				}]
			$scope.listEdema = [
				{
					"id": 18, "nama": "Edema", "detail": [{ "id": 1, "nama": "Ya    " }, { "id": 2, "nama": "Tidak       " }
					]
				}]
			$scope.listKonjuctiva = [
				{
					"id": 19, "nama": "Konjuctiva", "detail": [{ "id": 1, "nama": "Tidak Anemis" }, { "id": 2, "nama": "Anemis" }
					]
				}]
			$scope.listPernapasan = [
				{
					"id": 20, "nama": "Pernafasan", "detail": [{ "id": 1, "nama": "Tidak sesak" }, { "id": 2, "nama": "Sesak" },
					{ "id": 3, "nama": "Kusmaul" }, { "id": 4, "nama": "Retraksi" }, { "id": 5, "nama": "Tidak retraksi" }, { "id": 6, "nama": "Ronkhi" }
					]
				}]
			$scope.listAksesVaskular = [
				{
					"id": 21, "nama": "Akses Vaskuler", "detail": [{ "id": 1, "nama": "AV fistula" }
					]
				}]
			$scope.listHDcatheter = [
				{
					"id": 22, "nama": "HD Catheter", "detail": [{ "id": 1, "nama": "Sub clavia" }, { "id": 2, "nama": "Jugular" },
					{ "id": 3, "nama": "Femoral" }
					]
				}]
			$scope.getdata = function () {
				var objectfk = "HMD";
				var noregistrasifk = $state.params.noRec;
				ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
					+ '&riwayatfk=' + $scope.noRecPap).then(function (e) {
						$scope.dataSkrining = e.data.data;
						if ($scope.dataSkrining.length != 0) {
							for (var i = 0; i < $scope.dataSkrining.length; i++) {
								if ($scope.dataSkrining[i].objectfk == "HMD-000001") {
									$scope.noRecberatBadanPost = $scope.dataSkrining[i].norec
									$scope.item.beratBadanPost = parseFloat($scope.dataSkrining[i].nilai)

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000002") {
									$scope.noRectekananDarah = $scope.dataSkrining[i].norec
									$scope.item.tekananDarah = $scope.dataSkrining[i].nilai;

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000003") {
									$scope.noRecberatBadanKering = $scope.dataSkrining[i].norec
									$scope.item.beratBadanKering =  parseFloat($scope.dataSkrining[i].nilai)

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000004") {
									$scope.noReckeadaanUmum = $scope.dataSkrining[i].norec
									$scope.item.keadaanUmum = $scope.dataSkrining[i].nilai;
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000005") {
									$scope.noRecedema = $scope.dataSkrining[i].norec
									$scope.item.edema = $scope.dataSkrining[i].nilai;

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000006") {
									$scope.noReckonjuctiva = $scope.dataSkrining[i].norec
									$scope.item.konjuctiva = $scope.dataSkrining[i].nilai;
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000007") {
									$scope.noRecTidakSesak = $scope.dataSkrining[i].norec
									$scope.listPernapasan[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPernapasan.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000008") {
									$scope.noRecSesak = $scope.dataSkrining[i].norec
									$scope.listPernapasan[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPernapasan.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000009") {
									$scope.noRecKusmaul = $scope.dataSkrining[i].norec
									$scope.listPernapasan[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPernapasan.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000010") {
									$scope.noRecRetraksi = $scope.dataSkrining[i].norec
									$scope.listPernapasan[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPernapasan.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000011") {
									$scope.noRecTidakRetraksi = $scope.dataSkrining[i].norec
									$scope.listPernapasan[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPernapasan.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000012") {
									$scope.noRecRonkhi = $scope.dataSkrining[i].norec
									$scope.listPernapasan[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPernapasan.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000013") {
									$scope.norecVaskular = $scope.dataSkrining[i].norec
									$scope.listAksesVaskular[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempaddVaskuler.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000014") {
									$scope.norecSubclavia = $scope.dataSkrining[i].norec
									$scope.listHDcatheter[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHDcatheter.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000014") {
									$scope.norecSubclavia = $scope.dataSkrining[i].norec
									$scope.listHDcatheter[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHDcatheter.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000015") {
									$scope.norecJugular = $scope.dataSkrining[i].norec
									$scope.listHDcatheter[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHDcatheter.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000016") {
									$scope.norecFemoral = $scope.dataSkrining[i].norec
									$scope.listHDcatheter[0].detail.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHDcatheter.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000017") {
									$scope.norecEvNapasFrekuensi = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasEvaluasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000018") {
									$scope.norecEvNapasTidaksesak = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasEvaluasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000019") {
									$scope.norecEvNapasTidakRetraksi = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasEvaluasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000020") {
									$scope.norecImpNapasPosisikan = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000021") {
									$scope.norecImpNapasIdentifikasi = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000022") {
									$scope.norecImpNapasPasang = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000023") {
									$scope.norecImpNapasMonitor = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000024") {
									$scope.norecImpNapasMonitorSuara = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000025") {
									$scope.norecImpNapasbronkodilator = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000026") {
									$scope.norecImpNapasoksigen = $scope.dataSkrining[i].norec
									$scope.listPolaNapas[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempPolaNapasImplementasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000027") {
									$scope.norecEvHiperBB = $scope.dataSkrining[i].norec
									$scope.listHipervolemia[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHipervolemiaEvaluasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000028") {
									$scope.norecEvHiperEdema = $scope.dataSkrining[i].norec
									$scope.listHipervolemia[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHipervolemiaEvaluasi.push(dataid)
										}
									})
								}
							
								if ($scope.dataSkrining[i].objectfk == "HMD-000029") {
									$scope.norecEvHiperDiuresis = $scope.dataSkrining[i].norec
									$scope.listHipervolemia[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHipervolemiaEvaluasi.push(dataid)
										}
									})
								}
								
								if ($scope.dataSkrining[i].objectfk == "HMD-000030") {
									$scope.norecImpHiperKaji = $scope.dataSkrining[i].norec
									$scope.listHipervolemia[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHipervolemiaImplemnentasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000031") {
									$scope.norecImpHiperMonitor = $scope.dataSkrining[i].norec
									$scope.listHipervolemia[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHipervolemiaImplemnentasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000032") {
									$scope.norecImpHiperKolaborasi = $scope.dataSkrining[i].norec
									$scope.listHipervolemia[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempHipervolemiaImplemnentasi.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000033") {
									$scope.norecRisikoEvlNonInfeksi = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoEvl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000034") {
									$scope.norecRisikoEvlPasien = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoEvl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000035") {
									$scope.norecRisikoEvllekosit = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoEvl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000036") {
									$scope.norecRisikoEvlCRP = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoEvl.push(dataid)
										}
									})
								}	
								if ($scope.dataSkrining[i].objectfk == "HMD-000037") {
									$scope.norecRisikoEvlKultur = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].evaluasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoEvl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000038") {
									$scope.norecRisikoImpMengkaji = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000039") {
									$scope.norecRisikoImpMencuci = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000040") {
									$scope.norecRisikoImpMenggunakan = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000041") {
									$scope.norecRisikoImpMeningkatkan = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000042") {
									$scope.norecRisikoImpMelakukan = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000043") {
									$scope.norecRisikoMempertahankan = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000044") {
									$scope.norecRisikoMempertahankan = $scope.dataSkrining[i].norec
									$scope.listRisikoInfeksi[0].implementasi.forEach(function (e) {
										if (e.id == $scope.dataSkrining[i].nilai) {
											e.isChecked = true
											var dataid = {
												"id": e.id,
												"nama": e.nama
											}
											$scope.tempRisikoImpl.push(dataid)
										}
									})
								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000045") {
									$scope.noRecBeratPre = $scope.dataSkrining[i].norec
									$scope.item.beratBadanPre = parseFloat($scope.dataSkrining[i].nilai)

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000046") {
									$scope.noRecsuhu = $scope.dataSkrining[i].norec
									$scope.item.suhu = parseFloat($scope.dataSkrining[i].nilai)

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000047") {
									$scope.noRecnadi = $scope.dataSkrining[i].norec
									$scope.item.nadi = $scope.dataSkrining[i].nilai

								}
								if ($scope.dataSkrining[i].objectfk == "HMD-000048") {
									$scope.noRecfrekuensi= $scope.dataSkrining[i].norec
									$scope.item.frekuensi = $scope.dataSkrining[i].nilai

								}
							}
						}
					})
			}
			$scope.getdata();


			$scope.Save = function () {
				var tempData = [];

				if ($scope.item.beratBadanPost !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecberatBadanPost,
						objectfk: "HMD-000001",
						nilai: $scope.item.beratBadanPost,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.tekananDarah !== undefined) {
					var tmpForPush = {
						norec: $scope.noRectekananDarah,
						objectfk: "HMD-000002",
						nilai: $scope.item.tekananDarah,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.beratBadanKering !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecberatBadanKering,
						objectfk: "HMD-000003",
						nilai: $scope.item.beratBadanKering,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.keadaanUmum !== undefined) {
					var tmpForPush = {
						norec: $scope.noReckeadaanUmum,
						objectfk: "HMD-000004",
						nilai: $scope.item.keadaanUmum,
						satuan: "-",
						jenisobject: "radio button"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.edema !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecedema,
						objectfk: "HMD-000005",
						nilai: $scope.item.edema,
						satuan: "-",
						jenisobject: "radio button"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.konjuctiva !== undefined) {
					var tmpForPush = {
						norec: $scope.noReckonjuctiva,
						objectfk: "HMD-000006",
						nilai: $scope.item.konjuctiva,
						satuan: "-",
						jenisobject: "radio button"
					}
					tempData.push(tmpForPush);
				}

				// add pernapasan
				$scope.tempPernapasan.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.noRecTidakSesak,
							objectfk: "HMD-000007",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.noRecSesak,
							objectfk: "HMD-000008",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.noRecKusmaul,
							objectfk: "HMD-000009",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 4) {
						var tmp = {
							norec: $scope.noRecRetraksi,
							objectfk: "HMD-000010",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 5) {
						var tmp = {
							norec: $scope.noRecTidakRetraksi,
							objectfk: "HMD-000011",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 6) {
						var tmp = {
							norec: $scope.noRecRonkhi,
							objectfk: "HMD-000012",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}


				})


				// add 
				$scope.tempaddVaskuler.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecVaskular,
							objectfk: "HMD-000013",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
				})

				// add 
				$scope.tempHDcatheter.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecSubclavia,
							objectfk: "HMD-000014",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecJugular,
							objectfk: "HMD-000015",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecFemoral,
							objectfk: "HMD-000016",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
				})
				$scope.tempPolaNapasEvaluasi.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecEvNapasFrekuensi,
							objectfk: "HMD-000017",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecEvNapasTidaksesak,
							objectfk: "HMD-000018",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecEvNapasTidakRetraksi,
							objectfk: "HMD-000019",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
				})

				$scope.tempPolaNapasImplementasi.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecImpNapasPosisikan,
							objectfk: "HMD-000020",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecImpNapasIdentifikasi,
							objectfk: "HMD-000021",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecImpNapasPasang,
							objectfk: "HMD-000022",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 4) {
						var tmp = {
							norec: $scope.norecImpNapasMonitor,
							objectfk: "HMD-000023",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 5) {
						var tmp = {
							norec: $scope.norecImpNapasMonitorSuara,
							objectfk: "HMD-000024",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 6) {
						var tmp = {
							norec: $scope.norecImpNapasbronkodilator,
							objectfk: "HMD-000025",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 7) {
						var tmp = {
							norec: $scope.norecImpNapasoksigen,
							objectfk: "HMD-000026",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
				})
				$scope.tempHipervolemiaEvaluasi.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecEvHiperBB,
							objectfk: "HMD-000027",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecEvHiperEdema,
							objectfk: "HMD-000028",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecEvHiperDiuresis,
							objectfk: "HMD-000029",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}

				})
				$scope.tempHipervolemiaImplemnentasi.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecImpHiperKaji,
							objectfk: "HMD-000030",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecImpHiperMonitor,
							objectfk: "HMD-000031",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecImpHiperKolaborasi,
							objectfk: "HMD-000032",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}

				})

				$scope.tempRisikoEvl.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecRisikoEvlNonInfeksi,
							objectfk: "HMD-000033",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecRisikoEvlPasien,
							objectfk: "HMD-000034",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecRisikoEvllekosit,
							objectfk: "HMD-000035",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 4) {
						var tmp = {
							norec: $scope.norecRisikoEvlCRP,
							objectfk: "HMD-000036",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 5) {
						var tmp = {
							norec: $scope.norecRisikoEvlKultur,
							objectfk: "HMD-000037",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
				})

				$scope.tempRisikoImpl.forEach(function (data) {
					if (data.id === 1) {
						var tmp = {
							norec: $scope.norecRisikoImpMengkaji,
							objectfk: "HMD-000038",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 2) {
						var tmp = {
							norec: $scope.norecRisikoImpMencuci,
							objectfk: "HMD-000039",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 3) {
						var tmp = {
							norec: $scope.norecRisikoImpMenggunakan,
							objectfk: "HMD-000040",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 4) {
						var tmp = {
							norec: $scope.norecRisikoImpMeningkatkan,
							objectfk: "HMD-000041",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 5) {
						var tmp = {
							norec: $scope.norecRisikoImpMelakukan,
							objectfk: "HMD-000042",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
			
					if (data.id === 6) {
						var tmp = {
							norec: $scope.norecRisikoMempertahankan,
							objectfk: "HMD-000043",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
					if (data.id === 7) {
						var tmp = {
							norec: $scope.norecRisikoMembatasi,
							objectfk: "HMD-000044",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject: "checkbox"
						}
						tempData.push(tmp);
					}
				})
				if ($scope.item.beratBadanPre !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecBeratPre,
						objectfk: "HMD-000045",
						nilai: $scope.item.beratBadanPre,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.suhu !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecsuhu,
						objectfk: "HMD-000046",
						nilai: $scope.item.suhu,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.nadi !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecnadi,
						objectfk: "HMD-000047",
						nilai: $scope.item.nadi,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}
				if ($scope.item.frekuensi !== undefined) {
					var tmpForPush = {
						norec: $scope.noRecfrekuensi,
						objectfk: "HMD-000048",
						nilai: $scope.item.frekuensi,
						satuan: "-",
						jenisobject: "textbox"
					}
					tempData.push(tmpForPush);
				}

				for (var i = tempData.length - 1; i >= 0; i--) {
					if (tempData[i].nilai == undefined) {
						tempData.splice([i], 1)
					}
					if (tempData[i].norec == undefined) {
						tempData[i].norec = '-'
					}
				}

				var jsonSave = {
					data: tempData,
					noregistrasifk: $state.params.noRec,
					riwayatpapfk: $scope.noRecPap
				}
				ManagePhp.saveData(jsonSave).then(function (e) {
					$scope.tempPolaNapasImplementasi = [];
					$scope.tempPolaNapasEvaluasi = [];
					$scope.tempHipervolemiaImplemnentasi = [];
					$scope.tempHipervolemiaEvaluasi = [];
					$scope.tempRisikoImpl = [];
					$scope.tempRisikoEvl = [];
					$scope.tempaddVaskuler = [];

					$scope.tempHDcatheter = [];
					$scope.tempPernapasan = [];
					$scope.getdata();
					 ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Pengkajian Hemodialisa').then(function (res) {
           			 })
				});
			}
			$scope.tempPolaNapasImplementasi = [];
			$scope.addPolaNapasImplementasi = function (bool, data) {
				var index = $scope.tempPolaNapasImplementasi.indexOf(data);
				if (_.filter($scope.tempPolaNapasImplementasi, {
					id: data.id
				}).length === 0)
					$scope.tempPolaNapasImplementasi.push(data);
				else {
					$scope.tempPolaNapasImplementasi.splice(index, 1);
				}
			}
			$scope.tempPolaNapasEvaluasi = [];
			$scope.addPolaNapasEvaluasi = function (bool, data) {
				var index = $scope.tempPolaNapasEvaluasi.indexOf(data);
				if (_.filter($scope.tempPolaNapasEvaluasi, {
					id: data.id
				}).length === 0)
					$scope.tempPolaNapasEvaluasi.push(data);
				else {
					$scope.tempPolaNapasEvaluasi.splice(index, 1);
				}
			}

			$scope.tempHipervolemiaImplemnentasi = [];
			$scope.addHipervolemiaImplementasi = function (bool, data) {
				var index = $scope.tempHipervolemiaImplemnentasi.indexOf(data);
				if (_.filter($scope.tempHipervolemiaImplemnentasi, {
					id: data.id
				}).length === 0)
					$scope.tempHipervolemiaImplemnentasi.push(data);
				else {
					$scope.tempHipervolemiaImplemnentasi.splice(index, 1);
				}
			}
			$scope.tempHipervolemiaEvaluasi = [];
			$scope.addHipervolemiaEvaluasi = function (bool, data) {
				var index = $scope.tempHipervolemiaEvaluasi.indexOf(data);
				if (_.filter($scope.tempHipervolemiaEvaluasi, {
					id: data.id
				}).length === 0)
					$scope.tempHipervolemiaEvaluasi.push(data);
				else {
					$scope.tempHipervolemiaEvaluasi.splice(index, 1);
				}
			}
			$scope.tempRisikoImpl = [];
			$scope.addRisikoImpl = function (bool, data) {
				var index = $scope.tempRisikoImpl.indexOf(data);
				if (_.filter($scope.tempRisikoImpl, {
					id: data.id
				}).length === 0)
					$scope.tempRisikoImpl.push(data);
				else {
					$scope.tempRisikoImpl.splice(index, 1);
				}
			}
			$scope.tempRisikoEvl = [];
			$scope.addRisikoEvl = function (bool, data) {
				var index = $scope.tempRisikoEvl.indexOf(data);
				if (_.filter($scope.tempRisikoEvl, {
					id: data.id
				}).length === 0)
					$scope.tempRisikoEvl.push(data);
				else {
					$scope.tempRisikoEvl.splice(index, 1);
				}
			}

			$scope.tempaddVaskuler = [];
			$scope.addVaskuler = function (bool, data) {
				var index = $scope.tempaddVaskuler.indexOf(data);
				if (_.filter($scope.tempaddVaskuler, {
					id: data.id
				}).length === 0)
					$scope.tempaddVaskuler.push(data);
				else {
					$scope.tempaddVaskuler.splice(index, 1);
				}
			}

			$scope.tempHDcatheter = [];
			$scope.addHDcatheter = function (bool, data) {
				var index = $scope.tempHDcatheter.indexOf(data);
				if (_.filter($scope.tempHDcatheter, {
					id: data.id
				}).length === 0)
					$scope.tempHDcatheter.push(data);
				else {
					$scope.tempHDcatheter.splice(index, 1);
				}
			}
			$scope.tempPernapasan = [];
			$scope.addPernapasan = function (bool, data) {
				var index = $scope.tempPernapasan.indexOf(data);
				if (_.filter($scope.tempPernapasan, {
					id: data.id
				}).length === 0)
					$scope.tempPernapasan.push(data);
				else {
					$scope.tempPernapasan.splice(index, 1);
				}
			}




		}
	]);
});