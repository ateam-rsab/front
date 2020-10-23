define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('StokBarangMinimumCtrl', ['$sce', 'FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras','ManageLogistikPhp','$http',
            function($sce, findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper, findSarpras,manageLogistikPhp,$http) {     
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
                $scope.item.tglAwal = $scope.now;
                $scope.item.tglAkhir = $scope.now;
                $scope.item.jmlRows = 10
                manageLogistikPhp.getDataTableTransaksi('get-detail-login').then(function(data){
                     $scope.listRuangan =data.data.ruangan
                     $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                })
            }
            init();
            $scope.optionsData = {
                toolbar:["excel"],
                excel: {
                    fileName:"Data Stok Barang Minimum"+moment($scope.now).format( 'DD/MMM/YYYY'),
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
                        "field": "objectprodukfk",
                        "title": "Kode Barang",
                        "width" : "50px",
                    },
                    {
                        "field": "kodeproduk",
                        "title": "Kode Barang Sirs",
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
                        "width" : "80px",
                    },
                    {
                        "field": "qtyakhir",
                        "title": "Stok",
                        "width" : "60px",
                    },
                    {
                        "field": "stokminimum",
                        "title": "Stok Minumum",
                        "width" : "60px",
                        "template": "<span>{{pembulatanStok('#: stokminimum #', '')}}</span>"
                    },
                    {
                        "field": "ss",
                        "title": "Buffer Stok",
                        "width" : "60px",
                        "template": "<span>{{pembulatanStok('#: ss #', '')}}</span>"
                    }  
                ]
            }

            $scope.$watch('item.hargaJual', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    if ($scope.item.hargaJual > 0) {
                        $scope.item.harga = (parseFloat($scope.item.hargaJual) /125)*100
                    }
                }
            });
            
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

            $scope.pembulatanStok = (data) => {
                return Math.round(parseInt(data) * 1000) / 1000;
            }

            findProduk.getListRuangan("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
                $scope.listSumberDana = dat.data;
            });
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });

            
            
            $scope.cari = function(){
                $scope.isRouteLoading=true;
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                var kelBarang, jenBarang, ruanganId, barangId, noTerima, asalProdukId;
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
                noTerima = "";
                if ($scope.item.noTerima != undefined) {
                    noTerima = $scope.item.noTerima
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

                manageLogistikPhp.getDataTableTransaksi('logistik-stok/get-stok-barang-minimum?'+
                    "tglawal=" + tglAwal + 
                    "&tglakhir=" + tglAkhir +
                    "&ruanganfk=" + ruanganId, true).then(function(data){
                        $scope.isRouteLoading=false;
                        var details=data.data.data;
                        $scope.dataGrid =details

                })               
            }
            
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            
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
            }
            $scope.batal = function(){
                $scope.item = {};
                init();
            }
        }
    ]);
});