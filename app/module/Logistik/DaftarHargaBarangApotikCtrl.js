define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarHargaBarangApotikCtrl', ['$sce', 'FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras','ManageLogistikPhp','$http', 'ModelItemAkuntansi',
            function($sce, findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper, findSarpras,manageLogistikPhp,$http, modelItemAkuntansi) {     
                $scope.isRouteLoading=false;
            var init = function() {
                $scope.dataVOloaded = true;
                $scope.isNext = true;
                $scope.isEdit = false;
                $scope.isReport = true;
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                $scope.now = new Date();
                $scope.item = {
                    kelUser: document.cookie.split(';')[0].split('=')[1]
                };
                if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                    $scope.bukanLogistik = false;
                } else {
                    $scope.bukanLogistik = true;
                }
                $scope.listJenisBarang = [{id:1,namaJenis:'Obat-obatan'},{id:2,namaJenis:'Non Obat'}]
                // var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
                $scope.item.tglawal = moment( $scope.now).format('YYYY-MM-DD 00:00');
                $scope.item.tglakhir= moment( $scope.now).format('YYYY-MM-DD 23:59');;
                // manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                //     $scope.item.ruangan = dat.data.data;
                // });

                $scope.item.jmlRows = 50
                manageLogistikPhp.getDataTableTransaksi('get-detail-login').then(function(data){
                     $scope.listRuangan =data.data.ruangan
                     $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                })

                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
                });
            }
            init();
            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "50px",
                },
                {
                    "field": "tglpelayanan",
                    "title": "Tgl Pelayanan",
                    "width" : "85px",
                },
                {
                    "field": "id",
                    "title": "ID",
                    "width" : "50px",
                },
                {
                    "field": "kodeproduk",
                    "title": "Kode Produk",
                    "width" : "50px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width" : "120px",
                },
                {
                    "field": "satuanstandar",
                    "title": "Satuan",
                    "width" : "60px",
                },
                {
                    "field": "hargaperolehan",
                    "title": "Harga Perolehan",
                    "width" : "70px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargaperolehan #', '')}}</span>"
                },
                {
                    "field": "harga",
                    "title": "Harga",
                    "width" : "70px",
                    "template": "<span class='style-right'>{{formatRupiah('#: harga #', '')}}</span>"
                }
            ];

            $scope.$watch('item.hargaJual', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    if ($scope.item.hargaJual > 0) {
                        $scope.item.harga = (parseFloat($scope.item.hargaJual) /125)*100
                    }
                }
            });
            // $scope.$watch('item.harga', function(newValue, oldValue) {
            //     if (newValue != oldValue  ) {
            //         if ($scope.item.harga > 0) {
            //             $scope.item.hargaJual = (parseFloat($scope.item.harga) /100)*125
            //         }
            //     }
            // });
            $scope.simpan = function(){
                var objSave ={
                    objectprodukfk:$scope.dataSelected.kodeProduk,
                    nostrukterimafk:$scope.dataSelected.nostrukterimafk,
                    harga:$scope.item.harga,
                    norec_spd:$scope.dataSelected.norec_spd,
                    qtyproduk:$scope.item.qtyproduk
                }
                manageLogistikPhp.postubahharga(objSave).then(function(data){
                     $scope.listRuangan =data.data.ruangan

                })
            }
            $scope.klikGrid =function(Data){
                $scope.item.noterima=Data.noTerima
                $scope.item.namaBarang=Data.namaProduk
                $scope.item.harga=Data.harga
                $scope.item.qtyproduk=Data.qtyProduk
            }
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            findProduk.getListRuangan("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
                $scope.listSumberDana = dat.data;
            });
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            // $scope.isSelected = false;
            // $scope.$watch('item.jenisPermintaan', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === 1) {
            //         $scope.isSelected = true;
            //         $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            //     }
            //     debugger;
            // })
            
            // findProduk.getStokOpnameDetil('', '', '').then(function(e) {
            //     $scope.isReport = true; //show button cetak
            //     $scope.isEdit = true; //show button edit
            //     // var dataSource = new kendo.data.DataSource({
            //     //     data: []
            //     // });
            //     e.data.data.forEach(function(x) {
            //             var tmpItems = {
            //                 noBatch: x.noBatch,
            //                 namaProduk: x.namaProduk,
            //                 kodeBarang: x.kodeBarang,
            //                 qtyProduk: x.qtyProduk,
            //                 asalProduk: x.asalProduk,
            //                 namaRuangan: x.namaRuangan,
            //                 tanggalKadaluarsa: DateHelper.getPeriodeFormatted(new Date(x.tanggalKadaluarsa))
            //             }
            //             $scope.dataStokOpname.add(tmpItems);
            //         })
            //     // var grid = $("#kGridStokOpname").data("kendoGrid");
            //     // grid.setDataSource(dataSource);
            //     // grid.refresh();
            // })
            $scope.cari = function(){
                $scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
                var kelBarang, jenBarang, ruanganId, barangId, noTerima, asalProdukId, namabarang;
                kelBarang = "";
                if ($scope.item.kelompokBarang != undefined) {
                    kelBarang = $scope.item.kelompokBarang.id
                }
                jenBarang = "";
                if ($scope.item.jenisProduk != undefined) {
                    jenBarang = $scope.item.jenisProduk.id
                }
                barangId = "";
                if ($scope.item.namaBarang != undefined) {
                    barangId = $scope.item.namaBarang.id
                }
                var jenisBarang = "";
                if ($scope.item.jenisBarang != undefined) {
                    jenisBarang = $scope.item.jenisBarang.namaJenis
                }
               var namaProduk = "";
                if ($scope.item.namaProduk != undefined) {
                    namaProduk = $scope.item.namaProduk
                }
                noTerima = "";
                if ($scope.item.NoTerima != undefined) {
                    noTerima = $scope.item.NoTerima
                }
                asalProdukId = "";
                if ($scope.item.asalProduk != undefined) {
                    asalProdukId = $scope.item.asalProduk.id
                }
                var jmlRows = "";
                if ($scope.item.jmlRows != undefined) {
                    jmlRows = $scope.item.jmlRows
                }

                if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                    ruanganId = $scope.item.ruanganAsal.id
                } else {
                    ruanganId = $scope.item.ruangan.id
                }

                manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-harga-apotik?'
                     + "tglAwal=" + tglAwal
                     + "&tglAkhir=" + tglAkhir
                     + "&namaProduk=" + namaProduk
                     + "&jenisBarang=" + jenisBarang
                     + "&NoTerima=" + noTerima).then(function(data){
                        $scope.isRouteLoading=false;
                        var datas = data.data.detail;
                        for (var i = 0; i < data.data.detail.length; i++) {
                            data.data.detail[i].no = i+1
                        }
                         $scope.dataGrid = new kendo.data.DataSource({
                            data: data.data.detail,
                            // pageSize: 20,
                            total: data.data.detail.length,
                            serverPaging: false,
                           
                        });
                        // $scope.dataGrid =data.data.detail
                })

                // manageSarpras.getStokOpnameDetil(kelBarang, jenBarang, barangId, ruanganId, noTerima, asalProdukId).then(function(e) {
                //     $scope.dataStokOpname = new kendo.data.DataSource({
                //         data: e.data.data,
                //         groupable: true,
                //         group: {
                //             field: "namaProduk",
                //             dir: "asc"
                //         },
                //         pageSize: 20,
                //         editable: false,
                //     });
                    
                //     $scope.isReport = true;
                // })
            }
            // $("#kGrid").kendoGrid({
            //     // groupable: true,
            //     // sort: onSorting,
            //     // filter: onFiltering,
            //     // group: onGrouping,
            //     page: onPaging
            //     // groupExpand: onGroupExpand,
            //     // groupCollapse: onGroupCollapse
            // });
            // function onPaging(arg){
            //     alert(arg)
            // }
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            $scope.optionsData = {                
                pageable: true,
                editable: false,
                 toolbar:["excel"],
                excel: {
                    fileName:"Daftar Harga Apotik"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',
                pageable: true,
                editable: false,
                columns: [ 
                    {
                        "field": "no",
                        "title": "No",
                        "width" : "50px",
                    },
                    {
                        "field": "nopenerimaan",
                        "title": "No Penerimaan",
                        "width" : "120px",
                    },
                    {
                        "field": "id",
                        "title": "ID",
                        "width" : "50px",
                    },                    
                    {
                        "field": "kdproduk",
                        "title": "Kode Produk",
                        "width" : "50px",
                    },
                    {
                        "field": "namaproduk",
                        "title": "Nama Produk",
                        "width" : "120px",
                    },                    
                    {
                        "field": "satuanstandar",
                        "title": "Satuan",
                        "width" : "60px",
                    },
                    {
                        "field": "harga",
                        "title": "Harga Perolehan",
                        "width" : "70px",
                        "template": "<span class='style-right'>{{formatRupiah('#: harga #', '')}}</span>"
                    },
                    {
                        "field": "hargajual",
                        "title": "Harga Jual",
                        "width" : "70px",
                        "template": "<span class='style-right'>{{formatRupiah('#: hargajual #', '')}}</span>"
                    },
                    {
                        "field": "tglpelayanan",
                        "title": "Tanggal",
                        "width":"100px",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglpelayanan #')}}</span>"
                    },
                ]

            };
            $scope.formatTanggal = function(tanggal)
            {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
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
                var listRawRequired = [
                    "item.tanggal|k-ng-model|Tanggal Penutupan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var dataArray = [];
                    $scope.dataStokOpname._data.forEach(function(element){
                        if (element.stokReal !== null) { 
                            dataArray.push({
                                "id": element.id,
                                "stokReal": element.stokReal
                            });
                        }
                    })
                    
                    if (dataArray.length !== 0) {
                        var tempData = {
                            "tanggal": DateHelper.getPeriodeFormatted($scope.item.tanggal),
                            "stokProdukGlobal": dataArray
                        }
                        manageSarpras.saveDataSarPras(tempData, "stok-op-name/save-stok-op-name").then(function(e){
                            console.log(JSON.stringify(e.data));
                            $scope.isNext = true;
                        });
                    } else {
                        window.messageContainer.error('Saldo Real barang belum di isi');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }
            $scope.cetak = function() {
                var strIdRuangan = $scope.item.ruangan.id;
                
                var stt = 'false'
                if (confirm('View Laporan Data Stok Ruangan? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-stokruangan=1&strIdRuangan='+strIdRuangan+'&view='+stt+'&user='+$scope.dataLogin.namaLengkap, function(response) {               
                });
                // var kelBarang, jenBarang, ruanganId, barangId, asalProdukId, noTerima;
                // if ($scope.item.kelompokBarang === undefined) {
                //     kelBarang = "";
                // } else {
                //     kelBarang = $scope.item.kelompokBarang.id
                // }

                // if ($scope.item.jenisProduk === undefined) {
                //     jenBarang = "";
                // } else {
                //     jenBarang = $scope.item.jenisProduk.id
                // }

                // if ($scope.item.namaBarang === undefined) {
                //     barangId = "";
                // } else {
                //     barangId = $scope.item.namaBarang.id
                // }
                
                // if ($scope.item.noTerima === undefined) {
                //     noTerima = "";
                // } else {
                //     noTerima = $scope.item.noTerima
                // }
                
                // if ($scope.item.asalProduk === undefined) {
                //     asalProdukId = "";
                // } else {
                //     asalProdukId = $scope.item.asalProduk.id
                // }

                // if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                //     ruanganId = $scope.item.ruanganAsal.id
                // } else {
                //     ruanganId = $scope.item.ruangan.id
                // }
                // $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.cetakStokDetil(kelBarang, jenBarang, barangId, ruanganId, noTerima, asalProdukId));
                // window.open($scope.urlBilling, '','width=800,height=600');
            }
            $scope.batal = function(){
                $scope.item = {};
                init();
            }
        }
    ]);
});