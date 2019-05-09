define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailTagihanRekananCtrl', ['CacheHelper','$q', '$rootScope', '$scope', 'ManageSdm', 'ManageAkuntansi','DateHelper','$http','$state','ManageServicePhp',
        function(cacheHelper,$q, $rootScope, $scope, manageSdm, manageAkuntansi,dateHelper,$http,$state,manageServicePhp) {

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.dataPasienSelected = {}; 
            var noRECC = "";

            if ($state.params.noTerima !== "") {
               //Ambil dari cache aj biar gak ada decode dan encode url jadi masalah
               var chacePeriode = cacheHelper.get('DetailTagihanRekanan');
               if(chacePeriode != undefined){

                   var arrPeriode = chacePeriode.split('#');
                   $scope.item.tglTerima = new Date(arrPeriode[0]);
                   $scope.item.namaRekanan=arrPeriode[1];
                   $scope.item.noFaktur=arrPeriode[2];
                   $scope.item.tglFaktur = new Date(arrPeriode[4]);
                   $scope.item.tglJatuhTempo = new Date(arrPeriode[3]);
                   noRECC = arrPeriode[5];
                   var darisini = arrPeriode[6];
                   $scope.item.noTerima = arrPeriode[7];
               }


                //Ambil data Pegawai dari database
                manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-detail-tagihan-suplier?"
                    +"NoTerima="+$scope.item.noTerima+
                    "&noFaktur="+$scope.item.noFaktur+
                    "&namaRekanan="+$scope.item.namaRekanan+
                    "&NoStrukFk="+noRECC, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.data;
                    //Set data untuk total
                    //debugger;
                    var ttlHrg = 0;
                    var ttlPpn = 0;
                    var ttldiscount = 0;
                    var subtotal = 0;
                    var totQty=0
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                        ttlHrg = ttlHrg + (parseInt(datas[i].hargasatuan)*datas[i].qtyproduk);
                        ttlPpn = ttlPpn + (parseInt(datas[i].hargappn)*datas[i].qtyproduk);
                        ttldiscount = ttldiscount + (parseInt(datas[i].hargadiscount)*datas[i].qtyproduk);
                        totQty = totQty + datas[i].qtyproduk
                    }
                    $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                        data: datas,
                        // pageSize: 10,
                        total: datas.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                    subtotal = ttlHrg+ttlPpn-ttldiscount
                    $scope.item.harga = 'Rp. ' +  parseFloat(ttlHrg).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    $scope.item.ppn= 'Rp. ' +  parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    $scope.item.faktur= 'Rp. ' +  parseFloat(subtotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                    $scope.item.diskon =  'Rp. ' +  parseFloat(ttldiscount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");                   
                });
                // manageSdm.getOrderList("tagihan-rekanan/detail-tagihan-rekanan/?noTerima="+$scope.item.noTerima+"&noFaktur="+$scope.item.noFaktur).then(function(data){
                //     $scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
                //     data: data.data.result,
                //     total: data.data.result.length,
                //     serverPaging: false,
                //     pageSize: 10,
                // });
                //       //Set data untuk total
                //       //debugger;
                //       var ttlHrg = 0;
                //       var ttlPpn = 0;
                //       var ttldiscount = 0;
                //       for(var i=0; i<data.data.result.length; i++){
                //         ttlHrg = ttlHrg + parseInt(data.data.result[i].total);
                //         ttlPpn = ttlPpn + parseInt(data.data.result[i].totalPpn);
                //         ttldiscount = ttldiscount + parseInt(data.data.result[i].diskon);
                //     };
                //     $scope.item.harga = 'Rp. ' +  parseFloat(ttlHrg).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                //     $scope.item.ppn= 'Rp. ' +  parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                //     $scope.item.faktur= 'Rp. ' +  parseFloat(ttlHrg).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                //     $scope.item.diskon =  'Rp. ' +  parseFloat(ttldiscount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                // })
            }  //End if, apabila ada parameter search


            $scope.columnPenyusunanTRPNBP = [
                {
                    "field": "no",
                    "title": "No",
                    "width": "40px"
                },
                {
                    "field": "kdproduk",
                    "title": "Kode Barang",
                    "width": "100px"
                },
                {
                    "field": "kdsirs",
                    "title": "Kode Sirs",
                    "width": "85px"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Barang"
                },
                {
                    "field": "asalproduk",
                    "title": "Asal Barang"
                },
                {
                    "field": "qtyproduk",
                    "title": "Qty Terima",
                    "template": "<span class='style-right'>#= kendo.toString(qtyproduk) #</span>",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan"
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', 'Rp.')}}</span>"
                },
                {
                    "field": "subtotal",
                    "title": "Total",
                    "template": "<span class='style-right'>{{formatRupiah('#: subtotal #', 'Rp.')}}</span>"                    
                },
                {
                    "field": "hargadiscount",
                    "title": "Diskon",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', 'Rp.')}}</span>"
                }
            ];


            manageServicePhp.getDataTableTransaksi("bendahara-pengeluaran/get-riwayat-pembayaran-suplier?"
                   +"NoTerima="+$scope.item.noTerima+
                    "&NoFaktur="+$scope.item.noFaktur, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.data;
                     for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                    }                   
                    $scope.dataRiwayat = new kendo.data.DataSource({
                        data: datas,
                        total: datas.length,
                        serverPaging: false,
                        // pageSize: 10,
                    })
            });

            $scope.columnRiwayat = [
                {
                    "field": "no",
                    "title": "No",
                    "width":"40px"
                },
                {
                    "field": "tglsbk",
                    "title": "Tgl SBK",
                    "width":"110px"
                },
                {
                    "field": "nosbk",
                    "title": "NOSBK",
                    "width":"125px"
                },
                {
                    "field": "totalharusdibayar",
                    "title": "Total Harus Dibayar",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #', '')}}</span>"
                },
                {
                    "field": "totaldibayar",
                    "title": "Total Dibayar",
                    "template": "<span class='style-right'>{{formatRupiah('#: totaldibayar #', '')}}</span>"
                },
                {
                    "field": "totaldibayarbefore",
                    "title": "Total Dibayar Sebelumnya",
                    "template": "<span class='style-right'>{{formatRupiah('#: totaldibayarbefore #', '')}}</span>"
                },
                {
                    "field": "totalsudahdibayar",
                    "title": "Total Sudah Dibayar",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalsudahdibayar #', '')}}</span>"
                },
                {
                    "field": "totalsisahutang",
                    "title": "Total Sisa Hutang",
                    "template": "<span class='style-right'>{{formatRupiah('#: totalsisahutang #', '')}}</span>"                    
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
            $scope.CetakKwitansi = function(){
                if ($scope.dataRiwayatSelected == undefined) {
                    toastr.error("Data Belum Dipilih");
                    return
                }

                var stt = 'false'
                if (confirm('View Kwitansi? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansi-sbk=1&noSbk='+$scope.dataSbnSelected.noregistrasi+$scope.dataSbnSelected.norec_sp+'&idPegawai='+$scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
                    // do something with response
                });
            }
}
]);
});