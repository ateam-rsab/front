define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ReservasiOnlineCtrl', ['$scope', 'ModelItem', '$rootScope', function($scope, modelItem, $rootScope) {
        $scope.routing = [];
        $rootScope.$watch('AddMenuReservation', function(e) {
            if (e === undefined) return;
            var valid = false;
            var index = 0;
            var arr = [];
            for (var key in $scope.routing) {
                if ($scope.routing.hasOwnProperty(key)) {
                    var element = $scope.routing[key];
                    if (e.id === element.id) {
                        valid = true;
                    }
                    if (valid === false) {
                        arr.push(element);
                    }
                }
            }
            arr.push(e);
            $scope.routing = arr;
        });
        $scope.NavTo = function(data) {
            $rootScope.AddMenuReservation = data;
        }
        $scope.item = {};
        $rootScope.isOpen = true;
        $scope.message = "Pasien";
        $scope.now = new Date();
        $scope.Lanjutkan = function() {

        };
    }]);
});