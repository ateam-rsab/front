define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiReservasiOnlineCtrl', ['$scope', 'ModelItem',
        '$state', '$rootScope',
        function($scope, modelItem, $state, $rootScope) {
            $scope.item = {};
            $rootScope.isOpen = true;
            $scope.now = new Date();
            modelItem.get("ReservasiPasien")
                .then(function(res) {
                    $scope.item = res;
                });
            $scope.Lanjutkan = function() {
                modelItem.set("ReservasiPasien", $scope.item);
                $state.go('reservasiOnline.pembayaran');
            }
        }
    ]);
});