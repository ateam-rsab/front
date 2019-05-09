define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PokRKAKLCtrl', ['$q', '$rootScope', '$state', '$scope','DateHelper','$http','$route', 'ModelItem', 'ModelItemAkuntansi', '$window','$mdDialog','ManageServicePhp',
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
            loadTreeview();
            $scope.findData=function(){
                loadTreeview();
                 // $scope.popupDokter.center().open();
             }
             manageServicePhp.getDataTableTransaksi("anggaran/get-data-combo").then(function(e){
               $scope.listHead=e.data.kelompokhead
               $scope.listPertama=e.data.kelompokpertama
               $scope.listKedua=e.data.kelompokkedua
               $scope.listKetiga=e.data.kelompokketiga
               // $scope.listKeempat=e.data.kelompokkeempat
            })
             modelItemAkuntansi.getDataDummyPHP("anggaran/get-kel-keempat-part", true, true, 10).then(function(data) {
                $scope.listKeempat= data;
            });


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
   

                 $scope.treeSourceAnggaran=[];
                 manageServicePhp.getDataTableTransaksi("anggaran/get-pok-rkakl?"
                    + tahunAnggaran
                    + revisiKe
                    + turunanPertama
                    + turunanKedua
                    + turunanKetiga
                    + turunanKeempat
                    + childTerakhir, true).then(function(dat){
                        $scope.isRouteLoading=false;
                         $scope.treeData= dat.data
                         $scope.dataSourceAnggaran=dat.data
                         $scope.totalRM=dat.data[0].grandtotalblu
                         $scope.totalBLU=dat.data[0].grandtotalrm
                         if(dat.data.length==0)
                            toastr.error('Data tidak ada','Informasi');  
                // debugger
                // var inlineDefault = new kendo.data.HierarchicalDataSource({
                //     data: dat.data,
                //     expanded: true, 
                //         // check: onCheck,
                //         schema: {
                //             model: {
                //                 children: "child"
                //             }
                //         }
                //     });
                // $scope.treeSourceAnggaran = inlineDefault
                // $scope.mainTreeViewOptionAnggaran = {
                //     dataTextField: ["mataanggaran" ],
                //     dataValueField: ["id" ],
                //     select: onChange,
                //      // dataBound: 
                //      expanded:true,
                //      dragAndDrop: false,
                //      checkboxes: true,
                //      check: onChange
                //  }

               
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
        // $scope.saveChild=function(){
        //     var id0=""
        //     if ($scope.dataAnggaranSelected.id0!=undefined)   
        //        id0= $scope.dataAnggaranSelected.id0
        //     else
        //        id0= $scope.item.childKode

        //     var id1=""
        //     if ($scope.dataAnggaranSelected.id1!=undefined)
        //         id1= $scope.dataAnggaranSelected.id1
        //     else
        //         id1= $scope.item.childKode

        //     var id2=""
        //     if ($scope.dataAnggaranSelected.id2!=undefined)
        //         id2= $scope.dataAnggaranSelected.id2
        //     else
        //         id2= $scope.item.childKode

        //     var id3=""
        //     if ($scope.dataAnggaranSelected.id3!=undefined)
        //         id3= $scope.dataAnggaranSelected.id3
        //     else
        //         id3= $scope.item.childKode

        //     var id4=""
        //     if ($scope.dataAnggaranSelected.id4!=undefined)
        //         id4= $scope.dataAnggaranSelected.id4
        //     else
        //         id4= $scope.item.childKode

        //     var jsonSave={
        //         "objectheadfk" :id0,
        //         "objectchildpertamafk": id1,
        //         "objectchildkeduafk" :id2,
        //         "objectchildketigafk" :id3,
        //         "objectchildkeempatfk" :id4,
        //         "mataanggaran" :$scope.item.childMataAnggaran,
        //         "revisidivake" :"",
        //         "objectasalprodukfk" : null,
        //         "saldoawalblu" : $scope.item.saldoBlu,
        //         "saldoawalrm" : $scope.item.saldoRm,
        //         "tahun" : moment($scope.item.periodeTahun).format('YYYY'),

        //     }
        //     manageServicePhp.saveChildAnggaran(jsonSave).then(function(e){
        //         kosongkan();
        //         loadTreeview();
        //     })

        // }
          $scope.simpan=function(){
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

            }
            manageServicePhp.saveChildAnggaran(jsonSave).then(function(e){
                kosongkan();
                // loadTreeview();
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
                "norec" : $scope.norec,
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

        // copy checked state from datasource to model
        // function updateChecked(model, dataSource) {
        //   for (var i = 0; i < model.length; i++) {
        //     var dataItem = model[i];
        //     var node = dataSource[i];

        //     dataItem.isChecked = node.checked;

        //     if (dataItem.items) {
        //       updateChecked(dataItem.items, node.children.data());
        //      }
        //     }
        // }

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

        function onExpand (e)  
        {  
            var treeView = $('#treeview').data('kendoTreeView');  
            treeView.expand(".k-item");  
        }  

        function onSelect(e) {

        }
        function onCheck() {

        }
        $scope.klikGrid=function(dataAnggaranSelected){
            if (dataAnggaranSelected!=undefined){
                $scope.item.kodeAnggaran=dataAnggaranSelected.kode
                $scope.item.namaMataAnggaran=dataAnggaranSelected.mataanggaran
                $scope.popUpTreeView.center().open();
         }
        }
        // $scope.klik=function(dataSelected){
        //     if (dataSelected.id!=undefined){
        //         $scope.item.kelompokHead={id:dataSelected.id0,kelompokhead:dataSelected.kelompokhead};
        //         if (dataSelected.childpertama!=undefined)
        //             $scope.item.kelompokPertama={id:dataSelected.id1,childpertama:dataSelected.childpertama};
        //         else
        //             $scope.item.kelompokPertama=""

        //         if(dataSelected.childkedua!=undefined)
        //             $scope.item.kelompokKedua={id:dataSelected.id2,childkedua:dataSelected.childkedua};
        //         else
        //             $scope.item.kelompokKedua=""

        //         if(dataSelected.childketiga!=undefined)
        //             $scope.item.kelompokKetiga={id:dataSelected.id3,childketiga:dataSelected.childketiga};
        //         else
        //             $scope.item.kelompokKetiga=""
        //         if(dataSelected.childkeempat!=undefined)
        //             $scope.item.kelompokKeempat={id:dataSelected.id4,childkeempat:dataSelected.childkeempat};  
        //         else
        //             $scope.item.kelompokKeempat=""

        //         $scope.popUpWin.center().open();
        //      }
        //  }
                         var tahunPriode =  dateHelper.formatDate($scope.item.periodeTahun, 'YYYY');

                         $scope.columnAnggaran = [
                         {
                            "field": "kode",
                            "title": "Kode",
                            "width":"80px"
                        },
                        {
                            "field": "mataanggaran",
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
                        // {
                        //   command: { 
                        //       text: "Tambah Child",
                        //       width:"50px", 
                        //       align:"center",
                        //       attributes: {align:"center"},
                        //       click: addChildren
                        //   },
                        //   title: "",
                        //   width: "80px",
                        // }
                        ];
                          

                          $scope.detailGridOptions = function(dataItem) {
                            return {
                                dataSource: new kendo.data.DataSource({
                                    data: dataItem.child
                                }),
                                columns: [
                                {
                                    "field": "kode",
                                    "title": "Kode",
                                    "width":"140px"
                                },
                                {
                                    "field": "mataanggaran",
                                    "title": "Mata Anggaran",
                                    "width":"450px"
                                },
                                {
                                    "field": "totalrm",
                                    "title": "Total",
                                    "width":"175px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "Total",
                                  "width":"175px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                                }]
                            };
                        };

                        $scope.detailGridOptionsDua = function(dataItem) {

                            return {
                                dataSource: new kendo.data.DataSource({
                                    data: dataItem.child
                                }),
                                columns: [
                                {
                                    "field": "kode",
                                    "title": "Paket Usulan",
                                    "width":"70px"
                                },
                                {
                                    "field": "mataanggaran",
                                    "title": "Paket Usulan",
                                    "width":"340px"
                                },

                                {
                                    "field": "totalrm",
                                    "title": "Harga",
                                    "width":"130px",
                                     // "template": "# if( totalrm==null) {# 0 # } else {{formatRupiah('#: totalrm #', 'Rp.')}} #"
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "total ",
                                    "width":"130px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                                }]
                            };
                        };
                        $scope.detailGridOptionsTiga = function(dataItem) {

                            return {
                                dataSource: new kendo.data.DataSource({
                                    data: dataItem.child
                                }),
                                columns: [
                                {
                                    "field": "kode",
                                    "title": "Paket Usulan",
                                    "width":"70px"
                                },
                                {
                                    "field": "mataanggaran",
                                    "title": "Paket Usulan",
                                    "width":"390px"
                                },

                                {
                                    "field": "totalrm",
                                    "title": "Harga",
                                    "width":"155px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "total ",
                                    "width":"155px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                                }]
                            };
                        };
                        $scope.detailGridOptionsEmpat= function(dataItem) {

                            return {
                                dataSource: new kendo.data.DataSource({
                                    data: dataItem.child
                                }),
                                columns: [
                                {
                                    "field": "kode",
                                    "title": "Paket Usulan",
                                    "width":"50px"
                                },
                                {
                                    "field": "mataanggaran",
                                    "title": "Paket Usulan",
                                    "width":"450px"
                                },

                                {
                                    "field": "totalrm",
                                    "title": "Harga",
                                    "width":"175px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "total ",
                                    "width":"175px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                                }]
                            };
                        };
                        $scope.detailGridOptionsLima= function(dataItem) {

                            return {
                                dataSource: new kendo.data.DataSource({
                                    data: dataItem.child
                                }),
                                columns: [
                                {
                                    "field": "kode",
                                    "title": "Paket Usulan",
                                    "width":"40px"   
                                },
                                {
                                    "field": "mataanggaran",
                                    "title": "Paket Usulan",
                                    "width":"450px"
                                },

                                {
                                    "field": "totalrm",
                                    "title": "Harga",
                                    "width":"175px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm  #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "total ",
                                     "width":"175px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu  #', 'Rp.')}}</span>"
                                },
                                {
                                  command: { 
                                      text: "Edit",
                                      width:"50px", 
                                      align:"center",
                                      attributes: {align:"center"},
                                      click: editChild
                                  },
                                  title: "",
                                  width: "80px",
                                },
                                  {
                                  command: { 
                                      text: "Hapus",
                                      width:"50px", 
                                      align:"center",
                                      attributes: {align:"center"},
                                      click: hapusChild
                                  },
                                  title: "",
                                  width: "80px",
                                }]
                            };
                        };
                      function addChildren(e){
                          e.preventDefault();
                            var grid = this;
                            var row = $(e.currentTarget).closest("tr");
                            var tr = $(e.target).closest("tr");
                            var dataItem = this.dataItem(tr); 
                            $scope.tempDataTindakan = $scope.dataSourceAnggaran
                            .filter(function(el){
                              return el.name !== grid[0].name;
                            });
                            grid.removeRow(row);
                            var data ={};
                            if (dataItem != undefined){
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    if (data2[i].rowNumber ==  dataItem.rowNumber){ 
                                        data2.splice(i, 1);
                                        for (var i = data2.length - 1; i >= 0; i--) {
                                           
                                            data2[i].rowNumber = i+1
                                        }
                                        $scope.dataTindakan = new kendo.data.DataSource({
                                            data: data2
                                        });
                                    }
                                }
                            }
                        }
                        function editChild(e){
                           e.preventDefault();
                                var grid = this;
                                var row = $(e.currentTarget).closest("tr");
                                var tr = $(e.target).closest("tr");
                                var dataItem = this.dataItem(tr);   

                                if (dataItem!=undefined){
                                    $scope.norec=dataItem.norec;
                                    manageServicePhp.getDataTableTransaksi("anggaran/get-child-bynorec?norec="+
                                        dataItem.norec
                                        )
                                    .then(function(dat){
                                        $scope.item.kelompokHead={id:dat.data.data[0].id0,kelompokhead:dat.data.data[0].kelompokhead};
                                        $scope.item.kelompokPertama={id:dat.data.data[0].id1,childpertama:dat.data.data[0].childpertama};
                                        $scope.item.kelompokKedua={id:dat.data.data[0].id2,childkedua:dat.data.data[0].childkedua};
                                        $scope.item.kelompokKetiga={id:dat.data.data[0].id3,childketiga:dat.data.data[0].childketiga};
                                        // $scope.item.revisiKes={id:dat.data.data[0].id3,name:dat.data.data[0].revisidivake}
                                    })
                                    
                                    modelItemAkuntansi.getDataTableTransaksi("anggaran/get-kel-keempat-part?childkeempat="
                                        +dataItem.childkeempat, true, true, 10)
                                        .then(function(data) {
                                 
                                        $scope.listKeempat.add(data[0])
                                        $scope.item.kelompokKeempat = data[0];

                                    })
                                    // $scope.item.kelompokKeempat={id:dataItem.id4,childkeempat:dataItem.childkeempat};  
                                    $scope.item.mataAnggarans=dataItem.mataanggaran;
                                    if (dataItem.totalblu==null)
                                    {
                                        dataItem.totalblu=0;
                                    }
                                    if (dataItem.totalrm==null)
                                    {
                                        dataItem.totalrm=0;
                                    }
                                    $scope.item.saldoBlus=parseFloat(dataItem.totalblu);
                                    $scope.item.saldoRms=parseFloat(dataItem.totalrm);
                                }
                                                
                                 $scope.popUpWin.center().open();
                        }
                        function hapusChild(e){
                               e.preventDefault();
                                var grid = this;
                                var row = $(e.currentTarget).closest("tr");
                                var tr = $(e.target).closest("tr");
                                var dataItem = this.dataItem(tr); 
                        
                                var itemDelete = {
                                            "norec": dataItem.norec,    
                                        }
                                 manageServicePhp.hapusChildAnggaran(itemDelete).then(function(e){
                                    if(e.status === 201){
                                         loadTreeview();
                                            grid.removeRow(row);
                                    }
                                })
                        }
                        $scope.Cetak = function(){

                            var xxx = $scope.dataPasienSelected.detail;
                            var yyy = "aasas";
                        }
                        $scope.refresh = function() {
                          /*$route.reload('#/DetailRKAKL');*/
                          location.reload();
                          /*$scope.item = "";*/

                      }

                      $scope.formatRupiah = function(value, currency) {
                        if (value=="null")
                            value=0
                        return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    };
            /////////////////////////////////////////////////////////////////////
        }
        ]);
});