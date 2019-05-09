    //Owari Start here....
//“Good programmer write code for machine, great programmer write code for other programmer”, laravel
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailKegiatanUnitCostCtrl2', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'MnKeu','DateHelper','$state','CacheHelper','ManageKasir','$mdDialog',
        function($q, $rootScope, $scope, modelItemAkuntansi, mnKeu,dateHelper,$state,cacheHelper,manageKasir,$mdDialog) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};

            $scope.cboPnd2 = true
            $scope.txtHargaSatuan = false
            $scope.txtbiaya = false

            var jenis='';
            //debugger;
            var addDataDetail = [];
            $scope.item.tanggalAwal = $scope.now
            $scope.item.tanggalAkhir = $scope.now

            $scope.dataParams = JSON.parse($state.params.dataFilter);
            var strFilter = $scope.dataParams.splitString;
            var arrFilter = strFilter.split('~');
            var darisini = arrFilter[0];
            var uchId = arrFilter[1];
            jenis='simpan'

            
//             // $scope.dataModelGrid = {};
//             // $scope.dataModelGrid.NamabankAccount = {};
//             // $scope.dataModelGrid.total = {};

//             var status = ""
//             var ttlSsetor = 0;
             loadCombo();
             loadData();

             $scope.kembali = function(){
                $state.go(darisini)
             }
            
            function loadData(){
                if (arrFilter[2] == 'Edit') {
                    manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcost?uchId="+uchId).then(function(data){
                        $scope.item.idKegiatan = data.data[0].id;
                        $scope.item.unitKerja = {'id':data.data[0].ruid,'namaruangan':data.data[0].namaruangan};
                        $scope.item.keterangan = data.data[0].keterangan;
                        $scope.item.totalDirectCost = data.data[0].totaldirect;
                        $scope.item.indirectcost = data.data[0].indirectcost;
                        $scope.item.unitCost = data.data[0].uc;
                        manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produk&byId="+data.data[0].prid).then(function(data){
                            //$scope.listJenisKegiatan = data.data;
                            $scope.item.jenis2Kegiatan ={'id':data.data[0].jpid,'jenisproduk':data.data[0].jenisproduk};
                            $scope.item.jenisKegiatan ={'id':data.data[0].prid,'namaproduk':data.data[0].namaproduk};
                            manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produk&byIdJenis="+$scope.item.jenis2Kegiatan.id).then(function(data){
                                $scope.listJenisKegiatan = data;
                            });
                            manageKasir.getDataTableMaster("unit-cost/table-master?jenis=ruanganfisik&byRuangan="+$scope.item.unitKerja.id).then(function(data){
                                $scope.listRuanganFisik = data;
                            });
                        });
                    });

                    manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId).then(function(data){
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
                    
                }
            }
            
            // $scope.CariPnd = function(){
            //     manageKasir.getDataTableMaster("unit-cost/table-master?jenis=pendidikan&byNama="+$scope.item.txtCariPnd).then(function(data){
            //         $scope.listPendidikan = data;
            //         $scope.listPendidikan ={'id':data.id,'pendidikan':data.pendidikan}
            //         $scope.cboPnd2 = false
            //         $scope.cboPnd = true
            //     });
            // }

            function loadCombo(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=jenispegawai").then(function(data){
                    $scope.listJenisPegawai = data;
                });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=pendidikan").then(function(data){
                    $scope.listPendidikan = data;
                });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=ruangan").then(function(data){
                    $scope.listUnitKerja = data;
                });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=jenisProduk").then(function(data){
                    $scope.listJenis2Kegiatan = data;
                });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=satuan").then(function(data){
                    $scope.listSatuan = data;
                });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=jenisInvestasi").then(function(data){
                    $scope.listJenisInvestasi = data;
                });
                // manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkInvestasi").then(function(data){
                //     $scope.listNamaInvestasi = data;
                // });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=jenisSumberDaya").then(function(data){
                    $scope.listJenisSumberDaya = data;
                });
                // manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkSumberDaya").then(function(data){
                //     $scope.listNamaSumberDaya = data;
                // });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=jenisInstrument").then(function(data){
                    $scope.listJenisInstrument = data;
                });
                // manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkInstrument").then(function(data){
                //     $scope.listNamaInstrument = data;
                // });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=jenisOperasional").then(function(data){
                    $scope.listJenisOperasional = data;
                });
                // manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkOperasional").then(function(data){
                //     $scope.listNamaOperasional = data;
                // });
            }
            $scope.produkByRuangan =function(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produk&byRuangan="+$scope.item.unitKerja.id).then(function(data){
                    $scope.listJenisKegiatan = data;
                });
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=ruanganfisik&byRuangan="+$scope.item.unitKerja.id).then(function(data){
                    $scope.listRuanganFisik = data;
                });
            }
            $scope.ubahJenisProduk =function(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produk&byIdJenis="+$scope.item.jenis2Kegiatan.id).then(function(data){
                    $scope.listJenisKegiatan = data;
                });
            }
            $scope.ubahJenisInvest =function(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkInvestasi&byIdJenis="+$scope.item.jenisInvestasi.id).then(function(data){
                    $scope.listNamaInvestasi = data;
                });
            }
            $scope.ubahJenisSumberDaya =function(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkSumberDaya&byIdJenis="+$scope.item.jenisSumberDaya.id).then(function(data){
                    $scope.listNamaSumberDaya = data;
                });
            }
            $scope.ubahJenisInstrument =function(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkInstrument&byIdJenis="+$scope.item.jenisInstrument.id).then(function(data){
                    $scope.listNamaInstrument = data;
                });
            }
            $scope.ubahJenisOperasional =function(){
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkOperasional&byIdJenis="+$scope.item.jenisOperasional.id).then(function(data){
                    $scope.listNamaOperasional = data;
                });
            }

             $scope.ubahNamaInvestasi =function(){
                $scope.item.satuan ={id:$scope.item.namaInvestasi.ssid,satuanstandar:$scope.item.namaInvestasi.satuanstandar};
            }
            $scope.ubahNamaSumberDaya =function(){
                $scope.item.satuan ={id:$scope.item.namaSumberDaya.ssid,satuanstandar:$scope.item.namaSumberDaya.satuanstandar};
            }
            $scope.ubahNamaInstrument =function(){
                $scope.item.satuan ={id:$scope.item.namaInstrument.ssid,satuanstandar:$scope.item.namaInstrument.satuanstandar};
            }
            $scope.ubahNamaOperasional =function(){
                $scope.item.satuan ={id:$scope.item.namaOperasional.ssid,satuanstandar:$scope.item.namaOperasional.satuanstandar};
            }
