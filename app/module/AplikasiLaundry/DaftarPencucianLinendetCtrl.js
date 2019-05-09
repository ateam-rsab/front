define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPencucianLinendetCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: [],
				pageSize: 10,
			});

			var nomor = 1;
			$scope.no = 1;
			$scope.Norec = $state.params.noRec
			$scope.item.BeratLinen = $state.params.beratLinen
			$scope.item.namaMesin = $state.params.namaAlat
			$scope.noRec = $state.params.noRec;
			ManageLaundry.getOrderList("laundry/get-proses-cuci-by-norec?noRec=" + $scope.Norec).then(function (dat) {
				// debugger
				var sourceOrderBahan = [];
				//Cek data di dalam
				$scope.sourceall = dat.data.data;
				
				for (var i = 0; i < $scope.sourceall.length; i++) {
					// debugger
					if ($scope.sourceall[i].beratLinen != undefined && $scope.sourceall[i].idMesin != undefined) {
						$scope.sourceOrderHeader = $scope.sourceall[i];
						$scope.item.tglplanning = new moment(new Date($scope.sourceOrderHeader.tglplanning)).format('DD-MM-YYYY');
						$scope.item.tglPlanningAkhir = new moment(new Date($scope.sourceOrderHeader.tglPlanningAkhir)).format('DD-MM-YYYY');
					}
					if ($scope.sourceall[i].bahan != undefined) {
						var bilascuci = "• " + $scope.sourceall[i].bilas;
						var no = 1;
						var number = nomor++
						$scope.sourceall[i].bahan.forEach(function (dataTemp) {
							// debugger
							//Cek Apakah Kode Data Bilas sama, Jika sama maka kosongkan !!
							for (var x = 0; x < sourceOrderBahan.length; x++) {
								if (sourceOrderBahan[x].bilas == bilascuci) {
									bilascuci = ""
									number = ""
								}
							}
							var dataBahan = {
								"nomor": number,
								"norut": no++,
								"bilas": bilascuci,
								"idProduk": dataTemp.idProduk,
								"idSatuan": dataTemp.idSatuan,
								"jumlahBahan": dataTemp.jumlahBahan,
								"namaProduk": dataTemp.namaProduk,
								"satuan": dataTemp.satuan
							}
							sourceOrderBahan.push(dataBahan);

						})
					}
					$scope.sourceOrderBahan = sourceOrderBahan;
				}
				$scope.dataGrid = new kendo.data.DataSource({
					data: $scope.sourceOrderBahan,
					pageSize: 10
				})
				/* $scope.sourceOrderBahan = dat.data.data[0].bahan;*/
			});

			$scope.mainGridOptions = {
				pageable: true,				
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
				columns: [
					//  {
					//  "field": "nomor",
					//  "title": "<h3 align=center>No.<h3>",
					// "filterable":false,
					// "width": "20px",
					// "attributes": {
					// "class": "table-cell",
					// style: "text-align: center; font-weight: bold"
					// },

					//  },
					//  {
					//  "field": "bilas",
					//  "title": "<h3 align=center>Proses Cuci<h3>",
					// 	"filterable":false,
					//  "attributes": {
					// "class": "table-cell",
					//                            style: "text-align: left; font-weight: bold"
					//                         },
					//              "width": "90px"

					// },
					{
						"field": "norut",
						"title": "<h3 align=center>No.<h3>",
						"filterable": false,
						"width": "10px",
						"attributes": {
							"class": "table-cell",
							style: "text-align: center; font-weight: bold"
						},

					},
					{
						"field": "namaProduk",
						"title": "<h3 align=center>Nama Bahan Baku Pencucian<h3>",
						"filterable": false,
						"width": "170px"

					}, {
						"field": "jumlahBahan",
						"title": "<h3 align=center>Jumlah<h3>",
						"filterable": false,
						"width": "50px"

					}, {
						"field": "satuan",
						"title": "<h3 align=center>Satuan<h3>",
						"filterable": false,
						"width": "50px"
					}]
			};

			$scope.Tutup = function () {
				$state.go("DaftarPencucianLinen")
			}

		}
	]);
});

/*		 $scope.pindah = function(current){ 
			$state.go("PembilasanLinen",{nmmesin:$scope.item.nmmesin,kapasitas:$scope.item.kapasitas,namaPetugas:$scope.item.namaPetugas,beratLinen:$scope.item.beratLinen,prosesCuci:$scope.item.prosesCuci,mesinId:$scope.item.mesinId,petugasId:$scope.item.petugasId,ruanganAsalId:$scope.item.ruanganAsalId,noRecStrukPelayanan:$scope.item.noRecStrukPelayanan});
		 }*/