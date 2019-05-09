define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('UpdateTglPulangRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'ManageServicePhp',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien,manageServicePhp) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.now = new Date();
                $scope.item = {
                    tglPulang: $scope.now
                };
                $scope.isRouteLoading = false;
            };
            $scope.clear();
            $scope.findDataBySep = function(data){
                $scope.isRouteLoading = true;
                var dateGenerate = {
                    nosep: data.noSep,
                    tglpulang: new moment(data.tglPulang).format('YYYY-MM-DD')
                }
                manageServicePhp.updateTglPulang(dateGenerate).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data, undefined, 4);
                }).then(function(){
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});