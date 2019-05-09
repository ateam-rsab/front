define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DetailRegistrasiPelayananCtrl', ['$scope', 'ModelItem', '$rootScope', '$state', 'FindPasien', 'FindPegawai',

        function($scope, modelItem, $rootScope, $state, findPasien, findPegawai) {
            $scope.noRegistrasi = $state.params.noRegistrasi;
            findPasien.getByNoRegistrasi($state.params.noRegistrasi).then(function(e) {
                $scope.pasien = e.data;
            })
        }
    ]);
});