define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DataGagalKlaimBPJSCtrl', ['FindProduk',  '$rootScope', '$scope','$state', 'ModelItem', 'DateHelper','ManageLogistikPhp',
            function(findProduk, $rootScope, $scope,$state, ModelItem, DateHelper,manageLogistikPhp) {     
            $scope.DataTakSedia= false;        
            $scope.dataVOloaded = true;
            $scope.item = {};
            var filename = ''
              var arr1 = [];
              var arr2 = {};
              var arr3 = [];
              var arr4 = {};
              var strtea = ""
              var strJudul = {}
            $scope.btnTombol = true;
            $scope.listJenisPemeriksaan = [{ name: "Kelompok Produk", id: 1 },
                { name: "Jenis Produk", id: 2 }
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
                $scope.dataGrid = new kendo.data.DataSource({
                    data: arr3,
                    pageSize: 8
                });
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
            // $scope.uploadFile = function(){
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/logistik?upload-file-so=1', function(response) {
            //         // aadc=response;
            //     });
            // }
            // $("#kGrid").kendoGrid({
            //     toolbar: ["excel"],
            //         excel: {
            //             fileName: "DataSOGagal.xlsx",
            //             allPages: true,
            //         },
                
            //     dataSource: $scope.dataExcel,
            //     sortable: true,
            //     pageable: true,
            //     resizable: true,                
            //     columns: [
            //         {
            //             field: "no", 
            //             title: "No",
            //             Template: "<span class='style-center'>#: no #</span>",
            //             width:"80px"
            //         },
            //         {
            //             field: "kdproduk", 
            //             title: "Kode Produk",
            //             // "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>",
            //             width:"100px"
            //         },
            //         {
            //             field: "namaproduk",
            //             title: "Nama Produk",
            //             width: "100px",
            //             template: "<span class='style-center'>#: namaproduk #</span>",
            //             headerAttributes: { style: "text-align : center" },
            //         },
            //         {
            //             field: "stokSistem",
            //             title: "Stok Sistem",
            //             width: "100px",
            //             template: "<span class='style-center'>#: stokSistem #</span>",
            //             headerAttributes: { style: "text-align : center" },
            //         },
            //         {
            //             field: "stokReal",
            //             title: "Stok Real",
            //             width: "100px",
            //             template: "<span class='style-center'>#: stokReal #</span>",
            //             headerAttributes: { style: "text-align : center" },
            //         },
            //         {
            //             field: "selisih",
            //             title: "selisih",
            //             width: "100px",
            //             template: "<span class='style-center'>#: selisih #</span>",
            //             headerAttributes: { style: "text-align : center" },
            //         }
            //     ]

            // });

            $scope.cetak = function() {
                window.messageContainer.error('Fitur belum tersedia');
                //http://127.0.0.1:1237/printvb/logistik?cetak-stokopname=1&tgl=2017-12-29&idRuangan=50&view=true&id=admin
            }
            $scope.batal = function(){
                $scope.item = {};
            }
            $scope.daftar = function(){
                $state.go('DaftarSO')    
            }
            $scope.$watch('item.dpjp', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    var layananFilter =[];
                    var txtnaonwelah ='';

                    for (var i = arr3.length - 1; i >= 0; i--) {
                        txtnaonwelah=' ' + arr3[i].DPJP;
                        txtnaonwelah = txtnaonwelah.toUpperCase()
                        if (txtnaonwelah != null) {
                            if (parseFloat(txtnaonwelah.indexOf($scope.item.dpjp.toUpperCase())) > 0) {
                                layananFilter.push(arr3[i])
                            }   
                        }
                        
                    }
                    if ($scope.item.dpjp == '') {
                        layananFilter = arr3
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: layananFilter,
                        pageSize: 30
                    });
                        
                }
            });

            $scope.$watch('item.nokartu', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    var layananFilter =[];
                    var txtnaonwelah ='';

                    for (var i = arr3.length - 1; i >= 0; i--) {
                        txtnaonwelah=' ' + arr3[i].NOKARTU;
                        txtnaonwelah = txtnaonwelah.toUpperCase()
                        if (txtnaonwelah != null) {
                            if (parseFloat(txtnaonwelah.indexOf($scope.item.nokartu.toUpperCase())) > 0) {
                                layananFilter.push(arr3[i])
                            }   
                        }
                        
                    }
                    if ($scope.item.nokartu == '') {
                        layananFilter = arr3
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: layananFilter,
                        pageSize: 30
                    });
                        
                }
            });

            $scope.$watch('item.nosep', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    var layananFilter =[];
                    var txtnaonwelah ='';

                    for (var i = arr3.length - 1; i >= 0; i--) {
                        txtnaonwelah=' ' + arr3[i].SEP;
                        txtnaonwelah = txtnaonwelah.toUpperCase()
                        if (txtnaonwelah != null) {
                            if (parseFloat(txtnaonwelah.indexOf($scope.item.nosep.toUpperCase())) > 0) {
                                layananFilter.push(arr3[i])
                            }   
                        }
                        
                    }
                    if ($scope.item.nosep == '') {
                        layananFilter = arr3
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: layananFilter,
                        pageSize: 30
                    });
                        
                }
            });

            $scope.$watch('item.namapasien', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    var layananFilter =[];
                    var txtnaonwelah ='';

                    for (var i = arr3.length - 1; i >= 0; i--) {
                        txtnaonwelah=' ' + arr3[i].NAMA_PASIEN;
                        txtnaonwelah = txtnaonwelah.toUpperCase()
                        if (txtnaonwelah != null) {
                            if (parseFloat(txtnaonwelah.indexOf($scope.item.namapasien.toUpperCase())) > 0) {
                                layananFilter.push(arr3[i])
                            }   
                        }
                        
                    }
                    if ($scope.item.namapasien == '') {
                        layananFilter = arr3
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: layananFilter,
                        pageSize: 30
                    });
                        
                }
            });
            $scope.columnGrid = [
                {
                    "field": "NOSEP",
                    "title": "NOSEP",
                    "width": 120,
                },
                {
                    "field": "TGLSEP",
                    "title": "TGLSEP",
                    "width": 70,
                },
                {
                    "field": "NOKARTU",
                    "title": "NOKARTU",
                    "width": 100,
                },
                {
                    "field": "NMPESERTA",
                    "title": "NMPESERTA",
                    "width": 120,
                },
                {
                    "field": "RIRJ",
                    "title": "RIRJ",
                    "width": 60,
                },
                {
                    "field": "KDINACBG",
                    "title": "KDINACBG",
                    "width": 100,
                },
                {
                    "field": "BYPENGAJUAN",
                    "title": "BYPENGAJUAN",
                    "width": 100,
                },
                {
                    "field": "KETERANGAN",
                    "title": "KETERANGAN",
                    "width": 200,
                }
            ];
            function test() {
                var Excel = new ActiveXObject("Excel.Application");
                Excel.Visible = true;
                Excel.Workbooks.Open("C:/Users/nengepic01/Downloads/DataGagalHitungKlaim rajal mei 2018.xlsx");
              }
            function readSingleFile(e) {
              var file = e.target.files[0];
              var stringFile = e.target.files[0].name
              // var strFile = stringFile.split('.')
              // var nmFileArr = strFile[0].split('_')
              // if(nmFileArr[1] != undefined && nmFileArr[2] != undefined && nmFileArr[3] != undefined){
              //   $scope.item.tanggal =new Date(moment(nmFileArr[1]).format('YYYY-MM-DD HH:mm')) ;
              //   $scope.item.ruangan = {id:nmFileArr[2],namaruangan:nmFileArr[3]}
              // }else{
              //   toastr.error('Nama File Tidak Sesuai','Info');
              //   return;
              // }
              
              if (!file) {
                return;
              }

            $scope.isRouteLoading=true;
              var reader = new FileReader();
              var contents = "";
              reader.onload = function(e) {
                    contents = e.target.result;
                    arr1 = contents.split("##")

                    strJudul = arr1[0].split("\t")
                    for (var i = 1; i <= arr1.length-1; i++) {
                    // for (var i = 1; i <= 2; i++) {
                        strtea = arr1[i]
                        arr2 = strtea.split("\t")
                        arr4 = {
                             'NOSEP' : arr2[1],
                             'TGLSEP' : arr2[2],
                             'NOKARTU' : arr2[3],
                             'NMPESERTA' : arr2[4],
                             'RIRJ' : arr2[5],
                             'KDINACBG' : arr2[6],
                             'BYPENGAJUAN' : arr2[7],
                             'KETERANGAN' : arr2[8]
                        }
                        arr3.push(arr4);
                    }

                $scope.isRouteLoading=false;
                    // $scope.dataDaftar = arr3;
                    // $scope.dataDaftar =[{KODE_RS: 1, KELAS_RS: "A"},{KODE_RS: 2, KELAS_RS: "A"}];
                    // $scope.dataGrid = new kendo.data.DataSource({
                    //         data: [{KODE_RS: 1, KELAS_RS: "A"},{KODE_RS: 2, KELAS_RS: "A"}]
                    //     });
                    
                    // $scope.dataStokOpname = new kendo.data.DataSource({
                    //     data:[{'KODE_RS':12321}]
                    // });
                    // $scope.dataDaftar = [{'KODE_RS':12321}];
              };
              reader.readAsText(file);
              filename = file.name
              // $scope.dataDaftar =[{KODE_RS: 3174260, KELAS_RS: "A"}];
              // $scope.dataDaftar =[{KODE_RS: 3, KELAS_RS: "A"},{KODE_RS: 4, KELAS_RS: "A"}];
            }
            // $scope.dataDaftar =[{KODE_RS: 5, KELAS_RS: "A"},{KODE_RS: 6, KELAS_RS: "A"}];
            



            document.getElementById('file-input')
              .addEventListener('change', readSingleFile, false);
        }
    ]);
});