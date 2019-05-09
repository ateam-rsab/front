define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemesananBahanCtrl', ['CacheHelper', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageGizi', 'FindPasienGizi',
        function(cacheHelper, $rootScope, $scope, $state, ModelItem, DateHelper, ManageGizi, FindPasienGizi) {
            $scope.item = {};
            $scope.title = "Pemesanan Bahan";
            $scope.titled = "Daftar Produk Formula";


            ModelItem.get("PerencanaanDanPemasaran/DiagramTows").then(function(data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            debugger;
            $scope.source = cacheHelper.get('bahanDiet').data;
            debugger;
            $scope.sourceDaftarPemesananLogistik = new kendo.data.DataSource({
                // pageSize: 10,
                data: $scope.source,
                schema: {
                    model: {
                        fields: {
                            "bahanProduk.namaProduk": { editable: false },
                            "standarPorsi": { editable: false },
                            "qty": { editable: false },
                            "stok": { editable: false },
                            "satuanStandar.satuanStandar": { editable: false },
                            "pesananProduk": { type: "number", validation: { required: true } }
                        }
                    }
                }
            });

            FindPasienGizi.getGizi("order-gizi/get-bahan-order/?noOrder=" + $state.params.noKirimOrder).then(function(dat) {
                // debugger;
            });

            $scope.mainGridOptions = {
                pageable: true,
                scrollable: false,
                columns: [{
                    //             	"field": "no",
                    // 	"title": "<h3 align=center>No<h3>",
                    // 	"width": "50px",
                    // 	"attributes": {align:"center"}
                    // }, {
                    "field": "bahanProduk.namaProduk",
                    "title": "<h3 align=center>Nama Bahan</h3>",
                    "width": "300px"
                }, {
                    "field": "standarPorsi",
                    "title": "<h3 align=center>Standar Porsi<h3>",
                    "width": "100px"
                }, {
                    "field": "stok",
                    "title": "<h3 align=center>Stok<h3>",
                    "width": "100px"
                }, {
                    "field": "qty",
                    "title": "<h3 align=center>Qty<h3>",
                    "width": "100px"
                }, {
                    "field": "satuanStandar.satuanStandar",
                    "title": "<h3 align=center>Satuan<h3>",
                    "width": "100px"
                }, {
                    "field": "pesananProduk",
                    "title": "<h3 align=center>Total<h3>",
                    "width": "200px"
                }, {
                    command: ["edit"],
                    title: "&nbsp;",
                    width: "100px"
                }],
                editable: "inline"
            };

            // $scope.columnDaftarPemesananLogistik = [
            // {
            // 	"field": "no",
            // 	"title": "<h3 align=center>No<h3>",
            // 	"width": "50px",
            // 	"attributes": {align:"center"}
            // }, {
            // 	"field": "bahanProduk.namaProduk",
            // 	"title": "<h3 align=center>Nama Bahan</h3>",
            // 	"width": "300px"
            // }, {
            // 	"field": "standarPorsi",
            // 	"title": "<h3 align=center>Standar Porsi<h3>",
            // 	"width": "100px"
            // }, {
            // 	"field": "qty",
            // 	"title": "<h3 align=center>Qty<h3>",
            // 	"width": "100px"
            // }, {
            // 	"field": "satuanStandar.satuanStandar",
            // 	"title": "<h3 align=center>Satuan<h3>",
            // 	"width": "100px"
            // }, {
            // 	"field": "pesananProduk",
            // 	"title": "<h3 align=center>Total<h3>",
            // 	"width": "200px"
            // },{

            // }
            // }];

            $scope.Save = function() {
                var dat = $scope.sourceDaftarPemesananLogistik._data;
                console.log(JSON.stringify(dat));
                var i = 0;
                var requestBarangDariRuanganDetail = [];
                dat.forEach(function(data) {
                    var data = {
                        "produk": {
                            "id": data.bahanProduk.id
                        },
                        "satuanStandar": {
                            "id": data.satuanStandar.id
                        },
                        "qty": data.pesananProduk,
                        "stok": data.stok
                    }
                    requestBarangDariRuanganDetail[i] = data;
                    i++;
                })

                var data = {
                    "requestBarangDariRuanganDetail": requestBarangDariRuanganDetail,
                    "tglOrder": $scope.now,
                    "ruangan": {
                        "id": 54
                    },
                    "ruanganTujuan": {
                        "id": 50
                    }
                }
                debugger;
                console.log(JSON.stringify(data));
                ManageGizi.saveGizi(data, "order-gizi/save-request-permintaan-barang/").then(function(e) {
                });
                $scope.goToDaftarPasien();
            };
            $scope.goToDaftarPasien = function() {
                $state.go("DaftarPasienOrder")
            }
        }
    ])
})