define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AmbilSpesimenCtrl', ['ManageApotek', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienApotek', 'DateHelper',

        function(manageApotek, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienApotek, dateHelper) {
            $scope.now = new Date();

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
            findPasien.getByNoRegistrasi($scope.noRegistrasi).then(function(data) {
                $scope.item.pasien = data.data.pasien;
            });

            $scope.noOrder = $state.params.noOrder;
            $scope.listSpesimens = [];
            findPasienApotek.getOrder($scope.noOrder).then(function(data) {
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
                for (var key in $scope.listSpesimens) {
                    if ($scope.listSpesimens.hasOwnProperty(key)) {
                        var element = $scope.listSpesimens[key];
                        element.pasien = $scope.item.pasien;
                        data.push(element);
                    }
                }
                manageApotek.saveSpesimen(ModelItem.beforePost($scope.item.pasien), dateHelper.toTimeStamp($scope.item.tglAmbilSpesimen), ModelItem.beforePost(data)).then(function(e) {

                });
            }
        }
    ]);
});