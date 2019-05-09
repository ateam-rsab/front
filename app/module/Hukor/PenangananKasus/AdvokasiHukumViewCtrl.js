define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AdvokasiHukumViewCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.ruanganTujuan =[];
            if($state.params.noUsulan !== undefined){
                $q.all([
                    ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true) 
                ]).then(function (data) {
                     $scope.item.noKasus = $state.params.noUsulan
                });
            } 
            
        }
    ]);
});