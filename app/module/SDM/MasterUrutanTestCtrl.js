define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterUrutanTestCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm', 'DateHelper',
		function($rootScope, $scope, ModelItem,$state,ManageSdm,DateHelper) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
				$scope.listPenandatangan = data;
			})
			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});

			//adi tgl 14-jun-17 ambil data / list jenis test untuk combo yang ada
			ManageSdm.getOrderList("rekrutmen/get-jenis-test", true).then(function(dat) {
				$scope.listJenisTest=dat.data.data;
            });

            $scope.optDataMasterUrutan = {
            	pageable:true,
            	selectable:'row',
            	scrollable:true,
            	columns: [
            	{
            		"field": "id",
            		"title": "Id",
            		"width": "15%",
            		"hidden": true
            	},
            	{
            		"field": "namaProduk",
            		"title": "Jenis Test",
            		"width": "15%"
            	},
            	{
            		"field": "noUrut",
            		"title": "Nomor Urut",
            		"width": "15%"
            	},
            	{
            		"field": "produkRsId",
            		"title": "Produk Id",
            		"width": "15%",
            		"hidden": true
            	}
            	
            	]
            }



            var init = function(){
             //adi tgl-15-jun-17 untuk get data dari server ke grid nya
            
            ManageSdm.getOrderList("tahapan-rekrutmen/get-all", true).then(function (dat) {
                 $scope.dataTahapanRek = dat.data.data.data;
                 $scope.item.noUrut = dat.data.data.maxUrut;

                 if ($scope.item.noUrut == 0 || null || "" ){
                 	$scope.item.noUrut = 1;
                 }
                 // debugger;

                   //ini mah buat yang data field yang ada digrid
            $scope.dataSource = new kendo.data.DataSource({
                	pageSize:8,
                	data: $scope.dataTahapanRek,
                	batch:true,
                	schema:{
                		model: {
                			fields:{
                				id:{ },
                				namaProduk:{ },
                				noUrut:{ },
                				produkRsId:{ }
                			}
                		}
                	},

                });

   //          	 $scope.addMasterUrutan = function() {
   //          	if ( isNaN($scope.item.noUrut) && isNaN($scope.item.idInp) ) {
   //          		$scope.item.idInp = null;
   //          		$scope.item.noUrut = 1;
   //          	}
   //          	// if (isNaN($scope.item.idInp)){
   //          	// 	return $scope.item.idInp = 1;
   //          	// }

   //          	// $scope.item.noUrut += $scope.item.noUrut + 1;
   //          	// $scope.item.idInp += $scope.item.idInp + 1;
			// 	var tempData = {
			// 		"namaProduk" : $scope.item.jenisTest.namaProduk,
			// 		"produkRsId": $scope.item.jenisTest.id,
			// 		"id": $scope.item.idInp,
			// 		"noUrut": $scope.item.noUrut
			// 	}
			// 		$scope.dataSource.add(tempData);
			// 		$scope.item.jenisTest.namaProduk="";

			// 		debugger;
			// }
            
               // debugger;
            });

        	}

        	init();

        	//ketika ada perubahan digrid data di grid berubah
        	//bisa buat dapetini count grid
        	 // var onChange = function(e) {
          //       var grid = $(this).data("optDataMasterUrutan");
          //   }


            //adi tgl 15-jun-17
            //fungsi ini dipake nanti untuk simpan master urutan test
            $scope.Save = function(){

             	
           
            	// if ( isNaN($scope.item.noUrut) && isNaN($scope.item.idInp) ) {
            	// 	// $scope.item.idInp;
            	// 	$scope.item.noUrut = 0;
            	// 	if ($scope.item.noUrut !== 1 || 0){
            	// 			$scope.item.noUrut = $scope.item.noUrut + 1;
            	// 	}
            	// } 
            	// if (isNaN($scope.item.idInp) || $scope.item.idInp == undefined){
            	// 	return $scope.item.idInp = null;
            	// }

            	// $scope.item.noUrut += $scope.item.noUrut + 1;
            	// $scope.item.idInp += $scope.item.idInp + 1;

            	//adi tgl 19-jun-17 penambahan validasinya saat mau simpan
            	 //untuk pengecekan kalo data kosong
                if ($scope.item.jenisTest === undefined ){
                    toastr.warning("Jenis test belum di pilih!, silahkan pilih terlebih dahulu sebelum disimpan");
                }

				var tempData = {
					"namaProduk" : $scope.item.jenisTest.namaProduk,
					"produkRsId": $scope.item.jenisTest.id,
					"id": $scope.item.idInp,
					"noUrut": $scope.item.noUrut
				}

				//pake save milik pelaksanaan seleksi aja biar ga update di sdmService.js
            	ManageSdm.savePelaksanaanSeleksi(tempData,"tahapan-rekrutmen/save").then(function(e) {
            		// $scope.item = {};

            		init();
            	});


				//setelah simpan lalu tampil di grid
				// $scope.dataSource.add(tempData);
				
					
					// $scope.item.jenisTest.namaProduk="";

					// debugger;
			

             	//dapet dari kendo data source yang dibuat tadi
				// var dat = $scope.dataSource._data;
				// //console.log(JSON.stringify(dat));
				// var i=0;
				// var mapData = [];
				// dat.forEach(function(data){
				// 	var data ={
				// 		//ini untuk yang di gridnya
				// 		"id":data.id,
				// 		"noUrut":data.noUrut,
				// 		"produkRsId":data.produkRsId,
				// 		"namaProdukRs":data.namaProduk
				// 	}
				// 	mapData[i] = data;
				// 	i++;
				// })
				//console.log(JSON.stringify(mapCycle));


				//ini untuk yang di inputan dan combo field
				// var data1 = {
				// 	"id":$scope.item.idInp,
    //                 "noUrut":parseInt($scope.item.noUrut),
    //                 "produkRsId":$scope.item.jenisTest.id,
				// 	"namaProdukRs":$scope.item.jenisTest.namaProduk		                    
				// }

				// debugger;
				//kayanya nanti disini pas save refresh / reload grid yang ada, ya udah panggil aja atau get pas disini
			

				//debugger;
            };

            //cek dulu id master urutan test ada ga
				// var idM = $scope.item.idInp;
				// if ( idM == undefined || null ){
				// 	$scope.item.idInp = "";
				// }

				//disini ambil berdasarkan idnya sebelum simpan
				// ManageSdm.getOrderList("jasamedika-web/tahapan-rekrutmen/get-by-id",true).then(function (dat) {
				// 	var idGet = dat.data.data.id;
				// 	$scope.item.idInp = idGet;
				// 	debugger;

				// });





          



             //adi tgl 15-jun-17
			//untuk klik grid buat dapetin nilai ke field lagi waktu select data digridnya
			$scope.klik = function(current){

				$scope.current = current;

				$scope.item.idInp = current.id;
				$scope.item.noUrut = current.noUrut;
				// $scope.item.jenisTest.namaProduk = current.namaProduk;
				// $scope.item.jenisTest.id = currnet.id;

				//adi tgl 16-jun-17

				$scope.i = current.id;
				$scope.n = current.namaProduk;

				//dapetin nilai untuk combo pas grid row dipilih
				for (var x=0;x<  $scope.listJenisTest.length ;x++){
					if ($scope.listJenisTest[x].namaProduk === current.namaProduk){
						$scope.item.jenisTest = $scope.listJenisTest[x];
					}
				}

				//debugger;
			
			}

			$scope.cbRubah = function(e){
				// if( $scope.item.jenisTest == $scope.item.jenisTest){
				// 	// $scope.i = $scope.item.jenisTest.id
				// 	// $scope.n = $scope.item.jenisTest.namaProduk
				// 	$scope.item.noUrut += 1;

				// }
				// $scope.item.jenisTest = this.text();

				console.log("hello");
			}

			//coba







            //buat objek datasource baru buat nanti nampung pas tombol tambah di klik nyimpan di data object ini
	   //          $scope.dataMurutanTest = new kendo.data.DataSource({
				// 	data: []
				// });





			
			
			
			
			

			
			
			
			
	//		$scope.daftarBahanLinen = new kendo.data.DataSource({
	//			data:[
	//				{ 
	//					"kodeJenis":"BHN001",
	//					"JenisBahan":"Aldet"
	//				},
	//				{ 
	//					"kodeJenis":"BHN002",
	//					"JenisBahan":"Laudet"
	//				},
	//				{ 
	//					"kodeJenis":"BHN003",
	//					"JenisBahan":"MC. Bleach"
	//				},
	//				{ 
	//					"kodeJenis":"BHN004",
	//					"JenisBahan":"OXO. Bleach"
	//				},
	//				{ 
	//					"kodeJenis":"BHN005",
	//					"JenisBahan":"E. 951"
	//				},
	//				{ 
	//					"kodeJenis":"BHN006",
	//					"JenisBahan":"M. Saur"
	//				},
	//				{ 
	//					"kodeJenis":"BHN007",
	//					"JenisBahan":"M. Soft"
	//				}

	//			]
	//		});
	
		 // var onChange = function(e) {
   //              //var inputId = this.element.attr("id");
   //            //  console.log(inputId);
   //              var grid = $(this).data("mainGridOptions");

   //          }
			
			//  $scope.mainGridOptions = {
			// 	 pageable:true,
				
			// 	pageSize:10,
			// 	selectable:'row',
			// 	scrollable:true,
			// 	 filterable: {
   //                          extra: false,
   //                          operators: {
   //                             string: {
   //                                 startswith: "Dimulai dengan",
   //                                  contains: "mengandung kata",
   //                                 neq: "Tidak mengandung kata"
   //                              }
   //                          }
   //                      },
			// columns:[{
			// 	"field": "pelamarId",
			// 	"title": "No. Peserta",
			// 	"width": "15%",
			// 	filterable:true
			// },
			// {
			// 	"field": "namaPelamar",
			// 	"title": "Nama Lengkap",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "jenisKelamin",
			// 	"title": "Jenis Kelamin",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "degree",
			// 	"title": "Degree",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "jurusan",
			// 	"title": "Jurusan",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "nilai",
			// 	"title": "Nilai",
			// 	"width": "20%"
	
			// },
			// {
			// 	"field": "posisiLamar",
			// 	"title": "Posisi Dilamar",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "email",
			// 	"title": "Email",
			// 	"width": "20%"
	
			// },
			// {
			// 	"field": "kategoriLamar",
			// 	"title": "Kategori Lamar ",
			// 	"width": "20%",
			// 	hidden : true
	
			// },
			// {
			// 	"field": "kategoriLamarId",
			// 	"title": "Kategori Lamar Id",
			// 	"width": "20%",
			// 	hidden : true
	
			// },
			// {
			// 	"field": "posisiLamarId",
			// 	"title": "Posisi Lamar Id",
			// 	"width": "20%",
			// 	hidden : true
	
			// },
			// {
			// 	"field": "isLulus",
			// 	"title": "isLulus",
			// 	"width": "20%",
	  //           hidden : true
			// },
			// {
			// 	"field": "degree",
			// 	"title": "degree",
			// 	"width": "20%",
			// 	hidden : true
	
			// },
			// {
			// 	"field": "universitas",
			// 	"title": "universitas",
			// 	"width": "20%",
   //              hidden : true	
			// }
			// ]
			
		
			//  };	

			
			
			// $scope.Save = function(){
			// 	var dat = $scope.ListTampilGrid._data;
			// 	//console.log(JSON.stringify(dat));
			// 	var i=0;
			// 	var mapLinen = [];
			// 	dat.forEach(function(data){
			// 		var data ={
						
			// 			"pelamarId":data.pelamarId,
			// 			"namaPelamar":data.namaPelamar,
			// 			"universitas":data.universitas,
			// 			"degree":data.degree,
			// 			"jurusan":data.jurusan,
			// 			"nilai":data.nilai,
			// 			"posisiLamarId":data.posisiLamarId,
			// 			"posisiLamar":data.posisiLamar,
			// 			"kategoriLamarId":data.kategoriLamarId,
			// 			"kategoriLamar":data.kategoriLamar,
			// 			"nilaiScore":"",
			// 			"periode":"",
			// 			"isLulus":data.isLulus
			// 		}
			// 		mapLinen[i] =data;
			// 		i++;
			// 	})
			// 	//console.log(JSON.stringify(mapCycle));
				
			// 	var data1 = {
					
   //                  "noRecHistori":"",
			// 		"noRecPlanning":"",
			// 		"noPlanning":$scope.item.noPlanning,
			// 		"tglRencanaSeleksi":moment($scope.item.tanggalRencanaSeleksi).format("YYYY-MM-DD hh:mm:ss"),
			// 		"tglPlanning":"",
			// 		"jenisTestId":$scope.item.jenisTest.id,
			// 		"namaJenisTest":$scope.item.jenisTest.namaProduk,
			// 		"ruanganId":$scope.item.ruangan.ruanganId,
			// 		"namaRuangan":$scope.item.ruangan.namaRuangan,
			// 		"petugasId":$scope.item.petugasPenanggungJawab.id,
			// 		"namaPetugas":$scope.item.petugasPenanggungJawab.namaLengkap,
			// 		"periodeLowongan":moment($scope.item.Periode).format("MM-YYYY"),
			// 		"jumlahPeserta":$scope.item.jumlahPeserta,
			// 		"pelamars" : mapLinen		                    

					
				
					
			// 	}
   //          		// "mapCycle": $scope.daftarBahanLinen._data	
   //          //		console.log(JSON.stringify(data));
   //          		ManageSdm.savePremiAsuransi(data1,"rekrutmen/save-jadwal-seleksi").then(function(e) {
   //          			$scope.item = {};
   //          		// $scope.item.noMesin="",
   //          		// $scope.item.jenisLinen="",
   //          		// $scope.item.kapasitas="",
   //          		// $scope.daftarBahanLinen._data=""

   //          	});
   //          		debugger;
   //          	};

   //           //adi menambahkan option untuk kendodatepicker
   //            $scope.monthSelectorOptions = {
   //              start: "year",
   //              depth: "year"
   //          };
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	]);
});