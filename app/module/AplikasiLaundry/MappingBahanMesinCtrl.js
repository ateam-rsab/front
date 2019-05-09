define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MappingBahanMesinCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLaundry', 'FindLaundry', '$timeout', '$window', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageLaundry, FindLaundry, $timeout, $window, $state) {
			$scope.item = {};
			ModelItem.get("Laundry/PenerimaanLinen").then(function (data) {
				$scope.item = data;
				// $scope.item.petugas = "admin";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.no = 1;
			$scope.now = new Date();

			$scope.batal = function () {
				$state.go('home');
			}

			$scope.reset = function () {
				$scope.item.mesin = "";
				$scope.item.kapasitas = "";
				$scope.item.prosesCuci = "";
				$scope.item.namaProduk = "";
				$scope.item.jumlah = "";
				$scope.item.satuanStandar = "";
			}
			// FindLaundry.getRuangan("/penerimaan-linen/find-ruang-loundry/").then(function(dat){
			// 	$scope.sourceRuangan = dat.data.data;
			// 	// debugger;
			// });
			$scope.sourceMasterProsesCuci = [{
				namaProduk: "Barang 1 (Dummy)",
				produkId: 1
			}];

			//FindLaundry.getLaundry("map-bahan-to-mesin/get-all-proses-cuci").then(function(dat){
			//$scope.sourceMasterProsesCuci= dat.data.data;
			//  });

			FindLaundry.getLaundry("map-bahan-to-mesin/get-all-mesin-cuci").then(function (dat) {
				$scope.sourceMasterMesin = dat.data.data;

			});
			FindLaundry.getLaundry("map-bahan-to-mesin/get-satuan-bahan").then(function (dat) {
				$scope.sourceSatuan = dat.data.data;
			});


			FindLaundry.getLaundry("map-bahan-to-mesin/get-all-bahan").then(function (dat) {
				$scope.sourceMasterProduk = dat.data;
			});

			$scope.satuan = function () {
				debugger
				if ($scope.item.mesin != undefined) {
					$scope.item.kapasitas = $scope.item.mesin.kapasitasAlat;
				}
				//		$scope.item.satuanKg = $scope.item.mesin.satuanStandarKapasitas;

			};

			$scope.batton = function () {
				if ($scope.item.mesin == $scope.item.mesin) {
					$scope.item.kapasitas = $scope.item.mesin.kapasitasAlat
					debugger;
				}
			}

			$scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			});
			//	$scope.columndataPenerimaanLinen = [{
			//		"field": "ruangan.namaRuangan",
			//		"title": "<h3 align=center>Nomor Terima<h3>",
			//		"width": "300px"
			//	},{
			//		"field": "ruangan.namaRuangan",
			//		"title": "<h3 align=center>Ruangan<h3>",
			//		"width": "300px"
			//	}, {
			//		"field": "berat",
			//		"title": "<h3 align=center>Berat<h3>",
			//		"width": "100px",
			//		"attributes": {align:"center"}
			//	}, {
			//		"field": "satuan.satuanStandar",
			//		"title": "<h3 align=center>Satuan<h3>",
			//		"width": "100px",
			//		"attributes": {align:"center"}
			//	}, {
			//       command: { 
			//        	text: "Hapus",
			//        	width:"50px", 
			//        	align:"center",
			//			attributes: {align:"center"},
			//        	click: $scope.removeDataPenerimaanLinen 
			//        	},
			//        title: "<h3 align=center>Action</h3>",
			//        width: "80px"
			//	}];


			$scope.mainGridOptions = {
				pageable: true,
				change: onChange,
				pageSize: 10,
				selectable: 'row',
				scrollable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				columns: [{
					"field": "no",
					"title": "No",
					"width": "200px",
					"filterable": false
				}, {
					"field": "namaBahan.namaProduk",
					"title": "Nama Bahan",
					"width": "200px",
					"filterable": false
				}, {
					"field": "jumlah",
					"title": "Jumlah",
					"filterable": false

				}, {
					"field": "satuan",
					"title": "Satuan",
					"filterable": false


				}, {
					command: {
						text: "Hapus",
						width: "50px",
						align: "center",
						attributes: { align: "center" },
						click: $scope.removeDataPenerimaanLinen
					},
					title: "Action",
					width: "80px"



				}],
				pageable: true,
				sortable: false,
				selectable: "row",
				editable: "popup"
			};


			var onChange = function (e) {
				//var inputId = this.element.attr("id");
				//  console.log(inputId);
				var grid = $(this).data("mainGridOptions");

			}

			$scope.addDataPenerimaanLinen = function () {
				// var tgl = DateHelper.getTanggalFormatted($scope.item.tanggal);
				var tempDataPenerimaanLinen = {
					"no": $scope.no++,
					"namaBahan": $scope.item.namaProduk,
					"jumlah": $scope.item.jumlah,
					"satuan": $scope.item.satuanStandar.satuanBahan,
					"kapasitasAlat": $scope.item.kapasitas,
					"namaAlat": $scope.item.mesin.namaAlat,
					"prosesCuciId": $scope.item.prosesCuci.produkId,
					"namaProsesCuci": $scope.item.prosesCuci.namaProduk,
					"alatId": $scope.item.mesin.alatId,
					"satuanId": $scope.item.satuanStandar.id
				}
				$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
				$scope.item.namaProduk = "",
					$scope.item.jumlah = "",
					$scope.item.satuanStandar = ""
			}

			$scope.removeDataPenerimaanLinen = function (e) {
				e.preventDefault();
				debugger;
				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};

			$scope.Save = function () {
				var dat = $scope.dataPenerimaanLinen._data;

				var i = 0;
				var mapPenerimaanLinen = [];
				dat.forEach(function (data) {
					var data = {
						"id": "",
						"namaBahan": data.namaBahan.namaProduk,
						"jumlah": data.jumlah,
						"namaSatuan": data.satuan,
						"kapasitasAlat": data.kapasitasAlat,
						"namaAlat": data.namaAlat,
						"statusEnabled": "",
						"prosesCuciId": data.prosesCuciId,
						"namaProsesCuci": data.namaProsesCuci,
						"bahanId": data.namaBahan.produkId,
						"alatId": data.alatId,
						"satuanId": data.satuanId
					}
					mapPenerimaanLinen[i] = data;
					i++;
				})

				ManageLaundry.saveLaundry(mapPenerimaanLinen, "map-bahan-to-mesin/save").then(function (e) {
					$timeout(function () {
						$window.location.reload();
					}, 5500);
				});

			};
		}
	]);
});
