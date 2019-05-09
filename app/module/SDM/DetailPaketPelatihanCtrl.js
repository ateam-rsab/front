define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailPaketPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'DateHelper', '$state',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper, $state) {
			$scope.item = {};
			ManageSdm.getItem("pelatihan-paket/daftar-komponen").then(function(dat){
				$scope.listKomponen = dat.data.data;
			}); 
			var init = function () {
				ManageSdm.getItem("pelatihan-paket/detail-pelatihan-paket?strukPlanningId="+$state.params.strukPlanningId+"&produkId="+$state.params.produkId).then(function(dat){
					$scope.dataDetail = dat.data;
					$scope.item.jenisPelatihan =  $scope.dataDetail.data.jenisPelatihanId;
					$scope.item.namaPaketPelatihan = $scope.dataDetail.data.namaPakrtPelatihan;
					$scope.item.penyelenggara = $scope.dataDetail.data.penyelenggara;
					$scope.item.tempat = $scope.dataDetail.data.tempat;
					$scope.item.tanggalAwal = new Date($scope.dataDetail.data.tanggalAwal);
					$scope.item.tanggalAkhir = new Date($scope.dataDetail.data.tanggalAhir);
					$scope.item.kapasitasPeserta = $scope.dataDetail.data.kapasitasPeserta;
					$scope.item.jumlahNarasumber = $scope.dataDetail.data.jumlahNarasumber;
					$scope.item.tanggalAkreditasi = new Date($scope.dataDetail.data.tanggalAkreditasi);
					var arrayJabatan = [];
					$scope.dataDetail.jabatan.forEach(function (data) {
						arrayJabatan.push({"id":data.id,"namaJabatan": data.jabatan})
					})
					$scope.item.jabatan = arrayJabatan;
					$scope.dataGridJpl = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataDetail.jpl
					});
					$scope.dataGridKreditAkreditasi = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataDetail.kreditAkreditasi,
						batch: true
					});
					var setDataBiaya = [];

					for (var i=0;i<$scope.dataDetail.biaya.length;i++) {
						$scope.listKomponen.forEach(function (data) {
							if ($scope.dataDetail.biaya[i].idKomponen == data.id) {
								var dataTemp = 
								{
								  "komponen": data,
								  "qty": $scope.dataDetail.biaya[i].qtyProduk,
								  "hargaSatuan": $scope.dataDetail.biaya[i].hargaSatuan,
								  "setBiayaPeserta": $scope.dataDetail.biaya[i].isSetBiayaPeserta,
								  "total": $scope.dataDetail.biaya[i].totalHarga
								}
								setDataBiaya.push(dataTemp);
							}
							
						})
					}
					$scope.dataGridBiaya = new kendo.data.DataSource({
						pageSize: 10,
						data: setDataBiaya,
						schema: {
							model: {
								fields: {
									qty: { type: "number"},
									hargaSatuan: {type: "number", editable:false},
									total: { type: "number"},
									setBiayaPeserta: { type: "boolean"}

								}
							}
						},
						aggregate: [ 
						{ field: "total", aggregate: "sum" }]
					});
					$scope.formatRupiah = function(value, currency) {
						return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
					};
					$scope.mainGridBiaya = { 
						pageable: true,
						columns: [
						{ field:"komponen.namaProduk",title:"Komponen",width:100,footerTemplate: "Grand Total:",editor: $scope.dropDownKomponen, template: "#=komponen.namaProduk#" },
						{ field:"qty",title:"Qty",width:40 },
						{ field:"hargaSatuan",title:"Harga Satuan",width:100, },
						{ field:"total",title:"Total Harga",width:100, editable:false, aggregates: ["sum"], footerTemplate: "{{formatRupiah('#: sum #', 'Rp.')}}" },
						{ field:"setBiayaPeserta",title:"Set Biaya Peserta",width:100, template:'<input ng-model = "dataItem.setBiayaPeserta" type="checkbox" ng-change="getClick(dataItem)" disabled></input>' }],
						editable: false
					};
					
				}); 
			}
			init();
			$scope.listJenisPelatihan = ModelItem.kendoHttpSource('service/list-generic/?view=JenisPelatihan&select=jenisPelatihan,id', true);
			$scope.listEselon = ModelItem.kendoHttpSource('service/list-generic/?view=Eselon&select=eselon,id', true);
			$scope.listGolongan = ModelItem.kendoHttpSource('service/list-generic/?view=Golongan&select=name,id', true);
			$scope.listJabatan = ModelItem.kendoHttpSource('service/list-generic/?view=Jabatan&select=namaJabatan,id', true);
			$scope.listBadanAkreditasi = [
			{"id":1,"name":"BPP SDM"},
			{"id":2,"name":"PPNI"}]
			$scope.listJenisKepegawaian = [
			"Peserta",
			"Panitia",
			"Narasumber"
			];
			
			$scope.dropDownKomponen = function(container, options) {
				var editor = $('<input kendo-combo-box required k-data-text-field="\'namaProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-on-change="getSaldoStok(dataItem)" k-data-source="listKomponen" data-bind="value:' + options.field + '"/>')
				.appendTo(container);
			}
			$scope.getSaldoStok = function(dataItem){
				$scope.dataItem = dataItem;
				$scope.dataItem.hargaSatuan = dataItem.komponen.hargaSatuan;
			}
			$scope.dropDownJenisKepegawaian = function(container, options) {
				$('<input required name="' + options.field + '"/>')
				.appendTo(container)
				.kendoDropDownList({
					autoBind: false,
					dataSource: $scope.listJenisKepegawaian
				});
			}
			$scope.tambahJpl =function () {
				var data = {
					"eselon":{"id":$scope.item.eselon.id, "eselon":$scope.item.eselon.eselon},
					"golongan":{"id":$scope.item.golongan.id, "golongan":$scope.item.golongan.name},
					"jpl": $scope.item.jpl
				}
				$scope.dataGridJpl.add(data)
			}
			$scope.mainGridJpl = { 
				pageable: true,
				columns: [
				{ field:"jpl",title:"JPL" },
				{ field:"eselon",title:"Eselon" },
				{ field:"golongan",title:"Golongan" }],
				editable: false
			};
			
			
			$scope.mainGridKreditAkreditasi = { 
				pageable: true,
				columns: [
				{ field:"jenisKepersetaan",title:"Jenis Kepesertaan", editor: $scope.dropDownJenisKepegawaian },
				{ field:"skp",title:"SKP" }],
				editable: false
			};
			
			
			$scope.getClick = function(item){
				if(item.setBiayaPeserta){
					for(var i = 0; i<$scope.dataGridBiaya.data().length; i++){
						var ditem = $scope.dataGridBiaya.at(i)
						if(ditem !== item){
							ditem.set('setBiayaPeserta', false);
						}
					}

				}
			}
			$scope.viewGrid = function () {
				$state.go('DaftarPaketPelatihan',{})
			}
			$scope.item.jabatan = [];
			$scope.simpan = function () {
				var jabatan = [];
				var pelatihanJpl = [];
				var pelatihanKreditAkreditsi = [];
				var pelatihanPaketBiaya = [];
				$scope.item.jabatan.forEach(function (data) {
					var dataJabatan = {
						"id":data.id
					}
					jabatan.push(dataJabatan);
				})
				$scope.dataGridJpl._data.forEach(function (data) {
					var dataJpl = {
						"eselon":{
							"id":data.eselon.id
						},
						"golongan":{
							"id":data.golongan.id
						},
						"jpl":data.jpl
					}
					pelatihanJpl.push(dataJpl);
				})
				$scope.dataGridKreditAkreditasi._data.forEach(function (data) {
					var dataKreditAkeditasi = {
						"jenisKepersetaan":data.jenisKepersetaan,
						"skp":data.skp

					}
					pelatihanKreditAkreditsi.push(dataKreditAkeditasi);
				})
				$scope.dataGridBiaya._data.forEach(function (data) {
					var dataBiaya = {
						"komponen":{
							"id":data.komponen.id
						},
						"qtyProduk":data.qty,
						"hargaSatuan":data.hargaSatuan,
						"setBiayaPeserta":data.setBiayaPeserta
					}
					pelatihanPaketBiaya.push(dataBiaya);
				})
				var dataSimpan = {
					"jenisPelatihan":{
						"id":$scope.item.jenisPelatihan.id
					},
					"jabatan":jabatan,
					"pelatihanJpl":pelatihanJpl,
					"pelatihanKreditAkreditsi":pelatihanKreditAkreditsi,
					"pelatihanPaketBiaya":pelatihanPaketBiaya,
					"namaPaketPelatihan":$scope.item.namaPaketPelatihan,
					"penyelenggara":$scope.item.penyelenggara,
					"tempat":$scope.item.tempat,
					"tanggalAwal":$scope.item.tanggalAwal,
					"tanggalAhir":$scope.item.tanggalAkhir,
					"tanggalAkreditasi":$scope.item.tanggalAkreditasi,
					"kapasitasPeserta":parseInt($scope.item.kapasitasPeserta),	
					"jumlahNarasumber":parseInt($scope.item.jumlahNarasumber),
					"akreditasiPelatihanOleh":$scope.item.pemberiAkreditasi.name
				}
				ManageSdm.saveData(dataSimpan, "pelatihan-paket/save-pelatihan-paket/").then(function(e) {
					$scope.item = {};
				});
			}
		}
		]);
});