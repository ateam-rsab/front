define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KirimMenuCtrl', ['ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
            $scope.listOrders = []
            var count = 0;
            var current = 0;
            var order = $state.params.noKirimOrder.split(',');
            for (var key in order) {
                if (order.hasOwnProperty(key)) {
                    var element = order[key];
                    if (element !== '') {
                        count++;
                    }
                }
            }
            $scope.selected = function(data) {
                data.isChecked = !data.isChecked;
                for (var key in data.value) {
                    if (data.value.hasOwnProperty(key)) {
                        var element = data.value[key];
                        element.isChecked = data.isChecked;
                    }
                }
            }
            $scope.Save = function() {
                debugger;
                var data = [];
                for (var key in $scope.listOrders) {
                    if ($scope.listOrders.hasOwnProperty(key)) {
                        var element = $scope.listOrders[key];
                        for (var keyItem in element.value) {
                            if (element.value.hasOwnProperty(keyItem)) {
                                var items = element.value[keyItem];
                                for (var i in items.value) {
                                    if (items.value.hasOwnProperty(i)) {
                                        var item = items.value[i];
                                        if (item.isChecked === true) {
                                            item.strukOrder.ruanganTujuan = { id: item.strukOrder.ruanganTujuanId };
                                            item.strukOrder.ruangan = { id: item.strukOrder.ruanganId };
                                            data.push({
                                                strukOrder: item.strukOrder,
                                                strukKirim: {

                                                },
                                                orderTindakan: [item]
                                            });
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
                managePasien.terimaProduk(data);
            }
            $scope.selectedItem = function(data) {
                if (data.check === undefined)
                    data.isChecked = !data.isChecked;

            }
            for (var key in order) {
                debugger;
                if (order.hasOwnProperty(key)) {
                    var element = order[key];
                    if (element !== '') {
                        findPasien.getOrderDetail(element).then(function(data) {
                            debugger;
                            var items = data.data.data.orders;
                            $scope.strukOrder = data.data.data.strukOrder;
                            if (data.data.data.header !== undefined)
                                $scope.item.keteranganLainnya = data.data.data.header.keteranganLainnya;
                            var result = [];
                            var dataTemp = [];
                            var id = 0;
                            for (var key in items) {
                                if (items.hasOwnProperty(key)) {
                                    var element = items[key];
                                    element.produk.orderRec = element.noRec;
                                    element.produk.ruangan = $scope.strukOrder.ruangan;
                                    element.produk.pasien = $scope.strukOrder.noCm.namaPasien;
                                    element.produk.waktu = element.produk.jenisWaktu.jenisWaktu;
                                    if (element.produk.strukKirim !== undefined)
                                        element.produk.check = true;

                                    result.push(element.produk);
                                    /*add_hanafi*/
                                    $scope.namaruangantampil= element.produk.ruangan.namaRuangan
                                }
                            }
                            for (var key in result) {
                                if (result.hasOwnProperty(key)) {
                                    var element = result[key];
                                    $scope.listOrders.push(element);
                                }
                            }
                            current++;
                            if (current === count) {
                                var tempo = _.groupBy($scope.listOrders, 'waktu');

                                var hasil = [];
                                for (var key in tempo) {
                                    if (tempo.hasOwnProperty(key)) {
                                        var element = tempo[key];
                                        var hasilItem = [];
                                        var tempItem = _.groupBy(element, 'ruanganId');
                                        for (var keyItem in tempItem) {
                                            if (tempItem.hasOwnProperty(keyItem)) {
                                                var elementItem = tempItem[keyItem];
                                                var subItem = { key: keyItem, value: elementItem };
                                                hasilItem.push(subItem);
                                            }
                                        }
                                        hasil.push({ key: key, value: hasilItem });
                                    }
                                }
                                $scope.listOrders = hasil;
                            }
                        });
                    }
                }
            }


        }
    ]);
});