define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SwabAlatPermukaanCtrl', ['$rootScope', '$scope', 'ModelItem', 'MasterBakuMutuService', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, MasterBakuMutuService, ManageSarpras) {

			ModelItem.get("Kesling/SwabAlatPermukaan").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
				$scope.item.tglPengukuran = new Date();
			}, function errorCallBack(err) { });

			// $scope.dataVOloaded = true;
			// $scope.item = {};



			$scope.now = new Date();



			$scope.batal = function () {
				$scope.item = {};
			};

			$scope.enableKodeParameter = true;


			ManageSarpras.getOrderList("swab-alat-permukaan/get-unit-ruangan").then(function (dat) {
				$scope.listRuangan = dat.data.data.unitRuangan;
				// debugger;
			});

			// ManageSarpras.getOrderList("pengukuran-kebisingan/get-baku-mutu").then(function (dat) {
			// 	$scope.listBakuMutu = dat.data.data.bakuMutu;
			// 	debugger;
			// });


			$scope.Save = function () {


				var dataPost = {
					"jenisAlat": $scope.item.jenisAlat,
					"tanggal": $scope.item.tglPengukuran,
					"hasilPemeriksaan": $scope.item.hasilPemeriksaan,
					"namaRuangan": {
						"id": $scope.item.ruangan.ruanganId
					}
				};

				ManageSarpras.saveDataSarPras(ModelItem.beforePost(dataPost), "swab-alat-permukaan/save-swab-alat-permukaan").then(function (e) {
					init();
					$scope.item.tglPengukuran = "";
					$scope.item.ruangan = "";
					$scope.item.jenisAlat = "";
					$scope.item.hasilPemeriksaan = "";

					/*$state.go('dashboardpasien.TandaVital', {
					 noCM: $scope.noCM
					 });*/
				});
			};





			$scope.listGridPengukuran = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "pengukuranKebisinganId",
						fields: {
							tanggal: { editable: false, nullable: false, validation: { required: true } },
							namaRuangan: { editable: false, nullable: false, validation: { required: true } },
							jenisAlat: { editable: false, nullable: false, validation: { required: true } },
							hasilPemeriksaan: { type: "number", editable: false, nullable: false, validation: { required: true } },

						}
					}
				},
				editable: false
			});

			$scope.columnPengukuran = [
				{
					"field": "tanggal",
					"title": "<center>Tanggal</center>",
					"width": "150px",
					template: '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
				},
				{
					"field": "namaRuangan",
					"title": "<center>Ruangan</center>",
					"width": "150px"
				},
				{
					"field": "jenisAlat",
					"title": "<center>Jenis Alat / Permukaan</center>",
					"width": "150px"
				},
				{
					"field": "hasilPemeriksaan",
					"title": "<center>Hasil Pemeriksaan</center>",
					"width": "150px"
				}
			];

			$scope.optionsGridPengukuran = {
				dataSource: $scope.listGridPengukuran,
				pageable: false,
				editable: {
					mode: "inline",
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnPengukuran
			};

			var init = function () {
				ManageSarpras.getOrderList("swab-alat-permukaan/get-swab-alat-permukaan").then(function (dat) {
					debugger;

					$scope.listGridPengukuran = new kendo.data.DataSource({
						data: [

						],
						schema: {
							model: {
								id: "id",
								fields: {
									tanggal: { editable: false, nullable: false, validation: { required: true } },
									namaRuangan: { editable: false, nullable: false, validation: { required: true } },
									jenisAlat: { editable: false, nullable: false, validation: { required: true } },
									hasilPemeriksaan: { type: "number", editable: false, nullable: false, validation: { required: true } },

								}
							}
						},
						editable: false
					});

					dat.data.data.swabAlatPermukaan.forEach(function (datas) {
						datas.tanggal = new Date(datas.tanggal);
						$scope.listGridPengukuran.add(datas);
					});
				})
			}
			init();

			$scope.hapus = function (data) {
				debugger;

				var x;
				if (confirm("Hapus Data?") == true) {
					ManageSarpras.getOrderList("swab-alat-permukaan/delete-swab-alat-permukaan?id=" + data.id).then(function (dat) {
						init();
					})
				} else {
					x = "You pressed Cancel!";
				}




			}


		}
	]);
});