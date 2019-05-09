define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('NilaiPersediaanBarangCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras',
        function($rootScope, $scope, ModelItem, DateHelper, findSarpras) {     

            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.isReport = true;
            $scope.klikCari = false;

            $scope.optionsDataStokOpname = {
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
                editable: true,
                columns: [{
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": "200px"
                }, {
                    "title": "Saldo",
                    "columns": [{
                        "field": "saldoAwal",
                        "title": "Awal",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "saldoMasuk",
                        "title": "Masuk",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "saldoKeluar",
                        "title": "Keluar",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "saldoAkhir",
                        "title": "Akhir",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "qtyProdukSystem",
                        "title": "Sistem",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "qtyProdukReal",
                        "title": "Real",
                        "format": "{0:n0}",
                        "attributes": {
                            "style": "text-align:right"
                        },
                        "width": 60,
                        filterable: false
                    }]
                }, {
                    "field": "hargaHetto",
                    "title": "Harga Netto",
                    "width": "80px",
                    filterable: false
                }, {
                    "field": "total",
                    "title": "Total",
                    "width": "80px",
                    filterable: false,
                    // "aggregates": "[\"sum\"]",
                    // "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(total, \"n0\")#</div>"
                }, {
                    "field": "noTerima",
                    "title": "No. Terima",
                    "width": "100px",
                    filterable: false
                }, {
                    "field": "noReg",
                    "title": "No. Registrasi",
                    "width": "100px",
                    filterable: false
                }]
            };
            $scope.cari = function() {
                var listRawRequired = [
                    "item.periodeAwal|k-ng-model|Periode awal",
                    "item.periodeAhir|k-ng-model|Periode akhir"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    findSarpras.getDaftarStokOpname(moment($scope.item.periodeAwal).format('YYYY-MM-DD'), moment($scope.item.periodeAhir).format('YYYY-MM-DD')).then(function (e) {
                        $scope.listStokOpname = e.data.data;
                        debugger;
                        $scope.klikCari = true;
                    });
                    // var msg = 'sukses';
                    // window.messageContainer.log(msg['label-success'])
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.lihatDetil = function() {
                console.log("data yang dipilih : " + $scope.item.dataStokOpname.tglClosing);
                findSarpras.getDetilStokOpname($scope.item.dataStokOpname.tglClosing).then(function (e) {
                    $scope.dataStokOpname = new kendo.data.DataSource({
                        data: ModelItem.beforePost(e.data.data),
                        aggregate: [
                            { field: "total", aggregate: "sum" }
                        ],
                        // schema: {
                        //     model: {
                        //         fields: {
                        //             namaProduk: { editable: false},
                        //             saldoAwal: { type: "number", editable: false},
                        //             saldoMasuk: { type: "number", editable: false},
                        //             qtyProdukSystem: { type: "number", editable: false},
                        //             qtyProdukReal: { type: "number", editable: false},
                        //             hargaHetto: {type: "number", editable: false},
                        //             total: {type: "number", editable: false},
                        //             noTerima: {type: "number", editable: false},
                        //             noReg: {type: "string", editable: false}
                        //         }
                        //     }
                        // }
                    });
                    debugger;
                });
            // findProduk.getStokRuangan('stok-op-name/list-stok-op-name').then(function(e) {
            //     $scope.dataStokOpname = new kendo.data.DataSource({
            //         data: e.data.data,
            //         schema: {
            //             model: {
            //                 id: "id",
            //                 fields: {
            //                     id: {editable: false},
            //                     namaProduk: {editable: false, type: "string"},
            //                     qtyProduk: {editable: false, type: "number"},
            //                     stokReal: {type: "number"},
            //                     selisih: {editable: false, type: "number"},
            //                     satuan: {editable: false, type: "string"}
            //                 }
            //             }
            //         },
            //         pageSize: 20,
            //         change: function (e) {
            //             console.log("change :" + e.action);
            //             if (e.field && e.action === "itemchange") {
            //                 $scope.current.selisih = $scope.current.qtyProduk - $scope.current.stokReal;
            //                 $scope.dataStokOpname.fetch();
            //             }
            //         }
            //     });
            // })
            }
            $scope.cetak = function() {
                window.messageContainer.error('Fitur belum tersedia');
            }
            // $scope.kl = function(current){
            //     $scope.current = current;
            //     console.log(current);
            // };
        }
    ]);
});