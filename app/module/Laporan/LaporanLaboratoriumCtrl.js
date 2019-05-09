define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanLaboratoriumCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        $scope.nonbpjs={id:153,kelompokpasien:"Non BPJS"};
        
        manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
            $scope.item.departemen = dat.data.departemen[4].departemen;
            $scope.listRuangan = dat.data.departemen[4].ruangan
            $scope.listKelompok = dat.data.kelompokpasien
            if($scope.listKelompok != undefined){
              $scope.listKelompok.push($scope.nonbpjs)
            }
        });
        manageLogistikPhp.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", true).then(function (dat) {
            //debugger;
            $scope.listdepartemen2 = dat.data.deptrirj;
        });
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
        //debugger;
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 12:59";
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
		
        $scope.Cetak = function() {
            //debugger;
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
            if ($scope.item.ruangan != undefined) {
                var ruanganId = $scope.item.ruangan.id
            }else{
                var ruanganId = ''
            }
            if ($scope.item.departemen2 != undefined) {
                var departemenId = $scope.item.departemen2.id
            }else{
                var departemenId = ''
            }
            if ($scope.item.kelompokPasien != undefined) {
                var kelompokPasienId = $scope.item.kelompokPasien.id
            }else{
                var kelompokPasienId = ''
            }
            var stt = 'false'
            if (confirm('View Laporan Harian Laboratorium? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-rekapLaboratorium=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&departemenId='+departemenId+'&ruanganId='+ruanganId+'&idKelompok='+kelompokPasienId+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });  
	    }
       
        }
    ]);
});