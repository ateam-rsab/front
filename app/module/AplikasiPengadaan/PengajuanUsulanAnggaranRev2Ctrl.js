define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengajuanUsulanAnggaranRev2Ctrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','PengajuanUsulanAnggaranService',
		function($rootScope, $scope, $state, ModelItem, DateHelper, PengajuanUsulanAnggaranService) {

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dat = {};

			$scope.now = new Date();
			$scope.showDataHistory = false;
			
			//default value Form Kegiatan
			$scope.item.kegiatan = {id: 0};
			$scope.item.kemenLemb = { id: 1 };
			$scope.item.unitOrganisasi = {id: 1};
			$scope.item.unitKerja = {id: 2};
			$scope.item.program = {id: 1952};
			$scope.item.tahun = "2017";
			$scope.item.kegiatanDetail = {id: 0};
			$scope.item.output = {id: 0};
			$scope.item.komponen = {id: 0};
			$scope.item.akun = {id: 0};
			$scope.item.asalProduk = {id: 0};

			$scope.isKelompok = true;
			$scope.isJenis = true;
			$scope.isProduk = false;
			$scope.enablePpn = false;

			$scope.datss = {
				// pengendali: {id: 6},
				jenisBelanjaLengkap: {id: 0},
				jenisPengadaanLengkap: {id: 0}
			}
			var init = function(){
				$scope.datss.spesifikasi = "";
				$scope.datss.volumeLengkap = "";
				$scope.datss.hargaSatuanLengkap = "";
				$scope.datss.unitLengkap = "";
				$scope.datss.totalLengkap = "";
				$scope.datss.namaProdukLengkap = "";
				$scope.datss.volumeAwal = "";
				$scope.datss.volumePeriode = "";
				$scope.datss.volumeAkhir = "";
				$scope.datss.hargaSatuanLama = "";
				$scope.datss.usedPerMonth = "";
				$scope.datss.totalLama = "";
				$scope.datss.totalLama = "";
				$scope.dat.enablePpn = false;
			}

			init();
			$scope.$watch('dat.enablePpn', function(e){
				// console.log(JSON.stringify($scope.enablePpn))
				if ($scope.dat.enablePpn === false)
					$scope.datss.ppn = 0;
			})
			$scope.$watch('datss.ppn', function(e){
				if ($scope.datss.ppn === undefined) return;
				var tempPpn = ($scope.datss.ppn/100);
				$scope.datss.totalLama = $scope.datss.totalLama + ($scope.datss.totalLama * tempPpn);
			})
		 	$scope.$watch('dat.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
                $scope.isKelompok = false;
            })
            $scope.$watch('dat.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
                $scope.isJenis = false;
            })
			$scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
			
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

			PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
				$scope.item.ruangan = dat.data.data;
				// debugger;
			});

			// PengajuanUsulanAnggaranService.getGetData("Produk&select=id,kdProduk,namaProduk&take=10", true).then(function(dat){
			// 	$scope.listNamaProduk = dat;
			// 	// debugger;
			// });
			
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

			PengajuanUsulanAnggaranService.getGetData("MataAnggaran&select=id,namaMataAnggaran,kodeMataAnggaran", true).then(function(dat){
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


			PengajuanUsulanAnggaranService.getKomponen("product/detail-jenis-produk", true).then(function(dat){
				$scope.listJenisProduk = dat.data.data.detailJenisProduk;
				// debugger;
			});

			// $scope.handleChange = function(data, dataItem, columns) {
		 //      	$scope.data = data;
		 //      	$scope.columns = columns;
		 //      	$scope.dataItem = dataItem;

		 //      	PengajuanUsulanAnggaranService.getKomponen("product/find-produk-by-detail-jenis-produk-and-nama-produk?namaProduk="+$scope.data+"&idDetailJenisProduk="+$scope.datss.jenisProduk.id, true).then(function(dat){
			// 		$scope.listNamaProduk = dat;
			//       	console.log(listNamaProduk);
			// 		debugger;
			// 	});
		 //    };
		 	$scope.$watch('datss.jenisProduk', function(e) {
                // debugger;
                if (e === undefined) return;
                // if ($scope.item.RuanganTujuan === undefined) return;
                PengajuanUsulanAnggaranService.getKomponen("product/find-produk-by-detail-jenis-produk-and-nama-produk?idDetailJenisProduk="+e.id).then(function(e) {
                    $scope.item.listNamaProduk = e.data.data.produk;
                    // debugger;
                });
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

			// $scope.$watch('tempItem.Generik', function(e) {
   //              // debugger;
   //              /*alert(e.id)*/
   //              findPasien.getAmbilObat(e.id).then(function(e) {
   //                  // debugger;
   //                  $scope.listAmbilObat = e.data.data.stokProdukGlobal
   //              });
   //          })
				
			// $scope.showDataBaru = function(){
			// 	$scope.datss = {};
			// 	var jmlBulan = 12;

			// 	$scope.$watch( 'datss.volumeAwal * jmlBulan' , function (value) {
		 //        	$scope.datss.volumeAkhir = value;
		 //    	});

			// 	console.log($scope.dataBaru + "-" + $scope.dataLama);
			// 	// $scope.showSpekAnggaranSet = false;
			// }

			// $scope.showDataLama = function(){
			// 	$scope.datss = {};

			// 	$scope.$watch( 'datss.hargaSatuanLengkap * datss.volumeLengkap' , function (value) {
		 //       		$scope.datss.totalLengkap = value;
		 //    	});

			// 	console.log($scope.dataBaru + "-" + $scope.dataLama);
			// 	// $scope.showSpekAnggaranSet = false;
			// }

			// $scope.dataKegiatan = new kendo.data.DataSource({
			// 	data: [],
			// 	editable: "popup",
			// 	toolbar: [ "create" ]
			// });

			// $scope.ArrKegiatan = [];

			// $scope.tambahSpekAnggaran = function(){
			// 	$scope.dats = {};
			// 	$scope.addKegiatan = true;
			// 	$scope.showSpekAnggaran = true;
			// 	$scope.showSpekAnggaranSet = false;

			// 	$scope.$watch( 'dats.hargaSatuan * dats.volume' , function (value) {
	  //       		$scope.dats.total = value;
	  //   		});

			// }

			// $scope.tambahSpekAnggaranSet = function (){
			// 	$scope.datss = {};
			// 	$scope.showSpekAnggaranSet = true;

			// 	$scope.$watch( 'datss.hargaSatuanLengkap * datss.volumeLengkap' , function (value) {
	  //       		$scope.datss.totalLengkap = value;
	  //   		});
			// }

			// $scope.pushDataKegiatan = function(dataDetilKegiatan){
			// 	var id = $scope.ArrKegiatan.length + 1;
				
			// 	var newData = {
			// 		"no": id,
			// 		"kegiatan": dataDetilKegiatan.kegiatan,
			// 		"kegiatanDetail": dataDetilKegiatan.kegiatanDetail,
			// 		"output": dataDetilKegiatan.output /*,
			// 		"detailAnggaran": $scope.ArrDetilKegiatan */
			// 	};

			// 	$scope.dataKegiatan.add(newData);
			// 	$scope.ArrKegiatan.push(newData);
			// 	$scope.addKegiatan = false;

			// 	console.log(JSON.stringify($scope.ArrKegiatan));
			// 	//debugger;
			// }

			// $scope.kolomDetilKegiatan = [
			//  	{
			// 		"field": "no",
			// 		"title": "No",
			// 		width: "50px"
			// 	},
			// 	{
			// 		"field": "parentID",
			// 		"title": "ParentID"
			// 	},
   //          	{
			// 		"field": "tanggalPengajuan",
			// 		"title": "Tanggal Pengajuan"
			// 	}, 
			// 	{
			// 		"field": "komponen.namaKomponen",
			// 		"title": "Komponen"
			// 	},
			// 	{
			// 		"field": "akun.namaAccount",
			// 		"title": "Akun"
			// 	},
			// 	{
			// 		"field": "asalProduk.asalProduk",
			// 		"title": "Sumber Dana"
			// 	}
		 //    ];
			
			// $scope.dataDetilKegiatan = new kendo.data.DataSource({
			// 	data: [],
			// 	editable: true
			// });

			// $scope.ArrDetilKegiatan = [];

			// $scope.pushDetilKegiatan = function(dataBaruDetilKegiatan){
			// 	var id = $scope.ArrDetilKegiatan.length + 1;
				
			// 	var newData = {
			// 		"no": id,
			// 		"parentID": dataBaruDetilKegiatan.parentID.no,
			// 		"tanggalPengajuan": DateHelper.getPeriodeFormatted(dataBaruDetilKegiatan.tanggalPengajuan),
			// 		"komponen": dataBaruDetilKegiatan.komponen,
			// 		"akun": dataBaruDetilKegiatan.akun,
			// 		"asalProduk": dataBaruDetilKegiatan.asalProduk
			// 	};

			// 	$scope.dataDetilKegiatan.add(newData);
			// 	$scope.ArrDetilKegiatan.push(newData);

			// 	console.log(JSON.stringify($scope.ArrDetilKegiatan));
			// 	//debugger;
			// }

			// $scope.kolomSpekAnggaran = [
			//  	{
			// 		"field": "no",
			// 		"title": "No",
			// 		width: "50px"
			// 	}, 
			// 	{
			// 		"field": "parentID",
			// 		"title": "ParentID"
			// 	},
   //          	{
			// 		"field": "statusCode",
			// 		"title": "kode status"
			// 	},
   //          	{
			// 		"field": "spesifikasi",
			// 		"title": "spesifikasi"
			// 	}, 
   //          	{
			// 		"field": "pengendali.namaPengendali",
			// 		"title": "pengendali"
			// 	},
			// 	{
			// 		"field": "hargaSatuanBarang",
			// 		"title": "harga Satuan"
			// 	},
			// 	{
			// 		"field": "produk.namaProduk",
			// 		"title": "nama Produk"
			// 	},
			// 	{
			// 		"field": "ruangan.namaRuangan",
			// 		"title": "tujuan Pengiriman"
			// 	},
			// 	{
			// 		"field": "volumeBarang",
			// 		"title": "volume"
			// 	},
			// 	{
			// 		"field": "totalHargaBarang",
			// 		"title": "total"
			// 	},
			// 	{
			// 		"field": "jenisBelanja.namaJenisBelanja",
			// 		"title": "jenis Belanja"
			// 	},
			// 	{
			// 		"field": "jenisPengadaan.namaJenisPengadaan",
			// 		"title": "jenis Pengadaan"
			// 	}
		 //    ];
			
			// $scope.detailSpekAnggaran = new kendo.data.DataSource({
			// 	data: [],
			// 	editable: true
			// });

			// $scope.ArrSpekAnggaran = [];

			// $scope.pushSpekAnggaran = function(dataSpek){
			// 	var id = $scope.ArrSpekAnggaran.length + 1;
				
			// 	var newData = {
			// 		"no": id,
			// 		"parentID": dataSpek.parentID.no,
			// 		"statusCode": 1,
			// 		"spesifikasi": dataSpek.spesifikasi,
			// 		"pengendali": dataSpek.pengendali,
			// 		"hargaSatuanBarang": dataSpek.hargaSatuan,
			// 		"produk": dataSpek.namaProduk,
			// 		"ruangan": dataSpek.tujuanPengiriman,
			// 		"volumeBarang": dataSpek.volume,
			// 		"totalHargaBarang": dataSpek.total,
			// 		"jenisBelanja": dataSpek.jenisBelanja,
			// 		"jenisPengadaan": dataSpek.jenisPengadaan
			// 	};

			// 	$scope.detailSpekAnggaran.add(newData);
			// 	$scope.ArrSpekAnggaran.push(newData);
			// 	$scope.showDetailSpekAnggaran = false;

			// 	console.log(JSON.stringify($scope.ArrSpekAnggaran));
			// 	//debugger;
			// }

			$scope.$watch( 'datss.hargaSatuanLengkap * datss.volumeLengkap' , function (value) {
	        	$scope.datss.totalLengkap = value;
	    	});

			var jmlBulan = 12;
		    $scope.$watch( 'datss.volumeAwal' , function (value) {
			    $scope.datss.volumeAkhir = value * jmlBulan;
			});

			$scope.$watch( 'datss.hargaSatuanLama * datss.volumeAkhir' , function (value) {
	        	$scope.datss.totalLama = value;
	    	});

		    // hide/show data histori produk
			$scope.cariDataHistory = function(){

				if ($scope.item.periodeAwal !== undefined && $scope.item.periodeAhir !== undefined) {
					// $scope.showDataHistory = true;
					$scope.datss.volumePeriode = 1000;

					var diff = Math.floor($scope.item.periodeAhir.getTime() - $scope.item.periodeAwal.getTime());
					var day = 1000 * 60 * 60 * 24;

				    var days = Math.floor(diff/day);
				    var months = Math.floor(days/31);
				    var years = Math.floor(months/12);
				    console.log("days = " + days + "; months = " + months + "; years = " + years);

					var penggunaanPerBulan = 1000/months;
					$scope.datss.usedPerMonth = Math.ceil(penggunaanPerBulan);

					// $scope.datss.volumePeriode = jumlah pemakaian produk dalam kurun tertentu
					// $scope.datss.usedPerMonth = jumlah pemakaian produk / kurun waktu
					// $scope.datss.totalLengkap = jumlah diajukan(\tahun) * harga terakhir

					var jmlBulan = 12;
			    	$scope.$watch( 'datss.volumeAwal' , function (value) {
				        var tots = value * jmlBulan;
				        $scope.datss.volumeAkhir = Math.round(tots);
				    });
				} else {

				}
			}

			$scope.formatNum = {
				format: "#.#",
		        decimals: 0
		    }
		    $scope.formatPpn = {
		    	format: "{0:# \\%}"
		    }
			$scope.formatHarga = {
                culture: "de-DE",
				format: "{0:n0}"
		    }

		    $scope.monthSelectorOptions = {
	            start: "year",
	            depth: "year"
	        };
			$scope.kolomSpekAnggaranSet = [
			 	{
					"field": "no",
					"title": "No",
					width: "50px"
				}, 
				// {
				// 	"field": "parentID",
				// 	"title": "ParentID"
				// },
    //         	{
				// 	"field": "statusCode",
				// 	"title": "kode status"
				// },
				{
					"field": "produk",
					"title": "Nama Produk",
					"template": "#=produk.namaProduk#",
					editable: false
				}, 
            	{
					"field": "spesifikasi",
					"title": "Spesifikasi"
				},
				{
					"title": "Perhitungan /Tahun",
					"columns": [{
						"field": "hargaSatuanBarang",
						"title": "Harga",
						width: "100px",
						template: "<div class=\"pull-right\">#=kendo.toString(hargaSatuanBarang, \"n0\")#</div>"
					},
					{
						"field": "volumeBarang",
						"title": "Volume",
						width: "80px",
						template: "<div class=\"pull-right\">#=kendo.toString(volumeBarang, \"n0\")#</div>"
					},{
						"field": "totalHargaBarang",
						"title": "Total",
						width: "150px",
						template: "<div class=\"pull-right\">#=kendo.toString(totalHargaBarang, \"n0\")#</div>"
					}]
				},
            	{
					"field": "unit",
					"title": "Unit",
					// "template": "#=unit.satuanStandar#"
					"hidden": true
				},
            	{
					"field": "tipe",
					"hidden": true
				},
				{
					"field": "jenisBelanja.namaJenisBelanja",
					"title": "jenis Belanja",
					"hidden": true
				},
				{
					"field": "pengendali.namaPengendali",
					"title": "Pengendali",
					"hidden": true
				},
				{
					command: [{
						name: "destroy",
						text: "Hapus"
					}],
					title: "&nbsp;",
					width: "90px"
				}
				// {
				// 	"field": "ruangan.namaRuangan",
				// 	"title": "tujuan Pengiriman"
				// },
				// {
				// 	"field": "jenisPengadaan.namaJenisPengadaan",
				// 	"title": "jenis Pengadaan",
				// 	"hidden": true
				// }
		    ];
			
			$scope.SpekAnggaranSet = new kendo.data.DataSource({
				data: [],
				editable: true,
				schema: {
					model: {
						fields: {
							produk: { editable: false},
							spesifikasi: { type: "string"},
							keterangan: { type: "string"},
		            		hargaSatuanBarang: { type: "number"},
		            		volumeBarang: { type: "number"},
		            		totalHargaBarang: { type: "number"}
		            	}
		            }
		        }
			});

			$scope.ArrSpekAnggaranSet = [];

			$scope.pushSpekAnggaranBaru = function(dataSpekSet){
				var listRawRequired = [
                    "datss.namaProdukLengkap|ng-model|Nama Produk",
                    "datss.spesifikasi|ng-model|Spesifikasi Produk",
                    "datss.volumeLengkap|k-ng-model|Qty Produk",
                    "datss.hargaSatuanLengkap|ng-model|Harga Produk",
                    "datss.unitLengkap|k-ng-model|Satuan Produk",
                    "datss.pengendali|ng-model|Pengendali"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
					var id = $scope.ArrSpekAnggaranSet.length + 1;
					var modifProduk = {
						"id": "",
						"namaProduk" : dataSpekSet.namaProdukLengkap
					}
					var newData = {
						"no": id,
						// "parentID": dataSpekSet.parentID.no,
						// "statusCode": 1,
						"tipe": "BARU",
						"spesifikasi": dataSpekSet.spesifikasi,
						"unit": dataSpekSet.unitLengkap,
						"hargaSatuanBarang": dataSpekSet.hargaSatuanLengkap,
						"produk": modifProduk,
						// "ruangan": dataSpekSet.tujuanPengirimanLengkap,
						"volumeBarang": dataSpekSet.volumeLengkap,
						"totalHargaBarang": dataSpekSet.totalLengkap,
						"jenisBelanja": dataSpekSet.jenisBelanjaLengkap,
						"pengendali": dataSpekSet.pengendali,
						"jenisPengadaan": dataSpekSet.jenisPengadaanLengkap
					};

					$scope.SpekAnggaranSet.add(newData);
					$scope.ArrSpekAnggaranSet.push(newData);

               		init();
				} else {
                    ModelItem.showMessages(isValid.messages);
                }
				// console.log(JSON.stringify($scope.ArrSpekAnggaranSet));
				// debugger;
			}

			$scope.pushSpekAnggaranLama = function(dataSpekSet){
				var listRawRequired = [
                    "datss.namaProdukLengkap|k-ng-model|Nama Produk",
                    "datss.volumeAwal|ng-model|Qty Produk",
                    "datss.hargaSatuanLama|ng-model|Harga Produk",
                    "datss.pengendali|ng-model|Pengendali"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
					var id = $scope.ArrSpekAnggaranSet.length + 1;
					
					var newData = {
						"no": id,
						// "parentID": dataSpekSet.parentID.no,
						// "statusCode": 1,
						"tipe": "LAMA",
						// "spesifikasi": "-",
						"spesifikasi": dataSpekSet.spesifikasi,
						"hargaSatuanBarang": dataSpekSet.hargaSatuanLama,
						"produk": dataSpekSet.namaProdukLengkap,
						// "ruangan": dataSpekSet.tujuanPengirimanLengkap,
						"volumeBarang": dataSpekSet.volumeAkhir,
						"totalHargaBarang": dataSpekSet.totalLama,
						"jenisBelanja": dataSpekSet.jenisBelanjaLengkap,
						"pengendali": dataSpekSet.pengendali,
						"jenisPengadaan": dataSpekSet.jenisPengadaanLengkap
					};

					$scope.SpekAnggaranSet.add(newData);
					$scope.ArrSpekAnggaranSet.push(newData);

	                init();
	                $scope.isProduk = true;
	                $scope.isKelompok = true;
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
					console.log(JSON.stringify($scope.SpekAnggaranSet));
					debugger;
			}

			$scope.batal = function(){

				$scope.SpekAnggaranSet = new kendo.data.DataSource({
					data: []
				});

				init();
				$scope.dat = {};
                $scope.isProduk = false;
                $scope.isKelompok = true;
                $scope.isJenis = true;
				// debugger;

				// $scope.addKegiatan = false;
				// $scope.showSpekAnggaran = false;
				// $scope.showSpekAnggaranSet = false;
			}

			$scope.batals = function() {
				init();
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

			$scope.Save = function (){
				if ($scope.SpekAnggaranSet._total !== 0) {
					$scope.ArrDataDetil = [];
					$scope.SpekAnggaranSet._data.forEach(function(items){
						if(items.tipe === "BARU") {
							items.spesifikasi = items.produk.namaProduk;
						}
						var spekSet = {
							"no": items.id,
							// "parentID": dataSpekSet.parentID.no,
							// "statusCode": 1,
							"tipe": items.tipe,
							// "spesifikasi": "-",
							"spesifikasi": items.spesifikasi,
							"satuanStandar": items.unit,
							"hargaSatuanBarang": items.hargaSatuanBarang,
							"produk": items.produk,
							// "ruangan": dataSpekSet.tujuanPengirimanLengkap,
							"volumeBarang": items.volumeBarang,
							"totalHargaBarang": items.totalHargaBarang,
							"jenisBelanja": items.jenisBelanja,
							"pengendali": items.pengendali,
							"jenisPengadaan": items.jenisPengadaan
						};
						$scope.ArrDataDetil.push(spekSet);
					})

					var listRawRequired = [
	                    "datss.pengendali|k-ng-model|Pengendali",
	                    "item.kegiatanDetail|k-ng-model|Detil Kegiatan",
	                    "item.kegiatan|k-ng-model|Kegiatan",
	                    "item.output|k-ng-model|Output",
	                    "item.komponen|k-ng-model|Komponen",
	                    "item.akun|k-ng-model|Akun",
	                    "item.asalProduk|k-ng-model|Asal produk",
	                    "item.deskripsi|ng-model|Nama paket pengadaan"
	                ];

	                var isValid = ModelItem.setValidation($scope, listRawRequired);
	                    
	                if(isValid.status){
					
						var localKegiatanAnggaran = [{
							"kegiatan": $scope.item.kegiatan,
							"kegiatanDetail": $scope.item.kegiatanDetail,
							"output": $scope.item.output,
							"detailAnggaran": [{
								"tanggalPengajuan": $scope.now,
								"komponen": $scope.item.komponen,
								"akun": $scope.item.akun,
								"asalProduk": $scope.item.asalProduk,
								"detailSpekAnggaran": [{
									"spesifikasi": $scope.item.deskripsi,
									"detailSpekAnggaranSet": $scope.ArrDataDetil
								}]
							}]
						}];
							//$scope.kegiatanAnggaran.push(localKegiatanAnggaran);
						$scope.item.kegiatanAnggaran = localKegiatanAnggaran;

						PengajuanUsulanAnggaranService.savePengajuan(ModelItem.beforePost($scope.item),"anggaran/save-pengajuan-usulan-anggaran-baru").then(function(e){
							console.log(JSON.stringify(e.data));
							$scope.isNext = true;
						});
						
					} else {
	                    ModelItem.showMessages(isValid.messages);
	                }

				} else {
					window.alert('Peringatan, data tidak lengkap')
				}
				

			}
		}
	]);
});