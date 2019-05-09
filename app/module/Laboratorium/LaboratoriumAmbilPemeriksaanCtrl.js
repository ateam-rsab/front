define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaboratoriumAmbilPemeriksaanCtrl', ['ManagePasien', 'ManageLaboratorium', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(managePasien, manageLaboratorium, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.noRegistrasi = $state.params.noAntrianPasien;
            $scope.noOrder = $state.params.noOrder;
            $scope.isShowDetail = false;
            $scope.showDetail = function() {
                $scope.isShowDetail = !$scope.isShowDetail;
            }
            findPasien.getByNoRegistrasi($scope.noRegistrasi).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                $scope.tglRegistrasi = data.data.tglRegistrasi;
                $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
                $scope.item.displayCito = $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
            });
            $scope.SimpanInternal = function() {
                manageLaboratorium.saveInternalMessage($scope.item.strukOrder);
            }
            $scope.Save = function() {

                manageLaboratorium.ambilHasil($state.params.noOrder, $scope.item.namaPengambilHasil, $scope.item.noTelepon, moment($scope.item.tglAmbilHasil).format('YYYY-MM-DD hh:mm:ss')).then(function(e) {
                    managePasien.updateStatusAntrian($state.params.noAntrianPasien, 6).then(function(e) {
                        window.history.back();
                    });
                });
            }
        }
    ]);
});