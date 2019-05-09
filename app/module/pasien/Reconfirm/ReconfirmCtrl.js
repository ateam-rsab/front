define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('ReconfirmCtrl', ['$scope', 'ModelItem', '$state', '$rootScope', 'FindPasien', 'FindPegawai', 'socket', function($scope, modelItem, $state, $rootScope, findPasien, findPegawai, socket) {
        $scope.item = {};
        $scope.noReconfirm = "";
        $rootScope.isOpen = true;
         $scope.back = function() { 
                window.history.back();  
            }
        $scope.checkNoReconfirm = function() {
            $scope.isLoading = true;
            findPasien.ReconfirmRegistrasion($scope.noReconfirm).then(function(e) {
                $scope.isLoading = false;
                $scope.message = e.data.data.message;
                if (e.data.data.Status === 'PasienBaru')
                    window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
                else
                    window.location = configuration.urlPrinting + "registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + e.data.data.noRecAntrian + "&X-AUTH-TOKEN=" + modelItem.getAuthorize()
            });
        }
    }]);
});