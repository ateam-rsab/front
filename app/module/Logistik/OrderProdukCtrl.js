define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('OrderProdukCtrl', ['$sce', '$state', 'FindProduk', '$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'FindSarpras', 'PengajuanUsulanAnggaranService',
        function($sce, $state, findProduk, $rootScope, $scope, ModelItem, manageSarpras, findSarpras, PengajuanUsulanAnggaranService) {
            $scope.listJenisPemeriksaan = [{ name: "Amprahan", id: 1 },
                { name: "Transfer", id: 2 }
            ];
            $scope.item = {};
            // $scope.item.ruanganTujuan = {id: 50};
            // $scope.listRuanganTujuan = [{
            //     "id": 50, "namaRuangan": "Logistik"}
            // ];

            $scope.dataOrder = new kendo.data.DataSource({
                data: []
            });
            if ($state.params.noRec !== undefined &&
                $state.params.noRec !== '') {
                debugger;
                // $scope.isReport = true;
                if ($state.params.noKirim !== undefined && $state.params.noKirim !==  '') {
                    $scope.isReport = true
                }
                findSarpras.getOrderDetailBarang($state.params.noRec).then(function(e) {
                    $scope.isEdit = false;
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
            } else {}
            $scope.item.tglOrder = new Date();
            PengajuanUsulanAnggaranService.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
                // debugger;
            });
            PengajuanUsulanAnggaranService.getGetData("Ruangan&select=id,namaRuangan", true).then(function(dat){
                $scope.listRuanganTujuan = dat.data;
            });
            $scope.Save = function() {
                var data = [];
                for (var key in $scope.dataOrder._data) {
                    if ($scope.dataOrder._data.hasOwnProperty(key)) {
                        var element = $scope.dataOrder._data[key];
                        if (element.qty !== undefined)
                            data.push({
                                "qty": element.qty,
                                "satuanStandar": {
                                    id: element.satuan.id
                                },
                                "stok": element.stok,
                                "produk": {
                                    "id": element.NamaBarang.id
                                }
                            });
                    }
                }
                manageSarpras.saveOrderProduk(ModelItem.beforePost({
                    "noOrder": $scope.item.noOrder,
                    "requestBarangDariRuanganDetail": data,
                    "tglOrder": $scope.item.tglOrder,
                    "ruangan": {
                        // "id": $scope.item.ruanganPemesan.id
                        "id": $scope.item.ruangan.id
                    },
                    "ruanganTujuan": {
                        "id": $scope.item.ruanganTujuan.id
                    },
                    "jenisPermintaanVO": {
                        "id": $scope.item.jenisPermintaan.id
                    },
                    "statusBarang": {
                        "id": $scope.item.kelompokBarang.id
                    }
                }));
            }
            $scope.now = new Date();
            // ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
            //     $scope.listRuanganTujuan = data;
            // });
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            })
            $scope.$watch('tempItem.NamaBarang', function(e) {
                if (e === undefined) return;
                if (e === null) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.namaProduk, type: 'informasi' };
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + e.id, true);
                findProduk.findStokBarang(e.id, $scope.item.ruanganTujuan.id).then(function(e) {
                    $scope.tempItem.stok = e.data.data === null ? 0 : e.data.data;
                });
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);

            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })

            $scope.$watch('tempItem.satuan', function(e){
                if (e === undefined) return;
                if (e === null) return;
                if (e.id === undefined) return;
                debugger;
                var qty = $scope.tempItem.stok;
                findProduk.getKonversi($scope.tempItem.NamaBarang.idSatuan, e.id, qty).then(function(data){
                    $scope.tempItem.stok = data.data.value === null ? 0 : Math.floor(data.data.value);
                    debugger;
                })
            })
            $scope.addProduk = function() {
                if ($scope.tempItem.qty === undefined || $scope.tempItem.qty === null || $scope.tempItem.qty === 0) {
                    window.messageContainer.info('Qty belum di pilih');
                } else {
                    $scope.dataOrder.add($scope.tempItem);
                    $scope.tempItem = undefined;
                }
            }

            $scope.columnOrder = [{
                    "field": "NamaBarang.namaProduk",
                    "title": "Nama Barang",
                }, {
                    "field": "stok",
                    "title": "Saldo",
                    "width": "50px"
                },
                {
                    "field": "qty",
                    "title": "Qty",
                    "width": "60px"
                },
                {
                    "field": "satuan.satuanStandar",
                    "title": "Satuan",
                    "width": "100px"
                }
            ];

            $scope.Back = function(){
                window.history.back();
            }

            $scope.cetak = function() {
                var getDetailID = $state.params.noRec;
                console.log(getDetailID);
                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.reportKirimOrder(getDetailID));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
        }
    ]);
});