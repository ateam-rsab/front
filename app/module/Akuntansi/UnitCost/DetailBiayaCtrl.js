//Owari Start here....
//“Good programmer write code for machine, great programmer write code for other programmer”, nn
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailBiayaCtrl', ['$q', '$rootScope', '$scope', 'ManageUC','DateHelper','$state','CacheHelper','$mdDialog','DataHelper',
        function($q, $rootScope, $scope, manageUC,dateHelper,$state,cacheHelper,$mdDialog,stringHelper) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};

            $scope.cboPnd2 = true

            var jenis='';
            //debugger;
            var addDataDetail = [];
            $scope.item.tanggalAwal = $scope.now
            $scope.item.tanggalAkhir = $scope.now

            // $scope.dataParams = JSON.parse($state.params.dataFilter);
            // var strFilter = $scope.dataParams.splitString;
            // var arrFilter = strFilter.split('~');
            // var darisini = arrFilter[0];
            // var uchId = arrFilter[1];
            // jenis='simpan'

            
//             // $scope.dataModelGrid = {};
//             // $scope.dataModelGrid.NamabankAccount = {};
//             // $scope.dataModelGrid.total = {};

//             var status = ""
//             var ttlSsetor = 0;
             loadCombo();
             $scope.SearchData =function(){
             	loadData();
             }
             //loadData();

             $scope.kembali = function(){
                $state.go(darisini)
             }
            
            function loadData(){
                // if (arrFilter[2] == 'Edit') {
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcost?uchId="+uchId).then(function(data){
                //     $scope.item.idKegiatan = data.data[0].id;
                //     $scope.item.unitKerja = {'id':data.data[0].ruid,'namaruangan':data.data[0].namaruangan};
                //     $scope.item.keterangan = data.data[0].keterangan;
                //     $scope.item.totalDirectCost = data.data[0].totaldirect;
                //     $scope.item.indirectcost = data.data[0].indirectcost;
                //     $scope.item.unitCost = data.data[0].uc;
                //     manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produk&byId="+data.data[0].prid).then(function(data){
                //         //$scope.listJenisKegiatan = data.data;
                //         $scope.item.jenis2Kegiatan ={'id':data.data[0].jpid,'jenisproduk':data.data[0].jenisproduk};
                //         $scope.item.jenisKegiatan ={'id':data.data[0].prid,'namaproduk':data.data[0].namaproduk};
                //         manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produk&byIdJenis="+$scope.item.jenis2Kegiatan.id).then(function(data){
                //             $scope.listJenisKegiatan = data;
                //         });
                //     });
                // });
                var tanggalAkhir=moment($scope.item.tanggalAkhir).format('YYYY-MM-DD');
    			var tanggalAwal=moment($scope.item.tanggalAwal).format('YYYY-MM-DD');
                var idRuangan= stringHelper.isUndefinedObjectField($scope.item.ruangan);
    			var idLayanan= stringHelper.isUndefinedObjectField($scope.item.Layanan);
    			var idInstalasi= stringHelper.isUndefinedObjectField($scope.item.instalasi);

                //manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId).then(function(data){
                manageUC.getDataTableMaster("unit-cost/detail-unit-cost"
                	+'?ruid='+idRuangan
                    +"&idProduk="+idLayanan
                	+"&idDepartemen="+idInstalasi
    				+"&tglawal="+tanggalAwal
    				+"&tglAkhir="+tanggalAkhir).then(function(data){
                    $scope.data1 = data.data.data1;
                    $scope.data2 = data.data.data2;
                    $scope.data3 = data.data.data3;
                    $scope.data4 = data.data.data4;
                    $scope.data5 = data.data.data5;
                    var totalDC1 = 0 ;
                    var totalDC2 = 0 ;
                    var totalDC3 = 0 ;
                    var totalDC4 = 0 ;
                    var totalDC5 = 0 ;
                    for (var i = 0; i <  $scope.data1.length; i++) {
                        totalDC1 = totalDC1 + parseFloat($scope.data1[i].totalbiaya)
                    }
                    for (var i = 0; i <  $scope.data2.length; i++) {
                        totalDC2 = totalDC2 + parseFloat($scope.data2[i].totalbiaya)
                    }
                    for (var i = 0; i <  $scope.data3.length; i++) {
                        totalDC3 = totalDC3 + parseFloat($scope.data3[i].totalbiaya)
                    }
                    for (var i = 0; i <  $scope.data4.length; i++) {
                        totalDC4 = totalDC4 + parseFloat($scope.data4[i].totalbiaya)
                    }
                    for (var i = 0; i <  $scope.data5.length; i++) {
                        totalDC5 = totalDC5 + parseFloat($scope.data5[i].totalbiaya)
                    }
                    $scope.item.totalSubTotal1 =totalDC1
                    $scope.item.totalSubTotal2 =totalDC2
                    $scope.item.totalSubTotal3 =totalDC3
                    $scope.item.totalSubTotal4 =totalDC4
                    $scope.item.totalSubTotal5 =totalDC5
                });
                    
                // }
            }

            function loadCombo(){
                manageUC.getDataTableMaster("unit-cost/table-master?jenis=departemen").then(function(data){
	           		$scope.listinstalasi=data;
	        	});
	        	manageUC.getDataTableMaster("unit-cost/table-master?jenis=ruangan").then(function(data){
	           		$scope.listnamaRuangan=data;
	        	});
	        	// manageUC.getDataTableMaster("unit-cost/table-master?jenis=produk").then(function(data){
	         //   		$scope.listnamaLayanan=data;
	        	// });
            }
            $scope.produkByRuangan =function(){
                manageUC.getDataTableMaster("unit-cost/table-master?jenis=produk&byRuangan="+$scope.item.ruangan.id).then(function(data){
                    $scope.listnamaLayanan = data;
                });
            }
            $scope.ruanganByDepartemen =function(){
                manageUC.getDataTableMaster("unit-cost/table-master?jenis=ruangan&byDepartemen="+$scope.item.instalasi.id).then(function(data){
                    $scope.listnamaRuangan = data;
                });
            }


            function HitungTotalDirect(){
                var totalDC = 0 ;
                if ( $scope.data1 != undefined) {
                    for (var i = 0; i <  $scope.data1.length; i++) {
                        totalDC = totalDC + parseFloat($scope.data1[i].totalbiaya)
                    }
                }
                if ( $scope.data2 != undefined) {
                    for (var i = 0; i <  $scope.data2.length; i++) {
                        totalDC = totalDC + parseFloat($scope.data2[i].totalbiaya)
                    }
                }
                if ( $scope.data3 != undefined) {
                    for (var i = 0; i <  $scope.data3.length; i++) {
                        totalDC = totalDC + parseFloat($scope.data3[i].totalbiaya)
                    }
                }
                if ( $scope.data4 != undefined) {
                    for (var i = 0; i <  $scope.data4.length; i++) {
                        totalDC = totalDC + parseFloat($scope.data4[i].totalbiaya)
                    }
                }
                if ( $scope.data5 != undefined) {
                    for (var i = 0; i <  $scope.data5.length; i++) {
                        totalDC = totalDC + parseFloat($scope.data5[i].totalbiaya)
                    }
                }
                $scope.item.totalDirectCost = totalDC
            }

            
                $scope.column1 = [
                {
                    "field": "jenispegawai",
                    "title": "Jenis Pegawai"
                },
                {
                    "field": "pendidikan",
                    "title": "Pendidikan"
                },
                {
                    "field": "qty",
                    "title": "Jumlah"
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan"
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan"
                },
                {
                    "field": "totalbiaya",
                    "title": "Biaya"
                }
                ];
                $scope.column2 = [
                {
                    "field": "namaruanganfisik",
                    "title": "Ruangan Fisik"
                },
                {
                    "field": "jenisproduk",
                    "title": "Jenis"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama"
                },
                {
                    "field": "qty",
                    "title": "Jumlah"
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan"
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan"
                },
                {
                    "field": "totalbiaya",
                    "title": "Biaya"
                }
                ];
                $scope.column3 = [
                {
                    "field": "namaruanganfisik",
                    "title": "Ruangan Fisik"
                },
                {
                    "field": "jenisproduk",
                    "title": "Jenis"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama"
                },
                {
                    "field": "qty",
                    "title": "Jumlah"
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan"
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan"
                },
                {
                    "field": "totalbiaya",
                    "title": "Biaya"
                }
                ];
                $scope.column4 = [
                {
                    "field": "namaruanganfisik",
                    "title": "Ruangan Fisik"
                },
                {
                    "field": "jenisproduk",
                    "title": "Jenis"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama"
                },
                {
                    "field": "qty",
                    "title": "Jumlah"
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan"
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan"
                },
                {
                    "field": "totalbiaya",
                    "title": "Biaya"
                }
                ];
                $scope.column5 = [
                {
                    "field": "jenisproduk",
                    "title": "Jenis"
                },
                {
                    "field": "namaproduk",
                    "title": "Nama"
                },
                {
                    "field": "qty",
                    "title": "Jumlah"
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan"
                },
                {
                    "field": "hargasatuan",
                    "title": "Harga Satuan"
                },
                {
                    "field": "totalbiaya",
                    "title": "Biaya"
                }
                ];

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            

            

///////////////////////////// -TAMAT- ///////////////////////////

}
]);
});