//                 
             $scope.$watch('item.biaya', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    // if ($scope.txtHargaSatuan = true){
                    //     $scope.txtHargaSatuan = false
                        //$scope.txtbiaya = true
                        $scope.item.hargaSatuan =parseFloat($scope.item.biaya) / parseFloat($scope.item.jumlah)
                    // }
                }
             });
             $scope.$watch('item.hargaSatuan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    // if ($scope.txtbiaya = true){
                    //     $scope.txtbiaya = false
                        //$scope.txtHargaSatuan = true
                        $scope.item.biaya =parseFloat($scope.item.hargaSatuan) * parseFloat($scope.item.jumlah)
                    // }
                }
             });

             // $scope.$watch('item.jumlah', function(newValue, oldValue) {
             //    if (newValue != oldValue  ) {
             //        if ($scope.txtHargaSatuan = false ) {
             //            $scope.item.biaya =parseFloat($scope.item.hargaSatuan) * parseFloat($scope.item.jumlah)
             //            $scope.txtHargaSatuan = true
             //            $scope.txtbiaya = true    
             //        }else{
             //            $scope.txtHargaSatuan = false
             //            $scope.txtbiaya = false  
             //        }
                    
             //    }
             // });
              $scope.simpanHead = function(){
                //debugger;
                var jenisH='';
                if($scope.item.unitKerja == undefined){
                    alert("Unit Kerja belum di pilih!");
                    return;
                }
                if($scope.item.jenisKegiatan == undefined){
                    alert("jenisKegiatan belum di pilih!");
                    return;
                }
                if($scope.item.keterangan == undefined){
                    alert("keterangan belum di isi!");
                    return;
                }
                if($scope.item.idKegiatan == undefined){
                    jenisH='simpan'
                }else{
                    jenisH='update'
                }
                var objSave = {};
                objSave={
                  "jenis": jenisH,
                  "idKegiatan": $scope.item.idKegiatan,
                  "objectunitkerjafk": $scope.item.unitKerja.id,
                  "objectprodukfk": $scope.item.jenisKegiatan.id,
                  "keterangan": $scope.item.keterangan,
                  "totaldirect": 0//$scope.item.totalDirectCost
                }
                manageKasir.unitcost(objSave).then(function(data){
                    $scope.item.idKegiatan = data.data.id;
                    $scope.item.totalDirectCost = 0;
                    uchId=data.data.id
                    HitungTotalDirect()
                })
            }

            $scope.simpan1 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.item.pendidikan == undefined){
                    alert("pendidikan belum di pilih!");
                    return;
                }
                if($scope.item.jenisPegawai == undefined){
                    alert("error, ulangi proses!");
                    return;
                }
                if($scope.dataSelected1 == undefined){
                    //jenis ='simpan'
                    idDetail = null;
                }else{
                    //jenis ='update'
                    idDetail = $scope.dataSelected1.id
                }

                saveDetail(1,jenis,idDetail,null,null,$scope.item.pendidikan.id,$scope.item.jenisPegawai.id,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=1").then(function(data){
                //     $scope.data1 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
                var totalDC1 = 0 ;
                for (var i = 0; i <  $scope.data1.length; i++) {
                    totalDC1 = totalDC1 + parseFloat($scope.data1[i].totalbiaya)
                }
                $scope.item.totalSubTotal1 =totalDC1
            };
            $scope.simpan2 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.item.namaInvestasi == undefined){
                    alert("namaInvestasi belum di pilih!");
                    return;
                }
                if($scope.item.jenisInvestasi == undefined){
                    alert("jenisInvestasi belum di pilih!");
                    return;
                }
                if($scope.item.ruanganFisik == undefined){
                    alert("error, ulangi proses!");
                    return;
                }
                if($scope.dataSelected2 == undefined){
                    //jenis ='simpan'
                    idDetail = null;
                }else{
                    //jenis ='update'
                    idDetail = $scope.dataSelected2.id
                }

                saveDetail(2,jenis,idDetail,$scope.item.jenisInvestasi.id,$scope.item.namaInvestasi.id,null,null,$scope.item.ruanganFisik.id);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=2").then(function(data){
                //     $scope.data2 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
                var totalDC2 = 0 ;
                for (var i = 0; i <  $scope.data2.length; i++) {
                    totalDC2 = totalDC2 + parseFloat($scope.data2[i].totalbiaya)
                }
                $scope.item.totalSubTotal2 =totalDC2
            };

            $scope.simpan3 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.item.ruanganFisik == undefined){
                    alert("error, ulangi proses!");
                    return;
                }
                if($scope.item.namaSumberDaya == undefined){
                    alert("namaSumberDaya belum di pilih!");
                    return;
                }
                if($scope.item.jenisSumberDaya == undefined){
                    alert("jenisSumberDaya belum di pilih!");
                    return;
                }
                if($scope.dataSelected3 == undefined){
                    //jenis ='simpan'
                    idDetail = null;
                }else{
                    //jenis ='update'
                    idDetail = $scope.dataSelected3.id
                }

                saveDetail(3,jenis,idDetail,$scope.item.jenisSumberDaya.id,$scope.item.namaSumberDaya.id,null,null,$scope.item.ruanganFisik.id);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=3").then(function(data){
                //     $scope.data3 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
                var totalDC3 = 0 ;
                for (var i = 0; i <  $scope.data3.length; i++) {
                    totalDC3 = totalDC3 + parseFloat($scope.data3[i].totalbiaya)
                }
                $scope.item.totalSubTotal3 =totalDC3
            };
            $scope.simpan4 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.item.ruanganFisik == undefined){
                    alert("error, ulangi proses!");
                    return;
                }
                if($scope.item.namaInstrument == undefined){
                    alert("namaInstrument belum di pilih!");
                    return;
                }
                if($scope.item.jenisInstrument == undefined){
                    alert("jenisInstrument belum di pilih!");
                    return;
                }
                if($scope.dataSelected4 == undefined){
                    //jenis ='simpan'
                    idDetail = null;
                }else{
                    //jenis ='update'
                    idDetail = $scope.dataSelected4.id
                }

                saveDetail(4,jenis,idDetail,$scope.item.jenisInstrument.id,$scope.item.namaInstrument.id,null,null,$scope.item.ruanganFisik.id);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=4").then(function(data){
                //     $scope.data4 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
                var totalDC4 = 0 ;
                for (var i = 0; i <  $scope.data4.length; i++) {
                    totalDC4 = totalDC4 + parseFloat($scope.data4[i].totalbiaya)
                }
                $scope.item.totalSubTotal4 =totalDC4
            };
            $scope.simpan5 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.item.namaOperasional == undefined){
                    alert("namaOperasional belum di pilih!");
                    return;
                }
                if($scope.item.jenisOperasional == undefined){
                    alert("jenisOperasional belum di pilih!");
                    return;
                }
                if($scope.dataSelected5 == undefined){
                    //jenis ='simpan'
                    idDetail = null;
                }else{
                    //jenis ='update'
                    idDetail = $scope.dataSelected5.id
                }

                saveDetail(5,jenis,idDetail,$scope.item.jenisOperasional.id,$scope.item.namaOperasional.id,null,null,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=5").then(function(data){
                //     $scope.data5 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
                var totalDC5 = 0 ;
                for (var i = 0; i <  $scope.data5.length; i++) {
                    totalDC5 = totalDC5 + parseFloat($scope.data5[i].totalbiaya)
                }
                $scope.item.totalSubTotal5 =totalDC5
            };

            function saveDetail(idJenisUC,jenis,idDetail,idJenisProduk,idProduk,idPendidikan,idJenisPegawai,idRuanganFisik){
                var satuansss = null
                if($scope.item.unitKerja == undefined){
                    alert("Unit Kerja belum di pilih!");
                    return;
                }
                if($scope.item.satuan != undefined){
                    satuansss =$scope.item.satuan.id
                }
                if($scope.item.satuan != ''){
                    satuansss =$scope.item.satuan.id
                }
                if($scope.item.jumlah == undefined){
                    alert("jumlah belum di isi!");
                    return;
                }
                if($scope.item.hargaSatuan == undefined){
                    alert("hargaSatuan belum di isi!");
                    return;
                }
                if($scope.item.idKegiatan == undefined){
                    alert("error, ulangi proses!");
                    return;
                }


                var objSaveD = {};
                objSaveD={
                  "jenisDetail": jenis,
                  "idKegiatanDetail": idDetail,
                  "objectkegiatanunitcosthfk": uchId,
                  "objectjenisunitcostfk": idJenisUC,
                  "objectjenispegawaifk": idJenisPegawai,
                  "objectpendidikanfk": idPendidikan,
                  "objectruanganfisikfk": idRuanganFisik,
                  "objectjenisprodukfk": idJenisProduk,
                  "objectprodukfk": idProduk,
                  "qty": parseFloat($scope.item.jumlah),
                  "objectsatuanfk": satuansss,
                  "hargasatuan": parseFloat($scope.item.hargaSatuan),
                  "totalbiaya": parseFloat($scope.item.biaya)
                }
                manageKasir.unitcostdetail(objSaveD).then(function(){
                    manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD="+idJenisUC).then(function(data){
                        if (idJenisUC==1) {$scope.data1 = data.data.data1};
                        if (idJenisUC==2) {$scope.data2 = data.data.data2};
                        if (idJenisUC==3) {$scope.data3 = data.data.data3};
                        if (idJenisUC==4) {$scope.data4 = data.data.data4};
                        if (idJenisUC==5) {$scope.data5 = data.data.data5};
                        HitungTotalDirect()
                        kosongTxt()
                    });
                })

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
// // select * from strukbuktipenerimaan_t where nosbm='RV-17050000059'
// // select * from strukclosing_t where norec='a1abea20-3b81-11e7-adf8-a9342a4e'
// // select * from strukclosingkasir_t
// // select * from strukclosingkasirstbank_t  where strukclosingfk='a1abea20-3b81-11e7-adf8-a9342a4e'

