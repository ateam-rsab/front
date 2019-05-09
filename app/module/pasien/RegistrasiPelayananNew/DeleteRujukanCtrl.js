define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DeleteRujukanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien','ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien ,manageServicePhp) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.item = {};
                $scope.isRouteLoading = false;
            };
            $scope.clear();
            $scope.findDataBySep = function(data){
                $scope.isRouteLoading = true;
                manageServicePhp.deleteRujukan(data).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function(){
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});