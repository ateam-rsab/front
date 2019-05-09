define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('IntraOperasiAnestesiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'ManageSdm', 'DateHelper','CetakBedah',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien, ManageSdm, dateHelper,CetakBedah) {
        $scope.isLoadingData = true;
        $scope.AllData = false;
        $scope.item={};
        $scope.isReport = true;

        ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
            $scope.sourceDiagnosisPrimer = data;
        });
        ManageSdm.getOrderList("pegawai/get-all-dokter2").then(function(dat) {
            $scope.listDataDokter = dat.data.data;
        });
        ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaExternal").then(function(dat) {
            $scope.listDataPegawai = dat.data;
        });
        findPasien.getPasienBedah().then(function(data){
        });
        ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                $scope.DiagnosaTindakan = data;
         });
            

        findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {   
        $scope.item.pasien = data.data.pasien;
        $scope.isLoadingData = false;
        $scope.AllData = true;
        });



       $scope.loadGrid = function(){
        debugger
        findPasien.getAntrianIntraOperasiAnestesiRevs($state.params.noRec).then(function(data) {
         debugger
          if(data.data.data != undefined){
           $scope.dataMaster = data.data.data.listData;
          debugger
          $scope.dataSource = new kendo.data.DataSource({
          pageSize:50,
          data : $scope.dataMaster,
          $scrollable : true
           });
          }
          });
        }
        $scope.loadGrid();


           $scope.klik = function(dataSelected){
              debugger
            $scope.isChecked;
            $scope.item = {};
              if (dataSelected != undefined){
               $scope.item.ModeEdit = true;
               $scope.item.idCheckin = dataSelected.noTrans;
               $scope.Keytransaksi = dataSelected.noTrans;
               findPasien.getSubAntrianIntraOperasiAnestesiRevs($scope.item.idCheckin).then(function(data) {
                debugger
                toastr.info("1 Dipilih");
                $scope.subdatamaster = data.data.data;
                $scope.item.jamMasukOperasi = $scope.subdatamaster.jamMasukOperasi;
                $scope.noRecInduk = $scope.subdatamaster.noRec;
                $scope.KondisiJam = $scope.subdatamaster.jamMasukOperasi;
                $scope.checkedListData = [];
                $scope.subdatamaster.loadData[0].detail.forEach(function(data){
                  $scope.Masalah.forEach(function(e){
                     if (e.id == data.id){
                        var dataid =  {
                                        "id" : data.id,
                                        "keterangan" : data.keterangan,
                                        "namaExternal" : data.namaExternal,
                                        "noRec" : data.noRec,
                                        "noTrans" : data.noTrans,
                                        "statusEnabled" : true
                                        }
                        $scope.checkedListData.push(dataid)
                      }
                          if(e.detail.length !=0){
                               e.detail.forEach(function(subparente){
                                  if (subparente.id == data.id){
                                         var dataid =  {
                                                    "id" : data.id,
                                                    "keterangan" : data.keterangan,
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
                $scope.subdatamaster.loadData[1].detail.forEach(function(data){
                  $scope.Intervensi.forEach(function(eIntervensi){
                     if (eIntervensi.id == data.id){
                        var dataid2 =  {
                                        "id" : data.id,
                                        "keterangan" : data.keterangan,
                                        "namaExternal" : data.namaExternal,
                                        "noRec" : data.noRec,
                                        "noTrans" : data.noTrans,
                                        "statusEnabled" : true
                                        }
                        $scope.checkedListData.push(dataid2)
                      }
                          if(eIntervensi.detail.length !=0){
                               eIntervensi.detail.forEach(function(subparente){
                                  if (subparente.id == data.id){
                                         var dataid =  {
                                                    "id" : data.id,
                                                    "keterangan" : data.keterangan,
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
                $scope.subdatamaster.loadData[2].detail.forEach(function(data){
                  $scope.Kriteria.forEach(function(eEvaluasi){
                     if (eEvaluasi.id == data.id){
                        var dataid3 =  {
                                        "id" : data.id,
                                        "keterangan" : data.keterangan,
                                        "namaExternal" : data.namaExternal,
                                        "noRec" : data.noRec,
                                        "noTrans" : data.noTrans,
                                        "statusEnabled" : true
                                        }
                        $scope.checkedListData.push(dataid3)
                      }
                        if(eEvaluasi.detail.length !=0){
                           eEvaluasi.detail.forEach(function(subparente){
                              if (subparente.id == data.id){
                                     var dataid =  {
                                                "id" : data.id,
                                                "keterangan" : data.keterangan,
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

              $scope.checkedListData.forEach(function(data){
                debugger
                  switch(data.id){
                      case 169:
                         $scope.item.radio1 = data.keterangan;
                         $scope.item.noRec = data.noRec1;
                      break;
                      case 170:
                        $scope.item.radio2 = data.keterangan;
                        $scope.item.noRec2 = data.noRec;
                      break;
                      case 171:
                         $scope.item.radio3 = data.keterangan;
                         $scope.item.noRec3 = data.noRec1;
                      break;
                      case 172:
                        $scope.item.radio4 = data.keterangan;
                        $scope.item.noRec4 = data.noRec;
                      break;
                      case 173:
                         $scope.item.radio5 = data.keterangan;
                         $scope.item.noRec5 = data.noRec1;
                      break;
                      case 175:
                        $scope.item.names1 = data.keterangan;
                        $scope.item.noRec6 = data.noRec;
                      break;
                      case 176:
                         $scope.item.names2 = data.keterangan;
                         $scope.item.noRec7 = data.noRec;
                      break;
                      case 177:
                        $scope.item.names3 = data.keterangan;
                        $scope.item.noRec8 = data.noRec;
                      break;
                      case 207:
                      debugger
                        $scope.item.namek1 = data.keterangan;
                        $scope.item.noRec9 = data.noRec;
                      break;
                      case 204:
                        $scope.item.namek2 = data.keterangan;
                        $scope.item.noRec10 = data.noRec;
                      break;
                      case 205:
                        $scope.item.namek3 = data.keterangan;
                        $scope.item.noRec11 = data.noRec;
                      break;
                      case 206:
                        $scope.item.namek4 = data.keterangan;
                        $scope.item.noRec12 = data.noRec;
                      break;
                    }
                  })
                });
               }
              }


            $scope.isChecked = function(id, bool){
            if(bool == undefined){
              var MatchTemporaryyDataForChecked = false;
              for (var y = 0; y<$scope.checkedListData.length; y++){      
                   if ($scope.checkedListData[y].id == id){
                    MatchTemporaryyDataForChecked = true;
                   }
                }
              return MatchTemporaryyDataForChecked;
            }
            else if(bool == true){
              var MatchTemporaryyDataForChecked = false;
              for (var y = 0; y<$scope.checkedListData.length; y++){      
                   if ($scope.checkedListData[y].id == id){
                    MatchTemporaryyDataForChecked = true;
                   }
                }
              return MatchTemporaryyDataForChecked;
             }else{
              var MatchTemporaryyDataForChecked = false;
                for(var x = 0; x<$scope.checkedListData.length; x++){
                    if($scope.checkedlistdata[x].id == id){
                      MatchTemporaryyDataForChecked;    
                    }  
                }
               return MatchTemporaryyDataForChecked;
             }
            };

        $scope.columnIntraOpAnestesi = [
                    // {
                    //     "field": "noRec",
                    //     "title": "N o r e k"
                    // },

                    {
                        "field": "noTrans",
                        "title": "No. Transaksi"
                    }
        ];

       findPasien.getIntraAnestesi().then(function(data){
        debugger
        $scope.datax = data.data.data.loadData;
        $scope.Masalah = $scope.datax[0].data;
        $scope.Intervensi = $scope.datax[1].data;
        $scope.Kriteria = $scope.datax[2].data;
        });

        $state.params.noRec;

         $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }
         
        $scope.listTindakan=[{"id" : 1,"name": "Bedah Jantung (Dummy)"}];

        $scope.checkedListData = [];
    
           $scope.checkedListData = [];
            $scope.checkedData = function(bool, item) {
                debugger;
                if(bool){
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
                 if(item.detail!=undefined){
                  if(item.detail[0]!=undefined){
                    if(item.detail[0].namaExternal != undefined){
                       item.detail.forEach(function(e){
                          debugger;
                               $scope.checkedListData.forEach(function(data){
                                  for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                      if($scope.checkedListData[i].name == e.namaExternal){
                                          $scope.checkedListData.splice(i,1);
                                          }
                                      }//end for
                                })
                                   e.statusEnabled = true;
                                   $scope.checkedListData.push(e)
                             })
                       item.statusEnabled = true;
                       $scope.checkedListData.push(item);
                  }else{
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
                                     h.statusEnabled = true;
                                     $scope.checkedListData.push(h)
                                   })
                                 }
                             $scope.checkedListData.forEach(function(data){
                                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                    if($scope.checkedListData[i].name == e.name){
                                        $scope.checkedListData.splice(i,1);
                                        }
                                      }
                                  })
                            e.statusEnabled = true;
                            $scope.checkedListData.push(e)
                             })
                            item.statusEnabled = true;
                            $scope.checkedListData.push(item);
                         }else{
                          item.statusEnabled = true;
                          $scope.checkedListData.push(item);
                          }
                            } else {
                              item.statusEnabled = true;
                                $scope.checkedListData.push(item);
                             }
                          }
                      }else{
                            item.statusEnabled = true;
                            $scope.checkedListData.push(item);
                      }
                      }else{
                            item.statusEnabled = true;
                            $scope.checkedListData.push(item);
                      }
                        }
                        //else bool
                     }else{
                    if(item.detaildetail !=undefined){
                            if(item.detaildetail != 0){
                            item.detaildetail.forEach(function(x){
                                $scope.checkedListData.forEach(function(data){
                                    for(var w=0; w<$scope.checkedListData.length; w++){
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
                }
            };


            $scope.cetak = function(){
            debugger;
            var urlLaporan = CetakBedah.open("");
            window.open(urlLaporan, '_blank');
            }

            $scope.Save=function() {
             debugger;
                var dataAsuhan = [];
                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                    if($scope.checkedListData[i].id!=169 || $scope.checkedListData[i].id!=170
                       || $scope.checkedListData[i].id!=171 || $scope.checkedListData[i].id!=171
                       || $scope.checkedListData[i].id!=172 || $scope.checkedListData[i].id!=173
                       || $scope.checkedListData[i].id!=175 || $scope.checkedListData[i].id!=176
                       || $scope.checkedListData[i].id!=177 || $scope.checkedListData[i].id!=204
                       || $scope.checkedListData[i].id!=205 || $scope.checkedListData[i].id!=206
                       || $scope.checkedListData[i].id!=207){
                        var dat =  {
                            "objekDataMasalah":{
                                "id": $scope.checkedListData[i].id
                            },
                              "flagHeader" : "Intra Operasi-Anestesi",
                              "flagasuhan" : "Data & Masalah Keperawatan",
                              "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                              "noRec" : $scope.checkedListData[i].noRec,
                              "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 169){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.radio1,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 170){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.radio2,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 171){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.radio3,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 172){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.radio4,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 173){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.radio5,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 175){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names1,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 176){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names2,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                      if($scope.checkedListData[i].id == 177){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names3,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                          }
                       }

                       if($scope.checkedListData[i].id == 207){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.namek1,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                          }
                       }
                       if($scope.checkedListData[i].id == 204){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.namek2,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                          }
                       }
                       if($scope.checkedListData[i].id == 205){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.namek3,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                          }
                       }
                        if($scope.checkedListData[i].id == 206){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.namek4,
                            "flagHeader" : "Intra Operasi-Anestesi",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                          }
                       }
                 
                    dataAsuhan.push(dat)
                }

               if($scope.item.ModeEdit == true){
                   if($scope.KondisiJam != $scope.item.jamMasukOperasi){
                      var jamMasukOperasi = dateHelper.formatDate($scope.item.jamMasukOperasi,"HH:mm")    
                    }else{
                      var jamMasukOperasi = $scope.item.jamMasukOperasi;
                    }
                }else{
                var jamMasukOperasi = dateHelper.formatDate($scope.item.jamMasukOperasi,"HH:mm")
                }
                var data = {
                            "pasienDaftar" : {"noRec" : $state.params.noRec},
                            "noTrans" : $scope.Keytransaksi,
                            "noRec" : $scope.noRecInduk,
                            "jamMasukOperasi" : jamMasukOperasi,
                            "statusEnabled" : "true",
                            "asuhanTrans" : dataAsuhan
                           }

                console.log(JSON.stringify(data));
                managePasien.saveIntraAnestesiRevisi(data).then(function(e){
                  $scope.loadGrid();
                })
            }
        }
    ]);
});