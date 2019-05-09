define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemeriksaanAngkaKumanUdaraCtrl', ['$rootScope', '$scope', 'ModelItem', 'MasterBakuMutuService', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, MasterBakuMutuService, ManageSarpras) {

			ModelItem.get("Kesling/PemeriksaanAngkaKumanUdara").then(function (data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
				$scope.item.tglPemantauan = new Date();
			}, function errorCallBack(err) { });

			// $scope.dataVOloaded = true;
			// $scope.item = {};



			$scope.now = new Date();

			var aktif = false;
			$scope.check = function () {
				if (aktif)
					aktif = "false";

				else
					aktif = "true";
			}


			$scope.batal = function () {
				$scope.item = {};
			};

			$scope.enableKodeParameter = true;
			var getDataUnitRuangan = function(){
				ManageSarpras.getOrderList("pemeriksaan-angka-kuman-udara/get-unit-ruangan").then(function (dat) {
					debugger;
					$scope.listRuangan = dat.data.data.unitRuangan;
				})
			}
			getDataUnitRuangan();

			var getDataBakuMutu = function(){
				ManageSarpras.getOrderList("pemeriksaan-angka-kuman-udara/get-baku-mutu").then(function (dat) {
					debugger;
					$scope.listBakuMutu = dat.data.data.bakuMutu;
				});
			}
			getDataBakuMutu();

			$scope.$watch('selectedData', function (selectedData) {
				debugger;
				$scope.id = selectedData.id;
				$scope.item.volume = selectedData.volume;
				$scope.item.tglPemantauan = selectedData.tanggal;
				$scope.item.hasilPengukuran = selectedData.hasilPengukuran;
				$scope.item.bakuMutu = {
					"bakuMutuId": selectedData.idBakuMutu,
					"namaBakuMutu": selectedData.namaBakuMutu
				};
				$scope.item.ruangan = {
					"ruanganId": selectedData.ruanganId,
					"namaRuangan": selectedData.namaRuangan
				}
			});


			var files;
			var dataPost;
			$scope.onSelectFile = function (e) {
				files = e.files
			}

			$scope.Save = function () {
				var f = files;
				if ($scope.id == undefined) {
					debugger;
					var fr = new FileReader();
					if (FileReader && f && f.length) {
						fr.readAsDataURL(f[0].rawFile);
						fr.onload = function () {

							var imageData = fr.result
							var tempArray = imageData.split(",");

							var dataPost = {
								// Create a view
								"tanggal": $scope.item.tglPemantauan,
								"volume": $scope.item.volume,
								"bakuMutu": {
									"id": $scope.item.bakuMutu.bakuMutuId
								},
								"namaRuangan": {
									"id": $scope.item.ruangan.ruanganId
								},
								"hasilPengukuran": $scope.item.hasilPengukuran,
								"uploadDokumen": tempArray[1],

								//fileInput: ,
								"fileName": f[0].name
							};

							ManageSarpras.saveDataSarPras(ModelItem.beforePost(dataPost), "pemeriksaan-angka-kuman-udara/save-pemeriksaan-angka-kuman-udara").then(function (e) {
								init();
								$scope.id = undefined;
								$scope.item.tglPemantauan = "";
								$scope.item.volume = "";
								$scope.item.bakuMutu = "";
								$scope.item.ruangan = "";
								$scope.item.hasilPengukuran = "";


							});
						};
					}
				} else if ($scope.id != undefined) {
					debugger;
					var fr = new FileReader();
					if (FileReader && f && f.length) {
						fr.readAsDataURL(f[0].rawFile);
						fr.onload = function () {

							var imageData = fr.result
							var tempArray = imageData.split(",");

							var dataPost = {
								// Create a view
								"id": $scope.id,
								"tanggal": $scope.item.tglPemantauan,
								"volume": $scope.item.volume,
								"bakuMutu": {
									"id": $scope.item.bakuMutu.bakuMutuId
								},
								"namaRuangan": {
									"id": $scope.item.ruangan.ruanganId
								},
								"hasilPengukuran": $scope.item.hasilPengukuran,
								"uploadDokumen": tempArray[1],

								//fileInput: ,
								"fileName": f[0].name
							};

							ManageSarpras.saveDataSarPras(ModelItem.beforePost(dataPost), "pemeriksaan-angka-kuman-udara/update-pemeriksaan-angka-kuman-udara").then(function (e) {
								init();
								$scope.id = undefined;
								$scope.item.tglPemantauan = "";
								$scope.item.volume = "";
								$scope.item.bakuMutu = "";
								$scope.item.ruangan = "";
								$scope.item.hasilPengukuran = "";


							});
						};
					}
				}
			}



			$scope.listGridPemantauan = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "tanggal",
						fields: {
							tanggal: { editable: false, nullable: false, validation: { required: true } },
							jenisPekerjaan: { editable: false, nullable: false, validation: { required: true } },
							namaPerusahaan: { editable: false, nullable: false, validation: { required: true } },
							fileName: { editable: false, nullable: false, validation: { required: true } },
							analisaTindakLanjut: { editable: false, nullable: false, validation: { required: true } },

						}
					}
				},
				editable: false
			});

			$scope.columnPemantauan = [
				{
					"field": "tanggal",
					"title": "<center>Tanggal</center>",
					"width": "150px",
					template: '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
				},
				{
					"field": "namaRuangan",
					"title": "<center>Nama Ruangan</center>",
					"width": "150px"
				},
				{
					"field": "volume",
					"title": "<center>Volume</center>",
					"width": "150px"
				},
				{
					"field": "namaBakuMutu",
					"title": "<center>Baku Mutu</center>",
					"width": "150px"
				},
				{
					"field": "fileName",
					"title": "<center>Hasil Pemantauan</center>",
					"width": "150px"
				},
				{
					"field": "hasilPengukuran",
					"title": "<center>Hasil Pengukuran</center>",
					"width": "150px"
				}
			];

			$scope.optionsGridPemantauan = {
				dataSource: $scope.listGridPemantauan,
				pageable: false,
				editable: {
					mode: "inline",
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnPemantauan
			};

			var init = function () {
				ManageSarpras.getOrderList("pemeriksaan-angka-kuman-udara/get-pemeriksaan-angka-kuman-udara").then(function (dat) {
					// debugger;

					$scope.listGridPemantauan = new kendo.data.DataSource({
						data: [

						],
						schema: {
							model: {
								id: "id",
								fields: {
									tanggal: { editable: false, nullable: false, validation: { required: true } },
									namaRuangan: { editable: false, nullable: false, validation: { required: true } },
									volume: { editable: false, nullable: false, validation: { required: true } },
									namaBakuMutu: { editable: false, nullable: false, validation: { required: true } },
									fileName: { editable: false, nullable: false, validation: { required: true } },
									hasilPengukuran: { editable: false, nullable: false, validation: { required: true } },

								}
							}
						},
						editable: false
					});
					dat.data.data.listtPemeriksaanAngkaKumanUdara.forEach(function (datas) {
						datas.tanggal = new Date(datas.tanggal);
						$scope.listGridPemantauan.add(datas);
					});
				})
			}
			init();

			$scope.hapus = function (data) {
				debugger;

				var x;
				if (confirm("Hapus Data?") == true) {
					ManageSarpras.getOrderList("pemeriksaan-angka-kuman-udara/delete-pemeriksaan-angka-kuman-udara?id=" + data.id).then(function (dat) {
						init();
					})
				} else {
					x = "You pressed Cancel!";
				}




			}


		}
	]);
});