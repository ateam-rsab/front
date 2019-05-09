define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienDalamPerawatanCtrl', ['$q','ModelItemAkuntansi', '$rootScope', '$scope','$state','CacheHelper','DateHelper', 'ManageServicePhp',
        function($q, modelItemAkuntansi,$rootScope, $scope,$state,cacheHelper,dateHelper,manageServicePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.isRouteLoading=false;
            $scope.now = new Date();
            $scope.item.tglAwal = $scope.now;
            $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('cachePerawatan');
              if(chacePeriode != undefined){
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
                init();
            }
            else{
             $scope.item.tglAwal = $scope.now;
             $scope.item.tglAkhir = $scope.now;
             init();
         }
     }
     $scope.formatRupiah = function(value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    function loadCombo(){
      manageServicePhp.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
        $scope.listKelompokPasien = data.data.kelompokpasien;
        $scope.listRuangan = data.data.ruanganall;
    })
  }
  function init() {
    $scope.isRouteLoading=true;
    var  tglAwal = "&tglAwal=" + moment($scope.item.tglAwal ).format('YYYY-MM-DD HH:mm:ss');
    var tglAkhir = "&tglAkhir=" + moment($scope.item.tglAkhir  ).format('YYYY-MM-DD HH:mm:ss');

    var rg =""
    if ($scope.item.ruangan != undefined){
        var rg ="&ruangId=" +$scope.item.ruangan.id
    }
    var kp =""
    if ($scope.item.kelompokPasien != undefined){
        var kp ="&kelId=" +$scope.item.kelompokPasien.id
    }


    var reg =""
    if ($scope.item.noReg != undefined){
        var reg ="&noregistrasi=" +$scope.item.noReg
    }
    var rm =""
    if ($scope.item.noMr != undefined){
        var rm ="&nocm=" +$scope.item.noMr
    }
    var nm =""
    if ($scope.item.namaPasien != undefined){
        var nm ="&namapasien=" +$scope.item.namaPasien
    }


    manageServicePhp.getDataTableTransaksi("laporan/get-pasien-dalam-perawatan?"+
        tglAwal + 
        tglAkhir +
        rg +
        rm +
        reg +
        kp +
        nm
        , true).then(function(dat){
         $scope.isRouteLoading=false;
         for (var i = 0; i < dat.data.data.length; i++) {
            dat.data.data[i].no = i+1
            var tanggal = $scope.now;
            var tanggalLahir = new Date(dat.data.data[i].tgllahir);
            var umur = dateHelper.CountAge(tanggalLahir, tanggal);
            dat.data.data[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari';

            if (parseFloat (dat.data.data[i].totalkabeh) > 50000000){  
               dat.data.data[i].myStyle = {'background-color': '#FF0000','color' : '#F0FFFF'};
           }
           dat.data.data[i].total =parseFloat (dat.data.data[i].total) +
           parseFloat (dat.data.data[i].biayaadmin) +parseFloat (dat.data.data[i].biayamaterai )
           dat.data.data[i].diskon =  parseFloat(dat.data.data[i].diskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
           dat.data.data[i].deposit =   parseFloat(dat.data.data[i].deposit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
           dat.data.data[i].totalkabeh =  parseFloat(dat.data.data[i].totalkabeh).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
           dat.data.data[i].total =parseFloat(dat.data.data[i].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");

       }

       var data = dat.data.data
       $scope.listDataPasien =    new kendo.data.DataSource({
        data: data
    });
       $scope.listDataPasien.fetch(function(e) {
        var temp = [];
        for (var key in this._data) {
            if (this._data.hasOwnProperty(key)) {
                var element = this._data[key];
                if (angular.isFunction(element) === false && key !== "_events" && key !== "length")
                    temp.push(element);
            }
        }
        $scope.listPasien = temp;
        cacheHelper.set('tempData', temp);
    });
   });

    }

    $scope.cariFilter = function(){
        init();
        var tglAwal = moment($scope.item.tglAwal ).format('YYYY-MM-DD HH:mm:ss');
        var tglAkhir = moment($scope.item.tglAkhir  ).format('YYYY-MM-DD HH:mm:ss');
        var chacePeriode ={ 0 : tglAwal ,
            1 : tglAkhir,
        }
        cacheHelper.set('cachePerawatan', chacePeriode);
    }


    $scope.formatTanggal = function(tanggal){
        return moment(tanggal).format('DD-MM-YYYY HH:mm');
    }
    $scope.cetak= function(){

        var ruanganId = ''
        if ($scope.item.ruangan != undefined) {
          ruanganId = $scope.item.ruangan.id
      }
      var kelompokPasien = ''
      if ($scope.item.kelompokPasien != undefined) {
          kelompokPasien = $scope.item.kelompokPasien.id
      }
      var namaPasien = ''
      if ($scope.item.namaPasien != undefined) {
          namaPasien = $scope.item.namaPasien
      }
      var noReg = ''
      if ($scope.item.noReg != undefined) {
          noReg = $scope.item.noReg
      }
       var noMr = ''
      if ($scope.item.noMr != undefined) {
          noMr = $scope.item.noMr
      }
      var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
      var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');;
      var client = new HttpClient();
      client.get('http://127.0.0.1:1237/printvb/kasir?cetak-lap-pasien-dalam-perawatan=' + tglAwal + '&tglAkhir=' + tglAkhir 
          +'&idRuangan=' + ruanganId + '&idKelompok=' + kelompokPasien 
          +'&noReg='  + noReg + '&noRm='  + noMr
          +'&namaPasien='  + namaPasien
          +'&namaLogin='  + $scope.pegawai.namaLengkap + '&view=true', function (response) {

          });
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







}
]);
});
