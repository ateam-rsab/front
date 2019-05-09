define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('DaftarReturPasienCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi', 'ManageKasir','DateHelper','$http','$state',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi, manageKasir,dateHelper,$http,$state) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};

        var chacePeriode = cacheHelper.get('DaftarReturPasienCtrl');
        if(chacePeriode != undefined){
          debugger;
          var arrPeriode = chacePeriode.split('~');
          $scope.item.periodeAwal = new Date(arrPeriode[0]);
          $scope.item.periodeAkhir = new Date(arrPeriode[1]);
          // if (arrPeriode[2] != "undefined"){
          //   $scope.item.noFaktur=arrPeriode[2];  
          // }
          // if (arrPeriode[3] !== "undefined"){
          //   $scope.item.NamaSupplier=arrPeriode[3]; 
          // }


        }
        else
        {              
          $scope.item.periodeAwal = $scope.now;
          $scope.item.periodeAkhir = $scope.now;

        }

        loadData()

            //List Status
            $scope.listStatus = [
            {id:3, namaExternal:"SEMUA"},
            {id:1, namaExternal:"RETUR"},
            {id:2, namaExternal:"LUNAS"}
            ];

            $scope.item.status = $scope.listStatus[0];


            $scope.columnGrid = [
            {
              "field": "tglStruk",
              "title": "Tanggal"
            },
            {
              "field": "noCm",
              "title": "NoRM"
            },
            {
              "field": "nama",
              "title": "Nama"
            },
            {
              "field": "namaRuangan",
              "title": "Ruangan"
            },
            {
              "field": "totalBiaya",
              "title": "Total Biaya"
            },
            {
              "field": "totalReturn",
              "title": "Total Retur"
            },
            {
              "field": "status",
              "title": "Status"
            }
            ];

            $scope.formatRupiah = function(value, currency) {
              return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };
            
            $scope.Cetak = function(){
             //debugger;
             var xxx =	$scope.dataPasienSelected.detail;
             var yyy = "aasas";
           }
            //Pindah Halaman ke Detail tagihan Rekanan/Suplier   
            $scope.Detail = function() {
              if($scope.dataSelected.noCm == undefined){
               alert("Silahkan Pilih tagihan retur");
               return;
             }
             debugger;
             //var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
             var tglStruk= moment($scope.dataSelected.tglStruk).format('YYYY-MM-DD');
             //var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')
              // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
              var tempData=tglStruk+"#"+
                           $scope.dataSelected.noCm+"#"+
                           $scope.dataSelected.nama+"#"+
                           $scope.dataSelected.namaRuangan+"#"+
                           $scope.dataSelected.noRec
                           +"#DaftarReturPasien#"
              //setting caching
              cacheHelper.set('DetailReturPasienCtrl', tempData);
              $state.go('DetailReturPasien')//,{noTerima: '0308'})
            }

            //Pencarian data
            $scope.SearchData = function(){

              
               loadData()
            }

            function loadData(){
                  debugger;
              var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
              var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
              
              //debugger;
              var noRM = "";
              if($scope.item.noRM != undefined)
                noRM = $scope.item.noRM;
    
              var namaPasien = "";
              if($scope.item.namaPasien != undefined)
                namaPasien ="namaPasien" + $scope.item.namaPasien;

              // var tempRuanganId = "";
              // if($scope.item.ruangan != undefined)
              //   tempRuanganId = $scope.item.ruangan.id;

              var tempStatus = "";
              if($scope.item.status != undefined){
                tempStatus = "&status=" + $scope.item.status.namaExternal;
                if($scope.item.status.namaExternal == "SEMUA"){
                  tempStatus = "";
                }
                if($scope.item.status.namaExternal == "RETUR"){
                  tempStatus = "&status=Belum Bayar";
                }
                if($scope.item.status.namaExternal == "LUNAS"){
                  tempStatus = "&status=Lunas";
                }
              }
              $q.all([
                modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-return-pasien?" 
                  +namaPasien
                  +"&tglAwal="+ tglAwal 
                  +"&tglAkhir="+ tglAkhir 
                  +"&ruanganId"
                  +tempStatus)//+tglAwal+"&dateEnd="+tglAkhir+"&noFaktur="+noFaktur+"&namaRekanan="+NamaSupplier+tempStatus),        
                ]).then(function(data) {
                  if (data[0].statResponse){ 
                   var result=data[0];
                   for (var x=0 ;x< result.length;x++){
                    var element =result[x];
                    element.tglTerima= moment(result[x].tglTerima).format('YYYY-MM-DD');
                  }
                  $scope.dataGrid = new kendo.data.DataSource({
                    data: result,
                    pageSize: 10,
                    total: result.length,
                    serverPaging: false
                             });

                }
              });
                var chacePeriode = tglAwal + "~" + tglAkhir//+":"+$scope.item.noFaktur+":"+$scope.item.NamaSupplier;
                cacheHelper.set('DaftarReturPasienCtrl', chacePeriode);
          }//end SearchData

          // $scope.Bayar = function(){
          //   $state.go('PembayaranTagihan')
          // }
          $scope.Bayar = function() {
             //  if($scope.dataSelected.noTerima == undefined){
             //   alert("Silahkan Pilih Tagihan Rekanan");
             //   return;
             //  }
            
            
             // var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
             // var tglTerima= moment($scope.dataSelected.tglTerima).format('YYYY-MM-DD');
             // var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')
             //  // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
             //  var tempData=tglTerima+"#Pembayaran Suplier a/n "+$scope.dataSelected.namaRekanan+"#"+$scope.dataSelected.noFaktur+"#"+tglJatuhTempo+"#"+tglfaktur+"#"+$scope.dataSelected.noRec+"#"+$scope.dataSelected.totalSisaHutang
             //  //setting caching
             //  cacheHelper.set('PembayaranTagihan', tempData);
             //  $state.go('PembayaranTagihan')
            }





        }
        ]);
});