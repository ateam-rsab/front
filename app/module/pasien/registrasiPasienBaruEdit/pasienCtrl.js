define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PasienCtrl', ['$scope', '$rootScope', 'DataTanggal', function($scope, $rootScope, DataTanggal) {
      $scope.title = "PasienCtrl";

      //data untuk panel pasien 
      $scope.dataPanelPasien = $rootScope.dataPasienRegistrasiBaru;

      $scope.objectFindByKey = function(key, value, type)
      {

        return "testing nih";

        var array =  $scope.dataPanelPasien.dataPasien;
        var obj = {};


        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                obj = array[i];
            }
        }

        switch(type) {
            case "caption":
                return obj.caption;
                break;
            case "message":
                return obj.messagesRequired;
                break;
        }
      }
    }]);
});
