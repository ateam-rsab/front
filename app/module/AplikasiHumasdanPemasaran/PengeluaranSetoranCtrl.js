''
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengeluaranSetoranCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper','InformasiKomunikasi','InformasiJenisRespon','InformasiRuangan','InformasiKelompokTransaksi','InformasiPegawaiTujuan','InformasiPegawaiPenerima','InformasiTest','$mdDialog', '$state',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,InformasiKomunikasi,InformasiJenisRespon,InformasiRuangan,InformasiKelompokTransaksi,InformasiPegawaiTujuan,InformasiPegawaiPenerima,InformasiTest,$mdDialog,$state) {
			$scope.item = {};
			$scope.now = new Date();
			 $scope.dataVOloaded = false;

			
			 ManageSdm.getItem("terimakeluarkaskecil/get-bank-acc", true).then(function(dat){
				 $scope.ListDataBank = dat.data.data.data;
			
			
			});
			  debugger;

			 ManageSdm.getItem("terimakeluarkaskecil/get-keluar-kas-kecil", true).then(function(dat){
				debugger;
				$scope.dataMaster = dat.data.data.data;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster,
				$scrollable : true
				

					
					});
				});
             
             $scope.Deposite = function(){
             	debugger
             $state.go("Deposite",
					{
						
					})
             }

             
              $scope.PenerimaanSetoran = function(){
             	debugger
             $state.go("PenerimaanSetoran",
					{
						
					})
             }
              $scope.batal = function(){
             	debugger
             $state.go("DaftarPengeluaranSetoran",
					{
						
					})
             }



			
			
			$scope.now = new Date();
      		$scope.monthUngkul = {
			start: "year",
			depth: "year"
		    }
			$scope.tahunpilih = {
				start: "decade",
				depth: "decade"
			}

		ManageSdm.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
			$scope.ruanganId = dat.data.data.idRuangan;
			/*load();*/
			$scope.loadGrid();
		});

		$scope.openWindow = function(){    
       var myWindow = $("#winPopUp");
       myWindow.data("kendoWindow").open();
       $scope.isShowPopUp = true;
       
      }

      $scope.detail = function(){    
       var myWindow = $("#winPopUp2");
       myWindow.data("kendoWindow").open();
       $scope.isShowPopUp2 = true;
       
      }
     
     


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

        InformasiPegawaiTujuan.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
         	$scope.ListDataPegawaiTujuan = dat.data.data.data;
         	
       });
         InformasiPegawaiPenerima.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
         	$scope.ListDataPegawaiPenerima = dat.data.data.data;
       });
         
         InformasiTest.getOrderList("historiPelayananCs/get-load-produk-informasi", true).then(function(dat){
         	$scope.ListDataInformasi = dat.data.data.listproduk;
         
       });
       
            
	    var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
	    $scope.listDataKelurahan = ModelItem
	        .kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

	    var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'kotaKabupaten'];
	    ModelItem.getKendoSource("Kecamatan", arrFieldSelectVoKecamatan, true).then(function(data) {
	        $scope.listDataKecamatan = data;
	    });
	    var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'propinsi'];
	    ModelItem.getKendoSource("KotaKabupaten", arrFieldSelectVoKecamatan, true).then(function(data) {
	        $scope.listDataKotaKabupaten = data;
	    });

	    arrFieldSelectVoKecamatan = ['id', 'namaExternal'];
	    ModelItem.getKendoSource("Propinsi", arrFieldSelectVoKecamatan, true).then(function(data) {
	        $scope.listDataPropinsi = data;
	    });

		$scope.ONKLIK = function () {
				debugger;
		 	ManageSdm.getItem("historiPelayananCs/get-load-pasien-bynocm?noCm="+$scope.item.noCm2, true).then(function(dat){
					
				$scope.items = {};
				$scope.item.namaPasien = dat.data.data.listPasien[0].namaPasien;
				// /$scop.iteem. =namaPasien dat.data.data.listPasien[0].namaPasien;
				$scope.item.JenisKelamin = dat.data.data.listPasien[0].jenisKelaminId;
				$scope.item.NamaKelamin = dat.data.data.listPasien[0].jenisKelamin;
				$scope.item.alamats = dat.data.data.listPasien[0].alamats[0].alamatLengkap;
				$scope.item.alamatsId = dat.data.data.listPasien[0].alamats[0].id;
				$scope.item.kodePos = dat.data.data.listPasien[0].alamats[0].kodePos;
				$scope.item.qPasien = dat.data.data.listPasien[0].qPasien;
				$scope.item.tglLahir = dat.data.data.listPasien[0].tglLahir;

                
			});
		           
           	$scope.getDataNoCM = function () {
 
			}
            	$scope.item.noCm2;
			}
           
           
  
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

			
            	$scope.editData = function(){
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();

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
					
				});
       
			
			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 10,
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
                
               
            };

			$scope.columnPermohonanPerubahanStatus = [
					{
						"field": "tlgHistori",
						"title": "Tanggal",
						"template": "#= new moment(new Date(tlgHistori)).format('DD-MM-YYYY') #"
					},

					{
						"field": "kelompokTransaksi",
						"title": "Kelompok Transaksi"
					},
					{
						"field": "pegawaiIDSetorTarikDeposit",
						"title": "Nama Pegawai"
					},
					{
						"field": "nmRuangan",
						"title": "Ruangan"
					},
					// {
					// 	"field": "",
					// 	"title": "Admin"
					// },
					{
						"field": "totalSetorTarikDeposit",
						"title": "Total"
					},
					{
						"field": "bankAccNama",
						"title": "Bank"
					}

					];
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


			$scope.citoo = function(values){
  			var data=values;
   			if (data==1){
        		return 'TRUE'
  			 }   
  			else {
     	   		return 'FALSE'
 			 }
		   }


		   $scope.pelayanans = function(values){
  			var data=values;
   			if (data==1){
        		return 'IN'
  			 }   
  			else {
     	   		return 'OUT'
 			 }
		   }
  


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


			
			
			$scope.isShowPopUp = false;
			$scope.dataSelected = {};




       
            var aktif = false;
            var aktif = 0;
			$scope.check = function () {
			
				if (aktif)
					aktif = 0;

				else
					aktif = 1;		
			
			}

			$scope.klik = function(dataSelected){
		
            	$scope.showEdit = true;
				$scope.dataSelected = dataSelected;
				$scope.item.noRec = dataSelected.noRec;
				$scope.item.noCm = dataSelected.noCm;
				$scope.item.alamat = dataSelected.alamatCustomer;
				$scope.item.deskripsi = dataSelected.deskripsi
								 
			
			};

			 $scope.rencana = function(dataSelected){
			
			 	if($scope.item.noRec==undefined){
			 		alert("Daftar History Pelayanan Customer harus dipilih terlebih dahulu! !");
			 	}else{
            	$state.go("Planning",
					{
						noRec:$scope.item.noRec
					})
            	}
            }

			$scope.reset = function(){

	         $scope.item.noHistori = "";
	         $scope.item.ruangantujuan = "";
	         $scope.item.namaLengkap = "";
	         $scope.item.informasi = "";
	         $scope.item.detaildeskripsi = "";
	         $scope.item.komunikasi = "";
	         $scope.item.KelompokTransaksi = "";
	         $scope.item.namaLengkap ="";
	         $scope.item.namaPasien ="";
	         $scope.item.JenisKelamin ="";
	         $scope.item.noCm2 ="";
	         $scope.item.pelayanan.id ="";
	         $scope.item.jeniRespon ="";
	         $scope.item.detailRespon ="";
	         $scope.item.alamats ="";
	         $scope.item.kodePos ="";
	         $scope.item.desaKelurahan ="";
	         $scope.item.kecamatan ="";
	         $scope.item.kotaKabupaten ="";
	         $scope.item.propinsi ="";
	         $scope.item.tglpelayanan ="";
	         $scope.item.tgldilayani ="";
	         $scope.item.keterangan ="";

				}




			$scope.listLabelDokter = [
                {"id": 1}
            ];
			$scope.disDokter = true;
			$scope.diswow = false;
            $scope.dokter = function(){
            	debugger;
            	if($scope.item.noc === true){
            		$scope.disDokter = false
            	}else{
            		$scope.disDokter = true
            	}

            	if($scope.item.noc === false){
            		$scope.diswow = false
            	}else{
            		$scope.diswow = true
            	}
            };

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

        $scope.closeWindow = function(){
        	debugger;
        $scope.isShowPopUp = false;
         }

          $scope.cancelData = function(){
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();

        //isi codingan buat cancel data yang di edit
      }
        
        $scope.Cetak=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('Apakah anda yakin akan mencetak form ini?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.Cetak2();
                })
            };

            $scope.Cetak2=function(){
            
            };

          
            $scope.reset2=function(){
              
            };

            $scope.Cetak2=function(){
            
            };


		$scope.Simpan = function () {
		debugger;
		var listRawRequired = [
          "item.namaLengkap|k-ng-model|Nama Pegawai",
          "item.ruangantujuan|k-ng-model|Ruangan",
          "item.kelompokTransaksi|k-ng-model|Kelompok Transaksi",
          "item.Pembayaran|ng-model|Pembayaran",
          "item.tanggal|k-ng-model|Tanggal",
          "item.total|ng-model|Total",
          "item.admin|ng-model|Admin",
          "item.bank|k-ng-model|Bank"
         
        ];
        var isValid = ModelItem.setValidation($scope, listRawRequired);
		    
				var data =  {
								"nonHistori" : "KC17070001",
								"tglHistori" : $scope.item.tanggal,
								"tglSetorTarikDeposit" : "2017-06-20",
								"kdBankAccount" : {"id" :  $scope.item.bank.bankAccId},
								"totalSetorTarikDeposit" : $scope.item.total,
								"totalAdminSetorTarikDeposit" : $scope.item.admin,
								"kdPegawaiSetorTarikDeposit" : {"id" : $scope.item.namaLengkap.idpegawai},
								"setorTarikDepositKe" : 1,
								"noHistoriBefore" : "",
								"kdRuangTerima" : 61,
								"ruangan" : {"id" : $scope.item.ruangan.id},
								"kelompokTransaksi" : {"id" : $scope.item.kelompokTransaksi.id}
							 }
	 	

					ManageSdm.saveData(data,"terimakeluarkaskecil/save-terima-kas-kecil").then(function(e) {
					console.log(JSON.stringify(e.data));
					
					
					});
				
				}
			}
		]);
});