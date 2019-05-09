/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('CatatanPerkembanganCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Catatan Perkembangan";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.now = new Date();
            $scope.showTF=false;

            ModelItem.get("CatatanPerkembangan").then(function(data) {
                $scope.item = data;     
                $rootScope.dataVOloaded = true;
            }, function errorCallBack(err) {
            });

            ModelItem.getDataDummyGeneric("ListJenisCatatan", false).then(function (data) {
                $scope.listJenisCatatan_bak = data;
            })
            $scope.listJenisCatatan = [{"id":1,"name":"Hamil"},{"id":2,"name":"Tunggal"},{"id":3,"name":"Ganda"},{"id":4,"name":"Tidak Hamil"}]

            $scope.add=function(DataVo){
              
               //console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
                console.log(JSON.stringify($scope.item));
            }
        }]);

});