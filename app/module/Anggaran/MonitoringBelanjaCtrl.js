define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitoringBelanjaCtrl', ['$q', '$rootScope', '$state', '$scope','DateHelper','$http','$route', 'ModelItem', 'ModelItemAkuntansi', '$window','$mdDialog','ManageServicePhp',
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
            var sisa=0;
            
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
                 manageServicePhp.getDataTableTransaksi("anggaran/get-daftar-monitoring-mataanggaran?"
                          + tahunAnggaran
                          + revisiKe
                          + turunanPertama
                          + turunanKedua
                          + turunanKetiga
                          + turunanKeempat
                          + childTerakhir, true).then(function(dat){
                               for (var i = 0; i < dat.data.data.length; i++) {
                                      dat.data.data[i].no = i+1
                               }
                               $scope.isRouteLoading=false;
                               if(dat.data.data.length==0){
                                  $scope.totalRM=0
                                  $scope.totalBLU=0
                                  $scope.totalBelanja=0
                                  toastr.error('Data tidak ada','Informasi');  
                               }
                              $scope.totalRM=dat.data.data[0].totalrm
                              $scope.totalBLU=dat.data.data[0].totalblu
                              $scope.totalBelanja=dat.data.data[0].totalbelanja
                            
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
                    "totalbelanja" : currentItem.totalbelanja,

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
          debugger;
          if (dataAnggaranSelected!=undefined){

              $scope.item.tahun=dataAnggaranSelected.tahun;
              $scope.item.kodeMataAnggaranD=dataAnggaranSelected.kode;
              $scope.item.namaMataAnggaranD=dataAnggaranSelected.descc;
              $scope.item.totalMata=dataAnggaranSelected.totalrm+dataAnggaranSelected.totalblu;
              $scope.item.realisasiBelanja=dataAnggaranSelected.totalbelanja;
              $scope.item.sisa=dataAnggaranSelected.sisabelanja;
              manageServicePhp.getDataTableTransaksi("anggaran/get-daftar-riwayat-realisasi?"+
                    "&tahun="+$scope.item.tahun).then(function(e){
                       var data = e.data.daftar;
                       for (var i = 0; i < data.length; i++) {
                          data[i].no = i+1
                      }
                      
                      $scope.dataGrid = {
                        data : data
                      };
              })

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
                                    "field": "descc",
                                    "title": "Mata Anggaran",
                                    "width":"200px"
                                },
                                {
                                    "field": "totalrm",
                                    "title": "Saldo Awal RM",
                                    "width":"110px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalrm #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalblu",
                                    "title": "Saldo Awal BLU",
                                    "width":"110px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalblu #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "totalbelanja",
                                    "title": "Total Realisasi",
                                    "width":"110px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: totalbelanja #', 'Rp.')}}</span>"
                                },
                                {
                                    "field": "sisabelanja",
                                    "title": "Sisa Belanja",
                                    "width":"110px",
                                    "template": "<span class='style-right'>{{formatRupiah('#: sisabelanja #', 'Rp.')}}</span>"
                                }
                        ],
                    }

                $scope.formatRupiah = function(value, currency) {
                    if (value=="null")
                        value=0
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                };

                $scope.columnGrid = [
                    {
                        "field": "no",
                        "title": "No",
                        "width":"50px"
                    },
                    {
                        "field": "nostruk",
                        "title": "No Struk",
                        "width":"300px"
                    },
                    {
                        "field": "keteranganlainnya",
                        "title": "Nama Realisasi",
                        "width":"300px"
                    },
                    {
                        "field": "totalharusdibayar",
                        "title": "Total",
                        "width":"150px",
                        "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #', 'Rp.')}}</span>"
                    },
                ];

                $scope.detailGridOptions = function(dataItem) {
                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.details
                        }),
                        columns: [
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width" : "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width" : "30px",
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscount",
                            "title": "Discount",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        },
                        {
                            "field": "hargappn",
                            "title": "PPn",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargappn #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        },
                        {
                            "field": "tglkadaluarsa",
                            "title": "Tgl Kadaluarsa",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                        },
                        {
                            "field": "nobatch",
                            "title": "nobatch",
                            "width" : "50px"
                        }
                      ]
                    };
                };
        }
        ]);
});