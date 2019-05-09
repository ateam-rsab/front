
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenerimaanSetoranCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper','InformasiRuangan','InformasiKelompokTransaksi','InformasiPegawaiTujuan','InformasiPegawaiPenerima','$mdDialog', '$state',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,InformasiRuangan,InformasiKelompokTransaksi,InformasiPegawaiTujuan,InformasiPegawaiPenerima,$mdDialog,$state) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = false;
			$scope.item.tanggalawal = new Date();
			$scope.item.tanggalakhir = new Date();

			ManageSdm.getItem("terimakeluarkaskecil/get-bank-acc", true).then(function(dat){
			$scope.ListDataBank = dat.data.data.data;
			});
             

            $scope.getpembayaran=function(){
			ManageSdm.getItem("terimakeluarkaskecil/get-pembayaranke-by-pegawai?id="+$scope.item.namaLengkap.idpegawai, true).then(function(dat){
			$scope.item.setorTarikDepositKe = dat.data.data.data.countdata;
			ManageSdm.getItem("terimakeluarkaskecil/get-histori-transaksi-by-pegawai?id="+$scope.item.namaLengkap.idpegawai, true).then(function(dat){
			$scope.dataMaster2 = dat.data.data;
			$scope.dataSource = new kendo.data.DataSource({
			pageSize:50,
			data : $scope.dataMaster2,
			$scrollable : true
			});
			});
			});
			}

            //daftar tampil di awal pembukaan menu penerimaan setoran
            var tglAwal = moment($scope.item.tanggalawal).format('YYYY-MM-DD');
		 	var tglAkhir = moment($scope.item.tanggalakhir).format('YYYY-MM-DD');
			ManageSdm.getItem("terimakeluarkaskecil/get-filter-data-by-from-to?from="+tglAwal+"&to="+tglAkhir, true).then(function(dat){
			$scope.dataMaster = dat.data.data.data;
			$scope.dataSource = new kendo.data.DataSource({
			pageSize:50,
			data : $scope.dataMaster,
			$scrollable : true
				});
			});

            //daftar tampil setelah eksekusi pencarian
			$scope.Cari = function(){
		 	var tglAwal = moment($scope.item.tanggalawal).format('YYYY-MM-DD');
		 	var tglAkhir = moment($scope.item.tanggalakhir).format('YYYY-MM-DD');
            ManageSdm.getItem("terimakeluarkaskecil/get-filter-data-by-from-to?from="+tglAwal+"&to="+tglAkhir, true).then(function(dat){
			$scope.dataMaster = dat.data.data.data;
			$scope.dataSource = new kendo.data.DataSource({
			pageSize:50,
			data : $scope.dataMaster,
			$scrollable : true
				});
			});
			}


             // Refresh grid daftar setealah disimpan
			$scope.loadGrid = function(){
		 	var tglAwal = moment($scope.item.tanggalawal).format('YYYY-MM-DD');
		 	var tglAkhir = moment($scope.item.tanggalakhir).format('YYYY-MM-DD');
			ManageSdm.getItem("terimakeluarkaskecil/get-filter-data-by-from-to?from="+tglAwal+"&to="+tglAkhir, true).then(function(dat){
			$scope.dataMaster = dat.data.data.data;
			$scope.dataSource = new kendo.data.DataSource({
			pageSize:50,
			data : $scope.dataMaster,
			$scrollable : true
				});
			});
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

		   $scope.openWindow = function(){    
	       $scope.isShowPopUp = true;
	       if ($scope.item.namaLengkap==null){
	        alert("Daftar Penerimaan Setoran Belum Dipilih");
	       }else{
	       var myWindow = $("#winPopUp");
	       myWindow.data("kendoWindow").open();
	       $scope.isShowPopUp = true;
	       }
	       }


	      $scope.openWindow2 = function(){   
	      // $scope.isShowPopUp = true;
	      debugger;
	       if ($scope.item.namaLengkap==""){
	        alert("Nama Pegawai Harus Dipilih Terlebih dahulu");
	      }else{ 
	       var myWindow = $("#winPopUp2");
	       myWindow.data("kendoWindow").open();
	       $scope.isShowPopUp2 = true;
	      }
	      }

	      $scope.tambah = function(){    
	       var myWindow = $("#winPopUp3");
	       myWindow.data("kendoWindow").open();
	       $scope.isShowPopUp3 = true;

			$scope.item.namaLengkap = "";
			$scope.item.ruangans = "";
			$scope.item.tanggal = "";
			$scope.item.setorTarikDepositKe = "";
			$scope.item.totalSetorTarikDeposit = "";
			$scope.item.banks = "";
	      }
        
        ManageSdm.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
		$scope.listKomunikasi = dat.komunikasi;
					
		 });
       
		
        InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
         	
	 	$scope.ListDataRuangan = dat;

		});

         InformasiKelompokTransaksi.getOrderList("service/list-generic/?view=KelompokTransaksi&select=*", true).then(function(dat){
         	debugger;
         	$scope.ListDataTransaksi = dat;
       }); 

         $scope.ListDataTransaksi2= {
		    
		    "id": 60,
		    "kelompokTransaksi2": "SETORAN KASIR"
		  }

        InformasiPegawaiTujuan.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
         	$scope.ListDataPegawaiTujuan = dat.data.data.data;
         	
       });
         InformasiPegawaiPenerima.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
         	$scope.ListDataPegawaiPenerima = dat.data.data.data;
       });
         
     

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

            $scope.item.kelompokTransaksifilter = "SETORAN KASIR";

            $scope.klik = function(dataSelected){
            	debugger;
            	$scope.showEdit = true; 
				$scope.dataSelected = dataSelected;
				$scope.item.nonHistori = dataSelected.nonHistori;
            	$scope.item.tanggalhistory = new moment(dataSelected.tlgHistori).format('YYYY-MM-DD');
            	$scope.item.tanggal = new moment(dataSelected.tlgHistori).format('YYYY-MM-DD');            	
				//$scope.item.kelompokTransaksi = dataSelected.kelompokTransaksi;
				$scope.item.pegawaiIDSetorTarikDeposit = dataSelected.pegawaiIDSetorTarikDeposit;
				$scope.item.totalSetorTarikDeposit = dataSelected.totalSetorTarikDeposit;
				$scope.item.kelompokTransaksi = dataSelected.kelompokTransaksi;
				
				
				$scope.item.banks = {bankAccId:dataSelected.bankAccId,
								     bankAccNama:dataSelected.bankAccNama}
			    $scope.item.ruangans = {id:dataSelected.idRuangan,
									    namaRuangan:dataSelected.nmRuangan}
				$scope.item.kelompokTransaksi = {id:dataSelected.kelompokTransaksiId,
				                                 kelompokTransaksi:dataSelected.kelompokTransaksi}
				$scope.item.namaLengkap = {idpegawai:dataSelected.pegawaiIDSetorTarikDeposit,
				                                 namaLengkap:dataSelected.namaPegawai}

				// ManageSdm.getItem("terimakeluarkaskecil/get-terima-kas-kecil-bynohistori?noHistori="+$scope.item.nonHistori, true).then(function(dat){
				// $scope.dataMaster2 = dat.data.data.data;
				// $scope.dataSource = new kendo.data.DataSource({
				// pageSize:50,
				// data : $scope.dataMaster,
				// $scrollable : true
				// 	});
				// });

				ManageSdm.getItem("terimakeluarkaskecil/get-histori-transaksi-by-pegawai?id="+$scope.item.namaLengkap.idpegawai, true).then(function(dat){
				debugger
				$scope.dataMaster2 = dat.data.data;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster2,
				pageable: true,
				$scrollable : true
					});
				});

				ManageSdm.getItem("terimakeluarkaskecil/get-pembayaranke-by-pegawai?id="+$scope.item.namaLengkap.idpegawai, true).then(function(dat){
			 
			    $scope.item.setorTarikDepositKe = dat.data.data.data.countdata;
                });

            }

			$scope.columnPermohonanPerubahanStatus = [
			       {
						"field": "nonHistori",
						"title": "No History"
					},
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
						"field": "namaPegawai",
						"title": "Nama Pegawai"
					},
					{
						"field": "nmRuangan",
						"title": "Ruangan"
					},
					
					{
						"field": "totalSetorTarikDeposit",
						"title": "Total"
					}
					// ,
					// {
					// 	"field": "bankAccNama",
					// 	"title": "Bank"
					// }

					];
					$scope.columnhistory = [
					{
						"field": "nonHistori",
						"title": "No History"
					},
					{
						"field": "tlgHistori",
						"title": "Tanggal",
						"template": "#= new moment(new Date(tlgHistori)).format('DD-MM-YYYY') #"
					},
					
					{
						"field": "setorTarikDepositKe",
						"title": "Penarikan Ke"
					},
					{
						"field": "totalSetorTarikDeposit",
						"title": "Total"
					}
					];
		

		
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

        $scope.closeWindow = function(){
        	debugger;
        $scope.isShowPopUp = false;
         }

        $scope.cancelData = function(){
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();

        //isi codingan buat cancel data yang di edit
      }
       $scope.cancelData2 = function(){
        var myWindow = $("#winPopUp3");
        myWindow.data("kendoWindow").close();

        //isi codingan buat cancel data yang di edit
      }

       $scope.cancelData3 = function(){
        var myWindow = $("#winPopUp2");
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

         
            $scope.reset=function(){
                var confirm = $mdDialog.confirm()
                      .title('Peringatan!')
                      .textContent('membatalkan data akan mengreset semua data, lanjutkan?')
                      .ariaLabel('Lucky day')
                      .ok('Ya')
                      .cancel('Tidak')

                $mdDialog.show(confirm).then(function() {
                    $scope.reset2();
                })
            };


            $scope.reset2=function(){
              
            };

            $scope.Cetak2=function(){
            
            };


		$scope.Save = function () {
			debugger;
	    var data = 

					{
						    "nonHistori" : "KK17070002",
						    "tglHistori" : $scope.item.tanggalhistory,
						    "tglSetorTarikDeposit" : $scope.item.tanggal,
						    "totalSetorTarikDeposit" : $scope.item.totalSetorTarikDeposit,
						    "totalAdminSetorTarikDeposit" : 4500000,
						    "pegawaiTarikDeposit" : {"id" : $scope.item.namaLengkap.idpegawai},
						    "setoranTarikanDepositKe" : $scope.item.setorTarikDepositKe,
						    "isCostInOut": 1, //Data Peneriman
						    "nomorHistoriBefore" : "KK17070002",
						    "ruanganTerima" : {"id" : $scope.item.ruangans.id},
						    "ruangan" : {"id" : $scope.item.ruangans.id},
						    "kelompokTransaksi" : {"id" : 60} //id setoran kasir
						 }
					 // {
						// 		"nonHistori" : "KC17070001", //otomatis
						// 		"tglHistori" : $scope.item.tanggalhistory,
						// 		"tglSetorTarikDeposit" : $scope.item.tanggal,
						// 		"kdBankAccount" : {"id" :  $scope.item.banks.bankAccId},
						// 		"totalSetorTarikDeposit" : $scope.item.totalSetorTarikDeposit,
						// 		"totalAdminSetorTarikDeposit" : $scope.item.admin,
						// 		"kdPegawaiSetorTarikDeposit" : {"id" : $scope.item.namaLengkap.idpegawai},
						// 		"setorTarikDepositKe" : $scope.item.setorTarikDepositKe,
						// 		"noHistoriBefore" : "",
						// 		"kdRuangTerima" : $scope.item.ruangans.id,
						// 		"ruangan" : {"id" : $scope.item.ruangans.id},
						// 		"isCostInOut": 1,
						// 		//"kelompokTransaksi" : {"id" : $scope.item.kelompokTransaksi.id}//60
						// 		"kelompokTransaksi" : {"id" : 60}
						// 	 }

					ManageSdm.saveData(data,"terimakeluarkaskecil/save-terima-kas-kecil").then(function(e) {
					console.log(JSON.stringify(e.data));
					 $scope.loadGrid();
					
					});
					
					$scope.item.namaLengkap = "";
					$scope.item.ruangans = "";
					$scope.item.tanggal = "";
					$scope.item.setorTarikDepositKe = "";
					$scope.item.banks = "";
					$scope.item.setorTarikDepositKe ="";
					$scope.item.totalSetorTarikDeposit = "";
					var myWindow = $("#winPopUp");
			        myWindow.data("kendoWindow").close();
			        var myWindow = $("#winPopUp3");
                    myWindow.data("kendoWindow").close();
			       
				
				}
			}
		]);
});