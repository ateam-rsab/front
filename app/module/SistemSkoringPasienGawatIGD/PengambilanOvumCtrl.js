


define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengambilanOvumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper,ManagePasien) {
            $scope.title = "Pengambilan Ovum";
            $scope.dataVOloaded = true;
            $scope.item = {};
            $scope.showTF=false;
            $scope.now = new Date();

            ModelItem.get("Sample/PengambilanOvum").then(function(data) {
                $scope.item = data;
                $rootScope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            ModelItem.getDataDummyGeneric("ListJenisCara", false).then(function (data) {
                $scope.listJenisCara_bak = data;
            })
            $scope.listJenisCara = [{"id":1,"name":"USG TRANSVAGINA"},{"id":2,"name":"LAPAROSKOPI"},{"id":3,"name":"Lainnya"},]
            ModelItem.getDataDummyGeneric("ListJenisPembiusan", false).then(function (data) {
                $scope.listJenisPembiusan_bak = data;
            })
            $scope.listJenisPembiusan = [{"id":1,"name":"Analgesi neuroleptika"},{"id":2,"name":"Lokal"},{"id":3,"name":"Umum"},]

            /*$scope.save=function(DataVo){

               var data = [];
               var subdata=[];
               var subsubdata=[];
               debugger
               $scope.item.oosits=[];
               $scope.item.fungsiOvariums=[];
               console.log(JSON.stringify(ModelItem.beforePost($scope.item)));

               // for (data in $scope.item.fungsiOvarium){
               //      var element = $scope.item.fungsiOvarium[data];
               //      $scope.item.fungsiOvariums.push({id:element.id,fungsi:element.fungsiOvarium});
               //  }

               // for (data in $scope.item.oosit){
               //          var element =  $scope.item.oosit[data];
               //         for(subsubdata in element.children){
               //              var subElement =  element.children[subsubdata];
               //              $scope.item.oosits.push({id:subElement.id,kualitas:subElement.oosit});
               //              //$scope.item.scores=_.map([subElement], subElement.id,subElement.score);
               //         }
               // }
                console.log(JSON.stringify($scope.item));
            }*/
            $scope.Save = function() {
                /*$scope.item.keluargadiberitahu = ModelItem.setObjCollectionForCheckbox($scope.listStatusYaTidak, $scope.arrStatusYaTidak, "statusRiwayatPsikologi");
                 */
                /* $scope.item.keluargadiberitahu = $scope.arrxxx*/
                debugger;
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveTransferPasien(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.kajianAwal.transferpasien = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $state.go('dashboardpasien.Integumen', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });
                });
                debugger;
            };


            // $scope.$watch('item.cara.id', function (newValue, oldValue) {
            // if(newValue==3){
            //     $scope.showTF=true;
            // }else{
            //     $scope.showTF=false;
            // }});

        }]);

});