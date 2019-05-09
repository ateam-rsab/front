define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('BankDarahCetakBarcodeCtrl', ['ManagePasien', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'FindPasienLaboratorium', 'DateHelper',

        function(managePasien, socket, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, findPasienLaboratorium, dateHelper) {
            findPasien.getOrderBankDarah($state.params.noOrder).then(function(e) {               
                $scope.items =ModelItem.beforePost( e.data.data.pelayanan,true);
            })            
        }
    ]);
});