define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiMasukRuanganCtrl', ['$scope', 'ModelItem', '$state', '$rootScope',
        function($scope, modelItem, $state, $rootScope) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.doneLoad = $rootScope.doneLoad;
            $rootScope.isOpen = true;
            modelItem.get("RegistrasiMasukRuanganVO").then(function(data) {
                $rootScope.doneLoad = false;
                $scope.doneLoad = false;
                $scope.item = data;
            }, function(error) {
                $rootScope.doneLoad = false;
                $scope.doneLoad = false;
                window.messageContainer.error(error);
            });

            $scope.Lanjutkan = function() {
                modelItem.set("RegistrasiMasukRuanganVO", $scope.item);
                $state.go('');
            };

            //Begin Load Combo Box

            var arrFieldSelectVo = ['id', 'TransportasiPasien'];
            $scope.transportasiPasiens = modelItem.kendoSource("TransportasiPasien", arrFieldSelectVo, false);

            arrFieldSelectVo = ['id', 'KeadaanUmum'];
            $scope.keadaanUmums = modelItem.kendoSource("KeadaanUmum", arrFieldSelectVo, false);

            arrFieldSelectVo = ['id', 'StatusPulang'];
            $scope.statusPulangs = modelItem.kendoSource("StatusPulang", arrFieldSelectVo, false);

            arrFieldSelectVo = ['id', 'CaraMasuk'];
            $scope.caraMasuks = modelItem.kendoSource("CaraMasuk", arrFieldSelectVo, false);

            //End 


        }
    ]);
});