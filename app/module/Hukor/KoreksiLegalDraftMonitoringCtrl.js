define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('KoreksiLegalDraftMonitoringCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state',
        function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};

            $scope.disableNoPeraturan = true;
            $scope.disableNamaPeraturan = true;
            $scope.disableEvaluasiPeraturan = true;

            ModelItem.get("Hukor/KoreksiLegalDraftMonitoring").then(function (data) {
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

        }
    ]);
});