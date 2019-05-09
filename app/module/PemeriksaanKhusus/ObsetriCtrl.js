define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ObsetriCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal', 'FindPegawai','ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal, findPegawai,ManagePasien ) {
            $scope.tanggal = $state.params.tanggal;
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.data = {}
            $scope.data.xxx = "lall"
            $scope.now = new Date();
            $scope.item.noRec = $state.params.noRec
            debugger;
            ModelItem.getDataDummyGeneric("JenisObstetrik", false).then(function(data) {
                $scope.listObstetrik = data;
            });
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listYaTidak = data;
            });
            ModelItem.getDataDummyGeneric("StatusTeraturTidak", false).then(function(data) {
                $scope.listStatusTeratur = data;
            });
            ModelItem.getDataDummyGeneric("AkibatHaid", false).then(function(data) {
                $scope.listPenyebabHaid = data;
            });
            ModelItem.getDataDummyGeneric("PenyakitObstetriLainnya", false).then(function(data) {
                debugger;
                $scope.listPenyakitLainnya = data;
            });
            debugger;
            ModelItem.getDataDummyGeneric("KeadaanUmumObstetri", false).then(function(data) {
                $scope.listKeadaanUmumObstetrik = data;
            });

            ModelItem.getDataDummyGeneric("Kebangsaan", false).then(function(data) {
                $scope.listDataNegara = data;
            });

            ModelItem.getDataDummyGeneric("Pendidikan", false).then(function(data) {
                $scope.listDataPendidikan = data;
            });

            ModelItem.getDataDummyGeneric("Pekerjaan", false).then(function(data) {
                $scope.listDataPekerjaan = data;
            });

            ModelItem.getDataDummyGeneric("DetailPenyakit", false).then(function(data) {
                $scope.listObstetrik = data;
            });

            ModelItem.getDataDummyGeneric("Kesan", false).then(function(data) {

                $scope.listKesan = data;
            });
            ModelItem.getDataDummyGeneric("StatusTerabaTakTeraba", false).then(function(data) {
                debugger;
                $scope.listStatusTerabaTakTeraba = data;
            });
            ModelItem.getDataDummyGeneric("DetailPenyakit", false).then(function(data) {
                debugger;
                $scope.listDetailPenyakit = data;
            });
            $scope.currentListObstetrik = [];
            $scope.AddListObstetrik = function(data) {
                var index = $scope.currentListObstetrik.indexOf(data);
                if (_.filter($scope.currentListObstetrik, {
                        id: data.id
                    }).length === 0)
                    $scope.currentListObstetrik.push(data);
                else {
                    $scope.currentListObstetrik.splice(index, 1);
                }
            }

            $scope.Save = function() {
                debugger;
                ManagePasien.saveObstetri(ModelItem.beforePost($scope.item)).then(function(e) {
                    /*$scope.item = undefined;*/
                    /*$scope.isNext = true;*/

                });
            }
        }
    ]);
});