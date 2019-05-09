define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PostOperasiAnestesiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManagePasien', 'FindPasien', 'ManageSdm', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, managePasien, findPasien, ManageSdm, dateHelper) {
            $scope.item={};
            $scope.isLoadingData = true;
            $scope.AllData = false;
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
                $scope.listPasienBedah = data.data.data.listData; 
            });

           findPasien.getPostOperasi().then(function(data){
            debugger;
                $scope.datax = data.data.data.loadData;
                $scope.Masalah = $scope.datax[0].data;
                $scope.Intervensi = $scope.datax[1].data;
                $scope.Kriteria = $scope.datax[2].data;
            });

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {   
             $scope.item.pasien = data.data.pasien;
             $scope.isLoadingData = false;
             $scope.AllData = true;
             });

              $scope.columnPostOperasiAnestesi = [
                    // {
                    //     "field": "noRec",
                    //     "title": "Norec"
                    // },

                    {
                        "field": "noTrans",
                        "title": "No Transaksi"
                    }
              ];

          $scope.loadGrid = function(){
          debugger
          findPasien.getPostOperasiAnestesiRevs($state.params.noRec).then(function(data){
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
       if (dataSelected != undefined){
         $scope.item.ModeEdit = true;
         $scope.item.idCheckin = dataSelected.noTrans;
         $scope.Keytransaksi = dataSelected.noTrans;
         findPasien.getSubPostOperasiAnestesiRevs($scope.item.idCheckin).then(function(data) {
          debugger
          toastr.info("1 Dipilih");
          $scope.subdatamaster = data.data.data;
          $scope.item.jamMasukOperasi = $scope.subdatamaster.jamMasukOperasi;
          $scope.KondisiJam = $scope.subdatamaster.jamMasukOperasi;
         
          $scope.NorecInduk = $scope.subdatamaster.noRec;
           $scope.checkedListData = [];
          $scope.subdatamaster.loadData[0].detail.forEach(function(data){
            debugger
                 $scope.Masalah.forEach(function(e){
                  debugger
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
                        })
     
                     }
                  })
               })
             
             $scope.subdatamaster.loadData[1].detail.forEach(function(data){
              $scope.Intervensi.forEach(function(eIntervensi){
                  debugger
                  if (eIntervensi.id == data.id){
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
              })

              $scope.subdatamaster.loadData[2].detail.forEach(function(data){
              $scope.Kriteria.forEach(function(eEvaluasi){
                  debugger
                  if (eEvaluasi.id == data.id){
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
              })

            $scope.checkedListData.forEach(function(data){
                debugger
                  switch(data.id){
                      case 227:
                           $scope.item.names1 = data.keterangan;
                           $scope.item.noRec1 = data.noRec;
                      break;
                      case 228:
                            $scope.item.names2 = data.keterangan;
                            $scope.item.noRec2 = data.noRec;
                      break;
                      case 229:
                            $scope.item.names3 = data.keterangan;
                            $scope.item.noRec3 = data.noRec;
                      break;
                      case 230:
                            $scope.item.names4 = data.keterangan;
                            $scope.item.noRec4 = data.noRec;
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
                               item.statusEnabled = true;
                              $scope.checkedListData.push(item);
                          })
                   }else{
                     if(item.detail!=undefined){
                      if(item.detail[0]!=undefined){
                        if(item.detail[0].namaExternal != undefined){
                           item.detail.forEach(function(e){
                               $scope.checkedListData.forEach(function(data){
                                  for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                      if($scope.checkedListData[i].name == e.namaExternal){
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
                          if (item.detail!=0) {
                            if(item.detail[0]!=undefined){
                              item.detail.forEach(function(e){
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
                          if(item.detail != undefined){
                          if (item.detail!=0) {
                              item.detail.forEach(function(e){
                                  $scope.checkedListData.forEach(function(data){
                                    for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                      if($scope.checkedListData[i].id == item.id){
                                          $scope.checkedListData.splice(i,1);
                                           item.detail.forEach(function(f){
                                            item.detail.forEach(function(data){
                                              for(var i=0 ; i < $scope.checkedListData.length; i++) {
                                              if($scope.checkedListData[i].name == f.name){
                                                  var GetnoRec = $scope.checkedListData[i].noRec;
                                                  $scope.checkedListData.splice(i,1);
                                                  var SetDataForTempToFalse = f;
                                                  SetDataForTempToFalse.statusEnabled = false;
                                                  SetDataForTempToFalse.value = false;
                                                  SetDataForTempToFalse.noRec = GetnoRec;
                                                  $scope.checkedListData.push(SetDataForTempToFalse);
                                              }
                                             }
                                           })
                                      })
                                       }
                                     }

                                  })
                              })
                          } else {
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

                      $scope.Save=function() {
                      debugger;
                          var dataAsuhan = [];
                          for(var i=0 ; i < $scope.checkedListData.length; i++) {
                              if($scope.checkedListData[i].id!=227 || $scope.checkedListData[i].id!=228
                                 || $scope.checkedListData[i].id!=229 || $scope.checkedListData[i].id!=230){
                                  var dat =  {
                                      "objekDataMasalah":{
                                          "id": $scope.checkedListData[i].id
                                      },
                                        "flagHeader" : "Post Operasi-Anestesi",
                                        "flagasuhan" : "Data & Masalah Keperawatan",
                                        "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                                        "noRec" : $scope.checkedListData[i].noRec,
                                        "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                                  }
                              }
                              if($scope.checkedListData[i].id == 227){
                                  var dat = {
                                      "objekDataMasalah":{
                                          "id":$scope.checkedListData[i].id
                                      },
                                      "keterangan": $scope.item.names1,
                                      "flagHeader" : "Post Operasi-Anestesi",
                                      "flagasuhan" : "Data & Masalah Keperawatan",
                                      "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                                      "noRec" : $scope.checkedListData[i].noRec,
                                      "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                                  }
                              }
                              if($scope.checkedListData[i].id == 228){
                                  var dat = {
                                      "objekDataMasalah":{
                                          "id":$scope.checkedListData[i].id
                                      },
                                      "keterangan": $scope.item.names2,
                                      "flagHeader" : "Post Operasi-Anestesi",
                                      "flagasuhan" : "Data & Masalah Keperawatan",
                                      "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                                      "noRec" : $scope.checkedListData[i].noRec,
                                      "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                                  }
                              }
                              if($scope.checkedListData[i].id == 229){
                                  var dat = {
                                      "objekDataMasalah":{
                                          "id":$scope.checkedListData[i].id
                                      },
                                      "keterangan": $scope.item.names3,
                                      "flagHeader" : "Post Operasi-Anestesi",
                                      "flagasuhan" : "Data & Masalah Keperawatan",
                                      "statusEnabled" : $scope.checkedListData[i].statusEnabled,
                                      "noRec" : $scope.checkedListData[i].noRec,
                                      "asuhankeperawatanHeaderId" : $scope.Keytransaksi
                                  }
                              }
                               if($scope.checkedListData[i].id == 230){
                                  var dat = {
                                      "objekDataMasalah":{
                                          "id":$scope.checkedListData[i].id
                                      },
                                      "keterangan": $scope.item.names4,
                                      "flagHeader" : "Post Operasi-Anestesi",
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

                          var data = 
                                    {
                                      "pasienDaftar" : {"noRec" : $state.params.noRec},
                                       "noRec" : $scope.NorecInduk,
                                      "jamMasukOperasi" : jamMasukOperasi,
                                      "statusEnabled" : "true",
                                      "noTrans" : $scope.Keytransaksi,
                                      "asuhanTrans" : dataAsuhan
                                    }
                          console.log(JSON.stringify(data));
                          managePasien.savePostAnestesiRev(data).then(function(e){
                          $scope.loadGrid();
                          })
                      }
        }
    ]);
});