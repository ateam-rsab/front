define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RevisiPenerimaanBarangLogistikCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'R', 'DateHelper', 'PenerimaanBarangLogistik', 'dataRupService',
        function($rootScope, $scope, $state, ModelItem, r, DateHelper, PenerimaanBarangLogistik, dataRupService) {

            $scope.now = new Date();
            $scope.item = {};
            $scope.items = {};

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
            $scope.listProduk = ModelItem.kendoHttpSource('/product/find-obat-data', true);
            $scope.$watch('dat.produk', function(e) {
                if (e === undefined) return;
                if (e === null) return;
                if (e.id === undefined) return;
                $scope.sourceSatuan = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + e.id, true);

            });

            $scope.colomnProduk = [{
                    "field": "no",
                    "title": "No",
                    width: 50
                },
                {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    width: 250
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    width: 200
                },
                {
                    "field": "volumeBarang",
                    "title": "Jumlah<br/>Order",
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
                    "field": "sisa",
                    "title": "Sisa",
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
                    width: 100,
                    headerAttributes: {
                        style : "text-align:center"
                    }
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
                },
                {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Kadaluarsa",
                    width: 120,
                    template: "<input style=\"width: 100%\" kendo-date-picker k-ng-model=\"dataItem.tanggalKadaluarsa\" placeholer=\"{{item.now}}\" k-on-change=\"update(data, columns, dataItem)\" />"
                },
                {
                    "field": "noBatch",
                    "title": "No Batch",
                    width: 120
                }
            ];

            $scope.canEdit = false;

            $scope.tambah = function() {
                // $scope.dat = {
                //  "tanggal": new Date(),
                //  "jamBaru": new Date(),
                //  "durasi": 0
                // };
                $scope.dat = {};
                $scope.canEdit = true;

                $scope.$watch('(dat.jumlahTerima * dat.harga) - (dat.discount/100 * (dat.jumlahTerima * dat.harga))', function(value) {
                    $scope.dat.subTotalProduk = value;
                });
            }

            $scope.dataProduk = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "totalBiaya", aggregate: "sum" }
                ],
                editable: true,
                schema: {
                    model: {
                        fields: {
                            asalProduk: { editable: false},
                            namaPengendali: { editable: false},
                            namaProduk: { editable: false},
                            satuanStandar: { editable: false},
                            volumeBarang: {type: "number", editable: false},
                            hargaSupplier: {type: "number", editable: false},
                            discount: {type: "number"},
                            totalBiaya: {type: "number", editable: false},
                            jumlahTerima: {type: "number"}
                        }
                    }
                },
                change: function (e) {
                    if (e.field && e.action === "itemchange") {
                        $scope.current.totalBiaya = ($scope.current.jumlahTerima * $scope.current.hargaSupplier) - $scope.current.discount;
                        
                        init();
                        // console.log(JSON.stringify($scope.dataProduk));
                        // debugger;
                    }
                    // debugger;
                }
            });

            dataRupService.getListData("kartu-pengendali/get-get-struk-rekap?noRec="+$state.params.noRec).then(function(data){
                $scope.item = data.data.penerimaanHeader;
                // console.log(JSON.stringify($scope.dats.supplier));
                $scope.item.supplier = {id: 1};
                $scope.item.noSppb = DateHelper.getPeriodeFormatted($scope.now)+"-001";
                $scope.item.noFaktur = "FN/"+DateHelper.getPeriodeFormatted($scope.now)+"/00-001";
                
                $scope.detilPenerimaan = data.data.penerimaanDetail;
                var i = 1;
                $scope.detilPenerimaan.forEach(function(detil) {
                    detil.no = i;
                    detil.totalBiaya = detil.volumeBarang * detil.hargaSupplier;
                    detil.jumlahTerima = 0;
                    detil.discount = 0;
                    detil.tanggalKadaluarsa = new Date();

                    $scope.dataProduk.add(detil);
                    i++;
                    // debugger;
                });
            });

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

            $scope.ArrProduk = [];

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
                console.log(current);
            };

            $scope.selesai = function(dataBaru) {
                var id = $scope.ArrProduk.length + 1;
                var newData = {
                    "no": id,
                    "produk": dataBaru.produk,
                    "asalProduk": dataBaru.asalProduk,
                    "qtyproduk": dataBaru.qtyproduk,
                    "satuan": dataBaru.satuan,
                    "jumlahTerima": dataBaru.jumlahTerima,
                    "satuanTerima": dataBaru.satuanTerima,
                    "harga": dataBaru.harga,
                    "discount": dataBaru.discount,
                    "total": dataBaru.subTotalProduk,
                    "tanggalKadaluarsa": DateHelper.getPeriodeFormatted(dataBaru.tanggalKadaluarsa),
                    "noBatch": dataBaru.noBatch
                };

                $scope.dataProduk.add(newData);
                $scope.ArrProduk.push(newData);
                $scope.canEdit = false;


                $scope.item.totalSub = $scope.dataProduk.aggregates().totalBiaya.sum;
            }

            $scope.Save = function() {
                var arrDetilPenerimaan = [];
                $scope.dataProduk._data.forEach(function(data){

                    if (!data.noBatch) {
                        data.noBatch = 1234
                    }
                    
                    var tempDetil = {
                        "produk":{  
                            "id": data.idProduk
                        },
                        "asalProduk":{  
                            "id": data.idAsalProduk
                        },
                        "qtyproduk":data.volumeBarang,
                        "discount":data.discount,
                        "harga":data.hargaSupplier,
                        "noBatch":data.noBatch,
                        "tanggalKadaluarsa": DateHelper.getPeriodeFormatted(data.tanggalKadaluarsa),
                        // "satuan":{  
                        //     "id":1
                        // },
                        "strukPelayananDetail": {
                            "noRec":data.noRecStrukPelayananDetail
                        },
                        "kartuPengendaliDetail":{
                            "noRec": data.noRec
                        },
                        "satuanTerima": {
                            "id":data.idSatuan
                        },
                        "jumlahTerima":data.jumlahTerima,
                        "sisa":data.sisa
                        // "satuanTerima":{  
                        //     "id":1
                        // }
                    }

                    if (data.jumlahTerima == 0 || data.sisa < data.jumlahTerima) {
                        window.messageContainer.error(data.namaProduk + "\n Jumlah terima tidak di isi dengan benar.");
                    } else {
                        arrDetilPenerimaan.push(tempDetil);
                    }

                })
                
                if (arrDetilPenerimaan.length === $scope.dataProduk._data.length) {
                    debugger;
                    var listRawRequired = [
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
                            "supplier": {id: $scope.item.supplierId},
                            "ruangan": {id: 50},
                            "penerimaanBarangDetail": arrDetilPenerimaan
                        }
                        // $scope.item.ruangan = {id: $scope.item.ruangan.id}
                        // $scope.item.penerimaanBarangDetail = $scope.dataProduk._data;

                        PenerimaanBarangLogistik.savePenerimaanLogistik(tempData, "penerimaan-barang/save-penerimaan-barang/").then(function(e) {
                            console.log(e.data);
                            $scope.isNext = true;
                        });
                        // console.log(JSON.stringify(tempData));
                        // debugger;
                    } else {
                        ModelItem.showMessages(isValid.messages);
                        debugger;
                    }
                }
            }
        }
    ])
})