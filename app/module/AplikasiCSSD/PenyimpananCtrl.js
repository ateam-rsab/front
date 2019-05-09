define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenyimpananCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','IPSRSService', 'DateHelper', '$state','$mdDialog',
		function($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.waktuMulai = $scope.now;
			$scope.item.waktuSelesai = $scope.now;
			$scope.dataVOloaded = true;
			$scope.dataPost = [];
			var init = function () {
				$scope.listAutoClave = ModelItem.kendoHttpSource('service/list-generic/?view=StatusBerubahTidak&select=name,id', false);
				$scope.listKemasan = ModelItem.kendoHttpSource('service/list-generic/?view=StatusBaikTidakBaik&select=name,id', false);
				IPSRSService.getItem("cssd-penyimpanan/detail-penyimpanan/?strukPelayananId="+$state.params.strukPelayananId).then(function(dat){
					$scope.dataHeader = dat.data.header;
					$scope.dataGrid = dat.data.detail;
					$scope.dataGrid.forEach(function (data) {
						if (data.autoClaveId == "" || data.autoClaveId == null ) {
							data.autoClaveId = "";
							data.labelId = "";
							data.indikatorInternalId = "";
							data.bowidickId = "";
							data.attestId = "";
							data.kemasanId = "";
						} else {
							if (data.autoClaveId == 1){
								data.autoClaveTape = "Berubah"
							} else {
								data.autoClaveTape = "Tidak"
							}
							if (data.labelId == 1){
								data.label = "Berubah"
							} else {
								data.label = "Tidak"
							}
							if (data.indikatorInternalId == 1){
								data.indicatorInternal = "Berubah"
							} else {
								data.indicatorInternal = "Tidak"
							}
							if (data.bowidickId == 1){
								data.bowidick = "Berubah"
							} else {
								data.bowidick = "Tidak"
							}
							if (data.attestId == 1){
								data.attest = "Berubah"
							} else {
								data.attest = "Tidak"
							}
							if (data.kemasanId == 1){
								data.kemasan = "Baik"
							} else {
								data.kemasan = "Tidak Baik"
							}
						}
					})
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 5,
						data: $scope.dataGrid,
						autoSync: true
					});
					$scope.item.noOrder = $scope.dataHeader.noOrder;
					$scope.item.ruangan = $scope.dataHeader.ruanganAsal;
					$scope.item.operator = $scope.dataHeader.petugas;
					var tanggal = new Date($scope.dataHeader.tanggalPlanning);
					var jamMulai = new Date($scope.dataHeader.jamMulai);
					var jamSelesai = new Date($scope.dataHeader.jamAkhir);
					if ($scope.dataHeader.jamMulai == "" || $scope.dataHeader.jamMulai == "-") {
						$scope.item.jamMulai = $scope.dataHeader.jamMulai;
						$scope.item.jamSelesai = $scope.dataHeader.jamAkhir;
					} else {
						$scope.item.waktuMulai = jamMulai;
						$scope.item.waktuSelesai = jamSelesai;
					}

					if ($scope.dataHeader.tanggalPlanning == "" || $scope.dataHeader.tanggalPlanning == "-") {
						$scope.item.tanggal = new Date();
					} else {
						$scope.item.tanggal = tanggal;
					}

				});
			};
			init();

			$scope.batalTemp = function(){
				var DataGrid = [];
				$scope.dataSourceIndikator = new kendo.data.DataSource({
					pageSize : 5,
					data : DataGrid
				});
			}

		    $scope.batal = function(){
		    	$state.go('DaftarPenerimaanSterilisasiAlat');
		    }
			$scope.gridPenyimpanan = { 
				pageable: true,
				columns: [
				{
					width: "50px",
					title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
					template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='pilihBaris(dataItem)' </div>"
				},
				{ field:"namaProduk",title:"<center>Nama Barang", width:150},
				{ field:"qtyProduk",title:"<center>Jumlah", width:50},
				{ field:"satuanStandar",title:"<center>Satuan", width:50},
				{ field:"hasilIndikator",title:"<center>Hasil Indikator",
				columns: [
					{ field:"autoClaveTape",title:"<center>Auto Clave Tape", width: 100},
					{ field:"label",title:"<center>Label", width: 100},
					{ field:"indicatorInternal",title:"<center>Indicator Internal", width: 100},
					{ field:"bowidick",title:"<center>Bowidick", width: 100},
					{ field:"attest",title:"<center>Attest", width: 100},
					{ field:"kemasan",title:"<center>Kemasan", width: 100}
				]	
				}
				],
				editable: false,
				selectable: true
			};
			$scope.gridIndikator = { 
				pageable: true,
				columns: [
				{ field:"no",title:"<center>No", width: 40},
				{ field:"namaBarang",title:"<center>Nama Barang", width: 150},
				{ field:"jumlah",title:"<center>Jumlah", width: 100},
				{ field:"satuan",title:"<center>Satuan", width: 100},
				{ field:"hasilIndikator",title:"<center>Hasil Indikator",
				columns: [
					{ field:"autoClaveTape.name",title:"<center>Auto Clave Tape", width: 100},
					{ field:"label.name",title:"<center>Label", width: 100},
					{ field:"indicatorInternal.name",title:"<center>Indicator Internal", width: 100},
					{ field:"bowidick.name",title:"<center>Bowidick", width: 100},
					{ field:"attest.name",title:"<center>Attest", width: 100},
					{ field:"kemasan.name",title:"<center>Kemasan", width: 100}
				]	
				},
				{ command: 
					{
						text: "Hapus",
						click: $scope.removeItemGrid
					}, 
					title:"",
					width:100
				}
				],
				editable: false
			};
		$scope.klik = function(current){
			$scope.current = current;
			$scope.item.autoClaveTape = {"id":current.autoClaveId,"name":current.autoClaveTape};
			$scope.item.label = {"id":current.labelId,"name":current.label};
			$scope.item.indicatorInternal = {"id":current.indikatorInternalId,"name":current.indicatorInternal};
			$scope.item.bowidick = {"id":current.bowidickId,"name":current.bowidick};
			$scope.item.attest = {"id":current.attestId,"name":current.attest};
			$scope.item.kemasan = {"id":current.kemasanId,"name":current.kemasan};
		};
		$scope.removeItemGrid = function(e) {
			e.preventDefault();
			var grid = this;
			var baris = $scope.dataSourceIndikator.data();
			var row = $(e.currentTarget).closest("tr");
			grid.removeRow(row);
		};
		$scope.toggleSelectAll = function(ev) {
			var grids = $('#kGrid').data("kendoGrid");
			var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
			var items = grid.dataSource.data();
			items.forEach(function(item){
				item.selected = ev.target.checked;
				if (item.selected == true) {
					$scope.pilihBaris(item);
				} else {
					$scope.pilihBaris(item);
				}

			});
		};
		$scope.pilihBaris = function(dataItem)
		{
			var dataObj = {
				produkId : dataItem.produkId,
				namaProduk : dataItem.namaProduk,
				jumlah : dataItem.qtyProduk,
				satuan : dataItem.satuanStandar,
				noRec : dataItem.noRec
			}

			var isExist = _.find($scope.dataPost, function(dataExist){ 
				if (
					dataExist.produkId == dataObj.produkId &&
					dataExist.namaProduk == dataObj.namaProduk &&
					dataExist.jumlah == dataObj.jumlah &&
					dataExist.satuan == dataObj.satuan &&
					dataExist.noRec == dataObj.noRec) {
					return true;
			} else {
				return undefined;
			}
		});

			if(isExist == undefined)
			{
				$scope.dataPost.push(dataObj);
			}
			else
			{
				$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
					produkId: dataObj.produkId,
					namaProduk: dataObj.namaProduk,
					jumlah: dataObj.jumlah,
					satuan: dataObj.satuan,
					noRec: dataObj.noRec
				}));
			}


		};
		$scope.getProduk=function(){
			$scope.dataId = [];
			$scope.dataNamaProduk= [];
			$scope.dataSatuan= [];
			$scope.dataJumlah= [];
			$scope.dataNoRec= [];
			for (var key in $scope.dataPost) {
				if ($scope.dataPost.hasOwnProperty(key)) {
					var element = $scope.dataPost[key];
					if ( element.produkId != undefined) {
						$scope.dataId.push({"produkId":element.produkId}),
						$scope.dataNamaProduk.push({"namaProduk":element.namaProduk}),
						$scope.dataSatuan.push({"satuan":element.satuan}),
						$scope.dataJumlah.push({"jumlah":element.jumlah}),
						$scope.dataNoRec.push({"noRec":element.noRec})
					}else{
						var confirm = $mdDialog.confirm()
						.title('Peringatan!')
						.textContent('Data belum di pilih?')
						.ariaLabel('Lucky day')
						.ok('OK')

						$mdDialog.show(confirm).then(function() {
							$scope.findData();
						});
					}
				}
			}
		};
		$scope.dataSourceIndikator = new kendo.data.DataSource({
			pageSize: 5,
			data: []
		});
		$scope.tambahHasil = function () {
			$scope.getProduk();
			if ($scope.dataId.length == 0) {
				window.messageContainer.error('Silahkan Pilih Produk atau Barang')
			} else {
				var listRawRequired = [
				"item.autoClaveTape|k-ng-model|Auto Clave Tape",
				"item.label|k-ng-model|label",
				"item.indicatorInternal|k-ng-model|Indicator Internal",
				"item.bowidick|k-ng-model|Bowidick",
				"item.attest|k-ng-model|Attest",
				"item.kemasan|k-ng-model|Kemasan"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if(isValid.status){
					$scope.getProduk();
					var number = 1;
					for (var i=0; i<$scope.dataId.length;i++){
						var dataTemp = {
							"no": number++,
							"namaBarang": $scope.dataNamaProduk[i].namaProduk,
							"jumlah": $scope.dataJumlah[i].jumlah,
							"satuan": $scope.dataSatuan[i].satuan,
							"noRec": $scope.dataNoRec[i].noRec,
							"produk":{
								"id":$scope.dataId[i].produkId
							},
							"qtyProduk":$scope.dataJumlah[i].jumlah,
							"noRec":$scope.dataNoRec[i].noRec,
							"autoClaveTape":{
								"id":$scope.item.autoClaveTape.id,
								"name":$scope.item.autoClaveTape.name
							},
							"label":{
								"id":$scope.item.label.id,
								"name":$scope.item.label.name
							},
							"indicatorInternal":{
								"id":$scope.item.indicatorInternal.id,
								"name":$scope.item.indicatorInternal.name
							},
							"bowidick":{
								"id":$scope.item.bowidick.id,
								"name":$scope.item.bowidick.name
							},
							"attest":{
								"id":$scope.item.attest.id,
								"name":$scope.item.attest.name
							},
							"kemasan":{
								"id":$scope.item.kemasan.id,
								"name":$scope.item.kemasan.name
							}
						};
						$scope.dataSourceIndikator.add(dataTemp);
					}
					//loadGrid();
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}
		}
		$scope.simpan = function () {
			var dataCssdPenyimpananDetail = []
			for (var i=0;i<$scope.dataSourceIndikator._data.length;i++){
				var dataTemp =
				{
					"produk":{
						"id":$scope.dataSourceIndikator._data[i].produk.id
					},
					"qtyProduk":$scope.dataSourceIndikator._data[i].jumlah,
					"noRec":$scope.dataSourceIndikator._data[i].noRec,
					"autoClave":{
						"id":$scope.dataSourceIndikator._data[i].autoClaveTape.id
					},
					"label":{
						"id":$scope.dataSourceIndikator._data[i].label.id
					},
					"indikatorInternal":{
						"id":$scope.dataSourceIndikator._data[i].indicatorInternal.id
					},
					"bowidick":{
						"id":$scope.dataSourceIndikator._data[i].bowidick.id
					},
					"attest":{
						"id":$scope.dataSourceIndikator._data[i].attest.id
					},
					"kemasan":{
						"id":$scope.dataSourceIndikator._data[i].kemasan.id
					}
				}
				dataCssdPenyimpananDetail.push(dataTemp);
			}
			var data = 
			{
				"strukPelayanan":{
					"noRec":$state.params.strukPelayananId
				},
				"noRec":$scope.dataHeader.noRec,
				"tanggal": $scope.item.tanggal,
				"jamMulai":$scope.item.waktuMulai,
				"jamSelesai":$scope.item.waktuSelesai,
				"cssdPenyimpananDetail":dataCssdPenyimpananDetail
			}
			ManageSarpras.saveDataSarPras(data, "cssd-penyimpanan/save-penyimpanan/").then(function (e) {
				init();
				$scope.item.autoClaveTape = "";
				$scope.item.label = "";
				$scope.item.indicatorInternal = "";
				$scope.item.bowidick = "";
				$scope.item.attest = "";
				$scope.item.kemasan = "";
				$scope.dataGridHasil = [];
				var konfirmasi = $mdDialog.confirm()
				.title("Peringatan!")
				.textContent("Kembali ke Daftar Penerimaan Sterilisasi Alat?")
				.ariaLabel("Lucky Day")
				.ok("Ya")
				.cancel("Tidak")
				$mdDialog.show(konfirmasi).then(function(){
					$state.go("DaftarPenerimaanSterilisasiAlat");
				})
				//loadGrid();
			});
		}
	}
	]);
});