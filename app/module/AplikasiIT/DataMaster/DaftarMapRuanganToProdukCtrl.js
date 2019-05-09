
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarMapRuanganToProdukCtrl', ['$q', '$rootScope', '$state','$scope', 'ModelItemAkuntansi','CacheHelper','DateHelper','ManageLogistikPhp','$mdDialog',
		function($q, $rootScope,$state, $scope,modelItemAkuntansi,cacheHelper,dateHelper,manageLogistikPhp,$mdDialog) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.chkBool=true;
			$scope.showIdMenu=true
            DataCombo()
           $scope.null = function(){
            $scope.item = {};   
           }

           function DataCombo() {
                manageLogistikPhp.getDataTableTransaksi("iti/get-daftar-combo", true).then(function(dat){
                    $scope.listDepartement= dat.data.datadept;
                });

                modelItemAkuntansi.getDataDummyPHP("iti/get-data-produk", true, true, 20).then(function(data) {
                    $scope.listProduk = data;
                });
           }

           function LoadData() {
                if($scope.item.ruangan == undefined){
                     alert("Ruangan Belum Dipilih!!")
                     return
                }
                var ruanganId="";
                if ($scope.item.ruangan !== undefined) {
                    ruanganId ="&ruangan=" +$scope.item.ruangan.id
                }

                var kdproduk="";
                if ($scope.item.Produk !== undefined) {
                    kdproduk = "&kdproduk=" +$scope.item.Produk.kdproduk;
                }
                manageLogistikPhp.getDataTableTransaksi("iti/get-data-mapping-ruangan-to-produk?"
                    +ruanganId+kdproduk, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var datas = dat.data.datas;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                        datas[i].statCheckbox = false;
                    }
                    $scope.dataSource = new kendo.data.DataSource({
                        data: datas,
                        pageSize: 50,
                        total: datas.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });                    
                });
           }
		  
		    $scope.RuanganToDepartement = function(){
    		    // manageLogistikPhp.getDataTableMaster("produk/get-ruanganbyidDepart/"+$scope.item.departemen.id, true).then(function(dat){
    		    //       $scope.listruangan= dat.data;
    		    // });
                $scope.listruangan = $scope.item.departemen.ruangan
		    }

            // $scope.ruangan = function(){
            //     ////debugger
            //     manageLogistikPhp.getDataTableMaster("produk/get-produkbyIdformap?idruang="+$scope.item.ruangan.id, true).then(function(dat){
            //     //debugger
            //     var daftarProduk = dat.data;
            //      //Kosongkan dataSource statcheckbox = false
            //      for(var i=0; i<daftarProduk.length; i++)
            //             {var idx = daftarProduk[i].id;
            //                 for(var y= 0; y<$scope.dataSource._data.length; y++){
            //                     if($scope.dataSource._data[y].id != idx){
            //                          $scope.dataSource._data[y].statCheckbox=false;
            //                     }
            //                 }
            //             }
                
            //      //Run To statcheckbox = True
            //      var TempValidasi = [];
            //         for(var i=0; i<daftarProduk.length; i++)
            //             {var idx = daftarProduk[i].id;
            //                 for(var y= 0; y<$scope.dataSource._data.length; y++){
            //                     //debugger
            //                     if($scope.dataSource._data[y].id == idx){
            //                          $scope.dataSource._data[y].statCheckbox=true;
            //                         var hello = $scope.dataSource._data[y].statCheckbox;
            //                         var dataTemp = { "status" : hello,
            //                                         "idStatus" : $scope.dataSource._data[y].id }
            //                        TempValidasi.push(dataTemp)
            //                     }
                              
            //                 }
            //             }
            //         $scope.TempValidasi = TempValidasi;



                  
            //     UbahGrid($scope.dataSource._data);
            //     });
            // }
            
            $scope.active = true;
            $scope.detailjenisToProduk = function(){
            ////debugger
            $scope.KondisiCariSimpan = false;
            manageLogistikPhp.getDataTableMaster("produk/get-produkbyIdformap?iddjenis="+$scope.item.detailjenis.id, true).then(function(dat){
            $scope.daftarProduk = dat.data;
            var daftarProduk = dat.data;
                     for(var i=0; i<daftarProduk.length; i++)
                        {
                            daftarProduk[i].statCheckbox = false;
                        }
            $scope.dataSource = new kendo.data.DataSource({
            pageSize:50,
            data : daftarProduk,
            $scrollable : true,
            total : daftarProduk.length });
            var grid = $('#kGrid').data("kendoGrid");
            grid.setDataSource($scope.dataSource);
            grid.refresh();
                    if($scope.item.detailjenis.id != undefined){
                        $scope.active = false
                        }else{
                            $scope.active = true
                              }
               if($scope.item.ruangan != undefined){
               $scope.ruangan();
            }
                        
            });

            }

            $scope.SearchData = function(){
            ////debugger
            // $scope.KondisiCariSimpan = true;
            // var NamaProduk;
            // if ($scope.item.Produk === undefined) {
            //     NamaProduk = "";
            // }else {
            //     NamaProduk = $scope.item.Produk
            // }
            // manageLogistikPhp.getFieldMapRuanganToProduk(NamaProduk).then(function(e) {
            //     //debugger
            //     for(var i=0; i<e.data.length; i++)
            //             {
            //             e.data[i].statCheckbox = false;
            //             }
            //     $scope.dataSource = new kendo.data.DataSource({
            //         data: e.data,
            //         schema: {
            //             model: {
            //                 id: "id",
            //                 fields: {
            //                     kdproduk: {editable: false, type: "number"},
            //                     kdbarcode: {editable: false, type: "number"},
            //                     deskripsiproduk: {editable: false, type: "string"},
            //                     namaproduk: {editable: false, type: "string"}
            //                 }
            //             }
            //         },
            //         pageSize: 20,
            //     });

            //      if($scope.item.Produk != undefined){
            //             $scope.active = false
            //             }else{
            //                 $scope.active = true
            //                   }
            
            // if($scope.item.ruangan != undefined){
            //     $scope.ruangan();
            // }
            // })
            LoadData();
        }

            $scope.mainGridOptions = {
              editable: "popup",
                pageable: true,
                //scrollable: true,
                // height: 300,
                selectable: "row",
                columns: $scope.columnProduk,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startsWith: "Cari Produk",
                           // eq: "Is equal to",
                           // neq: "Is not equal to"
                        }
                    }
                },
            };
    
            $scope.columnProduk = [
                { 
                    "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                    template: "# if (statCheckbox) { #"+
                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
                    "# } else { #"+
                    "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
                    "# } #",
                    width:"50px"
                },
                {
                    "field": "id",
                    "title": "<center style='font-size: 14px; font-weight: bold'>Id</center>",
                    "width":"85px"
            
                },
                {
                    "field": "idproduk",
                    "title": "<center style='font-size: 14px; font-weight: bold'>Id Produk</center>",
                    "width":"85px"
            
                },
                {
                    "field": "statusenabled",
                    "title": "<center style='font-size: 14px; font-weight: bold'>Statusenabled</center>",
                    "width":"100px"
            
                },
                {
                    "field": "namaproduk",
                    "title": "<center style='font-size: 14px; font-weight: bold'>Nama Produk</center>",
                    "width":"350px"
            
                },
                {
                    "field": "namaruangan",
                    "title": "<center style='font-size: 14px; font-weight: bold'>Nama Ruangan</center>",
                    "width":"350px"
            
                }
            ];

            
            $scope.selectRow = function(dataItem)
            {
               
                var dataSelect = _.find($scope.dataSource._data, function(data){
                    return data.id == dataItem.id; 
                });

                if(dataSelect.statCheckbox){
                    dataSelect.statCheckbox = false;
                }
                else
                {
                    dataSelect.statCheckbox = true;
                }
                
                $scope.tempCheckbox = dataSelect.statCheckbox;
                
                // UbahGrid($scope.dataSource._data);
              
            }


            var isCheckAll = false
            $scope.selectUnselectAllRow = function()
            {
                var tempData = $scope.dataSource._data;

                if(isCheckAll)
                {
                    isCheckAll = false;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = false;
                    }
                }
                else{
                    isCheckAll = true;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = true;
                    }
                }
                UbahGrid(tempData);
            }

            // function UbahGrid(ds)
            // {

            //     var newDs = new kendo.data.DataSource({
            //         data: ds,
            //         pageSize: 10,
            //         total: ds.length,
            //         serverPaging: false,
            //     });

            //     var grid = $('#kGrid').data("kendoGrid");

            //     grid.setDataSource(newDs);
            //     grid.refresh();
            //     $scope.dataVOloaded = true;
            // }
                 
            //     $scope.jenis = function(){
            //     manageLogistikPhp.getDataTableMaster("produk/jenis-produk?idkp="+$scope.item.kelompokproduk.id, true).then(function(dat){
            //     $scope.listjenisProduk = dat.data;
            //     })
            //     }

            //     $scope.detailjenis = function(){
            //     ////debugger
            //     manageLogistikPhp.getDataTableMaster("produk/get-detailjenisprodukbyidJp/"+$scope.item.jenis.id, true).then(function(dat){
            //     $scope.listdetailjenisProduk = dat.data;
            //     })
            //     }


                //http://jsfiddle.net/7n8NR/3/
            //     function init() {
            //         manageLogistikPhp.getDataTableMaster("produk/kelompok-produk", true).then(function(dat){
            //             $scope.item.idModul= dat.data[0].id;
            //             $scope.item.kelompokproduk= dat.data[0].kelompokproduk;
            //             $scope.listkelompok = dat.data;
            //         });
            //         $scope.treeDataMenu=[];
            //         manageLogistikPhp.getDataTableMaster("produk/kelompok-produk", true).then(function(dat){
            //             var inlineDefault = new kendo.data.HierarchicalDataSource({
            //                 data: dat.data
            //             ,
            //             schema: {
            //                 model: {
            //                     children: ""
            //                 }
            //             }
            //             });
            //             $scope.treeDataMenu = inlineDefault
            //             $scope.mainTreeViewOption = {
            //                 dataTextField: ["kelompokproduk"],
            //                 select: onSelect,
            //                 dragAndDrop: true
            //             }
                        
            //         });
            //     }
            // init()

            function onSelect(e) {
                $scope.data4 =[];
                manageLogistikPhp.getDataTableMaster("produk/jenis-produk/"+ $scope.item.idModul , true).then(function(dat){
                   //debugger //if (dat.data.length != 0) {
                        for (var i = 0; i < dat.data.length; i++) {
                            dat.data[i].no = i+1;
                        }
                        $scope.data4= dat.data;
                    $scope.showIdMenu=true
                });
            }
         

            $scope.delete = function(){
                var confirm = $mdDialog.confirm()
                    .title('Peringatan')
                    .textContent('Apakah anda yakin akan menghapus data tsb?')
                    .ariaLabel('Lucky day')
                    .cancel('Tidak')
                    .ok('Ya')
                $mdDialog.show(confirm).then(function () {
                    SokDelete();
                })

            }

            function SokDelete(){
                var data = [];
                for(var i=0; i<$scope.dataSource._data.length; i++){
                    if($scope.dataSource._data[i].statCheckbox){
                        data.push({
                            "id" : $scope.dataSource._data[i].id,
                            "idproduk" : $scope.dataSource._data[i].idproduk,
                            "namaproduk" :$scope.dataSource._data[i].namaproduk,
                            "ruanganid" : $scope.dataSource._data[i].ruanganid,
                            "namaruangan" :$scope.dataSource._data[i].namaruangan,
                            "kodeexternal" :$scope.dataSource._data[i].kodeexternal,
                        },)
                    }
                }

                var data={
                    "data": data,
                }

                manageLogistikPhp.deletemapruangantoproduk(data).then(function(e) {
                    LoadData();
                    // kosongkan();
                });
            }

            function kosongkan(){
                $scope.item.departemen = undefined;
                $scope.item.ruangan = undefined;
                $scope.item.Produk = undefined;
            }

            $scope.ClearData = function(){
                kosongkan()
            }

            $scope.reset = function(){
                var AllRowsToBeDel = $scope.dataSource._data == ""; 
                UbahGrid(AllRowsToBeDel);
                $scope.active = true;
                $scope.null();
            }

            $scope.NewMapping = function(){

                 $state.go('MapRuanganToProduk'); 
            }
        }
    ]);
});

