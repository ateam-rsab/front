define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiPelayananCtrl', ['$scope', 'ModelItem', '$state', '$rootScope', function($scope, modelItem, $state, $rootScope) {
        $scope.item = {};
        $scope.doneLoad = $rootScope.doneLoad;
        modelItem.get("PasienVO").then(function(data) {
            $rootScope.doneLoad = false;
            $scope.doneLoad = false;
            $scope.item = data;
        }, function(error) {
            $rootScope.doneLoad = false;
            $scope.doneLoad = false;
            window.messageContainer.error(error);
        });

        $scope.Lanjutkan = function() {
            modelItem.set("PasienVO", $scope.item);
            debugger
            $state.go('');
        };


    }]);
});