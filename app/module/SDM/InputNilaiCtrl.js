define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputNilaiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm', 'DateHelper', 'FindSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm,DateHelper,FindSdm) {

			//adi tgl 12-jun-17
			//menambahkan untuk fungsi menerima sejumlah record data dari form daftar pelaksanaan seleksi
			
			// console.log($state.params.noRec);
			// ini dapat di getRouting
			 // if ($state.params.noRec1 !== ""){
    //         	$scope.item = JSON.parse($state.params.noRec1);
    //         }else
    //         	$scope.item = data;

   			//$scope.item.periodeLowongan=$state.params.periodeLowongan;
   			//$scope.item.namaProdukRs=$scope.params.namaProdukRs;

   			//untuk dapetin datanya dari daftarPelaksanaan seleksi ditampung disini dari parameter atas
   			//dari grid ke field di input nilai
   			$scope.periodeLowongan=$state.params.periodeLowonganR;
   			$scope.jenisT=$state.params.jenisTR;
   			$scope.idJ=$state.params.idJR;
   			$scope.tglPelaksana=$state.params.tglPelaksanaR;
   			$scope.namaRuangan=$state.params.namaRuanganR;
   			$scope.namaPetugas=$state.params.namaPetugasR;

   			//adi tgl 13-jun-17 untuk data dari detail di grid untuk ke grid
   			// $scope.noPeserta=$state.params.noPsR;
   			// $scope.namaLengkap=$state.params.nmLkR;
   			// $scope.jenisKelamin=$state.params.jsKlR;
   			// $scope.institusiPendidikan=$state.params.itPdR;
   			// $scope.namaPendidikan=$state.params.dgR;
   			// $scope.kualifikasiJurusan=$state.params.kfJR;
   			// $scope.posisiLamar=$state.params.posLmR;

   			// $scope.itemData=JSON.parse($state.params.RecPesertas);

   			//jadinya pake ini aja berdasarkan idNoRec
   			// $scope.idNoRec = $state.params.idNoRec;





           

            // findSdm.getInputNilai($scope.item.noRec).then(function(e) {
            //             if (e.data.data === null) return;
            //             // $scope.item.statusPelamar = e.data.data.berkas.statusPelamar;
            //             $scope.noRec = e.data.data.berkas.noRec;
            //             //adi tgl 05-jun-17, ganti jadi isLulus hasilnya
            //             // $scope.item.isLulus = e.data.data.berkas.isLulus === true ? 1 : 0;
            //             var arr = [];
            //             for (var key in e.data.data.detail) {
            //                 if (e.data.data.detail.hasOwnProperty(key)) {
            //                     var element = e.data.data.detail[key];
            //                     element.syarat.value = element.status === 'true';
            //                     element.syarat.noRec = element.noRec;
            //                     arr.push(element.syarat);
            //                 }
            //             }
            //             if (arr.length !== 0)
            //                 $scope.listPersyaratanPelamar = _.sortBy(arr, function(e) {
            //                     return e.id;
            //                 });
            //         });



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
			
			 // $scope.pindah = function(){
				 
				// $state.go("RekamDataPegawai");
				 
			 // }
				
			 
			 //  $scope.Listketerangan = [{
				// 	"id": 1,
				// 	"kode": "1",
				// 	"name": "2016"
				// }];
				
				
			// 	$scope.ganti = function() {
				
			// 	if ($scope.item.tahunUMR.name=="2016")
			// 	{
			// 		$scope.item.jumlahUMR="2300000";
					
			// 	}
			// 	else
			// 	{
			// 		$scope.item.jumlahUMR="";
					
			// 	}
				
			// }
					
					
					
					
				

			
			 
			 
			 //  $scope.pindah1 = function(){
				 
				// $state.go("DataKeluarga");
				 
			 // }
			
			
			
			
			$scope.columnDaftarPelamar = [
			{
               title: "<center><input type='checkbox' title='Select All' ng-click='toggleSelectAll($event)'></center>",
               width: "5%",
               template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRow(dataItem)''></div>"
            }
			,{
				"field": "noPeserta",
				"title": "No. Peserta",
				"width": "15%"
			},
			{
				"field": "namaLengkap",
				"title": "Nama Lengkap",
				"width": "20%"
			},
			{
				"field": "jenisKelamin",
				"title": "Jenis Kelamin",
				"width": "20%"
			},
			{
				"field": "degree",
				"title": "Degree",
				"width": "20%"
			},
			{
				"field": "jurusan",
				"title": "Jurusan",
				"width": "20%"
			},
			{
				"field": "nilai",
				"title": "Nilai",
				"width": "20%"
	
			},
			{
				"field": "posisiDilamar",
				"title": "Posisi Dilamar",
				"width": "20%"
			},
			{
				"field": "email",
				"title": "Email",
				"width": "20%"
	
			}
			];
		
			

			
			
			// $scope.Save = function() {
						
			  
   //           ManageSdm.savePremiKesehatan(ModelItem.beforePost($scope.item)).then(function (e) {
   //                $scope.item= {};
   //                 init();  
   //                  /*$state.go('dashboardpasien.TandaVital', {
   //                   noCM: $scope.noCM
   //                   });*/
   //           });


   //          };

             //adi menambahkan option untuk kendodatepicker
              $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
			
			// $scope.columnInputNilai = [
			// {
			// 	"field": "pelamarId",
			// 	"title": "No. Peserta",
			// 	"width": "15%"
			// },
			// {
			// 	"field": "namaLengkap",
			// 	"title": "Nama Lengkap",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "jenisKelamin",
			// 	"title": "Jenis Kelamin",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "institusiPendidikan",
			// 	"title": "Universitas",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "namaPendidikan",
			// 	"title": "Degree",
			// 	"width": "20%"
			// },
			// {
			// 	"field": "kualifikasiJurusan",
			// 	"title": "Jurusan",
			// 	"width": "20%"		
			// },
			// {
			// 	"field": "posisiLamar",
			// 	"title": "Posisi Lamar",
			// 	"width": "20%"
			// },
			// {
				
			// 	"field": "nilaiHasilTest",
			// 	"title": "Nilai Hasil Test",
			// 	"width": "20%",
			// 	"template": "<input c-text-box type='input' class='k-textbox' ng-model='nilaiHasilTest' />"
			// },
			// {
			// 	"field": "lolosTest",
			// 	"title": "Lolos Test",
			// 	"width": "20%",
			// 	"template": "  <md-checkbox ng-disabled='false' ng-model='lolos' aria-label='Checkbox 1'></md-checkbox>",
   //              "width": "150px"

                
	
			// }
			// ];
			


			

			//adi tgl-13-jun-17 ga pake function dihapus
			$scope.optGridPindah = {
				
			columns: [
			{
				field: "pelamarId",
				title: "No. Peserta",
				width: "15%",
				editable: false
		    },
			{
				field: "namaPelamar",
				title: "Nama Lengkap",
				width: "20%",
				editable: false
			},
			{
				field: "jenisKelamin",
				title: "Jenis Kelamin",
				width: "20%",
				editable: false
			},
			{
				field: "universitas",
				title: "Universitas",
				width: "20%",
				editable: false
			},
			{
				field: "degree",
				title: "Degree",
				width: "20%",
				editable: false
			},
			{
				field: "jurusan",
				title: "Jurusan",
				width: "20%",
				editable: false		
			},
			{
				field: "posisiLamar",
				title: "Posisi Lamar",
				width: "20%",
				editable: false
			},
			{
				
				field: "nilaiHasilTest",
				title: "Nilai Hasil Test",
				width: "20%"
			},
			{
				field: "lolosTest",
				title: "Lolos Test",
				width: "20%",
				// template: " <md-checkbox ng-disabled='false' ng-model='lolos' aria-label='Checkbox 1'></md-checkbox>",
				// template: '<input type="checkbox" #= lolosTest ? "checked=checked" : "" # ></input>',
				// template: "<md-checkbox ng-disabled='false' aria-label='Checkbox 1' ng-model='lolosTest'></md-checkbox>",
				template: " <input type='checkbox' name='dataAktif' id='dataAktif' value='false' ng-model='item.dataAktif' ng-true-value='true' ng-false-value='false' ng-checked='vals'>",
                width: "150px"
	
			}
			],
			editable: true

			};


			//adi tgl 14-jun-17
			// var onChange = function(e){

			// 	if((e.field && e.action == "itemchange")){
			// 		$scope.ff.nilaiHasilTest = $scope.ff.nilaiHasilTest; 
			// 		var grid = $(this).data("optGridPindah");
			// 	}

			// }


			//adi 13-jun-17 get berdasarkan id no rec dari daftar pelaksanaan seleksi
			// var idNoRec = $scope.idNoRec;

			// if(idNoRec == undefined){
			// 	idNoRec = "";
			// }

			// FindSdm.getDataInputNilai("rekrutmen/get-pelaksana-seleksi-by-no-rec-struk-planning?noRecStrukPlanning="+idNoRec, true).then(function(dat){
			// 	$scope.listDataInputNilai = dat.data.data;
			// 	debugger;
			// });

			  //adi tgl 20-jun-17 nambahin buat dapetin list jenis test
             ManageSdm.getOrderList("rekrutmen/get-jenis-test", true).then(function (dat) {
                $scope.listJenisTest = dat.data.data;
                // debugger;
            });
			
			//adi 13-jun-17
			// ManageSdm.getOrderList("rekrutmen/get-pelaksana-seleksi-by-no-rec-struk-planning?noRecStrukPlanning="+idNoRec, true).then(function (dat) {
				
   //              $scope.listDataInputNilai = dat.data.data;

   //              //list ini untuk inputan
   //              $scope.periodeLowongan = dat.data.data[0].periodeLowongan;

   //  //             for (var x=0; x<  $scope.listJenisTest.length ;x++){
			// 	// 	if ($scope.listJenisTest[x].namaProduk === dat.data.data[0].namaProdukRs){
			// 	// 		$scope.item.jenisTest= $scope.listJenisTest[x];
			// 	// 		$scope.item.jenisTest.namaProduk = $scope.listJenisTest[x].namaProduk;
			// 	// 		$scope.idJ = $scope.listJenisTest[x].id;
			// 	// 	};

			// 	// };

   //              // $scope.namaProdukRs= dat.data.data[0].namaProdukRs;
   //              $scope.jenisT = dat.data.data[0].namaProdukRs;
   //              $scope.idJ = dat.data.data[0].produkRsId;
   //              $scope.tglPelaksana = dat.data.data[0].tglPelaksana;
   //              $scope.namaRuangan = dat.data.data[0].namaRuangan;
   //              $scope.namaPetugas = dat.data.data[0].namaPetugas;



   //              //list ini untuk yang grid
   //              // $scope.listPesertas = dat.data.data[0].pesertas;

   //              debugger;
   //          });


            //adi tgl 15-jun-17
			//untuk klik grid dapetin nilai true atau false / 1 atau 0 buat disimpan ke database

			$scope.klik = function(current){
				$scope.nilaiScore = current.nilaiHasilTest;
				if (current.lolosTest === true){
					$scope.vals = 1;
				} else{
					$scope.vals = 0;
				}
				
			}
			

		//tgl 13-jun-17
        //membuat save data di input nilai, field dan gridnya di input
        $scope.Save = function(){

        		
        		if ($scope.item.dataAktif === false){
        			$scope.item.dataAktif = 0;
        		}else{
        			$scope.item.dataAktif = 1;
        		}

				var dat = $scope.ListTampilGrid;
				// console.log(JSON.stringify(dat));
				var i=0;
				var mapLinen = [];
				dat.forEach(function(data){

					var data ={
						//ini untuk yang di gridnya

					"pelamarId":data.pelamarId,
					"namaPelamar":data.namaPelamar,
					"universitas":data.univeristas,
					"degree":data.degree,
					"jurusan":data.jurusan,
					"nilai":data.nilai,
					"posisiLamarId":data.posisiLamarId,
					"posisiLamar":data.posisiLamar,
					"kategoriLamarId":data.kategoriLamarId,
					"kategoriLamar":data.kategoriLamar,
					"nilaiScore":$scope.nilaiScore,
					"periode":data.periode,
					"isLulus":$scope.item.dataAktif,
					"isCheck":data.isLulus
					
						
					}
					mapLinen[i] = data;
					i++;
				})
				//console.log(JSON.stringify(mapCycle));

				//ini untuk yang di inputan dan combo field
				var data1 = {
					

					"noRecHistori":"",
					"noRecPlanning":"",
					"noPlanning":"",
					"tglRencanaSeleks":"",
					"tglPlanning":"",
					"jenisTestId":$scope.idJ,
					"namaJenisTest":$scope.jenisT,
					"ruanganId":"",
					"namaRuangan":$scope.namaRuangan,
					"petugasId":"",
					"namaPetugas":$scope.namaPetugas,
					"periodeLowongan":$scope.periodeLowongan,
					"jumlahPeserta":"",
					"pelamars": mapLinen

					// "idNoRec":$scope.idNoRec,
					// "tglPelaksana":moment($scope.tglPelaksana).format("YYYY-MM-DD"),
					
					




     //                "noRecHistori":"",
					// "noRecPlanning":"",
					// "noPlanning":"",
					// "tglRencanaSeleksi":moment($scope.item.tanggalPelaksanaanSeleksi).format("YYYY-MM-DD hh:mm:ss"),
					// "tglPlanning":"",
					// "jenisTestId":$scope.item.jenisTest.id,
					// "namaJenisTest":$scope.namaProdukRs,
					// "ruanganId":$scope.item.ruangan.ruanganId,
					// "namaRuangan":$scope.namaRuangan,
					// "petugasId":$scope.item.petugasPenanggungJawab.id,
					// "namaPetugas":$scope.namaPetugas,
					// "periodeLowongan":moment($scope.periodeLowongan).format("MM-YYYY"),
					// "jumlahPeserta":$scope.item.jumlahPeserta,
					// "pesertas" : mapLinen		                    

					
				
					
				}
            		// "mapCycle": $scope.daftarBahanLinen._data	
            //		console.log(JSON.stringify(data));
            		ManageSdm.saveInputNilai(data1,"rekrutmen/save-nilai-seleksi").then(function(e) {
            			$scope.item = {};
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""

            		

            	});

            			
				debugger;

            };

            //adi tgl 19-jun-17 nambahin link biar ke

             $scope.pindahKe = function() {
                //$scope.item yang berupa object rubah ke sebuath string, intinya JSON.stringify untuk menconversi object jadi sebuah string
                $state.go("InputJadwalSeleksi");
                //debugger;

            }

          

             //adi tgl-20-jun-17 menambahkan fungsi tampilBerdasar
             // var ji = $scope.
     //         var idJe = $scope.idJ;
     //         var periode = $scope.periodeLowongan;

     //        var tampilJenPer = function(){
     //        	 // var idJe = $scope.idJ;
     //         	//  var periode = $scope.periodeLowongan;
     //        		ManageSdm.getOrderList("rekrutmen/get-inputnilai-pelamar-by-jenis-test-periode?jenisTestId="+idJe+"&periode="+periode, true).then(function (dat) {
     //  //       			$scope.ListTampilGrid = new kendo.data.DataSource({
					// 	// 	data: dat.data.data
					// 	// });
					// 	$scope.ListTampilGrid = dat.data.data;
					// 	//adi tgl 14-jun-17 menambahkan datasource
     //            $scope.dataSource = new kendo.data.DataSource({
     //            	pageSize:10,
     //            	data: $scope.ListTampilGrid,
     //            	batch:true,
     //            	schema:{
     //            		model: {
     //            			fields:{
     //            				pelamarId:{ editable: false},
     //            				namaPelamar:{ editable: false},
     //            				jenisKelamin:{ editable: false},
     //            				universitas:{ editable: false},
     //            				degree:{ editable: false},
     //            				jurusan:{ editable: false},
     //            				posisiLamar:{ editable: false},
     //            				nilaiHasilTest:{ type: "number", required:true},
     //            				lolosTest:{ type: "boolean", defaultValue: false}
     //            			}
     //            		}
     //            	}

     //            });
     //            debugger;

					// });
     //    	 };


        	// tampilJenPer();

        	//ini untuk menampilkan di gridnya
			 // $scope.tampil = function () {
				var jenisI = $scope.idJ;
				var per = $scope.periodeLowongan;

				ManageSdm.getOrderList("rekrutmen/get-inputnilai-pelamar-by-jenis-test-periode?jenisTestId="+jenisI+"&periode="+per, true).then(function (dat) {
      //       			$scope.ListTampilGrid = new kendo.data.DataSource({
						// 	data: dat.data.data
						// });

						$scope.ListTampilGrid = dat.data.data;
						//adi tgl 14-jun-17 menambahkan datasource
                	$scope.dataSource = new kendo.data.DataSource({
                		pageSize:10,
                		data: $scope.ListTampilGrid,
                		batch:true,
                		schema:{
                		model: {
                			fields:{
                				pelamarId:{ editable: false},
                				namaPelamar:{ editable: false},
                				jenisKelamin:{ editable: false},
                				universitas:{ editable: false},
                				degree:{ editable: false},
                				jurusan:{ editable: false},
                				posisiLamar:{ editable: false},
                				nilaiHasilTest:{ type: "number", validation: {required:true}},
                				lolosTest:{ type: "boolean", defaultValue: false}
                			}
                		}
                	}

                });
                debugger;

					});

				
			// };

			// init();




			

			
			
			
			
			
			
			
			
			
			
		}
	]);
});