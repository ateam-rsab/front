define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('PemusnahanBarangCtrl', ['$state', 'FindProduk', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras', 'PengajuanUsulanAnggaranService', 'DateHelper',
        function($state, findProduk, $rootScope, $scope, ModelItem, manageSarpras, findSarpras, PengajuanUsulanAnggaranService, DateHelper) {
            $scope.listJenisPemeriksaan = [{ name: "Amprahan", id: 1 },
                { name: "Transfer", id: 2 }
            ];
            $scope.item = {};
            PengajuanUsulanAnggaranService.getGetData("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
                $scope.listSumberDana = dat;
                // debugger;
            });
            // get No Order
            PengajuanUsulanAnggaranService.getKomponen("request-permintaan-barang/get-no-pemusnahan", true).then(function(dat){
                $scope.item.noOrder = dat.data.noPemusnahan;
            });
            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                  model: {
                    id: "id",
                    fields: {
                      NamaBarang: { defaultValue: { namaProduk: "--Pilih barang"}},
                      asalProduk: { defaultValue: { asalProduk: "--Belum Dipilih"}},
                      satuan: { defaultValue: { satuanStandar: "--Pilih satuan"}},
                      qty: { type: "number"}
                    }
                  }
                },
                change: function(e) {
                    console.log(e.action);
                    if (e.action === "add") {
                        var listRawRequired = [
                            "item.ruanganTujuan|k-ng-model|Ruangan tujuan",
                            "item.kelompokBarang|k-ng-model|Status barang"
                        ];

                        var isValid = ModelItem.setValidation($scope, listRawRequired);
                            
                        if(!isValid.status){
                            ModelItem.showMessages(isValid.messages);
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
                    "field": "asalProduk",
                    "title": "Asal Produk",
                    "width": "180px",
                    "editor": asalProdukDropDownEditor, 
                    "template": "#=asalProduk.asalProduk#"
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
                    "field": "kondisi",
                    "title": "Kondisi",
                    "width": 250,
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
            } else {}
            $scope.item.tglOrder = new Date();
            PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan", true).then(function(dat){
                $scope.listRuanganTujuan = dat.data;
            });
            $scope.Save = function() {
                var listRawRequired = [
                    "item.jenisPermintaan|ng-model|Jenis permintaan",
                    "item.ruanganTujuan|ng-model|Ruangan tujuan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    debugger;
                    var data = [];
                    for (var key in $scope.dataSource._data) {
                        if ($scope.dataSource._data.hasOwnProperty(key)) {
                            var element = $scope.dataSource._data[key];
                            if (element.qty !== undefined)
                                data.push({
                                    "qtyProduk": element.qty,
                                    "satuanStandar": {
                                        id: element.satuan.id
                                    },
                                    "asalProduk": element.asalProduk,
                                    "produk": {
                                        "id": element.NamaBarang.id
                                    }
                                });
                        }
                    }
                    console.log(JSON.stringify(data));
                    manageSarpras.saveRequestPemusnahan(ModelItem.beforePost({
                        "noOrder":$scope.item.noOrder,
                        "requestBarangDariRuanganDetail":data,
                        "tglOrder": DateHelper.getPeriodeFormatted($scope.item.tglOrder),
                        "ruangan":{
                            id: $scope.item.ruangan.id
                        },
                        "ruanganTujuan": {
                            id: $scope.item.ruanganTujuan.id
                        },
                        "jenisPermintaanVO": {
                            id: $scope.item.jenisPermintaan.id
                        },
                        "statusBarang": {
                            id: $scope.item.kelompokBarang.id
                        }
                    })).then(function(e){
                        $scope.isNext = true;
                        console.log(e.data);
                    });
                } else {
                    debugger;
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.now = new Date();
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
            function asalProdukDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "asalProduk",
                        dataValueField: "id",
                        dataSource: $scope.listSumberDana
                    });
            }

            $scope.Back = function(){
                window.history.back();
            }

            $scope.blabla = function() {}
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
            $scope.getSaldoStok = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
                var idx = $scope.dataItem.NamaBarang;
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
                findProduk.findStokBarang(idx.id, $scope.item.ruangan.id).then(function(e) {
                    $scope.dataItem.stok = e.data.data === null ? 0 : e.data.data;
                });
            }
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

            // - bikin data source untuk grid kendo
            $scope.dataSource = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                  model: {
                    fields: {
                      NamaBarang: { defaultValue: { namaProduk: "--Pilih barang"}},
                      asalProduk: { defaultValue: { asalProduk: "--Belum Dipilih"}},
                      satuan: { defaultValue: { satuanStandar: "--Pilih satuan"}},
                      qty: { type: "number"}
                    }
                  }
                },
                change: function(e) {
                    console.log(e.action);
                    if (e.action === "add") {
                        var listRawRequired = [
                            "item.ruanganTujuan|k-ng-model|Ruangan tujuan",
                            "item.kelompokBarang|k-ng-model|Status barang"
                        ];

                        var isValid = ModelItem.setValidation($scope, listRawRequired);
                            
                        if(!isValid.status){
                            e.preventDefault();
                            this.remove(e.items[0])
                            ModelItem.showMessages(isValid.messages);
                        } 
                    }
                }
             });


            $scope.dropDownEditor_namaBarang = function(container, options) {
                var editor = $('<input kendo-combo-box required k-data-text-field="\'namaProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-on-change="getSaldoStok(data, dataItem, columns)" k-data-source="listNamaBarang" data-bind="value:' + options.field + '"/>')
                .appendTo(container);
            }


            $scope.dropDownEditor_satuanStandar = function(container, options) {
                var editor = $('<input kendo-combo-box required k-data-text-field="\'satuanStandar\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-data-source="listSatuanStandard" data-bind="value:' + options.field + '"/>')
                .appendTo(container);
            }

            $scope.dropDownEditor_asalProduk = function(container, options) {
                var editor = $('<input kendo-combo-box required k-data-text-field="\'asalProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-data-source="listSumberDana" data-bind="value:' + options.field + '"/>')
                .appendTo(container);
            }

            // - ini penting buat inisialiasi option grid
            $scope.mainGridOptions = {
                navigatable: true,
                dataSource: $scope.dataSource,
                pageable: true,
                height: 550,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [
                  { field: "NamaBarang", title: "Nama Barang", width: "120px", editor: $scope.dropDownEditor_namaBarang, template: "#=NamaBarang.namaProduk#" },
                  { field: "asalProduk", title: "Asal Produk", width: "120px", editor: $scope.dropDownEditor_asalProduk, template: "#=asalProduk.asalProduk#" },
                  { field:"qty", title:"Qty", width:"100px"},
                  { field: "satuan", title: "Satuan", width: "70px", editor: $scope.dropDownEditor_satuanStandar, template: "#=satuan.satuanStandar#" },
                  { field: "kondisi", title: "Kondisi", width: 250 },
                  { command: "destroy", title: " ", width: "50px" }],
                editable: true
            };
        }
    ]);
});