define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('InformasiJadwalDokterCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'InformasiDokter', 'InformasiRuangan', 'TampilPenghargaan', '$state', 'ModelItemAkuntansi',
		function ($rootScope, $scope, ModelItem, dateHelper, InformasiDokter, InformasiRuangan, TampilPenghargaan, $state, modelItemAkuntansi) {
			$scope.item = {};
			$scope.dataJadwalDokter = {};
			$scope.grishoW = false;
			$scope.now = new Date();
			$scope.today = dateHelper.DescDay($scope.now);
			let dataPegawai = JSON.parse(localStorage.getItem("pegawai"));
			let getJenisPegawai = dataPegawai.jenisPegawai.jenispegawai ? dataPegawai.jenisPegawai.jenispegawai : dataPegawai.jenisPegawai.jenisPegawai;
			let idDokter = dataPegawai.id;
			$scope.isRouteLoading = false;
			var Awal = moment($scope.now).format('YYYY-MM-DD 00:00')
			loadDataCombo();
			$scope.hideFiltering = getJenisPegawai === "DOKTER";

			$scope.monthSelectorOptions = {
				start: "year",
				depth: "year"
			};

			$scope.opsiGridSip = {
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				pageable: true,
				selectable: "row",
				scrollable: false,
				columns: [{
					"field": "tglpraktik",
					"title": "Tanggal Praktek",
					"width": "100px",
				}, {
					"field": "namahari",
					"title": "Hari",
					"width": "100px",
				}, {
					"field": "namalengkap",
					"title": "Nama Dokter",
					"width": "100px",
				}, {
					"field": "namaruangan",
					"title": "Nama Ruangan",
					"width": "100px",
				}, {
					"field": "jampraktek",
					"title": "Jam Praktek",
					"width": "100px",
				}, {
					"field": "quota",
					"title": "Kuota",
					"width": "100px",
				}, {
					"field": "status",
					"title": "Status",
					"width": "100px",
				}, ]
			};

			function loadDataCombo() {
				modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function (data) {
					$scope.listdokter = data;
				});

				modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function (dat) {
					$scope.ListRuangan = dat.ruangan;
				});
				// LoadData();
			}

			function LoadData() {
				let datatemp = [];
				var tglAwal = moment($scope.item.bulan).format('YYYY-MM-DD 00:00')
				var tglAkhir = moment($scope.now).format('YYYY-MM-DD 23:59')
				$scope.isRouteLoading = true;

				var dokter = "";
				if ($scope.item.dokter != undefined) {
					dokter = $scope.item.dokter.id
				}
				var ruangan = "";
				if ($scope.item.ruangan != undefined) {
					ruangan = $scope.item.ruangan.id
				}
				modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-jadwal-dokter?" +
					"tglAwal=" + tglAwal +
					"&tglAkhir=" + tglAkhir +
					"&dokterId=" + dokter +
					"&ruanganId=" + ruangan, true).then(function (dat) {
					var datas = dat.callback;
					$scope.sourceJadwal = new kendo.data.DataSource({
						data: datas, //data[0].details,
						// pageSize: 20,
						group: [{
							field: "namaruangan"
						}],
						// pageSize: 10,
					});
				});
			}

			$scope.columndata = [{
					"field": "namalengkap",
					"title": "Dokter",
					"width": "120px"
				},
				{
					"field": "start",
					"title": "Jadwal Awa",
					"width": "120px"
				},
				{
					"field": "end",
					"title": "Jadwal Akhir",
					"width": "100px"

				}
			];

			$scope.getData = () => {
				// if (!$scope.item.dokter) {
				// 	toastr.warning("Harap isi nama Dokter");
				// 	return;
				// }
				var datatemp = [];
				let bln = new Date($scope.item.bulan).getMonth(),
					thn = new Date($scope.item.bulan).getFullYear()

				$scope.isRouteLoading = false;

				$.ajax({
					url: "http://192.168.12.3:5775/kehadiranpasien-service/get-jml-pasien-dokter?X-AUTH-TOKEN=234567890kjdsfkjf&idDokter=" + ($scope.item.dokter ? $scope.item.dokter.id : "") + "&idRuangan=" + ($scope.item.ruangan ? $scope.item.ruangan.id : "") + "&bulan=" + ($scope.item.bulan ? bln + 1 : "") + "&tahun=" + ($scope.item.bulan ? thn : ""),
					method: "GET",
					success: (data) => {
						console.log(data);
						$scope.jmlPasienDokter = data;
					}
				})

				modelItemAkuntansi.getDataTableTransaksi('humas/get-data-jadwal?bulan=' + ($scope.item.bulan ? bln + 1 : "") + '&tahun=' + ($scope.item.bulan ? thn : "") + '&ruangan=' + ($scope.item.ruangan ? $scope.item.ruangan.id : "") + '&dokterId=' + ($scope.item.dokter ? $scope.item.dokter.id : "")).then(data => {
					for (var i = 0; i < data.length; i++) {

						for (let ii = 0; ii < $scope.jmlPasienDokter.length; ii++) {
							if (data[i].jampraktek === $scope.jmlPasienDokter[ii].jamPraktik) {
								data[i].sisaQuota = $scope.jmlPasienDokter[ii].sisaQuota;
								data[i].jmlAktivasi = $scope.jmlPasienDokter[ii].jmlAktivasi;
								data[i].jmlDaftar = $scope.jmlPasienDokter[ii].jmlDaftar;
							}
						}

						let listJamPraktek = data[i].jampraktek.split('-');
						let tglPraktik = dateHelper.formatDate(data[i].tglpraktik, 'YYYY-MM-DD');

						// start: "2020-08-09 07:30:00"
						let end = tglPraktik + ' ' + listJamPraktek[1],
							start = tglPraktik + ' ' + listJamPraktek[0];

						data[i].no = i + 1
						datatemp.push({
							"id": data[i].no,
							"title": data[i].namaruangan + ' ' + ':' + ' ' + data[i].namalengkap ,
							"quota":data[i].quota,
							"sisaQuota":data[i].sisaQuota,
							"jmlAktivasi":data[i].jmlAktivasi,
							"jmlDaftar":data[i].jmlDaftar,
							// "pegawaiid": datas[i].pegawaiid,
							"namalengkap": data[i].namalengkap,
							// "ruanganid": datas[i].ruanganid,
							"namaruangan": data[i].namaruangan,
							// "tanggaljadwal": datas[i].tanggaljadwal,
							"start": start,
							"end": end,
							// "startepoch": '\/date(' +  datas[i].startepoch + ')\/',
							// "endpoch": '\/date(' + datas[i].endpoch + ')\/',
							"Description": "Jadwal Dokter",
							// "StartTimezone": null,
							// "EndTimezone": null,
							// "RecurrenceRule": null,
							// "RecurrenceID": null,
							// "RecurrenceException": null,
							// "IsAllDay": false
						});
					}

					console.log("combined => ", data);

					$scope.schedulerOptions = {
						date: new Date(Awal),
						messages: {
							event:"Jadwal Dokter"
						},
						// startTime: new Date(Awal),
						height: 600,
						views: [
							"day",
							"week",
							"workWeek",
							"agenda",
							{
								type: "month",
								selected: true,
								allDaySlot: false
							},
							{
								selectedDateFormat: "{0:dd-MM-yyyy}"
							}
						],
						eventTemplate: `<span class='custom-event'>Quota : {{dataItem.quota}}</span>
										<span class='custom-event'>Jumlah Aktivasi : {{dataItem.jmlAktivasi}}</span>
										<span class='custom-event'>Jumlah Daftar : {{dataItem.jmlDaftar}}</span>
										<span class='custom-event'>Sisa Quota : {{dataItem.sisaQuota}}</span>`,
						// allDayEventTemplate: "<div class='custom-all-day-event'>{{dataItem.quota}}</div>",
						// timezone: "Indonesia/Jakarta",
						dataSource: datatemp,
						resources: [{
							field: "namaruangan",
							dataSource: datatemp,
							title: "namaruangan"
						}]
					};

					// $scope.dataJadwalDokter.senin = [];
					// $scope.dataJadwalDokter.selasa = [];
					// $scope.dataJadwalDokter.rabu = [];
					// $scope.dataJadwalDokter.kamis = [];
					// $scope.dataJadwalDokter.jumat = [];
					// $scope.dataJadwalDokter.sabtu = [];
					// $scope.dataJadwalDokter.minggu = [];

					// for (let i in data) {
					// 	// data[i].namahari = data[i].namahari.toLowerCase();
					// 	// console.log(i, data[i]);

					// 	switch (data[i].namahari) {
					// 		case "SENIN":
					// 			$scope.dataJadwalDokter.senin.push(data[i]);
					// 			break;
					// 		case "SELASA":
					// 			$scope.dataJadwalDokter.selasa.push(data[i]);
					// 			break;
					// 		case "RABU":
					// 			$scope.dataJadwalDokter.rabu.push(data[i]);
					// 			break;
					// 		case "KAMIS":
					// 			$scope.dataJadwalDokter.kamis.push(data[i]);
					// 			break;
					// 		case "JUMAT":quota
					// 			$scope.dataJadwalDokter.jumat.push(data[i]);
					// 			break;
					// 		case "SABTU":
					// 			$scope.dataJadwalDokter.sabtu.push(data[i]);
					// 			break;
					// 		case "MINGGU":
					// 			$scope.dataJadwalDokter.minggu.push(data[i]);
					// 			break;
					// 		default:
					// 			break;
					// 	}
					// }

					// $scope.dataGrid = new kendo.data.DataSource({
					// 	data: res,
					// 	pageSize: 20
					// })

					$scope.isRouteLoading = false;
				})
			}
			// $scope.getData();

			$scope.SearchData = function () {
				// idDokter = $scope.item.dokter ? $scope.item.dokter.id : "";
				// LoadData();
				$scope.getData();
			}
		}
	]);
});