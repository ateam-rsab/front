define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('CheckListMFKCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, ManageSarpras) {
			ModelItem.get("AplikasiK3/CheckListMFK").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.tglInput = new Date();
				$scope.dataVOloaded = true;
				$scope.tab = 1;
				// $scope.dataAlarm = [
				// {
				// 	id:1, itemPeriksa:"Jumlah alarm berbunyi"
				// },
				// {
				// 	id:2, itemPeriksa:"Jumlah false alarm"
				// },
				// {
				// 	id:3, itemPeriksa:"Jumlah titik alarm"
				// },
				// {
				// 	id:4, itemPeriksa:"Jumlah titik alarm yang tidak berfungsi"
				// }]

				// $scope.dataApar = [
				// 	{
				// 		id: 5, itemPeriksa: "Jumlah APAR total"
				// 	},
				// 	{
				// 		id: 6, itemPeriksa: "Jumlah APAR yang diinspeksi pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 7, itemPeriksa: "Jumlah APAR yang tidak memenuhi syarat"
				// 	},
				// 	{
				// 		id: 8, itemPeriksa: "Jumlah APAR yang terpakai pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 9, itemPeriksa: "Jumlah APAR yang terpasang pada tempatnya"
				// 	},
				// 	{
				// 		id: 10, itemPeriksa: "Jumlah HYDRANT total"
				// 	},
				// 	{
				// 		id: 11, itemPeriksa: "Jumlah HYDRANT yang diinspeksi pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 12, itemPeriksa: "Jumlah HYDRANT yang tidak memenuhi syarat"
				// 	},
				// 	{
				// 		id: 13, itemPeriksa: "Jumlah HYDRANT yang terpakai pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 14, itemPeriksa: "Jumlah Nozzle HYDRANT yang terpasang pada tempatnya"
				// 	}
				// 	,
				// 	{
				// 		id: 15, itemPeriksa: "Jumlah SPRINKLER total"
				// 	},
				// 	{
				// 		id: 16, itemPeriksa: "Jumlah SPRINKLER yang diinspeksi pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 17, itemPeriksa: "Jumlah SPRINKLER yang tidak memenuhi syarat"
				// 	},
				// 	{
				// 		id: 18, itemPeriksa: "Jumlah SPRINKLER yang terpakai pada bulan berjalan"
				// 	}
				// ]

				// $scope.dataInsiden = [
				// 	{
				// 		id: 19, itemPeriksa: "Jumlah Insiden kebakaran pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 20, itemPeriksa: "Jumlah korban kebakaran yang meninggal/ cacat"
				// 	},
				// 	{
				// 		id: 21, itemPeriksa: "Jumlah korban kebakaran yang luka - luka"
				// 	},
				// 	{
				// 		id: 22, itemPeriksa: "Jumlah lantai yang terdampak kebakaran"
				// 	},
				// 	{
				// 		id: 23, itemPeriksa: "Jumlah insiden keselamatan kerja pada bulan berjalan (Co: Jatuh, terpeleset, tertusuk, terpotong, tabrakan, tertimpa, kecelakaan"
				// 	},
				// 	{
				// 		id: 24, itemPeriksa: "Jumlah korban kecelakaan kerja yang meninggal/ cacat"
				// 	},
				// 	{
				// 		id: 25, itemPeriksa: "Jumlah korban kecelakaan kerja yang dirawat inap"
				// 	},
				// 	{
				// 		id: 26, itemPeriksa: "Jumlah korban kecelakaan kerja yang dirawat jalan"
				// 	},
				// 	{
				// 		id: 27, itemPeriksa: "Jumlah alat kerja yang terdampak oleh kecelakaan kerja"
				// 	},
				// 	{
				// 		id: 28, itemPeriksa: "Jumlah investigasi yang sudah selesai dilakukan terhadap kebakaran dan kecelakaan kerja"
				// 	}
				// ]

				// $scope.dataKeselamatanKerja = [
				// 	{
				// 		id: 29, itemPeriksa: "Jumlah pegawai gedung"
				// 	},
				// 	{
				// 		id: 30, itemPeriksa: "Jumlah pekerja outsource gedung"
				// 	},
				// 	{
				// 		id: 31, itemPeriksa: "Jumlah pegawai & outsource yang sudah mendapat orientasi keselamatan kerja"
				// 	},
				// 	{
				// 		id: 32, itemPeriksa: "Jumlah kotak P3K"
				// 	},
				// 	{
				// 		id: 33, itemPeriksa: "Jumlah Kotak P3K yang diinspeksi pada bulan berjalan"
				// 	},
				// 	{
				// 		id: 34, itemPeriksa: "Jumlah Kotak P3K yang ditemukan obat ED"
				// 	},
				// 	{
				// 		id: 35, itemPeriksa: "Jumlah Kotak P3K yang isinya sesuai daftar"
				// 	}
				// ]

				$scope.alarmData = new kendo.data.DataSource({
					data: [],
					schema: {
						model: {
							id: "id",
							fields: {
								itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
								keterangan: { editable: true, nullable: true, validation: { required: false } },

							}
						}
					},
					editable: true
				});

				$scope.aparData = new kendo.data.DataSource({
					data: [],
					schema: {
						model: {
							id: "id",
							fields: {
								itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
								keterangan: { editable: true, nullable: true, validation: { required: false } },

							}
						}
					},
					editable: true
				});

				$scope.insidenData = new kendo.data.DataSource({
					data: [],
					schema: {
						model: {
							id: "id",
							fields: {
								itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
								keterangan: { editable: true, nullable: true, validation: { required: false } },

							}
						}
					},
					editable: true
				});

				$scope.keselamatanKerjaData = new kendo.data.DataSource({
					data: [],
					schema: {
						model: {
							id: "id",
							fields: {
								itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
								keterangan: { editable: true, nullable: true, validation: { required: false } },

							}
						}
					},
					editable: true
				});

				$scope.areaBebasAsapRokokData = new kendo.data.DataSource({
					data: [],
					schema: {
						model: {
							id: "id",
							fields: {
								itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
								keterangan: { editable: true, nullable: true, validation: { required: false } },

							}
						}
					},
					editable: true
				});

				$scope.pekerjaanKonstruksiRenovasiData = new kendo.data.DataSource({
					data: [],
					schema: {
						model: {
							id: "id",
							fields: {
								itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
								jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
								keterangan: { editable: true, nullable: true, validation: { required: false } },

							}
						}
					},
					editable: true
				});


				//tab 1
				$scope.alarmGridOptions = {
					dataSource: $scope.alarmData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Alarm</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.aparGridOptions = {
					dataSource: $scope.aparData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>APAR</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.insidenGridOptions = {
					dataSource: $scope.insidenData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Insiden</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.keselamatanKerjaGridOptions = {
					dataSource: $scope.keselamatanKerjaData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Keselamatan Kerja</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.bebasAsapGridOptions = {
					dataSource: $scope.areaBebasAsapRokok,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Area Bebas Asap Rokok</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.pekerjaanGridOptions = {
					dataSource: $scope.pekerjaanKonstruksiRenovasi,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Pekerjaan Konstruksi / Renovasi</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				//tab 2
				$scope.kodeKedaruratanDataGridOptions = {
					dataSource: $scope.kodeKedaruratanData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Kode Kedaruratan</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.saranaEvakuasiGridOptions = {
					dataSource: $scope.saranaEvakuasiData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Sarana Evakuasi</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				//tab 3
				$scope.petugasKeamananGridOptions = {
					dataSource: $scope.petugasKeamananData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Petugas Keamanan</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.insidenSecGridOptions = {
					dataSource: $scope.insidenSecData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Insiden</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.lostFoundGridOptions = {
					dataSource: $scope.lostFoundData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Lost & Found</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.idCardGridOptions = {
					dataSource: $scope.idCardData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>ID Card</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.responTimeGridOptions = {
					dataSource: $scope.responTimeData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Response Time</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				//tab 4

				$scope.pemeliharaanRutinGridOptions = {
					dataSource: $scope.pemeliharaanRutinData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Pemeliharaan Rutin</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.perbaikanGridOptions = {
					dataSource: $scope.perbaikanData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Perbaikan</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.kalibrasiGridOptions = {
					dataSource: $scope.kalibrasiData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Kalibrasi</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.suhuKelembabanTekananGridOptions = {
					dataSource: $scope.suhuKelembabanTekananData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Suhu Kelembaban Tekanan</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				//tab 5
				$scope.tumpahanBahanKimiaGridOptions = {
					dataSource: $scope.tumpahanBahanKimiaData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Tumpahan Bahan Kimia</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.insidenHazGridOptions = {
					dataSource: $scope.insidenHazData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Insiden</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.petugasKebersihanGridOptions = {
					dataSource: $scope.petugasKebersihanData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Petugas Kebersihan</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				//tab 6
				$scope.gasMedisGridOptions = {
					dataSource: $scope.gasMedisData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Gas Medis</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.listrikGridOptions = {
					dataSource: $scope.listrikData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Listrik</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.airGridOptions = {
					dataSource: $scope.airData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Air</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.saluranPembuanganGridOptions = {
					dataSource: $scope.saluranPembuanganData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Saluran Pembuangan</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.pendinginUdaraGridOptions = {
					dataSource: $scope.pendinginUdaraData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Pendingin Udara</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.liftGridOptions = {
					dataSource: $scope.liftData,
					pageable: false,
					columns: [
						{
							"field": "itemPeriksa",
							"title": "<center>Lift</center>",
							"width": "350px"
						},
						{
							"field": "jumlah",
							"title": "<center>Jumlah</center>",
							"width": "150px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-ruangan").then(function (dat) {
					$scope.listRuangan = dat.data.data.listRuangan;
				})

				var init = function (data) {
					// debugger;
					if (data == 1) {
						ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-kelompokLpj-gedung?k3FacillityCheckId=" + data).then(function (dat) {
							debugger;
							$scope.alarmData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.aparData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.insidenData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.keselamatanKerjaData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.areaBebasAsapRokokData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.pekerjaanKonstruksiRenovasiData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});


							dat.data.data.listKelompok[2].Alarm.forEach(function (datas) {
								$scope.alarmData.add(datas);
							});
							dat.data.data.listKelompok[3].APAR.forEach(function (datas) {
								$scope.aparData.add(datas);
							});
							dat.data.data.listKelompok[4].Insiden.forEach(function (datas) {
								$scope.insidenData.add(datas);
							});
							dat.data.data.listKelompok[1].KeselamatanKerja.forEach(function (datas) {
								$scope.keselamatanKerjaData.add(datas);
							});
							dat.data.data.listKelompok[0].AreaBebasAsapRokok.forEach(function (datas) {
								$scope.areaBebasAsapRokokData.add(datas);
							});
							dat.data.data.listKelompok[5].PekerjaanKonstruksiRenovasi.forEach(function (datas) {
								$scope.pekerjaanKonstruksiRenovasiData.add(datas);
							});
						})
					} else if (data == 2) {
						ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-kelompokLpj-gedung?k3FacillityCheckId=" + data).then(function (dat) {
							debugger;
							$scope.kodeKedaruratanData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.saranaEvakuasiData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});



							dat.data.data.listKelompok[0].KodeKedaruratan.forEach(function (datas) {
								$scope.kodeKedaruratanData.add(datas);
							});
							dat.data.data.listKelompok[1].SaranaEvakuasi.forEach(function (datas) {
								$scope.saranaEvakuasiData.add(datas);
							});

						})
					} else if (data == 3) {
						ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-kelompokLpj-gedung?k3FacillityCheckId=" + data).then(function (dat) {
							debugger;
							$scope.lostFoundData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.petugasKeamananData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.insidenSecData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.idCardData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.responTimeData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

						


							dat.data.data.listKelompok[0].LostFound.forEach(function (datas) {
								$scope.lostFoundData.add(datas);
							});
							dat.data.data.listKelompok[1].PetugasKeamanan.forEach(function (datas) {
								$scope.petugasKeamananData.add(datas);
							});
							dat.data.data.listKelompok[2].Insiden.forEach(function (datas) {
								$scope.insidenSecData.add(datas);
							});
							dat.data.data.listKelompok[3].IDCard.forEach(function (datas) {
								$scope.idCardData.add(datas);
							});
							dat.data.data.listKelompok[4].ResponTime.forEach(function (datas) {
								$scope.responTimeData.add(datas);
							});
							
						})
					} else if (data == 4) {
						ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-kelompokLpj-gedung?k3FacillityCheckId=" + data).then(function (dat) {
							debugger;
							$scope.pemeliharaanRutinData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.perbaikanData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.kalibrasiData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.suhuKelembabanTekananData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});


							dat.data.data.listKelompok[0].PemeliharaanRutin.forEach(function (datas) {
								$scope.pemeliharaanRutinData.add(datas);
							});
							dat.data.data.listKelompok[1].Perbaikan.forEach(function (datas) {
								$scope.perbaikanData.add(datas);
							});
							dat.data.data.listKelompok[2].Kalibrasi.forEach(function (datas) {
								$scope.kalibrasiData.add(datas);
							});
							dat.data.data.listKelompok[3].SuhuKelembabanTekanan.forEach(function (datas) {
								$scope.suhuKelembabanTekananData.add(datas);
							});
							
						})
					} else if (data == 5) {
						ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-kelompokLpj-gedung?k3FacillityCheckId=" + data).then(function (dat) {
							debugger;
							$scope.tumpahanBahanKimiaData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.insidenHazData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.petugasKebersihanData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							


							dat.data.data.listKelompok[0].TumpahanBahanKimia.forEach(function (datas) {
								$scope.tumpahanBahanKimiaData.add(datas);
							});
							dat.data.data.listKelompok[1].Insiden.forEach(function (datas) {
								$scope.insidenHazData.add(datas);
							});
							dat.data.data.listKelompok[2].PetugasKebersihan.forEach(function (datas) {
								$scope.petugasKebersihanData.add(datas);
							});
							
						})
					} else if (data == 6) {
						ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-kelompokLpj-gedung?k3FacillityCheckId=" + data).then(function (dat) {
							debugger;
							$scope.gasMedisData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.listrikData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.airData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.saluranPembuanganData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.pendinginUdaraData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});

							$scope.liftData = new kendo.data.DataSource({
								data: [],
								schema: {
									model: {
										id: "id",
										fields: {
											itemPeriksa: { editable: false, nullable: false, validation: { required: true } },
											jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
											keterangan: { editable: true, nullable: true, validation: { required: false } },

										}
									}
								},
								editable: true
							});


							dat.data.data.listKelompok[0].GasMedis.forEach(function (datas) {
								$scope.gasMedisData.add(datas);
							});
							dat.data.data.listKelompok[1].Listrik.forEach(function (datas) {
								$scope.listrikData.add(datas);
							});
							dat.data.data.listKelompok[2].Air.forEach(function (datas) {
								$scope.airData.add(datas);
							});
							dat.data.data.listKelompok[3].SaluranPembuangan.forEach(function (datas) {
								$scope.saluranPembuanganData.add(datas);
							});
							dat.data.data.listKelompok[4].PendinginUdara.forEach(function (datas) {
								$scope.pendinginUdaraData.add(datas);
							});
							dat.data.data.listKelompok[5].Lift.forEach(function (datas) {
								$scope.liftData.add(datas);
							});
						})
					}


				}
				init($scope.tab);


				$scope.clickErp = function (data) {
					$scope.tab = 2;
					init($scope.tab);
				}

				$scope.clickSecurity = function (data) {
					$scope.tab = 3;
					init($scope.tab);
				}
				$scope.clickMedical = function (data) {
					$scope.tab = 4;
					init($scope.tab);
				}
				$scope.clickHazmat = function (data) {
					$scope.tab = 5;
					init($scope.tab);
				}
				$scope.clickUtility = function (data) {
					$scope.tab = 6;
					init($scope.tab);
				}


				$scope.Save = function () {
					var arrChecklist = [];
					if ($scope.tab == 1) {
						$scope.alarmData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.aparData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.insidenData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.keselamatanKerjaData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.areaBebasAsapRokokData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.pekerjaanKonstruksiRenovasiData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
					}else if($scope.tab == 2){
						$scope.kodeKedaruratanData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.saranaEvakuasiData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
					}else if($scope.tab == 3){
						$scope.petugasKeamananData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.insidenSecData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.lostFoundData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.idCardData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.responTimeData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
					}else if($scope.tab == 4){
						$scope.pemeliharaanRutinData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.perbaikanData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.kalibrasiData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.suhuKelembabanTekananData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						
					}else if($scope.tab == 5){
						$scope.tumpahanBahanKimiaData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.insidenHazData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.petugasKebersihanData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						
						
					}else if($scope.tab == 6){
						$scope.gasMedisData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.listrikData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.airData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.saluranPembuanganData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.pendinginUdaraData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						$scope.liftData._data.forEach(function (datas) {
							datas.k3ItemPeriksaGedung = {
								"id": datas.id
							}
							arrChecklist.push(datas)
						})
						
						
						
					}

					debugger
					var data = {
						"tanggal": $scope.item.tglInput,
						"ruangan": {
							"id": $scope.item.ruangan.ruanganId
						},
						"k3CheckListFacillitySefetyDetail": arrChecklist
						// "k3ItemPeriksaGedung":
						// {
						// 	id
						// },
						// jumlah


					}
					ManageSarpras.saveDataSarPras(data, "k3-checklist-facillity-sefety/save-k3-checklist-facillity-sefety").then(function (e) {

					});
				}
			}, function errorCallBack(err) { });
		}
	]);
});