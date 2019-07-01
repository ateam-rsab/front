define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('UnderMaintenanceCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, ManageSdm, DateHelper) {
            $scope.namaForm = $state.params.namaForm;
            
            $scope.goBack = function () {
                $state.go('home')
            }
        }
    ]);
});