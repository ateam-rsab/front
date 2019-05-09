define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('VerifikasiTagihanSupplierCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ManageSdm', '$state','DateHelper',
    function(cacheHelper,$timeout, $q, $rootScope, $scope, manageSdm,$state,dateHelper) {

      //catatan : PENTING
      //cek tabel maploginusertoruangan_s
      
      $scope.dataVOloaded = true;
      $scope.now = new Date();
      $scope.item = {};
      //$scope.dataSelectedPiutang = {};
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;
      
      $scope.listStatus = [{"id":0,"namaStatus":"Verifikasi"},{"id":1,"namaStatus":"Belum Verifikasi"}]

      //ON LOAD with Params
      $scope.item.tanggalAwal = $scope.now;
      $scope.item.tanggalAkhir = $scope.now;
      $scope.item.status =  $scope.listStatus[1];
      var chacePeriode = cacheHelper.get('filterDataParams');
      if(chacePeriode != undefined){
       debugger;
        var arrPeriode = chacePeriode.split('~');
        $scope.item.tanggalAwal = new Date(arrPeriode[0]);
        $scope.item.tanggalAkhir = new Date(arrPeriode[1]);
        $scope.item.status =  $scope.listStatus[parseInt(arrPeriode[2])];
        $scope.item.noFaktur = arrPeriode[3];
        $scope.item.NamaSupplier = arrPeriode[4];
        loadData();
       //  var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
       //  var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
       //  var nf = "&noFaktur=" + $scope.item.noFaktur;
       //  if($scope.item.noFaktur == undefined){
       //   var nf = "";
       // };
       // var nr =""
       // if($scope.item.NamaSupplier != undefined){
       //   var nr ="&namaRekanan=" + $scope.item.NamaSupplier;
       // };
       //  ////debugger;
       //  manageSdm.getOrderList("tagihan-rekanan/daftar-tagihan-rekanan?dateStart=" + tglAwal1 + 
       //    "&dateEnd=" + tglAkhir1+nf+nr ).then(function(data){
       //      $scope.dataGrid=data.data.result;
       //    });

       //  }
       //  else
       //  {
       //    $scope.item.tanggalAwal = $scope.now;
       //    $scope.item.tanggalAkhir = $scope.now;
     };
      ///END/// ON LOAD with Params

      //ON CLICK tombol CARI
      $scope.cariData = function(){
        loadData()
      }
      function loadData(){
        //SIMPAN CAHCE
        var tglAwal1=dateHelper.formatDate($scope.item.tanggalAwal,"YYYY-MM-DD");
        var tglAkhir1=dateHelper.formatDate($scope.item.tanggalAkhir,"YYYY-MM-DD");
        // if($scope.item.namaCollector != undefined){
        //   var npp = $scope.item.namaCollector;
        // };
        // if($scope.item.status != undefined){
        //   var sttt = $scope.item.status.namaStatus;
        // };
        
        /////END

        ///FILTER DATA
        debugger;
        var nff = $scope.item.noFaktur;
        var nf = "&noFaktur=" + $scope.item.noFaktur;
        if($scope.item.noFaktur == undefined){
         var nf = "";
         var nff = "";
       };
       var nr =""
       var nrr = ""
       if($scope.item.NamaSupplier != undefined){
         var nr ="&namaRekanan=" + $scope.item.NamaSupplier;
         var nrr = $scope.item.NamaSupplier
       };
       if($scope.item.status == undefined){
        var vStatus2 = "Belum Verifikasi"
        var urlString = "tagihan-rekanan/daftar-tagihan-rekanan-belum-verifikasi/?dateStart="
      } else{
          var idStatus = $scope.item.status.id
        if($scope.item.status.namaStatus == "Verifikasi"){
          var vStatus2 = "Verifikasi"
          var urlString = "tagihan-rekanan/daftar-tagihan-rekanan-verifikasi/?dateStart="
        } else {
          var vStatus2 = "Belum Verifikasi"
          var urlString = "tagihan-rekanan/daftar-tagihan-rekanan-belum-verifikasi/?dateStart="
        }}

        var chacePeriode = tglAwal1 + "~" + tglAkhir1 + "~" + idStatus + "~" + nff + "~" + nrr;
        cacheHelper.set('filterDataParams', chacePeriode);

        manageSdm.getOrderList(urlString + tglAwal1 + 
          "&dateEnd=" + tglAkhir1 +nf+nr).then(function(data) {
            if (data.statResponse){ 
             var result=data.data.result;
             for (var x=0 ;x< result.length;x++){
              var element =result[x];
              element.tglTerimaKiriman= moment(result[x].tglTerimaKiriman).format('YYYY-MM-DD');
              element.status2 = vStatus2
              element.tglEksekusi = moment(result[x].tglEksekusi).format('YYYY-MM-DD');
            }
            $scope.dataGrid = new kendo.data.DataSource({
              data: result,
              pageSize: 10,
              total: result.length,
              serverPaging: false,

            });

          }
          //$scope.dataGrid=data.data.result;
        });
        /////END
      };
      ///END/// //ON CLICK tombol CARI

      $scope.formatRupiah = function(value, currency) {
        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
      }
      $scope.formatTgl = function(value) {
        return dateHelper.formatDate(value,"YYYY-MM-DD");
      }

      $scope.columnGrid = [
      {
        "field": "tglTerimaKiriman",
        "title": "Tgl Terima",
        "template": "<span class='style-center'>{{'#: tglTerimaKiriman #'}}</span>",
        "width":"70px"
      },
      {
        "field": "noFaktur",
        "title": "No Faktur",
        "template": "<span class='style-center'>{{'#: noFaktur #'}}</span>",
        "width":"80px"
      },
      {
        "field": "namaRekanan",
        "title": "Nama Rekanan",
        "width":"200px"
      },
      {
        "field": "totalHarusDibayar",
        "title": "Total Tagihan",
        "template": "<span class='style-right'>{{formatRupiah('#: totalHarusDibayar #', 'Rp.')}}</span>",
        "width":"100px"
      },
      {
        "field": "status",
        "title": "Status Pembayaran",
        "template": "<span class='style-center'>{{'#: status #'}}</span>",
        "width":"80px"
      },
      {
        "field": "status2",
        "title": "Status",
        "template": "<span class='style-center'>{{'#: status2 #'}}</span>",
        "width":"80px"
      },
      {
        "field": "tglEksekusi",
        "title": "Tgl Verifikasi",
        "template": "<span class='style-center'>{{'#: tglEksekusi #'}}</span>",
        "width":"70px"
      }
      ];
      // $scope.mainGridOptions = { 
   //              pageable: true,
   //              columns: $scope.columCollecting,
   //              editable: "popup",
   //              selectable: "row",
   //              scrollable: false
   //          };

   $scope.Verifikasi = function(){
        // $scope.item.idPenjamin = $scope.item.tahun.FieldTahun
        // $scope.item.periodeAwal = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAwal),"YYYY-MM-DD"); 
        // $scope.item.periodeAkhir = dateHelper.formatDate(ModelItem.beforePost($scope.item.tglAkhir),"YYYY-MM-DD"); 
        // $scope.item.status = $scope.item.status.Status

        //debugger;
        if($scope.dataSelected.noRecStrukVerifikasi == undefined){
          alert("List belum dipilih!");
          return;
        }

        var dataObjPost = {};
        var arrObjPembayaran = [];
        // for(var i=0; i<$scope.dataSource._data.length; i++){
        //   arrObjPembayaran.push($scope.dataSource._data[i].noRec)
        // }
        dataObjPost = {}
        manageSdm.postData("tagihan-rekanan/save-verifikasi-tagihan-rekanan?noRec="+$scope.dataSelected.noRecStrukVerifikasi,dataObjPost).then(function(e) {
        })
        loadData();
      };
      $scope.Detail = function() {
        if($scope.dataSelected.noTerima == undefined){
         alert("Silahkan Pilih Tagihan Rekanan");
         return;
       }
       var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
       var tglTerima= moment($scope.dataSelected.tglTerima).format('YYYY-MM-DD');
       var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')
              // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
              var tempData=tglTerima+"#"+
              $scope.dataSelected.namaRekanan+"#"+
              $scope.dataSelected.noFaktur+"#"+
              tglJatuhTempo+"#"+
              tglfaktur+"#"+
              $scope.dataSelected.noRec
              +"#VerifikasiTagihanSupplier#"
              +$scope.dataSelected.noTerima;
        //setting caching
        cacheHelper.set('DetailTagihanRekanan', tempData);
        $state.go('DetailTagihanRekanan',{noTerima: "0308"})
      }

      // $scope.detail = function(){
      //   $scope.changePage("DetailCollectingPiutang");
      // };
      // $scope.changePage = function(stateName){
      //   if($scope.dataSelected.noPosting != undefined)
      //   {
      //     var obj = {
      //       splitString : $scope.dataSelected.noPosting + "~..:."
      //     }

      //     $state.go(stateName, {
      //       dataCollect: JSON.stringify(obj)
      //     });
      //   }
      //   else
      //   {
      //     alert("Silahkan pilih data Collector terlebih dahulu");
      //   }
      // };
          ////////////////////////////////////////////////////////////

        }
        ]);
});