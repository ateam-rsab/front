define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemantauanPihakKetigaCtrl', ['$rootScope', '$scope', 'ModelItem', 'MasterBakuMutuService', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, MasterBakuMutuService, ManageSarpras) {

			ModelItem.get("Kesling/PemantauanPihakKetiga").then(function (data) {
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



			var files;
			var dataPost;
			$scope.onSelectFile = function (e) {
				files = e.files
			}

			$scope.Save = function () {
				var f = files;
				{
					// debugger;
					var fr = new FileReader();
					if (FileReader && f && f.length) {
						fr.readAsDataURL(f[0].rawFile);
						fr.onload = function () {

							var imageData = fr.result
							var tempArray = imageData.split(",");

							var dataPost = {
								// Create a view
								"tanggal": $scope.item.tglPemantauan,
								"jenisPekerjaan": $scope.item.jenisPekerjaan,
								"namaPerusahaan": $scope.item.namaPerusahaan,
								"hasilPemantauan": tempArray[1],
								"analisaTindakLanjut": $scope.item.analisaTindakLanjut,
								//fileInput: ,
								"fileName": f[0].name
							};

							ManageSarpras.saveDataSarPras(ModelItem.beforePost(dataPost), "pemantauan-kinerja-kesling/save-pemantauan-kinerja").then(function (e) {
								init();
								$scope.item.tglPemantauan = "";
								$scope.item.jenisPekerjaan = "";
								$scope.item.namaPerusahaan = "";
								$scope.item.analisaTindakLanjut = "";

								/*$state.go('dashboardpasien.TandaVital', {
								 noCM: $scope.noCM
								 });*/
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

			$scope.downloadFielPihakKetiga = function (selectedData) {
				if (selectedData == undefined) {
                    toastr.warning('Harap Pilih Data yang akan di download')
                } else {
					debugger;
					ManageSarpras.downloadFile('pemantauan-kinerja-kesling/download-hasil-pemantauan?id=' + selectedData.id);
					console.log(selectedData);
                }
			}

			$scope.columnPemantauan = [
				{
					"field": "tanggal",
					"title": "<center>Tanggal</center>",
					"width": "150px",
					template: '#= kendo.toString(tanggal, "dd-MMM-yyyy") #',
				},
				{
					"field": "jenisPekerjaan",
					"title": "<center>Jenis Pekerjaan</center>",
					"width": "150px"
				},
				{
					"field": "namaPerusahaan",
					"title": "<center>Nama Perusahaan</center>",
					"width": "150px"
				},
				{
					"field": "fileName",
					"title": "<center>Hasil Pemantauan</center>",
					"width": "150px"
				},
				{
					"field": "analisaTindakLanjut",
					"title": "<center>Analisa Tindak Lanjut</center>",
					"width": "150px"
				}
			];

			$scope.optionsGridPemantauan = {
				dataSource: $scope.listGridPemantauan,
				pageable: true,
				editable: {
					mode: "inline",
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnPemantauan
			};

			var init = function () {
				ManageSarpras.getOrderList("pemantauan-kinerja-kesling/get-pemantauan-kinerja").then(function (dat) {
					// debugger;

					$scope.listGridPemantauan = new kendo.data.DataSource({
						data: [

						],
						pageSize: 10,
						schema: {
							model: {
								id: "id",
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
					dat.data.data.listPemantauanKinerja.forEach(function (datas) {
						datas.pemantauanKinerjaPihakKetiga.tanggal = new Date(datas.pemantauanKinerjaPihakKetiga.tanggal);
						$scope.listGridPemantauan.add(datas.pemantauanKinerjaPihakKetiga);
					});
				})
			}
			init();

			$scope.hapus = function (data) {
				// debugger;

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