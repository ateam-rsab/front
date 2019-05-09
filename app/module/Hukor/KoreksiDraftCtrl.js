define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KoreksiDraftCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};

            $scope.disableNoPeraturan = true;
            $scope.disableDraftPeraturan = true;
            $scope.disableKajian = true;

            ModelItem.get("Hukor/KoreksiDraft").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

        }
    ]);
});