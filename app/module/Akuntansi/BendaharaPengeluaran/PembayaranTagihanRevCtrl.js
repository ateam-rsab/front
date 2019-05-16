define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('PembayaranTagihanRevCtrl', ['CacheHelper','$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageSdm','DateHelper','$http','$state','ManageServicePhp',
    function(cacheHelper,$q, $rootScope, $scope, modelItemAkuntansi, manageSdm,dateHelper,$http,$state,manageServicePhp) {

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.item.tglBayar = $scope.now;
      $scope.show1 = false;
      $scope.show2 = false;
      var noRECC = "";
      var judul = "";
      var dariSini = "";
      var nosbk = "";
      var sisautang = 0;
      LoadCombo();

      $scope.$watch('item.caraBayar', function(newValue, oldValue) {
          if(newValue != undefined && newValue.carabayar == "TUNAI"){
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
          //Ambil dari cache aj biar gak ada decode dan encode url jadi masalah
          var chacePeriode = cacheHelper.get('PembayaranTagihanRev');
          if(chacePeriode != undefined){
           var arrPeriode = chacePeriode.split('#');
           $scope.item.deskripsiTransaksi=arrPeriode[1];
           noRECC = arrPeriode[5];
           $scope.item.subTotal="Rp. " + parseFloat(arrPeriode[6]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");//arrPeriode[6];
            modelItemAkuntansi.getDataGlobal("valet/terbilang/"+ arrPeriode[6]).then(function(data){
               $scope.item.terbilang = data.terbilang;
             })
            sisautang=parseFloat(arrPeriode[6]);
            judul = arrPeriode[7]
            dariSini = arrPeriode[8]
         }
       } 

       // manageSdm.getListData("CaraBayar&select=id,caraBayar").then(function(data){
       //    $scope.listDataCaraBayar=data;
       //  });
       // manageSdm.getListData("KelompokTransaksi&select=id,kelompokTransaksi&criteria=isCostInOut&values=1").then(function(data){
       //    $scope.listUraianTransaksi=data;
       //  });

       function LoadCombo(){
            manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-combo-bendahara-pengeluaran", true).then(function(dat){                
                var datas = dat.data;
                $scope.listDataCaraBayar = datas.carabayar;
                $scope.item.caraBayar = {"id":1,"carabayar":"TUNAI"}
                $scope.listUraianTransaksi = datas.kelompoktransaksi;
                if (judul == "PembayaranTagihanSuplier") {
                  $scope.item.uraianTransaksi = {"id":107,"kelompoktransaksi":"PEMBAYARAN TAGIHAN SUPLIER"}
                  $scope.pororo = true;
                }
            });
       }

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
        if($scope.item.totalBayar == undefined || $scope.item.totalBayar == ""  || $scope.item.totalBayar == 0){
          alert("Total Bayar belum diisi!");
          return;
        }

        var namaBankRkn = ""
        if ($scope.item.namaBankRkn != undefined) {
            namaBankRkn = $scope.item.namaBankRkn
        }

        var noRekeningRkn = ""
        if ($scope.item.noRekeningRkn != undefined) {
           noRekeningRkn = $scope.item.noRekeningRkn
        }

        var namaPemilikRekeningRkn = ""
        if ($scope.item.namaPemilikRekeningRkn != undefined) {
           namaPemilikRekeningRkn = $scope.item.namaPemilikRekeningRkn
        }

         var namaBank = ""
        if ($scope.item.namaBank != undefined) {
            namaBank = $scope.item.namaBank
        }

        var noRekening = ""
        if ($scope.item.noRekening != undefined) {
           noRekeningRkn = $scope.item.noRekening
        }

        var namaPemilikRekening = ""
        if ($scope.item.namaPemilikRekening != undefined) {
           namaPemilikRekeningRkn = $scope.item.namaPemilikRekening
        }

        var sbk = {
            nosbk: nosbk,
            carabayar: $scope.item.caraBayar.id,
            kelompoktransaksi: $scope.item.uraianTransaksi.id,
            keteranganlainnya: $scope.item.deskripsiTransaksi,
            tagihan: $scope.item.subTotal,
            totalbayar: $scope.item.totalBayar,
            tglsbk : moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
            bankrekanan:namaBankRkn,
            rekeningrekanan:noRekeningRkn,
            pemilikrekanan:namaPemilikRekeningRkn,
            bank:namaBank,
            rekenin:noRekening,
            pemilik:namaPemilikRekening, 
            sisautang:sisautang,
            nostruk:noRECC,  
            keterangan:$scope.item.deskripsiTransaksi    
        }

        var objSave = {
            sbk:sbk
        }

        manageServicePhp.savepembayarantagihansupplier(objSave).then(function(e) {
            // var obj = {
            //   noRegistrasi : noSBM,
            //   backPage :'PembayaranTagihanRevCtrl'
            // }

            // $state.go("CetakDokumenKasir", {
            //    dataPasien: JSON.stringify(obj)
            // });   
        })        
               
      }    
///////////////////////// -TAMAT- //////////////////////////
             }
             ]);
});