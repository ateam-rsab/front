define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('VerifikasiPenerimaanAsetCtrl', ['ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem',
        function(ManageSarpras, $state, findSarpras, $rootScope, $scope, ModelItem) {
            $scope.now = new Date();
            $scope.dats = {};
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = data;
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            ModelItem.getDataDummyGeneric("KelompokProduk", false).then(function(data) {
                $scope.listKelompokBarang = data;
            })
            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            $scope.addProduk = function() {
                $scope.dataOrder.add($scope.tempItem);
                $scope.tempItem = undefined;
            }
            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "noRecRegistrasiAset",
                        fields: {
                            namaProduk: {type: "string", editable: false},
                            asalProduk: {type: "string", editable: false},
                            noRecKirimProduk: {type: "string", editable: false},
                            noRegisterAset: {type: "string", editable: false},
                            qtyProduk: {type: "number", editable: false}
                        }
                    }
                }
            });
            findSarpras.getKirimDetailAset($state.params.noRec).then(function(e) {
                var dataKirim;
                var data = dataKirim = ModelItem.beforePost(e.data.data)
                $scope.item = data.header;
                var items = [];
                for (var key in e.data.data.detail) {
                    if (e.data.data.detail.hasOwnProperty(key)) {
                        var element = e.data.data.detail[key];
                        $scope.dataOrder.add({
                            noRegisterAset: element.noRegisterAset,
                            asalProduk: element.asalProduk,
                            noRecRegistrasiAset: element.noRecRegistrasiAset,
                            namaProduk: element.namaProduk,
                            qtyProduk: element.qtyProduk,
                            noRecKirimProduk: element.noRecKirimProduk
                        });
                    }
                }
                $scope.dataOrder.fetch();
            });
            $scope.columnOrder = [{
                    "field": "noRecKirimProduk",
                    "title": "No Kirim",
                    hidden: true
                }, {
                    "field": "namaProduk",
                    "title": "Nama Produk",
                    width: 400
                }, {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                },
                {
                    "field": "noRegisterAset",
                    "title": "No Registrasi",
                },
                {
                    "field": "qtyProduk",
                    "title": "Qty Terima",
                },
                {
                    command: {
                        name: "destroy",
                        text: "Hapus"
                    },
                    width: 90
                }
            ];
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tglOrder|k-ng-model|Tanggal konfirmasi"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            if (element.qtyProduk !== undefined)
                                data.push({
                                    "noRec": element.noRecKirimProduk,
                                    "registrasiAset": {
                                        "noRec": element.noRecRegistrasiAset
                                    }
                                });
                        }
                    }

                    var tmpData = {
                        "strukKirimVO": {
                            "noRec": $state.params.noRec
                        },
                        "kirimProdukAsetVO": data
                    }

                    if (data.length !== 0) {
                        // console.log(JSON.stringify(tmpData));
                        ManageSarpras.saveDataSarPras(tmpData, "distribusi-aset/save-konfirmasi-aset/").then(function(e){
                            console.log(JSON.stringify(e.data));
                            $scope.isNext = true;
                        });
                    } else {
                        window.messageContainer.error('Data belum lengkap');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.Back = function() {
                window.history.back();
            }
        }
    ]);
});