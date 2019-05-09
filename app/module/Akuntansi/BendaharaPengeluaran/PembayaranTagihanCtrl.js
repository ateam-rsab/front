define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('PembayaranTagihanCtrl', ['CacheHelper','$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageSdm','DateHelper','$http','$state',
    function(cacheHelper,$q, $rootScope, $scope, modelItemAkuntansi, manageSdm,dateHelper,$http,$state) {

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.item.tglBayar = $scope.now;
      $scope.show1 = false;
      $scope.show2 = false;
      var noRECC = "";
      var dariSini = "";
      $scope.item.caraBayar = {"id":1,"caraBayar":"TUNAI"}

      $scope.$watch('item.caraBayar', function(newValue, oldValue) {
       if(newValue != undefined && newValue.caraBayar == "TUNAI"){
        $scope.show1 = false;
        $scope.show2 = false;
      }
      else
      {
        $scope.show1 = true;
        $scope.show2 = true;
      }
    });

      if ($state.params.noTerima !== "") {
        debugger;
          //Ambil dari cache aj biar gak ada decode dan encode url jadi masalah
          var chacePeriode = cacheHelper.get('PembayaranTagihan');
          if(chacePeriode != undefined){
           var arrPeriode = chacePeriode.split('#');
           // $scope.item.tglTerima = new Date(arrPeriode[0]);
           $scope.item.deskripsiTransaksi=arrPeriode[1];
           
           // $scope.item.tglFaktur = new Date(arrPeriode[4]);
           // $scope.item.tglJatuhTempo = new Date(arrPeriode[3]);
           noRECC = arrPeriode[5];
           $scope.item.subTotal="Rp. " + parseFloat(arrPeriode[6]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//arrPeriode[6];
            modelItemAkuntansi.getDataGlobal("valet/terbilang/"+ arrPeriode[6]).then(function(data){
               $scope.item.terbilang = data.terbilang;
             })
            dariSini = arrPeriode[7]
         }
       } 

       manageSdm.getListData("CaraBayar&select=id,caraBayar").then(function(data){
        $scope.listDataCaraBayar=data;
      });
       manageSdm.getListData("KelompokTransaksi&select=id,kelompokTransaksi&criteria=isCostInOut&values=1").then(function(data){
        $scope.listUraianTransaksi=data;
      });

       $scope.$watch('item.totalBayar', function(newValue, oldValue) {
        debugger;
        if (newValue != ""  ) {
         modelItemAkuntansi.getDataGlobal("valet/terbilang/"+ $scope.item.totalBayar).then(
           function(data){
             $scope.item.tebilangBayar = data.terbilang;
           })
       }
     });

       $scope.Back = function(){
       
        if (dariSini == "DaftarPenjualanApotekKasir/keluarUmum"){
          $state.go("DaftarPenjualanApotekKasir",{dataFilter: "keluarUmum"});  
        }else{
             $state.go(dariSini)
        }
        
      }

      $scope.Bayar = function(){
        debugger;
        if($scope.item.caraBayar == undefined){
          alert("Cara Bayar belum dipilih!");
          return;
        }
        if($scope.item.uraianTransaksi == undefined){
          alert("uraian Transaksi belum dipilih!");
          return;
        }
        // debugger;
        var dataObjPost = {};
        var arrObjnoSBK = {};
        var arrObjCaraBayar = {};
        var arrObjKelompok = {};
        var arrObjnoStruk = {};
        arrObjKelompok = {
          id: $scope.item.uraianTransaksi.id
        };
        arrObjnoSBK = {
          kelompokTransaksi: arrObjKelompok,
          totalDiBayar: $scope.item.totalBayar,
          pembayaranKe: 1,
          keteranganLainnya: $scope.item.deskripsiTransaksi,
          noStruk: arrObjnoStruk
        };
        arrObjCaraBayar = {
          id: $scope.item.caraBayar.id
        };
        dataObjPost = {
          noSBK: arrObjnoSBK,
          kdCaraBayar: arrObjCaraBayar,
          namaBankProvider: $scope.item.namaBank,
          namaPemilik: $scope.item.namaPemilikRekening,
          noKartuAccount: $scope.item.noRekening
        };
        manageSdm.postData("tagihan-rekanan/save-pembayaran-tagihan/?noRec="+noRECC,dataObjPost).then(function(e) {
        });
        var obj = {
              noRegistrasi : noSBM,
              backPage :'PembayaranTagihanCtrl'
            }

              $state.go("CetakDokumenKasir", {
                 dataPasien: JSON.stringify(obj)
              });
         //break;
        //$state.go(dariSini)
      }


      // {
      //   "noSBK":{
      //     "kelompokTransaksi":{
      //       "id" : 11
      //     },
      //     "totalDiBayar" : 3000000,
      //     "pembayaranKe" : 1,
      //     "keteranganLainnya": "Pembayaran Supplier",
      //     "noStruk":{

      //     }
      //   },
      //   "kdCaraBayar":{
      //     "id" : 3
      //   },
      //   "namaBankProvider" : "MANDIRI",
      //   "namaPemilik" : "Arya",
      //   "noKartuAccount" : 12345678
      // }

           //  $scope.caraBayarChange = function(){
           //      debugger;
           //      if($scope.item.caraBayar.caraBayar == "TUNAI"){
           //          $scope.showRincianBank = false;
           //          $scope.showRincianBank2 = false;
           //          $scope.item.deskripsiTransaksi = "TUNAI"
           //      }
           //      else{
           //         $scope.showRincianBank = true;
           //         $scope.showRincianBank2 = true;
           //         $scope.item.deskripsiTransaksi = "Transfer"
           //     }    
           // }



               ///////////////////////// -TAMAT- //////////////////////////
             }
             ]);
});