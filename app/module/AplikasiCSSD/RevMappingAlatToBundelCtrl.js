define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RevMappingAlatToBundelCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageCSSD', '$mdDialog',
		function ($rootScope, $scope, ModelItem, $state, ManageCSSD, $mdDialog) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
			},
				function errorCallBack(err) { });
			$scope.item = {};
			$scope.item.limit = 10;
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			$scope.$watch('item.limit', function (page) {
				if (page == "" || page == 0) {
					$scope.item.limit = 10;
					page = $scope.item.limit
				}
				$scope.fetchgridMapping(page);
			});

			$scope.$watch('item.Paket', function (paketId) {
				// debugger
				var NamaPaket = paketId;
				if (paketId != undefined) {
					$scope.fetchgridMapping(paketId, 2);
				}
			});

			ManageCSSD.getItem("cssd-sterilisasi/get-jenis-paket", true).then(function (dat) {
				$scope.listJenisPaket = dat.data.noOrderPerbaikan.data;
			});

			$scope.OnChangeJenisPaket = function (newValue) {
				ManageCSSD.getItem("cssd-sterilisasi/get-paket-by-jenis-paket?idJenisPaket=" + newValue.id, true).then(function (dat) {
					$scope.listPaket = dat.data.data;
				});
			}

			$scope.OnChangePaket = function (selectedPaket) {
				var nomor = 1;
				$scope.isLoadingData = true;
				ManageCSSD.getItem("cssd-sterilisasi/get-map-paket-to-produk?idPaket=" + selectedPaket.id, true).then(function (dat) {
					// $scope.dataSourceMapping = dat.data.data;
					var daftarMapping = dat.data.data;
					for (var i = 0; i < daftarMapping.length; i++) {
						daftarMapping[i].no = $scope.number++;
						daftarMapping[i].statCheckbox = true;
					}
					$scope.dataSourceMapping = new kendo.data.DataSource({
						pageSize: 10,
						data: daftarMapping,
						$scrollable: true,
					});
					for (var i = 0; i < daftarMapping.length; i++) {
						var tempId = daftarMapping[i].id;
						for (var y = 0; y < $scope.dataSource._data.length; y++) {
							if ($scope.dataSource._data[y].id != tempId) {
								var temps = $scope.dataSource._data[y].statCheckbox = false;
								$scope.dataSource._data[y].noRec = undefined;
								$scope.dataSource._data[y].Jumlah = "";
							};
						}
					}
					for (var i = 0; i < daftarMapping.length; i++) {
						var tempNorec = daftarMapping[i].no;
						var tempJumlah = daftarMapping[i].qty;
						var tempId = daftarMapping[i].id;
						for (var y = 0; y < $scope.dataSource._data.length; y++) {
							if ($scope.dataSource._data[y].id == tempId) {
								var temps = $scope.dataSource._data[y].statCheckbox = true;
								$scope.dataSource._data[y].noRec = tempNorec;
								// $scope.dataSource._data[y].id = true;
								$scope.dataSource._data[y].jumlah = tempJumlah;
								$scope.dataSource._data[y].Jumlah = tempJumlah;
							};
						}
					}
					reloadDataGrid(daftarMapping);
					// getAllProdukCSSD();
					// $scope.dataSource = new kendo.data.DataSource({
					// 	pageSize: 50,
					// 	data: daftarMapping
					// 	// data: []
					// })
					// $scope.dataSource._data.push($scope.dataAlat)
				});
			}


			$scope.mainGridOptions = {
				pageable: true,
				height: 300,
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

			$scope.Cari = function (GetPencarian) {
				if (GetPencarian != undefined) {
					var q = GetPencarian;
					var grid = $("#kGrid2").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [
								{ field: "namaAlat", operator: "contains", value: q }
							]
						}
					});
				}
			}

			$scope.ClearCari = function () {
				$scope.item.Paket = 10;
				$scope.Pencarians = "";
				var gridData = $("#kGrid2").data("kendoGrid");
				gridData.dataSource.filter({});
			}


			$scope.number = 1;
			var getAllProdukCSSD = function () {
				ManageCSSD.getItem("cssd-sterilisasi/get-produk-cssd").then(function (res) {
					var dataAlat = res.data.data;
					$scope.dataAlat = dataAlat;
					for (var i = 0; i < dataAlat.length; i++) {
						dataAlat[i].statCheckbox = false;
						dataAlat[i].idAlat = dataAlat[i].id;
					}
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 50,
						data: dataAlat,
						$scrollable: true,
						schema: {
							model: {
								id: "idGridAlat",
								fileds: {
									id: { editable: false },
									namaAlat: { editable: false },
									jumlah: { editable: true },
									satuanStandar: { editable: false },
								}
							}
						}
					});
					$scope.dataAlat = dataAlat
					var grid = $('#kGrid').data("kendoGrid");
					grid.setDataSource($scope.dataSource);
					grid.refresh();
				});
			}
			getAllProdukCSSD();
			$scope.fetchgridMapping = function (page) {
				$scope.isLoadingData = true;
				ManageCSSD.getItem("cssd-sterilisasi/get-map-paket-to-produk?idPaket=" + 0).then(function (dat) {
					var daftarMapping = dat.data.data;
					if (daftarMapping[0] != undefined) {
						for (var i = 0; i < daftarMapping.length; i++) {
							daftarMapping[i].no = $scope.number++;
							daftarMapping[i].statCheckbox = false;
						}
						$scope.dataSourceMapping = new kendo.data.DataSource({
							pageSize: 10,
							data: daftarMapping,
							$scrollable: true,
						});
						for (var i = 0; i < daftarMapping.length; i++) {
							var tempId = daftarMapping[i].id;
							for (var y = 0; y < $scope.dataSource._data.length; y++) {
								if ($scope.dataSource._data[y].id != tempId) {
									var temps = $scope.dataSource._data[y].statCheckbox = false;
									$scope.dataSource._data[y].noRec = undefined;
									$scope.dataSource._data[y].Jumlah = "";
								};
							}
						}
						for (var i = 0; i < daftarMapping.length; i++) {
							var tempNorec = daftarMapping[i].no;
							var tempJumlah = daftarMapping[i].qtyProduk;
							var tempId = daftarMapping[i].id;
							for (var y = 0; y < $scope.dataSource._data.length; y++) {
								if ($scope.dataSource._data[y].id == tempId) {
									var temps = $scope.dataSource._data[y].statCheckbox = true;
									$scope.dataSource._data[y].noRec = tempNorec;
									// $scope.dataSource._data[y].id = true;
									$scope.dataSource._data[y].jumlah = tempJumlah;
									$scope.dataSource._data[y].Jumlah = tempJumlah;
								};
							}
						}
						reloadDataGrid($scope.dataSource._data);
					}
				});
				$scope.isLoadingData = true;
			}

			// $scope.fetchgridMapping();




			$scope.columnDataAlat = [
				{
					"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
					template: "# if (statCheckbox) { #" +
						"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
						"# } else { #" +
						"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
						"# } #",
					width: "15px"
				},
				{
					"field": 'id',
					hidden: true
				},
				{
					"field": "namaProduk",
					"title": "<h3 align=center>Nama Alat</h3>",
					"width": "120px"

				},
				{
					"field": "qty",
					"title": "<h3 align=center>Jumlah</h3>",
					"width": "50px",
					"filterable": false

				},
				{
					"field": "satuanStandar",
					"title": "<h3 align=center>Satuan</h3>",
					"width": "60px",
					"filterable": false

				}
			];

			$scope.columnDataMapping = [
				{
					"field": "no",
					"title": "<h3 align=center>No.<h3>",
					"width": "20px"
				},
				{
					"field": "namaPaket",
					"title": "<h3 align=center>Nama Paket</h3>",
					"width": "100px"

				},
				{
					"field": "namaProduk",
					"title": "<h3 align=center>Nama Alat</h3>",
					"width": "100px"

				},
				{
					"field": "qty",
					"title": "<h3 align=center>Jumlah</h3>",
					"width": "80px"

				},
				// {
				// 	"field": "satuanStandar",
				// 	"title": "<h3 align=center>Satuan</h3>",
				// 	"width": "80px"

				// },
				{
					"title": "<h3 align=center>Action</h3>",
					"width": "90px",
					"template": "<button class='btnHapus' ng-click='disableData()'>Unmapping</button>"
				}
			];

			$scope.disableData = function () {
				debugger
				var AllData = this.dataItem;
				var data = {
					"id": AllData.id
				}
				data.push(dataTemp)
				console.log(data);
				ManageCSSD.saveDataSarPras(data, "cssd-sterilisasi/unmapping-paket-to-produk").then(function (e) {
				});
			}

			$scope.tutup = function () {
				$state.go("home")
			}

			$scope.selectRow = function (dataItem) {
				var dataSelect = dataItem

				// _.find($scope.dataSource._data, function (data) {
				// 	return data.id == dataItem.id;
				// });

				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
					dataSelect.Jumlah = null;
					// dataSelect.dirty = true;
					// dataSelect.id = true;
					dataSelect.idplh = true;
				} else {
					dataSelect.statCheckbox = true;
					// dataSelect.dirty = false;
					// dataSelect.id = false;
					dataSelect.idplh = true;
				}
				// reloadDataGrid(dataSelect);
			}

			var isCheckAll = false;
			$scope.selectUnselectAllRow = function () {
				var tempData = $scope.dataSource._data;

				if (isCheckAll) {
					isCheckAll = false;
					for (var i = 0; i < tempData.length; i++) {
						tempData[i].statCheckbox = false;
						tempData[i].idplh = true;
					}
				}
				else {
					isCheckAll = true;
					for (var i = 0; i < tempData.length; i++) {
						tempData[i].statCheckbox = true;
						tempData[i].idplh = true;
					}
				}
				reloadDataGrid(tempData);

			}


			function reloadDataGrid(ds) {

				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#kGrid').data("kendoGrid");

				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}

			var aktif = false;
			var aktif = 0;
			$scope.check = function () {
				if (aktif)
					aktif = 0;
				else
					aktif = 1;
			}

			$scope.klikmapping = function (ambildata) {
				$scope.bundel = ambildata.bundel;
				$scope.idSatuan = ambildata.idSatuan;
				$scope.idalat = ambildata.idalat;
				$scope.jumlah = ambildata.jumlah;
				$scope.bundel = ambildata.bundel;
				$scope.IdMapping = ambildata.id;
				$scope.satuanStandar = ambildata.satuanStandar;
				$scope.statCheckbox = ambildata.statCheckbox
				console.log("Nama Alat : " + $scope.ambildata.namaAlat + " Terpilih");
			}

			$scope.Simpan = function () {
				var data = [];

				$scope.dataSource._data.forEach(function (croot) {
					var dataTemp = {
						"qtyProduk": croot.qty,
						"paketId": $scope.item.Paket.id,
						"produkId": croot.idAlat,
						"satuanId": croot.satuanId,
					}
					if ($scope.item.Paket.id != undefined && croot.id != undefined && croot.qty != undefined && croot.satuanId != undefined) {
						data.push(dataTemp)
					}

				})
				console.log(data);
				ManageCSSD.saveDataSarPras(data, "cssd-sterilisasi/save-all-map-paket-to-produk").then(function (e) {
					console.log(data);
					$scope.fetchgridMapping();

					// alert('sukses');
				})
			}
		}

	]);
});


