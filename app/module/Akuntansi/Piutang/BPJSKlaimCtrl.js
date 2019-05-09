define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BPJSKlaimCtrl', ['FindProduk',  '$rootScope', '$scope','$state', 'ModelItem', 'DateHelper','ManageLogistikPhp','CacheHelper',
            function(findProduk, $rootScope, $scope,$state, ModelItem, DateHelper,manageLogistikPhp,cacheHelper) {     
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
                
                manageLogistikPhp.postbpjsklaim(objSave).then(function(e) {
                    
                    $scope.isRouteLoading=false;
                });
                
                            
            }
            $scope.Collect = function() {
                var chacePeriode = '' + ":" + '' + ":" + '' + ":" + '' + ":" + ''  + ":" 
                    + ''  + ":" + ''  
                    + ":" + ''  + ":" + filename  + ":" + 'nengepic'
                cacheHelper.set('periodeTransaksiPencatatanPiutangDaftarLayanan', chacePeriode);

                var obj = {
                    splitString : "a s @ e p i c "
                }

                $state.go('CollectingPiutang', {
                        dataFilter: JSON.stringify(obj)
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
                    "field": "KODE_RS",
                    "title": "KODE_RS",
                    "width": 80,
                },
                {
                    "field": "KELAS_RS",
                    "title": "KELAS_RS",
                    "width": 100,
                },
                {
                    "field": "KELAS_RAWAT",
                    "title": "KELAS_RAWAT",
                    "width": 100,
                },
                {
                    "field": "KODE_TARIF",
                    "title": "KODE_TARIF",
                    "width": 100,
                },
                {
                    "field": "PTD",
                    "title": "PTD",
                    "width": 60,
                },
                {
                    "field": "ADMISSION_DATE",
                    "title": "ADMISSION_DATE",
                    "width": 130,
                },
                {
                    "field": "DISCHARGE_DATE",
                    "title": "DISCHARGE_DATE",
                    "width": 130,
                },
                {
                    "field": "BIRTH_DATE",
                    "title": "BIRTH_DATE",
                    "width": 120,
                },
                {
                    "field": "BIRTH_WEIGHT",
                    "title": "BIRTH_WEIGHT",
                    "width": 120,
                },
                {
                    "field": "SEX",
                    "title": "SEX",
                    "width": 50,
                },
                {
                    "field": "DISCHARGE_STATUS",
                    "title": "DISCHARGE_STATUS",
                    "width": 130,
                },
                {
                    "field": "DIAGLIST",
                    "title": "DIAGLIST",
                    "width": 130,
                },
                {
                    "field": "PROCLIST",
                    "title": "PROCLIST",
                    "width": 100,
                },
                {
                    "field": "ADL1",
                    "title": "ADL1",
                    "width": 70,
                },
                {
                    "field": "ADL2",
                    "title": "ADL2",
                    "width": 70,
                },
                {
                    "field": "IN_SP",
                    "title": "IN_SP",
                    "width": 70,
                },
                {
                    "field": "IN_SR",
                    "title": "IN_SR",
                    "width": 70,
                },
                {
                    "field": "IN_SI",
                    "title": "IN_SI",
                    "width": 70,
                },
                {
                    "field": "IN_SD",
                    "title": "IN_SD",
                    "width": 70,
                },
                {
                    "field": "INACBG",
                    "title": "INACBG",
                    "width": 100,
                },
                {
                    "field": "SUBACUTE",
                    "title": "SUBACUTE",
                    "width": 80,
                },
                {
                    "field": "CHRONIC",
                    "title": "CHRONIC",
                    "width": 80,
                },
                {
                    "field": "SP",
                    "title": "SP",
                    "width": 50,
                },
                {
                    "field": "SR",
                    "title": "SR",
                    "width": 50,
                },
                {
                    "field": "SI",
                    "title": "SI",
                    "width": 50,
                },
                {
                    "field": "SD",
                    "title": "SD",
                    "width": 50,
                },
                {
                    "field": "DESKRIPSI_INACBG",
                    "title": "DESKRIPSI_INACBG",
                    "width": 300,
                },
                {
                    "field": "TARIF_INACBG",
                    "title": "TARIF_INACBG",
                    "width": 150,
                },
                {
                    "field": "TARIF_SUBACUTE",
                    "title": "TARIF_SUBACUTE",
                    "width": 150,
                },
                {
                    "field": "TARIF_CHRONIC",
                    "title": "TARIF_CHRONIC",
                    "width": 150,
                },
                {
                    "field": "DESKRIPSI_SP",
                    "title": "DESKRIPSI_SP",
                    "width": 150,
                },
                {
                    "field": "TARIF_SP",
                    "title": "TARIF_SP",
                    "width": 130,
                },
                {
                    "field": "DESKRIPSI_SR",
                    "title": "DESKRIPSI_SR",
                    "width": 130,
                },
                {
                    "field": "TARIF_SR",
                    "title": "TARIF_SR",
                    "width": 130,
                },
                {
                    "field": "DESKRIPSI_SI",
                    "title": "DESKRIPSI_SI",
                    "width": 150,
                },
                {
                    "field": "TARIF_SI",
                    "title": "TARIF_SI",
                    "width": 150,
                },
                {
                    "field": "DESKRIPSI_SD",
                    "title": "DESKRIPSI_SD",
                    "width": 150,
                },
                {
                    "field": "TARIF_SD",
                    "title": "TARIF_SD",
                    "width": 150,
                },
                {
                    "field": "TOTAL_TARIF",
                    "title": "TOTAL_TARIF",
                    "width": 150,
                },
                {
                    "field": "TARIF_RS",
                    "title": "TARIF_RS",
                    "width": 150,
                },
                {
                    "field": "TARIF_POLI_EKS",
                    "title": "TARIF_POLI_EKS",
                    "width": 150,
                },
                {
                    "field": "LOS",
                    "title": "LOS",
                    "width": 150,
                },
                {
                    "field": "ICU_INDIKATOR",
                    "title": "ICU_INDIKATOR",
                    "width": 150,
                },
                {
                    "field": "ICU_LOS",
                    "title": "ICU_LOS",
                    "width": 150,
                },
                {
                    "field": "VENT_HOUR",
                    "title": "VENT_HOUR",
                    "width": 150,
                },
                {
                    "field": "NAMA_PASIEN",
                    "title": "NAMA_PASIEN",
                    "width": 200,
                },
                {
                    "field": "MRN",
                    "title": "MRN",
                    "width": 150,
                },
                {
                    "field": "UMUR_TAHUN",
                    "title": "UMUR_TAHUN",
                    "width": 150,
                },
                {
                    "field": "UMUR_HARI",
                    "title": "UMUR_HARI",
                    "width": 150,
                },
                {
                    "field": "DPJP",
                    "title": "DPJP",
                    "width": 200,
                },
                {
                    "field": "SEP",
                    "title": "SEP",
                    "width": 200,
                },
                {
                    "field": "NOKARTU",
                    "title": "NOKARTU",
                    "width": 150,
                },
                {
                    "field": "PAYOR_ID",
                    "title": "PAYOR_ID",
                    "width": 150,
                },
                {
                    "field": "CODER_ID",
                    "title": "CODER_ID",
                    "width": 150,
                },
                {
                    "field": "VERSI_INACBG",
                    "title": "VERSI_INACBG",
                    "width": 150,
                },
                {
                    "field": "VERSI_GROUPER",
                    "title": "VERSI_GROUPER",
                    "width": 150,
                },
                {
                    "field": "C1",
                    "title": "C1",
                    "width": 150,
                },
                {
                    "field": "C2",
                    "title": "C2",
                    "width": 350,
                },
                {
                    "field": "C3",
                    "title": "C3",
                    "width": 150,
                },
                {
                    "field": "C4",
                    "title": "C4",
                    "width": 250,
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
                    arr1 = contents.split("3174260")

                    strJudul = arr1[0].split("\t")
                    for (var i = 1; i <= arr1.length-1; i++) {
                    // for (var i = 1; i <= 2; i++) {
                        strtea = arr1[i]
                        arr2 = strtea.split("\t")
                        arr4 = {
                             'KODE_RS' : 3174260,
                             'KELAS_RS' : arr2[1]
                             ,
                             'KELAS_RAWAT' : arr2[2],
                             'KODE_TARIF' : arr2[3],
                             'PTD' : arr2[4],
                             'ADMISSION_DATE' : arr2[5],
                             'DISCHARGE_DATE' : arr2[6],
                             'BIRTH_DATE' : arr2[7],
                             'BIRTH_WEIGHT' : arr2[8],
                             'SEX' : arr2[9],
                             'DISCHARGE_STATUS' : arr2[10],
                             'DIAGLIST' : arr2[11],
                             'PROCLIST' : arr2[12],
                             'ADL1' : arr2[13],
                             'ADL2' : arr2[14],
                             'IN_SP' : arr2[15],
                             'IN_SR' : arr2[16],
                             'IN_SI' : arr2[17],
                             'IN_SD' : arr2[18],
                             'INACBG' : arr2[19],
                             'SUBACUTE' : arr2[20],
                             'CHRONIC' : arr2[21],
                             'SP' : arr2[22],
                             'SR' : arr2[23],
                             'SI' : arr2[24],
                             'SD' : arr2[25],
                             'DESKRIPSI_INACBG' : arr2[26],
                             'TARIF_INACBG' : arr2[27],
                             'TARIF_SUBACUTE' : arr2[28],
                             'TARIF_CHRONIC' : arr2[29],
                             'DESKRIPSI_SP' : arr2[30],
                             'TARIF_SP' : arr2[31],
                             'DESKRIPSI_SR' : arr2[32],
                             'TARIF_SR' : arr2[33],
                             'DESKRIPSI_SI' : arr2[34],
                             'TARIF_SI' : arr2[35],
                             'DESKRIPSI_SD' : arr2[36],
                             'TARIF_SD' : arr2[37],
                             'TOTAL_TARIF' : arr2[38],
                             'TARIF_RS' : arr2[39],
                             'TARIF_POLI_EKS' : arr2[40],
                             'LOS' : arr2[41],
                             'ICU_INDIKATOR' : arr2[42],
                             'ICU_LOS' : arr2[43],
                             'VENT_HOUR' : arr2[44],
                             'NAMA_PASIEN' : arr2[45],
                             'MRN' : arr2[46],
                             'UMUR_TAHUN' : arr2[47],
                             'UMUR_HARI' : arr2[48],
                             'DPJP' : arr2[49],
                             'SEP' : arr2[50],
                             'NOKARTU' : arr2[51],
                             'PAYOR_ID' : arr2[52],
                             'CODER_ID' : arr2[53],
                             'VERSI_INACBG' : arr2[54],
                             'VERSI_GROUPER' : arr2[55],
                             'C1' : arr2[56],
                             'C2' : arr2[57],
                             'C3' : arr2[58],
                             'C4' : arr2[59]
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