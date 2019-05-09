define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('StockOpnameCtrl', ['$sce',  '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLogistikPhp',
            function($sce,  $rootScope, $scope, ModelItem, DateHelper, manageLogistikPhp) {     

            var init = function() {
                $scope.dataVOloaded = true;
                $scope.isNext = true;
                $scope.now = new Date();
                $scope.item = {
                    kelUser: document.cookie.split(';')[0].split('=')[1]
                };
                if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                    $scope.bukanLogistik = false;
                } else {
                    $scope.bukanLogistik = true;
                }
                manageLogistikPhp.getDataTableTransaksi('logistik-stok/get-data-combo-so').then(function(data){
                    $scope.listKelompokBarang= data.data.kelompokproduk
                    $scope.listRuangan =data.data.ruangan
                })

                // manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                //     $scope.item.ruangan = dat.data.data;
                // });
                // manageLogistikPhp.getDataTableTransaksi('logistik-stok/get-stok-ruangan-detail?produkfk=17797&ruanganfk=94&asalprodukfk=1').then(function(data){
                //      $scope.dataGrid =data.data.detail

                // })
            }
            init();

            $scope.getJenis = function(){
                $scope.listJenisBarang = $scope.item.kelompokBarang.jenis
            }
            $scope.columnGrid = [
                // {
                //     "field": "noTerima",
                //     "title": "No Terima",
                //     "width" : "60px",
                // },
                {
                    "field": "kodeProduk",
                    "title": "Kode Produk",
                    "width" : "60px",
                },
                {
                    "field": "namaProduk",
                    "title": "Nama Produk",
                    "width" : "120px",
                },
                // {
                //     "field": "asalProduk",
                //     "title": "Asal Produk",
                //     "width" : "70px",
                // },
                {
                    "field": "qtyProduk",
                    "title": "Stok",
                    "width" : "60px",
                },
                {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width" : "60px",
                }
                // {
                //     "field": "tglKadaluarsa",
                //     "title": "Tgl Kadaluarsa",
                //     "width" : "80px",
                // },
                // {
                //     "field": "noBatch",
                //     "title": "No Batch",
                //     "width" : "50px",
                // }
            ];

            // findProduk.getListRuangan("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
            //     $scope.listSumberDana = dat.data;
            // });
            // findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
            //     $scope.sourceRuangan = data;
            // });
            $scope.cari = function(){
                var kelBarang, jenBarang, ruanganId, barangId, noTerima, asalProdukId;
                if ($scope.item.kelompokBarang === undefined) {
                    kelBarang = "";
                } else {
                    kelBarang = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenBarang = "";
                } else {
                    jenBarang = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaproduk === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaproduk
                }
                
                if ($scope.item.noTerima === undefined) {
                    noTerima = "";
                } else {
                    noTerima = $scope.item.noTerima
                }
                
                if ($scope.item.asalProduk === undefined) {
                    asalProdukId = "";
                } else {
                    asalProdukId = $scope.item.asalProduk.id
                }

                if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                    ruanganId = $scope.item.ruanganAsal.id
                } else {
                    ruanganId = $scope.item.ruangan.id
                }

                manageLogistikPhp.getDataTableTransaksi('logistik-stok/get-stok-ruangan-so?'+
                    'kelompokprodukid='+kelBarang+
                    '&jeniskprodukid='+jenBarang+
                    '&namaproduk='+barangId+
                    '&ruanganfk='+ruanganId).then(function(data){
                        $scope.dataGrid =data.data.detail

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
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            $scope.optionsDataStokOpname = {
                rowTemplate: '<tr data-uid="#: uid #" ng-class="{alert: \'#:countDate#\' == \'4\', alert: \'#:countDate#\' == \'5\', alert: \'#:countDate#\' == \'6\', warning: \'#:countDate#\' == \'2\', warning: \'#:countDate#\' == \'3\', danger: \'#:countDate#\' <= \'1\'}"><td>&nbsp;</td><td>#:noTerima #</td><td>#:kodeBarang #</td><td>#:namaProduk #</td><td>#:asalProduk #</td><td>#:kendo.toString(qtyProduk, \'n\') #</td><td>#:satuanStandar #</td><td>#:new moment(tanggalKadaluarsa).format(\'DD-MM-YYYY\') #</td><td>#:noBatch #</td></tr>',
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                pageable: true,
                editable: false,
                columns: [{
                    "field": "countDate",
                    "title": "Expire",
                    // "width": 40,
                    // filterable: false,
                    hidden: true
                }, {
                    "field": "noTerima",
                    "title": "No Terima",
                    "width": 100,
                }, {
                    "field": "kodeBarang",
                    "title": "Kode Barang",
                    "width": 100,
                    filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": 200
                }, {
                    "field": "asalProduk",
                    "title": "Asal Produk",
                    "width": 120,
                    filterable: false
                }, {
                    "format": "{0:n}",
                    "field": "qtyProduk",
                    "title": "Jumlah Stok",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                }, {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": 80,
                    filterable: false
                }, {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Expired",
                    template: "#= DateHelper.getPeriodeFormatted(new Date(tanggalKadaluarsa)) #",
                    "width": 80,
                    filterable: false,
                }, {
                    "field": "noBatch",
                    "title": "No Batch",
                    "width": 120,
                    filterable: false
                }, 
                // {
                //     "title": "&nbsp;",
                //     "command": [{
                //         name: "destroy",
                //         text: "Hapus"
                //     }],
                //     "width": 50,
                // }
                ],

            };
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                // $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                // $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            // $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
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
                        // manageSarpras.saveDataSarPras(tempData, "stok-op-name/save-stok-op-name").then(function(e){
                        //     console.log(JSON.stringify(e.data));
                        //     $scope.isNext = true;
                        // });
                    } else {
                        window.messageContainer.error('Saldo Real barang belum di isi');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.cetak = function() {
                var kelBarang, jenBarang, ruanganId, barangId, asalProdukId, noTerima;
                if ($scope.item.kelompokBarang === undefined) {
                    kelBarang = "";
                } else {
                    kelBarang = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenBarang = "";
                } else {
                    jenBarang = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaBarang === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaBarang.id
                }
                
                if ($scope.item.noTerima === undefined) {
                    noTerima = "";
                } else {
                    noTerima = $scope.item.noTerima
                }
                
                if ($scope.item.asalProduk === undefined) {
                    asalProdukId = "";
                } else {
                    asalProdukId = $scope.item.asalProduk.id
                }

                if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                    ruanganId = $scope.item.ruanganAsal.id
                } else {
                    ruanganId = $scope.item.ruangan.id
                }
                // $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.cetakStokDetil(kelBarang, jenBarang, barangId, ruanganId, noTerima, asalProdukId));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
            $scope.batal = function(){
                $scope.item = {};
                init();
            }
        }
    ]);
});