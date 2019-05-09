define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengajuanUsulanAnggaranCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, ModelItem, DateHelper, PengajuanUsulanAnggaranService) {

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.now = new Date();

			/*
			$scope.listKemenLemb = [
				{id: '1', name: 'kemenLemb-1'},
				{id: '2', name: 'kemenLemb-2'},
				{id: '3', name: 'kemenLemb-3'}
			];

			$scope.listUnitOrg = [
				{id: '1', name: 'UnitOrg-1'},
				{id: '2', name: 'UnitOrg-2'},
				{id: '3', name: 'UnitOrg-3'}
			];

			$scope.listUnitKerja = [
				{id: '1', name: 'UniKerja-1'},
				{id: '2', name: 'UniKerja-2'},
				{id: '3', name: 'UniKerja-3'}
			];
			
			$scope.listProgram = [
				{id: '1952', name: 'Program-1952'},
				{id: '1953', name: 'Program-1953'},
				{id: '1954', name: 'Program-1954'}
			];
			$scope.listTahun = [
				{"id": "1", "name": "2017"},
				{"id": "2", "name": "2018"},
				{"id": "3", "name": "2019"},
				{"id": "4", "name": "2020"},
				{"id": "5", "name": "2021"}
			];
			*/

			/* $scope.listKegiatan = [
				{"id": "1", "namaKegiatan": "kegiatan 1"},
				{"id": "2", "namaKegiatan": "kegiatan 2"},
				{"id": "3", "namaKegiatan": "kegiatan 3"},
				{"id": "4", "namaKegiatan": "kegiatan 4"},
				{"id": "5", "namaKegiatan": "kegiatan 5"}
			];

			$scope.listKegiatanDetail = [
				{"id": "1", "namaKegiatanDetail": "kegiatan detil 1"},
				{"id": "2", "namaKegiatanDetail": "kegiatan detil 2"},
				{"id": "3", "namaKegiatanDetail": "kegiatan detil 3"},
				{"id": "4", "namaKegiatanDetail": "kegiatan detil 4"},
				{"id": "5", "namaKegiatanDetail": "kegiatan detil 5"}
			];

			$scope.listKodeOutput = [
				{"id": "1", "namaOutput": "kode output 1"},
				{"id": "2", "namaOutput": "kode output 2"},
				{"id": "3", "namaOutput": "kode output 3"},
				{"id": "4", "namaOutput": "kode output 4"},
				{"id": "5", "namaOutput": "kode output 5"}
			]; */


			$scope.kolomKegiatan = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				},
            	{
					"field": "kegiatan.namaKegiatan",
					"title": "Kegiatan"
				}, 
				{
					"field": "kegiatanDetail.namaKegiatanDetail",
					"title": "Detil Kegiatan"
				},
				{
					"field": "output.namaOutput",
					"title": "Output"
				},{
					"field": "no",
					"title": "Action",
					//command: "edit",
					template: "<a class=\"k-button k-button-icontext k-grid-edit\" ng-click=\"tambahKegiatan()\"><span class=\"k-icon k-edit\"></span>Tambah Detil</a>",
                	width: "250px"
				}/*, {
					command: [ "edit", "destroy" ] 
				}*/
		    ];

			
			PengajuanUsulanAnggaranService.getGetData("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
				$scope.listSumberDana = dat;
				// debugger;
			}); 

			PengajuanUsulanAnggaranService.getGetData("KemenLemb&select=*", true).then(function(dat){
				$scope.listKemenLemb = dat;
				// debugger;
			});

			PengajuanUsulanAnggaranService.getGetData("UnitOrg&select=*", true).then(function(dat){
				$scope.listUnitOrg = dat;
				// debugger;
			})

			PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan,kdRuangan", true).then(function(dat){
				$scope.listRuanganUnitKerja = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("Produk&select=id,kdProduk,namaProduk", true).then(function(dat){
				$scope.listNamaProduk = dat;
				// debugger;
			});
			
			PengajuanUsulanAnggaranService.getGetData("Pengendali&select=id,kodePengendali,namaPengendali", true).then(function(dat){
				$scope.listPengendali = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("Kegiatan&select=id,kodeKegiatan,namaKegiatan", true).then(function(dat){
				$scope.listKegiatan = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("KegiatanDetail&select=id,kodeKegiatanDetail,namaKegiatanDetail", true).then(function(dat){
				// $scope.listKegiatanDetail = dat;
				// disesuaikan backend pak Chandra
				$scope.listKegiatanDetail = dat.data;
				// debugger;
			});

			PengajuanUsulanAnggaranService.getGetData("Output&select=id,kodeOutput,namaOutput", true).then(function(dat){
				$scope.listKodeOutput = dat;
			});

			PengajuanUsulanAnggaranService.getKomponen("komponen/find-all-komponen/", true).then(function(dat){
				$scope.listKomponen = dat.data.data;
			});

			PengajuanUsulanAnggaranService.getGetData("ChartOfAccount&select=id,kdAccount,namaAccount", true).then(function(dat){
				$scope.listKodeAkun = dat;
			});

			PengajuanUsulanAnggaranService.getGetData("JenisBelanja&select=id,kodeJenisBelanja,namaJenisBelanja,ketJenisBelanja", true).then(function(dat){
				$scope.listJenisBelanja = dat;
				// debugger;
			});

			PengajuanUsulanAnggaranService.getGetData("JenisPengadaan&select=id,kodeJenisPengadaan,namaJenisPengadaan,ketJenisPengadaan", true).then(function(dat){
				$scope.listJenisPengadaan = dat;
				// debugger;
			});
			
			PengajuanUsulanAnggaranService.getGetData("SatuanStandar&select=id,satuanStandar", true).then(function(dat){
				$scope.listUnit = dat;
				// debugger;
			});
			
			PengajuanUsulanAnggaranService.getGetData("UnitKerja&select=*", true).then(function(dat){
				$scope.listUnitKerja = dat;
				// debugger;
			});
			
			PengajuanUsulanAnggaranService.getGetData("Program&select=id,namaProgram", true).then(function(dat){
				$scope.listProgram = dat;
				// debugger;
			});

			/*
			$scope.listSumberDana = [
				{"id" : '1', "kdAsalProduk" : '001', "asalProduk" : "HIBAH"},
				{"id": '2', "kdAsalProduk": '002', "asalProduk": "SUMBANGAN"},
				{"id": '3', "kdAsalProduk": '003', "asalProduk": "SUBSIDI"},
				{"id": '4', "kdAsalProduk": '004', "asalProduk": "KAS"}, 
				{"id": '5', "kdAsalProduk": '005', "asalProduk": "PINJAMAN"}
			];

			$scope.listRuanganUnitKerja = [
				{id: '1', namaRuangan: 'BAG SDM', kdRuangan: '001'},
				{id: '2', namaRuangan: 'BAG HUMAS', kdRuangan: '002'},
				{id: '3', namaRuangan: 'BAG POLIKLINIK', kdRuangan: '003'},
				{id: '4', namaRuangan: 'BAG GIZI', kdRuangan: '004'},
				{id: '5', namaRuangan: 'BAG PERAWATAN', kdRuangan: '005'}
			];

			$scope.listNamaProduk = [
				{id: '1',kdProduk: 'produk_001',namaProduk: "KOMPUTER"},
				{id: '2',kdProduk: 'produk_002',namaProduk: "PRINTER"},
				{id: '3',kdProduk: 'produk_003',namaProduk: "MOUSE"},
				{id: '4',kdProduk: 'produk_004',namaProduk: "KEYBOARD"},
				{id: '5',kdProduk: 'produk_005',namaProduk: "MONITOR"},
			]
		
			// duplikasi
			PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,kdRuangan,namaRuangan", true).then(function(dat){
				$scope.listTujuanPengiriman = dat;
				// debugger;
			});
			*/
			//debugger;

			// $scope.addKegiatan = false;

			$scope.tambahKegiatan = function(){
				$scope.dat = {};
				$scope.addKegiatan = true;
				$scope.showSpekAnggaranSet = false;
			}

			$scope.dataKegiatan = new kendo.data.DataSource({
				data: [],
				editable: "popup",
				toolbar: [ "create" ]
			});

			$scope.ArrKegiatan = [];

			$scope.tambahSpekAnggaran = function(){
				$scope.dats = {};
				$scope.addKegiatan = true;
				$scope.showSpekAnggaran = true;
				$scope.showSpekAnggaranSet = false;

				$scope.$watch( 'dats.hargaSatuan * dats.volume' , function (value) {
	        		$scope.dats.total = value;
	    		});

			}

			$scope.tambahSpekAnggaranSet = function (){
				$scope.datss = {};
				$scope.showSpekAnggaranSet = true;

				$scope.$watch( 'datss.hargaSatuanLengkap * datss.volumeLengkap' , function (value) {
	        		$scope.datss.totalLengkap = value;
	    		});
			}

			$scope.pushDataKegiatan = function(dataDetilKegiatan){
				var id = $scope.ArrKegiatan.length + 1;
				
				var newData = {
					"no": id,
					"kegiatan": dataDetilKegiatan.kegiatan,
					"kegiatanDetail": dataDetilKegiatan.kegiatanDetail,
					"output": dataDetilKegiatan.output /*,
					"detailAnggaran": $scope.ArrDetilKegiatan */
				};

				$scope.dataKegiatan.add(newData);
				$scope.ArrKegiatan.push(newData);
				$scope.addKegiatan = false;

				console.log(JSON.stringify($scope.ArrKegiatan));
				//debugger;
			}

			$scope.kolomDetilKegiatan = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				},
				{
					"field": "parentID",
					"title": "ParentID"
				},
            	{
					"field": "tanggalPengajuan",
					"title": "Tanggal Pengajuan"
				}, 
				{
					"field": "komponen.namaKomponen",
					"title": "Komponen"
				},
				{
					"field": "akun.namaAccount",
					"title": "Akun"
				},
				{
					"field": "asalProduk.asalProduk",
					"title": "Sumber Dana"
				}
		    ];
			
			$scope.dataDetilKegiatan = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.ArrDetilKegiatan = [];

			$scope.pushDetilKegiatan = function(dataBaruDetilKegiatan){
				var id = $scope.ArrDetilKegiatan.length + 1;
				
				var newData = {
					"no": id,
					"parentID": dataBaruDetilKegiatan.parentID.no,
					"tanggalPengajuan": DateHelper.getPeriodeFormatted(dataBaruDetilKegiatan.tanggalPengajuan),
					"komponen": dataBaruDetilKegiatan.komponen,
					"akun": dataBaruDetilKegiatan.akun,
					"asalProduk": dataBaruDetilKegiatan.asalProduk
				};

				$scope.dataDetilKegiatan.add(newData);
				$scope.ArrDetilKegiatan.push(newData);

				console.log(JSON.stringify($scope.ArrDetilKegiatan));
				//debugger;
			}

			$scope.kolomSpekAnggaran = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				}, 
				{
					"field": "parentID",
					"title": "ParentID"
				},
            	{
					"field": "statusCode",
					"title": "kode status"
				},
            	{
					"field": "spesifikasi",
					"title": "spesifikasi"
				}, 
            	{
					"field": "pengendali.namaPengendali",
					"title": "pengendali"
				},
				{
					"field": "hargaSatuanBarang",
					"title": "harga Satuan"
				},
				{
					"field": "produk.namaProduk",
					"title": "nama Produk"
				},
				{
					"field": "ruangan.namaRuangan",
					"title": "tujuan Pengiriman"
				},
				{
					"field": "volumeBarang",
					"title": "volume"
				},
				{
					"field": "totalHargaBarang",
					"title": "total"
				},
				{
					"field": "jenisBelanja.namaJenisBelanja",
					"title": "jenis Belanja"
				},
				{
					"field": "jenisPengadaan.namaJenisPengadaan",
					"title": "jenis Pengadaan"
				}
		    ];
			
			$scope.detailSpekAnggaran = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.ArrSpekAnggaran = [];

			$scope.pushSpekAnggaran = function(dataSpek){
				var id = $scope.ArrSpekAnggaran.length + 1;
				
				var newData = {
					"no": id,
					"parentID": dataSpek.parentID.no,
					"statusCode": 1,
					"spesifikasi": dataSpek.spesifikasi,
					"pengendali": dataSpek.pengendali,
					"hargaSatuanBarang": dataSpek.hargaSatuan,
					"produk": dataSpek.namaProduk,
					"ruangan": dataSpek.tujuanPengiriman,
					"volumeBarang": dataSpek.volume,
					"totalHargaBarang": dataSpek.total,
					"jenisBelanja": dataSpek.jenisBelanja,
					"jenisPengadaan": dataSpek.jenisPengadaan
				};

				$scope.detailSpekAnggaran.add(newData);
				$scope.ArrSpekAnggaran.push(newData);
				$scope.showDetailSpekAnggaran = false;

				console.log(JSON.stringify($scope.ArrSpekAnggaran));
				//debugger;
			}

			$scope.kolomSpekAnggaranSet = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				}, 
				{
					"field": "parentID",
					"title": "ParentID"
				},
            	{
					"field": "statusCode",
					"title": "kode status"
				},
            	{
					"field": "spesifikasi",
					"title": "spesifikasi"
				}, 
            	{
					"field": "pengendali.namaPengendali",
					"title": "pengendali"
				},
				{
					"field": "hargaSatuanBarang",
					"title": "harga Satuan"
				},
				{
					"field": "produk.namaProduk",
					"title": "nama Produk"
				},
				{
					"field": "ruangan.namaRuangan",
					"title": "tujuan Pengiriman"
				},
				{
					"field": "volumeBarang",
					"title": "volume"
				},
				{
					"field": "totalHargaBarang",
					"title": "total"
				},
				{
					"field": "jenisBelanja.namaJenisBelanja",
					"title": "jenis Belanja"
				},
				{
					"field": "jenisPengadaan.namaJenisPengadaan",
					"title": "jenis Pengadaan"
				}
		    ];
			
			$scope.SpekAnggaranSet = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.ArrSpekAnggaranSet = [];

			$scope.pushSpekAnggaranSet = function(dataSpekSet){
				var id = $scope.ArrSpekAnggaranSet.length + 1;
				
				var newData = {
					"no": id,
					"parentID": dataSpekSet.parentID.no,
					"statusCode": 1,
					"spesifikasi": dataSpekSet.spesifikasiLengkap,
					"pengendali": dataSpekSet.pengendaliLengkap,
					"hargaSatuanBarang": dataSpekSet.hargaSatuanLengkap,
					"produk": dataSpekSet.namaProdukLengkap,
					"ruangan": dataSpekSet.tujuanPengirimanLengkap,
					"volumeBarang": dataSpekSet.volumeLengkap,
					"totalHargaBarang": dataSpekSet.totalLengkap,
					"jenisBelanja": dataSpekSet.jenisBelanjaLengkap,
					"jenisPengadaan": dataSpekSet.jenisPengadaanLengkap
				};

				$scope.SpekAnggaranSet.add(newData);
				$scope.ArrSpekAnggaranSet.push(newData);

				console.log(JSON.stringify($scope.ArrSpekAnggaranSet));
				//debugger;
			}

			$scope.batal = function(){

				var grid = $('#GridDataDetilKegiatan').data("kendoGrid");
				var ds = new kendo.data.DataSource({
					data: []
				});

				grid.setDataSource(ds);
				ds.read();
				ds.sync();

				$scope.addKegiatan = false;
				$scope.showSpekAnggaran = false;
				$scope.showSpekAnggaranSet = false;
			}

			/*
			$scope.simpanUsang = function(){
				$scope.item.kegiatanAnggaran = $scope.ArrKegiatan;
				//PenerimaanBarangLogistik.savePenerimaanLogistik(ModelItem.beforePost($scope.item),"penerimaan-barang/save-penerimaan-barang/").then(function(e){

				//});
				console.log(JSON.stringify($scope.item));
				debugger;
			}
			*/

			$scope.kegiatanAnggaran = [];

			$scope.SimpanFinal = function (){
				
				var localKegiatanAnggaran = [];

				for (var a in $scope.ArrKegiatan) {

                        var elementKegiatanAnggaran = $scope.ArrKegiatan[a];
                        var obj = {
                            kegiatan: elementKegiatanAnggaran.kegiatan,
	                        kegiatanDetail: elementKegiatanAnggaran.kegiatanDetail,
	                        output: elementKegiatanAnggaran.output,
	                        detailAnggaran: []
	                    }

	                    localKegiatanAnggaran.push(obj);

	                    //localKegiatanAnggaran.detailAnggaran = [];
	                    for (var b in $scope.ArrDetilKegiatan) {

		                        var elemenDetilKegiatanAnggaran = $scope.ArrDetilKegiatan[b];
		                        if (elemenDetilKegiatanAnggaran.parentID == elementKegiatanAnggaran.no) {

		                        	var objDetilKegiatan = {
			                       		//tanggalPengajuan: DateHelper.getPeriodeFormatted(elemenDetilKegiatanAnggaran.tanggalPengajuan),
			                       		tanggalPengajuan: elemenDetilKegiatanAnggaran.tanggalPengajuan,
										komponen: elemenDetilKegiatanAnggaran.komponen,
										akun: elemenDetilKegiatanAnggaran.akun,
										asalProduk: elemenDetilKegiatanAnggaran.asalProduk,
										detailSpekAnggaran: []
			                       	}
			                       	localKegiatanAnggaran[a].detailAnggaran.push(objDetilKegiatan);
		                        }

		                        //localKegiatanAnggaran.detailAnggaran.detailSpekAnggaran = [];
	                        	for (var c in $scope.ArrSpekAnggaran) {

		                        		var elemenSpekAnggaran = $scope.ArrSpekAnggaran[c];
		                        		if (elemenSpekAnggaran.parentID == elemenDetilKegiatanAnggaran.no) {

		                        			var objSpekAnggaran = {

												spesifikasi: elemenSpekAnggaran.spesifikasi,
												pengendali: elemenSpekAnggaran.pengendali,
												statusCode: 1,
												hargaSatuanBarang: elemenSpekAnggaran.hargaSatuanBarang,
												produk: elemenSpekAnggaran.produk,
												ruangan: elemenSpekAnggaran.ruangan,
												volumeBarang: elemenSpekAnggaran.volumeBarang,
												totalHargaBarang: elemenSpekAnggaran.totalHargaBarang,
												jenisBelanja: elemenSpekAnggaran.jenisBelanja,
												jenisPengadaan: elemenSpekAnggaran.jenisPengadaan,
												detailSpekAnggaranSet:[]
		                        			}

		                        			localKegiatanAnggaran[a].detailAnggaran[b].detailSpekAnggaran.push(objSpekAnggaran);

		                        		}
		                        			//localKegiatanAnggaran.detailAnggaran.detailSpekAnggaran.detailSpekAnggaranSet = [];
	                        				for (var d in $scope.ArrSpekAnggaranSet) {

	                        						var elemenSpekAnggaranSet = $scope.ArrSpekAnggaranSet[d];
	                        						if (elemenSpekAnggaranSet.parentID == elemenSpekAnggaran.no) {

	                        							var objSpekSet = {

	                        								spesifikasi: elemenSpekAnggaranSet.spesifikasi,
															pengendali: elemenSpekAnggaranSet.pengendali,
															statusCode: 1,
															hargaSatuanBarang: elemenSpekAnggaranSet.hargaSatuanBarang,
															produk: elemenSpekAnggaranSet.produk,
															ruangan: elemenSpekAnggaranSet.ruangan,
															volumeBarang: elemenSpekAnggaranSet.volumeBarang,
															totalHargaBarang: elemenSpekAnggaranSet.totalHargaBarang,
															jenisBelanja: elemenSpekAnggaranSet.jenisBelanja,
															jenisPengadaan: elemenSpekAnggaranSet.jenisPengadaan

	                        							}

	                        							localKegiatanAnggaran[a].detailAnggaran[b].detailSpekAnggaran[c].detailSpekAnggaranSet.push(objSpekSet);

	                        						}
	                        				}
	                        		}
	                        }
					}
					//$scope.kegiatanAnggaran.push(localKegiatanAnggaran);
					$scope.kegiatanAnggaran = localKegiatanAnggaran;
					$scope.item.kegiatanAnggaran = $scope.kegiatanAnggaran;

					PengajuanUsulanAnggaranService.savePengajuan(ModelItem.beforePost($scope.item),"anggaran/save-pengajuan-usulan-anggaran-baru").then(function(e){

					});
					//console.log(JSON.stringify($scope.item));
					//debugger;

			}
		}
	]);
});