define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('ProgramDanPerencanaanPenangananCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Program dan Perencanaan Penanganan";
            $scope.dataVOloaded = true;
            $scope.item = {};

            
        }]);

});