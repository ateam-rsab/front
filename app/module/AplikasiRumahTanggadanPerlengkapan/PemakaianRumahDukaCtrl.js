define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaianRumahDukaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state', '$window',
		function ($q, $rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state, $window) {
			function init(){
				$scope.dataVOloaded = true;
				$scope.item = {};
				$scope.pelayanan = {};
				$scope.isRouteLoading = true;
				$scope.gridOptions = {
					toolbar: [{text: "Input Baru", name: "create"}],
					editable: "popup",
					scrollable: false,
					columns: [
						{ field: "rowNumber", title: "<h3 align=center>#<h3>", hideMe: true, width: 40},
						{ field: "namaKebutuhan", title: "<h3 align=center>Nama Sarana<h3>", width: "20%" },
						{ field: "jumlah", title: "<h3 align=center>Jumlah<h3>", width: "20%", attributes: {style: "text-align:right"} },
						{ field: "satuan", title: "<h3 align=center>Satuan<h3>", width: "20%" },
						{ field: "harga", title: "<h3 align=center>Harga (Rp)<h3>", aggregates: ["sum"], width: "10%", format: "{0:n0}", attributes: {style: "text-align:right"}},
						{ field: "total", title: "<h3 align=center>Total Harga</h3>", aggregates: ["sum"], width: "10%", format: "{0:n0}", attributes: { style: "text-align: right" }, editable: false},
						{ command: [
							// {name: "edit", text: "Edit"}, 
							{name: "destroy", text:"Hapus"}], 
							width: 120}
					],
					pageable: true,
					dataBound: function(e) {
						// set rownumber as an index
						// debugger
						e.sender._data.forEach(function(elemen, index){
							// debugger
							elemen.rowNumber = ++index;
						})
					},
					update: function(o){
						debugger;
						o.success();
					},
					edit(e){
						// hide input in edit popup window
						e.sender.columns.forEach(function (element, index /*, array */) {
							if (element.hideMe) {
								e.container.find(".k-edit-label:eq(" + index + "), "
									+ ".k-edit-field:eq( " + index + ")"
								).hide();
							}
						});
					},
					cancel(e){ 
						//prevent delete row command on cancel
					}
				};
				$q.all([
					ManageSarpras.getOrderList("pemakaian-rumah-duka/find-kamar-rumah-duka/"),
					ManageSarpras.getOrderList("pemakaian-rumah-duka/find-produk-rumah-duka/")
				])
				.then(function(res){
					$scope.sourceKamar = res[0].data.data;
					$scope.sourcePelayanan = res[1].data;
				}, (err) => {
					$scope.isRouteLoading = false;
					throw err;
				})
				.then(function(){
					var noRecTransaksi;
					if($state.current.name == "DetilPemakaianRumahDuka"){
						noRecTransaksi = $state.params.noRecStrukOrder;
						// ManageSarpras.getOrderList("daftar-pemakaian-rumah-duka/find-by-no-rec/?noRec="+$state.params.noRecStrukOrder).then(function(res){
						// 	if(res.statResponse) {
						// 		$scope.item = {}, $scope.pelayanan = {};
						// 		var dataOrder = res.data.data.result[0];
						// 		for(var key in dataOrder){
						// 			if(dataOrder.hasOwnProperty(key)){
						// 				$scope.pelayanan.kamar = {
						// 					idKamar: dataOrder.ruangan[0].kamarId,
						// 					namaKamar: dataOrder.ruangan[0].namaKamar
						// 				};
						// 				$scope.pelayanan.layanan = {
						// 					idProduk: dataOrder.pelayanan[0].idPelayanan,
						// 					namaProduk: dataOrder.pelayanan[0].namaPelayanan,
						// 					hargaSatuan: dataOrder.pelayanan[0].hargaSatuan
						// 				};
						// 				if(key.indexOf('noOrder')==0) $scope.item[key] = dataOrder[key];
						// 				else if(key.indexOf('namaPenyewa')==0) $scope.item[key] = dataOrder[key];
						// 				else if(key.indexOf('noKtp')==0) $scope.item[key] = dataOrder[key];
						// 				else if(key.indexOf('noTelp')==0) $scope.item["noTelpMobile"] = dataOrder[key];
						// 				else if(key.indexOf('alamat')==0) $scope.item[key] = dataOrder[key];
						// 				else if(key.indexOf('tglSewaAwal')==0) $scope.item["tglPelayananAwal"] = DateHelper.getTanggalFormattedNew(new Date(dataOrder[key]));
						// 				else if(key.indexOf('tglSewaAkhir')==0) $scope.item["tglPelayananAkhir"] = DateHelper.getTanggalFormattedNew(new Date(dataOrder[key]));
						// 				else if(key.indexOf('totalHargaSatuan')==0) $scope.pelayanan['hargaSatuan'] = dataOrder[key];
						// 			}
						// 		}
						// 		if(dataOrder.listPenambahan){
						// 			generateGridDatasource(dataOrder.listPenambahan);
						// 		}
						// 	}
						// 	$scope.isRouteLoading = false;
						// },(err) => {
						// 	$scope.isRouteLoading = false;
						// 	throw err;
						// });
					} else if($state.current.name == "KeluarRumahDuka"){
						$scope.hasil = true;
						$scope.isOut = true;
						noRecTransaksi = $state.params.noOrder
						// ManageSarpras.getOrderList("daftar-pemakaian-rumah-duka/find-by-no-rec/?noRec=" + $state.params.noOrder).then(function (data) {
						// 	$scope.order = data.data.data.result[0];
						// 	$scope.item = $scope.order;
						// 	$scope.item.noTelpMobile =$scope.order.noTelp;
						// 	$scope.pelayanan.layanan = {
						// 		"namaProduk":$scope.order.namaProduk
						// 	};
						// 	$scope.pelayanan.kamar = {
						// 		"namaKamar": $scope.order.namaKamar
						// 	};
						// 	$scope.item.tglPelayananAwal = new Date($scope.item.tglPelayananAwal);
						// 	$scope.item.tglPelayananAkhir = new Date($scope.item.tglPelayananAkhir);
						// 	$scope.item.listPenambahan.forEach(function(dat){
						// 		$scope.daftarPenambahanKebutuhanSarana.add(dat);
						// 	})
						// 	// $scope.daftarPenambahanKebutuhanSarana = $scope.item.penambahanKebutuhanSarana;
						// })
						$scope.Save = function () {
							debugger;
							if($scope.item.tglKeluar == undefined){
								window.messageContainer.error('Tanggal Keluar Belum Di Isi');
							}
							var saveData = {
								"strukOrder": {
									"tglKeluar": $scope.item.tglKeluar.getTime()
								}
							}
							ManageSarpras.saveDataSarPras(saveData, "daftar-pemakaian-rumah-duka/save-status-pemakaian-rumah-duka/?noRec=" + noRecTransaksi).then(function (e) {
								console.log(JSON.stringify(e.data));
								$state.go("DaftarPemakaianRumahDuka");
							})
						}
					}
					ManageSarpras.getOrderList("daftar-pemakaian-rumah-duka/find-by-no-rec/?noRec="+noRecTransaksi).then(function(res){
						if(res.statResponse) {
							$scope.item = {}, $scope.pelayanan = {};
							var dataOrder = res.data.data.result[0];
							for(var key in dataOrder){
								if(dataOrder.hasOwnProperty(key)){
									$scope.pelayanan.kamar = {
										idKamar: dataOrder.ruangan[0].kamarId,
										namaKamar: dataOrder.ruangan[0].namaKamar
									};
									$scope.pelayanan.layanan = {
										idProduk: dataOrder.pelayanan[0].idPelayanan,
										namaProduk: dataOrder.pelayanan[0].namaPelayanan,
										hargaSatuan: dataOrder.pelayanan[0].hargaSatuan
									};
									if(key.indexOf('noOrder')==0) $scope.item[key] = dataOrder[key];
									else if(key.indexOf('namaPenyewa')==0) $scope.item[key] = dataOrder[key];
									else if(key.indexOf('noKtp')==0) $scope.item[key] = dataOrder[key];
									else if(key.indexOf('noTelp')==0) $scope.item["noTelpMobile"] = dataOrder[key];
									else if(key.indexOf('alamat')==0) $scope.item[key] = dataOrder[key];
									else if(key.indexOf('tglSewaAwal')==0) $scope.item["tglPelayananAwal"] = DateHelper.getTanggalFormattedNew(new Date(dataOrder[key]));
									else if(key.indexOf('tglSewaAkhir')==0) $scope.item["tglPelayananAkhir"] = DateHelper.getTanggalFormattedNew(new Date(dataOrder[key]));
									else if(key.indexOf('totalHargaSatuan')==0) $scope.pelayanan['hargaSatuan'] = dataOrder[key];
								}
							}
							if(dataOrder.listPenambahan){
								generateGridDatasource(dataOrder.listPenambahan);
							}
						}
						$scope.isRouteLoading = false;
					},(err) => {
						$scope.isRouteLoading = false;
						throw err;
					})
					$scope.isRouteLoading = false;
				})
			};
			function generateGridDatasource(data){
				if(!data.length>0) toastr.warning("Daftar sarana belum ada", "Peringatan");
				data.forEach(function(items){
					for(var key in items){
						if(items.hasOwnProperty(key)){
							if(key.indexOf('namaBarang') == 0) items['namaKebutuhan'] = items[key];
						}
					}
					items.total = items.harga * items.jumlah;
				});
				var ds = new kendo.data.DataSource({
					data: data,
					schema: {
						model: {
							id: "rowNumber",
							fields: {
								rowNumber: {editable: false},
								namaKebutuhan: { editable: true, nullable: false, validation: { required: true } },
								jumlah: { type: "number", nullable: false, validation: { min: 0, required: true } },
								satuan: { nullable: false, validation: { required: true } },
								harga: { type: "number", nullable: false, validation: { min: 0, required: true } },
								total: { type: "number", nullable: false, validation: { min: 0, required: true } }
							}
						}
					},
					pageSize: 5,
					aggregate: [
						{ field: "harga", aggregate: "sum" }
						// { field: "total", aggregate: "sum" }
					],
					change: function(e){
						$scope.ev = e;
						if(e.action == "itemchange" && (e.field == "harga" || e.field == "jumlah")){
							
							e.items[0].total = e.items[0].jumlah * e.items[0].harga;
						}
						// e.items[0].total = e.items[0].jumlah * e.items[0].harga;
					}						
				});
				var grid = $('#gridData').data("kendoGrid");
				grid.setDataSource(ds);
				grid.dataSource.read();
			};
			// if ($state.current.name == "KeluarRumahDuka") {
			// 	debugger;
			// 	$scope.hasil = true;
			// 	$scope.isOut = true;
			// 	ManageSarpras.getOrderList("daftar-pemakaian-rumah-duka/find-by-no-rec/?noRec=" + $state.params.noOrder).then(function (data) {
			// 		$scope.order = data.data.data.result[0];
			// 		$scope.item = $scope.order;
			// 		$scope.item.noTelpMobile =$scope.order.noTelp;
			// 		$scope.pelayanan.layanan = {
			// 			"namaProduk":$scope.order.namaProduk
			// 		};
			// 		$scope.pelayanan.kamar = {
			// 			"namaKamar": $scope.order.namaKamar
			// 		};
			// 		$scope.item.tglPelayananAwal = new Date($scope.item.tglPelayananAwal);
			// 		$scope.item.tglPelayananAkhir = new Date($scope.item.tglPelayananAkhir);
			// 		$scope.item.listPenambahan.forEach(function(dat){
			// 			$scope.daftarPenambahanKebutuhanSarana.add(dat);
			// 		})
			// 		// $scope.daftarPenambahanKebutuhanSarana = $scope.item.penambahanKebutuhanSarana;
			// 	})
			// 	$scope.Save = function () {
			// 		debugger;
			// 		if($scope.item.tglKeluar == undefined){
			// 			window.messageContainer.error('Tanggal Keluar Belum Di Isi');
			// 		}
			// 		var saveData = {
			// 			"strukOrder": {
			// 				"tglKeluar": $scope.item.tglKeluar.getTime()
			// 			}
			// 		}
			// 		ManageSarpras.saveDataSarPras(saveData, "daftar-pemakaian-rumah-duka/save-status-pemakaian-rumah-duka/?noRec=" + $scope.order.noRecStrukOrder).then(function (e) {
			// 			console.log(JSON.stringify(e.data));
			// 			$state.go("DaftarPemakaianRumahDuka");
			// 		})
			// 	}
			// } else {
			// 	$scope.Save = function () {
			// 		$scope.kalkulasi();
			// 		$scope.item = ModelItem.beforePost($scope.item);
			// 		$scope.item.penambahanKebutuhanSarana = $scope.daftarPenambahanKebutuhanSarana._data;
			// 		var data = {
			// 			"strukOrder": $scope.item,
			// 			"orderPelayanan": {
			// 				"ruangan": {
			// 					"id": $scope.pelayanan.kamar.idKamar
			// 				},
			// 				"ruanganTujuan": {
			// 					"id": $scope.pelayanan.kamar.idKamar
			// 				},
			// 				"produk": {
			// 					"id": $scope.pelayanan.layanan.idProduk
			// 				},
			// 				"kamar": {
			// 					"id": $scope.pelayanan.kamar.idKamar
			// 				}
			// 			}
			// 		}
			// 		if($state.params.noRecStrukOrder) data.strukOrder.noRec = $state.params.noRecStrukOrder;
			// 		ManageSarpras.saveDataSarPras(data, "pemakaian-rumah-duka/save-pemakaian-rumah-duka/").then(function (e) {
			// 			$scope.Back();
			// 			console.log(JSON.stringify(e.data));
			// 		});
			// 	}
			// };
			$scope.Save = function () {
				var listRawRequired = [
					"item.namaPenyewa|ng-model|Nama penyewa",
					"item.noKtp|ng-model|Nomor ktp",
					"item.noTelpMobile|ng-model|Nomor telepon",
					"item.alamat|ng-model|Alamat",
					"item.tglPelayananAwal|k-ng-model|Tanggal awal",
					"item.tglPelayananAkhir|k-ng-model|Tanggal akhir",
					"pelayanan.layanan|k-ng-model|Pelayanan",
					"pelayanan.kamar|k-ng-model|Kamar",
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					$scope.kalkulasi();
					$scope.item = ModelItem.beforePost($scope.item);
					var arrSarana = [];
					var grid = $('#gridData').data("kendoGrid").dataSource;
					if(grid._data.length>0){
						grid._data.forEach(function(items){
							arrSarana.push({
								"namaBarang": items.namaKebutuhan,
								"jumlah": items.jumlah,
								"satuan": items.satuan,
								"harga": items.harga
							});
						})
					}
					$scope.item.penambahanKebutuhanSarana = arrSarana;
					var data = {
						"strukOrder": $scope.item,
						"orderPelayanan": {
							"ruangan": {
								"id": $scope.pelayanan.kamar.idKamar
							},
							"ruanganTujuan": {
								"id": $scope.pelayanan.kamar.idKamar
							},
							"produk": {
								"id": $scope.pelayanan.layanan.idProduk
							},
							"kamar": {
								"id": $scope.pelayanan.kamar.idKamar
							}
						}
					}
					if($state.params.noRecStrukOrder) data.strukOrder.noRec = $state.params.noRecStrukOrder;
					ManageSarpras.saveDataSarPras(data, "pemakaian-rumah-duka/save-pemakaian-rumah-duka/").then(function (e) {
						$scope.Back();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}
			$scope.Batal = function(){
				$state.go('DaftarPemakaianRumahDuka');
			};
			$scope.$watch("pelayanan.kamar", function () {
				// $scope.item.totalHargaSatuan = $scope.pelayanan.kamar.hargaSatuan;
				// $scope.item.hargaSatuan = $scope.pelayanan.kamar.hargaSatuan;
			});
			$scope.$watchGroup(['item.tglPelayananAwal','item.tglPelayananAkhir', 'pelayanan.layanan'],function(newVals,oldVals){
				if(newVals[0] && newVals[1] && newVals[2]["hargaSatuan"]) {
					var d1 = moment(newVals[0]), d2 = moment(newVals[1]);
					var days = Math.floor(moment.duration(d2.diff(d1)).asDays() + 1);
					$scope.pelayanan.hargaSatuan = days * newVals[2]["hargaSatuan"];
				}
			});
			$scope.Back = function () {
				window.history.back();
			};
			$scope.kalkulasi = function () {
				var grid = $('#gridData').data("kendoGrid").dataSource;
				if(grid._aggregateResult.harga != undefined)
				$scope.item.totalHargaSatuan = $scope.pelayanan.hargaSatuan + grid._aggregateResult.harga.sum;
				else
				$scope.item.totalHargaSatuan = $scope.pelayanan.hargaSatuan
				// $scope.daftarPenambahanKebutuhanSarana._view.forEach(function (data) {
				// 	$scope.item.totalHargaSatuan += parseInt(data.harga);
				// })
				// $scope.hasil = true;
			};
			init();
			$scope.getDaftarSarana = function(req){
				if(req.idKamar){
					ManageSarpras.getOrderList("map-kebutuhan-sarana-to-kamar/get-all-data?idKamar="+req.idKamar).then(function(res){
						var data = res.data.data?res.data.data:[];
						generateGridDatasource(data);

					})
				}
			}
			$scope.formatHarga = {
				format: "Rp ##.#",
				decimals: 0
			}
		}	
	]);
});