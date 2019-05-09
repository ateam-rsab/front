define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('DistribusiBarangAsetCtrl', ['$state', 'FindProduk', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras', 'PengajuanUsulanAnggaranService',
        function($state, findProduk, $rootScope, $scope, ModelItem, manageSarpras, findSarpras, PengajuanUsulanAnggaranService) {
            // duplicate from /Logistik/OrderProdukRevCtrl
            $scope.item = {};
            PengajuanUsulanAnggaranService.getKomponen("request-permintaan-barang/get-no-order", true).then(function(dat){
                $scope.item.noOrder = dat.data.noOrder;
            });
            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                  model: {
                    fields: {
                      NamaBarang: { defaultValue: { id: 1, namaProduk: "--Pilih barang"}},
                      noAset: { defaultValue: { noRegisterAset: "--Pilih Nomor Aset"}},
                      qty: { type: "number", defaultValue: 1},
                      satuan: { defaultValue: { id: 1, satuanStandar: "--Pilih satuan"}}
                    }
                  }
                }
            });
            $scope.optionsOrder = {
                pageable: true,
                scrollable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [{
                    "field": "NamaBarang",
                    "title": "Nama Barang",
                    "editor": categoryDropDownEditor, 
                    "template": "#=NamaBarang.namaProduk#"
                }, 
                {
                    "field": "noAset",
                    "title": "No Aset",
                    "editor": categoryAsetDropDownEditor, 
                    "template": "#=noAset.noRegisterAset#"
                },
                {
                    "field": "qty",
                    "title": "Qty",
                    "width": "120px"
                },
                {
                    "field": "satuan",
                    "title": "Satuan",
                    "width": "150px",
                    "editor": category2DropDownEditor, 
                    "template": "#=satuan.satuanStandar#"
                },
                {
                    "command": [{
                        name: "edit", 
                        text: "Edit"
                    },{
                        name: "destroy",
                        text: "Hapus"
                    }], 
                    "title": " ", 
                    "width": 200 
                }],
                editable: {
                    mode: "popup",
                    template: kendo.template($("#popup-editor").html())
                }
            };
            $scope.item.tglKirim = new Date();
            PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan", true).then(function(dat){
                $scope.listRuanganTujuan = dat.data;
            });
            $scope.Save = function() {
                var listRawRequired = [
                    "item.ruanganTujuan|k-ng-model|Ruangan tujuan",
                    "item.tglKirim|k-ng-model|Tanggal order"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            if (element.qty !== undefined)
                                data.push({
                                    "registrasiAset": {
                                        "noRec": element.noAset.noRec
                                    },
                                    "produk": {
                                        "id": element.noAset.idProduk
                                    }
                                });
                        }
                    }
                    manageSarpras.saveDistribusiAset(ModelItem.beforePost({
                        "noOrder": $scope.item.noOrder,
                        "tglKirim": $scope.item.tglKirim,
                        "ruanganAsal": {
                            "id": $scope.item.ruanganTujuan.id
                        },
                        "ruanganTujuan": {
                            "id": $scope.item.ruangan.id
                        },
                        "distribusiAsetDetail": data
                    })).then(function(e){
                        $scope.isNext = true;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.now = new Date();
            $scope.getNoAset = function(dataItem){
                $scope.dataItem = dataItem;
                var idx = $scope.dataItem.NamaBarang;
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
                $scope.listNoAset = ModelItem.kendoHttpSource('distribusi-aset/find-aset-by-produk?id=' + idx.id, true);
                findProduk.findStokBarang(idx.id, $scope.item.ruangan.id).then(function(e) {
                    $scope.dataItem.stok = e.data.data === null ? 0 : e.data.data;
                });
            }
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('distribusi-aset/find-produk-aset', true);
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
            // $scope.getkonversi = function(data, dataItem, columns){
            //     $scope.data = data;
            //     $scope.dataItem = dataItem;
            //     $scope.columns = columns;

            //     findProduk.findStokBarang($scope.dataItem.NamaBarang.id, $scope.item.ruanganTujuan.id).then(function(e) {
            //         $scope.dataItem.stok = e.data.data === null ? 0 : e.data.data;
            //     });

            //     findProduk.getKonversi($scope.dataItem.NamaBarang.idSatuan, $scope.dataItem.satuan.id, $scope.dataItem. stok).then(function(e){
            //         $scope.dataItem.stok = e.data.value === null ? 0 : Math.floor(e.data.value);
            //     })
            // }
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
            function categoryAsetDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "noRegisterAset",
                        dataValueField: "noRegisterAset",
                        dataSource: $scope.listNoAset
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