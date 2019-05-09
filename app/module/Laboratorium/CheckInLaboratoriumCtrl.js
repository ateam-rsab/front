define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CheckInLaboratoriumCtrl', ['ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            $scope.now = new Date();
            $scope.cetakspesimen = function() {
                alert('test')
            }
            ModelItem.getDataDummyGeneric("BahanSample", true, undefined, 10).then(function(data) {
                $scope.bahanSamples = data;
            });

            $scope.listSpesimens = [];
            $scope.Add = function() {
                $scope.listSpesimens.push({
                    bahanSample: $scope.item.bahanSample,
                    jumlah: $scope.item.jumlah,
                    tglRegistrasi: $scope.item.tglAmbilSpesimen
                });
                $scope.item.bahanSample = undefined;
                $scope.item.jumlah = 0;
            }
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

            $scope.noOrder = $state.params.noOrder;
            findPasienLaboratorium.getOrder($scope.noOrder).then(function(data) {
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
            $scope.cetak = function() {
                var arr = [];
                for (var key in $scope.listSpesimens) {
                    if ($scope.listSpesimens.hasOwnProperty(key)) {
                        var element = $scope.listSpesimens[key];
                        if (element.isChecked === true)
                            arr.push(element.noRec);
                    }
                }
                var obj = $state.params;
                obj.expect = arr.join(',');
                $state.go('LaboratoriumCetakBarcodeCtrl', obj);
            }
            $scope.listSpesimens = [];
            findPasienLaboratorium.getOrder($scope.noOrder).then(function(data) {
                var items = data.data.data.orders[0].detail;
                $scope.listSpesimens = _.reduce(items, function(memo, item) {
                    var temp = memo;

                    var length = _.filter(temp, function(e) {
                        if (item.produk.bahanSample)
                            return e.bahanSample.namaBahanSample === item.produk.bahanSample.namaBahanSample
                    }).length;
                    temp.push({
                        bahanSample: item.produk.bahanSample,
                        namaProduk: item.produk.namaProduk,
                        jumlah: 1,
                        noRec: item.noRec,
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
                for (var key in $scope.listSpesimens) {
                    if ($scope.listSpesimens.hasOwnProperty(key)) {
                        var element = $scope.listSpesimens[key];
                        element.pasien = $scope.item.pasien;
                        element.noRecAntrian = $state.params.noAntrianPasien;
                        data.push(element);
                    }
                }
                manageLaboratorium.saveSpesimen(ModelItem.beforePost($scope.item.pasien), $scope.tglRegistrasi, ModelItem.beforePost(data)).then(function(e) {
                    managePasien.updateStatusAntrian($state.params.noAntrianPasien, 10).then(function(e) {

                        window.history.back();
                    });

                });

            }
            $scope.SimpanInternal = function() {
                managePasien.updateStatusAntrian($scope.item.noRec, 10);
                manageLaboratorium.saveInternalMessage($scope.item.strukOrder);
            }
        }
    ]);
});