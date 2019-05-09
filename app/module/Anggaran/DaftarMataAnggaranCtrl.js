define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarMataAnggaranCtrl', ['$q', '$rootScope', '$state', '$scope','DateHelper','$http','$route', 'ModelItem', 'ModelItemAkuntansi', '$window','$mdDialog','ManageServicePhp',
        function($q, $rootScope, $state ,$scope,dateHelper,$http,$route , ModelItem, modelItemAkuntansi, window, $mdDialog, manageServicePhp) {
            $scope.dataVOloaded = true;
            $scope.isRouteLoading=false;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.periodeTahun = $scope.now;
            $scope.item.periodeTahuns = $scope.now;
            $scope.dataAnggaranSelected={};
            $scope.dataSelected={};
            $scope.item.saldoRms=0;
            $scope.item.saldoBlus=0;
            
            $scope.monthSelectorOptions = function() {
                return {
                    start: "year",
                    depth: "year"
                }
            }

            $scope.listRevisiKe = [
            {
                "id": 1, "name": "I"
            },{    
                "id": 2, "name": "II"
            },{
                "id": 3, "name": "III"
            },{
                "id": 4, "name": "IV"
            },{
                "id": 5, "name": "V"
            }
            ];

            $scope.item.revisiKe=$scope.listRevisiKe[2];   

            loadTreeview();

            $scope.findData=function(){
                loadTreeview();
                 // $scope.popupDokter.center().open();
             }
             manageServicePhp.getDataTableTransaksi("anggaran/get-data-combo").then(function(e){
               $scope.listHead=e.data.kelompokhead
               $scope.listPertama=e.data.kelompokpertama
               // $scope.listKedua=e.data.kelompokkedua
               // $scope.listKetiga=e.data.kelompokketiga
               $scope.listPengendali=e.data.pengendali
               $scope.listPengendali1=e.data.pengendali
               // $scope.listKeempat=e.data.kelompokkeempat
            });
             
            modelItemAkuntansi.getDataDummyPHP("anggaran/get-kel-keempat-part", true, true, 10).then(function(data) {
                $scope.listKeempat= data;
            });
            modelItemAkuntansi.getDataDummyPHP("anggaran/get-kel-ketiga-part", true, true, 10).then(function(data) {
                $scope.listKetiga= data;
            });
            modelItemAkuntansi.getDataDummyPHP("anggaran/get-kel-kedua-part", true, true, 10).then(function(data) {
                $scope.listKedua= data;
            });

        $scope.$watch('item.namaMataAnggaran', function(newValue, oldValue) {
              var layananFilter =[];
              var txtnaonwelah ='';
              // debugger

                for ( var z = $scope.treeSourceAnggaran[0].length - 1; z >= 0; z--) {
                  txtnaonwelah=' ' +  $scope.treeSourceAnggaran[0][z].desc;
                  txtnaonwelah = txtnaonwelah.toUpperCase()
                  if (txtnaonwelah != null) {
                    if (parseFloat(txtnaonwelah.indexOf($scope.item.namaMataAnggaran.toUpperCase())) > 0) {
                      layananFilter.push( $scope.treeSourceAnggaran[0][z])
                    } 
                  }                  
                }
                if ($scope.item.namaMataAnggaran == '') {
                   for (var i = 0; i < $scope.treeSourceAnggaran[0].length; i++) {
                               $scope.treeSourceAnggaran[0][i].no = i+1
                     }
                  layananFilter =  $scope.treeSourceAnggaran[0]
                }
                $scope.dataSourceAnggaran = new kendo.data.DataSource({
                  data: layananFilter,
                        // pageSize: 20,
                  group: [
                          ],
                });
            
             })

             function loadTreeview (){
                 $scope.isRouteLoading=true;
                 var tahunAnggaran =""
                 if ($scope.item.periodeTahun != undefined){
                     tahunAnggaran ="tahun=" + moment($scope.item.periodeTahun).format('YYYY')
                 }
                 var revisiKe =""
                 if ($scope.item.revisiKe != undefined){
                     revisiKe ="&revisike=" +$scope.item.revisiKe.name
                 }
                var turunanPertama =""
                 if ($scope.item.turunanPertama != undefined){
                     turunanPertama ="&childPertama=" +$scope.item.turunanPertama.id
                 }   
                
                 var turunanKedua =""
                 if ($scope.item.turunanKedua != undefined){
                     turunanKedua ="&childKedua=" +$scope.item.turunanKedua.id
                 }   

                 var turunanKetiga =""
                 if ($scope.item.turunanKetiga != undefined){
                     turunanKetiga ="&childKetiga=" +$scope.item.turunanKetiga.id
                 }   

                 var turunanKeempat =""
                 if ($scope.item.turunanKeempat != undefined){
                     turunanKeempat ="&childKeempat=" +$scope.item.turunanKeempat.id
                 }   

                 var childTerakhir =""
                 if ($scope.item.childTerakhir != undefined){
                     childTerakhir ="&childMataAnggaran=" +$scope.item.childTerakhir
                 }   

                 var Pengendali =""
                 if ($scope.item.Pengendali1 != undefined){
                     Pengendali ="&Pengendali=" +$scope.item.Pengendali1.id
                 }  

                 var blu = 0;
                 var rm = 0;
                 $scope.treeSourceAnggaran=[];
                 manageServicePhp.getDataTableTransaksi("anggaran/get-daftar-mataanggaran?"
                    + tahunAnggaran
                    + revisiKe
                    + turunanPertama
                    + turunanKedua
                    + turunanKetiga
                    + turunanKeempat
                    + childTerakhir
                    + Pengendali, true).then(function(dat){
                         for (var i = 0; i < dat.data.data.length; i++) {
                                dat.data.data[i].no = i+1
                                blu = blu + parseFloat(dat.data.data[0].totalrm)
                                rm = rm + parseFloat(dat.data.data[0].totalblu)
                          }
                         $scope.isRouteLoading=false;
                         if(dat.data.data.length==0){
                            $scope.totalRM=0
                            $scope.totalBLU=0
                            toastr.error('Data tidak ada','Informasi');  
                         }
                        $scope.totalRM=rm;
                        $scope.totalBLU=blu;
                      
                         $scope.dataSourceAnggaran =  new kendo.data.DataSource({
                                data:dat.data.data,
                                pageable: false,
                                pagesize: 10,
                              
                    })

                 $scope.treeSourceAnggaran.push(dat.data.data);
                         
                     
            
            });

                }
                function onChange(e) {
                 var currentItem = e.sender.dataItem(e.node),
                 modelItem = findModelItem($scope.treeData, currentItem.id);

                 var dataSource = [{
                    "id0" : currentItem.id0,
                    "id1" : currentItem.id1,
                    "id2" : currentItem.id2,
                    "id3" : currentItem.id3,
                    "id4" : currentItem.id4,
                    "kode" : currentItem.kode,
                    "mataanggaran" : currentItem.mataanggaran,
                    "totalrm" : currentItem.totalrm,
                    "totalblu" : currentItem.totalblu,

                }]
                $scope.dataSourceAnggaran=dataSource
                   // updateChecked($scope.treeData, e.sender.dataSource.data());

               }
               function findModelItem(model, id) {
                  for (var i = 0; i < model.length; i++) {
                    var currentItem = model[i];
                    if(currentItem.id === id){
                      return currentItem;
                  }
                  if (currentItem.child) {
                      var found = findModelItem(currentItem.child, id);
                      if (found) {
                        return found;
                    }
                }
            }
        }
      
          $scope.simpan=function(){
            var periodeTahuns=""
            if ($scope.item.periodeTahuns!=undefined)   
               periodeTahuns= moment($scope.item.periodeTahuns).format('YYYY')

            var revisiKes=null
            if ($scope.item.revisiKes!=undefined)
                revisiKes= $scope.item.revisiKes.name

            var kelompokHead=null
            if ($scope.item.kelompokHead!=undefined)
                kelompokHead= $scope.item.kelompokHead.id

            var kelompokPertama=null
            if ($scope.item.kelompokPertama!=undefined)
                kelompokPertama= $scope.item.kelompokPertama.id

            var kelompokKedua=null
            if ($scope.item.kelompokKedua!=undefined)
                kelompokKedua= $scope.item.kelompokKedua.id

            var kelompokKetiga=null
            if ($scope.item.kelompokKetiga!=undefined)
                kelompokKetiga= $scope.item.kelompokKetiga.id

            var kelompokKeempat=null
            if ($scope.item.kelompokKeempat!=undefined)
                kelompokKeempat= $scope.item.kelompokKeempat.id

            var saldoBLU=0
            if($scope.item.saldoBlus!=undefined)
                saldoBLU = $scope.item.saldoBlus

            var saldoRM=0
            if($scope.item.saldoRms!=undefined)
                saldoRM = $scope.item.saldoRms

            var pengendali=null
            if ($scope.item.Pengendali != undefined) {
                pengendali = $scope.item.Pengendali.id
            }

            var jsonSave={
                "norec" :"",
                "objectheadfk" :kelompokHead,
                "objectchildpertamafk": kelompokPertama,
                "objectchildkeduafk" :kelompokKedua,
                "objectchildketigafk" :kelompokKetiga,
                "objectchildkeempatfk" :kelompokKeempat,
                "mataanggaran" :$scope.item.mataAnggarans,
                "revisidivake" :revisiKes,
                "objectasalprodukfk" : null,
                "saldoawalblu" : saldoBLU,
                "saldoawalrm" :saldoRM,
                "tahun" : periodeTahuns,
                "pengendali" : pengendali,

            }
            manageServicePhp.saveChildAnggaran(jsonSave).then(function(e){
                kosongkan();
                loadTreeview();
            })

        }
        $scope.edit=function(){
            var periodeTahuns=""
            if ($scope.item.periodeTahuns!=undefined)   
               periodeTahuns= moment($scope.item.periodeTahuns).format('YYYY')

            var revisiKes=""
            if ($scope.item.revisiKes!=undefined)
                revisiKes= $scope.item.revisiKes.name

            var kelompokHead=""
            if ($scope.item.kelompokHead!=undefined)
                kelompokHead= $scope.item.kelompokHead.id

            var kelompokPertama=""
            if ($scope.item.kelompokPertama!=undefined)
                kelompokPertama= $scope.item.kelompokPertama.id

            var kelompokKedua=""
            if ($scope.item.kelompokKedua!=undefined)
                kelompokKedua= $scope.item.kelompokKedua.id

            var kelompokKetiga=""
            if ($scope.item.kelompokKetiga!=undefined)
                kelompokKetiga= $scope.item.kelompokKetiga.id

            var kelompokKeempat=""
            if ($scope.item.kelompokKeempat!=undefined)
                kelompokKeempat= $scope.item.kelompokKeempat.id

            var saldoBLU=0
            if($scope.item.saldoBlus!=undefined)
                saldoBLU=$scope.item.saldoBlus

            var saldoRM=0
            if($scope.item.saldoRms!=undefined)
                saldoRM=$scope.item.saldoRms

            var jsonSave={
                "norec" : $scope.norecMA,
                "objectheadfk" :kelompokHead,
                "objectchildpertamafk": kelompokPertama,
                "objectchildkeduafk" :kelompokKedua,
                "objectchildketigafk" :kelompokKetiga,
                "objectchildkeempatfk" :kelompokKeempat,
                "mataanggaran" :$scope.item.mataAnggarans,
                "revisidivake" :revisiKes,
                "objectasalprodukfk" : null,
                "saldoawalblu" :saldoBLU,
                "saldoawalrm" :saldoRM,
                "tahun" : periodeTahuns,

            }
            manageServicePhp.saveChildAnggaran(jsonSave).then(function(e){
                kosongkan();
                loadTreeview();
            })

        }
        function kosongkan(){
            $scope.item.saldoBlu=""
            $scope.item.saldoRm=""
            // $scope.item.childMataAnggaran=""
            // $scope.item.kelompokHead=""
            // $scope.item.kelompokPertama=""
            // $scope.item.kelompokKedua=""
            // $scope.item.kelompokKetiga=""
            // $scope.item.kelompokKeempat=""
            $scope.item.saldoBlus=0
            $scope.item.saldoRms=0
            $scope.item.mataAnggarans=""

        }

    
        $scope.klikGrid=function(dataAnggaranSelected){
            if (dataAnggaranSelected!=undefined){
                $scope.item.kodeAnggaran=dataAnggaranSelected.kode
                // $scope.item.namaMataAnggaran=dataAnggaranSelected.desc
                // $scope.popUpTreeView.center().open();
         }
        }
          var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');

                         $scope.columnAnggaran ={
                             dataSource:$scope.dataSourceAnggaran,
                             pageable: false,
                             selectable: "row",
                             columns:[
                                {
                                    "field": "no", 
                                    "title": "No. ",
                                    "template": "<span class='style-center'>#: no #</span>",
                                    "width":"15px"
                                },
                                {
                                    "field": "kd",
                                    "title": "Kode",
                                    "width":"80px",
                                    "template": "<span style='font-weight: bold;'>#: kd #</span>",
                                },
                                {
                                    "field": "desc",
                                    "title": "Mata Anggaran",
                                    "width":"200px"
                                },
                                {
                                    "field": "totalrm",
                                    "title": "Saldo Awal RM",
                                    "width":"80px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "Saldo Awal BLU",
                                    "width":"80px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                                },
                                //  { 
                                //     "command": ["edit"],
                                //     title: " ",
                                //     width: "80px" 
                                // }
                                
                        ],
                         toolbar: [
                            {
                                "name": "edit",
                                "text": "Edit Data",
                                "template": '<a ng-click="editGrid()" class="k-button k-button-icontext k-grid-upload">Edit Data</a>'   
                            },
                            {
                                "name": "add",
                                "text": "Hapus Data",
                                "template": '<a ng-click="hapusGrid()" class="k-button k-button-icontext k-grid-upload">Hapus Data</a>'   
                            }
                            ]
                    }
                                  
                  $scope.hapusGrid = function(){
                    var arrNorec=$scope.dataAnggaranSelected.kode.split('~');
                    if (arrNorec[1]==undefined){
                       toastr.error('Hanya child terbawah yang bisa di Hapus','Informasi'); 
                       return
                    }else{
                        var itemDelete = {
                             "norec":arrNorec[1],    
                            }
                         manageServicePhp.hapusChildAnggaran(itemDelete).then(function(e){
                              if(e.status === 201){
                              loadTreeview();
                          }
                        })
                    }
                  }
                  $scope.editGrid = function(){
                    var arrNorec=$scope.dataAnggaranSelected.kode.split('~');
                    if (arrNorec[1]==undefined){
                       toastr.error('Hanya child terbawah yang bisa di edit','Informasi'); 
                       return
                    }else{
                        $scope.norecMA=arrNorec[1];
                                    manageServicePhp.getDataTableTransaksi("anggaran/get-child-bynorec?norec="+
                                        $scope.norecMA
                                        )
                                    .then(function(dat){
                                        $scope.item.kelompokHead={id:dat.data.data[0].id0,kelompokhead:dat.data.data[0].kelompokhead};
                                        $scope.item.kelompokPertama={id:dat.data.data[0].id1,childpertama:dat.data.data[0].childpertama};
                                        $scope.item.kelompokKedua={id:dat.data.data[0].id2,childkedua:dat.data.data[0].childkedua};
                                        $scope.item.kelompokKetiga={id:dat.data.data[0].id3,childketiga:dat.data.data[0].childketiga};
                                        // $scope.item.revisiKes={id:dat.data.data[0].id3,name:dat.data.data[0].revisidivake}

                                        modelItemAkuntansi.getDataTableTransaksi("anggaran/get-kel-keempat-part?childkeempat="
                                            +dat.data.data[0].childkeempat, true, true, 10)
                                            .then(function(data) {
                                            $scope.listKeempat.add(data[0])
                                            $scope.item.kelompokKeempat = data[0];

                                        })
                                    })
                                
                                    // $scope.item.kelompokKeempat={id:dataItem.id4,childkeempat:dataItem.childkeempat};  
                                    $scope.item.mataAnggarans=$scope.dataAnggaranSelected.desc;
                                    if ($scope.dataAnggaranSelected.totalblu==null)
                                    {
                                        $scope.dataAnggaranSelected.totalblu=0;
                                    }
                                    if ($scope.dataAnggaranSelected.totalrm==null)
                                    {
                                        $scope.dataAnggaranSelected.totalrm=0;
                                    }
                                    $scope.item.saldoBlus=parseFloat($scope.dataAnggaranSelected.totalblu);
                                    $scope.item.saldoRms=parseFloat($scope.dataAnggaranSelected.totalrm);
                        
                        $scope.popUpWin.center().open();
                    }                    
                  }


                    $scope.formatRupiah = function(value, currency) {
                        if (value=="null")
                            value=0
                        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    };
                      // function addChildren(e){
                      //     e.preventDefault();
                      //       var grid = this;
                      //       var row = $(e.currentTarget).closest("tr");
                      //       var tr = $(e.target).closest("tr");
                      //       var dataItem = this.dataItem(tr); 
                      //       $scope.tempDataTindakan = $scope.dataSourceAnggaran
                      //       .filter(function(el){
                      //         return el.name !== grid[0].name;
                      //       });
                      //       grid.removeRow(row);
                      //       var data ={};
                      //       if (dataItem != undefined){
                      //           for (var i = data2.length - 1; i >= 0; i--) {
                      //               if (data2[i].rowNumber ==  dataItem.rowNumber){ 
                      //                   data2.splice(i, 1);
                      //                   for (var i = data2.length - 1; i >= 0; i--) {
                                           
                      //                       data2[i].rowNumber = i+1
                      //                   }
                      //                   $scope.dataTindakan = new kendo.data.DataSource({
                      //                       data: data2
                      //                   });
                      //               }
                      //           }
                      //       }
                      //   }
                      //   function editChild(e){
                      //      e.preventDefault();
                      //           var grid = this;
                      //           var row = $(e.currentTarget).closest("tr");
                      //           var tr = $(e.target).closest("tr");
                      //           var dataItem = this.dataItem(tr);   

                      //           if (dataItem!=undefined){
                      //               $scope.norec=dataItem.norec;
                      //               manageServicePhp.getDataTableTransaksi("anggaran/get-child-bynorec?norec="+
                      //                   dataItem.norec
                      //                   )
                      //               .then(function(dat){
                      //                   $scope.item.kelompokHead={id:dat.data.data[0].id0,kelompokhead:dat.data.data[0].kelompokhead};
                      //                   $scope.item.kelompokPertama={id:dat.data.data[0].id1,childpertama:dat.data.data[0].childpertama};
                      //                   $scope.item.kelompokKedua={id:dat.data.data[0].id2,childkedua:dat.data.data[0].childkedua};
                      //                   $scope.item.kelompokKetiga={id:dat.data.data[0].id3,childketiga:dat.data.data[0].childketiga};
                      //                   // $scope.item.revisiKes={id:dat.data.data[0].id3,name:dat.data.data[0].revisidivake}
                      //               })
                                    
                      //               modelItemAkuntansi.getDataTableTransaksi("anggaran/get-kel-keempat-part?childkeempat="
                      //                   +dataItem.childkeempat, true, true, 10)
                      //                   .then(function(data) {
                                 
                      //                   $scope.listKeempat.add(data[0])
                      //                   $scope.item.kelompokKeempat = data[0];

                      //               })
                      //               // $scope.item.kelompokKeempat={id:dataItem.id4,childkeempat:dataItem.childkeempat};  
                      //               $scope.item.mataAnggarans=dataItem.mataanggaran;
                      //               if (dataItem.totalblu==null)
                      //               {
                      //                   dataItem.totalblu=0;
                      //               }
                      //               if (dataItem.totalrm==null)
                      //               {
                      //                   dataItem.totalrm=0;
                      //               }
                      //               $scope.item.saldoBlus=parseFloat(dataItem.totalblu);
                      //               $scope.item.saldoRms=parseFloat(dataItem.totalrm);
                      //           }
                                                
                      //            $scope.popUpWin.center().open();
                      //   }
                        // function hapusChild(e){
                        //        e.preventDefault();
                        //         var grid = this;
                        //         var row = $(e.currentTarget).closest("tr");
                        //         var tr = $(e.target).closest("tr");
                        //         var dataItem = this.dataItem(tr); 
                        
                        //         var itemDelete = {
                        //                     "norec": dataItem.norec,    
                        //                 }
                        //          manageServicePhp.hapusChildAnggaran(itemDelete).then(function(e){
                        //             if(e.status === 201){
                        //                  loadTreeview();
                        //                     grid.removeRow(row);
                        //             }
                        //         })
                        // }
                       

            /////////////////////////////////////////////////////////////////////
        }
        ]);
});