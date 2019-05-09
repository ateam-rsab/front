define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatKelahiranCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($q, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper, ManagePasien, findPasien) {



            $scope.tanggal = $state.params.tanggal;

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");


            //$rootScope.listActive -> data listMenu

            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.tanggal = $state.params.tanggal;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.noCM = $state.params.noCM;
            $scope.item = {};
            ModelItem.get("RiwayatKelahiran").then(function(data) {
                $scope.item = data;

                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            ModelItem.getDataDummyGeneric("DataPersalinan", true).then(function(data) {
                $scope.listPersalinan = data;
            })
            ModelItem.getDataDummyGeneric("StatusYaTidak", true).then(function(data) {
                $scope.listMenangis = data;
            })
            ModelItem.getDataDummyGeneric("StatusYaTidak", true).then(function(data) {
                $scope.listRiwayatKuning = data;


                $q.all([
                    findPasien.getByNoCM($scope.noCM)
                ]).then(function(data) {
                    if (data[0].statResponse) {

                        $rootScope.currentPasien = data[0].data.data;
                        $scope.pasien = data[0].data.data;
                    }

                    //ambil data current pasien seusia no cm dan tanggal
                    getDataCurentPasien();
                });

                $scope.Save = function() {
                    debugger;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $scope.pasien.noRec = $state.params.noRec;
                    var norecpasien = { "noRec" : $scope.pasien.noRec}
                    ManagePasien.saveRiwayatKelahiran(norecpasien,ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                        $scope.isNext = true;
                        // $state.go('dashboardpasien.RiwayatPsikososial', {
                        //     noCM: $state.params.noCM,
                        //     tanggal: $state.params.tanggal,
                        //     noRec: $state.params.noRec
                        // });
                    });

                };
            })

            function getDataCurentPasien() {
                debugger;
                findPasien.getRiwayatKelahiran($state.params.noRec).then(function(e) {
                    if (e.data.data.PapRiwayatKelahiran.length !== 0) {
                        var data = e.data.data.PapRiwayatKelahiran[0];
                        $scope.item.UsiaKehamilan = data.usiaKehamilan;
                        $scope.item.persalinan = data.dataPersalinan;
                        $scope.item.BeratBadanLahir = data.beratBadanLahir;
                        $scope.item.Menangis = data.menangis;
                        $scope.item.PanjangBadanLahir = data.panjangBadanLahir;
                        $scope.item.RiwayatKuning = data.riwayatKuning;
                        $scope.item.noRec = data.noRec;
                    }
                });
            }
            $scope.Next = function() {
                $rootScope.next();
            }

        }
    ]);
});