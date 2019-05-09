define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('CheckListSanitasiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, ManageSarpras) {
			ModelItem.get("AplikasiK3/CheckListMFK").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.tglInput = new Date();
				$scope.dataVOloaded = true;
				$scope.tab = 1;


				//tab 4

				$scope.kondisiRuangOptions = {
					dataSource: $scope.kondisiRuangData,
					editable: {
						mode: "inline",
						confirmation: true
					},
					pageable: false,
					columns: [
						{
							"field": "sanitasiDetail",
							"title": "<center>Kondisi Ruang dan Bangunan</center>",
							"width": "200px"
						},
						{
							"title": "<center>Ya</center>",
							"template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
							"width": "75px"
						},
						{
							"title": "<center>Tidak</center>",
							"template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
							"width": "75px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.kondisiToiletOptions = {
					dataSource: $scope.kondisiToiletData,
					pageable: false,
					columns: [
						{
							"field": "sanitasiDetail",
							"title": "<center>Kondisi Toilet / Kamar Mandi</center>",
							"width": "200px"
						},
						{
							"title": "<center>Ya</center>",
							"template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
							"width": "75px"
						},
						{
							"title": "<center>Tidak</center>",
							"template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
							"width": "75px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.limbahMedisOptions = {
					dataSource: $scope.limbahMedisData,
					pageable: false,
					columns: [
						{
							"field": "sanitasiDetail",
							"title": "<center>Limbah Medis / Non Medis</center>",
							"width": "200px"
						},
						{
							"title": "<center>Ya</center>",
							"template": "<div class='center'><input type=\"radio\" ng-model='val' value=2 ng-click='klik(dataItem,val)'></div>",
							"width": "75px"
						},
						{
							"title": "<center>Tidak</center>",
							"template": "<div class='center'><input type=\"radio\" ng-model='val' value=1 ng-click='klik(dataItem,val)'></div>",
							"width": "75px"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "150px"
						}
					]
				};

				$scope.kualitasUdaraOptions = {
					dataSource: $scope.kualitasUdaraData,
					pageable: false,
					columns: [
						{
							"field": "sanitasiDetail",
							"title": "<center>Kualitas Udara dan Pencahayaan Ruangan</center>",
							"width": "40%"
						},
						{
							"field": "hasilPengukuran",
							"title": "<center>Hasil Pengukuran</center>",
							"width": "30%"
						},
						{
							"field": "keterangan",
							"title": "<center>Keterangan</center>",
							"width": "30%"
						}
					]
				};
				$scope.arrSurvei = [];
				$scope.klik = function (data, value) {
					// data.value = value;
					debugger;
					$scope.kondisiRuangData._data.forEach(function (datas) {
						if (datas.id == data.id) {
							datas.statusYaTidak = {
								"id": parseInt(value)
							}
						}
					})
					$scope.kondisiToiletData._data.forEach(function (datas) {
						if (datas.id == data.id) {
							datas.statusYaTidak = {
								"id": parseInt(value)
							}
						}
					})
					$scope.limbahMedisData._data.forEach(function (datas) {
						if (datas.id == data.id) {
							datas.statusYaTidak = {
								"id": parseInt(value)
							}
						}
					})
				}

				//tidak 1 ya 2

				ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-ruangan").then(function (dat) {
					$scope.listRuangan = dat.data.data.listRuangan;
				})

				ManageSarpras.getOrderList("sanitasi-kesehatan-lingkungan/get-user-login").then(function (dat) {
					// debugger;
					$scope.item.petugas = dat.data.data;
				})

				$scope.$watch('item.ruangan', function (selectedData) {
					debugger;
					$scope.item.pjRuangan = "";
					ManageSarpras.getOrderList("sanitasi-kesehatan-lingkungan/get-petugas-ruangan?ruanganId=" + selectedData.ruanganId).then(function (dat) {
						// debugger;
						$scope.listPjRuangan = dat.data.data.listData;
					})

				})

				var init = function () {
					// debugger;

					ManageSarpras.getOrderList("sanitasi-kesehatan-lingkungan/get-parameter-sanitasi").then(function (dat) {
						// debugger;
						$scope.kondisiRuangData = new kendo.data.DataSource({
							data: [],
							schema: {
								model: {
									id: "id",
									fields: {
										sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
										jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
										keterangan: { editable: true, nullable: true, validation: { required: false } },

									}
								}
							},
							editable: true
						});

						$scope.kondisiToiletData = new kendo.data.DataSource({
							data: [],
							schema: {
								model: {
									id: "id",
									fields: {
										sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
										jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
										keterangan: { editable: true, nullable: true, validation: { required: false } },

									}
								}
							},
							editable: true
						});

						$scope.limbahMedisData = new kendo.data.DataSource({
							data: [],
							schema: {
								model: {
									id: "id",
									fields: {
										sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
										jumlah: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
										keterangan: { editable: true, nullable: true, validation: { required: false } },

									}
								}
							},
							editable: true
						});

						$scope.kualitasUdaraData = new kendo.data.DataSource({
							data: [],
							schema: {
								model: {
									id: "id",
									fields: {
										sanitasiDetail: { editable: false, nullable: false, validation: { required: true } },
										hasilPengukuran: { editable: true, nullable: true, type: "number", validation: { min: 0, required: false } },
										keterangan: { editable: true, nullable: true, validation: { required: false } },

									}
								}
							},
							editable: true
						});


						dat.data.data.listData.forEach(function (datas) {
							if (datas.checkSanitasiId == 1) {
								$scope.kondisiRuangData.add(datas);
							}
							if (datas.checkSanitasiId == 2) {
								$scope.kondisiToiletData.add(datas);
							}
							if (datas.checkSanitasiId == 3) {
								$scope.limbahMedisData.add(datas);
							}
							if (datas.checkSanitasiId == 4) {
								$scope.kualitasUdaraData.add(datas);
							}



						});

					})



				}
				init();

				$scope.Save = function () {
					var arrChecklist = [];
					var arrChecklist2 = [];
					$scope.kondisiRuangData._data.forEach(function (datas) {
						datas = {
							"parameterCheckSanitasiDetail": {
								"id": datas.id
							},
							"keterangan": datas.keterangan,
							"statusYaTidak": {
								"id": datas.statusYaTidak.id
							}
						}

						arrChecklist.push(datas)
					})
					$scope.kondisiToiletData._data.forEach(function (datas) {
						datas = {
							"parameterCheckSanitasiDetail": {
								"id": datas.id
							},
							"keterangan": datas.keterangan,
							"statusYaTidak": {
								"id": datas.statusYaTidak.id
							}
						}
						arrChecklist.push(datas)
					})
					$scope.limbahMedisData._data.forEach(function (datas) {
						datas = {
							"parameterCheckSanitasiDetail": {
								"id": datas.id
							},
							"keterangan": datas.keterangan,
							"statusYaTidak": {
								"id": datas.statusYaTidak.id
							}
						}
						arrChecklist.push(datas)
					})
					$scope.kualitasUdaraData._data.forEach(function (datas) {
						datas = {
							"keterangan": datas.keterangan,
							"hasilPengukuran": datas.hasilPengukuran,
							"parameterCheckSanitasiDetail": {
								"id": datas.id
							}
						}
						arrChecklist2.push(datas)
					})
					debugger;
					if ($scope.item.pjRuangan == undefined) {
						$scope.item.pjRuangan = {
							"id": 0
						}
					}
					var data = {
						"tanggal": $scope.item.tglInput,
						"pegawai": {
							"id": $scope.item.petugas.idPegawai
						},
						"ruangan": {
							"id": $scope.item.ruangan.ruanganId
						},
						"pjRuangan": {
							"id": $scope.item.pjRuangan.id
						},
						"checklistSanitasiKLDetail": arrChecklist,
						"pengukuranSanitasiKLDetail": arrChecklist2
					}
					ManageSarpras.saveDataSarPras(data, "sanitasi-kesehatan-lingkungan/save-sanitasi-kesehatan-lingkungan").then(function (e) {

					});
				}
			}, function errorCallBack(err) { });
		}
	]);
});