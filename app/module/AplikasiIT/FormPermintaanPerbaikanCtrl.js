define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormPermintaanPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', '$state', 'DateHelper', '$location',
		function($rootScope, $scope, ModelItem, IPSRSService, $state, DateHelper, $location) {
			ModelItem.get("IT/FormPermintaanPerbaikan").then(function(data, dataSukuCadang, dataTeknisi) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				// debugger;
				/*$scope.item.noRec=$state.params.noRec;
				$scope.item.noOrder=$state.params.noOrder;
				$scope.item.kdProduk=$state.params.kdBarang;
				$scope.item.tglPesan= $state.params.tglPesan;
				$scope.item.merkProduk=$state.params.merkProduk;
				$scope.item.typeProduk=$state.params.typeProduk;
				$scope.item.noSeri=$state.params.noSeri;
				$scope.item.keluhan=$state.params.keluhan;
				$scope.item.user=$state.params.pelapor;
				$scope.item.ngaranBarang=$state.params.namaProduk;
				$scope.item.datePesan = $state.params.datePesan;*/
				

				IPSRSService.getItem("ipsrs-perbaikan/get-one-permintaan-perbaikan?noRec="+$scope.item.noRec, true).then(function(dat){
					$scope.listBarang = dat.data.data.listIpsrsPerbaikan;
				});	
				$scope.showNgaranBarang = true;
				$scope.showNamaBarang = false;
				$scope.kerusakan = true;

				$scope.edit = function () {
					$scope.showNgaranBarang = false;
					$scope.showNamaBarang = true;
					$scope.kerusakan = false;
				}

				IPSRSService.getItem("ipsrs-perbaikan/get-one-permintaan-perbaikan?noRec="+$scope.item.noRec, true).then(function(dat){

					$scope.listUser = dat.data.data.listUser;
				});	

				IPSRSService.getItem("ipsrs-perbaikan/get-one-permintaan-perbaikan?noRec="+$scope.item.noRec, true).then(function(dat){
					$scope.dataPelapor = dat.data.data.permintaanPerbaikan;
					$scope.item.idPelapor = $scope.dataPelapor.pelaporId;
					if ($scope.dataPelapor.statusRespon == 1)
					{
						$scope.showGreen = true;
						$scope.showYellow = false;
						$scope.showRed = false;
					} else if($scope.dataPelapor.statusRespon == 2)
					{
						$scope.showGreen = false;
						$scope.showYellow = true;
						$scope.showRed = false;
					}else
					{
						$scope.showGreen = false;
						$scope.showYellow = false;
						$scope.showRed = true;
					};
					// debugger;
					$scope.item.warning = "Waktu Respon : " + $scope.dataPelapor.waktuRespon + " Menit";
				});

				IPSRSService.getItem("ipsrs-perbaikan/get-one-permintaan-perbaikan?noRec="+$scope.item.noRec, true).then(function(dat){
					$scope.dataRuangan = dat.data.data.listRuangan;
				});

				IPSRSService.getItem("ipsrs-perbaikan/get-one-permintaan-perbaikan?noRec="+$scope.item.noRec, true).then(function(dat){
					$scope.dataTeknisi = dat.data.data.listTeknisi;
				});

				IPSRSService.getItem("ipsrs-perbaikan/get-one-permintaan-perbaikan?noRec="+$scope.item.noRec, true).then(function(dat){
					$scope.dataBarang = dat.data.data.sukuCadang;
				});
				IPSRSService.getItem("ipsrs-maintenance/get-rekanan-maintenance", true).then(function(dat){
					$scope.listRekanan = dat.data.data.listRekanan;
					//debugger;
				});
				$scope.removeSukuCadang = function(e) {
					e.preventDefault();
	 				var grid = this;
				    var row = $(e.currentTarget).closest("tr");
				    grid.removeRow(row);
				};
				$scope.removeSukuCadangDariLuar = function(e) {
					e.preventDefault();
	 				var grid = this;
				    var row = $(e.currentTarget).closest("tr");
				    grid.removeRow(row);
				};
				$scope.autoComplite = function () {
					$scope.item.satuan = $scope.item.namaBarang.satuanStandar;
					$scope.item.harga = $scope.item.namaBarang.hargaNetto1;
				};

				$scope.autoComplite2 = function () {
					$scope.item.kdProduk = $scope.item.barang.kdProduk;
					$scope.item.merkProduk = $scope.item.barang.merkProduk;
					$scope.item.typeProduk = $scope.item.barang.typeProduk;
					$scope.item.noSeri = $scope.item.barang.noSeri;
					$scope.item.ngaranBarang = $scope.item.barang.namaProduk;
				};



				$scope.listStatusPengerjaan = [
				{"id":0, "statusPengerjaan":"Belum dikerjakan"},
				{"id":1, "statusPengerjaan":"Sedang dikerjakan"},
				{"id":2, "statusPengerjaan":"Sudah dikerjakan"}
				]

				$scope.total = function () {
					var jumlah = parseInt($scope.item.jumlah);
					var harga = parseInt($scope.item.harga);
					$scope.item.total = jumlah*harga;
				};
				$scope.totalSukuCadang = function () {
					var jumlah = parseInt($scope.item.jumlahSukuCadang);
					var harga = parseInt($scope.item.hargaSukuCadang);
					$scope.item.totalSukuCadang = jumlah*harga;
				};
	            $scope.showTambah1 = true;
	            $scope.Tambah1 = function() {
	            	var tempTeknisi = {
						teknisi: { id: $scope.item.pilihTeknisi1.id}
					}

	            	$scope.listTeknisi.push(tempTeknisi);
	            	// debugger;
					$scope.showTambah2 = true;
					$scope.showPilihTeknisi2 = true;
					$scope.showTambah1 = false;


	            };
	            $scope.Tambah2 = function() {

	            	var tempTeknisi = {
						teknisi: { id: $scope.item.pilihTeknisi2.id}
					}

	            	$scope.listTeknisi.push(tempTeknisi);
					$scope.showTambah3 = true;
					$scope.showPilihTeknisi3 = true;
					$scope.showTambah2 = false;

	            };
	            $scope.Tambah3 = function() {
	            	$scope.listTeknisi.push($scope.item.pilihTeknisi3.namaLengkap);
					$scope.showTambah4 = true;
					$scope.showPilihTeknisi4 = true;
					$scope.showTambah3 = false;

	            };
	            $scope.Tambah4 = function() {
	            	$scope.listTeknisi.push($scope.item.pilihTeknisi4.namaLengkap);
	            	$scope.showPilihTeknisi5 = true;
					$scope.showTambah4 = false;

	            };

				$scope.daftarSukuCadang = new kendo.data.DataSource({
					data: []
				});
				$scope.listTeknisi = [];
				$scope.daftarSukuCadang1 = [];
				$scope.daftarSukuCadangDariLuar = new kendo.data.DataSource({
					data: []
				});
				$scope.daftarSukuCadangDariLuar1 = [];
				// $scope.daftarSukuCadang = dataSukuCadang;
				// $scope.listTeknisi= dataTeknisi;

				$scope.listSukuCadang = [
				{"id":1, "name":"Suku Cadang"},
				{"id":2, "name":"Tidak Dengan Suku Cadang"}
				];

				$scope.showSukuCadang = false;
				$scope.$watch('item.sukuCadang', function(newValue, oldValue) {
					if (newValue == "Suku Cadang") {
						$scope.showSukuCadang = true;
					} else {
						$scope.showSukuCadang = false;
					}
				});
				
				$scope.columnSukuCadang = [
				{
					"field": "namaBarang",
					"title": "Nama Barang",
					"width": "120px"
				},
				{
					"field": "satuan",
					"title": "Satuan",
					"width": "150px"
				},
				{
					"field": "jumlah",
					"title": "Volume",
					"width": "150px"
				},
				{
					"field": "harga",
					"title": "harga",
					"width": "100px"
				},
				{
					"field": "total",
					"title": "Total",
					"width": "150px"
				},
				{
					"field": "tujuan",
					"title": "Tujuan",
					"width": "200px"
				}, 
				{
					command: { text: "Hapus", click: $scope.removeSukuCadang},
					title: "Hapus",
					width: 70
				}];

				$scope.columnSukuCadangPihakLuar = [
				{
					"field": "namaBarang",
					"title": "Nama Barang",
					"width": "120px"
				},
				{
					"field": "satuan",
					"title": "Satuan",
					"width": "150px"
				},
				{
					"field": "jumlah",
					"title": "Volume",
					"width": "150px"
				},
				{
					"field": "harga",
					"title": "harga",
					"width": "100px"
				},
				{
					"field": "total",
					"title": "Total",
					"width": "150px"
				},
				{
					"field": "tujuan",
					"title": "Tujuan",
					"width": "200px"
				}, 
				{
					command: { text: "Hapus", click: $scope.removeSukuCadangDariLuar},
					title: "Hapus",
					width: 70
				}];

				$scope.addSukuCadang = function() {
					// debugger;
					var tempSukuCadang = {
						idBarang: $scope.item.namaBarang.id,
						namaBarang:$scope.item.namaBarang.namaProduk,
						satuan:$scope.item.namaBarang.satuanStandar,
						jumlah:$scope.item.jumlah,
						harga:$scope.item.namaBarang.hargaNetto1,
						total:$scope.item.total,
						idTujuan: $scope.item.tujuanRuangan.id,
						tujuan:$scope.item.tujuanRuangan.namaRuangan
					}
					var temSukuCadang1 = {
						stokProdukGlobal: {id:$scope.item.namaBarang.id},
						tujuanRuangan: {id:$scope.item.tujuanRuangan.id}
					}

					$scope.daftarSukuCadang.add(tempSukuCadang);
					$scope.daftarSukuCadang1.push(temSukuCadang1);
					$scope.item.namaBarang = "";
					$scope.item.jumlah = "";
					$scope.item.total = "";
					$scope.item.tujuanRuangan = "";
					$scope.item.satuan = "";
					$scope.item.harga = "";
				};
				$scope.addSukuCadangPihakLuar = function() {
					// debugger;
					var tempSukuCadangDariLuar = {
						namaBarang:$scope.item.namaSukuCadang,
						satuan:$scope.item.satuanSukuCadang,
						jumlah:$scope.item.jumlahSukuCadang,
						harga:$scope.item.hargaSukuCadang,
						total:$scope.item.totalSukuCadang,
						idTujuan: $scope.item.tujuanRuanganSukuCadang.id,
						tujuan:$scope.item.tujuanRuanganSukuCadang.namaRuangan
					}
					var temSukuCadangDariLuar1 = {
						stokProdukGlobal: {id:$scope.item.namaSukuCadang},
						tujuanRuangan: {id:$scope.item.tujuanRuanganSukuCadang.id}
					}

					$scope.daftarSukuCadangDariLuar.add(tempSukuCadangDariLuar);
					$scope.daftarSukuCadangDariLuar1.push(temSukuCadangDariLuar1);
					$scope.item.namaSukuCadang = "";
					$scope.item.jumlahSukuCadang = "";
					$scope.item.totalSukuCadang = "";
					$scope.item.tujuanRuanganSukuCadang = "";
					$scope.item.satuanSukuCadang = "";
					$scope.item.hargaSukuCadang = "";
				};
				$scope.batal = function () {
					$scope.item.namaBarang = "";
					$scope.item.jumlah = "";
					$scope.item.total = "";
					$scope.item.tujuanRuangan = "";
					$scope.item.satuan = "";
					$scope.item.harga = "";
					$location.path('RespondPerbaikan');
				};

				$scope.showPihakLuar = function () {
					$scope.pihakLuar = true;
				};
				$scope.hidePihakLuar = function () {
					$scope.pihakLuar = false;
				}

				$scope.update=function()
				{
					$scope.showNgaranBarang = true;
					$scope.showNamaBarang = false;
					$scope.kerusakan = true;
					// IPSRSService.updateFormPermintaanPerbaikan(ModelItem.beforePost($scope.item)).then(function(e) {
					// 	// debugger;
						

	    //             });


				};
				
				$scope.simpan=function()
				{
					IPSRSService.saveFormPermintaanPerbaikan(ModelItem.beforePost($scope.item),ModelItem.beforePost($scope.daftarSukuCadang1),ModelItem.beforePost($scope.listTeknisi)).then(function(e) {
						// debugger;
						$location.path('RespondPerbaikan');

	                });


				};
				$scope.arrTeknisi = [
				{
					"teknisi": {
						"id": ""
					}
				}];

				$scope.addTeknisi = function () {
					var newData = {
						"teknisi": {
							"id": ""
						}
					}
					$scope.arrTeknisi.push(newData);
					
				}



				$scope.removeTeknisi = function (data) {
					
					$scope.arrTeknisi.splice(data,1);
				};
				

			}, function errorCallBack(err) {});
			
		}
	]);
});