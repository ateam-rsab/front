define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AmbilSampleCtrl', ['ManageRadiologi', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',

        function(manageRadiologi, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.now = new Date();

            ModelItem.getDataDummyGeneric("BahanSample", true, undefined, 10).then(function(data) {
                $scope.bahanSamples = data;
            });
            $scope.listSpesimens = [];
            $scope.Add = function() {
                $scope.listSpesimens.push({
                    bahanSample: $scope.item.bahanSample,
                    qty: $scope.item.qty
                });
                $scope.item.bahanSample = undefined;
                $scope.item.qty = 0;
            }
            $scope.item = {};
            $scope.noRegistrasi = $state.params.noRegistrasi;
            findPasien.getByNoRegistrasi($scope.noRegistrasi).then(function(data) {
                $scope.pasien = data.data;
            });

            $scope.noOrder = $state.params.noOrder;
            $scope.listSpesimens = [];
            findPasienRadiologi.getOrder($scope.noOrder).then(function(data) {
                var items = data.data;
                $scope.listSpesimens = _.reduce(items.orders, function(memo, item) {
                    var temp = memo;
                    var length = _.filter(temp, function(e) {
                        if (item.bahanSample)
                            return e.bahanSample.namaBahanSample === item.bahanSample.namaBahanSample
                    }).length;
                    if (item.bahanSample !== undefined && length === 0)
                        temp.push({
                            bahanSample: item.bahanSample,
                            qty: 1
                        });
                    return temp;
                }, []);

            });
            $scope.remove = function(data) {
                var item = _.filter($scope.listSpesimens, function(e) {
                    return e.bahanSample.kdBahanSample !== data.bahanSample.kdBahanSample
                });
                $scope.listSpesimens = item;
            }

            $scope.Save = function() {
                manageRadiologi.saveSpesimen(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($scope.item.tglAmbilSpesimen), ModelItem.beforePost($scope.listSpesimens)).then(function(e) {

                });
            }
        }
    ]);
});