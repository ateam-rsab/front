/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PemeriksaanKhususTumbuhKembangCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Pemeriksaan Khusus Tumbuh Kembang";
            $scope.dataVOloaded = true;
            $scope.item = {};

        }]);

});