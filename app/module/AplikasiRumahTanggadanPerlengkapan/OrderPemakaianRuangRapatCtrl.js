define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('OrderPemakaianRuangRapatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIT', 'ManageSarpras', 'DateHelper',
		function ($rootScope, $scope, ModelItem, ManageIT, ManageSarpras, DateHelper) {
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.isReport = true;

			$scope.now = new Date();
			$scope.item = {};

			$scope.arrKonsumsi = [];

			$scope.cekArrKonsumsi = function (konsumsi) {
				var kmsi = _.indexOf(_.pluck($scope.arrKonsumsi, "jenisKonsumsi"), konsumsi);
				// var kmsi = $scope.arrKonsumsi.indexOf(konsumsi.id);

				if (kmsi > -1) {
					$scope.arrKonsumsi.splice(kmsi, 1);
				}
				else {
					var konsum = {
						"jenisKonsumsi": konsumsi
					}
					$scope.arrKonsumsi.push(konsum);
				}
				// console.log(JSON.stringify($scope.arrKonsumsi));
			}

			$scope.removeDaftarPenambahanKebutuhanSarana = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataBarang = $scope.dataBarang
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				console.log(JSON.stringify(row));
				grid.removeRow(row);
			};

			// $scope.columnBarang = [
			// 	{
			// 		"field": "namaBarang",
			// 		"title": "Nama Barang"
			// 	},
			// 	{
			// 		"field": "jumlah",
			// 		"title": "Jumlah"
			// 	},
			// 	{
			// 		"field": "satuan",
			// 		"title": "Satuan"
			// 	},
			// 	{
			// 		command: { text: "Hapus", click: $scope.removeDaftarPenambahanKebutuhanSarana },
			// 		title: "&nbsp;",
			// 		width: "10%"
			// 	}
			// ];

			var fill = function () {
				$scope.jenisKonsumsi = [];
				$scope.jenisKonsumsi = [
					{
						"id": 1,
						"nama": "Makan"
					},
					{
						"id": 2,
						"nama": "Snack"
					}
				];
				$scope.dataBarang = new kendo.data.DataSource({
					data: [],
					editable: true
				});
			};

			fill();
			$scope.tambah = function () {
				var dataBaru = {
					"namaBarang": "",
					"jumlah": "",
					"satuan": ""
				};
				$scope.dataBarang.add(dataBaru);
			}

			$scope.dataBarang = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "namaBarang",
						fields: {
							namaBarang: { editable: true, nullable: false, validation: { required: true } },
							jumlah: { type: "number", nullable: false, validation: { min: 0, required: true } },
							satuan: { nullable: false, validation: { required: true } },
						}
					}
				}
			});

			$scope.columnBarang = [
				{
					"field": "namaBarang",
					"title": "<h3>Nama Barang</h3>",
					width: "150px"
				},
				{
					"field": "jumlah",
					"title": "<h3>Jumlah</h3>",
					width: "150px"
				},
				{
					"field": "satuan",
					"title": "<h3>Satuan</h3>",
					width: "150px"
				},
				{
					command: [{name:"edit", text: {edit:"Edit",update:"Update",cancel:"Batal"}}, {name:"destroy", text:"Hapus"}],
					title: "&nbsp;",
					width: "120px"
				}
			];

			$scope.dataBarangOptions = {
				dataSource: $scope.dataBarang,
				toolbar: [{name:"create", text:"Tambah Data"}],
				editable: {
					mode: "inline"
				},
				columns: $scope.columnBarang
			};

			$scope.removeDaftarPenambahanKebutuhanSarana = function (e) {
				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataBarang = $scope.daftarPenambahanKebutuhanSarana
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};

			$scope.$watch('item.tglRapat', function (date) {
				$scope.item.hari = DateHelper.DescDay(date);
			});

			ManageSarpras.getListData("Ruangan&select=id,namaRuangan").then(function (data) {
				$scope.sourceRuangRapat = data;
			});

			ManageSarpras.getOrderList("order-pemakaian-ruang-rapat/find-ruang-rapat/?namaRuangan=Rapat").then(function (data) {
				console.log(JSON.stringify(data.data.data.data));
				$scope.sourceRuangRapat2 = data.data.data.data;
			});

			$scope.Save = function () {
				debugger;
				if ($scope.item.tglMulaiRapat != undefined && $scope.item.tglSelesaiRapat != undefined && $scope.item.namaRuangRapat != undefined) {
					var jam = $scope.item.tglSelesaiRapat.getHours();
					if (jam == 0) {
						jam = 23;
					} else {
						jam = jam - 1;
						if (jam < 10) jam = "0" + jam;
					}
					var menit = $scope.item.tglSelesaiRapat.getMinutes();
					if (menit == 0) {
						menit = 59;
					} else {
						menit = menit - 1;
						if (menit < 10) menit = "0" + menit;
					}
					var jamMulai = $scope.item.tglMulaiRapat.getHours();
					if (jamMulai < 10) jamMulai = "0" + jamMulai;

					var menitMulai = $scope.item.tglMulaiRapat.getMinutes();
					menitMulai = menitMulai + 1;
					if (menitMulai < 10) menitMulai = "0" + menitMulai;

					debugger;
					var awal = DateHelper.getPeriodeFormatted($scope.item.tglMulaiRapat) + " " + jamMulai + ":" + menitMulai;
					var akhir = DateHelper.getPeriodeFormatted($scope.item.tglSelesaiRapat) + " " + jam + ":" + menit;
					awal = new Date(awal).getTime();
					akhir = new Date(akhir).getTime();
					var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir + "&idRuangan=" + $scope.item.namaRuangRapat.id;

					ManageSarpras.getOrderList("order-pemakaian-ruang-rapat/find-status-ruang-rapat/?" + url).then(function (dat) {
						debugger;
						var status = dat.data.data.StatusRuangRapat;
						if (status == false) {
							var data = {
								"statusEnabled": true,
								"strukOrder": {
									"tglPelayananAwal": $scope.item.tglMulaiRapat,
									"tglPelayananAkhir": $scope.item.tglSelesaiRapat,
									"ruangan": {
										"id": $scope.item.namaRuangRapat.id
									},
									"temaRapat": $scope.item.temaRapat,
									"penambahanKebutuhanSarana": $scope.dataBarang._data,
									"unitPemesan": {
										"id": $scope.item.unitPemesan.id
									},
									"jumlahPeserta": $scope.item.jumlahPeserta,
									"jumlahPanitia": $scope.item.jumlahPanitia,
									"jenisKonsumsiSet": $scope.arrKonsumsi,
									"totalHargaSatuan": 0
								},
								"orderPelayanan": {
									"produk": {
										"id": 29
									},
									"ruangan": {
										"id": $scope.item.namaRuangRapat.id
									},
									"ruanganTujuan": {
										"id": $scope.item.namaRuangRapat.id
									}
								},

							}
							// console.log(JSON.stringify(data));
							ManageIT.saveDataIT(data, "order-pemakaian-ruang-rapat/save-order-pemakaian-ruang-rapat/").then(function (e) {
								$scope.item = {};
								fill();
								$scope.arrKonsumsi = [];
								console.log(JSON.stringify(e.data));
							});
						} else {
							alert("Ruang rapat sudah terisi! Silakan pilih ruangan lain atau pilih waktu lain.");
						}
					});

				} else {
					alert("Waktu Mulai, Waktu Selesai, dan Nama Ruangan harus diisi")
				}

			}

			$scope.Back = function () {
				$scope.item = {};
				fill();
				$scope.arrKonsumsi = [];
			}
		}])
})