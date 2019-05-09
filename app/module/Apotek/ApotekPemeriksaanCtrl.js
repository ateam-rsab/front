define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ApotekPemeriksaanCtrl', ['ManageApotek', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienApotek', 'DateHelper',

        function(manageApotek, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienApotek, dateHelper) {
            $scope.item = {};
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder;

            findPasien.getByNoRegistrasi($scope.noRegistrasi).then(function(data) {
                $scope.item.pasien = data.data.pasien;
            });
            if ($state.current.name === "DashboardApotekCtrlInputHasil") {
                findPasienApotek.getOrderDetail($scope.noOrder).then(function(data) {
                    var items = data.data.data.orders;
                    var data = [];
                    var id = 0;
                    for (var key in items) {
                        if (items.hasOwnProperty(key)) {
                            var element = items[key];

                            if (element.produk === undefined) {
                                element.hasilPemeriksaan.detail.hasil = element.hasilPemeriksaan.hasil;
                                data.push({
                                    detail: element.hasilPemeriksaan.detail,
                                    namaProduk: element.hasilPemeriksaan.detail.detailPemeriksaan,
                                    nilaiNormal: element.hasilPemeriksaan.detail.nilaiNormal,
                                    metode: 'metode ' + id,
                                    jenisPeriksa: element.hasilPemeriksaan.produk.jenisPemeriksaanPenunjang.jenisPeriksa
                                });
                            } else {
                                element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                                if (element.keteranganLainnya === "Sudah diverifikasi")
                                    element.produk.check = true;
                                element.produk.orderRec = element.noRec;
                                for (var key in element.detail) {
                                    if (element.detail.hasOwnProperty(key)) {
                                        var subItem = element.detail[key];
                                        // delete subItem.produk;
                                        id++;
                                        element.produk._id = id;
                                        element.produk.detail = element.subItem;
                                        subItem.hasil = 0;
                                        data.push({
                                            detail: subItem,
                                            namaProduk: subItem.detailPemeriksaan,
                                            nilaiNormal: id,
                                            metode: 'metode ' + id,
                                            jenisPeriksa: element.produk.jenisPeriksa
                                        });
                                    }
                                }
                            }

                        }
                    }
                    $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                });
            } else {
                findPasienApotek.getOrder($scope.noOrder).then(function(data) {
                    var items = data.data.data.orders[0].detail;
                    var data = [];
                    for (var key in items) {
                        if (items.hasOwnProperty(key)) {
                            var element = items[key];

                            element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                            if (element.keteranganLainnya === "Sudah diverifikasi")
                                element.produk.check = true;
                            element.produk.orderRec = element.noRec;
                            data.push(element.produk);
                        }
                    }
                    $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                });
            }

            var list = [];
            $scope.checked = function(data) {
                if (data.check === true) {
                    data.check = undefined;
                    var index = list.indexOf(data.orderRec);
                    list = list.slice(index, index - 1);
                } else {
                    data.check = true;
                    list.push(data.orderRec);
                }
            }
            findPasienApotek.getOrder($scope.noOrder).then(function(data) {
                $scope.details = data.data.data.orders[0].detail;
            });
            $scope.Save = function() {
                if ($state.current.name === "DashboardApotekCtrlInputHasil") {
                    var data = [];
                    for (var key in $scope.listOrders) {
                        if ($scope.listOrders.hasOwnProperty(key)) {
                            var element = $scope.listOrders[key];
                            for (var keyItem in element) {
                                if (element.hasOwnProperty(keyItem)) {
                                    var subData = element[keyItem];
                                    data.push({
                                        detail: subData.detail,
                                        hasil: subData.detail.hasil
                                    });
                                }
                            }
                        }
                    }
                    manageApotek.saveHasilPeriksa($scope.noOrder, ModelItem.beforePost(data)).then(function(e) {

                    });
                } else {
                    manageApotek.verifikasiPemeriksaan(list.join(',')).then(function(e) {});
                }
            }
        }
    ]);
});