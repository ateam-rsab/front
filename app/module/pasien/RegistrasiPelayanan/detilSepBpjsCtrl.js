define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('detilSepBpjsCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindPasien', 'DateHelper', 
        function($rootScope, $scope, $state, ModelItem, findPasien, dateHelper) {
            $scope.now = new Date();
            $scope.noSep = $state.params.noSep;
            $scope.isRouteLoading = false;
            if ($scope.noSep){
                $scope.isRouteLoading = true;
                findPasien.getDetailSep($scope.noSep).then(function(e){
                    $scope.items = e.data.data.response;
                    $scope.items.tglLahir = dateHelper.formatDate($scope.items.peserta.tglLahir, 'DD-MM-YYYY');
                    $scope.items.tglRujukan = dateHelper.formatDate($scope.items.tglRujukan, 'DD-MM-YYYY');
                    $scope.isRouteLoading = false;
                })
            }
            
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
        }
    ]);
});