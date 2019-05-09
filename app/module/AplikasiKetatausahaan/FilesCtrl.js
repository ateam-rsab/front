
define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('FilesCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state',
        function ($rootScope, $scope, ModelItem, DateHelper, $state) {
            $scope.title = "Files";
            $scope.titled = "List Files Upload";
            $scope.dataVOloaded = true;
            $scope.item = {};

            ModelItem.get("Files").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

            // ModelItem.getDataDummyGeneric("Files", false).then(function (data) {
            //     $scope.listJenisSurat = data;
            // })
        }]);
});