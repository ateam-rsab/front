
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PajakPPH21Ctrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper', '$state','InformasiPegawaiPenerima',
		function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,$state, InformasiPegawaiPenerima) {
			$scope.item = {};
			$scope.now = new Date();
  		$scope.dataVOloaded = true;
      $scope.monthSelectorOptions = {
        start: "year",
        depth: "year"
      };

      InformasiPegawaiPenerima.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
      $scope.ListDataPegawaiPenerima = dat.data.data.data;
      });
      $scope.init = function(){
       if($scope.item.namaLengkap != undefined && $scope.item.periode != undefined){ 
        var periode = DateHelper.getPeriodFormat($scope.item.periode);
         console.log(periode)
          ManageSdm.getItem("perhitungan-pph/get-komponen-gaji?idpegawai="+$scope.item.namaLengkap.idpegawai+"&periode="+periode,true).then(function(dat){
            var listx = dat.data.data.listData;
              if(listx != undefined){
               $scope.item.npwp = dat.data.data.listData[0].npwp;
                }else{
                  $scope.item.npwp = "";
                   if($scope.item.npwp == ""){
                     alert('Pegawai Belum Memiliki NPWP');
                   }
                  }
                   var DataUduls = dat.data.data.listData;
                 if(DataUduls == undefined){
                  alert('Pegawai Belum Memiliki gaji pada periode :'+periode+'');
                   }
                $scope.dataUser = new kendo.data.DataSource({
              data : DataUduls
             });
         // $scope.getdata();
         });}
        }
      $scope.$watchGroup(['item.namaLengkap', 'item.periode'], function(newValued, OldValue){
        debugger;
      if($scope.item.namaLengkap != undefined && $scope.item.periode != undefined){ 
        ManageSdm.getItem("perhitungan-pph/get-hitung-pph?idpegawai="+$scope.item.namaLengkap.idpegawai+"&periode="+DateHelper.getPeriodFormat($scope.item.periode),true).then(function(x){
         // if($scope.item.npwp != ""){      
              $scope.getPPH21 = x.data.data.listData;
                    if($scope.getPPH21 != undefined){
                      $scope.PenghasilanKenaPajakBulan = x.data.data.listData[0].penghasilanKenaPajakBln;
                        $scope.TtlHargaPtkp = x.data.data.listData[0].ttlHargaPtkp;
                         $scope.penghasilankp = x.data.data.listData[0].penghasilankp;
                          $scope.persentasepajak =x.data.data.listData[0].persentasepajak;
                           $scope.PtkpID = x.data.data.listData[0].ptkpId;
                           $scope.PenghasilanKenaPajakTahun = x.data.data.listData[0].penghasilanKenaPajakThn;
                            $scope.ttlpenghasilanthn = x.data.data.listData[0].ttlpenghasilanthn;
                             $scope.item.keterangan = x.data.data.listData[0].ketPtkp;
                              }else{
                              $scope.PenghasilanKenaPajakBulan = "";
                             $scope.TtlHargaPtkp = "";
                           $scope.penghasilankp = "";
                          $scope.persentasepajak = "";
                          $scope.PtkpID = "";
                        $scope.PenghasilanKenaPajakTahun = "";
                       $scope.ttlpenghasilanthn = "";
                      $scope.item.keterangan = "";
                      $scope.getTotalKomponen() == "";
                      }
          // }else{
            ManageSdm.getItem("perhitungan-pph/get-hitung-pph-non-npwp?idpegawai=469&periode="+DateHelper.getPeriodFormat($scope.item.periode),true).then(function(y){
            debugger;
            $scope.getpph = y.data.data.listData;
              if($scope.getpph != undefined && $scope.item.npwp == ""){
                $scope.PenghasilanKenaPajakBulan = y.data.data.listData[0].penghasilanKenaPajakBln;
                  $scope.TtlHargaPtkp = y.data.data.listData[0].ttlHargaPtkp;
                    $scope.penghasilankp = y.data.data.listData[0].penghasilankp;
                      $scope.persentasepajak =y.data.data.listData[0].persentasepajak;
                        $scope.PtkpID = y.data.data.listData[0].ptkpId;
                          $scope.PenghasilanKenaPajakTahun = y.data.data.listData[0].penghasilanKenaPajakThn;
                           $scope.ttlpenghasilanthn = y.data.data.listData[0].ttlpenghasilanthn;
                            $scope.item.keterangan = y.data.data.listData[0].ketPtkp;
                      }
            // else{
            //               $scope.PenghasilanKenaPajakBulan = "";
            //             $scope.TtlHargaPtkp = "";
            //           $scope.penghasilankp = "";
            //           $scope.persentasepajak = "";
            //         $scope.PtkpID = "";
            //       $scope.PenghasilanKenaPajakTahun = "";
            //      $scope.ttlpenghasilanthn = "";
            //     $scope.item.keterangan = "";
            //   $scope.getTotalKomponen() == "";
            // }
          })
         // }
       })  
       }
      })

      $scope.columnparent = [
      {
         "field": "komponenHarga",
         "title": "Komponen Penghasilan", width:"50px"
      },
      {
        "field": "hargaSatuan",
        "title": "Harga Satuan", width:"50px"
      }
      ];

  
    $scope.$watch('item.npwp', function(newValued, OldValue){
    if($scope.item.npwp != (undefined)){
    $scope.item.counter = "120%" //Jika Status Pegawai Yang Memiliki NPWP
    }else{
    $scope.item.counter = "Pegawai Tidak Memiliki NPWP"
    }  
    })
   
     $scope.getTotalKomponen = function(){
      if($scope.item.namaLengkap != undefined && $scope.item.periode != undefined &&
       $scope.dataUser != undefined){
          $scope.dataUser2 = $scope.dataUser.options.data;
           var hargaSatuan = 0;
           if($scope.dataUser2 != undefined){
            for (var i =0;  i< $scope.dataUser2.length; i++) {
               var subtotal = $scope.dataUser2[i].hargaSatuan;
                hargaSatuan += ($scope.dataUser2[i].hargaSatuan * 1);
                }
               return hargaSatuan;
             }
       }
     }

      $scope.getdata = function(){
       ManageSdm.getItem("perhitungan-pph/get-ptkp-by-pegawai?idpegawai="+$scope.item.namaLengkap.idpegawai,true).then(function(dat){
        if(dat.data.data !=undefined ){
         var datax = dat.data.data.listData[0].hargaPtkp;
          if(datax != undefined){
           $scope.item.getPTKP2 = datax;
            }else{$scope.item.getPTKP2 ="";
          }
         }
       })
      }

     $scope.JmlPenghasilanNettoSetahun = function(){
     var jml_2 = $scope.getTotalKomponen() * 12;  
     return jml_2;
     }

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
				
				}
			}
		]);
});