//================================================SOURCE OLD ================================================

// $scope.Simpan = function(){
//     if(($scope.item.bundel != undefined)){		
//           var confirm = $mdDialog.confirm()
//                    .title('Peringatan!')
//                    .textContent('Apakah anda akan Mapping data ini?')
//                    .ariaLabel('Lucky day')
//                    .ok('Ya')
//                    .cancel('Tidak')

//          $mdDialog.show(confirm).then(function() {
//            $scope.Save();
//          })
//         }else{
//         	window.messageContainer.error('Pilih Bundel Terlebih dahulu');
//         }
//           }

// $scope.Save = function(){
//   		var data = [];
//   	    for(var i=0; i<$scope.dataSource._data.length; i++){
//   			if(($scope.dataSource._data[i].statCheckbox)&&($scope.dataSource._data[i].idplh == true)){
//                      data.push({ "bundleSetAlat" : {id : $scope.item.bundel.id},
// 						"alat" : {"id" : $scope.dataSource._data[i].id},
// 						"jumlah" : parseInt($scope.dataSource._data[i].Jumlah),
// 						"statusEnabled" : $scope.dataSource._data[i].statCheckbox,
// 						"id" : $scope.dataSource._data[i].noRec
// 					 },)
//   		    }else if(($scope.dataSource._data[i].statCheckbox == false)&&($scope.dataSource._data[i].idplh == true)){
//                      data.push({ "bundlesetalat" : {id : $scope.item.bundel.id},
// 						"alat" : {"id" : $scope.dataSource._data[i].id},
// 						"jumlah" : parseInt($scope.dataSource._data[i].Jumlah),
// 						"statusEnabled" : $scope.dataSource._data[i].statCheckbox,
// 						"id" : $scope.dataSource._data[i].noRec
// 			},)
//   		    }
//   	   }
//             ManageCSSD.saveDataSarPras(data,"mapping-alat-to-bundle/save-all-mapping-alat-to-bundle/").then(function(e) {
//             	$scope.fetchgridMapping()
//    });
//    }



// ManageCSSD.getItem("bundlesetalat/get-bundle-set-alat", true).then(function(dat){
//     $scope.listBundel = dat.data.data;
// });