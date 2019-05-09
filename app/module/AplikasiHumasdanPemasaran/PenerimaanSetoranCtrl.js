
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenerimaanSetoranCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper','InformasiRuangan','InformasiKelompokTransaksi','InformasiPegawaiTujuan','InformasiPegawaiPenerima','$mdDialog', '$state',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,InformasiRuangan,InformasiKelompokTransaksi,InformasiPegawaiTujuan,InformasiPegawaiPenerima,$mdDialog,$state) {
			$scope.item = {};
			$scope.now = new Date();
			 $scope.dataVOloaded = false;

             debugger;
            $scope.item.bank = $state.params.bank;

            $scope.item.total = parseInt($state.params.dotal);
            $scope.item.tanggal = $state.params.Tanggal;


            	 ManageSdm.getItem("terimakeluarkaskecil/get-bank-acc", true).then(function(dat){
				 $scope.ListDataBank = dat.data.data.data;
			
			});

             $scope.getpembayaran=function(){
             var pegawai = $scope.item.namaLengkap.idpegawai
			 ManageSdm.getItem(" terimakeluarkaskecil/get-pembayaranke-by-pegawai?id="+pegawai, true).then(function(dat){
			 	 debugger;
				 $scope.item.Pembayaran = dat.data.data.data.countdata;
				 $scope.item.pegawairiw = $scope.item.namaLengkap.namaLengkap;
			
			});
			 }

             $scope.refreshgrid =function(){
			 ManageSdm.getItem("terimakeluarkaskecil/get-terima-kas-kecil", true).then(function(dat){
				$scope.dataMaster = dat.data.data.data;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster,
				$scrollable : true
					});
				});
			 }

			  ManageSdm.getItem("terimakeluarkaskecil/get-histori-transaksi-by-pegawai?id=1286", true).then(function(dat){
				debugger;
				$scope.dataMaster2 = dat.data.data.data;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster2,
				$scrollable : true
					});
				});
             
             $scope.Deposite = function(){
             	debugger
             $state.go("Deposite",
					{
						
					})
             }
              $scope.PengeluaranSetoran = function(){
             	debugger
             $state.go("PengeluaranSetoran",
					{
						
					})
             }
            
               $scope.batal = function(){
             	debugger
             $state.go("DaftarPenerimaanSetoran",
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

			$scope.klik = function(dataSelected){
		
            	$scope.showEdit = true;
				$scope.dataSelected = dataSelected;
				$scope.item.noRec = dataSelected.noRec;
				$scope.item.noCm = dataSelected.noCm;
				$scope.item.alamat = dataSelected.alamatCustomer;
				$scope.item.deskripsi = dataSelected.deskripsi
								 
			
			};


			$scope.reset = function(){

	         $scope.item.namaLengkap = "";
	         $scope.item.ruangan = "";
	         $scope.item.kelompokTransaksi = "";
			 $scope.item.Pembayaran= "";
			 $scope.item.tanggal= "";
			 $scope.item.total= "";
			 $scope.item.bank= "";

				}




			$scope.listLabelDokter = [
                {"id": 1}
            ];
			$scope.disDokter = true;
			$scope.diswow = false;
           

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
								"nonHistori" : "KC17070001", //otomatis
								"tglHistori" : $scope.item.tanggal,
								"tglSetorTarikDeposit" : $scope.item.tanggal,
								"kdBankAccount" : {"id" :  $scope.item.bank.bankAccId},
								"totalSetorTarikDeposit" : $scope.item.total,
								"totalAdminSetorTarikDeposit" : $scope.item.admin,
								"kdPegawaiSetorTarikDeposit" : {"id" : $scope.item.namaLengkap.idpegawai},
								"setorTarikDepositKe" : $scope.item.Pembayaran,
								"noHistoriBefore" : "",
								"kdRuangTerima" : $scope.item.ruangan.id,
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