define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PenerimaanBarangLogistikManualCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'R', 'DateHelper', 'PenerimaanBarangLogistik', 'dataRupService',
        function($rootScope, $scope, $state, ModelItem, r, DateHelper, PenerimaanBarangLogistik, dataRupService) {

            $scope.now = new Date();
            $scope.item = {};
            $scope.items = {};
            // $scope.disableKelompok = false;
            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // dataRupService.getData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // });
            dataRupService.getListData("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            dataRupService.getData("Pegawai&select=id,namaLengkap", true).then(function(e){
                $scope.listPegawai = e.data;
            })
            $scope.formatHarga = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            $scope.dataProduk = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "totalBiaya", aggregate: "sum" }
                ],
                editable: true,
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            asalProduk: { editable: false},
                            namaPengendali: { editable: false},
                            NamaBarang: { defaultValue: { id: 1, namaProduk: "--Pilih barang"}},
                            satuanStandar: { defaultValue: { id: 1, satuanStandar: "--Pilih satuan"}},
                            asalProduk: { defaultValue: { id: 1, asalProduk: "--Pilih satuan"}},
                            volumeBarang: {type: "number", editable: false},
                            hargaSupplier: {type: "number", editable: false},
                            discount: {type: "number"},
                            totalBiaya: {type: "number", editable: false},
                            jumlahTerima: {type: "number"}
                        }
                    }
                },
                change: function (e) {
                    if (e.action === "add") {
                        var listRawRequired = [
                            "item.kelompokBarang|k-ng-model|Status barang"
                        ];
                        var isValid = ModelItem.setValidation($scope, listRawRequired);
                        if(!isValid.status){
                            ModelItem.showMessages(isValid.messages);
                        } 
                    }
                    if (e.action === "sync") {
                        e.items[0].totalBiaya = e.items[0].jumlahTerima * e.items[0].hargaSupplier;
                        $scope.dataProduk.fetch();
                        $scope.items.totalSub = $scope.dataProduk.aggregates().totalBiaya.sum;
                    }
                }
            });
            $scope.getSatuan = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
                var idx = $scope.dataItem.NamaBarang;
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
            }
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
                // $scope.disableKelompok = true;
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            ModelItem.getDataDummyGeneric("AsalProduk", false).then(function(data) {
                $scope.listAsalProduk = data;
            })

            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
                debugger;
            };
            $scope.mainGridOptions = {
                sortable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                editable: {
                    mode: "popup",
                    template: kendo.template($("#popup-editor").html())
                },
                autoSync: true,
                batch: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [{
                    "field": "NamaBarang",
                    "title": "Nama Produk",
                    "editor": categoryDropDownEditor, 
                    "template": "#=NamaBarang.namaProduk#"
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    "editor": asalProdukDropDown,
                    "template": "#=asalProduk.asalProduk#",
                    width: 200
                },
                {
                    "field": "jumlahTerima",
                    "title": "Jumlah<br/>Terima",
                    headerAttributes: {
                        style : "text-align:center"
                    },
                    attributes: {
                        style: "text-align:center"
                    },
                    width: 80,
                    format: "{0:n0}"
                },
                {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": "100px",
                    "editor": category2DropDownEditor, 
                    "template": "#=satuanStandar.satuanStandar#"
                },
                {
                    "field": "hargaSupplier",
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
                    width: 150,
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
                    width: 150
                }]
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
            function asalProdukDropDown(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "asalProduk",
                        dataValueField: "id",
                        dataSource: $scope.listAsalProduk
                    });
            }
            $scope.Save = function() {
                var listRawRequired = [
                    "item.noSppb|ng-model|No Sppb",
                    "item.tanggalSpk|k-ng-model|Tanggal SPK",
                    "item.noKontrak|ng-model|No kontrak",
                    "item.tanggalKontrak|k-ng-model|Tanggal Kontrak",
                    "item.noFaktur|ng-model|No Faktur",
                    "item.tanggalFaktur|k-ng-model|Tanggal Faktur",
                    "item.noTerima|ng-model|No Terima",
                    "item.tanggalTerima|k-ng-model|Tanggal Penerimaan",
                    "item.menyerahkan|k-ng-model|Nama pegawai yang menyerahkan",
                    "item.menerima|k-ng-model|Nama pegawai yang menerima",
                    "item.mengetahui|k-ng-model|Nama pegawai yang mengetahui",
                    "item.pjPenerima|k-ng-model|Nama pegawai penanggung jawab penerimaan",
                    "item.nomorDokumen|ng-model|No Dokumen",
                    "item.tglDokumen|k-ng-model|Tanggal Dokumen",
                    "item.noPemesanan|ng-model|No Pemesanan",
                    "item.namaRekanan|k-ng-model|Nama Supplier"

                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var arrDetilPenerimaan = [];
                    $scope.dataProduk._data.forEach(function(data){
                        
                        var tempDetil = {
                            "strukPelayananDetail": {},
                            "produk": {
                                "id": data.NamaBarang.id
                            },
                            "qtyproduk": data.jumlahTerima,
                            "satuan": {
                                "id": data.NamaBarang.idSatuan
                            },
                            "asalProduk": {
                                "id": data.asalProduk.id
                            },
                            "harga": data.hargaSupplier,
                            "discount": data.discount,
                            "totalBiaya": data.totalBiaya,
                            "jumlahTerima":data.jumlahTerima,
                            "satuanTerima": {
                                "id": data.satuanStandar.id
                            }
                        }

                        arrDetilPenerimaan.push(tempDetil);

                    })
                    
                    if (arrDetilPenerimaan.length === $scope.dataProduk._data.length) {
                        // debugger;
                        var tempData = {
                            "noKontrak": $scope.item.noKontrak,
                            "noFaktur": $scope.item.noFaktur,
                            "noSppb": $scope.item.noSppb,
                            "noTerima": $scope.item.noTerima,
                            "tanggalTerima": DateHelper.getPeriodeFormatted($scope.item.tanggalTerima),
                            "tanggalFaktur": DateHelper.getPeriodeFormatted($scope.item.tanggalFaktur),
                            "tanggalKontrak": DateHelper.getPeriodeFormatted($scope.item.tanggalKontrak),
                            "tanggalSpk": DateHelper.getPeriodeFormatted($scope.item.tanggalSpk),
                            "supplier": {
                                "id": $scope.item.namaRekanan.id,
                                "namaRekanan": $scope.item.namaRekanan.namaRekanan
                            },
                            "ruangan": {
                                "namaRuangan": $scope.item.ruangan.namaRuangan,
                                "id": $scope.item.ruangan.id
                            },
                            "menyerahkan": {
                                "id": $scope.item.menyerahkan.id,
                                "namaRekanan": $scope.item.menyerahkan.namaLengkap
                            },
                            "menerima": {
                                "id": $scope.item.menerima.id,
                                "namaRekanan": $scope.item.menerima.namaLengkap
                            },
                            "mengetahui": {
                                "id": $scope.item.mengetahui.id,
                                "namaRekanan": $scope.item.mengetahui.namaLengkap
                            },
                            "pjPenerima": {
                                "id": $scope.item.pjPenerima.id,
                                "namaRekanan": $scope.item.pjPenerima.namaLengkap
                            },
                            "penerimaanBarangDetail": arrDetilPenerimaan
                        }
                        console.log(JSON.stringify(tempData));

                        PenerimaanBarangLogistik.savePenerimaanLogistik(tempData, "penerimaan-barang/save-penerimaan-barang/").then(function(e) {
                            console.log(e.data);
                            $scope.isNext = true;
                        });
                        // debugger;
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
    ])
})