define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('HasilPemeriksaanSwaPantauLimbahCairCtrl', ['$rootScope', '$scope', '$window', 'ModelItem', 'DateHelper', 'MasterPantauParameter', 'MasterPantauSatuan', 'HasilPemeriksaanSwaService', 'ManageSarpras',
		function ($rootScope, $scope, $window, ModelItem, DateHelper, MasterPantauParameter, MasterPantauSatuan, HasilPemeriksaanSwaService, ManageSarpras) {
			ModelItem.get("Kesling/HasilPemeriksaanSwaPantauLimbahCair").then(function (data) {
				// debugger;
				$scope.item = {};
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.item.tanggal = new Date();
				$scope.tanggalInput = new Date();
				$scope.item.periodeAwal = new Date();
				$scope.item.periodeAkhir = new Date();
			}, function errorCallBack(err) { });

			$scope.onlyNumber = function (event) {
				var regex = new RegExp(/^[0-9]{1,2}([,.][0-9]{1,2})?$/)
				// console.log(parseInt(event.key));
				// // return regex.test(parseInt(event.key));
				// if(regex.test(parseInt(event.key))) {
				// 	return true
				// } else {
				// 	// return false;
				// 	return event.preventDefault();
				// }
				return regex.test(String.fromCharCode(event.keyCode || event.which))
			}


			$scope.no = 1;
			// $scope.daftarBahanLinen = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.dataLinen = new kendo.data.DataSource({
				data: []
			});

			var dataLinen = [
				{
					no: 1,
					tanggal: new Date(),
					parameter: 'pH',
					parameterId: 3,
					satuan: 'Meter',
					satuanId: 164,
					nilai: 0
				},
				{
					no: 2,
					tanggal: new Date(),
					parameter: 'DO',
					parameterId: 1,
					satuan: 'ppm',
					satuanId: 87,
					nilai: 0
				},
				{
					no: 3,
					tanggal: new Date(),
					parameter: 'Suhu',
					parameterId: 2,
					satuan: 'C',
					satuanId: 18,
					nilai: 0
				},
				{
					no: 4,
					tanggal: new Date(),
					parameter: 'TDS',
					parameterId: 5,
					satuan: 'ppm',
					satuanId: 87,
					nilai: 0
				},
				{
					no: 5,
					tanggal: new Date(),
					parameter: 'Conductivity',
					satuan: 'Meter',
					parameterId: 6,
					satuanId: 164,
					nilai: 0
				}
			]
			$scope.listBahanLinen = new kendo.data.DataSource({
				data: dataLinen,
				editable: true,
				autoSync: true,
				schema: {
					model: {
						id: 'idGrid',
						field: {
							tanggal: {
								type: 'string',
							},
							parameter: {
								type: 'string',
								validation: {
									required: true
								}
							},
							satuan: {
								type: 'string',
								validation: {
									required: true
								}
							},
							nilai: {
								type: 'number',
								validation: {
									required: true
								},
								defaultValue: {
									nilai: 0
								},
							}
						}
					}
				}
			});

			$scope.mainGridOptions = {
				editable: true,
				columns: $scope.columnLaporanUjiHasil
			}

			$scope.columnLaporanUjiHasil = [
				{
					"field": "no",
					"title": "<h3 aling='center'>No</h3>",
					"width": "50px"
				},
				// {
				// 	"field": "tanggal",
				// 	"title": "Tanggal",
				// 	"width": "20%",
				// 	"template": "#= new moment(new Date(tanggal)).format('DD-MM-YYYY') #"
				// },
				{
					"field": "parameter",
					"title": "<h3 aling='center'>Parameter</h3>",
					"width": "20%"
				},
				{
					"field": "satuan",
					"title": "<h3 aling='center'>Satuan</h3>",
					"width": "20%"
				},
				{
					"field": "nilai",
					"title": "<h3 aling='center'>Nilai</h3>",
					"width": "20%",
					editable: true,
				}

				// old
				// {
				// 	"field": "no",
				// 	"title": "No",
				// 	"width": "5%"
				// },
				// {
				// 	"field": "tanggal",
				// 	"title": "Tanggal",
				// 	"width": "20%",
				// 	"template": "#= new moment(new Date(tanggal)).format('DD-MM-YYYY') #"
				// },
				// {
				// 	"field": "parameter.nama",
				// 	"title": "Parameter",
				// 	"width": "20%"
				// },
				// {
				// 	"field": "satuan.namaExternal",
				// 	"title": "Satuan",
				// 	"width": "20%"
				// },
				// {
				// 	"field": "nilai",
				// 	"title": "Nilai",
				// 	"width": "20%"
				// }
			];


			$scope.addDataBahanLinen = function () {
				if (($scope.item.parameter == undefined || $scope.item.parameter == "") &&
					($scope.item.satuan == undefined || $scope.item.satuan == "") &&
					($scope.item.nilai == undefined || $scope.item.nilai == "") &&
					($scope.item.tanggal == undefined || $scope.item.tanggal == "" || $scope.item.tanggal == null)) {
					// alert('Tidak ada data untuk di tambah');
					toastr.warning('Tidak ada data untuk ditambah', 'Perhatian');
				}
				var tempDataBahanLinen = {
					"no": $scope.no++,
					"parameter": $scope.item.parameter,
					"satuan": $scope.item.satuan,
					"nilai": $scope.item.nilai,
					"tanggal": $scope.item.tanggal
				}


				$scope.daftarBahanLinen.add(tempDataBahanLinen);
				$scope.item.parameter = "",
					$scope.item.satuan = "",
					$scope.item.hasiluji = "",
					$scope.item.bakumutu = ""
				$scope.item.nilai = ""
			}

			$scope.debitOutlet = function () {

				$scope.item.outletDebit = $scope.item.outletMeterAir - $scope.item.outletMeterAirLalu;

			};

			$scope.debitInlet = function () {
				$scope.item.inletDebit = $scope.item.inletMeterAir - $scope.item.inletMeterAirLalu;
			};

			MasterPantauParameter.getOrderList("service/list-generic/?view=Parameter&select=*").then(function (dat) {
				$scope.ListPantauParameter = dat.data;
				//debugger;
			});

			MasterPantauSatuan.getOrderList("service/list-generic/?view=SatuanStandar&select=*").then(function (dat) {
				$scope.ListPantauSatuan = dat.data;
				//debugger;
			});

			var init = function () {

				HasilPemeriksaanSwaService.findAllHasilPemakaianSwa("hasil-pemeriksaan-swa-pantau-limbah-cair/find-all-hasil-pemeriksaan-swa-pantau-limbah-cair/").then(function success(dat) {
					$scope.dataSwaPantauLimbahCair = dat.data.data.hasilPemeriksaanSwaPantauLimbahCair;
					$scope.dataSwaPantauLimbahCair.forEach(function (data) {
						var date = new Date(data.tanggal);
						data.tanggal = DateHelper.getTanggalFormatted(date);
					})

					console.log(JSON.stringify($scope.dataPemanasanGenset))
				}, function error(error) {
					console.log(error);
				});
			}

			init();

			$scope.save = function () {
				// var detail = $scope.daftarBahanLinen._data;
				var detail = $scope.listBahanLinen._data;
				var i = 0;
				var detailHVA = [];
				for (var index = 0; index < detail.length; index++) {
					if (detail[index].nilai == null || detail[index].nilai == undefined) {
						// toastr.warning('Nilai parameter ' + detail[index].parameter + ' belum terisi / tidak boleh kosong')
						detail[index].nilai = 0;
					}
				}
				detail.forEach(function (data) {
					var data = {
						"parameter": {
							"id": data.parameterId
						},
						"satuanStandar": {
							"id": data.satuanId
						},
						"nilai": data.nilai
					}
					detailHVA[i] = data;
					i++;
				})
				var data1 = {
					"inletMeterAirSekarang": $scope.item.inletMeterAir,
					"keterangan": $scope.item.keterangan,
					"outletMeterAirLalu": $scope.item.outletMeterAirLalu,
					"hasilPemeriksaanSwaDetailVO": detailHVA,
					"outletMeterAirSekarang": $scope.item.outletMeterAir,
					"inletDebit": $scope.item.inletDebit,
					"tanggal": new Date($scope.item.tanggal).getTime(),
					"outletDebit": $scope.item.outletDebit,
					"inletMeterAirLalu": $scope.item.inletMeterAirLalu
				}
				console.log(JSON.stringify(data1));
				ManageSarpras.saveDataPantau(data1, "hasil-pemeriksaan-swa-pantau-limbah-cair/save-hasil-pemeriksaan-swa-pantau-limbah-cair/").then(function (e) {
					console.log(JSON.stringify(e.data));
					$scope.item = {};
					$scope.item.tanggal = new Date()
				});

				$scope.daftarBahanLinen = [];
			};

			$scope.hapus = function (selectedData) {
				console.log(selectedData);
				HasilPemeriksaanSwaService.deleteHasilPemakaianSwa("hasil-pemeriksaan-swa-pantau-limbah-cair/delete-hasil-pemeriksaan-swa-pantau-limbah-cair?noRec=" + selectedData.noRec).then(function (dat) {
					init();
				});
			}
		}
	]);
});