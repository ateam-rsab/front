define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PenerimaanBarangLogistik2Ctrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'R', 'DateHelper', 'PenerimaanBarangLogistik', 'dataRupService',
        function($rootScope, $scope, $state, ModelItem, r, DateHelper, PenerimaanBarangLogistik, dataRupService) {

            $scope.now = new Date();
            $scope.item = {};
            $scope.items = {};
            $scope.canEdit = true;
            $scope.disable = true;

            $scope.dataProduk = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "totalBiaya", aggregate: "sum" }
                ],
                editable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            produk: { editable: false},
                            asalProduk: { editable: false},
                            qtyproduk: {type: "number", editable: false},
                            discount: {type: "number"},
                            harga: {type: "number", editable: false},
                            satuan: { editable: false},
                            satuanTerima: { editable: false},
                            jumlahTerima: {type: "number"},
                            namaPengendali: { editable: false},
                            totalBiaya: {type: "number", editable: false}
                        }
                    }
                },
                change: function (e) {
                    // debugger;
                    if (e.action === "itemchange") {
                        $scope.current.totalBiaya = ($scope.current.jumlahTerima * $scope.current.hargaSupplier) - $scope.current.discount;
                        
                        init();
                        // console.log(JSON.stringify($scope.dataProduk));
                        // debugger;
                    }
                },
                create: function (e) {
                    debugger;
                }
            });

            if ($state.params.noRec !== "") {
                $scope.canEdit = false;
                $scope.disable = false;
                dataRupService.getListData("kartu-pengendali/get-get-struk-rekap?noRec="+$state.params.noRec).then(function(data){
                    $scope.item = data.data.penerimaanHeader;
                    $scope.item.namaRekanan = {
                        id: $scope.item.supplierId,
                        namaRekanan: $scope.item.namaSupplier
                    };
                    $scope.item.noSppb = DateHelper.getPeriodeFormatted($scope.now)+"-001";
                    $scope.item.noFaktur = "FN/"+DateHelper.getPeriodeFormatted($scope.now)+"/00-001";
                    
                    $scope.detilPenerimaan = data.data.penerimaanDetail;
                    var i = 1;
                    $scope.detilPenerimaan.forEach(function(detil) {
                        detil.jumlahTerima = 0;
                        detil.discount = 0;
                        detil.totalBiaya = detil.volumeBarang * detil.hargaSupplier;
                        var newData = {
                            "produk": {
                                "id": detil.idProduk,
                                "namaSatuanStandar": detil.satuanStandar,
                                "namaProduk": detil.namaProduk,
                                "idSatuanStandar": detil.idSatuan
                            },
                            "asalProduk": {
                                "id": detil.idAsalProduk,
                                "asalProduk": detil.asalProduk
                            },
                            "qtyproduk": detil.jumlahOrder,
                            "discount": detil.discount === undefined ? 0 : detil.discount,
                            "harga": detil.hargaSupplier,
                            "satuan": {
                                "id": detil.idSatuan,
                                "satuanStandar": detil.satuanStandar
                            },
                            "jumlahTerima": detil.totalDiterima,
                            "satuanTerima": {
                                "id": detil.idSatuan,
                                "satuanStandar": detil.satuanStandar
                            },
                            "totalBiaya": detil.totalBiaya === undefined ? 0 : detil.totalBiaya,
                            "detilPenerimaan": detil.detilPenerimaan === undefined ? "" : detil.detilPenerimaan,
                        };

                        $scope.dataProduk.add(newData);
                        // debugger;
                    });
                });
            }
            $scope.formatPpn = {
                format: "{0:# \\%}"
            }
            $scope.formatHarga = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            PenerimaanBarangLogistik.getSumberDana("AsalProduk&select=id,asalProduk").then(function(data) {
                $scope.sourceSumber = data;
            });
            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // PenerimaanBarangLogistik.getSuplier("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // });

            PenerimaanBarangLogistik.getSatuan("SatuanStandar&select=id,satuanStandar").then(function(data) {
                $scope.sourceSatuan = data;
            });
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = data;
            });
            // $scope.listProduk = ModelItem.kendoHttpSource('/product/find-obat-data', true);
            // $scope.$watch('dat.produk', function(e) {
            //     if (e === undefined) return;
            //     if (e === null) return;
            //     if (e.id === undefined) return;
            //     $scope.sourceSatuan = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + e.id, true);

            // });
            $scope.mainGridOptions = {
                sortable: true,
                editable: {
                    mode: "popup",
                    window: {
                        title: "Input Penerimaan",
                        modal: true,
                        visible: false,
                        resizable: false,
                        width: 900
                    },
                    template: kendo.template($("#template").html())
                },
                autoSync: true,
                batch: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [{
                    "field": "no",
                    "title": "No",
                    width: 50
                },
                {
                    "field": "produk",
                    "title": "Nama Barang",
                    width: 250,
                    "template": "#=produk.namaProduk#"
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    width: 200,
                    "template": "#=asalProduk.asalProduk#"
                }, {
                    "field": "Order",
                    headerAttributes: {
                        style : "text-align:center"
                    },
                    columns: [{
                        "field": "qtyproduk",
                        "title": "Qty",
                        headerAttributes: {
                            style : "text-align:center"
                        },
                        attributes: {
                            style: "text-align:center"
                        },
                        width: 80,
                        format: "{0:n0}"
                    },{
                        "field": "satuan",
                        "title": "Satuan",
                        headerAttributes: {
                            style : "text-align:center"
                        },
                        width: 80,
                        "template": "#=satuan.satuanStandar#"
                    }]
                }, {
                    "field": "Terima",
                    headerAttributes: {
                        style : "text-align:center"
                    },
                    columns: [{
                        "field": "jumlahTerima",
                        "title": "Qty",
                        headerAttributes: {
                            style : "text-align:center"
                        },
                        attributes: {
                            style: "text-align:center"
                        },
                        width: 80,
                        format: "{0:n0}"
                    },{
                        "field": "satuanTerima",
                        "title": "Satuan",
                        headerAttributes: {
                            style : "text-align:center"
                        },
                        width: 80,
                        "template": "#=satuanTerima.satuanStandar#"
                    }]
                },
                {
                    "field": "harga",
                    "title": "Harga",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:right"
                    },
                    width: 100,
                    headerAttributes: {
                        style : "text-align:center"
                    }
                },
                {
                    "field": "discount",
                    "title": "Diskon",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:center"
                    },
                    width: 100,
                    headerAttributes: {
                        style : "text-align:center"
                    },
                    hidden: true
                },
                {
                    "field": "totalBiaya",
                    "title": "Sub Total",
                    type: "number",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:right"
                    },
                    headerAttributes: {
                        style : "text-align:center"
                    },
                    width: 100,
                    "aggregates": "[\"sum\"]",
                    "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
                },
                {
                    "title": "&nbsp;",
                    width: 120,
                    command: { 
                        name: "edit",
                        text: "View Details",
                        // click: showDetails 
                    }
                }]
            };
            $scope.arrayNoBatch = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "qty", aggregate: "sum" }
                ],
                editable: true,
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            noBatch: {type: "string"},
                            qty: {type: "number"},
                            tanggalKadaluarsa: {type: "date"}
                        }
                    }
                },
                change: function(e) {
                    debugger;
                }

            })
            $scope.columnNoBatch = {
                dataSource: [],
                sortable: true,
                editable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                columns: [{
                    "field": "noRec",
                    "title": "No Rec",
                    width: 100,
                }, {
                    "field": "noBatch",
                    "title": "No Batch",
                    width: 400,
                }, {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Kadaluarsa",
                    type: "date",
                    format: "{0:dd/MM/yyyy}",
                    width: 400,
                    editor: dateTimeEditor
                }, {
                    "field": "qty",
                    "title": "Qty",
                    type: "number",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:right"
                    },
                    headerAttributes: {
                        style : "text-align:center"
                    },
                    width: 100,
                    "aggregates": "[\"sum\"]",
                    "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
                }]
            }
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                        .appendTo(container)
                        .kendoDateTimePicker({});
            }
            $scope.$watch('(items.jumlahTerima * items.harga) - (items.discount/100 * (items.jumlahTerima * items.harga))', function(value) {
                $scope.items.subTotalProduk = value;
            });
            $scope.getSaldoStok = function(items){
                debugger;
                var idx = items.produk;
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
            }
            $scope.$watch('items.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('items.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

            var init = function(){
                $scope.dataProduk.fetch();

                var temptotal = $scope.dataProduk.aggregates().totalBiaya.sum;
                $scope.items.totalSub = kendo.toString(temptotal, "n0");

                var tempPpn = (10 / 100) * temptotal;
                $scope.items.ppn = kendo.toString(tempPpn, "n0");

                var temptotalAkhir = temptotal + tempPpn;
                $scope.items.totalPenerimaan = kendo.toString(temptotalAkhir, "n0");


            };

            init();

            $scope.parser = {};
            $scope.edit = function(data) {
                if ($scope.parser === data) $scope.canEdit = true;
                else {
                    $scope.canEdit = false;
                    $scope.parser = data;
                }
            };

            $scope.kl = function(current){
                $scope.current = current;
                console.log(JSON.stringify($scope.current));
            };

            $scope.tambah = function() {
                $("#arrayNoBatch").data('kendoGrid').dataSource.data([]);
                $scope.canEdit = true;
                $scope.items = {};

                $scope.$watch('(dat.jumlahTerima * dat.harga) - (dat.discount/100 * (dat.jumlahTerima * dat.harga))', function(value) {
                    $scope.dat.subTotalProduk = value;
                });
            }

            $scope.tambahDetil = function() {
                if ($scope.current) { 
                    $scope.canEdit = true;
                    $scope.items = $scope.current;
                    if ($scope.items.detilPenerimaan === "") {
                        $scope.arrayNoBatch.read($scope.items.detilPenerimaan)
                    } else {
                        $("#arrayNoBatch").data('kendoGrid').dataSource.data([]);
                    }
                } else { 
                    window.messageContainer.error('Data belum dipilih');
                }
            }
            // $scope.wnd = $("#details")
            //             .kendoWindow({
            //                 title: "Customer Details",
            //                 modal: true,
            //                 visible: false,
            //                 resizable: false,
            //                 width: 300
            //             }).data("kendoWindow");

            // $scope.detailsTemplate = kendo.template($("#template").html());

            // function showDetails(e) {
            //     e.preventDefault();
            //     $scope.items = this.dataItem($(e.currentTarget).closest("tr"));
            //     $scope.wnd.content($scope.detailsTemplate($scope.items));
            //     $scope.wnd.center().open();

            // }

            $scope.selesai = function(dataBaru) {
                var arrayPenerimaan = $scope.arrayNoBatch.aggregates().qty.sum;
                if (arrayPenerimaan === $scope.items.jumlahTerima) {
                    debugger;
                    var DetilPenerimaan = [];
                    $scope.arrayNoBatch._data.forEach (function (data) {
                        var temp = {
                            "noBatch" : data.noBatch,
                            "tanggalKadaluarsa": DateHelper.getPeriodeFormatted(data.tanggalKadaluarsa),
                            "qty": data.qty
                        }
                        DetilPenerimaan.push(temp);
                    })
                    var newData = {
                        "produk": dataBaru.produk,
                        "asalProduk": dataBaru.asalProduk,
                        "qtyproduk": dataBaru.qtyproduk,
                        "satuan": {
                            id: dataBaru.satuan.id,
                            satuanStandar: dataBaru.satuan.satuanStandar
                        },
                        "jumlahTerima": dataBaru.jumlahTerima,
                        "satuanTerima": {
                            id: dataBaru.satuanTerima.id,
                            satuanStandar: dataBaru.satuanTerima.satuanStandar
                        },
                        "harga": dataBaru.harga,
                        "discount": dataBaru.discount,
                        "totalBiaya": dataBaru.subTotalProduk,
                        "detilPenerimaan": DetilPenerimaan
                    };

                    $scope.dataProduk.add(newData);
                    $scope.canEdit = false;
                } else {
                    window.messageContainer.error('jumlah qty no batch tidak sesuai');
                }
                $scope.item.totalSub = $scope.dataProduk.aggregates().totalBiaya.sum;
                console.log(JSON.stringify($scope.dataProduk._data));
            }

            $scope.Save = function() {
                
                if ($scope.dataProduk._data.length > 0) {
                    debugger;
                    var listRawRequired = [
                        "item.noSppb|ng-model|No Sppb",
                        "item.noKontrak|ng-model|No Kontrak",
                        "item.noFaktur|ng-model|No Faktur",
                        "item.namaRekanan|k-ng-model|Nama supplier",
                        "item.tanggalTerima|k-ng-model|Tanggal penerimaan",
                    ];

                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                        
                    if(isValid.status){
                        var tempData = {
                            "noKontrak": $scope.item.noKontrak,
                            "noFaktur": $scope.item.noFaktur,
                            "noSppb": $scope.item.noSppb,
                            "tanggalTerima": DateHelper.getPeriodeFormatted($scope.item.tanggalTerima),
                            "tanggalFaktur": DateHelper.getPeriodeFormatted($scope.now),
                            "tanggalJatuhTempo": DateHelper.getPeriodeFormatted($scope.now),
                            "totalBeaMaterai": "6000",
                            "supplier": {id: $scope.item.namaRekanan.id},
                            "ruangan": {id: 50},
                            "penerimaanBarangDetail": $scope.dataProduk._data
                        }

                        PenerimaanBarangLogistik.savePenerimaanLogistik(tempData, "penerimaan-barang/save-penerimaan-barang/").then(function(e) {
                            console.log(e.data);
                            $scope.isNext = true;
                        });
                        // console.log(JSON.stringify(tempData));
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                }
            }
        }
    ])
})