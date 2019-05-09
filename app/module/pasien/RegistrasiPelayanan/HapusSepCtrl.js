define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('HapusSepCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.item = {};
                $scope.isRouteLoading = false;
            };
            $scope.clear();
            $scope.findDataBySep = function(data){
                $scope.isRouteLoading = true;
                findPasien.hapusSep(data).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 4);
                }).then(function(){
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});