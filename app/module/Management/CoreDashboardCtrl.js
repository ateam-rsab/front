define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CoreDashboardCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state',
        function(socket, ManageManegement, $rootScope, $scope, ModelItem, $state) {
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            ManageManegement.getListDashboard($state.params.module).then(function(e) {
                $scope.listData = e.data.data.items;
                $scope.refresh();
            })
            socket.on('Dashboard', function(data) {
                $rootScope.doneLoad = false;
                ManageManegement.getListDashboard($state.params.module).then(function(e) {
                    $scope.listData = e.data.data.items;
                    $scope.refresh();
                    $rootScope.doneLoad = true;
                })
            });
            $scope.$watch('from', function(e) {

                if (e === undefined) return;
                $scope.start = moment(e).format('YYYY-MM-DD');
                $scope.refresh();
            });
            $scope.$watch('until', function(e) {
                if (e === undefined) return;
                $scope.end = moment(e).format('YYYY-MM-DD');
                $scope.refresh();
            });
            $scope.refresh = function() {

                var arr = [];
                for (var key in $scope.listData) {
                    if ($scope.listData.hasOwnProperty(key)) {
                        var element = $scope.listData[key];
                        element.url = 'management/get-detail-dashboard/' + element.noRec.trim() + '/' + $scope.start + '/' + $scope.end
                        arr.push(element);
                    }
                }
                $scope.listData = arr;
            }
        }
    ]);
});