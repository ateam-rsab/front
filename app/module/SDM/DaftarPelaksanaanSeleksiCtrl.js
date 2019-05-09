define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPelaksanaanSeleksiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.no=1;

			// ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
			// 	$scope.listPenandatangan = data;
			// })

			// $scope.dataLaporanUjiHasil = new kendo.data.DataSource({
			// 	data: [{}]
			// });
			
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
			
			
			// $scope.daftarJenisBahan = new kendo.data.DataSource({
			// data: [
			// 		{ 
			// 			"kodeJenis":"BHN001",
			// 			"JenisBahan":"Aldet"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN002",
			// 			"JenisBahan":"Laudet"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN003",
			// 			"JenisBahan":"MC. Bleach"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN004",
			// 			"JenisBahan":"OXO. Bleach"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN005",
			// 			"JenisBahan":"E. 951"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN006",
			// 			"JenisBahan":"M. Saur"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN007",
			// 			"JenisBahan":"M. Soft"
			// 		}

			// 	]
			// });
			
			
			// $scope.daftarBahanLinen = new kendo.data.DataSource({
			// 	data:[
			// 		{ 
			// 			"kodeJenis":"BHN001",
			// 			"JenisBahan":"Aldet"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN002",
			// 			"JenisBahan":"Laudet"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN003",
			// 			"JenisBahan":"MC. Bleach"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN004",
			// 			"JenisBahan":"OXO. Bleach"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN005",
			// 			"JenisBahan":"E. 951"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN006",
			// 			"JenisBahan":"M. Saur"
			// 		},
			// 		{ 
			// 			"kodeJenis":"BHN007",
			// 			"JenisBahan":"M. Soft"
			// 		}

			// 	]
			// });
			
			// $scope.columnLaporanUjiHasil = [
			// {
			// 	"field": "no",
			// 	"title": "Kode Sub Unit Kerja ",
			// 	"width": "5%"
			// },
			// {
			// 	"field": "nama",
			// 	"title": "Nama Sub Unit Kerja",
			// 	"width": "20%"
			// }
			// ];
		
			

			
			
			// $scope.Save = function() {
						
			  
   //           ManageSdm.savePremiKesehatan(ModelItem.beforePost($scope.item)).then(function (e) {
   //                $scope.item= {};
   //                 init();  
   //                  /*$state.go('dashboardpasien.TandaVital', {
   //                   noCM: $scope.noCM
   //                   });*/
   //           });


   //          };
			
			 
			//adi tgl 07-jun-17, menambahkan fungsi untuk memanggil data di combobox petugas penanggung jawab
            ManageSdm.getOrderList("rekrutmen/get-pelaksana-seleksi", true).then(function (dat) {
                $scope.listDaftarPs = dat.data.data;
                //debugger;
            });

			//adi tgl 12-jun-17
			//untuk saat diklik fungsi ini focus data yang ada
			$scope.kl = function(current) {
                $scope.current = current;
                $scope.item = current;
                $scope.pesertas = current.pesertas[0];
                // $scope.item.posisiLamar=current.posisiLamar;
                // debugger;
            }
			
			
			$scope.columnDaftarPelaksanaanSeleksi = [
				{
					"field": "noRecStrukPlanning",
					"title": "No Rec",
					"width": "10%",
					"hidden": true
				},	
				{
					"field": "periodeLowongan",
					"title": "Periode Lowongan",
					"width": "10%"
				},
				{
					"field": "namaProdukRs",
					"title": "Jenis Test",
					"width": "15%"
				},
				{
					"field": "produkRsId",
					"title": "Jenis Test Id",
					"width": "15%",
					"hidden": true
				},
				{
					"field": "tglPelaksana",
					"title": "Tanggal Pelaksanaan",
					"width": "15%",
					"filterable": false
				},	
				{
					"field": "namaRuangan",
					"title": "Ruangan",
					"width": "15%",
					"filterable": false
					
				},
				{
					"field": "namaPetugas",
					"title": "Petugas Penanggung Jawab",
					"width": "15%",
					"filterable": false
					
				},
				// {
				// 	"field": "rinctianPeserta",
				// 	"title": "Rincian Peserta",
				// 	"width": "15%",
				// 	"filterable": false
				// }
				//diganti ini tgl 08-jun-17
				{
                     "command": [{
                        name: "edit",
                                        text: "Peserta",
                                        text: { cancel: "", edit: "Detail" },
                                        icon: { cancel: "" },
                                        button: { cancel: "" }
                                    }],
                                    "title": "Rincian Peserta",
                                    width: "100px"
              
                }

				,
				{
					"field": "qtyPeserta",
					"title": "Qty Peserta",
					"width": "7%",
					"filterable": false
				}

			];
			

			$scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.optDataMonitoring = {
                scrollable:true,
                 filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    startswith: "Dimulai dengan",
                                    eq: "mengandung kata",
                                    neq: "Tidak mengandung kata"
                                }
                            }
                 },
                 editable: {
                 		mode:"popup",
                 		window:{ title: "Rincian Peserta"},
                 		template: kendo.template($("#template").html())
                 },
                 edit: function(e){
                 	e.container.kendoWindow("title", "Detail Rincian Peserta");
                 },
                 dataBound: function(e){
                 	$("#grid tbody tr .k-grid-edit").each(function() {
                            var currentDataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));
                            // debugger;
                                  
                     })
                 }

            };
			
			

			//adi tgl 08-jun-17 ini data maingrid untuk popup 
			 $scope.mainGridOptions_1_3 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.pesertas
					}),
					scrollable:true,
                    columns: [
                    {
	                    field: "posisiLamarId",
	                    title: "Posisi Lamar Id",
	                    width: "20%",
	                    hidden: true
	                },
	                {
	                    field: "pelamarId",
	                    title: "Pelamar Id",
	                    width: "20%"
	                },
	                {
	                	field:"pendidikanId",
	                	title:"Pendidikan Id",
	                	width: "20%",
	                	hidden: true
	                },
	                {
	                	field:"institusiPendidikan",
	                	title:"Institusi Pendidikan",
	                	width: "25%"
	                },
	                {
	                    field: "posisiLamar",
	                    title: "Posisi Lamar",
	                    width: "20%"
					},{
	                    field: "namaPendidikan",
	                    title: "Nama Pendidikan",
	                    width: "28%"
					},
					{
						field: "tglAwal",
						title: "Tanggal Awal",
						width: "20%"
					},
					{
	                    field: "ipkNilai",
	                    title: "Nilai",
	                    width: "10%"	
					},{
	                    field: "namaLengkap",
	                    title: "Nama Lengkap",
	                    width: "25%"		
	                },
	                {
	                	field: "kualifikasiJurusan",
	                	title: "Kualifikasi Jurusan",
	                	width: "25%"
	                }
					
					]
                }
			}
			
			
			

            //untuk pindah dan binding data yang ada di daftar pelaksanaan seleksi (yang ini secara global)
            $scope.pindahData = function() {
                //$scope.item yang berupa object rubah ke sebuath string, intinya JSON.stringify untuk menconversi object jadi sebuah string
                $state.go("InputNilai", { noRec1: JSON.stringify($scope.item) });
                // debugger;

            }

            //coba yang pindah ini
            $scope.pindahData2 = function(){
            	// $state.go("InputNilai",{ idNoRec:$scope.item.noRecStrukPlanning});
            	$state.go("InputNilai",{ periodeLowonganR:$scope.item.periodeLowongan,jenisTR:$scope.item.namaProdukRs,idJR:$scope.item.produkRsId,tglPelaksanaR:$scope.item.tglPelaksana,namaRuanganR:$scope.item.namaRuangan,namaPetugasR:$scope.item.namaPetugas});
            	// debugger;
            }



			
			
			
			
			
			
			
		}
	]);
});