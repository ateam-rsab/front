define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiPasienCtrl', ['$scope', 'ModelItem', function($scope, modelItem) {
        $scope.item = {};
        modelItem.get('pasien').then(function(model) {
            $scope.item = model;
        });
        $scope.message = "Registrasi Pasien";
        $scope.now = new Date();


    }]);
});