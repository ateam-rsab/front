define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('DaftarPembayaranCtrl', ['$state', '$mdDialog', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'MnKeu','CacheHelper',
    function($state, $mdDialog, $q, $rootScope, $scope, modelItemAkuntansi, mnKeu,cacheHelper) {

      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      $scope.dataSbnSelected = {};
      function showButton(){
        $scope.showBtnCetak = true;
      }



      debugger;
      

      showButton();
      loadCombo();
      loadData();
      


      function loadData(){
              // $q.all([
        //  modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-penerimaan-kasir?kasir="+ $scope.item.kasir +"&caraBayar=" + $scope.item.caraBayar +"&jenisPenerimaan=" + $scope.item.jenisPenerimaan +"&tglAwal="+ $scope.item.periodeAwal +"&tglAkhir="+ $scope.item.periodeAkhir)
        //  ]).then(function(data) {
        //    if (data[0].statResponse){
        //      $scope.item = data[0];

        //      $scope.dataDaftarPenerimaan = new kendo.data.DataSource({
        //        data: data[0].list,
        //        pageSize: 10,
        //        total: data[0].length,
        //        serverPaging: false,
        //        schema:  {
        //          model: {
        //            fields: {
      //                   //tanggalMasuk: { type: "date" },
      //                   //tanggalPulang: { type: "date" }
        //            }
        //          }
        //        }  
        //      });
        //    }
        //  });
        debugger;
        var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
        var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
        var chacePeriode = tglAwal + "~" + tglAkhir//+":"+$scope.item.noFaktur+":"+$scope.item.NamaSupplier;
        cacheHelper.set('DaftarPenerimaanKasirCtrl', chacePeriode);
              //debugger;
              var Skasir = "";
              if($scope.item.kasir != undefined){
                Skasir = $scope.item.kasir.id;
              }

              var ScaraBayar = "";
              if($scope.item.caraBayar != undefined){
                ScaraBayar = $scope.item.caraBayar.id;
              }

              var SkelompokTransaksi = "";
              if($scope.item.kelompokTransaksi != undefined){
                SkelompokTransaksi = $scope.item.kelompokTransaksi.id;
              }
              $q.all([
                mnKeu.getUrlData("struk-pengeluaran/get-struk-bukti-pengeluaran/?"
                  +"startDate="+tglAwal
                  +"&endDate="+tglAkhir
                  +"&idPegawai="+Skasir
                  //+"&idCaraBayar="+ScaraBayar
                  //+"&idKelTransaksi="+SkelompokTransaksi
                  )        
                ]).then(function(data) {
                  if (data[0].statResponse){ 
                    var result=data[0].data;
                    for (var x=0 ;x< result.length;x++){
                      var element =result[x];
                      element.tglSBK= moment(result[x].tglSBK).format('DD-MM-YYYY');
                      element.status= "Belum Setor";
                    }
                    $scope.dataDaftarPenerimaan = new kendo.data.DataSource({
                      data: result,
                      pageSize: 10,
                      total: result.length,
                      serverPaging: false,
                          /*schema:  {
                           model: {
                              fields: {
                                  tglTerima: { type: "date" },
                                  tglJatuhTempo: { type: "date" }
                                      }
                                 }
                             }  */
                         });

                  }
                });
              }
              function loadCombo(){
                var chacePeriode = cacheHelper.get('DaftarPenerimaanKasirCtrl');
                if(chacePeriode != undefined){
                  var arrPeriode = chacePeriode.split('~');
                  $scope.item.periodeAwal = new Date(arrPeriode[0]);
                  $scope.item.periodeAkhir = new Date(arrPeriode[1]);
                }
                else
                {              
                  $scope.item.periodeAwal = $scope.now;
                  $scope.item.periodeAkhir = $scope.now;

                }
                mnKeu.getListGeneric("KelompokTransaksi&select=id,kelompokTransaksi&criteria=statusEnabled&values=true").then(function(data){
                  $scope.listKelompokTransaksi=data;
                });

                mnKeu.getListGeneric("CaraBayar&select=id,caraBayar").then(function(data){
                  $scope.listCaraBayar=data;
                });
                mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=700").then(function(data){
                  $scope.listKasir=data;
                });
          // $q.all([
          //  modelItemAkuntansi.getDataGeneric("jenisKartu", false),
          //  modelItemAkuntansi.getDataGeneric("caraBayar", false)
          //  ]).then(function(data) {
          //    if (data[0].statResponse){
          //      $scope.listJenisPenerimaan = data[1]
          //    }
          //    if (data[1].statResponse){
          //      $scope.listCaraBayar = data[2]
          //    }
          //  });
        }


        $scope.columnDaftarPenerimaan = [
        {
          "field": "noSBK",
          "title": "noSBK",
          "template": "<span class='style-center'>#: noSBK #</span>",
          "width":"120px"
        },
        {
          "field": "tglSBK",
          "title": "Tanggal",
          "template": "<span class='style-center'>#: tglSBK #</span>",
          "width":"120px"
        },
        {
          "field": "keteranganLainnya",
          "title": "Keterangan",
          "template": "<span class='style-left'>#: keteranganLainnya #</span>",
          "width":"300px"
        },
        {
          "field": "totalDiBayar",
          "title": "Total Dibayar",
          "template": "<span class='style-right'>{{formatRupiah('#: totalDiBayar #', 'Rp.')}}</span>",
          "width":"200px"

        },
        {
          "field": "namaPegawaiPembayar",
          "title": "Kasir",
          "template": "<span class='style-center'>#: namaPegawaiPembayar #</span>",
          "width":"200px"
        }
        ];

        $scope.Cetak = function(){
          if($scope.dataSbnSelected.noSbm == undefined){

            var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi", 
              "transaksi belum dipilih", "Ok");

            $mdDialog.show(alertDialog).then(function() {

            });
          }
          else
          {
            debugger;
            var obj = {
              noRegistrasi : [$scope.dataSbnSelected.noSbm],
              backPage : "DaftarPenerimaanKasir"
            }

            $state.go("CetakDokumenKasir", {
              dataPasien: JSON.stringify(obj)
            });
          } 
        }

        $scope.formatRupiah = function(value, currency) {
          return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

        $scope.SearchData = function(){
          loadData();
        }

      }
      ]);
});