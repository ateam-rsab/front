define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RadiologiAmbilPemeriksaanCtrl', ['ManageRadiologi', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienRadiologi', 'DateHelper',

        function(managerRadiologi, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienRadiologi, dateHelper) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.noRegistrasi = $state.params.noRegistrasi;
            $scope.noOrder = $state.params.noOrder;
            findPasien.getByNoRegistrasi($scope.noRegistrasi).then(function(data) {
                $scope.item.pasien = data.data.pasien;
            });
            $scope.Save = function() {

                managerRadiologi.ambilHasil($state.params.noOrder, $scope.item.namaPengambilHasil, $scope.item.noTelepon, moment($scope.item.tglAmbilHasil).format('YYYY-MM-DD hh:mm:ss')).then(function(response) {
                    if (response.data.data.message != undefined) {
                        var msg = response.data.data.message;
                        window.messageContainer.log(msg);
                    } else if (response.data.messages) {
                        var msg = response.data.messages;
                        window.messageContainer.log(msg['label-success']);
                    } else if (response.data.messages != undefined) {
                        var msg = response.data.messages;
                        window.messageContainer.log(msg['label-success']);
                    }
                    managePasien.updateStatusAntrian($state.params.noAntrianPasien, 6).then(function(e) {
                        window.history.back();
                    });
                });
            }
        }
    ]);
});