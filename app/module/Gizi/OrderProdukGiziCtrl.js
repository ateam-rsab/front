define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('OrderProdukGiziCtrl', ['$state', 'FindProduk', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindGizi', 'PengajuanUsulanAnggaranService',
        function($state, findProduk, $rootScope, $scope, ModelItem, manageSarpras, FindGizi, PengajuanUsulanAnggaranService) {
            $scope.listJenisPemeriksaan = [{ name: "Amprahan", id: 1 },
                { name: "Transfer", id: 2 }
            ];
            $scope.item = {};

            FindGizi.getOrderGizi($state.params.produkId).then(function(dat){
            debugger;
            $scope.orderGizi = dat.data.data.list;
                $scope.dataOrder = new kendo.data.DataSource({
                    data: $scope.orderGizi,
                    pageSize: 20,
                    // schema: {
                    //   model: {
                    //     fields: {
                    //       NamaBarang: { defaultValue: { id: 1, namaProduk: "--Pilih barang"}},
                    //       stok: { type: "number", editable: false},
                    //       qty: { type: "number"},
                    //       satuan: { defaultValue: { id: 1, satuanStandar: "--Pilih satuan"}}
                    //     }
                    //   }
                    // },
                    // change: function(e) {
                    //     console.log(e.action);
                    //     if (e.action === "add") {
                    //         var listRawRequired = [
                    //             "item.ruanganTujuan|k-ng-model|Ruangan tujuan",
                    //             "item.kelompokBarang|k-ng-model|Status barang"
                    //         ];

                    //         var isValid = ModelItem.setValidation($scope, listRawRequired);
                                
                    //         if(!isValid.status){
                    //             ModelItem.showMessages(isValid.messages);
                    //         } 
                    //     }
                    // }
                });
            });

            
            PengajuanUsulanAnggaranService.getKomponen("request-permintaan-barang/get-no-order", true).then(function(dat){
                $scope.item.noOrder = dat.data.noOrder;
            });
           
            $scope.optionsOrder = {
                pageable: true,
                scrollable: true,
                // toolbar: [{
                //     name: "create",
                //     text: "Tambah"
                // }],
                columns: [{
                    "field": "bahan",
                    "title": "Nama Barang",
                    "editor": categoryDropDownEditor 
                    // "template": "#=NamaBarang.namaProduk#"
                }, {
                    "field": "stok",
                    "title": "Saldo",
                    "width": "120px"
                },
                {
                    "field": "jumlahPorsi",
                    "title": "Qty",
                    "width": "120px"
                },
                {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": "150px",
                    "editor": category2DropDownEditor 
                    // "template": "#=satuan.satuanStandar#"
                },
                {
                    "command": [{
                    //     name: "edit", 
                    //     text: "Edit"
                    // },{
                        name: "destroy",
                        text: "Hapus"
                    }], 
                    "title": " ", 
                    "width": 100 
                }],
                editable: {
                    mode: "popup",
                    template: kendo.template($("#popup-editor").html())
                }
            };


            if ($state.params.noRec !== undefined &&
                $state.params.noRec !== '') {
                findSarpras.getOrderDetailBarang($state.params.noRec).then(function(e) {
                    var data = ModelItem.beforePost(e.data.data)
                    $scope.item = data;
                    $scope.item.ruanganPemesan = data.ruangan;
                    $scope.item.kelompokBarang = {
                        id: $scope.item.statusBarang.id,
                        kelompokProduk: $scope.item.statusBarang.name,
                    }
                    var items = [];
                    for (var key in e.data.data.orderPelayanan) {
                        if (e.data.data.orderPelayanan.hasOwnProperty(key)) {
                            var element = e.data.data.orderPelayanan[key];
                            items.push({
                                NamaBarang: element.produk,
                                stok: element.stokLogistik === undefined ? 0 : element.stokLogistik,
                                qty: element.qtyProduk,
                                satuan: element.satuanStandar
                            });
                        }
                    }
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: items
                    });
                });
                console.log(JSON.stringify($scope.item));
            } else {

            }
            $scope.item.tglOrder = new Date();
            PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan", true).then(function(dat){
                $scope.listRuanganTujuan = dat.data;
            });
            $scope.Save = function() {
                debugger;
                var listRawRequired = [
                    "item.jenisPermintaan|ng-model|Jenis permintaan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            if (element.jumlahPorsi !== undefined)
                                data.push({
                                    "qtyProduk": element.jumlahPorsi,
                                    "satuanStandar": {
                                        id: element.satuanStandarId
                                    },
                                    "stok": element.stok,
                                    "produk": {
                                        "id": element.bahanId
                                    }
                                });
                            debugger;
                        }
                    }
                    debugger
                    manageSarpras.saveOrderProduk(ModelItem.beforePost({
                        "noOrder": $scope.item.noOrder,
                        "requestBarangDariRuanganDetail": data,
                        "tglOrder": $scope.item.tglOrder,
                        "ruangan": {
                            // "id": $scope.item.ruanganPemesan.id
                            "id": $scope.item.ruangan.id
                        },
                        "ruanganTujuan": {
                            "id": $scope.item.ruanganTujuan.id
                        },
                        "jenisPermintaanVO": {
                            "id": $scope.item.jenisPermintaan
                        },
                        "statusBarang": {
                            "id": $scope.item.kelompokBarang.id
                        }
                    })).then(function(){
                        $scope.isNext = true;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.now = new Date();
            $scope.getSaldoStok = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
                var idx = $scope.dataItem.NamaBarang;
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
                findProduk.findStokBarang(idx.id, $scope.item.ruanganTujuan.id).then(function(e) {
                    $scope.dataItem.stok = e.data.data === null ? 0 : e.data.data;
                });
            }
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            // $scope.$watch('dataItem.satuan', function(e){
            //     if (e === undefined) return;
            //     if (e === null) return;
            //     if (e.id === undefined) return;

            //     var qty = $scope.dataItem.stok;
            //     findProduk.getKonversi($scope.tempItem.NamaBarang.idSatuan, e.id, $scope.dataItem.stok).then(function(e){
            //         $scope.dataItem.stok = e.data.value === null ? 0 : Math.floor(e.data.value);
            //     })
            // })

            $scope.getkonversi = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;

                findProduk.findStokBarang($scope.dataItem.NamaBarang.id, $scope.item.ruanganTujuan.id).then(function(e) {
                    $scope.dataItem.stok = e.data.data === null ? 0 : e.data.data;
                });

                findProduk.getKonversi($scope.dataItem.NamaBarang.idSatuan, $scope.dataItem.satuan.id, $scope.dataItem. stok).then(function(e){
                    $scope.dataItem.stok = e.data.value === null ? 0 : Math.floor(e.data.value);
                })
            }
            $scope
            function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "namaProduk",
                        dataValueField: "id",
                        dataSource: $scope.listNamaBarang
                    });
            }
            function category2DropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "satuanStandar",
                        dataValueField: "id",
                        dataSource: $scope.listSatuanStandard
                    });
            }
            // $scope.addProduk = function() {
            //     if ($scope.tempItem.qty === undefined || $scope.tempItem.qty === null || $scope.tempItem.qty === 0) {
            //         window.messageContainer.info('Qty belum di pilih');
            //     } else {
            //         $scope.dataOrder.add($scope.tempItem);
            //         $scope.tempItem = undefined;
            //     }
            // }

            $scope.Back = function(){
                window.history.back();
            }

            $scope.blabla = function() {
                
            }
        }
    ]);
});