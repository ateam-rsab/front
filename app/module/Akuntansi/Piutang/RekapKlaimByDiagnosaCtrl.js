define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RekapKlaimByDiagnosaCtrl', ['FindProduk',  '$rootScope', '$scope','$state', 'ModelItem', 'DateHelper','ManageLogistikPhp',
            function(findProduk, $rootScope, $scope,$state, ModelItem, DateHelper,manageLogistikPhp) {     
            $scope.DataTakSedia= false;        
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            var filename = ''
              var arr1 = [];
              var arr2 = {};
              var arr3 = [];
              var arr4 = {};
              var strtea = ""
              var strJudul = {}
            $scope.btnTombol = true;
            $scope.listDepartemen = [{ nama: "Rawat Jalan", id: 2 },
                { nama: "Rawat Inap", id: 1 }
            ];
            $scope.isRouteLoading = false;

            $scope.isSelected = false;
            // manageLogistikPhp.getDataTableTransaksi('logistik-stok/get-data-combo-so').then(function(data){
            //     // $scope.listKelompokBarang= data.data.kelompokproduk
            //     $scope.listRuangan =data.data.ruangan
            //     // $scope.item.ruangan={id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
            // })

            // $scope.$watch('item.jenisPermintaan', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === 1) {
            //         $scope.isSelected = true;
            //         $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            //     }
            //     //debugger;
            // })

            $scope.cari = function(){
                var ptd = ''
               if ($scope.item.instalasi != undefined){
                    ptd ="?ptd=" +$scope.item.instalasi.id
                }
                manageLogistikPhp.getDataTableTransaksi('piutang/rekap-klaim-by-diagnosa' + ptd).then(function(data){
                    // var aing = 0
                    for (var i = data.data.data.length - 1; i >= 0; i--) {
                        // aing = aing + 1
                        data.data.data[i].no = i + 1
                    }
                    $scope.dataGrid = data.data.data
                })
                
            }
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            // $scope.optionsDataStokOpname = {
            //     toolbar:["excel"],
            //     excel: {
            //         fileName:"BPJS Klaim"+moment($scope.now).format( 'DD/MMM/YYYY'),
            //         allPages: true,
            //     },
            //     filterable: {
            //         extra: false,
            //         operators: {
            //             string: {
            //                 contains: "Contains",
            //                 startswith: "Starts with"
            //             }
            //         }
            //     },
            //     selectable: 'row',
            //     pageable: true,
            //     columns: [
            //         {
            //             "field": "KODE_RS",
            //             "title": "KODE_RS",
            //             "width": 150,
            //         }
            //     ],

            // };
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            $scope.Save = function() {
                $scope.isRouteLoading=true;
                var objSave = 
                    {
                        data:arr3,
                        filename:filename
                    }
                
                manageLogistikPhp.postgagalhitungbpjsklaim(objSave).then(function(e) {
                    
                    $scope.isRouteLoading=false;
                });
                
                            
            }
             $scope.optionsDataGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"Rekap Klaim BPJS by Diagnosa " + moment($scope.now).format( 'MMMM')  + ' ' + moment($scope.now).format( 'YYYY'),
                    allPages: true,
                },
                // filterable: {
                //     extra: false,
                //     operators: {
                //         string: {
                //             contains: "Contains",
                //             startswith: "Starts with"
                //         }
                //     }
                // },
                selectable: 'row',
                pageable: true,
                sortable: true,
                columns:[
                    {
                        "field": "no",
                        "title": "No",
                        "width": 10,
                    },
                    {
                        "field": "diaglist",
                        "title": "ICD10",
                        "width": 50,
                    },
                    {
                        "field": "namadiagnosa",
                        "title": "Diagnosa",
                        "width": 140,
                    },
                    {
                        "field": "qty",
                        "title": "Qty",
                        "width": 50,
                        "template": "<span class='style-right'>{{formatRupiah('#: qty #', '')}}</span>"
                    },
                    {
                        "field": "total",
                        "title": "Total",
                        "width": 50,
                        "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                    }
                ]
            };
            $scope.columnGrid = [
                {
                    "field": "diaglist",
                    "title": "ICD10",
                    "width": 50,
                },
                {
                    "field": "namadiagnosa",
                    "title": "Diagnosa",
                    "width": 140,
                },
                {
                    "field": "qty",
                    "title": "Qty",
                    "width": 50,
                    "template": "<span class='style-right'>{{formatRupiah('#: qty #', '')}}</span>"
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width": 50,
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                }
            ];
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

        }
    ]);
});