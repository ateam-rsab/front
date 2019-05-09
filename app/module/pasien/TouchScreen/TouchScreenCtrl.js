define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('TouchScreenCtrl', ['ManagePasien', '$scope', 'ModelItem', '$rootScope', function(managePasien, $scope, modelItem, $rootScope) {

        $scope.GetNoAntrianPendaftaran = function() {
            managePasien.getAntrianTouchScreen().then(function(e) {
                window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?jenis=A&noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
            });
        }
    }]);
});