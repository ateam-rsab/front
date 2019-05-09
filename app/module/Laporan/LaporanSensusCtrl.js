define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanSensusCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm, manageTataRekening) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        
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
        manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
            $scope.listDepartemen = data.data.departemen;
            $scope.listKelompokPasien = data.data.kelompokpasien;
        })

        $scope.getIsiComboRuangan = function(){
            $scope.listRuangan = $scope.item.departement.ruangan
        }
        ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
        $scope.listPegawai = dat.data;
        });
	    ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
	    $scope.listPasien = dat.data;
	    });


        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;

        $scope.listDataFormat = [

             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }

			 ]
        
        debugger;
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 12:59";
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.Cetak = function() {
        // if($scope.item.format == undefined){
        // 	alert('format file harus dipilih terlebih dahulu !!!')
        // }
            debugger;
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
            if($scope.item.departement == undefined)
                var departement = "";
            else
                var departement = $scope.item.departement.id;
            var stt = 'false'
            if (confirm('View Laporan Sensus? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sensus=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+$scope.pegawai.id+'&view='+ stt, function(response) {
                // do something with response
            });
            // if(client.status==0){
            //     if($scope.item.format == undefined){
            //         alert('format file harus dipilih terlebih dahulu !!!');
            //     }else{
            //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //         window.open(urlLaporan, '_blank');
            //     }
            // }   
	    };

       
        }
        ]);
});