// // select * from strukhistori_t where norec in ('a1ae4100-3b81-11e7-a45d-cd183d14')

// // select * from loginuser_s where id=77
// // select * from pegawai_m where id=349
            $scope.klik1 = function(dataSelected1){
                $scope.item.jenisPegawai ={'id':dataSelected1.jpgid,'jenispegawai':dataSelected1.jenispegawai}
                $scope.item.pendidikan ={'id':dataSelected1.pdid,'pendidikan':dataSelected1.pendidikan}
                $scope.item.jumlah =dataSelected1.qty
                $scope.item.satuan ={'id':dataSelected1.stid,'satuanstandar':dataSelected1.satuanstandar}
                $scope.item.hargaSatuan =dataSelected1.hargasatuan
                $scope.item.biaya =dataSelected1.totalbiaya
                jenis ='update'
            }
            $scope.klik2 = function(dataSelected2){
                $scope.item.jenisInvestasi ={'id':dataSelected2.jpid,'jenisproduk':dataSelected2.jenisproduk}
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkInvestasi&byIdJenis="+$scope.item.jenisInvestasi.id).then(function(data){
                    $scope.listNamaInvestasi = data;
                    $scope.item.namaInvestasi ={'id':dataSelected2.prid,'namaproduk':dataSelected2.namaproduk}
                });
                
                $scope.item.jumlah =dataSelected2.qty
                $scope.item.satuan ={'id':dataSelected2.stid,'satuanstandar':dataSelected2.satuanstandar}
                $scope.item.hargaSatuan =dataSelected2.hargasatuan
                $scope.item.biaya =dataSelected2.totalbiaya
                $scope.item.ruanganFisik ={'id':dataSelected2.rfid,'namaruanganfisik':dataSelected2.namaruanganfisik}
                jenis ='update'
            }
            $scope.klik3 = function(dataSelected3){
                $scope.item.jenisSumberDaya ={'id':dataSelected3.jpid,'jenisproduk':dataSelected3.jenisproduk}
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkSumberDaya&byIdJenis="+$scope.item.jenisSumberDaya.id).then(function(data){
                    $scope.listNamaSumberDaya = data;
                $scope.item.namaSumberDaya ={'id':dataSelected3.prid,'namaproduk':dataSelected3.namaproduk}
                });
                $scope.item.jumlah =dataSelected3.qty
                $scope.item.satuan ={'id':dataSelected3.stid,'satuanstandar':dataSelected3.satuanstandar}
                $scope.item.hargaSatuan =dataSelected3.hargasatuan
                $scope.item.biaya =dataSelected3.totalbiaya
                $scope.item.ruanganFisik ={'id':dataSelected3.rfid,'namaruanganfisik':dataSelected3.namaruanganfisik}
                jenis ='update'
            }
            $scope.klik4 = function(dataSelected4){
                $scope.item.jenisInstrument ={'id':dataSelected4.jpid,'jenisproduk':dataSelected4.jenisproduk}
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkInstrument&byIdJenis="+$scope.item.jenisInstrument.id).then(function(data){
                    $scope.listNamaInstrument = data;
                    $scope.item.namaInstrument ={'id':dataSelected4.prid,'namaproduk':dataSelected4.namaproduk}
                });
                $scope.item.jumlah =dataSelected4.qty
                $scope.item.satuan ={'id':dataSelected4.stid,'satuanstandar':dataSelected4.satuanstandar}
                $scope.item.hargaSatuan =dataSelected4.hargasatuan
                $scope.item.biaya =dataSelected4.totalbiaya
                $scope.item.ruanganFisik ={'id':dataSelected4.rfid,'namaruanganfisik':dataSelected4.namaruanganfisik}
                jenis ='update'
            }
            $scope.klik5 = function(dataSelected5){
                $scope.item.jenisOperasional ={'id':dataSelected5.jpid,'jenisproduk':dataSelected5.jenisproduk}
                manageKasir.getDataTableMaster("unit-cost/table-master?jenis=produkOperasional&byIdJenis="+$scope.item.jenisOperasional.id).then(function(data){
                    $scope.listNamaOperasional = data;
                    $scope.item.namaOperasional ={'id':dataSelected5.prid,'namaproduk':dataSelected5.namaproduk}
                });
                $scope.item.jumlah =dataSelected5.qty
                $scope.item.satuan ={'id':dataSelected5.stid,'satuanstandar':dataSelected5.satuanstandar}
                $scope.item.hargaSatuan =dataSelected5.hargasatuan
                $scope.item.biaya =dataSelected5.totalbiaya
                jenis ='update'
            }
            $scope.hapus1 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.dataSelected1 == undefined){
                     alert("Data belum di pilih!");
                     return;
                }else{
                    jenis ='hapus'
                    idDetail = $scope.dataSelected1.id
                }

                saveDetail(1,jenis,idDetail,null,null,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=1").then(function(data){
                //     $scope.data1 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
            };
            $scope.hapus2 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.dataSelected2 == undefined){
                     alert("Data belum di pilih!");
                     return;
                }else{
                    jenis ='hapus'
                    idDetail = $scope.dataSelected2.id
                }

                saveDetail(2,jenis,idDetail,null,null,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=2").then(function(data){
                //     $scope.data2 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
            };
            $scope.hapus3 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.dataSelected3 == undefined){
                     alert("Data belum di pilih!");
                     return;
                }else{
                    jenis ='hapus'
                    idDetail = $scope.dataSelected3.id
                }

                saveDetail(3,jenis,idDetail,null,null,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=3").then(function(data){
                //     $scope.data3 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
            };
            $scope.hapus4 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.dataSelected4 == undefined){
                     alert("Data belum di pilih!");
                     return;
                }else{
                    jenis ='hapus'
                    idDetail = $scope.dataSelected4.id
                }

                saveDetail(4,jenis,idDetail,null,null,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=4").then(function(data){
                //     $scope.data4 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
            };
            $scope.hapus5 = function(){
                //var jenis='';
                var idDetail ='';
                 
                if($scope.dataSelected5 == undefined){
                     alert("Data belum di pilih!");
                     return;
                }else{
                    jenis ='hapus'
                    idDetail = $scope.dataSelected5.id
                }

                saveDetail(5,jenis,idDetail,null,null,null);
                // manageKasir.getDataTableMaster("unit-cost/kegiatan-unitcostdetail?uchId="+uchId+"&uchIdD=5").then(function(data){
                //     $scope.data5 = data;
                //     HitungTotalDirect()
                //     kosongTxt()
                // });
            };
            function kosongTxt(){
                $scope.item.pendidikan=''
                $scope.item.jenisPegawai =''
                $scope.item.ruanganFisik =''
                $scope.item.jenisInvestasi=''
                $scope.item.namaInvestasi=''
                $scope.item.jenisSumberDaya=''
                $scope.item.namaSumberDaya=''
                $scope.item.jenisInstrument=''
                $scope.item.namaInstrument=''
                $scope.item.jenisOperasional=''
                $scope.item.namaOperasional=''
                $scope.item.satuan=''
                $scope.item.jumlah=0
                $scope.item.hargaSatuan=0
                $scope.item.biaya=0
                jenis ='simpan'
            }
            $scope.batal =function(){
               kosongTxt()
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