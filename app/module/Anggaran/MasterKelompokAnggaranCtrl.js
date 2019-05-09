define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MasterKelompokAnggaranCtrl', ['$q', '$rootScope', '$state', '$scope','DateHelper','$http','$route', 'ModelItem', 'ModelItemAkuntansi', '$window','$mdDialog','ManageServicePhp',
        function($q, $rootScope, $state ,$scope,dateHelper,$http,$route , ModelItem, modelItemAkuntansi, window, $mdDialog, manageServicePhp) {
            $scope.dataVOloaded = true;
            $scope.isRouteLoading=false;
            $scope.now = new Date();
            $scope.item = {};
            $scope.dataAnggaranSelected={};
            loadDataGrid();
            function loadDataGrid(){
                $scope.isRouteLoading=true;
                manageServicePhp.getDataTableTransaksi("anggaran/get-data-combo").then(function(e){
                   $scope.isRouteLoading=false
                   $scope.dataSourceHead=e.data.kelompokhead
                   $scope.dataSourcePertama=e.data.kelompokpertama
                   $scope.dataSourceKedua=e.data.kelompokkedua
                   $scope.dataSourceKetiga=e.data.kelompokketiga
                   $scope.dataSourceKeempat=e.data.kelompokkeempat
               })
            }
            $scope.columnKelompokHead = [
                {
                    "field": "id",
                    "title": "Id",
                    "width":"50px"
                },
                {
                    "field": "kdkelompokhead",
                    "title": "Kode",
                    "width":"80px"
                },
                {
                    "field": "kelompokhead",
                    "title": "Kelompok Head",
                    "width":"200px"
                },
                {
                    "field": "kodeexternal",
                    "title": "Kode External",
                    "width":"80px"
                },
                {
                    "field": "namaexternal",
                    "title": "Nama External",
                    "width":"200px"
                } 
            ];
            $scope.columnKelompokPertama = [
                {
                    "field": "id",
                    "title": "Id",
                    "width":"50px"
                },
                {
                    "field": "kdchildpertama",
                    "title": "Kode",
                    "width":"80px"
                },
                {
                    "field": "childpertama",
                    "title": "Kelompok Pertama",
                    "width":"200px"
                },
                {
                    "field": "kodeexternal",
                    "title": "Kode External",
                    "width":"80px"
                },
                {
                    "field": "namaexternal",
                    "title": "Nama External",
                    "width":"200px"
                } 
            ];
            $scope.columnKelompokKedua = [
                {
                    "field": "id",
                    "title": "Id",
                    "width":"50px"
                },
                {
                    "field": "kdchildkedua",
                    "title": "Kode",
                    "width":"80px"
                },
                {
                    "field": "childkedua",
                    "title": "Kelompok Kedua",
                    "width":"200px"
                },
                {
                    "field": "kodeexternal",
                    "title": "Kode External",
                    "width":"80px"
                },
                {
                    "field": "namaexternal",
                    "title": "Nama External",
                    "width":"200px"
                } 
            ];
            $scope.columnKelompokKetiga = [
                {
                    "field": "id",
                    "title": "Id",
                    "width":"50px"
                },
                {
                    "field": "kdchildketiga",
                    "title": "Kode",
                    "width":"80px"
                },
                {
                    "field": "childketiga",
                    "title": "Kelompok Ketiga",
                    "width":"200px"
                },
                {
                    "field": "kodeexternal",
                    "title": "Kode External",
                    "width":"80px"
                },
                {
                    "field": "namaexternal",
                    "title": "Nama External",
                    "width":"200px"
                } 
            ];
            $scope.columnKelompokKeempat = [
                {
                    "field": "id",
                    "title": "Id",
                    "width":"50px"
                },
                {
                    "field": "kdchildkeempat",
                    "title": "Kode",
                    "width":"80px"
                },
                {
                    "field": "childkeempat",
                    "title": "Kelompok Keempat",
                    "width":"200px"
                },
                {
                    "field": "kodeexternal",
                    "title": "Kode External",
                    "width":"80px"
                },
                {
                    "field": "namaexternal",
                    "title": "Nama External",
                    "width":"200px"
                } 
            ];



        $scope.saveHead=function(){
                var kdHead=""
                if ($scope.item.kodeHead!=undefined)
                    kdHead= $scope.item.kodeHead

                var namaHead=""
                if ($scope.item.namaHead!=undefined){
                    namaHead= $scope.item.namaHead
                }
                else{
                    return;
                    toastr.error('Nama Kelompok Head harus di isi')
                }

                var kdExtern=""
                if ($scope.item.kodeExternalHead!=undefined)
                    kdExtern= $scope.item.kodeExternalHead

                var namaExtern=""
                if ($scope.item.namaExternalHead!=undefined)
                    namaExtern= $scope.item.namaExternalHead

                  var id=""
                if ($scope.idHead !=undefined)
                    id=$scope.idHead

                var jsonSave={
                    "id" :id,
                    "kdkelompokhead" :kdHead,
                    "kelompokhead": namaHead,
                    "kodeexternal" :kdExtern,
                    "namaexternal" :namaExtern,
                 }                
                manageServicePhp.saveKelHeadAnggaran(jsonSave).then(function(e){
                     $scope.batal();
                     loadDataGrid();
                })
        }
        $scope.saveKelPertama=function(){
                var kdHead=""
                if ($scope.item.kodeKelompokPertama!=undefined)
                    kdHead= $scope.item.kodeKelompokPertama

                var namaHead=""
                if ($scope.item.namaKelompokPertama!=undefined){
                    namaHead= $scope.item.namaKelompokPertama
                }
                else{
                    return;
                    toastr.error('Nama Kelompok Pertama harus di isi')
                }

                var kdExtern=""
                if ($scope.item.kodeExternalPertama!=undefined)
                    kdExtern= $scope.item.kodeExternalPertama

                var namaExtern=""
                if ($scope.item.namaExternalPertama!=undefined)
                    namaExtern= $scope.item.namaExternalPertama

                var id=""
                if ($scope.idPertama !=undefined)
                    id=$scope.idPertama
                var jsonSave={
                    "id" :id,
                    "kdchildpertama" :kdHead,
                    "childpertama": namaHead,
                    "kodeexternal" :kdExtern,
                    "namaexternal" :namaExtern,
                 }                
                manageServicePhp.saveKelPertamaAnggaran(jsonSave).then(function(e){
                     $scope.batal();
                     loadDataGrid();
                })
        }
        $scope.saveKelKedua=function(){
                var kdHead=""
                if ($scope.item.kodeKelompokKedua!=undefined)
                    kdHead= $scope.item.kodeKelompokKedua

                var namaHead=""
                if ($scope.item.namaKelompokKedua!=undefined){
                    namaHead= $scope.item.namaKelompokKedua
                }
                else{
                    return;
                    toastr.error('Nama Kelompok Kedua harus di isi')
                }

                var kdExtern=""
                if ($scope.item.kodeExternalKedua!=undefined)
                    kdExtern= $scope.item.kodeExternalKedua

                var namaExtern=""
                if ($scope.item.namaExternalKedua!=undefined)
                    namaExtern= $scope.item.namaExternalKedua

                  var id=""
                if ($scope.idKedua !=undefined)
                    id=$scope.idKedua

                var jsonSave={
                    "id" :id,
                    "kdchildkedua" :kdHead,
                    "childkedua": namaHead,
                    "kodeexternal" :kdExtern,
                    "namaexternal" :namaExtern,
                 }                
                manageServicePhp.saveKelKeduaAnggaran(jsonSave).then(function(e){
                     $scope.batal();
                     loadDataGrid();
                })
        }
        $scope.saveKelKetiga=function(){
                var kdHead=""
                if ($scope.item.kodeKelompokKetiga!=undefined)
                    kdHead= $scope.item.kodeKelompokKetiga

                var namaHead=""
                if ($scope.item.namaKelompokKetiga!=undefined){
                    namaHead= $scope.item.namaKelompokKetiga
                }
                else{
                    return;
                    toastr.error('Nama Kelompok Ketiga harus di isi')
                }

                var kdExtern=""
                if ($scope.item.kodeExternalKetiga!=undefined)
                    kdExtern= $scope.item.kodeExternalKetiga

                var namaExtern=""
                if ($scope.item.namaExternalKetiga!=undefined)
                    namaExtern= $scope.item.namaExternalKetiga

                  var id=""
                if ($scope.idKetiga !=undefined)
                    id=$scope.idKetiga

                var jsonSave={
                    "id" :id,
                    "kdchildketiga" :kdHead,
                    "childketiga": namaHead,
                    "kodeexternal" :kdExtern,
                    "namaexternal" :namaExtern,
                 }                
                manageServicePhp.saveKelKetigaAnggaran(jsonSave).then(function(e){
                     $scope.batal();
                     loadDataGrid();
                })
        }
        $scope.saveKelKeempat=function(){
                var kdHead=""
                if ($scope.item.kodeKelompokKeempat!=undefined)
                    kdHead= $scope.item.kodeKelompokKeempat

                var namaHead=""
                if ($scope.item.namaKelompokKeempat!=undefined){
                    namaHead= $scope.item.namaKelompokKeempat
                }
                else{
                    return;
                    toastr.error('Nama Kelompok Keempat harus di isi')
                }

                var kdExtern=""
                if ($scope.item.kodeExternalKeempat!=undefined)
                    kdExtern= $scope.item.kodeExternalKeempat

                var namaExtern=""
                if ($scope.item.namaExternalKeempat!=undefined)
                    namaExtern= $scope.item.namaExternalKeempat
             
                var id=""
                if ($scope.idKeempat!=undefined)
                    id=$scope.idKeempat

                var jsonSave={
                    "id" :id,
                    "kdchildkeempat" :kdHead,
                    "childkeempat": namaHead,
                    "kodeexternal" :kdExtern,
                    "namaexternal" :namaExtern,
                 }                
                manageServicePhp.saveKelKeempatAnggaran(jsonSave).then(function(e){
                     $scope.batal();
                     loadDataGrid();
                })
        }

        $scope.batal=function(){
            $scope.item="";
            $scope.idHead=""
            $scope.idPertama=""
            $scope.idKedua=""
            $scope.idKetiga=""
            $scope.idKeempat=""

        }


        $scope.klik=function(dataHeadSelected){
            if (dataHeadSelected!=undefined){
                $scope.idHead=dataHeadSelected.id
                $scope.item.kodeHead=dataHeadSelected.kdkelompokhead
                $scope.item.namaHead=dataHeadSelected.kelompokhead
                $scope.item.kodeExternalHead=dataHeadSelected.kodeexternal
                $scope.item.namaExternalHead=dataHeadSelected.namaexternal
            }
        }
        $scope.klikPertama=function(dataPertamaSelected){
            if (dataPertamaSelected!=undefined){
                $scope.idPertama=dataPertamaSelected.id
                $scope.item.kodeKelompokPertama=dataPertamaSelected.kdchildpertama
                if(dataPertamaSelected.kodeexternal!=null)
                     $scope.item.kodeExternalPertama=dataPertamaSelected.kodeexternal
                else
                    $scope.item.kodeExternalPertama=""
                if(dataPertamaSelected.namaexternal!=null)
                    $scope.item.namaExternalPertama=dataPertamaSelected.namaexternal
                else
                    $scope.item.namaExternalPertama=""

                $scope.item.namaKelompokPertama=dataPertamaSelected.childpertama
            }
        }

        $scope.klikKedua=function(dataKeduaSelected){
            if (dataKeduaSelected!=undefined){
                $scope.idKedua=dataKeduaSelected.id
                $scope.item.kodeKelompokKedua=dataKeduaSelected.kdchildkedua
                $scope.item.namaKelompokKedua=dataKeduaSelected.childkedua
                if(dataKeduaSelected.kodeexternal!=null)
                $scope.item.kodeExternalKedua=dataKeduaSelected.kodeexternal
                 else
                      $scope.item.kodeExternalKedua=""
                if(dataKeduaSelected.namaexternal!=null)
                     $scope.item.namaExternalKedua=dataKeduaSelected.namaexternal
                else
                     $scope.item.namaExternalKedua=""
            }
        }
         $scope.klikKetiga=function(dataKetigaSelected){
            if (dataKetigaSelected!=undefined){
                $scope.idKetiga=dataKetigaSelected.id
                $scope.item.kodeKelompokKetiga=dataKetigaSelected.kdchildketiga
                $scope.item.namaKelompokKetiga=dataKetigaSelected.childketiga
                if (dataKetigaSelected.kodeexternal!=null)
                $scope.item.kodeExternalKetiga=dataKetigaSelected.kodeexternal
                else
                    $scope.item.kodeExternalKetiga=""
                if(dataKetigaSelected.namaexternal!=null)
                     $scope.item.namaExternalKetiga=dataKetigaSelected.namaexternal
                else
                     $scope.item.namaExternalKetiga=""
            }
        }

           $scope.klikKeempat=function(dataKeempatSelected){
            if (dataKeempatSelected!=undefined){
                $scope.idKeempat=dataKeempatSelected.id
                $scope.item.kodeKelompokKeempat=dataKeempatSelected.kdchildkeempat
                $scope.item.namaKelompokKeempat=dataKeempatSelected.childkeempat
                if(dataKeempatSelected.kodeexternal!=null)
                $scope.item.kodeExternalKeempat=dataKeempatSelected.kodeexternal
                else
                    $scope.item.kodeExternalKeempat=""
                if(dataKeempatSelected.namaexternal!=null)
                      $scope.item.namaExternalKeempat=dataKeempatSelected.namaexternal
                else
                     $scope.item.namaExternalKeempat=""

            }
        }


                  $scope.hapusHead = function(){
                    if ($scope.idHead==undefined){
                       toastr.error('Pilih Data Dulu','Informasi'); 
                       return
                    }else{
                        var itemDelete = {
                             "id":$scope.idHead,    
                            }
                         manageServicePhp.deleteKelHeadAnggaran(itemDelete).then(function(e){
                              loadDataGrid();
                              $scope.idHead=""
                                 $scope.batal()
                        })
                    }
                  }
                    $scope.hapusKelPertama = function(){
                    if ($scope.idPertama==undefined){
                       toastr.error('Pilih Data Dulu','Informasi'); 
                       return
                    }else{
                        var itemDelete = {
                             "id":$scope.idPertama,    
                            }
                         manageServicePhp.deleteKelPertamaAnggaran(itemDelete).then(function(e){
                              loadDataGrid();
                              $scope.idPertama=""
                                 $scope.batal()
                        })
                    }
                  }
                   $scope.hapusKelKedua = function(){
                    if ($scope.idKedua==undefined){
                       toastr.error('Pilih Data Dulu','Informasi'); 
                       return
                    }else{
                        var itemDelete = {
                             "id":$scope.idKedua,    
                            }
                         manageServicePhp.deleteKelKeduaAnggaran(itemDelete).then(function(e){
                              loadDataGrid();
                                 $scope.batal()
                                 $scope.idKedua=""
                        })
                    }
                  }
                   $scope.hapusKelKetiga = function(){
                    if ($scope.idKetiga==undefined){
                       toastr.error('Pilih Data Dulu','Informasi'); 
                       return
                    }else{
                        var itemDelete = {
                             "id":$scope.idKetiga,    
                            }
                         manageServicePhp.deleteKelKetigaAnggaran(itemDelete).then(function(e){
                              loadDataGrid();
                              $scope.idKetiga=""
                                 $scope.batal()
                        })
                    }
                  }
                   $scope.hapusKelKeempat = function(){
                    if ($scope.idKeempat==undefined){
                       toastr.error('Pilih Data Dulu','Informasi'); 
                       return
                    }else{
                        var itemDelete = {
                             "id":$scope.idKeempat,    
                            }
                         manageServicePhp.deleteKelKeempatAnggaran(itemDelete).then(function(e){
                              loadDataGrid();
                              $scope.idKeempat=""
                                 $scope.batal()
                        })
                    }
                  }







            /////////////////////////////////////////////////////////////////////
        }
        ]);
});