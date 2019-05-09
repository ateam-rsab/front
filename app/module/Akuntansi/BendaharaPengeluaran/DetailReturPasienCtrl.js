define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailReturPasienCtrl', ['CacheHelper','$q', '$rootScope', '$scope', 'ModelItemAkuntansi','DateHelper','$http','$state',
        function(cacheHelper,$q, $rootScope, $scope, modelItemAkuntansi,dateHelper,$http,$state) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.dataPasienSelected = {}; 
            var noRECC = "";
            var totalBayar = 0;

            if ($state.params.noTerima !== "") {
                //Ambil dari cache aj biar gak ada decode dan encode url jadi masalah
                //debugger;
                var chacePeriode = cacheHelper.get('DetailReturPasienCtrl');
                if(chacePeriode != undefined){
                
                     var arrPeriode = chacePeriode.split('#');
                     $scope.item.tglStruk = new Date(arrPeriode[0]);
                     $scope.item.noCm=arrPeriode[1];
                     $scope.item.nama=arrPeriode[2];
                     $scope.item.namaRuangan = new Date(arrPeriode[3]);
                     noRECC = arrPeriode[4];
                     var darisini = arrPeriode[5];
                 }
                //$scope.item.noTerima=$state.arams.noTerima;
                //Ambil data Pegawai dari database
                modelItemAkuntansi.getDataTableTransaksi("kasir/detail-return-pasien/"+noRECC).then(function(data){
                    $scope.data1 = new kendo.data.DataSource({
                        data: data.detailPelayanan,
                        total: data.detailPelayanan.length,
                        serverPaging: false,
                        pageSize: 10,
                    });
                    $scope.data2 = new kendo.data.DataSource({
                        data: data.detailReturn,
                        total: data.detailReturn.length,
                        serverPaging: false,
                        pageSize: 10,
                    });
                      //Set data untuk total
                    debugger;
                    var ttl1 = 0;
                    var ttl2 = 0;
                      //var ttldiscount = 0;
                    for(var i=0; i<data.detailPelayanan.length; i++){
                        ttl1 = ttl1 + parseInt(data.detailPelayanan[i].total);
                    };
                    for(var i=0; i<data.detailReturn.length; i++){
                        ttl2 = ttl2 + parseInt(data.detailReturn[i].total);
                    };
                    $scope.item.ttl1 = 'Rp. ' +  parseFloat(ttl1).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    $scope.item.ttl2= 'Rp. ' +  parseFloat(ttl2).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    totalBayar = ttl2
                    // $scope.item.faktur= 'Rp. ' +  parseFloat(ttlHrg).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    // $scope.item.diskon =  'Rp. ' +  parseFloat(ttldiscount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                })
            }  
            //End if, apabila ada parameter search


            $scope.column2 = [
                // {
                //     "field": "kodeBarang",
                //     "title": "Kode Barang",
                //     "width":"150px"
                // },
                {
                    "field": "ruangan",
                    "title": "Ruangan"
                },
                {
                    "field": "namaLayanan",
                    "title": "Nama Layanan"
                },
                {
                    "field": "jumlah",
                    "title": "Jumlah Retur",
                    "width": "80px"
                },
                {
                    "field": "harga",
                    "title": "Harga",
                    "template": "<span class='style-right'>{{formatRupiah('#: harga #', 'Rp.')}}</span>",
                    "width":"150px"
                },
                {
                    "field": "total",
                    "title": "Total",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', 'Rp.')}}</span>"   ,
                    "width":"150px"                 
                }
            ];

            //debugger;
            // manageSdm.getOrderList("tagihan-rekanan/riwayat-pembayaran-tagihan/?noRec="+noRECC).then(function(data){
            //   $scope.dataRiwayat = new kendo.data.DataSource({
            //     data: data.data.result,
            //     total: data.data.result.length,
            //     serverPaging: false,
            //     pageSize: 10,
            // })
            // });




            $scope.column1 = [
                {
                    "field": "ruangan",
                    "title": "Ruangan"
                },
                {
                    "field": "namaLayanan",
                    "title": "Nama Pelayanan"
                },
                {
                    "field": "jumlah",
                    "title": "Jumlah",
                    "width":"150px"
                },
                {
                    "field": "harga",
                    "title": "Harga Satuan",
                    "template": "<span class='style-right'>{{formatRupiah('#: harga #', '')}}</span>",
                    "width":"200px"
                },
                {
                    "field": "total",
                    "title": "Total ",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>",
                    "width":"200px"
                }
            ];

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            };
            $scope.Cetak = function(){
            	////debugger;
                var xxx =	$scope.dataPasienSelected.detail;
                var yyy = "aasas";
            }
            $scope.Back = function(){
                //$state.go('DaftarTagihanSupplier')
                $state.go(darisini)
            }
            $scope.Bayar = function() {
             //  if($scope.dataSelected.noTerima == undefined){
             //   alert("Silahkan Pilih Tagihan Rekanan");
             //   return;
             // }
            
            
             //var tglJatuhTempo = moment($scope.dataSelected.tglJatuhTempo).format('YYYY-MM-DD');
             //var tglTerima= moment($scope.dataSelected.tglTerima).format('YYYY-MM-DD');
             //var tglfaktur = moment($scope.dataSelected.tglfaktur).format('YYYY-MM-DD')
              // $state.go("RekamDataPegawai",{idPegawai: $scope.idPegawai});
              var tempData="-"+"#Pembayaran Retur a/n "+$scope.item.noCm+" "+$scope.item.nama+"#"+"-"+"#"+"-"+"#"+"-"+"#"+noRECC+"#"+totalBayar+"#DaftarReturPasien"
              //setting caching
              cacheHelper.set('PembayaranTagihan', tempData);
              $state.go('PembayaranTagihan')
            }


}
]);
});