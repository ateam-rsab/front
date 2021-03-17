define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SkriningGiziAnakRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper', 'ManagePhp',
		function ($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper, ManagePhp) {
			// debugger;

			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;
			$scope.item = {};
			$scope.arrSkriningGiziAnak = [];
			$scope.pasienAnak = {};
			var norecPap = '';
			loadCache()
			function loadCache() {
				var cache = cacheHelper.get('noRecPap');
				if (cache != undefined) {
					norecPap = cache

				}
			}

			$scope.title = "Daftar penyakit atau keadaan yang beresiko mengakibatkan malnutrisi";

			$scope.skriningGiziAnak = [
				{ "name": "Berat Badan", "nilai": "", "type": "numeric", "ket": "Kg", "noRec": "" },
				{ "name": "Tinggi Badan", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" },
				{ "name": "Lingkar Kepala", "nilai": "", "type": "numeric", "ket": "Cm", "noRec": "" }
			];

			$scope.opsiYaTidak = [
				// maipulasi data detil skrining obstetri
				{ "id": 67, "nama": "Tidak", "descNilai": "0", "value": false },
				{ "id": 66, "nama": "Ya", "descNilai": "1", "value": true }
			];

			$scope.opsiYaTidak4 = [
				// maipulasi data detil skrining obstetri
				{ "id": 69, "nama": "Tidak", "descNilai": "0", "value": false },
				{ "id": 68, "nama": "Ya", "descNilai": "2", "value": true }
			];

			$scope.listPertanyaan = [
				{ id: 1, nama: "Apakah pasien memiliki status nutrisi kurang atau buruk secara klinis? (anak kurus/sangat kurus, mata cekung, wajah tampak tua, edema, rambut tipis dan jarang, otot lengan dan paha tipis, iga gambang, perut kempes, bokong tipis dan kisut)" },
				{ id: 2, nama: "Apakah terdapat penurunan berat badan selama 1 bulan? atau Untuk bayi <1 tahun berat badan tidak naik selama 3 bulan? (jika pasien menjawab tidak tahu, di anggap jawaban ya" },
				{ id: 3, nama: "Apakah terdapat salah satu dari kondisi berikut? Diare profuse (>5x/hari) dan atau muntah (>3x/hari), Asupan makan berkurang selama 1 minggu terakhir" },
				{ id: 4, nama: "Apakah terdapat penyakit dasar atau keadaan yang mengakibatkan pasien beresiko mengalamai malnutrisi" }
			];

			$scope.listDataPenyakit = [
				{ nama: "Diare persisten (>= 2 minggu)", id: 1 },
				{ nama: "Wajah dismorfik (aneh)", id: 2 },
				{ nama: "Luka bakar", id: 3 },
				{ nama: "Prematuritas", id: 4 },
				{ nama: "Infeksi HIV", id: 5 },
				{ nama: "Penyakit ginjal kronik", id: 6 },
				{ nama: "Trauma", id: 7 },
				{ nama: "Penyakit metabolik", id: 8 },
				{ nama: "Rencana operasi mayor", id: 9 },
				{ nama: "Penyakit jantung bawaan", id: 10 },
				{ nama: "Kanker", id: 11 },
				{ nama: "Penyakit paru kronik", id: 12 },
				{ nama: "Konstipasi berulang", id: 13 },
				{ nama: "Retardasi metabolik", id: 14 },
				{ nama: "Obesitas", id: 15 },
				{ nama: "Penyakit hati kronik", id: 16 },
				{ nama: "Kelainan bawaan 1 atau lebih (Celah bibir dan langit, atresia ani dll)", id: 17 },
				{ nama: "Terdapat stoma usus halus", id: 18 },
				{ nama: "Gagal tumbuh (ukuran pendek dan mungil)", id: 19 },
				{ nama: "Keterlambatan perkembangan", id: 20 },
				{
					nama: "Penyakit akut berat", id: 21,
					detail: [
						{ nama: "Paru (Pneumonia, asma, dll)", id: 1 },
						{ nama: "Hati (Hepatitis, dll)", id: 2 },
						{ nama: "Ginjal (GGA, GNA, dll)", id: 3 }
					]
				}
			];

			$scope.setSoal = function () {
				$scope.listPertanyaan.forEach(function (items) {
					if (items.id == 1) {
						$scope.pasienAnak.nutrisiBuruk = items
					}
					if (items.id == 2) {
						$scope.pasienAnak.beratBadan = items
					}
					if (items.id == 3) {
						$scope.pasienAnak.kondisiTertentu = items
					}
					if (items.id == 4) {
						$scope.pasienAnak.resikoMalnutrisi = items
					}
				})
			}
			$scope.setSoal();

			var getTotal = function () {
				var skorAwal = 0;
				$scope.arrSkriningGiziAnak.forEach(function (data) {
					skorAwal += parseInt(data.descNilai);
				})
				$scope.totalSkor = skorAwal
			};

			$scope.getdata = function () {
				var objectfk = "SGA";
				var noregistrasifk = $state.params.noRec;
				var status = "t";
				ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk=" + noregistrasifk + '&objectfk=' + objectfk
					+ '&riwayatfk=' + norecPap).then(function (e) {
						$scope.dataSkrining = e.data.data;
						if ($scope.dataSkrining.length != 0) {
							for (var i = 0; i < $scope.dataSkrining.length; i++) {
								if ($scope.dataSkrining[i].objectfk == "SGA-000001") {
									$scope.noRecBB = $scope.dataSkrining[i].norec
									$scope.skriningGiziAnak[0].nilai = parseFloat($scope.dataSkrining[i].nilai)
								}
								if ($scope.dataSkrining[i].objectfk == "SGA-000002") {
									$scope.noRecTB = $scope.dataSkrining[i].norec
									$scope.skriningGiziAnak[1].nilai = parseFloat($scope.dataSkrining[i].nilai)
								}
								if ($scope.dataSkrining[i].objectfk == "SGA-000003") {
									$scope.noRecLK = $scope.dataSkrining[i].norec
									$scope.skriningGiziAnak[2].nilai = parseFloat($scope.dataSkrining[i].nilai)
								}
								if ($scope.dataSkrining[i].objectfk == "SGA-000006") {
									$scope.noRecSoalSatu = $scope.dataSkrining[i].norec;
									$scope.dataSoalSatu = $scope.dataSkrining[i].nilai;
								}
								if ($scope.dataSkrining[i].objectfk == "SGA-000007") {
									$scope.noRecSoalDua = $scope.dataSkrining[i].norec;
									$scope.dataSoalDua = $scope.dataSkrining[i].nilai;
								}
								if ($scope.dataSkrining[i].objectfk == "SGA-000008") {
									$scope.noRecSoalTiga = $scope.dataSkrining[i].norec;
									$scope.dataSoalTiga = $scope.dataSkrining[i].nilai;
								}
								if ($scope.dataSkrining[i].objectfk == "SGA-000009") {
									$scope.noRecSoalEmpat = $scope.dataSkrining[i].norec;
									$scope.dataSoalEmpat = $scope.dataSkrining[i].nilai;
								}
							}
						}
						if ($scope.dataSoalSatu == "true") {
							$scope.item.dataSoalSatu = true
							var temp = {
								"id": 66,
								"idParent": 1,
								"descNilai": '1',
								"value": true
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalSatu == "false") {
							$scope.item.dataSoalSatu = false
							var temp = {
								"id": 67,
								"idParent": 1,
								"descNilai": '0',
								"value": false
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalDua == "true") {
							$scope.item.dataSoalDua = true
							var temp = {
								"id": 66,
								"idParent": 2,
								"descNilai": '1',
								"value": true
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalDua == "false") {
							$scope.item.dataSoalDua = false
							var temp = {
								"id": 67,
								"idParent": 2,
								"descNilai": '0',
								"value": false
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalTiga == "true") {
							$scope.item.dataSoalTiga = true
							var temp = {
								"id": 66,
								"idParent": 3,
								"descNilai": '1',
								"value": true
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalTiga == "false") {
							$scope.item.dataSoalTiga = false
							var temp = {
								"id": 67,
								"idParent": 3,
								"descNilai": '0',
								"value": false
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalEmpat == "true") {
							$scope.item.dataSoalEmpat = true
							var temp = {
								"id": 66,
								"idParent": 4,
								"descNilai": '2',
								"value": true
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						if ($scope.dataSoalEmpat == "false") {
							$scope.item.dataSoalEmpat = false
							var temp = {
								"id": 67,
								"idParent": 4,
								"descNilai": '0',
								"value": false
							}
							$scope.arrSkriningGiziAnak.push(temp)
						}
						getTotal();
					})

			};

			$scope.getdata();

			$scope.cekSkor = function (data, stat) {
				var result = $.grep($scope.arrSkriningGiziAnak, function (e) {
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"value": stat.value
				}
				if (result.length == 0) {
					$scope.arrSkriningGiziAnak.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrSkriningGiziAnak.length; i++)
						if ($scope.arrSkriningGiziAnak[i].idParent && $scope.arrSkriningGiziAnak[i].idParent === data.id) {
							$scope.arrSkriningGiziAnak.splice(i, 1);
							break;
						}
					$scope.arrSkriningGiziAnak.push(tempData);
				}
				getTotal();
			}
			// simpan data
			$scope.Save = function () {
				var dataForm = [
					{
						norec: $scope.noRecBB,
						objectfk: "SGA-000001",
						nilai: $scope.skriningGiziAnak[0].nilai == null ? "" : $scope.skriningGiziAnak[0].nilai,
						satuan: "Kg",
						jenisobject: "textbox"
					},
					{
						norec: $scope.noRecTB,
						objectfk: "SGA-000002",
						nilai: $scope.skriningGiziAnak[1].nilai == null ? "" : $scope.skriningGiziAnak[1].nilai,
						satuan: "Cm",
						jenisobject: 'textbox'
					},
					{
						norec: $scope.noRecLK,
						objectfk: "SGA-000003",
						nilai: $scope.skriningGiziAnak[2].nilai == null ? "" : $scope.skriningGiziAnak[2].nilai,
						satuan: "Cm",
						jenisobject: "textbox"
					}
				]
				$scope.arrSkriningGiziAnak.forEach(function (data) {
					if (data.idParent == 1) {
						var dataSoal = {
							norec: $scope.noRecSoalSatu,
							objectfk: "SGA-000006",
							nilai: data.value.toString(),
							satuan: "-",
							jenisobject: "radio button"
						}
					}
					if (data.idParent == 2) {
						var dataSoal = {
							norec: $scope.noRecSoalDua,
							objectfk: "SGA-000007",
							nilai: data.value.toString(),
							satuan: "-",
							jenisobject: "radio button"
						}
					}
					if (data.idParent == 3) {
						var dataSoal = {
							norec: $scope.noRecSoalTiga,
							objectfk: "SGA-000008",
							nilai: data.value.toString(),
							satuan: "-",
							jenisobject: "radio button"
						}
					}
					if (data.idParent == 4) {
						var dataSoal = {
							norec: $scope.noRecSoalEmpat,
							objectfk: "SGA-000009",
							nilai: data.value.toString(),
							satuan: "-",
							jenisobject: "radio button"
						}
					}
					dataForm.push(dataSoal)
				});

				for (var i = dataForm.length - 1; i >= 0; i--) {
					if (dataForm[i].nilai == undefined) {
						dataForm.splice([i], 1)
					}
					if (dataForm[i].norec == undefined) {
						dataForm[i].norec = '-'
					}

				}
				var jsonSave = {
					data: dataForm,
					noregistrasifk: $state.params.noRec,
					riwayatpapfk: norecPap
				}
				ManagePhp.saveData(jsonSave).then(function (e) {
					$scope.arrSkriningGiziAnak = [];
					$scope.getdata();
					ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Skrining Gizi Anak').then(function (res) {
                    })
				});
			}

		}
	]);
});