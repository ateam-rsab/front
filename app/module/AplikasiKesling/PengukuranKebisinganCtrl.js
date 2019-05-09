define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PengukuranKebisinganCtrl', ['$rootScope', '$scope', 'ModelItem', 'MasterBakuMutuService', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, MasterBakuMutuService, ManageSarpras) {

			ModelItem.get("Kesling/PemantauanPihakKetiga").then(function (data) {
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


			ManageSarpras.getOrderList("pengukuran-kebisingan/get-unit-ruangan").then(function (dat) {
				$scope.listRuangan = dat.data.data.unitRuangan;
				// debugger;
			});

			ManageSarpras.getOrderList("pengukuran-kebisingan/get-baku-mutu").then(function (dat) {
				$scope.listBakuMutu = dat.data.data.bakuMutu;
				debugger;
			});


			$scope.Save = function () {


				var dataPost = {
					"tanggal": $scope.item.tglPengukuran,
					"namaRuangan": {
						"id": $scope.item.ruangan.ruanganId
					},
					"bakuMutu": {
						"id": $scope.item.bakuMutu.bakuMutuId
					},
					"hasilPengukuran": $scope.item.hasilPengukuran
				};

				ManageSarpras.saveDataSarPras(ModelItem.beforePost(dataPost), "pengukuran-kebisingan/save-pengukuran-kebisingan").then(function (e) {
					init();
					$scope.item.tglPengukuran = "";
					$scope.item.ruangan = "";
					$scope.item.bakuMutu = "";
					$scope.item.hasilPengukuran = "";

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
							namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
							hasilPengukuran: { type: "number", editable: false, nullable: false, validation: { required: true } },

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
					"field": "namaBakuMutu",
					"title": "<center>Baku Mutu</center>",
					"width": "150px"
				},
				{
					"field": "hasilPengukuran",
					"title": "<center>Hasil Pengukuran</center>",
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
				ManageSarpras.getOrderList("pengukuran-kebisingan/get-pengukuran-kebisingan").then(function (dat) {
					debugger;

					$scope.listGridPengukuran = new kendo.data.DataSource({
						data: [

						],
						schema: {
							model: {
								id: "pengukuranKebisinganId",
								fields: {
									tanggal: { editable: false, nullable: false, validation: { required: true } },
									namaRuangan: { editable: false, nullable: false, validation: { required: true } },
									namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
									hasilPengukuran: { type: "number", editable: false, nullable: false, validation: { required: true } },

								}
							}
						},
						editable: false
					});
					
					dat.data.data.pengukuranKebisingan.forEach(function (datas) {
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
					ManageSarpras.getOrderList("pemantauan-kinerja-kesling/delete-pemantauan-kinerja?id=" + data.id).then(function (dat) {
						init();
					})
				} else {
					x = "You pressed Cancel!";
				}




			}


		}
	]);
});