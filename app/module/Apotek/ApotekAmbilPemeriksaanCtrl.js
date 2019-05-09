define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ApotekAmbilPemeriksaanCtrl', ['ManageApotek', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienApotek', 'DateHelper',

        function(manageApotek, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienApotek, dateHelper) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder;
            findPasien.getByNoRegistrasi($scope.noRegistrasi).then(function(data) {
                $scope.item.pasien = data.data.pasien;
            });
            $scope.Save = function() {

                manageApotek.ambilHasil($state.params.noOrder, $scope.item.namaPengambilHasil, $scope.item.noTelepon, moment($scope.item.tglAmbilHasil).format('YYYY-MM-DD hh:mm:ss')).then(function(e) {});
            }
        }
    ]);
});