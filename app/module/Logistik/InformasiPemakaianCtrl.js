define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('InformasiPemakaianCtrl', ['$state', 'FindProduk', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras', 'PengajuanUsulanAnggaranService', 'DateHelper',
        function($state, findProduk, $rootScope, $scope, ModelItem, manageSarpras, findSarpras, PengajuanUsulanAnggaranService, DateHelper) {
            $scope.listJenisPemeriksaan = [{ name: "Amprahan", id: 1 },
                { name: "Transfer", id: 2 }
            ];
            $scope.item = {};
            $scope.tempItem = {};
            PengajuanUsulanAnggaranService.getKomponen("request-permintaan-barang/get-no-order", true).then(function(dat){
                $scope.item.noOrder = dat.data.noOrder;
            });
            $scope.dataPemakaian = new kendo.data.DataSource({
                data: [],
                pageSize: 20,
                schema: {
                  model: {
                    fields: {
                      NamaBarang: { defaultValue: { id: 1, namaProduk: "--Pilih barang"}},
                      stok: { type: "number", editable: false},
                      qty: { type: "number"},
                      satuan: { defaultValue: { id: 1, satuanStandar: "--Pilih satuan"}}
                    }
                  }
                },
                change: function(e) {
                    console.log(e.action);
                    if (e.action === "add") {
                        var listRawRequired = [
                            "item.kelompokBarang|k-ng-model|Kelompok produk",
                            "item.jenisProduk|k-ng-model|Jenis produk",
                            // "item.keperluan|ng-model|Keperluan"
                        ];

                        var isValid = ModelItem.setValidation($scope, listRawRequired);
                            
                        if(!isValid.status){
                            ModelItem.showMessages(isValid.messages);
                        } 
                    }
                }
            });
            $scope.optionsPemakaian = {
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
                    "field": "satuan",
                    "title": "Satuan",
                    "width": "150px",
                    "editor": category2DropDownEditor, 
                    "template": "#=satuan.satuanStandar#"
                }, {
                    "field": "stok",
                    "title": "Saldo",
                    "width": "120px"
                },
                {
                    "field": "qty",
                    "title": "Qty",
                    "width": "120px"
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
            $scope.item.tglPemakaian = new Date();
            PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            // PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan", true).then(function(dat){
            //     $scope.listRuanganTujuan = dat.data;
            // });
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tglPemakaian|k-ng-model|Tanggal pemakaian",
                    "item.keperluan|ng-model|Keperluan",
                    // "item.keperluan|ng-model|Keperluan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                var data = [];

                if(isValid.status){
                    $scope.dataPemakaian._data.forEach(function(items){
                        if (items.qty !== 0 && items.qty <= items.stok) {
                            data.push({  
                                "produk":{  
                                   "id":items.NamaBarang.id
                                },
                                "qtyproduk":items.qty,
                                "satuan":{  
                                   "id":items.satuan.id
                                }
                            })
                        }
                    })

                    if (data.length === $scope.dataPemakaian._data.length) {
                        var tmpData = {
                            "tanggalTerima":DateHelper.getPeriodeFormatted($scope.item.tglPemakaian),
                            "keterangan":$scope.item.keperluan,
                            "pemakaianBarangHabisPakai":data
                        }
                        // console.log(JSON.stringify(tmpData));
                        // debugger;
                        manageSarpras.saveDataSarPras(tmpData, "pemakain-barang/save-pemakaian-barang").then(function(e){
                            console.log(e.data);
                            $scope.isNext = true;
                        })
                    } else {
                        window.messageContainer.error('Data tidak valid');
                    }
                    
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
                // findProduk.findStokBarang(idx.id, $scope.item.ruanganTujuan.id).then(function(e) {
                findProduk.findStokBarang(idx.id, $scope.item.ruangan.id).then(function(e) {
                    $scope.dataItem.stok = e.data.data === null ? 0 : e.data.data;
                });
            }
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
                // $scope.isKelompok = false;
            })
            // $scope.$watch('item.kelompokBarang', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === undefined) return;
            //     $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
            //     $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            // })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
                // $scope.isJenis = false;
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })

            // $scope.$watch('tempItem.satuan', function(e){
            //     if (e === undefined) return;
            //     if (e === null) return;
            //     if (e.id === undefined) return;

            //     findProduk.getKonversi($scope.tempItem.NamaBarang.id, $scope.item.ruanganTujuan.id, e.id).then(function(e){
            //         $scope.tempItem.stok = e.data.data === null ? 0 : Math.floor(e.data.data) ;
            //     })
            // })
            $scope.getkonversi = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;

                findProduk.findStokBarang($scope.dataItem.NamaBarang.id, $scope.item.ruangan.id).then(function(e) {
                    $scope.tempItem.stok = e.data.data === null ? 0 : e.data.data;
                });

                if ($scope.dataItem.satuan.id !== $scope.dataItem.NamaBarang.idSatuanStandar)
                findProduk.getKonversi($scope.dataItem.NamaBarang.idSatuanStandar, $scope.dataItem.satuan.id, $scope.tempItem.stok).then(function(e){
                    $scope.dataItem.stok = e.data.value === null ? 0 : Math.floor(e.data.value);
                });
            }
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
            $scope.addProduk = function() {
                if ($scope.tempItem.qty === undefined || $scope.tempItem.qty === null || $scope.tempItem.qty === 0) {
                    window.messageContainer.info('Qty belum di pilih');
                } else {
                    $scope.dataOrder.add($scope.tempItem);
                    $scope.tempItem = undefined;
                }
            }

            $scope.Back = function(){
                window.history.back();
            }

            $scope.blabla = function() {
                
            }
        }
    ]);
});