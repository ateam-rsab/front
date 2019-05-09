define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanAkuntansiCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ManageSdm','ManageLogistikPhp','ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ManageSdm,manageLogistikPhp,manageTataRekening) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
			$scope.item.tglawal =  new Date();
			$scope.item.tglakhir = new Date();
        
      manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
          $scope.listDepartemen = data.data.departemen;
          $scope.listKelompokPasien = data.data.kelompokpasien;
      })

      $scope.getIsiComboRuangan = function(){
          $scope.listRuangan = $scope.item.departement.ruangan
      }

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
     $scope.CetakJurnal = function(){
        var dokter = ''
        if ($scope.item.namaPegawai != undefined) {
            dokter = $scope.item.namaPegawai.id
        }
        var departement=''
        if ($scope.item.departement != undefined) {
            departement=$scope.item.departement.id
        }
        var ruanganId=''
        if ($scope.item.ruangan != undefined) {
            ruanganId=$scope.item.ruangan.id
        }
        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
        var tglAkhir = moment($scope.item.tglawal).format('YYYY-MM-DD 23:59:59');;
        var client = new HttpClient();
        client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal=1'+//$scope.item.namaKasir.id+
            '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+departement+'&idRuangan='+ruanganId+'&namaKasir='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {

        });
      }
      $scope.CetakRincianJurnal = function(){
        var dokter = ''
        if ($scope.item.namaPegawai != undefined) {
            dokter = $scope.item.namaPegawai.id
        }
        var departement=''
        if ($scope.item.departement != undefined) {
            departement=$scope.item.departement.id
        }
        var ruanganId=''
        if ($scope.item.ruangan != undefined) {
            ruanganId=$scope.item.ruangan.id
        }
        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
        var tglAkhir = moment($scope.item.tglawal).format('YYYY-MM-DD 23:59:59');;
        var client = new HttpClient();
        client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-detail=1'+//$scope.item.namaKasir.id+
            '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+departement+'&idRuangan='+ruanganId+'&namaKasir='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {

        });
      }
      $scope.CetakJurnalNonTunai = function(){
        var dokter = ''
        if ($scope.item.namaPegawai != undefined) {
            dokter = $scope.item.namaPegawai.id
        }
        var departement=''
        if ($scope.item.departement != undefined) {
            departement=$scope.item.departement.id
        }
        var ruanganId=''
        if ($scope.item.ruangan != undefined) {
            ruanganId=$scope.item.ruangan.id
        }
        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
        var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');;
        var client = new HttpClient();
        client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-balik=1'+//$scope.item.namaKasir.id+
            '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+departement+'&idRuangan='+ruanganId+'&namaKasir='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {

        });
      }
      $scope.CetakJurnalNonTunaiDetail = function(){
        var dokter = ''
        if ($scope.item.namaPegawai != undefined) {
            dokter = $scope.item.namaPegawai.id
        }
        var departement=''
        if ($scope.item.departement != undefined) {
            departement=$scope.item.departement.id
        }
        var ruanganId=''
        if ($scope.item.ruangan != undefined) {
            ruanganId=$scope.item.ruangan.id
        }
        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
        var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');;
        var client = new HttpClient();
        client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-balik-detail=1'+//$scope.item.namaKasir.id+
            '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+departement+'&idRuangan='+ruanganId+'&namaKasir='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {

        });
      }
      $scope.CetakJurnalAdministrasi = function(){
        var dokter = ''
        if ($scope.item.namaPegawai != undefined) {
            dokter = $scope.item.namaPegawai.id
        }
        var departement=''
        if ($scope.item.departement != undefined) {
            departement=$scope.item.departement.id
        }
        var ruanganId=''
        if ($scope.item.ruangan != undefined) {
            ruanganId=$scope.item.ruangan.id
        }
        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
        var tglAkhir = moment($scope.item.tglawal).format('YYYY-MM-DD 23:59:59');;
        var client = new HttpClient();
        client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-administrasi=1'+//$scope.item.namaKasir.id+
            '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+departement+'&idRuangan='+ruanganId+'&namaKasir='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {

        });
      }
      $scope.CetakJurnalAdminDetail = function(){
        var dokter = ''
        if ($scope.item.namaPegawai != undefined) {
            dokter = $scope.item.namaPegawai.id
        }
        var departement=''
        if ($scope.item.departement != undefined) {
            departement=$scope.item.departement.id
        }
        var ruanganId=''
        if ($scope.item.ruangan != undefined) {
            ruanganId=$scope.item.ruangan.id
        }
        var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
        var tglAkhir = moment($scope.item.tglawal).format('YYYY-MM-DD 23:59:59');;
        var client = new HttpClient();
        client.get('http://127.0.0.1:1237/printvb/akuntansi?cetak-jurnal-administrasi-detail=1'+//$scope.item.namaKasir.id+
            '&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&Iddepartement='+departement+'&idRuangan='+ruanganId+'&namaKasir='+$scope.dataLogin.namaLengkap+'&view=true', function(response) {

        });
      }
   
        }
    ]);
});