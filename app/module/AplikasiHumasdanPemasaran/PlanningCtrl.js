define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PlanningCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper','InformasiKomunikasi','InformasiJenisRespon','InformasiRuangan','InformasiKelompokTransaksi','InformasiPegawaiTujuan','InformasiPegawaiPenerima','$mdDialog','$state','InformasiTest',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,InformasiKomunikasi,InformasiJenisRespon,InformasiRuangan,InformasiKelompokTransaksi,InformasiPegawaiTujuan,InformasiPegawaiPenerima,$mdDialog,$state,InformasiTest) {
			$scope.item = {};
			$scope.now = new Date();
			 $scope.dataVOloaded = false;

			
			 ManageSdm.getItem("planningHistoriPelayananCs/get-load-planning-histori-pelayanan?ruanganId=1", true).then(function(dat){
				$scope.item.noPlanning = dat.data.data.noPlanning;
				// load();
				
			});
             
              
             $scope.loadGrid = function () {
             	debugger;
             	var noplan = $scope.item.noPlanning;
				ManageSdm.getItem("planningHistoriPelayananCs/get-list-planning-histori-pelayanan?id="+noplan, true).then(function(dat){
				debugger;
				$scope.dataMaster = dat.data.data.listData;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize: 5,
				data : $scope.dataMaster,
				autoSync: true,
					});
				});
			}

			 var norek = $scope.item.noRec =$state.params.noRec;
            
			 ManageSdm.getItem("historiPelayananCs/get-histori-pelayanan-norec/"+norek, true).then(function(dat){
               $scope.item.noHistori = dat.data.data.list[0].noHistori;
               $scope.item.NoCM = dat.data.data.list[0].noCm;

			});

	    InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
	 	$scope.ListDataRuangan1 = dat;
		});
	    InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
	 	$scope.ListDataRuangan2 = dat;
		});
		InformasiJenisRespon.getOrderList("/service/list-generic/?view=JenisRespon&select=*", true).then(function(dat){
        $scope.ListDataJenisRespon = dat;
          	
      	});
        InformasiPegawaiTujuan.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
         	$scope.ListDataPegawaiPlanning= dat.data.data.data;
       });
        InformasiTest.getOrderList("planningHistoriPelayananCs/get-load-produk-histori-pelayanan", true).then(function(dat){
         	$scope.ListDataInformasi = dat.data.data.data;
         	debugger;
       });

      


	

		ManageSdm.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
			$scope.ruanganId = dat.data.data.idRuangan;
			/*load();*/
			$scope.loadGrid();
		});
         

         InformasiKomunikasi.getOrderList("/service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
         $scope.ListDataKomunikasi = dat;
          	
          	});
         InformasiJenisRespon.getOrderList("/service/list-generic/?view=JenisRespon&select=*", true).then(function(dat){
         $scope.ListDataJenisRespon = dat;
          	
          	});
         InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
	 	$scope.ListDataRuangan = dat;

	});

         InformasiKelompokTransaksi.getOrderList("service/list-generic/?view=KelompokTransaksi&select=*", true).then(function(dat){
         	$scope.ListDataTransaksi = dat;
       });

     


			var dataUser = [
				{"id":1, "nama": "tes", "alamat": "bandung"},
				{"id":2, "nama": "tes", "alamat": "bandung"},
				{"id":3, "nama": "tes", "alamat": "bekasi"},
				{"id":4, "nama": "tes", "alamat": "jakarta"},
				{"id":5, "nama": "tes", "alamat": "aceh"},
				{"id":6, "nama": "tes", "alamat": "jambi"},
				{"id":7, "nama": "tes", "alamat": "bali"},
				{"id":8, "nama": "tes", "alamat": "jakarta"},
				{"id":9, "nama": "tes", "alamat": "solo"},
				{"id":10, "nama": "tes", "alamat": "karawang"},
				{"id":11, "nama": "tes", "alamat": "semarang"},
			];

			  $scope.kl2 = function(logm) {

                $scope.logm = logm;
                $scope.logm.id= logm.id; 
               // init3(logm.id);

                 //
     // init3(logm.id);
          
            };
            	$scope.editData = function(){
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();

				//isi codingan buat ngedit data

			}
			$scope.cekStatus = function(id){
				if(!id){
					$scope.statusDiterima = false;
				}
				else{
					$scope.statusDiterima = true;
				}
			}

              

			$scope.getDataPegawai = function () {
				$scope.pegawaiId = $scope.item.namaPegawai.id;
				ManageSdm.getItem("sdm/get-data-pegawai?pegawaiId="+$scope.pegawaiId, true).then(function(dat){
					$scope.item.jabatan = dat.data.data.jabatan;
					$scope.item.nip = dat.data.data.nip;
					$scope.item.ruangan = dat.data.data.namaRuangan;
					$scope.item.ruanganId = dat.data.data.ruanganId
				});
			}

			$scope.getCuti = function () {
				$scope.cutiHabis = false;
				ManageSdm.getItem("sdm/get-data-cuti?pegawaiId="+$scope.pegawaiId+"&&statusPegawaiId="+$scope.item.statusPegawai.id+"&&kategoriPegawaiId="+$scope.item.namaPegawai.kategoriPegawaiId, true).then(function(dat){
					$scope.item.jumlahCuti = dat.data.data.jatahCuti;
					$scope.item.sisaCuti = dat.data.data.sisaCuti;
					if ($scope.item.jumlahCuti <= 0) {
						$scope.cutiHabis = true;
					} else {
						$scope.cutiHabis = false;
					}

				});
			}
			$scope.cutiHabis = false;
			$scope.dataVOloaded = true;
			$scope.disJumlahCuti = true;
			$scope.hideJumlahCuti = false;
			$scope.showJumlahCuti = function () {
				if ($scope.item.statusPegawai.id == 1) {
					$scope.hideJumlahCuti = true;
					$scope.getCuti();
					
				} else {
					$scope.hideJumlahCuti = false;
				}
			}



          	ManageSdm.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
					$scope.listKomunikasi = dat.komunikasi;
					// $scope.item.noUsulan = dat.data.data.noUsulan;
					// $scope.listStatusPegawai = dat.data.data.listStatusPegawai;
				});
       
			

			$scope.listDataJenisKelamin = [

             {
             "id":1, "JK":"Laki-laki"
             },
              {
              "id":2, "JK":"Perempuan"

              }

			]
			// }]
			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 10,
				//data: dataUser,
				data: $scope.listDataMaster,
				autoSync: true,
				scrollable : true
			});
			
			 $scope.mainGridOptions = {
              editable: "popup",
                pageable: true,
                scrollable: true,
                height: 300,
                selectable: "row",
                columns: $scope.columnPermohonanPerubahanStatus,
                // filterable: {
                //     extra: false,
                //     operators: {
                //         string: {
                //             startsWith: "Mulai Dengan",
                //             eq: "Is equal to",
                //             neq: "Is not equal to"
                //         }
                //     }
                // },
               
            };

			$scope.columnPermohonanPerubahanStatus = [
			
			{
				"field": "noPlanning",
				"title": "No Planning"
			},
			// {
			// 	"field": "",
			// 	"title": "No Planning Intern"
			// },
			{
				"field": "namaPlanning",
				"title": "Nama Planning"
			},
			{
				"field": "deskripsiPlanning",
				"title": "Deskripsi Planning"
			},
			{
				"field": "tglPengajuan",
				"title": "Tanggal Pengajuan",
				"template": "#= new moment(new Date(tglPengajuan)).format('DD-MM-YYYY') #"
			},
			{
				"field": "tglPlanning",
				"title": "Tanggal Planning",
				"template": "#= new moment(new Date(tglPlanning)).format('DD-MM-YYYY') #"
			},
			{
				"field": "ruangan",
				"title": "Ruangan"
			},
			{
				"field": "ruanganAsal",
				"title": "Ruangan Asal"
			},
		
			{
				"field": "jenisRespon",
				"title": "Jenis Respon Planning"
			},
			{
				"field": "detailResponPlanning",
				"title": "Detail Respon Service Planning"
			},
			{
				"field": "namaProduk",
				"title": "Informasi Planning"
			},
			{
				"field": "namaPegawaiPlanning",
				"title": "Pegawai Planning"
			},

			{
				"field": "isCito",
				"title": "CITO",
				 "template": "<span class='style-right'>{{citoo('#: isCito #')}}</span>"
			},


			{
				"field": "komunikasi",
				"title": "Komunikasi Planning"
			},

			{
				"field": "keteranganPlanning",
				"title": "Keterangan Lainnya Planning"
			},

			{
				"field": "noHistoriPlanning",
				"title": "No Histori Planning"
			},

		 //    {
			// 	"field": "noMasukPlanning",
			// 	"title": "No Masuk Planning"
			// },

			{
				"field": "noCm",
				"title": "No CM"
			}
			
			

			];


			$scope.citoo = function(values){
  			var data=values;
   			if (data==1){
        		return 'TRUE'
  			 }   
  			else {
     	   		return 'FALSE'
 			 }
		   }

			$scope.statusBarang = [
				{
					"id": 0,
					"name": "Belum Dikirim"
				},
				{
					"id": 1,
					"name": "Sudah Diterima"
				}
			]
			$scope.alertTgl = function(ev) {
				$mdDialog.show(
					$mdDialog.alert()
					.parent(angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(false)
					.title('Peringatan')
					.textContent('Jumlah hari yang anda pilih melebihi sisa cuti')
					.ariaLabel('Alert Tgl')
					.ok('OK')
					.targetEvent(ev)
					);
			};
			var days = function(date1, date2) {
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
				var _days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				var days = [];
				for (var i = 0; i < diff; i++) {
					date1.setDate(date1.getDate() + i);
					days.push(_days[date1.getDay()]);
				}
				return days;
			};

			var removeA = function (arr) {
				var what, a = arguments, L = a.length, ax;
				while (L > 1 && arr.length) {
					what = a[--L];
					while ((ax= arr.indexOf(what)) !== -1) {
						arr.splice(ax, 1);
					}
				}
				return arr;
			}


			$scope.dataUser = new kendo.data.DataSource({
							data: $scope.dataMaster,
						});

						
						$scope.isShowPopUp = false;
						$scope.dataSelected = {};


			$scope.openWindow = function(){
                        var myWindow = $("#winPopUp");
						myWindow.data("kendoWindow").open();
						$scope.isShowPopUp = true;
                
			}

			$scope.reset = function(){

		        $scope.item.namaPlanning="";
				$scope.item.DeskripsiPlanning="";
				$scope.item.tglpengajuan="";
				$scope.item.detaildeskripsi="";
				$scope.item.tglpengajuan="";
				$scope.item.tglplanning="";
				$scope.item.Ruangan="";
				$scope.item.RuanganAsal="";
				$scope.item.jeniRespon="";
				$scope.item.DetailRespon="";
				$scope.item.informasi="";
				$scope.item.namaLengkap="";
				$scope.item.namaLengkap2="";
				$scope.item.komunikasi="";
				$scope.item.keterangan="";
				$scope.item.noHistori="";
				$scope.item.noMasukPlanning="";
				$scope.item.NoCM="";
				$scope.item.Antrian="";

					

				}

           
           var aktif = 0;
			$scope.check = function () {
				debugger;	
				if (aktif)
					aktif = 0;

				else
					aktif = 1;		
			
			}
           
            var aktif2 = 0;
            $scope.check2 = function () {
				debugger;	
				if (aktif2)
					aktif2 = 0;

				else
					aktif2 = 1;		
			
			}

			$scope.item.tglPengajuan = new Date();

            
            $scope.Save=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda yakin akan menyimpan data ini?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.Simpan();
                })
            };


			$scope.Simpan = function () {
         
          debugger;

	      var listRawRequired = [
          "item.noPlanning|ng-model|No Planning",
          "item.namaPlanning|ng-model|Nama Planning",
          "item.DeskripsiPlanning|ng-model|Deskripsi Planning",
          "item.tglpengajuan|k-ng-model|Tanggal Pengajuan",
           "item.tglplanning|k-ng-model|Tanggal Planning",

           "item.ruangan|k-ng-model|Ruangan",
          "item.RuanganAsal|k-ng-model|Ruangan Asal",
          "item.DeskripsiPlanning|ng-model|Deskripsi Planning",
          "item.jeniRespon|k-ng-model|Jenis Respon",
           "item.DetailRespon|ng-model|Detail Respon",

           "item.informasi|k-ng-model|Informasi",
          "item.namaLengkap|k-ng-model|Pegawai Planning",
          "item.namaLengkap2|k-ng-model|Pegawai Penanggung Jawab",
          "item.komunikasi|k-ng-model|Komunikasi Planning",
          "item.keterangan|ng-model|Keterangan",

          "item.noHistori|ng-model|No Histori",
          "item.noMasukPlanning|ng-model|No Masuk Planning",
          "item.NoCM|ng-model|No CM",
          "item.Antrian| ng-model |Antrian"

                     
         
        ];
        var isValid = ModelItem.setValidation($scope, listRawRequired);
				debugger;
                    var data =
				               {
							    "noPlanning": $scope.item.noPlanning,
							    "namaPlanning" : $scope.item.namaPlanning,
							    "tglPengajuan" : DateHelper.getPeriodeFormatted($scope.item.tglpengajuan),
							    "detailResponPlanning" : $scope.item.DetailRespon,
							    "keteranganPlanning" :  $scope.item.keterangan,
							    "deskripsiPlanning" :  $scope.item.DeskripsiPlanning,
							    "tglPlanning":DateHelper.getPeriodeFormatted($scope.item.tglplanning),
							    "jenisResponPlanning":{"id":$scope.item.jeniRespon.id},
							    //"kdProduk": $scope.item.informasi.idproduk,
							     "kdProduk": {"id" : $scope.item.informasi.idproduk,},
							    "pegawaiPlanning":{"id":$scope.item.namaLengkap.idpegawai},
							    "noCM": {"id" : $scope.item.NoCM},
							    "komunikasiPlanning": {"id":$scope.item.komunikasi.id},
							    "isCito": aktif,
							    "noHistoriPlanning": $scope.item.noHistori,
							    "statusEnabled" : aktif2,
								"strukPlanning" : { 
									"kdruangan": {"id":$scope.item.Ruangan.id},
									"kdpegawaipjawab" : {"id":$scope.item.namaLengkap2.idpegawai},
									"kdruanganasal" : {"id":$scope.item.RuanganAsal.id},
									"tglPlanning":DateHelper.getPeriodeFormatted($scope.item.tglplanning),
							     "statusEnabled" : aktif2
					              }
				                  };




					ManageSdm.saveData(data,"planningHistoriPelayananCs/save-planning-histori-pelayanancs").then(function(e) {
					console.log(JSON.stringify(e.data));
				    $scope.loadGrid();
				    ManageSdm.getItem("planningHistoriPelayananCs/get-load-planning-histori-pelayanan?ruanganId=1", true).then(function(dat){
				     $scope.item.noPlanning = dat.data.data.noPlanning;
			         });
   
				    $scope.item.namaPlanning="";
					$scope.item.DeskripsiPlanning="";
					$scope.item.tglpengajuan="";
					$scope.item.detaildeskripsi="";
					$scope.item.tglpengajuan="";
					$scope.item.tglplanning="";
					$scope.item.Ruangan="";
					$scope.item.RuanganAsal="";
					$scope.item.jeniRespon="";
					$scope.item.DetailRespon="";
					$scope.item.informasi="";
					$scope.item.namaLengkap="";
					$scope.item.namaLengkap2="";
					$scope.item.komunikasi="";
					$scope.item.keterangan="";
					// $scope.item.noHistori="";
					$scope.item.noMasukPlanning="";
					// $scope.item.NoCM="";
					$scope.item.Antrian="";

					

					});
				
			}
		}
		]);
});