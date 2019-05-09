define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KirimDarahKeRuanganCtrl', ['FindProduk', 'ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper',

        function(findProduk, managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper) {
            $scope.isPrint = true;
            $scope.now = new Date();
            $scope.option = {
                text: {
                    visible: false
                }
            }
            ModelItem.getDataDummyGeneric("BahanSample", true, undefined, 10).then(function(data) {
                $scope.bahanSamples = data;
            });

            $scope.listSpesimens = [];

            $scope.item = {};
            $scope.noRegistrasi = $state.params.noRegistrasi;

            findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.tglRegistrasi = data.data.tglRegistrasi;
                $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                $scope.item.displayCito = $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
            });
            $scope.add = function(data) {
                if (data.jumlah === undefined)
                    data.jumlah = 0;
                var count = data.nostruk.qtyproduk - data.nostruk.qtyprodukoutint;
                if ($scope.selected.progress >= 100) return;
                if (count === data.jumlah) return;
                if ($scope.selected.qtyProduk === 0) return;
                data.jumlah = data.jumlah + 1;
                data.listPelayananPasien.push(data);
                $scope.selected.qtyProduk = $scope.selected.qtyProduk - data.volumen;
                $scope.selected.progress = parseFloat($scope.selected.currentOrder - $scope.selected.qtyProduk) / parseFloat($scope.selected.currentOrder) * 100;
                $scope.selected.qtyTerimaLast = $scope.selected.qtyTerimaLast + data.volumen;
                var valid = false;
                for (var key in data.struks) {
                    if (data.struks.hasOwnProperty(key)) {
                        var element = data.struks[key];
                        if (element === data.noRec)
                            valid = true;
                    }
                }
                $scope.selected.struks.push(data);
            }
            $scope.minus = function(data) {
                if (data.jumlah === 0) return;
                if (data.jumlah === undefined)
                    data.jumlah = 0;
                if ($scope.selected.progress <= 0) return;
                data.jumlah = data.jumlah - 1;
                data.listPelayananPasien = data.listPelayananPasien.slice(data.listPelayananPasien.length, data.listPelayananPasien.length - 1);
                $scope.selected.qtyProduk = $scope.selected.qtyProduk + data.volumen;
                $scope.selected.progress = parseFloat($scope.selected.currentOrder - $scope.selected.qtyProduk) / parseFloat($scope.selected.currentOrder) * 100;
                $scope.selected.qtyTerimaLast = $scope.selected.qtyTerimaLast - data.volumen;
                var index = $scope.selected.struks.indexOf(data);
                if (index > -1) {
                    $scope.selected.struks.splice(index, 1);
                }
            }
            $scope.checked = function(data) {
                $scope.selected = data;
                findProduk.findStokDarah(data.id).then(function(e) {
                    debugger;
                    var items = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            element.listPelayananPasien = [];
                            items.push(element);
                        }
                    }

                    $scope.listStokProduk = ModelItem.beforePost(items, true);
                    debugger;
                });
            }
            $scope.noOrder = $state.params.noOrder;
            findPasien.getOrder($scope.noOrder).then(function(data) {
                var items = data.data.data.orders[0].detail;
                var data = [];
                for (var key in items) {
                    if (items.hasOwnProperty(key)) {
                        var element = items[key];
                        if (element.keteranganLainnya === "Sudah diverifikasi")
                            element.produk.check = true;
                        element.produk.orderRec = element.noRec;
                        element.produk.currentOrder = element.qtyProduk;
                        element.produk.qtyProduk = element.qtyProduk - element.qtyTerimaLast;

                        element.produk.qtyTerimaLast = element.qtyTerimaLast;
                        element.produk.currentQty = element.qtyTerimaLast;
                        element.produk.struks = [];
                        if (element.produk.qtyTerimaLast === null)
                            element.produk.progress = 0;
                        else
                            element.produk.progress = 100 - parseFloat(element.produk.currentOrder - element.produk.qtyTerimaLast) / parseFloat(element.produk.currentOrder) * 100;
                        if (element.qtyProduk - element.qtyTerimaLast > 0)
                            data.push(element.produk);
                    }
                }
                $scope.listOrders = data;
            });
            $scope.listSpesimens = [];
            findPasien.getOrder($scope.noOrder).then(function(data) {
                var items = data.data.data.orders[0].detail;
                $scope.listSpesimens = _.reduce(items, function(memo, item) {
                    var temp = memo;

                    var length = _.filter(temp, function(e) {
                        if (item.produk.bahanSample)
                            return e.bahanSample.namaBahanSample === item.produk.bahanSample.namaBahanSample
                    }).length;
                    if (item.produk.bahanSample !== undefined && length === 0)
                        temp.push({
                            bahanSample: item.produk.bahanSample,
                            jumlah: 1,
                            tglRegistrasi: new Date()
                        });
                    return temp;
                }, []);

            });
            $scope.remove = function(data) {
                var item = _.filter($scope.listSpesimens, function(e) {
                    return e.bahanSample.id !== data.bahanSample.id
                });
                $scope.listSpesimens = item;
            }

            $scope.Save = function() {

                var data = [];
                for (var key in $scope.listOrders) {
                    if ($scope.listOrders.hasOwnProperty(key)) {
                        var element = $scope.listOrders[key];
                        var list = [];
                        var group = _.groupBy(element.struks, 'noRec');
                        for (var i in group) {
                            if (group.hasOwnProperty(i)) {
                                var subItem = group[i];
                                list.push({ noRec: i, qtyproduk: subItem.length });
                            }
                        }
                        data.push({
                            noRec: element.orderRec,
                            qtyTerimaLast: element.qtyTerimaLast,
                            strukDetailDNoBatch: list
                        });
                    }
                }
                var model = {
                    orderPelayanan: data,
                };
                managePasien.kirimDarahKeRuangan(ModelItem.beforePost(model)).then(function(e) {
                    $scope.isReport = true;
                    $scope.isNext = true;
                    managePasien.updateStatusAntrian($state.params.noAntrianPasien, 10).then(function(e) {
                        window.history.back();
                    });
                });

            }
            $scope.SimpanInternal = function() {
                managePasien.updateStatusAntrian($scope.item.noRec, 10);
                manageLaboratorium.saveInternalMessage($scope.item.strukOrder);
            }
            $scope.cetak = function() {
                $scope.isPrint = false;
            }
        }
    ]);
});