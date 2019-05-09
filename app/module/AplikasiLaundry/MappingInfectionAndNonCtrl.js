define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MappingInfectionAndNonCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'IPSRSService', '$mdDialog', 'ManageLaundry', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, $state, IPSRSService, $mdDialog, ManageLaundry, ManageSarpras) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			},
				function errorCallBack(err) { });


			//For Validate Save
			ManageLaundry.getOrderList("mapping-jenis-linen-to-produk/get-all-master-bahanbaku-by-linen").then(function (dat) {
				$scope.SourceDataAll = dat.data.data;
			});

			ManageSarpras.getOrderList("service/list-generic/?view=SatuanStandar&select=id,satuanStandar", true).then(function (dat) {
				$scope.sourceSatuan = dat.data
			})

			ManageLaundry.getOrderList("jenis-linen/find-all-jenis-linen/").then(function (dat) {
				var lengthData = dat.data.data.data.length;
				$scope.sourceJenisLinen = []
				var dataTemp = [];
				for (var i = 0; i < lengthData; i++) {
					if (dat.data.data.data[i].namaExternal.toLowerCase() == "non infeksius" || dat.data.data.data[i].namaExternal.toLowerCase() == "infeksius") {
						var dataTemporary = [];
						dataTemporary = {
							id: dat.data.data.data[i].id,
							jenisLinen: dat.data.data.data[i].jenisLinen,
							kdJenisLinen: dat.data.data.data[i].kdJenisLinen,
							kodeExternal: dat.data.data.data[i].kodeExternal,
							namaExternal: dat.data.data.data[i].namaExternal,
							noRec: dat.data.data.data[i].noRec,
							statusEnabled: dat.data.data.data[i].statusEnabled
						}
						dataTemp.push(dataTemporary);
					}
				}

				$scope.sourceJenisLinen = dataTemp;
			});

			ManageLaundry.getOrderList("laundry/get-bahan-laundry", true).then(function (dat) {
				$scope.listbahan = dat.data;
			});

			ManageLaundry.getOrderList("alat/get-mesin-laundry", true).then(function (dat) {
				$scope.sourceMasterMesin = dat.data.data;
			});



			$scope.mainGridOptions = {
				pageable: true,
				selectable: "row",
				columns: $scope.columnProduk,
				filterable: {
					extra: false,
					operators: {
						string: {
							startsWith: "Cari Alat",
						}
					}
				},
				editable: true
			};




			$scope.columnDataAlat = [
				{
					"field": "Mesin.NamaMesin",
					"title": "<h3 align=center>Nama Mesin</h3>",
					"width": "50px",
					"filterable": false

				},
				{
					"field": "JenisPencucian.name",
					"title": "<h3 align=center>Jenis Linen</h3>",
					"width": "60px"

				},
				{
					"field": "BahanBaku.namaBahanBaku",
					"title": "<h3 align=center>Bahan Baku</h3>",
					"width": "80px"

				},
				{
					"field": "Jumlah",
					"title": "<h3 align=center>Qty</h3>",
					"width": "30px"

				},
				{
					"field": "satuanBahan.namaSatuanStandar",
					"title": "<h3 align=center>Satuan</h3>",
					"width": "60px",
					"filterable": false

				},
				{
					command: {
						text: "Hapus",
						width: "70px",
						align: "center",
						click: $scope.DeleteBhnBaku
					},
					title: "<h3 align=center>Action</h3>",
					width: "30px"
				}
			];

			$scope.DeleteBhnBaku = function (e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var data = this.dataItem(tr);
				$scope.tempdataPencucianLinen = $scope.DaftarMappingInfectionNon
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};


			$scope.AddInfection = function (argument) {
				var CountData = 0;
				for (var x = 0; x < $scope.DaftarMappingInfectionNon._data.length; x++) {
					if (($scope.DaftarMappingInfectionNon._data[x].JenisPencucian.id == $scope.item.JenisPencucian.id) &&
						($scope.DaftarMappingInfectionNon._data[x].BahanBaku.IdBahanBaku == $scope.item.namaBahanBaku.id)) {
						CountData += $scope.item.qty * 1;
					}
				}
				if (CountData != 0) {
					return window.messageContainer.error("Data Sudah ditambahkan");
				} else {
					if ($scope.item.JenisPencucian == undefined) {
						toastr.warning('Anda Belum Memilih Jenis Pencucian');
					} else if($scope.item.mesin == undefined) {
						toastr.warning('Nama Mesin Tidak Boleh Kosong');
					} else if ($scope.item.namaBahanBaku == undefined) {
						toastr.warning('Bahan Baku Tidak Boleh Kosong');
					} else if($scope.item.satuanBahan == undefined) {
						toastr.warning('Anda Belum Memilih Satuan Barang');
					} else {

						var data = {
							JenisPencucian: { id: $scope.item.JenisPencucian.id, name: $scope.item.JenisPencucian.namaExternal },
							Mesin: { NamaMesin: $scope.item.mesin.namaMesin, id: $scope.item.mesin.alatId },
							BahanBaku: { namaBahanBaku: $scope.item.namaBahanBaku.namaProduk, IdBahanBaku: $scope.item.namaBahanBaku.id },
							satuanBahan: { namaSatuanStandar: $scope.item.satuanBahan.satuanStandar, id: $scope.item.satuanBahan.id },
							Jumlah: $scope.item.qty
						}
						var count = 1;
						debugger
						if ($scope.SourceDataAll != undefined) {
							$scope.SourceDataAll.forEach(function (e) {
								if ((e.jenislinenid == $scope.item.JenisPencucian.id) && (e.produkid == $scope.item.namaBahanBaku.id)) {
									count += e.qty * 1;
								}
							})
						}

						if (count != 0) {
							return window.messageContainer.error("Jenis " + $scope.item.JenisPencucian.namaExternal + " Dengan Nama Produk " + $scope.item.namaBahanBaku.namaProduk + " Sudah Ada di database, Dengan Jumlah " + count);
						} else {
							$scope.DaftarMappingInfectionNon.add(data);
						}
					}
				}
			}

			$scope.DaftarMappingInfectionNon = new kendo.data.DataSource({
				data: [],
				batch: true
			});

			$scope.Clear = function () {
				$scope.item = {};
				$("#kGrid").data('kendoGrid').dataSource.data([]);
			}
			$scope.Cancel = function (argument) {
				$state.go('DaftarMappingInfectionAndNon');
			}

			$scope.Save = function (argument) {
				//First Tempporar Bind Array
				var data = [];
				$scope.DaftarMappingInfectionNon._data.forEach(function (e) {

					var dataTemp = {
						"jenisLinenId": e.JenisPencucian.id,
						"mesinId": e.Mesin.id,
						"produkId": e.BahanBaku.IdBahanBaku,
						"satuanStandarId": e.satuanBahan.id,
						"qty": e.Jumlah
					}
					data.push(dataTemp);
				})
				ManageLaundry.saveDataUji(data, "mapping-jenis-linen-to-produk/save-bahan-baku-by-jenislinen/").then(function (e) {
					$scope.item = {};
					$("#kGrid").data('kendoGrid').dataSource.data([]);
				})
			}

		}

	])
})