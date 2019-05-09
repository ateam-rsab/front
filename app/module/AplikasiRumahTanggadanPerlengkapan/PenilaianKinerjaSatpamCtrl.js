define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PenilaianKinerjaSatpamCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', '$window', '$timeout',
		function ($rootScope, $scope, ModelItem, ManageSarpras, $window, $timeout) {
			$scope.item = {};
			$scope.totalRisk = 0;
			$scope.totalProb = 0;
			$scope.totalSev = 0;
			$scope.item.tglPelayananAwal = new Date();
			$scope.item.tglPelayananAkhir = new Date();
			ModelItem.get("AplikasiRumahTanggadanPerlengkapan/PenilaianKinerjaSatpam").then(function (data) {
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.tglPelayananAwal = new Date();
				$scope.tglPelayananAkhir = new Date();
			}, function errorCallBack(err) { });
			$scope.no = 1;




			ManageSarpras.getListData("Pegawai&select=id,namaLengkap").then(function (dat) {
				$scope.listPegawai = dat.data;
			});

			$scope.daftarUraianTugas = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "uraianTugas",
						fields: {
							uraianTugas: { editable: true, nullable: false, validation: { required: true } },
							nilai: { type: "number", validation: { min: 0, required: true, max: 100 } },

						}
					}
				},
				aggregate: [
					{ field: "nilai", aggregate: "sum" }

				]
			});



			$scope.daftarKualitas = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "kualitas",
						fields: {
							kualitas: { editable: true, nullable: false, validation: { required: true } },
							nilai: { type: "number", validation: { required: true, min: 0, max: 100 } },

						}
					}
				},
				aggregate: [
					{ field: "nilai", aggregate: "sum" }

				]

			});

			$scope.daftarSikapPerilaku = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "sikapPerilaku",
						fields: {
							sikapPerilaku: { editable: true, nullable: false, validation: { required: true } },
							nilai: { type: "number", validation: { required: true, min: 0, max: 100 } },

						}
					}
				},
				aggregate: [
					{ field: "nilai", aggregate: "sum" }

				]

			});

			$scope.columnUraianTugas = [
				{
					"field": "uraianTugas",
					"title": "<center>Uraian Tugas</center>",
					"width": "100px",
					footerTemplate: "Total:"
				},
				{
					"field": "nilai",
					"title": "<center>Nilai</center>",
					"width": "100px",
					attributes: { align: "center" },
					footerTemplate: "<center>#= sum #</center> "
				},
				{
					command: ["edit", "destroy"],
					title: "&nbsp;",
					width: "75px"
				}
			];

			$scope.columnKualitas = [
				{
					"field": "kualitas",
					"title": "<center>Kualitas</center>",
					"width": "100px",
					footerTemplate: "Total:"
				},
				{
					"field": "nilai",
					"title": "<center>Nilai</center>",
					"width": "100px",
					attributes: { align: "center" },
					footerTemplate: "<center>#= sum #</center> "
				},
				{
					command: ["edit", "destroy"],
					title: "&nbsp;",
					width: "75px"
				}
			];

			$scope.columnSikapPerilaku = [
				{
					"field": "sikapPerilaku",
					"title": "<center>Sikap Perilaku</center>",
					"width": "100px",
					footerTemplate: "Total:"
				},
				{
					"field": "nilai",
					"title": "<center>Nilai</center>",
					"width": "100px",
					attributes: { align: "center" },
					footerTemplate: "<center>#= sum #</center> "
				},
				{
					command: ["edit", "destroy"],
					title: "&nbsp;",
					width: "75px"
				}
			];

			$scope.mainGridOptions1 = {
				dataSource: $scope.daftarUraianTugas,
				pageable: false,
				toolbar: [{ name: "create", text: "Tambah Data" }],
				editable: {
					mode: "inline",
					confirmation : true
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnUraianTugas
			};

			$scope.mainGridOptions2 = {
				dataSource: $scope.daftarKualitas,
				pageable: false,
				toolbar: [{ name: "create", text: "Tambah Data" }],
				editable: {
					mode: "inline",
					confirmation : true
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnKualitas
			};

			$scope.mainGridOptions3 = {
				dataSource: $scope.daftarSikapPerilaku,
				pageable: false,
				toolbar: [{ name: "create", text: "Tambah Data" }],
				editable: {
					mode: "inline",
					confirmation : true
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnSikapPerilaku
			};

			$scope.uraianTugas = function () {
				console.log("ASD");
			}

			$scope.$watch('$scope.mainGridOptions1', function () {
				debugger;
				$scope.item.harga = $scope.item.noKamar.hargaSatuan;
				$scope.item.totalHargaSatuan = $scope.item.harga * $scope.item.lamaSewaAsrama;
			});


			$scope.Save = function () {
				console.log(JSON.stringify($scope.selectedData))
				debugger;

				var uraianTugas = $scope.daftarUraianTugas._data;
				var kualitas = $scope.daftarKualitas._data;
				var sikapPerilaku = $scope.daftarSikapPerilaku._data;
				var i = 0;
				var j = 0;
				var k = 0;
				var detailUraianTugas = [];
				var detailKualitas = [];
				var detailSikapPerilaku = [];
				uraianTugas.forEach(function (data) {
					var data = {
						"uraianTugas": data.uraianTugas,
						"nilaiUraianTugas": data.nilai
					}
					detailUraianTugas[i] = data;
					i++;
				});
				kualitas.forEach(function (data) {
					var data = {
						"kualitas": data.kualitas,
						"nilaiKualitas": data.nilai
					}
					detailKualitas[j] = data;
					j++;
				});
				sikapPerilaku.forEach(function (data) {
					var data = {
						"sikapPerilaku": data.sikapPerilaku,
						"nilaiSikapPerilaku": data.nilai
					}
					detailSikapPerilaku[k] = data;
					k++;
				});
				var data = {
					"mapUraianTugas": detailUraianTugas,
					"mapKualitas": detailKualitas,
					"mapSikapPerilaku": detailSikapPerilaku,
					"namaSatpam": $scope.item.namaSatpam,
					"tglPeriodeAwal": $scope.item.tglPelayananAwal,
					"tglPeriodeAkhir": $scope.item.tglPelayananAkhir,
					"pemberiNilai": {
						"id": $scope.item.pemberiPenilaian.id
					}

				}
				debugger;
				console.log(JSON.stringify(data));
				ManageSarpras.saveDataSarPras(data, "penilaian-kinerja-satpam/save-penilaian-kinerja-satpam/").then(function (e) {
					console.log(JSON.stringify(e.data));
					$timeout(function () {

						$window.location.reload();
					}, 5000);

					$scope.item.pegawai = "";
					$scope.item.pemberiPenilaian = "";
					$scope.daftarUraianTugas.data = [];
					$scope.daftarKualitas._data = [];
					$scope.daftarSikapPerilaku._data = [];
					$scope.daftarUraianTugas.refresh();
					$scope.grid.refresh();



				});
				// $scope.item.tglAwal = "";
				// $scope.item.tglAkhir = "";
				// $scope.item.jenis = "";
				// $scope.item.nama = "";
				// $scope.item.probability = "";
				// $scope.item.humanImpact = "";
				// $scope.item.propertyImpact = "";
				// $scope.item.businessImpact = "";
				// $scope.item.preparedness = "";
				// $scope.item.internalResponse = "";
				// $scope.item.externalResponse = "";
				// $scope.daftarDataPegawai = [];
			};

			$scope.kalkulasi = function () {
				debugger
				$scope.item.totalNilai = 0;
				if ($scope.daftarUraianTugas._aggregateResult.nilai == undefined)
					$scope.daftarUraianTugas._aggregateResult.nilai = {
						"sum": 0
					}
				if ($scope.daftarKualitas._aggregateResult.nilai == undefined)
					$scope.daftarKualitas._aggregateResult.nilai = {
						"sum": 0
					}
				if ($scope.daftarSikapPerilaku._aggregateResult.nilai == undefined)
					$scope.daftarSikapPerilaku._aggregateResult.nilai = {
						"sum": 0
					}
				$scope.item.totalNilai = $scope.daftarUraianTugas._aggregateResult.nilai.sum + $scope.daftarKualitas._aggregateResult.nilai.sum + $scope.daftarSikapPerilaku._aggregateResult.nilai.sum;
				debugger;
				console.log("asd");
			}



			$scope.removeDataBahanLinen = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataBahanLinen = $scope.daftarBahanLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);

			};


		}
	]);
});
