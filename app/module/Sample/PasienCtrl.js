define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PasienCtrl', ['$scope', 'ModelItem', '$state', function($scope, modelItem, $state) {
        $scope.item = {};
        modelItem.get("PasienVO").then(function(data) {
            $scope.item = data;
        });

        $scope.Lanjutkan = function() {
            modelItem.set("PasienVO", $scope.item);
            $state.go('');
        };


    }]);
});