define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('updateTglPulangSepCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien) {
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
                    noSep: data.noSep,
                    tglPulang: new moment(data.tglPulang).format('YYYY-MM-DD HH:mm:ss')
                }
                findPasien.updatetglPulang(dateGenerate).then(function(e) {
                    document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 4);
                }).then(function(){
                    $scope.isRouteLoading = false;
                });
            }
        }
    ]);
});