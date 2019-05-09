

define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PemeriksaanFisikDanNeurologisCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Pemeriksaan Fisik dan Neurologis";
            $scope.dataVOloaded = true;
            $scope.item = {};

            
        }]);

});