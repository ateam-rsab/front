/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function (initialize) {

    'use strict';
    initialize.controller('PemindahanEmbrioCtrl', ['$rootScope', '$scope', 'ModelItem',
        function ($rootScope, $scope, ModelItem) {
            $scope.title = "Pemindahan Embrio";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showTF=false;
            $scope.now = new Date();

            ModelItem.get("Sample/PemindahanEmbrio").then(function(data) {
                $scope.item = data;
                $rootScope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            ModelItem.getDataDummyGeneric("ListProsedur", false).then(function (data) {
                $scope.listProsedur_bak = data;
            })

            ModelItem.getDataDummyGeneric("ListPemindahanEmbrio", false).then(function (data) {
                $scope.listPemindahanEmbrio_bak = data;
            })

            $scope.listProsedur = [{"id":1,"name":"Tuba"},{"id":2,"name":"Kavum Uteri"}]
            $scope.listPemindahanEmbrio = [{"id":1,"name":"Mudah"},{"id":2,"name":"Sulit"}]

            $scope.add=function(DataVo){
              
               var data = [];
               var subdata=[];
               var subsubdata=[];
               debugger
               console.log(JSON.stringify(ModelItem.beforePost($scope.item)));
            }

        }]);

});