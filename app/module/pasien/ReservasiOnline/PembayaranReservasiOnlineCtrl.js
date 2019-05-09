define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PembayaranReservasiOnlineCtrl', ['$scope', 'ModelItem', function($scope, modelItem) {
        $scope.item = {};
        $scope.message = "PembayaranReservasiOnlineCtrl";
        $scope.now = new Date();
    }]);
});