define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanApotekCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageTataRekening) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.nonbpjs={id:153,kelompokpasien:"Non BPJS"};
        FormLoad();
        
        var HttpClient = function() {
            this.get = function(aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function() { 
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                }

                anHttpRequest.open( "GET", aUrl, true );            
                anHttpRequest.send( null );
            }
        }


        function FormLoad(){
            
            manageTataRekening.getDataTableTransaksi("laporan/get-data-combo-laporan", false).then(function(dat) {
                // $scope.listRuangan = dat.data.ruangan;
                $scope.listDepartemen = dat.data.departemen;
                $scope.listPasien = dat.data.kelompokpasien;
                $scope.listPegawai = dat.data.dokter;
                if($scope.listPasien != undefined){
                  $scope.listPasien.push($scope.nonbpjs)
                }
            });
            
            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
            
            //Tanggal Default
            $scope.item.tglawal = tanggals+" 00:00";
            $scope.item.tglakhir= tanggals+" 23:59";

            if(($scope.item.tglawal = tanggals+" 00:00")&&($scope.item.tglakhir= tanggals+" 23:59")){
                $scope.item.setSehari = "sehari"; 
            }
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;

            $scope.tglPelayanan = $scope.item.pelayanan;
            $scope.dokter = $scope.item.namaPegawai;
        }
        

        $scope.getIsiComboRuangan = function () {
            $scope.listRuangan = $scope.item.departement.ruangan
        }
        
        $scope.listDataFormat = [
             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }
		]
        		
        $scope.Cetak = function() {        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.departement == undefined)
                var departemen = "";
            else
                var departemen = $scope.item.departement.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapPenjualanHarian='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdDepartemen='+departemen+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&view='+ stt, function(response) {
                // do something with response
            });

	    };

        $scope.CetakPenjualan = function() {
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.departement == undefined)
                var departemen = "";
            else
                var departemen = $scope.item.departement.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else             
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-PenjualanObatPerDokter='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdDepartemen='+departemen+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };
        $scope.CetakPenjualanBebas = function() {      
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapPenjualanHarianBebas='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };

        $scope.LaporanPenjualan = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapPenjualanFarmasi='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };

        $scope.CetakDetailPengeluaran = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-DetailPengeluaranObat='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };

        $scope.CetakDetailPengeluaranBebas = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var karyawan = "";
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-DetailPengeluaranObatBebas='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&strKaryawan='+karyawan+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };

        $scope.CetakPenjualanKaryawan = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var karyawan = "Karyawan";
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-DetailPengeluaranObatBebas='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&strKaryawan='+karyawan+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };

        $scope.CetakRekapPenjualanKaryawan = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var karyawan = "Karyawan";
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapPenjualanKaryawan='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&strKaryawan='+karyawan+'&view='+ stt, function(response) {
                // do something with response
            });
            
        };
	    $scope.CetakPenjualanPoliKaryawan = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var karyawan = "Poli Karyawan";
            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-DetailPengeluaranObatBebas='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&strKaryawan='+karyawan+'&view='+ stt, function(response) {
                // do something with response
            });
        };
        $scope.CetakRekapPenjualanPoliKaryawan = function() {
        
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            if($scope.item.KelompokPasien == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.KelompokPasien.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.namaPegawai == undefined)
                var dokter = "";
            else
                var dokter = $scope.item.namaPegawai.id;
            var karyawan = "Poli Karyawan";
            var stt = 'false'
            if (confirm('View Laporan Rekap Penjualan Poli Karyawan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapPenjualanKaryawan='+ $scope.pegawai.namaLengkap+ '&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+dokter+'&strKaryawan='+karyawan+'&view='+ stt, function(response) {
                // do something with response
            });
        };

        $scope.cetakdetailvaksin = function() {
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-detailPemakaianVaksin=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&printed='+ $scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });            
        };

        $scope.cetakrekapvaksin = function() {
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            var stt = 'false'
            if (confirm('View Laporan Penjualan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapPemakaianVaksin=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&printed='+ $scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });
        };
       
        }
    ]);
});