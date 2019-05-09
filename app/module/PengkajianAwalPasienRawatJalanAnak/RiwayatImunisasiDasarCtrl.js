define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatImunisasiDasarCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, ManagePasien, findPasien) {
            debugger;

            //$rootScope.listActive -> data listMenu
            ModelItem.setActiveMenu($rootScope.listActive, "RiwayatImunisasiDasar");

            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Riwayat";
            $rootScope.showMenu = true;$rootScope.showMenuDetail = false;
            $scope.noCM = $state.params.noCM;
            $scope.item = {};
            ModelItem.get("RiwayatImunisasi").then(function(data) {
                $scope.item = data;})
            ModelItem.getDataDummyGeneric("StatusImunisasi", false).then(function(data) {
                debugger;
                $scope.listStatusImunisasi = data;
            })

            $scope.arrStatusImunisasiDasar = [];
            $scope.cekArrStatusImunisasiDasar = function(data) {
                debugger;

                var isExist = _.find($scope.arrStatusImunisasiDasar, function(dataExist) {
                    return dataExist == data;
                });

                if (isExist == undefined) {
                    $scope.arrStatusImunisasiDasar.push(data);
                } else {
                    $scope.arrStatusImunisasiDasar = _.without($scope.arrStatusImunisasiDasar, data);
                }

            };
                debugger;
                findPasien.getRiwayatImunisasi($state.params.noRec).then(function(e) {
                    debugger;
                    if (e.data.data.PapRiwayatImunisasi[e.data.data.PapRiwayatImunisasi.length-1] != undefined) {
                        $scope.item.PapRiwayatImunisasi = e.data.data.PapRiwayatImunisasi[e.data.data.PapRiwayatImunisasi.length-1];
                        $scope.item.noRec = $scope.item.PapRiwayatImunisasi.noRec;
                        $scope.item.HasilImunisasi = $scope.item.PapRiwayatImunisasi.hasilImunisasi;
                        $scope.item.KetImunisasiLainnya = $scope.item.PapRiwayatImunisasi.keteranganLainnya;
                        $scope.item.StatusImunisasi = $scope.item.PapRiwayatImunisasi.papImunisasiDetailSet;
                    }
                });
            
            $scope.Save = function() {
                debugger;
                $scope.noRec = $state.params.noRec;
                var noRec = $scope.noRec
                $scope.item.StatusImunisasiSet = ModelItem.setObjCollectionForCheckbox($scope.listStatusImunisasi, $scope.arrStatusImunisasiDasar, "imunisasi");
                var pasien = {
                    noRec: $state.params.noRec
                }
                ManagePasien.saveRiwayatImunisasiDasar(noRec, ModelItem.beforePost(pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.isNext = true;


                });

            };
            $scope.Next = function() {
                $rootScope.next();
            }

        }
    ]);
});