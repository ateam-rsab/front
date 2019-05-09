define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('IntraOperasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'ManageSdm', 'DateHelper','CetakBedah',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien, ManageSdm, dateHelper,CetakBedah) {
            $scope.item={};
            $scope.isLoadingData = true;
             $scope.AllData = false;
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
              ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                $scope.DiagnosaTindakan = data;
            });
            findPasien.getPasienBedah().then(function(data){
            });
            
             findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {   
             $scope.item.pasien = data.data.pasien;
             $scope.isLoadingData = false;
             $scope.AllData = true;
             });
      
            findPasien.getIntraPerawatBedah().then(function(data){
              debugger;
              $scope.Masalah = data.data.data.loadData[0].data;
              $scope.HeadDiagnosis= data.data.data.loadData[1].header;
              $scope.Diagnosis= data.data.data.loadData[1].data;
              $scope.Intervensi= data.data.data.loadData[2].data;
              $scope.KEvaluasi= data.data.data.loadData[3].data;
                  
            });

             $scope.columnIntraoperasi = [
                    // {
                    //     "field": "noRec",
                    //     "title": "N o r e k"
                    // },

                    {
                        "field": "noTrans",
                        "title": "No. Transaksi"
                    }
              ];

             $scope.loadGrid = function()
              {
              findPasien.getLoadIntraOperasi($state.params.noRec).then(function(data) {
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
               findPasien.getSubLoadIntraOperasi($scope.item.idCheckin).then(function(data) {
                debugger
                toastr.info("1 Dipilih");
                $scope.subdatamaster = data.data.data;
                $scope.item.jamMasukOperasi = $scope.subdatamaster.jamMasukOperasi;
                debugger
                $scope.item.noRecInduk = $scope.subdatamaster.noRec;
                $scope.checkedListData = [];
                $scope.subdatamaster.loadData[0].detail.forEach(function(data){
                // for (var y = 0; y<$scope.Masalah.length; y++){   
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
                       if(e.detail.length != 0){
                          e.detail.forEach(function(f){
                            if(f.id == data.id){
                              var Subdataid =  {
                                          "id" : data.id,
                                          "keterangan" : data.keterangan,
                                          "namaExternal" : data.namaExternal,
                                          "noRec" : data.noRec,
                                          "noTrans" : data.noTrans,
                                          "statusEnabled" : true
                                      }
                               $scope.checkedListData.push(Subdataid)
                            }
                                      if(f.detaildetail.length != 0){
                                          f.detaildetail.forEach(function(deep){
                                            if(deep.id == data.id){
                                              var deepdataid =  {
                                                    "id" : data.id,
                                                    "keterangan" : data.keterangan,
                                                    "namaExternal" : data.namaExternal,
                                                    "noRec" : data.noRec,
                                                    "noTrans" : data.noTrans,
                                                    "statusEnabled" : true
                                                      }
                                               $scope.checkedListData.push(deepdataid)
                                            }
                                          })
                                        }
                                    })
     
                                }
                            })
                        // }
                    })
                $scope.subdatamaster.loadData[0].detail.forEach(function(data){
                // for (var y = 0; y<$scope.Diagnosis.length; y++){     
                 $scope.Diagnosis.forEach(function(e){
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
                  })
                  // }
                })
              $scope.subdatamaster.loadData[1].detail.forEach(function(data){
                // for (var y = 0; y<$scope.Intervensi.length; y++){
                 $scope.Intervensi.forEach(function(e){
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
                             if(e.detail.length != 0){
                                        e.detail.forEach(function(frmsubintervensi){
                                          if(frmsubintervensi.id == data.id){
                                            var intervensiid =  {
                                                  "id" : data.id,
                                                  "keterangan" : data.keterangan,
                                                  "namaExternal" : data.namaExternal,
                                                  "noRec" : data.noRec,
                                                  "noTrans" : data.noTrans,
                                                  "statusEnabled" : true
                                                    }
                                             $scope.checkedListData.push(intervensiid)
                                          }
                                        })
                                     }
                                 })
                                // }
                              })

              $scope.subdatamaster.loadData[2].detail.forEach(function(data){
                // for (var y = 0; y<$scope.KEvaluasi.length; y++){   
                 $scope.KEvaluasi.forEach(function(e){
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
                  })
                  // }
                })
                
               $scope.checkedListData.forEach(function(data){
                debugger
                  switch(data.id){
                      case 65:
                       $scope.item.name1 = data.keterangan;
                       $scope.item.noRec = data.noRec;
                      break;
                      case 66:
                            $scope.item.name2 = data.keterangan;
                            $scope.item.noRec2 = data.noRec;
                      break;
                      case 67:
                            $scope.item.name3 = data.keterangan;
                            $scope.item.noRec3 = data.noRec;
                      break;
                      case 87:
                            $scope.item.name4 = data.keterangan;
                            $scope.item.noRec4 = data.noRec;
                      break;
                      case 88:
                            $scope.item.name5 = data.keterangan;
                            $scope.item.noRec5 = data.noRec;
                      break;
                      case 70:
                            $scope.item.names8 = data.keterangan;
                            $scope.item.noRec6 = data.noRec;
                      break;
                      case 77:
                            $scope.item.names1 = data.keterangan;
                            $scope.item.noRec7 = data.noRec;
                      break;
                      case 78:
                            $scope.item.names2 = data.keterangan;
                            $scope.item.noRec8 = data.noRec;
                      break;
                      case 79:
                            $scope.item.names3 = data.keterangan;
                            $scope.item.noRec9 = data.noRec;
                      break;
                      case 80:
                            $scope.item.names4 = data.keterangan;
                            $scope.item.noRec9 = data.noRec;
                      break;
                      ///////////////////////////////
                       case 83:
                            $scope.item.names5 = data.keterangan;
                            $scope.item.noRec10 = data.noRec;
                      break;
                      case 82:
                            $scope.item.names6 = data.keterangan;
                            $scope.item.noRec11 = data.noRec;
                      break;
                      case 72:
                            $scope.item.names7 = data.keterangan;
                            $scope.item.noRec12 = data.noRec;
                      break;
                      case 70:
                            $scope.item.names8 = data.keterangan;
                            $scope.item.noRec13 = data.noRec;
                      break;
                      case 71:
                            $scope.item.names9 = data.keterangan;
                            $scope.item.noRec14 = data.noRec;
                      break;
                      case 74:
                            $scope.item.names10 = data.keterangan;
                            $scope.item.noRec15 = data.noRec;
                      break;
                      case 73:
                            $scope.item.names11= data.keterangan;
                            $scope.item.noRec16 = data.noRec;
                      break;
                      case 86:
                            $scope.item.names12 = data.keterangan;
                            $scope.item.noRec17 = data.noRec;
                      break;
                      case 85:
                            $scope.item.names13 = data.keterangan;
                            $scope.item.noRec18 = data.noRec;
                      break;
                      case 99:
                            $scope.item.nameIntervensi1 = data.keterangan;
                            $scope.item.noRec19 = data.noRec;
                      break;
                      case 100:
                            $scope.item.nameIntervensi2 = data.keterangan;
                            $scope.item.noRec20 = data.noRec;
                      break;
                      case 102:
                            $scope.item.nameIntervensi3 = data.keterangan;
                            $scope.item.noRec21 = data.noRec;
                      break;
                      case 108:
                            $scope.item.nameIntervensi8 = data.keterangan;
                            $scope.item.noRec22 = data.noRec;
                      break;
                      case 113:
                            $scope.item.nameIntervensi17 = data.keterangan;
                            $scope.item.noRec23 = data.noRec;
                      break;
                      case 115:
                            $scope.item.nameIntervensi9 = data.keterangan;
                            $scope.item.noRec24 = data.noRec;
                      break;
                      case 119:
                            $scope.item.nameIntervensi10 = data.keterangan;
                            $scope.item.noRec25 = data.noRec;
                      break;
                      case 125:
                            $scope.item.nameIntervensi11 = data.keterangan;
                            $scope.item.noRec26 = data.noRec;
                      break;
                      case 127:
                            $scope.item.nameIntervensi12 = data.keterangan;
                            $scope.item.noRec27 = data.noRec;
                      break;
                      case 162:
                            $scope.item.nameKriteria1 = data.keterangan;
                            $scope.item.noRec28 = data.noRec;
                      break;
                      case 168:
                            $scope.item.nameKriteria2 = data.keterangan;
                            $scope.item.noRec29 = data.noRec;
                      break;
                      case 126 :
                            $scope.item.nameIntervensi7 = data.keterangan;
                            $scope.item.noRec30 = data.noRec;
                      break;
                      case 124 :
                             $scope.item.nameIntervensi6 = data.keterangan;
                             $scope.item.noRec31 = data.noRec;
                      break;
                      case 117 :
                             $scope.item.nameIntervensi5 = data.keterangan;
                             $scope.item.noRec32 = data.noRec;
                      break;
                      case 111 :
                             $scope.item.nameIntervensi4 = data.keterangan;
                             $scope.item.noRec33 = data.noRec;
                      break;
                      case 133 :
                            $scope.item.nameIntervensi17 = data.keterangan;
                            $scope.item.noRec34 = data.noRec;

                      break;
                    }
                  })
               $scope.isChecked();  
                });
               }
              }

            $scope.isChecked = function(id, bool){
              debugger
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

             $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }

            $scope.columnAskep = [
                    {
                        "field": "noRec",
                        "title": "Norec"
                    },

                    {
                        "field": "noTrans",
                        "title": "No Transaksi"
                    }
              ];

            $state.params.noRec;

             $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }

      $scope.listTindakan=[{"id" : 1,"name": "Bedah Jantung (Dummy)"}];

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
                      debugger
                    if(item.detaildetail !=undefined){
                            if(item.detaildetail != 0){
                            item.detaildetail.forEach(function(x){
                              debugger
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
                              debugger
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
            var urlLaporan = CetakBedah.open("");
            window.open(urlLaporan, '_blank');

            }

            $scope.Save=function() {

            if($scope.item.operatorAlatCanggih == undefined){
                 $scope.item.operatorAlatCanggih = {id : 1} 
             }
            
              var dateNow= moment(new Date).format('YYYY-MM-DD');
              var dataAsuhan = [];
                for(var i=0 ; i < $scope.checkedListData.length; i++) {
                    if($scope.checkedListData[i].id!=65 || $scope.checkedListData[i].id!=66
                        || $scope.checkedListData[i].id!=67 || $scope.checkedListData[i].id!=87
                        || $scope.checkedListData[i].id!=88 || $scope.checkedListData[i].id!=70|| $scope.checkedListData[i].id!=77
                        || $scope.checkedListData[i].id!=78 || $scope.checkedListData[i].id!=79
                        || $scope.checkedListData[i].id!=80 || $scope.checkedListData[i].id!=83 
                        || $scope.checkedListData[i].id!=82){
                      
                    debugger
                  var dat =  {
                            "objekDataMasalah":{
                                "id": $scope.checkedListData[i].id
                            },
                          "flagHeader" : "Intra Operasi-Perawat Bedah",
                          "flagasuhan" : "Data & Masalah Keperawatan",
                          "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                          "noRec" : $scope.checkedListData[i].noRec,
                          "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }



                    if($scope.checkedListData[i].id == 65){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.name1,
                             "flagHeader" : "Intra Operasi-Perawat Bedah",
                             "flagasuhan" : "Data & Masalah Keperawatan",
                              "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                              "noRec" : $scope.checkedListData[i].noRec,
                              "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }

                    if($scope.checkedListData[i].id == 124){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi6,
                             "flagHeader" : "Intra Operasi-Perawat Bedah",
                             "flagasuhan" : "Data & Masalah Keperawatan",
                              "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                              "noRec" : $scope.checkedListData[i].noRec,
                              "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }

                   if($scope.checkedListData[i].id == 126){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi7,
                             "flagHeader" : "Intra Operasi-Perawat Bedah",
                             "flagasuhan" : "Data & Masalah Keperawatan",
                              "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                              "noRec" : $scope.checkedListData[i].noRec,
                              "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }

              if($scope.checkedListData[i].id == 111){
                  var dat = {
                      "objekDataMasalah":{
                          "id":$scope.checkedListData[i].id
                      },
                      "keterangan": $scope.item.nameIntervensi4,
                       "flagHeader" : "Intra Operasi-Perawat Bedah",
                       "flagasuhan" : "Data & Masalah Keperawatan",
                        "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                        "noRec" : $scope.checkedListData[i].noRec,
                        "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                  }
              }

            if($scope.checkedListData[i].id == 117){
                  var dat = {
                      "objekDataMasalah":{
                          "id":$scope.checkedListData[i].id
                      },
                      "keterangan": $scope.item.nameIntervensi5,
                       "flagHeader" : "Intra Operasi-Perawat Bedah",
                       "flagasuhan" : "Data & Masalah Keperawatan",
                        "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                        "noRec" : $scope.checkedListData[i].noRec,
                        "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                  }
              }

                     if($scope.checkedListData[i].id == 66){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "keterangan": $scope.item.name2,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 67){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.name3,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                   if($scope.checkedListData[i].id == 87){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.name4,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                      if($scope.checkedListData[i].id == 88){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.name5,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 70){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names8,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 77){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names1,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 78){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names2,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 79){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names3,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 80){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names4,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 83){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names5,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 82){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names6,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 72){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names7,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 70){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names8,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 71){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names9,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 74){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names10,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 73){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names11,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 86){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names12,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 85){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.names13,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                     if($scope.checkedListData[i].id == 99){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi1,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 100){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi2,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 102){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi3,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }

                    if($scope.checkedListData[i].id == 108){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi8,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 133){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi17,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 115){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi9,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 119){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi10,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 125){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi11,
                             "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 127){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameIntervensi12,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 162){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameKriteria1,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    if($scope.checkedListData[i].id == 168){
                        var dat = {
                            "objekDataMasalah":{
                                "id":$scope.checkedListData[i].id
                            },
                            "keterangan": $scope.item.nameKriteria2,
                            "flagHeader" : "Intra Operasi-Perawat Bedah",
                            "flagasuhan" : "Data & Masalah Keperawatan",
                            "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                            "noRec" : $scope.checkedListData[i].noRec,
                            "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                        }
                    }
                    dataAsuhan.push(dat)
                }

              if($scope.item.ModeEdit == true){
               var JamMasukOperasi = $scope.item.jamMasukOperasi;
              }else{
                var JamMasukOperasi = dateHelper.formatDate($scope.item.jamMasukOperasi,"HH:mm");
              }

              var data =  {
                          "pasienDaftar" : {"noRec" : $state.params.noRec},
                          "noRec" : $scope.item.noRecInduk,
                          "jamMasukOperasi" : JamMasukOperasi,
                          "statusEnabled" : "true",
                          "asuhanTrans" :dataAsuhan,
                          "noTrans" : $scope.Keytransaksi
                         }

                managePasien.saveIntraPerawatBedahRev1(data).then(function(e){
                console.log(JSON.stringify(data));
                // $scope.item={};
                $scope.loadGrid();
                })
            }
        }
    ]);
});