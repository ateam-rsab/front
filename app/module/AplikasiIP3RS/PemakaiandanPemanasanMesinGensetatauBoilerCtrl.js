define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaiandanPemanasanMesinGensetatauBoilerCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'IPSRSService', 'ManageIPSRS',
		function ($rootScope, $scope, ModelItem, DateHelper, IPSRSService, ManageIPSRS) {
			ModelItem.get("IPSRS/PemakaiandanPemanasanMesinGensetatauBoiler").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-mesin/get-jenis-mesin").then(function (data) {
					$scope.listJenisMesin = data.data.data.jenisMesin;
				});
				ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-mesin/get-login-user/").then(function (data) {
					$scope.item.namaPetugas = data.data.data.name;
					$scope.item.petugasId = data.data.data.idPegawai;
				});

				$scope.klGenset = function (isi) {

					$scope.ModeKlik = true;
					$scope.item.jenisMesin = { id: isi.idJenisProduk, jenisMesin: isi.jenisMesin };
					$scope.item.tanggal = isi.tanggal;
					$scope.item.pemakaianAwal = new Date(isi.pemakaianAwal);
					$scope.item.pemakaianAkhir = new Date(isi.pemakaianAhir);
					$scope.item.namaMesin = { idMesin: isi.idMesin, namaMesin: isi.namaMesin };
					$scope.item.kapasitas = isi.kapasitas;
					$scope.NorecGrid = isi.noRecPemakainMesin;
					$scope.noRecAnak = isi.noRec;
					$scope.item.namaPetugas = isi.petugas;
				}

				$scope.klBoiler = function (isi) {

					$scope.item.jenisMesin = { id: isi.idJenisProduk, jenisMesin: isi.jenisMesin };
					$scope.item.namaMesin = { idMesin: isi.idMesin, namaMesin: isi.namaMesin };
					$scope.item.tanggal = isi.tanggal;
					$scope.item.kapasitas = isi.kapasitas;
					$scope.item.literAwal = isi.literPemakaianAwal;
					$scope.item.literAkhir = isi.literPemakaianAhir;
					$scope.NorecGrid = isi.noRecPemakainMesin;
					$scope.noRecAnak = isi.noRec;
					$scope.item.namaPetugas = isi.petugas;
				}

				$scope.jenisMesin = function () {
					var jenisMesinId = $scope.item.jenisMesin.id;
					if (jenisMesinId == 509) {
						$scope.showGenset = true;
						$scope.showGridGenset = true;
						$scope.showBoiler = false;
						$scope.showGridBoiler = false;
						ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-mesin/get-data-mesin?id=509").then(function (data) {
							$scope.listMesin = data.data.data.dataMesin;
						});
					} else if (jenisMesinId == 510) {
						$scope.showGenset = false;
						$scope.showBoiler = true;
						$scope.showGridGenset = false;
						$scope.showGridBoiler = true;
						ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-mesin/get-data-mesin?id=510").then(function (data) {
							$scope.listMesin = data.data.data.dataMesin;
						});
					} else {
						$scope.showGenset = false;
						$scope.showBoiler = false;
						$scope.showGridGenset = false;
						$scope.showGridBoiler = false;
					}
				}
				$scope.kapasitasMesin = function () {
					$scope.item.kapasitas = $scope.item.namaMesin.kapasitasMesin;
				}


				$scope.$watchGroup(['item.pemakaianAwal', 'item.pemakaianAkhir'], function (newValued, OldValue) {

					if ($scope.item.pemakaianAwal != "" && $scope.item.pemakaianAkhir != "") {
						var d1 = moment($scope.item.pemakaianAwal);
						var d2 = moment($scope.item.pemakaianAkhir);
						var menit = moment.duration(d2.diff(d1)).asMinutes();
						$scope.item.lamaPemakaian = menit + " Menit";
					}
				})


				$scope.$watchGroup(['item.literAwal', 'item.literAkhir'], function (newValued, OldValue) {
					if ($scope.item.literAwal != "" && $scope.item.literAkhir != "") {
						var a1 = parseInt($scope.item.literAwal);
						var a2 = parseInt($scope.item.literAkhir);
						var total = a1 - a2;
						$scope.item.totalPemakaian = total;
					}
				})


				var init = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-mesin/get-all-pemakaian-genset").then(function (data) {
						$scope.dataPemanasanGenset = data.data.data.listIpsrsMesinGenset;
						$scope.dataPemanasanGenset.forEach(function (data) {
							var date1 = new Date(data.pemakaianAwal);
							var date2 = new Date(data.pemakaianAhir);
							data.pemakaianAwalGenset = DateHelper.getJamFormatted(date1);
							data.pemakaianAhirGenset = DateHelper.getJamFormatted(date2);
						});
					});
					ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-mesin/get-all-pemakaian-boiler").then(function (data) {
						$scope.dataPemakaianBoiler = data.data.data.listIpsrsMesinBoiler;
					});
				};
				init();


				$scope.columnPemanasanGenset = [
					{
						"field": "jenisMesin",
						"title": "<center>Jenis Mesin",
						"width": 100
					},
					{
						"field": "tanggal",
						"title": "<center>Tanggal",
						"width": 100
					},
					{
						"field": "namaMesin",
						"title": "<center>Nama Mesin",
						"width": 100
					},
					{
						"field": "kapasitas",
						"title": "<center>Kapasitas",
						"width": 75
					},
					{
						"field": "pemakaianAwalGenset",
						"title": "<center>Pemakaian Awal",
						"width": 100,
						headerAttributes: { style: "white-space: normal" }
					},
					{
						"field": "pemakaianAhirGenset",
						"title": "<center>Pemakaian Akhir",
						"width": 100,
						headerAttributes: { style: "white-space: normal" }
					},
					{
						"field": "petugas",
						"title": "<center>Petugas",
						"width": 100
					}
					// {
					// 	command: {text: "Hapus", click:$scope.hapusDataPemakaianGenset},
					// 	title : "<center>&nbsp;",
					// 	"width": 75
					// }
				];

				$scope.columnPemakaianBoiler = [
					{
						"field": "jenisMesin",
						"title": "<center>Jenis Mesin",
						"width": 100
					},
					{
						"field": "tanggal",
						"title": "<center>Tanggal",
						"width": 100
					},
					{
						"field": "namaMesin",
						"title": "<center>Nama Mesin",
						"width": 100
					},
					{
						"field": "kapasitas",
						"title": "<center>Kapasitas",
						"width": 75
					},
					{
						"field": "literPemakaianAwal",
						"title": "<center>Liter Awal",
						"width": 100,
						headerAttributes: { style: "white-space: normal" }
					},
					{
						"field": "literPemakaianAhir",
						"title": "<center>Liter Akhir",
						"width": 100,
						headerAttributes: { style: "white-space: normal" }
					},
					{
						"field": "petugas",
						"title": "<center>Petugas",
						"width": 100
					}
					// {
					// 	command: {text: "Hapus", click:$scope.hapusDataPemakaianGenset},
					// 	title : "<center>&nbsp;",
					// 	"width": 75
					// }
				];

				$scope.mainGridOptions = {
					pageable: true,
					// filterable: {
					//                extra: false,
					//                operators: {
					//                   string: {
					//                   startsWith: "Pencarian"
					//                   }
					//                }
					//             },
					sortable: true,
					//toolbar: ["excel"],
					//    excel: {
					//        fileName: "DashboardPerbaikan.xlsx",
					//        filterable: false
					// },
					// dataBound: onDataBound,
				}

				$scope.hapusDataPemakaianGenset = function (e) {

					e.preventDefault();

					var grid = this;
					var row = $(e.currentTarget).closest("tr");

					$scope.tempDataPemanasanGenset = $scope.dataPemanasanGenset
						.filter(function (el) {
							return el.name !== grid._data[0].name;
						});

					grid.removeRow(row);

				};

				$scope.batal = function () {
					var jenisMesinId = $scope.item.jenisMesin.id;
					if (jenisMesinId == 509) {
						var data = {
							"tanggal": $scope.item.tanggal,
							"statusEnabled": "false",
							"pegawai": {
								"id": $scope.item.petugasId
							},
							"noRec": $scope.NorecGrid,
							"ipsrsMesinGenset": {
								"mesin": {
									"id": $scope.item.namaMesin.idMesin
								},
								"noRec": $scope.noRecAnak,
								"pemakaianAwal": $scope.item.pemakaianAwal,
								"pemakaianAhir": $scope.item.pemakaianAkhir,
								"lamaPemakaian": $scope.item.lamaPemakaian
							},
							"ipsrsMesinBoiler": {
								"mesin": {
									"id": 0
								},
								"literPemakaianAwal": 0,
								"literPemakaianAhir": 0,
								"totalPemakaian": 0
							}
						}
						console.log(JSON.stringify(data));
						IPSRSService.saveDataSarPras(data, "ipsrs-pemakaian-mesin/save-pemakaian-mesin").then(function (e) {
							console.log(JSON.stringify(e.data));
							init();
						});
					} else {
						var data = {
							"tanggal": $scope.item.tanggal,
							"statusEnabled": "false",
							"pegawai": {
								"id": $scope.item.petugasId
							},
							"noRec": $scope.NorecGrid,
							"ipsrsMesinGenset": {
								"mesin": {
									"id": 0
								},
								"pemakaianAwal": 0,
								"pemakaianAhir": 0,
								"lamaPemakaian": 0
							},
							"ipsrsMesinBoiler": {
								"mesin": {
									"id": $scope.item.namaMesin.idMesin
								},
								"noRec": $scope.noRecAnak,
								"literPemakaianAwal": $scope.item.literAwal,
								"literPemakaianAhir": $scope.item.literAkhir,
								"totalPemakaian": $scope.item.totalPemakaian
							}
						}
						IPSRSService.saveDataSarPras(data, "ipsrs-pemakaian-mesin/save-pemakaian-mesin").then(function (e) {
							console.log(JSON.stringify(e.data));
							init();
						});
					}
				};


				$scope.baru = function () {

					$scope.item.jenisMesin = "";
					$scope.item.tanggal = "";
					$scope.item.namaMesin = "";
					$scope.item.kapasitas = "";
					$scope.item.pemakaianAwal = "";
					$scope.item.pemakaianAkhir = "";
					$scope.item.lamaPemakaian = "";
					$scope.item.literAwal = "";
					$scope.item.literAkhir = "";
					$scope.item.totalPemakaian = "";
					$scope.NorecGrid = undefined;
					$scope.noRecAnak = undefined;
				}

				$scope.simpanBoiler = function () {

					var jenisMesinId = $scope.item.jenisMesin.id;
					if (jenisMesinId == 509) //ID GENSET
					{
						// if($scope.NorecGrid != undefined){
						// 	$scope.item.pemakaianAwal = $scope.item.pemakaianAwalEdit;
						// 	$scope.item.pemakaianAkhir = $scope.item.pemakaianAkhirEdit;
						// }  
						var data = {
							"tanggal": $scope.item.tanggal,
							"statusEnabled": "true",
							"pegawai": {
								"id": $scope.item.petugasId
							},
							"noRec": $scope.NorecGrid,
							"ipsrsMesinGenset": {
								"mesin": {
									"id": $scope.item.namaMesin.idMesin
								},
								"noRec": $scope.noRecAnak,
								"pemakaianAwal": $scope.item.pemakaianAwal,
								"pemakaianAhir": $scope.item.pemakaianAkhir,
								"lamaPemakaian": $scope.item.lamaPemakaian
							},
							"ipsrsMesinBoiler": {
								"mesin": {
									"id": 0
								},
								"literPemakaianAwal": 0,
								"literPemakaianAhir": 0,
								"totalPemakaian": 0
							}
						}
						console.log(JSON.stringify(data));
						IPSRSService.saveDataSarPras(data, "ipsrs-pemakaian-mesin/save-pemakaian-mesin").then(function (e) {
							console.log(JSON.stringify(e.data));
							init();

							$scope.NorecGrid = undefined;
						});
					} else {  //ID BOILER
						var data = {
							"tanggal": $scope.item.tanggal,
							"statusEnabled": "true",
							"pegawai": {
								"id": $scope.item.petugasId
							},
							"noRec": $scope.NorecGrid,
							"ipsrsMesinGenset": {
								"mesin": {
									"id": 0
								},
								"pemakaianAwal": 0,
								"pemakaianAhir": 0,
								"lamaPemakaian": 0
							},
							"ipsrsMesinBoiler": {
								"mesin": {
									"id": $scope.item.namaMesin.idMesin
								},
								"noRec": $scope.noRecAnak,
								"literPemakaianAwal": $scope.item.literAwal,
								"literPemakaianAhir": $scope.item.literAkhir,
								"totalPemakaian": $scope.item.totalPemakaian
							}
						}
						IPSRSService.saveDataSarPras(data, "ipsrs-pemakaian-mesin/save-pemakaian-mesin").then(function (e) {
							console.log(JSON.stringify(e.data));
							init();
							$scope.NorecGrid = undefined;
						});
					}

				};
			}, function errorCallBack(err) { });
		}
	]);
});