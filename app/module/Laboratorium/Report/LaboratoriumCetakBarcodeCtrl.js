define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumCetakBarcodeCtrl', ['ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            $scope.noOrder = $state.params.noOrder;
            $scope.listdetailJenisProduk = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=1');
            findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);

                findPasienLaboratorium.getOrder($scope.noOrder).then(function(data2) {
                    var items = data2.data.data.orders[0].detail;
                    var data = [];
                    for (var key in items) {
                        if (items.hasOwnProperty(key)) {
                            var element = items[key];

                            element.produk.jenisPeriksa = element.produk.jenisPeriksaPenunjang.jenisPeriksa;
                            if (element.keteranganLainnya === "Sudah diverifikasi")
                                element.produk.check = true;
                            element.produk.orderRec = element.noRec;
                            element.produk.noOrderIntern = element.noOrder.noOrderIntern;
                            element.produk.pasienDaftar = $scope.item;
                            element.produk.noOrder = element.noOrder;
                            element.produk.noBarcode = element.produk.kdProdukIntern + "-" + element.produk.namaProduk;
                            if ($state.params.expect !== '') {
                                if ($state.params.expect.indexOf(element.noRec) >= 0)
                                    data.push(element.produk);
                            } else
                                data.push(element.produk);
                        }
                    }
                    $scope.listOrders = _.groupBy(data, 'jenisPeriksa');
                });
            });

            $scope.Save = function() {
                console.log($("#printOut").html());
            }

        }
    ]);
});