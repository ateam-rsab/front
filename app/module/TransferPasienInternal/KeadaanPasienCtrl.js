define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KeadaanPasienCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "transfer Pasien Internal - Keadaan Pasien";
            $scope.addResikoJatuh = function(data) {
                $scope.listResiko.push({
                    id: data
                });
            }
            $scope.listPeralatan = [{
                id: 1,
                name: "Kateter Urin"
            }]
        }
    ]);
});