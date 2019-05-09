define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('AlertJadwalPemeliharaanCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','$state',
        function ($rootScope, $scope, ModelItem, DateHelper,$state) {
            $scope.title = "Alert Jadwal Pemeliharaan, Kontrak Service, Kalibrasi";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.now = new Date();
                        
            ModelItem.get("AlertJadwalPemeliharaan").then(function(data) {
                $scope.item = data;
                $scope.dataVOloaded=true;
            },function errorCallBack(err) {});


        }]);

});