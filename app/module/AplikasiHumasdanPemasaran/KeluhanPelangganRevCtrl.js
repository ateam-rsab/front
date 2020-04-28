
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeluhanPelangganRevCtrl', ['$rootScope', '$scope', 'ModelItem','IPSRSService','ManageSarpras','$mdDialog', '$state','ModelItemAkuntansi','ManageServicePhp','ManageLogistikPhp','DateHelper', 'CacheHelper',
		function($rootScope,$scope,ModelItem,IPSRSService,ManageSarpras,$mdDialog,$state,modelItemAkuntansi,manageServicePhp,manageLogistikPhp,dateHelper,cacheHelper) {
			$scope.item = {};
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			$scope.item.tglorder = new moment($scope.now).format('YYYY-MM-DD HH:mm');
			$scope.item.tglkeluhan = new moment($scope.now).format('YYYY-MM-DD HH:mm');
			$scope.pegawai = ModelItem.getPegawai();
			var idKeluhan = '';
			var kpid = '';
			var noOrder = '';
			$scope.dataVOloaded = true;
			LoadCombo()
			LoadCache()
				       
	        function LoadCache(){
               var chacePeriode = cacheHelper.get('KeluhanPelangganRevCtrl');
                if(chacePeriode != undefined){
                   kpid = chacePeriode[0]
                   noOrder = chacePeriode[1]

                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('KeluhanPelangganRevCtrl', chacePeriode);
               }else{
                    init()
               }
            }            

            function init(){
		   		;
			   	if (noOrder != '') {
			   		if (noOrder == 'EditKeluhan') {
			   				$scope.isRouteLoading=true;
					   		manageLogistikPhp.getDataTableTransaksi("humas/get-keluhan-pelanggan?"
		                    +"IdKeluhan="+kpid, true).then(function(dat){
		                    $scope.isRouteLoading=false;
		                    var datas = dat.data.datas[0];
	                        idKeluhan = kpid
		                    $scope.item.Pegawai = {id:datas.pegawaiid,namalengkap:datas.namalengkap}
	                        $scope.item.noRm = datas.nocm
	                        $scope.item.namaPasien = datas.namapasien
	                        $scope.item.jenisKelamin = {id:datas.jkid,jeniskelamin:datas.jeniskelamin}
	                        $scope.item.umur = datas.umur
	                        $scope.item.noTlp = datas.notlp
	                        $scope.item.email = datas.email
	                        $scope.item.pekerjaan = {id:datas.pekerjaanid,pekerjaan:datas.pekerjaan}
	                        $scope.item.noTlpKtr = datas.notlpkntr
	                        $scope.item.ruangan = {id:datas.ruid,namaRuangan:datas.namaruangan}
	                        $scope.item.Saran=datas.saran
	                        $scope.item.Keluhan=datas.keluhan
		                    $scope.item.tglorder=datas.tglkeluhan
		                    $scope.item.tglkeluhan=datas.tglorder
		                    $scope.item.alamatLengkap = datas.alamat
		                });
			   		}
				}        
			}


            function LoadCombo(){
            	var nomor = 1; 
			  	IPSRSService.getItem("pekerjaan/get-pekerjaan", true).then(function(dat){
					$scope.listDataPekerjaan = dat.data.data;				
			    });

            	IPSRSService.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
				   $scope.ruanganId = dat.data.data.idRuangan;
				});

		        IPSRSService.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
		            $scope.ListDataKomunikasi = dat;
				});

				IPSRSService.getItem("service/list-generic/?view=JenisRespon&select=*", true).then(function(dat){
		            $scope.ListDataJenisRespon = dat;
				});
			          
			    IPSRSService.getItem("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
		            $scope.ListDataRuangan = dat;
				});

				IPSRSService.getItem("service/list-generic/?view=KelompokTransaksi&select=*", true).then(function(dat){
		            $scope.ListDataTransaksi = dat;
				});		   

				IPSRSService.getItem("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
		            $scope.ListDataPegawaiTujuan = dat.data.data.data;
				});


				IPSRSService.getItem("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
		            $scope.ListDataPegawaiPenerima = dat.data.data.data;
				});

				IPSRSService.getItem("historiPelayananCs/get-load-produk-informasi", true).then(function(dat){
		            $scope.ListDataInformasi = dat.data.data.listproduk;
				});

				IPSRSService.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
						$scope.listKomunikasi = dat.komunikasi;
				});
	       
				$scope.listDataJenisKelamin = [{"id":1, "jenisKelamin":"Laki-laki"},{"id":2, "jenisKelamin":"Perempuan"}]
            }

			$scope.getDataPegawai = function () {
				$scope.pegawaiId = $scope.item.namaPegawai.id;
				IPSRSService.getItem("sdm/get-data-pegawai?pegawaiId="+$scope.pegawaiId, true).then(function(dat){
            		$scope.item.jabatan = dat.data.data.jabatan;
					$scope.item.nip = dat.data.data.nip;
					$scope.item.ruangan = dat.data.data.namaRuangan;
					$scope.item.ruanganId = dat.data.data.ruanganId
		   		});
			}			

			$scope.CariPasien = function(){
				$scope.isRouteLoading=true;
                manageLogistikPhp.getDataTableTransaksi("farmasi/get-detail-pasien?nocm="+$scope.item.noRm, true).then(function(data_ih){
                	$scope.isRouteLoading=false;
                	var datas = data_ih.data;
                    var tanggal = $scope.now;
                    var tanggalLahir = new Date(datas.tgllahir);
                    var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
                    var usia = umurzz.year
                    $scope.item.noRm = datas.nocm
                    $scope.item.namaPasien = datas.namapasien
                    $scope.item.jenisKelamin = {id:datas.jkid,jenisKelamin:datas.jeniskelamin}
                    // $scope.item.tglLahir = new Date(data_ih.data.tgllahir);
                    $scope.item.umur = usia
                    $scope.item.noTlp = datas.notelepon
                    $scope.item.alamatLengkap = datas.alamatlengkap
                    $scope.item.email = datas.alamatemail
                    $scope.item.pekerjaan = {id:datas.pekerjaanid,pekerjaan:datas.pekerjaan}
                })
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
                 sortable: true,
                scrollable: true,
                height: 300,
                selectable: "row",
                columns: $scope.columnPermohonanPerubahanStatus,	                	            
            };

		
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

		   $scope.keluhan = function(){		   	
		   	   $state.go('DaftarKeluhanPelangganRev');
		   }


			$scope.klik = function(dataSelected){
            	$scope.showEdit = true;
				$scope.dataSelected = dataSelected;
				$scope.item.noRec = dataSelected.noRec;
				$scope.item.noCm = dataSelected.noCm;
				$scope.item.alamat = dataSelected.alamatCustomer;
				$scope.item.deskripsi = dataSelected.deskripsi									 				
			};


	        $scope.Save=function(){
	        	if ($scope.item.namaPasien == undefined) {
					alert("Nama tidak boleh kosong!!!")
                    return;
				}

				if ($scope.item.alamatLengkap == undefined) {
					alert("Alamat tidak boleh kosong!!!")
                    return;
				}

				if ($scope.item.noTlp == undefined) {
					alert("No.Telepon/HP tidak boleh kosong!!!")
                    return;
				}

				if ($scope.item.Keluhan == undefined) {
					alert("Keluhan tidak boleh kosong!!!")
                    return;
				}

				if ($scope.item.Saran == undefined) {
					alert("Saran tidak boleh kosong!!!")
                    return;
				}

				if ($scope.item.ruangan == undefined) {
					alert("Lokasi Keluhan tidak boleh kosong!!!")
                    return;
				}		

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


	        $scope.reset = function(){
	           kosong();
			}

			 function Kosong() {
			 	$scope.item.namaPasien  = "";
				$scope.item.noRm = "";
				$scope.item.ruangan = "";
				$scope.item.alamatLengkap = "";
				$scope.item.email = "";
				$scope.item.noTlp = "";
				$scope.item.noTlpKtr = "";
				$scope.item.pekerjaan = undefined;
				$scope.item.jenisKelamin = undefined;
				$scope.item.ruangan = undefined;
				$scope.item.Keluhan = "";
				$scope.item.Saran = "";
				$scope.item.umur = "";
				$scope.item.tglkeluhan = new moment($scope.now).format('YYYY-MM-DD HH:mm');
				$scope.item.tglorder = new moment($scope.now).format('YYYY-MM-DD HH:mm');
			 }

			$scope.Simpan = function () {
				
				var norm = "-"
				if ($scope.item.noRm != undefined) {
					norm = $scope.item.noRm;
				}

				var email ="-"
				if ($scope.item.email != undefined) {
					email = $scope.item.email;
				}

				var pekerjaan = null
				if ($scope.item.pekerjaan != undefined) {
					pekerjaan = $scope.item.pekerjaan.id;
				}

				var ruangan = null
				if ($scope.item.ruangan != undefined) {
					ruangan = $scope.item.ruangan.id;
				}

				var jeniskelamin = null
				if ($scope.item.jenisKelamin != undefined) {
					jeniskelamin = $scope.item.jenisKelamin.id;
				}

				var kantor = "-"
				if ($scope.item.noTlpKtr != undefined) {
					kantor = $scope.item.noTlpKtr ;
				}

				var data = 
				{
					"id" : idKeluhan,
					"alamat" : $scope.item.alamatLengkap,
					"email" : email,
					"keluhan" : $scope.item.Keluhan,
					"namapasien" : $scope.item.namaPasien,
					"norm" : norm,
					"notlp" : $scope.item.noTlp,
					"objectruanganfk" : ruangan,
					"saran" : $scope.item.Saran,
					"objectpekerjaanfk" : pekerjaan,
					"umur" : $scope.item.umur,
					"tglkeluhan" : $scope.item.tglkeluhan,
					"tglorder" : $scope.item.tglorder,
					"notlpkntr" : kantor,
					"objectjeniskelaminfk" : jeniskelamin
				}
				var objSave = {

			           data:data,

			    }
				manageServicePhp.saveKeluhanPelanggan(objSave).then(function(e) {
					Kosong();
				});
			}

			}
		]);
});