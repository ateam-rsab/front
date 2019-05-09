define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AsuhanKeperawatanPeriOperatifCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'ManageSdm', 'DateHelper', 'CetakBedah',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien, ManageSdm, dateHelper, CetakBedah) {
            $scope.isLoadingData = true;
            $scope.item={};
            $scope.isLoadingData = true;
            $scope.AllData = false;
            $scope.isReport = true;

            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });
            ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                $scope.DiagnosaTindakan = data;
            });
            ManageSdm.getOrderList("pegawai/get-all-dokter2").then(function(dat) {
                $scope.listDataDokter = dat.data.data;
            });
            ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaExternal").then(function(dat) {
                $scope.listDataPegawai = dat.data;
            });

             findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {   
             $scope.item.pasien = data.data.pasien;
             $scope.isLoadingData = false;
             $scope.AllData = true;
             });
            
            $scope.listTindakan=[{"id" : 1,"name": "Bedah Jantung (Dummy)"}];
            findPasien.getAsuhanKeperawatan().then(function(data){
              debugger
                $scope.listData = data.data.data.LoadData;
                $scope.arrData=$scope.listData[0].detail;
                $scope.arrDataIntervensi=$scope.listData[1].detail;
                $scope.arrDataEvaluasi=$scope.listData[2].detail;
                $scope.arrDataPernafasan=$scope.listData[0].detail[8];
            });

             $scope.loadGrid = function(){
              debugger
                findPasien.getLoadAskepPeriOperatif($state.params.noRec).then(function(data) {
                  if(data.data.data != undefined){
                   $scope.dataMaster = data.data.data.listData;
                  $scope.dataSource = new kendo.data.DataSource({
                  pageSize:50,
                  data : $scope.dataMaster,
                  $scrollable : true
                   });
                  }
                });
              }
              $scope.loadGrid();

            $scope.isChecked;
            $scope.klik = function(dataSelected){
              debugger
              $scope.isChecked;
              if (dataSelected != undefined){
               $scope.item.ModeEdit = true;
               $scope.item.idCheckin = dataSelected.noTrans;
               $scope.Keytransaksi = dataSelected.noTrans;
               findPasien.getSubLoadAskepPeriOperatif($scope.item.idCheckin).then(function(data) {
                debugger
                toastr.info("1 Dipilih");
                $scope.subdatamaster = data.data.data;
                $scope.NoTransaksi = $scope.subdatamaster.noTrans;
                $scope.NorecInduk = $scope.subdatamaster.noRec;
                debugger
                $scope.item.jamMasukOperasi =$scope.subdatamaster.jamMasukOperasi;
                $scope.item.operasiMulai = $scope.subdatamaster.operasiMulai;
                $scope.item.operasiSelesai = $scope.subdatamaster.operasiSelesai;
                $scope.item.tindakan = $scope.subdatamaster.tindakan;
                $scope.item.diagnosaPreOperasi =  $scope.subdatamaster.diagnosaPreOperasi;
                $scope.item.diagnosaPostOperasi = $scope.subdatamaster.diagnosaPostOperasi
                
                $scope.item.asistenBedah = {
                  id:$scope.subdatamaster.idAsistenBedah,
                   namaLengkap:$scope.subdatamaster.nameAsistenBedah
                 };
                
                $scope.item.perawatInstrumen1 = {
                  id : $scope.subdatamaster.idPerawatInstrumen1,
                   namaExternal : $scope.subdatamaster.namePerawatInstrumen1
                 };
                
                $scope.item.perawatInstrumen2 = {
                  id : $scope.subdatamaster.idPerawatInstrumen2,
                    namaExternal : $scope.subdatamaster.namePerawatInstrumen2
                }
                $scope.item.perawatSirkuler = {
                   id :$scope.subdatamaster.idPerawatSirkuler,
                   namaExternal : $scope.subdatamaster.namePerawatSirkuler
                 }
                
                $scope.item.operatorAlatCanggih = {
                  id: $scope.subdatamaster.idOperatorAlatCanggih,
                   namaExternal : $scope.subdatamaster.nameOperatorAlatCanggih
               }
                $scope.item.dokterBedah = {
                  id : $scope.subdatamaster.idDokterBedah,
                   namaLengkap : $scope.subdatamaster.nameDokterBedah
                }
               
                $scope.item.tanggalOperasi = new moment(new Date($scope.subdatamaster.tanggal)).format('YYYY-MM-DD');
                $scope.checkedListData = [];
                $scope.subdatamaster.loadData[0].detail.forEach(function(data){    
                debugger 
                $scope.arrData.forEach(function(parente){
                  debugger
                   if(parente.id == data.id){
                      var parentedata = {
                        "id" : data.id,
                        "namaExternal" : data.namaExternal,
                        "name" : data.keterangan,
                        "noRec" : data.noRec,
                        "noTrans" : data.noTrans,
                        "statusEnabled" : true
                      }
                      $scope.checkedListData.push(parentedata)
                    }
                        if(parente.detail.length !=0){
                               parente.detail.forEach(function(subparente){
                                debugger
                                  if (subparente.id == data.id){
                                         var dataid =  {
                                                    "id" : data.id,
                                                    "name" : data.keterangan,
                                                    "namaExternal" : data.namaExternal,
                                                    "noRec" : data.noRec,
                                                    "noTrans" : data.noTrans,
                                                    "statusEnabled" : true
                                                      }
                                    $scope.checkedListData.push(dataid)
                                  }
                                })
                               }
                           }) 
                      })

                $scope.subdatamaster.loadData[1].detail.forEach(function(dataIntervensi){
                 $scope.arrDataIntervensi.forEach(function(eIntervensi){
                 if (eIntervensi.id == dataIntervensi.id){
                   var dataIntervensiid =  {
                                      "id" : dataIntervensi.id,
                                      "namaExternal" : dataIntervensi.namaExternal,
                                      "name" : dataIntervensi.keterangan,
                                      "noRec" : dataIntervensi.noRec,
                                      "noTrans" : dataIntervensi.noTrans,
                                      "statusEnabled" : true
                                   }
                      $scope.checkedListData.push(dataIntervensiid)
                    }
                  })
                  
                 })
                $scope.subdatamaster.loadData[2].detail.forEach(function(dataEvaluasi){
                 $scope.arrDataEvaluasi.forEach(function(eEvaluasi){
                 if (eEvaluasi.id == dataEvaluasi.id){
                   var dataEvaluasiid =  {
                                      "id" : dataEvaluasi.id,
                                      "name" : dataEvaluasi.keterangan,
                                      "namaExternal" : dataEvaluasi.namaExternal,
                                      "noRec" : dataEvaluasi.noRec,
                                      "noTrans" : dataEvaluasi.noTrans,
                                      "statusEnabled" : true
                                   }
                      $scope.checkedListData.push(dataEvaluasiid)
                    }
                  })
                })
                $scope.isChecked();
                $scope.subdatamaster.loadData[1].detail;
                $scope.subdatamaster.loadData[2].detail;
                });
               }
              }

            $scope.isChecked = function(id, bool){
            if(bool == undefined){
              var SARUA_KEUN_JANG = false;
              for (var y = 0; y<$scope.checkedListData.length; y++){      
                   if ($scope.checkedListData[y].id == id){
                    SARUA_KEUN_JANG = true;
                   }
                }
              return SARUA_KEUN_JANG;

            }
            else if(bool == true){
              var SARUA_KEUN_JANG = false;
              for (var y = 0; y<$scope.checkedListData.length; y++){      
                   if ($scope.checkedListData[y].id == id){
                    SARUA_KEUN_JANG = true;
                   }
                }
              return SARUA_KEUN_JANG;
             }else{
              var SARUA_KEUN_JANG = false;
                for(var x = 0; x<$scope.checkedListData.length; x++){
                    if($scope.checkedlistdata[x].id == id){
                      SARUA_KEUN_JANG;    
                    }  
                }
               return SARUA_KEUN_JANG;
             }
            };


            $state.params.noRec;
             $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }
            $scope.columnAskep = [
                    // {
                    //     "field": "noRec",
                    //     "title": "N o r e k"
                    // },

                    {
                        "field": "noTrans",
                        "title": "No. Transaksi"
                    }
              ];

        // ================================================================================================
        // * keterangan untuk temporary checkedlistdata ketika uncheck tidak benar2 men-slice melainkan hanya 
        //   mengganti status enabled menjadi false begitu juga dgn check merubah menjadi true
        // =================================================================================================

        $scope.checkedListData = [];
        $scope.checkedData = function(bool, item) {
          debugger
              if(bool){
                debugger
                item.value = true;
                if (item.detaildetail){
                     item.detaildetail.forEach(function(f){
                             $scope.checkedListData.forEach(function(data){
                                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                    if($scope.checkedListData[i].name == f.namaExternal){
                                        $scope.checkedListData.splice(i,1);
                                    }
                                }
                            })
                             f.statusEnabled = true;
                            $scope.checkedListData.push(f)
                         })
                      item.statusEnabled = true;
                     $scope.checkedListData.push(item)
                 }else{
                  debugger
                 if(item.detail!=undefined){
                  if(item.detail[0]!=undefined){
                    if(item.detail[0].namaExternal != undefined){
                       item.detail.forEach(function(e){
                          debugger;
                               $scope.checkedListData.forEach(function(data){
                                  for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                    debugger
                                      if($scope.checkedListData[i].name == e.namaExternal){
                                          $scope.checkedListData.splice(i,1);
                                          }
                                      }//end for
                                })
                                   e.statusEnabled = true
                                   $scope.checkedListData.push(e)
                             })
                       item.statusEnabled = true
                       $scope.checkedListData.push(item);
                  }else{
                    debugger
                    if (item.detail!=0) {
                        if(item.detail[0]!=undefined){
                        item.detail.forEach(function(e){
                            debugger
                            if(e.detaildetail != undefined){
                                 e.detaildetail.forEach(function(h){
                                    debugger;
                                   $scope.checkedListData.forEach(function(data){
                                      for(var i=0 ; i< $scope.checkedListData.length; i++) {
                                        if($scope.checkedListData[i].name == h.namaExternal){
                                            $scope.checkedListData.splice(i,1);
                                            }
                                          }
                                        })
                                      h.statusEnabled = true
                                     $scope.checkedListData.push(h)
                                   })
                                 }
                             $scope.checkedListData.forEach(function(data){
                                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                    debugger
                                    if($scope.checkedListData[i].name == e.name){
                                        $scope.checkedListData.splice(i,1);
                                        }
                                      }
                                  })
                             e.statusEnabled = true
                            $scope.checkedListData.push(e)
                             })
                            item.statusEnabled = true
                            $scope.checkedListData.push(item);
                         }else{
                          item.statusEnabled = true
                          $scope.checkedListData.push(item);
                          }
                            } else {
                                item.statusEnabled = true
                                $scope.checkedListData.push(item);
                             }
                          }
                      }else{
                            item.statusEnabled = true
                            $scope.checkedListData.push(item);
                      }
                      }else{
                            item.statusEnabled = true
                            $scope.checkedListData.push(item);
                      }
                        }
                        //else bool
                     }else{
                    if(item.detaildetail !=undefined){
                      debugger
                            if(item.detaildetail != 0){
                            item.detaildetail.forEach(function(x){
                                $scope.checkedListData.forEach(function(data){
                                    for(var w=0; w<$scope.checkedListData.length; w++){
                                        debugger
                                        if($scope.checkedListData[w].id == x.id){
                                           var GetnoRec = $scope.checkedListData[w].noRec;
                                            $scope.checkedListData.splice(x,1);
                                             var SetDataForTempToFalse = x;
                                                SetDataForTempToFalse.statusEnabled = false;
                                               SetDataForTempToFalse.value = false;
                                              SetDataForTempToFalse.noRec = GetnoRec;
                                             $scope.checkedListData.push(SetDataForTempToFalse);
                                        }
                                    }
                                })
                            })
                            $scope.checkedListData.forEach(function(data){
                                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                    debugger
                                    if($scope.checkedListData[i].id == item.id){
                                      var GetnoRec = $scope.checkedListData[i].noRec;
                                      $scope.checkedListData.splice(i,1);
                                         var SetDataForTempToFalse = item;
                                           SetDataForTempToFalse.statusEnabled = false;
                                          SetDataForTempToFalse.value = false;
                                        SetDataForTempToFalse.noRec = GetnoRec;
                                       $scope.checkedListData.push(SetDataForTempToFalse);
                                    }
                                }
                            })
                           }else{
                            //remove jika item.detaildetail tidakn  sama dengan 0
                            $scope.checkedListData.forEach(function(data){
                                  for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                      debugger
                                    if($scope.checkedListData[i].id == item.id){
                                     var GetnoRec = $scope.checkedListData[i].noRec;
                                        $scope.checkedListData.splice(i,1);
                                         var SetDataForTempToFalse = item;
                                           SetDataForTempToFalse.statusEnabled = false;
                                          SetDataForTempToFalse.value = false;
                                        SetDataForTempToFalse.noRec = GetnoRec;
                                       $scope.checkedListData.push(SetDataForTempToFalse);
                                    }
                                }
                            })
                           }
                          }else if(item.detail != undefined){
                              if (item.detail != 0) {
                                  item.detail.forEach(function(e){
                                    //Cek Apakah ada turunan ke 3??
                                    if(e.detaildetail != undefined){
                                      e.detaildetail.forEach(function(h){
                                        $scope.checkedListData.forEach(function(data){
                                          for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                              debugger
                                              if($scope.checkedListData[i].name == h.name){
                                                var GetnoRec = $scope.checkedListData[i].noRec;
                                                  $scope.checkedListData.splice(i,1);
                                                   var SetDataForTempToFalse = h;
                                                    SetDataForTempToFalse.statusEnabled = false;
                                                   SetDataForTempToFalse.value = false;
                                                  SetDataForTempToFalse.noRec = GetnoRec;
                                                  $scope.checkedListData.push(SetDataForTempToFalse);
                                              }
                                           }  
                                        })
                                      })
                                    }
                                      $scope.checkedListData.forEach(function(data){
                                          for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                              debugger
                                              if($scope.checkedListData[i].name == e.name){
                                                var GetnoRec = $scope.checkedListData[i].noRec;
                                                  $scope.checkedListData.splice(i,1);
                                                   var SetDataForTempToFalse = e;
                                                    SetDataForTempToFalse.statusEnabled = false;
                                                   SetDataForTempToFalse.value = false;
                                                 SetDataForTempToFalse.noRec = GetnoRec;
                                                $scope.checkedListData.push(SetDataForTempToFalse);
                                              }
                                          }
                                      })
                                  })
                                $scope.checkedListData.forEach(function(data){
                                      for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                          debugger
                                          if($scope.checkedListData[i].id == item.id){
                                            var GetnoRec = $scope.checkedListData[i].noRec;
                                              $scope.checkedListData.splice(i,1);
                                               var SetDataForTempToFalse = item;
                                                SetDataForTempToFalse.statusEnabled = false;
                                               SetDataForTempToFalse.value = false;
                                              SetDataForTempToFalse.noRec = GetnoRec;
                                            $scope.checkedListData.push(SetDataForTempToFalse);
                                          }
                                      }
                                  })

                              }else{
                                    $scope.checkedListData.forEach(function(data){
                                          for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                              debugger
                                              if($scope.checkedListData[i].id == item.id){
                                                var GetnoRec = $scope.checkedListData[i].noRec;
                                                  $scope.checkedListData.splice(i,1);
                                                  var SetDataForTempToFalse = item;
                                                   SetDataForTempToFalse.statusEnabled = false;
                                                 SetDataForTempToFalse.value = false;
                                                SetDataForTempToFalse.noRec = GetnoRec;
                                             $scope.checkedListData.push(SetDataForTempToFalse);
                                              }
                                          }
                                      })
                                    }
                        }else{
                        $scope.checkedListData.forEach(function(data){
                            for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                debugger
                                if($scope.checkedListData[i].id == item.id){
                                  var GetnoRec = $scope.checkedListData[i].noRec;
                                    $scope.checkedListData.splice(i,1);
                                    var SetDataForTempToFalse = item;
                                     SetDataForTempToFalse.statusEnabled = false;
                                     SetDataForTempToFalse.value = false;
                                   SetDataForTempToFalse.noRec = GetnoRec;
                                  $scope.checkedListData.push(SetDataForTempToFalse);
                                }
                            }
                            if(item.id==34){
                                $scope.inputNadi=false;
                                $scope.item.nadi="";
                            }
                            if(item.id==35){
                                $scope.inputPernafasan=false;
                                $scope.item.pernafasan="";
                            }
                        })
                    }
                }
            };
            
            $scope.cetak = function(){
            $scope.item.tglAnastesi = new Date();
            var urlLaporan = CetakBedah.open("");
            window.open(urlLaporan, '_blank');
            }

            $scope.Save=function() {
            debugger;
            if($scope.item.diagnosaPreOperasi == undefined){
                $scope.item.diagnosaPreOperasi = {namaExternal : ""} 
             }
              if( $scope.item.diagnosaPostOperasi == undefined){
                 $scope.item.diagnosaPostOperasi = {namaExternal : ""} 
             }
            if($scope.item.tindakan == undefined){
                 $scope.item.tindakan = {name : ""} 
             }
            if($scope.item.dokterBedah == undefined){
                 $scope.item.dokterBedah = {id : 1} 
             }
             if($scope.item.asistenBedah == undefined){
                 $scope.item.asistenBedah = {id : 1} 
             }
              if($scope.item.perawatInstrumen1 == undefined){
                 $scope.item.perawatInstrumen1 = {id : 1} 
             }
            if($scope.item.perawatInstrumen2 == undefined){
                 $scope.item.perawatInstrumen2 = {id : 1} 
             }
            if($scope.item.perawatSirkuler == undefined){
                 $scope.item.perawatSirkuler = {id : 1} 
             }
            if($scope.item.operatorAlatCanggih == undefined){
                 $scope.item.operatorAlatCanggih = {id : 1} 
             }
                var dataAsuhan = [];
                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                  debugger
                  if ($scope.checkedListData[i].id !=undefined) {
                    if($scope.checkedListData[i].id!=34 || $scope.checkedListData[i].id!=35){
                        var dat =  {
                            "objekDataMasalah":{
                                "id": $scope.checkedListData[i].id
                              },
                                "flagHeader" : "Asuhan",
                                "flagasuhan" : "Data & Masalah Keperawatan",
                                "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                                "noRec" : $scope.checkedListData[i].noRec,
                                "keterangan" : $scope.checkedListData[i].name,
                                "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                            
                        }
                    }
        
                    if($scope.checkedListData[i].id == 34){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "flagHeader" : "Asuhan",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "keterangan": $scope.item.nadi,
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 35){
                        var dat = {
                            "objekDataMasalah":{
                                "id": $scope.checkedListData[i].id
                            },
                            "flagHeader" : "Asuhan",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "keterangan": $scope.item.pernafasan,
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    dataAsuhan.push(dat)
                  }
                } 

                if($scope.item.ModeEdit == true){
                var jamMasukOperasi = $scope.item.jamMasukOperasi;
                var jamMulaiOperasi = $scope.item.operasiMulai;
                var jamSelesaiOperasi = $scope.item.operasiSelesai;
                }else{
                var jamMasukOperasi = dateHelper.formatDate($scope.item.jamMasukOperasi,"HH:mm")
                var jamMulaiOperasi = dateHelper.formatDate($scope.item.operasiMulai,"HH:mm")
                var jamSelesaiOperasi = dateHelper.formatDate($scope.item.operasiSelesai,"HH:mm")
                }

                var data =  {
                            "pasienDaftar" : {"noRec" : $state.params.noRec},
                            "noRec" : $scope.NorecInduk,
                            "noTrans" : $scope.Keytransaksi,
                            //"ruangan" : {"id" : $scope.item.ruangantujuan},
                            "jamMasukOperasi" : jamMasukOperasi,
                            "operasiMulai" : jamMulaiOperasi,
                            "operasiSelesai" : jamSelesaiOperasi,
                            "tanggal" : dateHelper.formatDate($scope.item.tanggalOperasi,"YYYY-MM-DD"),
                            "diagnosaPreOperasi" :  $scope.item.diagnosaPreOperasi,
                            "diagnosaPostOperasi" : $scope.item.diagnosaPostOperasi,
                            "tindakan" : $scope.item.tindakan,
                            "dokterBedah" : {"id" : $scope.item.dokterBedah.id},
                            "asistenBedah" : {"id" : $scope.item.asistenBedah.id},
                            "perawatInstrumen1" : {"id" : $scope.item.perawatInstrumen1.id},
                            "perawatInstrument2" : {"id" : $scope.item.perawatInstrumen2.id},
                            "perawatSirkuler" : {"id" : $scope.item.perawatSirkuler.id},
                            "operatorAlatCanggih" : {"id" : $scope.item.operatorAlatCanggih.id},
                            "statusEnabled" : "true",
                            "asuhanTrans" : dataAsuhan
                            }
                          // console.log(JSON.stringify(data));
                          managePasien.saveAsuhanKeperawatan(data).then(function(e){
                            $scope.loadGrid();
                          })
                    }
               }
           ]);
       });