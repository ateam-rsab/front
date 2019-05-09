define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InformasiMedisCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper','DateHelper', 'FindPasien','ManagePasien',
    	function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, findPasien, ManagePasien) {
	        $scope.title = "transfer Pasien Internal - Informasi Medis";

            $scope.item = {};

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            $q.all([
                ModelItem.getDataDummyGeneric("InformasiMedis", false),

            ]).then(function(data) {

                if (data[0].statResponse) {
                    for (var i = 0; i < data[0].length; i++) {
                        data[0][i].isChecked = false;
                    }
                    $scope.listInformasiMedis = data[0];
                }
            });



            $scope.ArrGangguan = [];
            $scope.cekArrGangguan = function(data) {

                var isExist = _.find($scope.ArrGangguan, function (dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.ArrGangguan.push(data);
                }
                else {
                    $scope.ArrGangguan = _.without($scope.ArrGangguan, data);
                }
            };



            $scope.Save = function () {

                
                $scope.item.StatusPsikososialSet = ModelItem.setObjCollectionForCheckbox($scope.listInformasiMedis, $scope.ArrGangguan,"informasiMedis");
                /*$scope.item.StatusPsikososialSet = $scope.ArrGangguan;*/

                
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveInformasiMedis(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function (e) {
                    $scope.kajianAwal.informasimedis = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
                });

            };
        }]);
});
