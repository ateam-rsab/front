define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PasienBedahCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, findPasien) {
            $scope.message = $state.params.noRegister;
            $scope.item = {};
            findPasien.getByNoRegistrasi($state.params.noRegister).then(function(data) {
                $scope.item.pasien = data.data.pasien;
            });
        }
    ]);
});