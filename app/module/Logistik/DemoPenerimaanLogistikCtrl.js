define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('DemoPenerimaanLogistikCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','DateHelper','ManageSarpras', 'PenerimaanBarangLogistik', 'dataRupService',
        function($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, PenerimaanBarangLogistik, dataRupService) {
			
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tanggalPengajuanAwal;
			$scope.item.tanggalPengajuanAhir;
			$scope.messages = {};
			var childData = {};
            $scope.disable = true;

            dataRupService.getListData("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            ManageSarpras.getListData("Pegawai&select=id,namaLengkap", true).then(function(e){
                $scope.listPegawai = e.data;
            })
            // $scope.item.ruangan = $scope.ruangan;
			$scope.dataProduk = new kendo.data.DataSource({
                autoSync: true,
                // dataSource: {
                //   create: function(options) {
                //     options.success( { id: id++ } );
                //   }
                // },
                // data: [],
                aggregate: [
                    { field: "totalBiaya", aggregate: "sum" }
                ],
                editable: true,
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { editable: false},
                            // namaPengendali: { editable: false},
                            produk: { defaultValue: { id: 1, namaProduk: "--Pilih barang"}},
                            satuan: { defaultValue: { id: 1, satuanStandar: "--Pilih satuan"}},
                            asalProduk: { defaultValue: { id: 1, asalProduk: "--Pilih satuan"}},
                            // volumeBarang: {type: "number", editable: false},
                            hargaSupplier: {type: "number", editable: false},
                            // discount: {type: "number"},
                            totalBiaya: {type: "number", editable: false},
                            jumlahTerima: {type: "number"},
                            detilPenerimaan: {type: "object"}
                        }
                    }
                },
                change: function (e) {
                    // console.log(e.action);
                    // debugger;
                    if (e.action === "add") {
                        e.items[0].id = e.items[0].uid;
                    }
                    if (e.action === "sync") {
                        if (e.items[0]) {
                            e.items[0].totalBiaya = e.items[0].hargaSupplier * e.items[0].jumlahTerima;
                            console.log(e.items[0].totalBiaya);
                        }
                    }
                }
            });
            
            $scope.mainGridOptions = {
                sortable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                detailInit: $scope.detailInit,
                // dataBound: function() {
                //     this.expandRow(this.tbody.find("tr.k-master-row").first());
                // },
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
                    "title": "Nama Produk",
                    // "editor": categoryDropDownEditor, 
                    "template": "#=produk.namaProduk#"
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    // "editor": asalProdukDropDown,
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
                    "field": "satuan",
                    "title": "Satuan",
                    "width": "150px",
                    // "editor": category2DropDownEditor, 
                    "template": "#=satuan.satuanStandar#"
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
                }],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Input Penerimaaan"
                    },
                    template: kendo.template($("#popup-editor").html())
                }
            };
            if ($state.params.noRec !== "") {
                $scope.canEdit = false;
                $scope.disable = false;
                dataRupService.getListData("kartu-pengendali/get-get-struk-rekap?noRec="+$state.params.noRec).then(function(data){
                    $scope.item = data.data.penerimaanHeader;
                    $scope.item.namaRekanan = {
                        id: $scope.item.supplierId,
                        namaRekanan: $scope.item.namaSupplier
                    };
                    dataRupService.getListData("anggaran/get-ruangan", true).then(function(dat){
                        $scope.item.ruangan = dat.data.data;
                    });
                    $scope.item.noSppb = DateHelper.getPeriodeFormatted($scope.now)+"-001";
                    $scope.item.noFaktur = "FN/"+DateHelper.getPeriodeFormatted($scope.now)+"/00-001";
                    
                    $scope.detilPenerimaan = data.data.penerimaanDetail;
                    var i = 1;
                    $scope.detilPenerimaan.forEach(function(detil) {
                        detil.jumlahTerima = 0;
                        detil.discount = 0;
                        detil.totalBiaya = detil.volumeBarang * detil.hargaSupplier;
                        var newData = {
                            "noRecStrukPelayananDetail": detil.noRecStrukPelayananDetail === undefined ? 0 :detil.noRecStrukPelayananDetail,
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
                            "hargaSupplier": detil.hargaSupplier,
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
            } else {
                $scope.canEdit = true;
            }
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
                    "field": "noBatch",
                    "title": "No Batch"
                }, {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Kadaluarsa",
                    editor: dateTimeEditor
                    // "template": "<input kendo-date-picker k-ng-model=\"dataItem.tanggalKadaluarsa\" k-on-change=\"updateChild(data, columns, dataItem)\" style=\"width: 100%\" ></input>"
                    // "template": "<input style=\"width: 100%\" kendo-date-picker k-on-change=\"update(data, dataItem, columns)\" k-format=\"dd-MM-yyyy\"/>"
                }, {
                    "field": "qty",
                    "title": "Qty",
                    type: "number",
                    format: "{0:n0}",
                    "aggregates": "[\"sum\"]",
                    "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
                }]
            }
            $scope.detailInit = function(e) {
                if (!e.data.id) {
                    e.data.id = kendo.guid();
                }
                var id = e.data.id;
                var dataSource = childData[id];

                if (!dataSource) {
                    dataSource = childData[id] = new kendo.data.DataSource({
                        schema: {
                            model: {
                                id: "detilId",
                                fields: {
                                    detilId: {defaultValue: e.data.id},
                                    noBatch: {type: "string"},
                                    qty: {type: "number"},
                                    tanggalKadaluarsa: {type: "date"}
                                }
                            }
                        },
                        aggregate: [
                            { field: "qty", aggregate: "sum" }
                        ],
                        change: function (e) {
                            console.log(e.action);
                            // debugger;
                        }
                    });
                }
                $scope.childgrid = $("<div class='childGrid'></div>").appendTo(e.detailCell).kendoGrid({
					dataSource: dataSource,
                    // aggregate: [
                    //     { field: "qty", aggregate: "sum" }
                    // ],
					sortable: true,
					editable: true,
					toolbar: [{
						name: "create",
						text: "Tambah"
					}],
					columns: [{
                        "field": "detilId",
                        "title": "",
                        hidden: true,
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
                        width: 100
                    }, {
                        command: {
                            name: "destroy",
                            text: "Hapus"
                        },
                        width: 80
                    }]
				}).data("kendoGrid");
            };
            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                        .appendTo(container)
                        .kendoDateTimePicker({});
            }
            $scope.getKelompok = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
                var idx = $scope.dataItem.kelompokBarang;
                // debugger;
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + idx.id, true);
                // $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
            }
            $scope.getJenis = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
                var idx = $scope.dataItem.jenisProduk;
                // debugger;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + idx.id, true);
                // $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
            }
            $scope.getSatuan = function(data, dataItem, columns){
                $scope.data = data;
                $scope.dataItem = dataItem;
                $scope.columns = columns;
                var idx = $scope.dataItem.produk;
                // debugger;
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + idx.id, true);
            }
            // $scope.$watch('dataItem.kelompokBarang', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === undefined) return;
            //     $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
            //     $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + idx.id, true);
            // })
            // $scope.$watch('dataItem.jenisProduk', function(e) {
            //     if (e === undefined) return;
            //     if (e.id === undefined) return;
            //     $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            // })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            ModelItem.getDataDummyGeneric("AsalProduk", false).then(function(data) {
                $scope.listAsalProduk = data;
            })
            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // PenerimaanBarangLogistik.getSuplier("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // });
            $scope.kl = function(current){
				$scope.current = current;
				console.log(current);
                // debugger;
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
                    // console.log($scope.item);
                    // console.log(JSON.stringify($scope.dataProduk._data));
                    var dataPenerimaan = [];
                    $scope.dataProduk._data.forEach(function(data){
                        if (data.jumlahTerima !== 0 && data.hargaSupplier !== 0) {
                            if (data.noRecStrukPelayananDetail === 0) {
                                var parentData = {
                                    // "id": data.id,
                                    "produk": {
                                        "id": data.produk.id,
                                        "namaProduk": data.produk.namaProduk,
                                        "namaSatuanStandar": data.produk.namaSatuanStandar,
                                        "idSatuanStandar": data.produk.idSatuanStandar
                                    },
                                    "qtyproduk": data.jumlahTerima,
                                    "satuan": {
                                        "id": data.satuan.id
                                    },
                                    "asalProduk": {
                                        "id": data.asalProduk.id,
                                        "asalProduk": data.asalProduk.asalProduk
                                    },
                                    "harga": data.hargaSupplier,
                                    "discount": 0,
                                    "totalBiaya": data.totalBiaya,
                                    "jumlahTerima": data.jumlahTerima,
                                    "satuanTerima": {
                                        "id": data.satuan.id
                                    },
                                    "detilPenerimaan": []
                                }
                            } else {
                                var parentData = {
                                    "strukPelayananDetail" : {
                                        noRec: data.noRecStrukPelayananDetail
                                    },
                                    "produk": {
                                        "id": data.produk.id,
                                        "namaProduk": data.produk.namaProduk,
                                        "namaSatuanStandar": data.produk.namaSatuanStandar,
                                        "idSatuanStandar": data.produk.idSatuanStandar
                                    },
                                    "qtyproduk": data.jumlahTerima,
                                    "satuan": {
                                        "id": data.satuan.id
                                    },
                                    "asalProduk": {
                                        "id": data.asalProduk.id,
                                        "asalProduk": data.asalProduk.asalProduk
                                    },
                                    "harga": data.hargaSupplier,
                                    "discount": 0,
                                    "totalBiaya": data.totalBiaya,
                                    "jumlahTerima": data.jumlahTerima,
                                    "satuanTerima": {
                                        "id": data.satuan.id
                                    },
                                    "detilPenerimaan": []
                                }
                            }

                            var chldData  = $(".childGrid");
                            var keepGoing = true;

                            chldData.each(function(index, element){
                                if (keepGoing) {
                                    var dataChild = $(element).data("kendoGrid").dataSource.data();
                                    // var dataChild = $(element).data("kendoGrid").dataSource;
                                    var totalItem = $(element).data("kendoGrid").dataSource.aggregates().qty.sum;

                                    dataChild.forEach(function(e){
                                        if (keepGoing) {
                                            if (data.id === e.detilId) {
                                                if (data.jumlahTerima === totalItem) {
                                                    var tmpChldData = {
                                                        // "detilId": e.detilId,
                                                        "noBatch": e.noBatch,
                                                        "qty": e.qty,
                                                        "tanggalKadaluarsa": DateHelper.getPeriodeFormatted(new Date(e.tanggalKadaluarsa))
                                                    }
                                                    // console.log(JSON.stringify(tmpChldData));
                                                    parentData.detilPenerimaan.push(tmpChldData);
                                                } else {
                                                    keepGoing = false;
                                                }
                                            }
                                        }
                                    }) 
                                } //keepGoing
                            });
                            if (parentData.detilPenerimaan.length !== 0) {
                                dataPenerimaan.push(parentData);
                                // console.log(JSON.stringify(parentData));
                            }
                        }
                    })
                    var tempData = {
                        "noKontrak": $scope.item.noKontrak,
                        "noFaktur": $scope.item.noFaktur,
                        "noSppb": $scope.item.noSppb,
                        "noTerima": $scope.item.noTerima,
                        "tanggalTerima": DateHelper.getPeriodeFormatted($scope.item.tanggalTerima),
                        "tanggalFaktur": DateHelper.getPeriodeFormatted($scope.item.tanggalFaktur),
                        "tanggalKontrak": DateHelper.getPeriodeFormatted($scope.item.tanggalKontrak),
                        "tanggalSpk": DateHelper.getPeriodeFormatted($scope.item.tanggalSpk),
                        "noDokumen": $scope.item.nomorDokumen,
                        "tglDokumen": DateHelper.getPeriodeFormatted($scope.item.tglDokumen),
                        "noPesanan": $scope.item.noPemesanan,
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
                        "penerimaanBarangDetail": dataPenerimaan
                    }
                    if (tempData.penerimaanBarangDetail.length === $scope.dataProduk._data.length) {
                        // console.log(JSON.stringify(tempData));
                        PenerimaanBarangLogistik.savePenerimaanLogistik(tempData, "penerimaan-barang/save-penerimaan-barang/").then(function(e) {
                            console.log(e.data);
                            $scope.isNext = true;
                        });
                    } else {
                        window.messageContainer.error('Data belum lengkap, Data tidak dapat di Proses');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
			}

		}
	]);
});