define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanPersediaanCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm, manageTataRekening) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
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
           $scope.listRuangan = data.data.ruanganall;
            // $scope.listDepartemen = data.data.departemen;
            // $scope.listKelompokPasien = data.data.kelompokpasien;
        })

     //    $scope.getIsiComboRuangan = function(){
     //        $scope.listRuangan = $scope.item.departement.ruangan
     //    }
     //    ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
     //    $scope.listPegawai = dat.data;
     //    });
	    // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
	    // $scope.listPasien = dat.data;
	    // });


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
        
        //debugger;
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 23:59";
       
        // Tanggal Inputan
        // $scope.tglawal = $scope.item.tglawal;
        // $scope.tglakhir = $scope.item.tglakhir;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.Cetak = function() {
            var tglawal = moment($scope.item.tglawal).format('YYYY-MM-DD');
            var tglakhir = moment($scope.item.tglakhir).format('YYYY-MM-DD');
            var stt = 'false'
            if (confirm('View txt Persediaan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/simakbmn?cetak-simak-txt=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&view='+ stt, function(response) {               
            });
	    };

        $scope.CetakRiwayatPersediaan = function() {
            var tglawal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00');
            var tglakhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59');
            var ruangan ="";
            if($scope.item.ruangan != undefined){
                ruangan = $scope.item.ruangan.id;
            }
            var stt = 'false'
            if (confirm('View Laporan Persediaan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rekappersediaan=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&view='+ stt+'&user='+ $scope.dataLogin.namaLengkap, function(response) {               
            });
        };


       
        }
        ]);
});