define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardCtrl', ['socket', '$state', '$rootScope', '$scope', 'LoginService',
        function(socket, $state, $rootScope, $scope, loginService) {
            $scope.items = [];
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.series = [];
            loginService.getHistory($scope.from, $scope.until).then(function(e) {
                $scope.items = (e.data.data);
                var temp = [];
                var group = _.groupBy($scope.items, 'group')
                for (var key in group) {
                    if (group.hasOwnProperty(key)) {
                        var element = group[key];
                        temp.push({ nilai: element.length });
                        $scope.series.push({ field: 'nilai', name: key === null ? 'Tidak ' : key });
                    }
                }
                $scope.dashboardItems = temp;
            });
            socket.on('IKI', function(e) {
                if (e.message instanceof Object)
                    $scope.items.unshift(e.message);
            })
        }
    ])
});