
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HistoryPelayananCustomerCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper','InformasiKomunikasi','InformasiJenisRespon','InformasiRuangan','InformasiKelompokTransaksi','InformasiPegawaiTujuan','InformasiPegawaiPenerima','InformasiTest','$mdDialog', '$state',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,InformasiKomunikasi,InformasiJenisRespon,InformasiRuangan,InformasiKelompokTransaksi,InformasiPegawaiTujuan,InformasiPegawaiPenerima,InformasiTest,$mdDialog,$state) {
			$scope.item = {};
			$scope.now = new Date();
			 $scope.dataVOloaded = false;

			 
			 ManageSdm.getItem("historiPelayananCs/get-load-histori-pelayanan?ruanganId=1", true).then(function(dat){
				$scope.item.noHistori = dat.data.data.noHistori;
			
			});

			
			$scope.loadGrid = function () {
				debugger;
				ManageSdm.getItem("historiPelayananCs/get-list-histori-pelayanan?ruanganId=1", true).then(function(dat){
				$scope.dataMaster = dat.data.data.listData;
				$scope.dataSource = new kendo.data.DataSource({
				pageSize:50,
				data : $scope.dataMaster,
				$scrollable : true
				

					});
				});
			}

	


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

        InformasiPegawaiTujuan.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
         	$scope.ListDataPegawaiTujuan = dat.data.data.data;
         		debugger;
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
						debugger;
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
		           // debugger;
           	$scope.getDataNoCM = function () {
 
			}
            	$scope.item.noCm2;
			}
           
            
            $scope.$watch('item.desaKelurahan', function(e) {
                if (e === undefined) return;
                $scope.item.kodePos = e.kodePos;
                ModelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                    filter: {
                        field: "kdKecamatan",
                        operator: "equal",
                        value: e.kecamatan ? e.kecamatan.kdKecamatan : e.kecamatanId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kecamatan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            })

             $scope.$watch('item.kecamatan', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: "kdKotaKabupaten",
                        operator: "equal",
                        value: e.propinsi ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kotaKabupaten = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });

            $scope.$watch('item.kotaKabupaten', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                    filter: {
                        field: "kdPropinsi",
                        operator: "equal",
                        value: e.propinsi ? e.propinsi.kdPropinsi : e.propinsiId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.propinsi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });
              $scope.findKodePos = function() {
                $scope.isBusy = true;
                if ($scope.item.kodePos === '' || $scope.item.kodePos === undefined) return;
                ModelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
                    filter: {
                        field: "kodePos",
                        operator: "equal",
                        value: $scope.item.kodePos
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.desaKelurahan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
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
					
				});
       
			$scope.listDataJenisKelamin = [

             {
             "id":1, "jenisKelamin":"Laki-laki"
             },
             {
              "id":2, "jenisKelamin":"Perempuan"
             }

			 ]
			
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
						"field": "noHistori",
						"title": "No History"
					},
					{
						"field": "namaRuangan",
						"title": "Ruang Tujuan"
					},
					{
						"field": "namaPegawai",
						"title": "Pegawai Tujuan"
					},
					{
						"field": "kelompokProduk",
						"title": "Informasi"
					},
					{
						"field": "deskripsi",
						"title": "Deskripsi Detail Informasi"
					},
					{
						"field": "komunikasi",
						"title": "Komunikasi"
					},
					{
						"field": "kelompokTransaksi",
						"title": "Kelompok Transaksi"
					},
					{
						"field": "pegawaiTerima",
						"title": "Pegawai Penerima"
					},
					{
						"field": "namaCustomer",
						"title": "Nama Customer"
					},
					{
						"field": "jenisKelamin",
						"title": "Jenis Kelamin"
					},
					{
						"field": "noCm",
						"title": "NO RM"
					},
					{
						"field": "isPelayanan",
						"title": "Pelayanan In/Out",
						 "template": "<span class='style-right'>{{pelayanans('#: isPelayanan #')}}</span>"
					},
					{
						"field": "jenisRespon",
						"title": "Jenis Respon"
					},

					{
						"field": "detailRespon",
						"title": "Detail Respon Service"
					},


					// {
					// 	"field": "isCito",
					// 	"title": "CITO",
					// 	 "template": "<span class='style-right'>{{citoo('#: isCito #')}}</span>"
					// },

					{
						"field": "alamatCustomer",
						"title": "Alamat Customer"
					},
                     
     //                 {
					// 	"field": "kodePos",
					// 	"title": "Kode Pos"
					// },
					// {
					// 	"field": "kelurahaan",
					// 	"title": "Keluarahan"
					// },
					// {
					// 	"field": "propinsi",
					// 	"title": "Provinsi"
					// },
					// {
					// 	"field": "kabupaten",
					// 	"title": "Kabupaten"
					// },
					// {
					// 	"field": "kecamatan",
					// 	"title": "Kecamatan"
					// },

					{
						"field": "tglPelayananAwal",
						"title": "Tanggal Pelayanan",
						"template": "#= new moment(new Date(tglPelayananAwal)).format('DD-MM-YYYY') #"
					},

				    {
						"field": "tglPelayananAkhir",
						"title": "Tanggal Dilayani",
						"template": "#= new moment(new Date(tglPelayananAkhir)).format('DD-MM-YYYY') #"
					},

					{
						"field": "keterangan",
						"title": "Keterangan"
					},
					{

                       "field":"namaPasien",
                       "title":"Nama Pasien"

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
				debugger;	
				if (aktif)
					aktif = 0;

				else
					aktif = 1;		
			
			}

			$scope.klik = function(dataSelected){
				 debugger;

            	$scope.showEdit = true;
				$scope.dataSelected = dataSelected;
				$scope.item.noRec = dataSelected.noRec;
				$scope.item.noCm = dataSelected.noCm;
				$scope.item.alamat = dataSelected.alamatCustomer;
				$scope.item.deskripsi = dataSelected.deskripsi
								 
			
			};

			 $scope.rencana = function(dataSelected){
			 	debugger;
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


		$scope.Simpan = function () {
		debugger;
		var listRawRequired = [
          "item.noHistori|ng-model|No History",
          "item.ruangantujuan|k-ng-model|Ruangan",
          "item.namaLengkap|k-ng-model|Pegawai",
          "item.informasi|k-ng-model|Informasi",
           "item.detaildeskripsi|ng-model|Detail Deskripsi",
          "item.komunikasi|k-ng-model|Komunikasi",
          "item.kelompokTransaksi|k-ng-model|Kelompok Transaksi",
          "item.namaLengkap2|k-ng-model|Pegawai Penerima",
           "item.noCm|k-ng-model|No Cm",
          "item.namaPasien|ng-model|Nama Pasien",
          "item.NamaKelamin|k-ng-model|Jenis Kelamin",
          "item.pelayanan|k-ng-model|Pelayanan Is In Out",
           "item.jeniRespon|k-ng-model|Jenis Respon",
          "item.detailRespon|ng-model|Detail Respon",
          "item.alamats|ng-model|Alamat Customer",
           "item.kodePos|ng-model|Kode Pos",
           "item.desaKelurahan|k-ng-model|Desa Keluarahan",
          "item.kecamatan|ng-model|Kecamatan",
          "item.kotaKabupaten|k-ng-model|Kota Kabupaten",
          "item.propinsi|k-ng-model|Provinsi",
          "item.tglpelayanan|k-ng-model|Tanggal Pelayanan",
          "item.tgldilayani|k-ng-model|Tanggal diLayani",
          "item.keterangan|ng-model|Keterangan"
         
         
        ];
        var isValid = ModelItem.setValidation($scope, listRawRequired);
		    if($scope.item.noCm != null || $scope.item.noCm != 0){
				var data = {

					    "noHistori": $scope.item.noHistori,
					    "ruanganTujuan": {"id":$scope.item.ruangantujuan.id,},
					    "pegawaiTujuan": {"id":$scope.item.namaLengkap.idpegawai},
					    "pegawaiTerima": {"id":$scope.item.namaLengkap2.idpegawai,},
					    "kdProduk": $scope.item.informasi.idProduk,
					    "deskripsi":  $scope.item.detaildeskripsi,
					    "namaCustomer": $scope.item.namaPasien,
					    "kelamin": {"id":$scope.item.JenisKelamin,},
					    "noCM": {"id" : $scope.item.noCm2,},
					    "isPelayanan": $scope.item.pelayanan.id,
					    "jenisRespon": {"id":$scope.item.jeniRespon.id,},
					    "detailRespon": $scope.item.detailRespon,
					    "isCito": aktif,
					    "statusEnabled" : aktif,
					    "alamat":$scope.item.alamats,
					    "alamatCustomer": {"id":$scope.item.alamatsId,},
					    "tglPelayananAwal":DateHelper.getPeriodeFormatted($scope.item.tglpelayanan),
					    "tglPelayananAkhir":  DateHelper.getPeriodeFormatted($scope.item.tgldilayani),
					    "tglLahir": DateHelper.getPeriodeFormatted($scope.item.tgldilayani),
					    "kelompokProduk" : {"id" : $scope.item.informasi.idProduk},
					    "kelompokTransaksi" : {"id" : $scope.item.kelompokTransaksi.id},
					    "komunikasi":  {"id":$scope.item.komunikasi.id,},
					    "keterangan": $scope.item.keterangan,
					}
				
	 		}else{

				 var data = {
		    	
					}

					} 

					ManageSdm.saveData(data,"historiPelayananCs/save-histori-pelayanancs").then(function(e) {
					console.log(JSON.stringify(e.data));
					$scope.loadGrid();
				    ManageSdm.getItem("historiPelayananCs/get-load-histori-pelayanan?ruanganId=1", true).then(function(dat){
				   $scope.item.noHistori = dat.data.data.noHistori;
			
			        });
					
					$scope.item.ruangantujuan="";
					$scope.item.namaLengkap="";
					$scope.item.informasi="";
					$scope.item.detaildeskripsi="";
					$scope.item.komunikasi="";
					$scope.item.kelompokTransaksi="";
					$scope.item.namaLengkap2="";
					$scope.item.namaPasien="";
					$scope.item.noCm2 ="";
					$scope.item.pelayanan.Id="";
					$scope.item.jeniRespon="";
					$scope.item.detailRespon="";
					aktif="";
					$scope.item.alamats="";
					$scope.item.kodePos="";
					$scope.item.desaKelurahan="";
					$scope.item.kecamatan="";
					$scope.item.kotaKabupaten="";
					$scope.item.propinsi="";
					$scope.item.tglpelayanan="";
					$scope.item.tgldilayani="";
					$scope.item.keterangan="";
					$scope.item.NamaKelamin="";
					
					
					});
				
				}
			}
		]);
});