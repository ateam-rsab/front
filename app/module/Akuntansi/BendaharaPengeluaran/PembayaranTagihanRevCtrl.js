define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('PembayaranTagihanRevCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageSdm', 'DateHelper', '$http', '$state', 'ManageServicePhp', '$mdDialog',
    function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, manageSdm, dateHelper, $http, $state, manageServicePhp, $mdDialog) {

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

      $scope.$watch('item.caraBayar', function (newValue, oldValue) {
        if (newValue != undefined && newValue.carabayar == "TUNAI") {
          $scope.show1 = false;
          $scope.show2 = false;
        } else {
          $scope.show1 = true;
          $scope.show2 = true;
        }
      });

      if ($state.params.noTerima !== "") {
        //Ambil dari cache aj biar gak ada decode dan encode url jadi masalah
        var chacePeriode = cacheHelper.get('PembayaranTagihanRev');
        if (chacePeriode != undefined) {
          var arrPeriode = chacePeriode.split('#');
          console.log(arrPeriode[8]);

          $scope.item.deskripsiTransaksi = arrPeriode[1];
          noRECC = arrPeriode[5];
          $scope.totalTagihan = arrPeriode[8];
          $scope.item.subTotal = "Rp. " + parseFloat(arrPeriode[8]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //arrPeriode[8];
          modelItemAkuntansi.getDataGlobal("valet/terbilang/" + arrPeriode[8]).then(function (data) {
            $scope.item.terbilang = data.terbilang;
          })
          console.log(arrPeriode);
          sisautang = parseFloat(arrPeriode[8]);
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

      function LoadCombo() {
        manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-combo-bendahara-pengeluaran", true).then(function (dat) {
          var datas = dat.data;
          $scope.listDataCaraBayar = datas.carabayar;
          $scope.item.caraBayar = {
            "id": 1,
            "carabayar": "TUNAI"
          }
          $scope.listUraianTransaksi = datas.kelompoktransaksi;
          if (judul == "PembayaranTagihanSuplier") {
            $scope.item.uraianTransaksi = {
              "id": 107,
              "kelompoktransaksi": "PEMBAYARAN TAGIHAN SUPLIER"
            }
            $scope.pororo = true;
          }
        });
      }

      $scope.$watch('item.totalBayar', function (newValue, oldValue) {
        
        if(parseInt($scope.item.totalBayar) > $scope.totalTagihan) {
          toastr.warning('Total Bayar tidak bisa lebih dari Total Tagihan');
          $scope.item.totalBayar = $scope.totalTagihan;
        }
        if (newValue != "") {
          modelItemAkuntansi.getDataGlobal("valet/terbilang/" + $scope.item.totalBayar).then(
            function (data) {
              $scope.item.tebilangBayar = data.terbilang;
            })
        }
      });

      $scope.Back = function () {

        if (dariSini == "DaftarPenjualanApotekKasir/keluarUmum") {
          $state.go("DaftarPenjualanApotekKasir", {
            dataFilter: "keluarUmum"
          });
        } else {
          $state.go(dariSini)
        }

      }

      $scope.Bayar = function () {
        if ($scope.item.caraBayar == undefined) {
          alert("Cara Bayar belum dipilih!");
          return;
        }
        if ($scope.item.uraianTransaksi == undefined) {
          alert("uraian Transaksi belum dipilih!");
          return;
        }
        if ($scope.item.totalBayar == undefined || $scope.item.totalBayar == "" || $scope.item.totalBayar == 0) {
          alert("Total Bayar belum diisi!");
          return;
        }

        var confirm = $mdDialog.confirm()
          .title('Apakah anda yakin akan membayar Tagihan?')
          // new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(dat.data.data[i].penggunaan);
          .textContent(`Tagihan akan dibayarkan kepada ${$scope.item.deskripsiTransaksi} dengan total ${new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format($scope.item.totalBayar)}`)
          .ok('Ya')
          .cancel('Batal');

        $mdDialog.show(confirm).then(function () {
          var namaBankRkn = "";
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
            tglsbk: moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
            bankrekanan: namaBankRkn,
            rekeningrekanan: noRekeningRkn,
            pemilikrekanan: namaPemilikRekeningRkn,
            bank: namaBank,
            rekenin: noRekening,
            pemilik: namaPemilikRekening,
            sisautang: sisautang,
            nostruk: noRECC,
            keterangan: $scope.item.deskripsiTransaksi
          }
  
          var objSave = {
            sbk: sbk
          }
  
          manageServicePhp.savepembayarantagihansupplier(objSave).then(function (e) {
            window.location.replace('#/DaftarTagihanSupplier');
            // $state.go('#/DaftarTagihanSupplier');
          })
        }, function () {
          toastr.info('Pembayaran dibatalkan');
        });

        

      }
      ///////////////////////// -TAMAT- //////////////////////////
    }
  ]);
});